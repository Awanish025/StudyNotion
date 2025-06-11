import React, { useState } from "react";
import loginImg from "../assets/Images/login.webp"
import frameImg from "../assets/Images/frame.png"
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import { login } from "../services/operation/authAPI";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";


const Login =()=>{
  const [showPassword ,setShowPassword]=useState(false);
  const navigate = useNavigate();
  const dispatch=useDispatch();
  const[formData , setFormData]=useState({email:"" , password:""});
  const {email,password}=formData;

function changeHandeler (event){
   setFormData((prev)=>({
    ...prev , [event.target.name]:event.target.value
   }))
}
  function submitHandeler (event){
    event.preventDefault();
    dispatch(login(email,password, navigate));
    console.log("printing Final Account data");
       console.log(formData);
   // navigate("/dashboard");
  }
    return(
        <div>
           <div className=" mx-auto flex w-11/12 max-w-maxContent flex-col-reverse justify-between gap-y-12 py-12 md:flex-row md:gap-y-0 md:gap-x-12  lg:mt-20  " >
            
                {/* form  */}
             <div className=" mx-auto w-11/12 max-w-[450px] md:mx-0 space-y-4" >
              <p className="text-white text-4xl font-bold " >Welcome Back</p>
              
               <div>
               <div className="text-[16px] text-richblack-200 " >Build skills for today, tomorrow, and beyond.</div>
              <div className="font-edu-sa font-bold italic text-blue-100" >Education to future-proof your career.</div>
               </div>
              <div> 
                

                <form onSubmit={submitHandeler} className="text-white w-full  "   >
                  <label className="" htmlFor="email">
                    <p className="mb-1" >Email
                    <sup className="text-pink-500 ">*</sup>
                    </p>
                  <input className="bg-richblack-500 p-3 w-full rounded-md " 
                  onChange={changeHandeler}
                  required type="email" 
                  placeholder="Enter your Email Address"
                  id="email"
                  value={formData.email}
                  name="email"
                   /> 
                  </label>

                  <label className="relative" htmlFor="password">
                  <p className="mb-1 mt-5">Password
                  <sup className="text-pink-500 " >*</sup>
                  </p>
                  <input className="bg-richblack-500 p-3 w-full rounded-md  "
                   required type= { showPassword ?("text"):("password")} 
                   placeholder="Enter your Email password" 
                   onChange={changeHandeler}
                   name="password"
                   value={formData.password}
                   />
                  <span className="absolute items-center right-3 top-[94px]  cursor-pointer" onClick={ () => setShowPassword( (prev)=>!prev ) } >
                   {
                    showPassword ? (<IoEye fontSize={24} fill="#AFB2BF" />):(<IoEyeOff fontSize={24} fill="#AFB2BF" />)
                   }
                    </span>
                  <Link to="/forgetPassword">
                  <p className="mt-1 ml-auto max-w-max text-xs text-blue-100  " >Forgot Password</p>
                  </Link>
                  </label>

                  <button className="bg-yellow-50 text-black text-[16px] p-3 w-full rounded-md mt-20 " >Sign In</button>
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

export default Login