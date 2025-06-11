import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link,useLocation } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { resetPassword } from "../services/operation/authAPI";



const UpdatePassword=()=>{
    const location = useLocation();
    const {loading}=useSelector((state)=>state.auth);
    const token =location.pathname.split("/").at(-1);
    const dispatch=useDispatch();
    const[FormData,setFormData]=useState({password:"" ,confirmPassword:""})
    const [resetComplete, setresetComplete] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    
    const submitHandeler=(e)=>{
        e.preventDefault();
        if(FormData.password===FormData.confirmPassword){
            dispatch(resetPassword(FormData.password , FormData.confirmPassword,token ,setresetComplete));
        }
        else{
            alert("Passwords do not match") 
        }
    }
    const changeHandeler = (e)=>{
        setFormData((prev)=>({
            ...prev ,[e.target.name]:e.target.value
        }))
    }
    return (
        <div  className='grid min-h-[calc(100vh-3.5rem)] place-items-center'>
             {
                loading ? (
                    <div>
                        Loading... 
                    </div>   

                )
                :
                (
                  <div className='max-w-[500px] p-4 lg:p-8 '>
                      <h1 className='text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5'>
                        {
                            !resetComplete ? "Choose  new password" :"Reset complete!"
                        }
                      </h1>
                      <p className='my-4 text-[1.125rem] leading-[1.625rem] text-richblack-100'>
                        {
                            !resetComplete?("Almost done. Enter your new password and youre all set."):(`All done! We have sent an email to ${"nn"} to confirm`)
                        }
                      </p>
                      <form onSubmit={submitHandeler} action="">
                        {
                            !resetComplete && (
                                <div>
                                    <div className=' relative mt-4' >
                                    <label class="w-full"
                                     htmlFor="password">
                                    <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">New Password
                                    <sup className="text-pink-200">*</sup>
                                    </p>
                                    <input required 
                                    type= { showPassword ? ("text") : ("password")}
                                    placeholder="Enter Password"
                                     value={FormData.password}
                                     name="password"
                                     onChange={changeHandeler}
                                    className ="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-12 text-richblack-5" 
                                   />
                                   </label>
                                   <span className="absolute right-3 top-9 z-[10] cursor-pointer"
                                   onClick={()=>setShowPassword((prev)=>!prev)}>
                                       {showPassword ? (
                                         <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" color="white" className='' />
                                       ) : (
                                         <AiOutlineEye fontSize={24} fill="#AFB2BF" color="white" />
                                       )}
                                   </span>
                                    </div>

                                    <div className=' relative mt-4'>
                                    <label class="w-full">
                                      <p class="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">Confirm New Password <sup class="text-pink-200">*</sup></p>
                                    <input
                                       required
                                       type={showConfirmPassword ? "text" : "password"}
                                       name="confirmPassword"
                                       value={FormData.confirmPassword}
                                       onChange={changeHandeler}
                                       placeholder="Enter Password"
                                       style={{
                                         boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                       }}
                                       className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-12 text-richblack-5"
                                     /></label>
                                     <span
                                       onClick={() => setShowConfirmPassword((prev) => !prev)}
                                       className="absolute right-3 top-10 z-[10] cursor-pointer"
                                     >
                                       {showConfirmPassword ? (
                                         <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" color="white" className='' />
                                       ) : (
                                         <AiOutlineEye fontSize={24} fill="#AFB2BF" color="white" />
                                       )}
                                     </span>
                                </div>

                                </div>
                        

                            )
                        }
                           {   !resetComplete?(<button type='submit' className='mt-6 w-full rounded-[8px] bg-yellow-50 py-[12px] px-[12px] font-medium text-richblack-900'>
                            Reset Password
                        </button>):
                        (<Link to={"/login"}><button className='mt-6 w-full rounded-[8px] bg-yellow-50 py-[12px] px-[12px] font-medium text-richblack-900'>
                        Return to login
                        </button></Link>)
                        }
                      </form>
                      <div className='mt-6 flex items-center justify-between'>
                    <Link to={"/login"}>
                    <p class="flex items-center gap-x-2 text-richblack-5"><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M21 11H6.414l5.293-5.293-1.414-1.414L2.586 12l7.707 7.707 1.414-1.414L6.414 13H21z"></path></svg> Back To Login</p>
                    </Link>
                    </div>
                  </div>
                )
             }
        </div>
    )
}
export default UpdatePassword;