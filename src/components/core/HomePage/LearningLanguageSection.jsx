import React from "react";
import knowYourProgress from "../../../assets/Images/Know_your_progress.png"
import compareWithOthers from "../../../assets/Images/Compare_with_others.png"
import planYourLesson from "../../../assets/Images/Plan_your_lessons.png"
import CTAButton from "./Button"
const LearningLanguageSection=()=>{
    return(
        <div className=" ">
            <div className="flex flex-col gap-5 items-center mb-20 " >
                 <div className="text-4xl font-semibold text-center  " >
                 Your swiss knife for <span className="bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text" >learning any language</span> 
                 </div>
                 <div className=" text-center text-richblack-700 font-medium lg:w-[75%] mx-auto leading-6 text-base mt-3 " >
                 Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
                 </div>
                    {/* image */}
                 <div className="lg:flex lg:flex-row flex flex-col items-center justify-center mt-8 lg:mt-0 " >
                     <img src={knowYourProgress} alt="knowYourProgress" className="object-contain  lg:-mr-32  " />
                     <img src={compareWithOthers} alt="compareWithOthers" className="object-contain lg:-mb-10 lg:-mt-0 -mt-12" />
                     <img src={planYourLesson} alt="planYourLesson" className="object-contain  lg:-ml-36 lg:-mt-5 -mt-16" />
                 </div> 
                 <CTAButton Linkto={"/signup"} active={true} >
                     Learn More
                 </CTAButton>
            </div> 

        </div>
    );
}

export default LearningLanguageSection