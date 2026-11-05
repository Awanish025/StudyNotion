import { toast } from "react-hot-toast";
import { studentEndpoints } from "../apis";
import { apiConnector } from "../apiconnector";
import rzpLogo from "../../assets/Logo/Logo-Small-Light.png"
import { setPaymentLoading } from "../../slices/coursesSlice";
import { resetCart } from "../../slices/cartSlice";

const { COURSE_PAYMENT_API, COURSE_VERIFY_API, SEND_PAYMENT_SUCCESS_EMAIL_API } = studentEndpoints;

function loadScript(src) {
  return new Promise((resolve) => {
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export async function buyCourse(token, courses, userDetails, navigate, dispatch) {
  const toastId = toast.loading("Loading...");
  try {
    // load Razorpay checkout script
    const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

    if (!res) {
      toast.error("RazorPay SDK failed to load. Please check your internet connection.");
      toast.dismiss(toastId);
      return;
    }

    // initiate the order
    const orderResponse = await apiConnector(
      "POST",
      COURSE_PAYMENT_API,
      { courses },
      {
        Authorization: `Bearer ${token}`,
      }
    );

    if (!orderResponse?.data?.success) {
      throw new Error(orderResponse?.data?.message || "Could not initiate order");
    }

    console.log("PRINTING orderResponse: ", orderResponse);

    const orderData =
      orderResponse?.data?.message ||
      orderResponse?.data?.data ||
      orderResponse?.data;

    const razorpayKey =
      process.env.REACT_APP_RAZORPAY_KEY ||
      orderResponse?.data?.key ||
      "rzp_test_vnet8xicVNXAqe";

    const options = {
      key: razorpayKey,
      currency: orderData?.currency || orderResponse?.data?.currency || "INR",
      amount: `${orderData?.amount || orderResponse?.data?.amount}`,
      order_id: orderData?.id || orderResponse?.data?.orderId || orderResponse?.data?.id,
      name: "StudyNotion",
      description: "Thank You for Purchasing the Course",
      image: rzpLogo,
      prefill: {
        name: `${userDetails?.firstName || ""} ${userDetails?.lastName || ""}`.trim(),
        email: userDetails?.email,
      },
      handler: function (response) {
        // Send confirmation email
        sendPaymentSuccessEmail(response, orderData?.amount || orderResponse?.data?.amount, token);
        // Verify payment and enroll
        verifyPayment({ ...response, courses }, token, navigate, dispatch);
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
    paymentObject.on("payment.failed", function (response) {
      toast.error("Oops, payment failed");
      console.log("Razorpay payment failed:", response.error);
    });
  } catch (error) {
    console.log("PAYMENT API ERROR.....", error);
    toast.error(error.response?.data?.message || error.message || "Could not make Payment");
  }
  toast.dismiss(toastId);
}

async function sendPaymentSuccessEmail(response, amount, token) {
  try {
    await apiConnector(
      "POST",
      SEND_PAYMENT_SUCCESS_EMAIL_API,
      {
        orderId: response.razorpay_order_id,
        paymentId: response.razorpay_payment_id,
        amount,
      },
      {
        Authorization: `Bearer ${token}`,
      }
    );
  } catch (error) {
    console.log("PAYMENT SUCCESS EMAIL ERROR....", error);
  }
}

// verify payment
async function verifyPayment(bodyData, token, navigate, dispatch) {
  const toastId = toast.loading("Verifying Payment....");
  if (dispatch) {
    dispatch(setPaymentLoading(true));
  }
  try {
    const response = await apiConnector("POST", COURSE_VERIFY_API, bodyData, {
      Authorization: `Bearer ${token}`,
    });

    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    toast.success("Payment Successful! You are enrolled in the course.");
    navigate("/dashboard/enrolled-courses");
    if (dispatch) {
      dispatch(resetCart());
    }
  } catch (error) {
    console.log("PAYMENT VERIFY ERROR....", error);
    toast.error(error.response?.data?.message || error.message || "Could not verify Payment");
  }
  toast.dismiss(toastId);
  if (dispatch) {
    dispatch(setPaymentLoading(false));
  }
}
