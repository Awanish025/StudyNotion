import React from "react";
import ContactUsForm from "../components/common/ContactUsForm";
import logo from "../assets/Logo/Logo-Full-Light.png";
import { IoIosChatboxes } from "react-icons/io";
import { FaPhone } from "react-icons/fa6";
import { BsGlobeCentralSouthAsia } from "react-icons/bs";
import Footer from "../components/common/Footer";
const ContactUs = ()=>{
    return(
        <div className="items-center">

        <div className=" mt-10 w-11/12 max-w-maxContent flex lg:flex-row flex-col mx-auto  text-richblack-5 gap-6 mb-10  ">
             <div className=" w-full  mt-12 lg:w-[35%] h-fit bg-richblack-800 flex flex-col mx-auto  rounded-xl  py-8 gap-5">
                <div className=" mx-7   ">
                <div className="flex flex-row gap-2 items-center text-xl font-semibold ">
                    {/* logo */}
                  <div className=" text-richblack-500 text-2xl">
                  <  IoIosChatboxes />
                  </div>  
                    <p className="text-richblack-25" >Chat on us</p>
                </div>
                <p className= "text-richblack-300">Our friendly team is here to help.</p>
                <p className= "text-richblack-300">info@studynotion.com </p>
                </div>


                <div className=" mx-7 mt-7 ">
                <div className="flex flex-row gap-2 items-center text-xl font-semibold ">
                    {/* logo */}
                    <div className=" text-richblack-500 text-2xl">
                    <BsGlobeCentralSouthAsia />
                    </div>
                    <p className="text-richblack-25">Visit us</p>
                </div>
                <p className= "text-richblack-300">Come and say hello at our office HQ.</p>
                <p className= "text-richblack-300">Akshya Nagar 1st Block 1st Cross, Rammurthy nagar, Bangalore-560016</p>
                </div>


                <div className=" mx-7 mt-7 ">
                <div className="flex flex-row gap-2 items-center text-xl font-semibold ">
                    {/* logo */}
                    <div className=" text-richblack-500 text-2xl">
                    <FaPhone />
                    </div>
                    <p className="text-richblack-25">Call us</p>
                </div>
                <p className= "text-richblack-300">Mon - Fri From 8am to 5pm</p>
                <p className= "text-richblack-300">+123 456 7869</p>
                </div>
                
             </div>
             <div className="w-full lg:w-[60%] border rounded-xl border-richblack-400 mt-12">
                <h1 className=" text-4xl font-semibold mt-12 mx-8">Got a Idea? We've got the skills.</h1>
                <h1 className=" text-4xl font-semibold mx-8">Let's team up</h1>
                <p className="mx-8 mt-4 text-richblack-300">Tell us more about yourself and what you're got in mind.</p>
                <ContactUsForm/>
             </div>

          
        </div>

          {/* footter */}
          <Footer />
        </div>
    )

      
}
export default ContactUs;