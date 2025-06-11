
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

// we are going to make this form by using form hook
const ContactUsForm =()=>{
    const {loading ,setloading}=useState(false);
    const {
           handleSubmit,
           formState:{errors,isSubmitSuccessful},
           register,
           reset,
           
          
          } =useForm();
          useEffect( ()=>{
            if(isSubmitSuccessful){
               reset ({
                firstname:""
                ,email:""
                ,lastname:""
                ,phonenumber:""
                ,message:""
               })
            }
          } ,[reset,isSubmitSuccessful])

          const submitHandeler=async(data)=>{

          }

    return (
        <div>
             <form onSubmit={handleSubmit(submitHandeler)} className=" gap-4 flex flex-col  mt-10" >
                 <div className=" flex flex-row gap-4">
                    {/* firstname */}
                    <div className="flex flex-col gap-2 ">
                        <label className="text-richblack-5 " htmlFor="firstname"> First Name</label>
                        <input className="rounded-md px-5 py-3 bg-richblack-800 text-white shadow-[inset_0px_-1px_0px_rgba(255,255,255,0.18)]    " type="text" 
                        name="firstname"
                        id="firstname"
                        placeholder="Enter First Name"
                        {...register("firstname",{required:true})}
                        />
                        {errors.firstname && (<span>Enter your name</span>)}
                    </div>
                    {/* lastname */}
                    <div className="flex flex-col gap-2">
                        <label className="text-richblack-5"  htmlFor="lastname"> Last Name</label>
                        <input className="rounded-md px-5 py-3 bg-richblack-800 text-white shadow-[inset_0px_-1px_0px_rgba(255,255,255,0.18)]    " type="text" 
                        name="lastname"
                        id="lastname"
                        placeholder="Enter Last Name"
                        
                        />
                    </div>

                 </div>
                {/*email */}
                <div className="flex flex-col gap-2 ">
                        <label className="text-richblack-5 " htmlFor="email"> Email</label>
                        <input className="rounded-md px-5 py-3 bg-richblack-800 text-white shadow-[inset_0px_-1px_0px_rgba(255,255,255,0.18)]    " type="email" 
                        name="email"
                        id="email"
                        placeholder="Enter Email"

                        />
                    </div>
                    {/* phone number */}
                    <label className="text-richblack-5 " htmlFor="firstname">Phone Number </label>
                    <div className=" flex flex-row gap-4">
                    
                   {/* code */}
                    <div className="flex flex-col gap-2 w-[20%]">
                        
                        <input className="rounded-md px-5 py-3 bg-richblack-800 text-white shadow-[inset_0px_-1px_0px_rgba(255,255,255,0.18)]    " type=""
                        name=""
                        id=""
                        placeholder=""

                        />
                    </div>
                    {/* number */}
                    <div className="flex flex-col w-[80%] gap-2">
                        {/* <label className="text-richblack-5"  htmlFor=""> </label> */}
                        <input className="rounded-md px-5 py-3 bg-richblack-800 text-white shadow-[inset_0px_-1px_0px_rgba(255,255,255,0.18)]    " type="text" 
                        name=""
                        id=""
                        placeholder=""
                        
                        />
                    </div>

                 </div>
                    
             </form>
        </div>
    )
}
export default ContactUsForm