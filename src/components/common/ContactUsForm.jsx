
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import countryCode from "../../data/countrycode.json";
import { apiConnector } from "../../services/apiconnector";
import { endpoints } from "../../services/apis";
import toast from "react-hot-toast";



// we are going to make this form by using form hook
const ContactUsForm =()=>{
    const [loading ,setloading]=useState(false);
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

          const {CONTACTUS_API}=endpoints;

          const submitHandeler=async(data)=>{

              console.log(data);
              try{
                setloading(true);
                const {firstname,lastname,email,message}=data;
                const phonenumber = data["country-code"] + " " + data.phonenumber;
                  const res=await apiConnector("POST",CONTACTUS_API,{firstname,lastname,email,message,phonenumber})
                 if(res.data.success===true){
                  toast.success("message sent successfully");
                 }
                 else{
                  toast.error("Something went wrong");
                 }
                 console.log("contact response",res);
                 setloading(false);
                }

              catch(error){
                console.log(error);
              }
          }

    return (
        <div className=" mx-auto w-full   max-w-maxContent px-4">
        <form
          onSubmit={handleSubmit(submitHandeler)}
          className="flex flex-col gap-6 bg-richblack-900 p-6 rounded-md shadow-md"
        >
          {/* Name Fields */}
          <div className="flex flex-col md:flex-row gap-5">
            {/* First Name */}
            <div className="flex flex-col gap-1 w-full md:w-1/2">
              <label htmlFor="firstname" className="text-richblack-5 font-medium">
                First Name
              </label>
              <input
                id="firstname"
                type="text"
                placeholder="Enter First Name"
                {...register("firstname", { required: true })}
                className="rounded-md px-4 py-2 bg-richblack-800 text-white placeholder:text-richblack-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
              {errors.firstname && (
                <span className="text-sm text-yellow-400">Enter your first name</span>
              )}
            </div>
      
            {/* Last Name */}
            <div className="flex flex-col gap-1 w-full md:w-1/2">
              <label htmlFor="lastname" className="text-richblack-5 font-medium">
                Last Name
              </label>
              <input
                id="lastname"
                type="text"
                placeholder="Enter Last Name"
                {...register("lastname", { required: true })}
                className="rounded-md px-4 py-2 bg-richblack-800 text-white placeholder:text-richblack-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>
          </div>
      
          {/* Email */}
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-richblack-5 font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter Email"
              {...register("email", { required: true })}
              className="rounded-md px-4 py-2 bg-richblack-800 text-white placeholder:text-richblack-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            {errors.email && (
              <span className="text-sm text-yellow-400">Enter your email</span>
            )}
          </div>
      
          {/* Phone Number */}
          <div className="flex flex-col gap-1">
            <label className="text-richblack-5 font-medium">Phone Number</label>
            <div className="flex gap-4">
              {/* Country Code */}
              <select
                name="country-code"
                id="country-code"
                
                className="w-[30%] rounded-md px-4 py-2 bg-richblack-800 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                 {...register("country-code" ,{required:true})}
              >
                <option value="country-code">Country-code</option>
                {countryCode.map((val, index) => (
                  <option key={index} value={val.code}>
                    {val.code} - {val.country}
                    
                  </option>
                ))}
                
                
              </select>
                 
              {/* Phone Number Field */}
              <input
                type="tel"
                name="phonenumber"
                id="phonenumber"
                
                placeholder="Enter Phone Number"
                className="w-[70%] rounded-md px-4 py-2 bg-richblack-800 text-white placeholder:text-richblack-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                 {...register("phonenumber", {required:true})}
              />
              {errors.message && (
              <span className="text-sm text-yellow-400">Enter your Phone Number</span>
            )}

            </div>
          </div>
      
          {/* Message */}
          <div className="flex flex-col gap-1">
            <label htmlFor="message" className="text-richblack-5 font-medium">
              Message
            </label>
            <textarea
              id="message"
              rows={8}
              placeholder="Enter your message"
              {...register("message", { required: true })}
              className="rounded-md px-4 py-2 bg-richblack-800 text-white placeholder:text-richblack-400 resize-none focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            {errors.message && (
              <span className="text-sm text-yellow-400">Enter your message</span>
            )}
          </div>
      
          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="mt-4 rounded-md bg-yellow-100 py-2 px-6 font-semibold text-black hover:scale-95 hover:bg-yellow-300 transition-all duration-200"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
      
    )
}
export default ContactUsForm