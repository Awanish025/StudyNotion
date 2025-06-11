
import React from "react";
import InstructorIMG from "../../../assets/Images/Instructor.png"
import CTAButton from "./Button"
import { FaArrowRight } from "react-icons/fa";
// shadow-white shadow-[20px_20px_0px_0px] object-cover h-fit



const InstructorSection=()=>{
    return(
        <div>
            <div className=" lg:flex lg:flex-row flex flex-col items-center justify-between gap-24 mt-20  " >

                <div className="h-fit w-fit" >
                    <img src={InstructorIMG} alt="InstructorIMG" className=" shadow-white  shadow-[-20px_-20px_0px_0px] " />
                </div>
                <div className=" flex flex-col gap-10 lg:w-[50%] " >
                    <div className="text-4xl lg:w-[50%] font-semibold   " >
                        Become an
                        <span className="bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text" > instructor</span>
                    </div>
                    <div className="text-[16px] text-richblack-300 font-medium text-justify " >
                    Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.
                    </div>
                    <div className="w-fit " >
                    <CTAButton Linkto={"/signup" } active={true}  >
                         <div className="flex  flex-row gap-2 items-center text-[16px]  " >
                         Start Teaching Today 
                         <FaArrowRight/>
                         </div>
                          
                    </CTAButton>
                    </div>
                    
                </div>

            </div>

       </div>
    );
}

export default InstructorSection