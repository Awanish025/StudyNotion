import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import OTPInput from "react-otp-input";
import { sendOtp, signUp } from "../services/operation/authAPI";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";

import { useNavigate } from "react-router-dom";
const VerifyEmail= ()=>{
    const [otp ,setOtp]=useState("");
    const dispatch =useDispatch();
    const navigate =useNavigate();
    const {signupData,loading}=useSelector((state)=>state.auth);
    useEffect(() => {

        if(!signupData){
            navigate('/signup');
        }},[signupData, navigate])
    function submitHandeler(e){
        e.preventDefault();
        const { accountType,
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            
            }=signupData

        dispatch(signUp(
             accountType,
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            otp,
            navigate))
    }
   return(
    <div className='min-h-[calc(100vh-3.5rem)] grid place-items-center'>
        {
              loading ? (
                <div>
                    Loading... 
                </div>   

            ): 
            (
                 <div className='max-w-[500px] p-4 lg:p-8 '> 
                    <h1 className="text-richblack-5 font-semibold text-[1.875rem] leading-[2.375rem]">Verfy Email</h1>
                    <p className="text-[1.125rem] leading-[1.625rem] my-4 text-richblack-100">A verification code has been sent to you. Enter the code below</p>
                  <form onSubmit={submitHandeler} >
                  <OTPInput
                      value={otp}
                      onChange={setOtp}
                      numInputs={6}
                      renderSeparator={<span>-</span>}
                      inputStyle="w-[20px] rounded-[8px] border-[1px] border-richblack-500 text-[3rem] text-center"
                      focusStyle="border-[5px] border-red-500"
                      isInputNum={true}
                      shouldAutoFocus={true}
                      containerStyle="flex justify-between gap-4"
                      renderInput={(props=><input {...props}/>)}
                     />
                     <button type="submit"  
                     disabled={otp.length !== 6}
                     className=" ml-5 w-full bg-yellow-50 py-[12px] px-[12px] rounded-[8px] mt-6 font-medium text-richblack-900"> 
                        Verify Email
                     </button>
                  </form>

                  <div className="flex mx-auto justify-between ">
                        <Link to="/login" >
                        
                           <div className=" tracking-wide gap-x-2  flex items-center mt-5 leading-[1.375rem] text-richblack-5">
                             <FaArrowLeftLong/>
                             Back To Login
                           </div>
                         </Link>
                         <button className=" tracking-wide gap-x-2  flex items-center mt-5 leading-[1.375rem] text-richblack-5" onClick={()=>dispatch(sendOtp(signupData.email,navigate))}>
                            Resend it
                         </button>
                  </div>
                </div>
                
            )
        }
           
    </div>
   )
}
export default VerifyEmail