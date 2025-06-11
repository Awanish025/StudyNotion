import React from "react";
import Button from "../Button";
const LearningGridArray = [
    {
      order: -1,
      heading: "World-Class Learning for",
      highlightText: "Anyone, Anywhere",
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
      BtnText: "Learn More",
      BtnLink: "/",
    },
    {
      order: 1,
      heading: "Curriculum Based on Industry Needs",
      description:
        "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",
    },
    {
      order: 2,
      heading: "Our Learning Methods",
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
    {
      order: 3,
      heading: "Certification",
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
    {
      order: 4,
      heading: `Rating "Auto-grading"`,
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
    {
      order: 5,
      heading: "Ready to Work",
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
  ];

const LearningSection =()=>{
    return (
        <div className="w-11/12 max-w-maxContent flex flex-col justify-between mx-auto mt-20  ">
        <div className="grid grid-cols-1 lg:grid-cols-4  mb-10   ">
            {
               LearningGridArray.map( (card,ind)=>{
                return (
                     <div key={ind} 
                     className={`${ind===0 && "lg:col-span-2 lg:h-[280px] p-5"}
                     ${card.order %2 === 0 ? "bg-richblack-700 lg:h-[280px] p-5 " : " bg-richblack-800 lg:h-[280px] p-5" }
                     ${card.order<0 && "bg-transparent"}
                     ${card.order===3 && "lg:col-start-2"}
                     `}
                     
                     >
                      {
                        card.order<0 ? 
                        (
                           <div className="lg:w-[90%] flex flex-col gap-3 pb-5  ">
                             <header className="text-richblack-5 text-4xl font-bold  ">
                                {card.heading}
                                <span className="bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text font-bold">
                                {" "}
                                {card.highlightText}</span>
                             </header>
                             <p className ="font-medium text-richblack-500 ">
                                {card.description}
                             </p>

                             <div className="w-fit mt-4 ">
                                <Button 
                                active={true}
                                Linkto={card.BtnLink}
                               >
                                {card.BtnText}
                                </Button>
                             </div>
                            </div>
                        ) :
                        (
                            <div className="flex flex-col gap-8 p-7" >
                               <header className="text-richblack-5 text-lg">
                                {card.heading}
                               </header>
                               <p className="text-richblack-300 font-medium">{card.description}</p>
                            </div>
                        )
                      }
                     </div>
                 )
               } ) 
            }
            
        </div>
        </div>
    )
}
export default LearningSection;