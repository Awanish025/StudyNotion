
import React, { useState } from "react";
import loginImg from "../assets/Images/signup.webp"
import frameImg from "../assets/Images/frame.png"
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import {  useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { sendOtp } from "../services/operation/authAPI";
import { setSignupData } from "../slices/authSlice";


const SignUp=()=>{
    
    const [showPassword ,setShowPassword]=useState(false);
    const [showconfirmPassword ,setshowconfirmPassword]=useState(false);
    const navigate = useNavigate();
    const dispatch=useDispatch();
    const [accountType,setAccountType]=useState("Student");
    const[formData , setFormData]=useState({firstName:"", lastName:"" , password:"", confirmPassword:"" ,email:""});
  //  ?= const {firstName, lastName , password, confirmPassword ,email}=formData;

    function changeHandeler(event){
      const {name}=event.target;
      setFormData((prev)=>({
        ...prev ,[name]:event.target.value
      }))
    }
  
    function submitHandeler (event){
      event.preventDefault();
      
      if(formData.password!==formData.confirmPassword){
        toast.error("password mismatch");
        return;
      }
      // toast.success("Account Created");
       //   for self varification of data we print in consol
       const accData={...formData};
       const signupData={...accData,accountType }
       dispatch(setSignupData(signupData));
       console.log("printing Final Account data");
       dispatch(sendOtp(formData.email,navigate))
       console.log(signupData);
      //navigate("/dashboard");
       // Reset
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      
    })
    setAccountType("Student")

    }
   
    
    return(
        <div>
               <div className=" mx-auto flex w-11/12 max-w-maxContent flex-col-reverse justify-between gap-y-12 py-12 md:flex-row md:gap-y-0 md:gap-x-12  lg:mt-10  " >
            
            {/* form  */}
         <div className=" mx-auto w-11/12 max-w-[450px] md:mx-0 space-y-4" >
          <p className="text-white text-4xl font-bold " >Join the millions learning to code with StudyNotion for free</p>
          
           <div>
           <div className="text-[16px] text-richblack-200 " >Build skills for today, tomorrow, and beyond.</div>
          <div className="font-edu-sa font-bold italic text-blue-100" >Education to future-proof your career.</div>
           </div>
           

           <div className="max-w-max  flex bg-richblack-700  px-1 py-1  rounded-full" >
           <button className={ `${ accountType === "Student" ? "bg-richblack-900 text-richblack-5" :
              "bg-transparent text-richblack-200" } py-2 px-5 rounded-full transition-all duration-700  `}
            onClick={ ()=>setAccountType("Student")}
            >
                Student
            </button>
            <button className={ `${ accountType === "Instructor" ? "bg-richblack-900 text-richblack-5" :
              "bg-transparent text-richblack-200" } py-1  px-5 rounded-full transition-all duration-700  `}
            onClick={ ()=>setAccountType("Instructor") }>
                Instructor
            </button>

           </div>
          <div> 
            

            <form onSubmit={submitHandeler} className="text-white w-full  "    >
              
              <div className="flex items-center justify-between" >
             
              <label className="" htmlFor="firstName">
                <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5" >First Name 
                <sup className="text-pink-500 ">*</sup>
                </p>
              <input className="bg-richblack-600 p-3 w-full rounded-md " 
              required type="text" 
              placeholder="Enter First Name "
              id="firstName"
              name="firstName"
              onChange={changeHandeler}
              value={formData.firstName}
               /> 
              </label>

              <label className="" htmlFor="lastName">
              <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5 ">Last Name
              <sup className="text-pink-500 " >*</sup>
              </p>
              <input className="bg-richblack-600 p-3 w-full rounded-md  "
              onChange={changeHandeler}
               required type= "text"
               placeholder="Enter Last Name" 
               name="lastName"
               value={formData.lastName}
               />
             
              </label>
              </div>

              <label className=" " htmlFor="email">
                <p className="mb-1 mt-4 text-[0.875rem] leading-[1.375rem] text-richblack-5" >Email Address
                <sup className="text-pink-500 ">*</sup>
                </p>
              <input className="bg-richblack-600 p-3 w-full rounded-md " 
              onChange={changeHandeler}
              required type="email" 
              placeholder="Enter  Email Address"
              id="email"
              name="email"
              value={formData.email}
               /> 
              </label>

              <div className="flex items-center justify-between" >

              <label className="relative" htmlFor="password">
              <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5 mt-5">Create Password
              <sup className="text-pink-500 " >*</sup>
              </p>
              <input className="bg-richblack-600 p-3 w-full rounded-md  "
              onChange={changeHandeler}
               required type= { showPassword ?("text"):("password")} 
               placeholder="Enter password" 
               name="password"
               id="password"
               value={formData.password}
               />
              <span className="absolute items-center right-3 top-[60px]  cursor-pointer" onClick={ () => setShowPassword( (prev)=>!prev ) } >
               {
                showPassword ? (<IoEye fontSize={24} fill="#AFB2BF" />):(<IoEyeOff fontSize={24} fill="#AFB2BF" />)
               }
                </span>
                </label>

              <label className="relative" htmlFor="confirmPassword">
              <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5 mt-5">confirm Password
              <sup className="text-pink-500 " >*</sup>
              </p>
              <input className="bg-richblack-600 p-3 w-full rounded-md  "
               required type= { showconfirmPassword ?("text"):("password")} 
               onChange={changeHandeler}
               placeholder=" confirm password" 
               name="confirmPassword"
               id="confirmPassword"
               value={formData.confirmPassword}
               />
              <span className="absolute items-center right-3 top-[60px]  cursor-pointer" onClick={ () => setshowconfirmPassword( (prev)=>!prev ) } >
               {
                showconfirmPassword ? (<IoEye fontSize={24} fill="#AFB2BF" />):(<IoEyeOff fontSize={24} fill="#AFB2BF" />)
               }
                </span>
             
              </label>
              
              </div>


              <button className="bg-yellow-50  text-[16px] leading-[1.375rem] text-richblack-900 p-3 w-full rounded-md mt-10 font-medium" >Create Account</button>
            </form>
          </div>

         </div>

          {/* img */}
          <div className=" relative mx-auto w-11/12 max-w-[450px] md:mx-0 " >
            <img src={frameImg} alt="frameImg" width="558" height="504" />
          <img src={loginImg} alt="loginImg" width="558" height="504" className="absolute -top-4 -left-4 " />
         </div>

       </div>
        </div>
    )
}
export default SignUp
