import { endpoints } from "../apis";
import { setToken ,setLoading } from "../../slices/authSlice";
import toast from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { setuser } from "../../slices/profileSlice";
import { resetCart } from "../../slices/cartSlice";
const {LOGIN_API,
       SIGNUP_API,
       SENDOTP_API,
       RESETPASSWORD_API,
       RESETPASSWORDTOKEN_API
}=endpoints;


export function sendOtp(email, navigate) {
    return async (dispatch) => {
       const toastId = toast.loading("Loading...")
      dispatch(setLoading(true))
      try {
        const response = await apiConnector("POST", SENDOTP_API, {
          email,
          // checkUserPresent: true,
        })
      //  dispatch(setProgress(100));
        console.log("SENDOTP API RESPONSE............", response)
  
        console.log(response.data.success)
  
        if (!response.data.success) {
          
          console.log(response.data.message)
          throw new Error(response.data.message)
          
        }
  
        toast.success("OTP Sent Successfully")
        navigate("/verify-email")
      } catch (error) {
        console.log("SENDOTP API ERROR............", error)
        toast.error(error?.response?.data?.message)
       // dispatch(setProgress(100));
      }
      dispatch(setLoading(false))
       toast.dismiss(toastId)
    }
  }

export function signUp (
    accountType,
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    otp,
    navigate
){
    return async(dispatch)=>{
        const toastId = toast.loading("Loading...")
         dispatch(setLoading(true))
         try{
            const response =await apiConnector("POST" , SIGNUP_API, {
                  
                firstName,
                lastName,
                email,
                password,
                confirmPassword,
                accountType,
                otp,
                
            }
            
        )
        console.log("SIGNUP API RESPONSE............", response)
        if (!response || !response.data) {
            throw new Error("No response from server");
        }
        if (response.data.success === false) {  // Check for explicit `false`
            throw new Error(response.data.message || "Login failed");
        }
        toast.success("Signup Successful")
        navigate("/login")
         }
         catch(error){
            console.log("SIGNUP API ERROR............", error)
            toast.error("Signup Failed")
            navigate("/signup")
         }
         dispatch(setLoading(false))
         toast.dismiss(toastId)
    }
}


export function logout(navigate) {
  return (dispatch) => {
    dispatch(setToken(null))
    dispatch(setuser(null))
    dispatch(resetCart())
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    toast.success("Logged Out")
    navigate("/")
  }
}

export function login(email,password,navigate){
   
     return async (dispatch)=>{
        const toastId =toast.loading("loading...");
        dispatch(setLoading(true))
        try{
           const response=await apiConnector("POST",LOGIN_API,{email,password})
           console.log("LOGIN API RESPONSE............", response)
        //    if (!response.data.success) {
        //     throw new Error(response.data.message)
        //    }
        if (!response || !response.data) {
            throw new Error("No response from server");
        }
        if (response.data.success === false) {  // Check for explicit `false`
            throw new Error(response.data.message || "Login failed");
        }
           // dispatch(setProgress(100))
             toast.success("Login Successful")
             dispatch(setToken(response.data.token))
            //  const userImg=response.data?.user?.image ? response.data.user.image
            //  : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`
            //  dispatch(setuser({...response.data.user , image:userImg})) 
            
            
            const user = response.data.User; // Store user in a variable in our api in user u is capital
            const userImg = user.image
                ? user.image
                : `https://api.dicebear.com/5.x/initials/svg?seed=${user?.firstName || "User"} ${user?.lastName || ""}`;
        
            dispatch(setuser({ ...user, image: userImg }));
        
            localStorage.setItem("user", JSON.stringify(user)); 
            localStorage.setItem("token", JSON.stringify(response.data.token));
              navigate("/dashboard/my-profile")
        }
        catch(error){
            console.log("LOGIN API ERROR............", error)
            //toast.error(error.response.data.message)
            toast.error(error.message || "Something went wrong");
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
     }
}

export function forgetPasswordToken(email,setEmailSent){
   return async (dispatch)=>{
    const toastId=toast.loading("loading...");
    dispatch(setLoading(true));
    try{
       const response=await apiConnector("POST" , RESETPASSWORDTOKEN_API,{email});
       console.log("printing RESETPASSTOKEN response", response);
       if(!response.data.success){
          console.log(response.data.message);
       }
       toast.success("Reset Email Sent")
       setEmailSent(true)
    }catch(error){
      console.log("RESETPASSTOKEN ERROR............", error)
      toast.error("Failed To Send Reset Email")
    }
    toast.dismiss(toastId)
    dispatch(setLoading(false))
   }
}

export function forgetPassword(email,setEmailSent){
  return async(dispatch)=>{
    const toastId =toast.loading("loading...");
    dispatch(setLoading(true))
    try{
     const response = await apiConnector("POST" ,RESETPASSWORDTOKEN_API,email); 
     console.log("FORGOTPASSWORD RESPONSE............", response)

      if (!response.data.success) {
        toast.error(response.data.message)
        throw new Error(response.data.message)
      }

      toast.success("Reset Email Sent");
      setEmailSent(true)
    }
    catch(error){
      console.log("FORGOTPASSWORD ERROR............", error)
    }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
  }
}

export function resetPassword(password, confirmPassword, token,setresetComplete) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("POST", RESETPASSWORD_API, {
        password,
        confirmPassword,
        token,
      })

      console.log("RESETPASSWORD RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      toast.success("Password Reset Successfully")
      setresetComplete(true)
    } catch (error) {
      console.log("RESETPASSWORD ERROR............", error)
      toast.error("Failed To Reset Password")
    }
    toast.dismiss(toastId)
    dispatch(setLoading(false))
  }
}