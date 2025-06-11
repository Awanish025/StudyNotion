import React from "react";
import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg"
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg"
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg"
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg"
import timeLineImg from "../../../assets/Images/TimelineImage.png"

// create an arry of obj

const timeline =[
    {
        Logo:Logo1,
        heading:"Leadership",
        description:"Fully committed to the success company"

    },
    {
        Logo:Logo2,
        heading:"Responsibility",
        description:"Students will always be our top priority"

    },
    {
        Logo:Logo3,
        heading:"Flexibility",
        description:"The ability to switch is an important skills"

    },
    {
        Logo:Logo4,
        heading:"Solve the problem",
        description:"Code your way to a solution"

    },
]





const TimeLineSection=(  )=>{
    return( 
        <div>

            <div className=" lg:flex lg:flex-row   lg:gap-14 lg:space-y-0 space-y-12   mb-40   items-center      ">
                {/* left */}
                <div className="flex flex-col lg:w-[45%] gap-5   " >  
                    {
                        timeline.map((element , index) =>{
                            return(
                                <div >
                                 <div className="flex flex-row gap-6" key={index}  >
                                    <div className="w-[50px] h-[50px] flex items-center " >
                                        <img src={element.Logo} alt="Logo" />

                                     </div>  
                                     <div>
                                        <h2 className="font-semibold text-[18px ] " >{element.heading}</h2>
                                        <p className="text-base" >{element.description} </p>
                                     </div> 
                                 </div>
                                 {index !==3 && (
                                  <div class="hidden lg:block  h-14 border-dotted border-r border-richblack-100 bg-richblack-400/0 w-[26px]">
                                 </div>
                                 )
                                }
                                 </div>

                            )
                        } )
                    }

                </div>

                {/* right */}

                <div className="relative w-fit h-fit shadow-blue-200 shadow-[0px_0px_30px_0px]  " >
                    <div className="absolute lg:left-[50%] lg:bottom-0 lg:translate-x-[-50%] lg:translate-y-[50%] bg-caribbeangreen-700 flex lg:flex-row flex-col text-white uppercase py-5 gap-4 lg:gap-0 lg:py-10  
                      " >
                           <div className="flex flex-row items-center gap-5 border-r border-caribbeangreen-300 px-7   ">
                                <p className="text-3xl sm:text-2xl  font-bold " >10</p>
                                <p className="text-caribbeangreen-300 text-sm   " >years of experience</p>
                           </div>
                           <div className="flex gap-5 items-center px-7 " >
                                <p className="text-3xl sm:text-2xl font-bold " >250</p>
                                <p className="text-caribbeangreen-300 text-sm   " >type of courses</p>
                           
                           </div>
                      </div>
                    <img className=" shadow-white shadow-[20px_20px_0px_0px] object-cover h-fit " src={timeLineImg} alt="timeLineImg" />

                    
                </div>

            </div>

        </div>
    );
}

export default TimeLineSection