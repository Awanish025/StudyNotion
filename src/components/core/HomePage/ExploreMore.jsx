import React, { useState } from "react";
import {HomePageExplore} from "../../../data/homepage-explore"
import { HiUsers } from "react-icons/hi";
import { ImTree } from "react-icons/im";
const tabName=[
    "Free",
    "New to coding",
    "Most popular",
     "Skills paths",
    "Career paths",
]
    
       
    


const ExploreMore =()=>{
    const [currentTab, setTab]=useState(tabName[0]);
    const [courses,setCourse]=useState(HomePageExplore[0].courses);
    const [currentcard ,setCurrentCard]=useState(HomePageExplore[0].courses[0].heading);

    const setMyCard = (value) => {
        setTab(value);
        const result=HomePageExplore.filter((course)=>course.tag===value );
        setCourse(result[0].courses);
        setCurrentCard(result[0].courses[0].heading);
    }
    return(
        <div>
            <div className=" flex flex-col  items-center justify-center mt-20 "  >
                <div className="text-4xl font-semibold" >
                    Unlock the <span className="bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text  " >Power of Code</span> 
                  
                </div>
                <div className="text-lg text-richblack-300 lg:mb-0 mb-10 font-semibold mt-1 " >
                   Learn to Build Anything You Can Imagine
                </div>
                <div className=" hidden lg:flex  gap-5 mt-5 mx-auto w-max bg-richblack-800 text-richblack-200 p-1 rounded-full font-medium drop-shadow-[0_1.5px_rgba(255,255,255,0.25)]" >
                  {
                    tabName.map((element ,index) => {
                        return (
                          <div className={ `text-[16px] flex flex-row items-center gap-2
                          ${currentTab===element ? "bg-richblack-900 text-richblue-5 font-medium " 
                            : "text-richblack-200"

                          } p-2 pl-8 pr-8 rounded-full transition-all duration-200 cursor-pointer  hover:bg-richblack-900 hover:text-richblack-5 ` }
                          key={index} onClick={()=>setMyCard (element) } >
                               {element}
                          </div>

                          
                        ); 
                     }
                     )
                  } 
                 </div>   
                
                <div className=" hidden lg:block lg:h-[200px] " ></div>
                {/* courses */}
                {/* w-[360px] lg:w-[30%] bg-richblack-800  text-richblack-25 h-[300px] box-border cursor-pointer */}
                <div className="  lg:absolute gap-10 justify-center lg:gap-0 flex lg:justify-between flex-wrap w-full lg:bottom-[0] lg:left-[50%] lg:translate-x-[-50%] lg:translate-y-[50%] text-black lg:mb-0 mb-7 lg:px-0 px-3  " >
                    {
                        courses.map((element ,index )=>{
                            return(
                              

                               <div className={` ${currentcard===element.heading ? "bg-white  shadow-[15px_15px_0px_0px] shadow-yellow-50  " : "bg-richblack-800"}   w-[360px] lg:w-[30%]   text-richblack-25 h-[300px] box-border cursor-pointer `}
                                key={index} onClick={()=>setCurrentCard(element.heading)} > 
                              <div className="border-b-[2px] border-richblack-400 border-dashed h-[80%] p-6 flex flex-col gap-3">
       
                               <h1 className={`font-semibold text-[20px]  ${currentcard===element.heading ? "text-richblack-600 " : "text-richblack-5" } `} >{element.heading}</h1>
                               <p className="text-richblack-400" >{element.description}</p>
                              </div>

                               <div className={` flex justify-between px-6 py-3 font-medium  ${currentcard===element.heading ? "text-blue-100" : "text-richblack-300"}  `} >
                                <div className="flex items-center gap-2 text-[16px]" >
                                   <HiUsers />
                                   <p>{element.level}</p> 
                                </div>
                                <div className="flex items-center gap-2 text-[16px]">
                                    <ImTree />
                                   <p>{element.lessionNumber} Lesson</p> 
                                </div>
                                 
                               </div>
                                
                               </div> 
                            )
                        })
                    }
                </div> 

               

            </div>

        </div>
    );

}

export default ExploreMore