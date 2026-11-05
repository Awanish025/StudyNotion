const { instance } = require("../config/razorpay");
const Course = require("../models/Course");
const user = require("../models/user");
const mailSender = require("../utils/mailSender");
const { courseEnrollmentEmail } = require("../mail/templates/courseEnrollmentEmail");
const { paymentSuccess } = require("../mail/templates/paymentSuccess");
const crypto = require("crypto");

// Capture payment and initiate Razorpay order
exports.capturePayment = async (req, res) => {
  try {
    const { courses, courseId } = req.body;
    const userId = req.user?.id || req.User?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User authentication failed",
      });
    }

    let courseList = courses;
    if (!courseList && courseId) {
      courseList = [courseId];
    }
    if (!courseList || (Array.isArray(courseList) && courseList.length === 0)) {
      return res.status(400).json({
        success: false,
        message: "Please provide course ID(s)",
      });
    }

    if (!Array.isArray(courseList)) {
      courseList = [courseList];
    }

    let totalAmount = 0;

    for (const cId of courseList) {
      let course;
      try {
        course = await Course.findById(cId);
        if (!course) {
          return res.status(404).json({
            success: false,
            message: `Could not find course with ID ${cId}`,
          });
        }

        // Check whether user is already enrolled
        const enrolled =
          course.studentEnrolled ||
          course.studentsEnrolled ||
          course.studentsEnroled ||
          [];
        if (enrolled.map((id) => id.toString()).includes(userId.toString())) {
          return res.status(200).json({
            success: false,
            message: `Student is already enrolled in ${course.courseName}`,
          });
        }

        totalAmount += Number(course.price) || 0;
      } catch (err) {
        console.error(err);
        return res.status(500).json({
          success: false,
          message: err.message,
        });
      }
    }

    const options = {
      amount: totalAmount * 100,
      currency: "INR",
      receipt: Math.random(Date.now()).toString(),
      notes: {
        userId,
        courses: JSON.stringify(courseList),
      },
    };

    const paymentResponse = await instance.orders.create(options);
    console.log("Razorpay Order Created: ", paymentResponse);

    return res.status(200).json({
      success: true,
      message: paymentResponse,
      data: paymentResponse,
      orderId: paymentResponse.id,
      currency: paymentResponse.currency,
      amount: paymentResponse.amount,
      key: process.env.RAZORPAY_KEY,
    });
  } catch (error) {
    console.error("Razorpay order creation error:", error);
    return res.status(500).json({
      success: false,
      message: "Could not initiate order",
      error: error.message,
    });
  }
};

// Helper function to enroll students
const enrollStudents = async (courses, userId) => {
  if (!courses || !userId) {
    return;
  }
  const courseList = Array.isArray(courses) ? courses : [courses];

  for (const courseId of courseList) {
    try {
      // Find course and enroll student
      const enrolledCourse = await Course.findByIdAndUpdate(
        courseId,
        { $addToSet: { studentEnrolled: userId } },
        { new: true }
      );

      if (!enrolledCourse) {
        console.error(`Course not found: ${courseId}`);
        continue;
      }

      // Add course to user's enrolled courses
      const enrolledStudent = await user.findByIdAndUpdate(
        userId,
        { $addToSet: { courses: courseId } },
        { new: true }
      );

      // Send enrollment email
      try {
        await mailSender(
          enrolledStudent.email,
          `Successfully Enrolled in ${enrolledCourse.courseName}`,
          courseEnrollmentEmail(
            enrolledCourse.courseName,
            `${enrolledStudent.firstName} ${enrolledStudent.lastName}`
          )
        );
      } catch (mailError) {
        console.error("Error sending enrollment email: ", mailError);
      }
    } catch (err) {
      console.error(`Error enrolling in course ${courseId}: `, err);
    }
  }
};

// Verify the payment signature from client
exports.verifySignature = async (req, res) => {
  try {
    const razorpay_order_id = req.body?.razorpay_order_id;
    const razorpay_payment_id = req.body?.razorpay_payment_id;
    const razorpay_signature = req.body?.razorpay_signature;
    const courses = req.body?.courses;
    const userId = req.user?.id || req.User?.id;

    if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature ||
      !courses ||
      !userId
    ) {
      return res.status(400).json({
        success: false,
        message: "Payment Failed: Missing required parameters",
      });
    }

    let body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature === razorpay_signature) {
      await enrollStudents(courses, userId);
      return res.status(200).json({
        success: true,
        message: "Payment Verified",
      });
    }

    return res.status(400).json({
      success: false,
      message: "Payment Failed: Invalid signature",
    });
  } catch (error) {
    console.error("Verify signature error: ", error);
    return res.status(500).json({
      success: false,
      message: "Payment verification failed",
      error: error.message,
    });
  }
};

// Send payment success email
exports.sendPaymentSuccessEmail = async (req, res) => {
  try {
    const { orderId, paymentId, amount } = req.body;
    const userId = req.user?.id || req.User?.id;

    if (!orderId || !paymentId || !amount || !userId) {
      return res.status(400).json({
        success: false,
        message: "Please provide all payment details",
      });
    }

    const enrolledStudent = await user.findById(userId);
    if (!enrolledStudent) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    await mailSender(
      enrolledStudent.email,
      "Payment Received - StudyNotion",
      paymentSuccess(
        amount / 100,
        paymentId,
        orderId,
        enrolledStudent.firstName,
        enrolledStudent.lastName
      )
    );

    return res.status(200).json({
      success: true,
      message: "Payment success email sent",
    });
  } catch (error) {
    console.error("Error sending payment success email: ", error);
    return res.status(500).json({
      success: false,
      message: "Could not send email",
      error: error.message,
    });
  }
};
