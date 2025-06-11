import React from "react";
import CTAButton from "./Button";
import { FaArrowRight } from "react-icons/fa";
import { TypeAnimation } from "react-type-animation";


const CodeBlocks =({
    position , heading, subheading, ctabtn1,ctabtn2, codeblock, backgroundGradient ,codecolor
} )=>{
    return(
       <div className={` flex ${position}   my-20 justify-between flex-col lg:gap-10 gap-10`}>

        {/* secton 1 */}
        <div className=" w-[100%] lg:w-[50%] flex flex-col gap-8 " >
            {heading} 
            <div className=" text-lg font-bold text-richblack-300" >
                {subheading}
            </div>
            <div className="flex gap-7 mt-7" >
                <CTAButton active={ctabtn1.active} Linkto={ctabtn1.Linkto} >
                   <div className="flex gap-2 items-center">
                     {ctabtn1.btntext}
                     <FaArrowRight/>
                   </div>
                </CTAButton>

                <CTAButton active={ctabtn2.active} Linkto={ctabtn2.Linkto} >
                  
                     {ctabtn2.btntext}
                    
                   
                </CTAButton>
            </div>
            

        </div>

        {/* section two */}
       <div className="border border-white  border-opacity-30 bg-gradient-to-t from-[#080808] via-[#347260] to-[#060606]

 " >
        <div className="h-fit code-border flex flex-row py-3 text-[10px] sm:text-sm leading-[18px] sm:leading-6 relative w-[100%] lg:w-[470px] " >
            {/* hw add bg gradient */}
            
            <div className="text-center flex-col w-[10%] text-richblack-400 font-inter font-bold " >
             <p>1</p>
             <p>2</p>
             <p>3</p>
             <p>4</p>
             <p>5</p>
             <p>6</p>
             <p>7</p>
             <p>8</p>
              <p>9</p>
             <p>10</p>
             <p>11</p>


            </div>
            <div className={`w-[90%] flex flex-col gap-2 font-bold font-mono ${codecolor} pr-2 `} >
                <TypeAnimation
                // code block contain code , time to pause after writing the whole code 
                sequence={[codeblock, 1000, ""]} 
                repeat={Infinity}
                cursor={true}
               style={{whiteSpace: "pre-line", display:"block" }}
               omitDeletionAnimation={true}
                />
            </div>

          

        </div>
        </div>

       </div>
    );

}

export default CodeBlocks