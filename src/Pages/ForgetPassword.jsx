import React from "react";
import { useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { forgetPasswordToken } from "../services/operation/authAPI";


const ForgetPassword =()=>{
      const [email , setemail]=useState("");
      const [emailSent, setEmailSent]=useState(false);
      const {loading}=useSelector((state)=>state.auth);
      const dispatch=useDispatch();
      

     
      function submitHandeler(event){
        event.preventDefault();
        dispatch(forgetPasswordToken(email,setEmailSent));
        console.log("printing Final  data");
        console.log("Email submitted:", email);
      } 
      
    return (
        <div className="flex items-center justify-center flex-auto">
             <div className="max-w-[500px] p-4 lg:p-8">
                <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5" >
                    {!emailSent ? "Reset your password" : "Check Your Email"}
                </h1>
                <div className="my-4 tracking-wide text-[1.125rem] leading-[1.625rem] text-richblack-100">
                      {!emailSent ? "Have no fear. We'll email you instructions to reset your password. If you dont have access to your email we can try account recovery"
                      :`We have sent the reset link to ${email}`
                      }
                </div>
                
                <form onSubmit={submitHandeler}>
                        {
                            !emailSent && (
                                <label class="w-full"><p class="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">Email Address <sup class="text-pink-200">*</sup></p>
                                <input required="" type="email" name="email" placeholder="Enter email address" value={email} onChange={(e)=>setemail(e.target.value)} className="rounded-lg bg-richblack-700 p-3 text-[16px] leading-[24px] text-richblack-5 shadow-[0_1px_0_0] shadow-white/50 placeholder:text-richblack-400 focus:outline-none w-full"></input>
                                </label>
                            )
                        }
                        <button type='submit' className='mt-6 w-full rounded-[8px] bg-yellow-50 py-[12px] px-[12px] font-medium text-richblack-900'>
                            {!emailSent?("Reset Password"):("Resend email")}
                        </button>
                    </form>
                         <Link to="/login" >
                         <div className=" tracking-wide gap-x-2  flex items-center mt-5 leading-[1.375rem] text-richblack-5">
                            <FaArrowLeftLong/>
                          Back To Login
                         </div>
                         </Link>
                
             </div>
        </div>
    )
}
export default ForgetPassword;