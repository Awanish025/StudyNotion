import React from "react";
import { Link, Links } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import CTAButton from "../components/core/HomePage/Button";
import banner from "../assets/Images/banner.mp4";
import CodeBlocks from "../components/core/HomePage/CodeBlocks";
import logo from "../assets/Logo/Logo-Full-Light.png";
import TimeLineSection from "../components/core/HomePage/TimeLineSection";
import LearningLanguageSection from "../components/core/HomePage/LearningLanguageSection";
import InstructorSection from "../components/core/HomePage/Istructorsection"
import ExploreMore from "../components/core/HomePage/ExploreMore";
import Footer from "../components/common/Footer";
const Home = () => {
  return (
    <div>
      {/* {section 1} */}
      <div className=" relative  mx-auto flex flex-col w-11/12 max-w-maxContent  items-center justify-between text-white  ">
        <Link to={"/signup"}>
          <div className=" group mx-auto mt-16 w-fit rounded-full bg-richblack-800 p-1 font-bold text-richblack-200 drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] transition-all duration-200 hover:scale-95 hover:drop-shadow-none ">
            <div className="flex flex-row items-center gap-2 rounded-full px-10 py-[5px] transition-all duration-200 group-hover:bg-richblack-900">
              <p>Become an Instructor </p>
              <FaArrowRight />
            </div>
          </div>
        </Link>
        <div>
          <p className=" mt-7  text-center text-4xl font-semibold ">
            Empower Your Future with
            <span className="bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text font-bold ml-2  ">
              Coding Skills
            </span>
          </p>
        </div>
        <div className="mt-4 w-[90%] text-center text-lg font-bold text-richblack-300">
          With our online coding courses, you can learn at your own pace, from
          anywhere in the world, and get access to a wealth of resources,
          including hands-on projects, quizzes, and personalized feedback from
          instructors.
        </div>
        <div className="mt-8 flex flex-row gap-7">
          <CTAButton active={true} Linkto={"/signup"}>
            Learn More {/* learn more is a childreen of button */}
          </CTAButton>
          <CTAButton active={false} Linkto={"/login"}>
            Book a Demo
          </CTAButton>
        </div>
        <div className="mx-3 my-7 shadow-[10px_-5px_50px_-5px] shadow-blue-200">
          <video
            muted
            loop
            autoPlay
            className="shadow-[20px_20px_rgba(255,255,255)]"
          >
            <source src={banner} type="video/mp4" />
          </video>
        </div>

        {/* coding section  we are going to make a componet for reuse */}
        <div>
          <CodeBlocks
            position={"lg:flex-row"}
            heading={
              <span className="text-4xl font-semibold">
                Unlock your
                <span className="bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text font-bold m-1">
                  coding potential
                </span>
                with our online courses
              </span>
            }
            subheading=" Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
            ctabtn1={{
              active: true,
              Linkto: "/signup",
              btntext: "Try it Yourself",
            }}
            ctabtn2={{
                active: false,
                Linkto: "/login",
                btntext: "Learn More",
              }}

              codeblock={`<!DOCTYPE html> 
              <html lang="en">
              <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>This is my page</title>
              </head>
              <body>
              </body>
              </html>  `
            }
              codecolor={"text-yellow-25"}

          />
        

        </div>

        {/* coding 2 section */}
        <div>
          <CodeBlocks
            position={"lg:flex-row-reverse "}
            heading={
              <span className="text-4xl font-semibold">
               Start
                <span className="bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text font-bold m-1">
                 coding in seconds
                </span>
            
              </span>
            }
            subheading=" Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
            ctabtn1={{
              active: true,
              Linkto: "/signup",
              btntext: "Continue Lesson",
            }}
            ctabtn2={{
                active: false,
                Linkto: "/login",
                btntext: "Learn More",
              }}

              codeblock={`import React from "react";
                 import { Link, Links } from "react-router-dom";
                 import { FaArrowRight } from "react-icons/fa";
                 import banner from "../assets/Images/banner.mp4";
                 const Home = () => {
                return (
                        <div>Home</div> 
                       );
                    } 
                 export default Home`
            }
              codecolor={"text-yellow-25"}

          />
        </div>

        <ExploreMore/>

      </div>
      {/* {section 2} */}
      
      <div className= "bg-pure-greys-5    text-richblack-700" >
           <div className=" bg_home h-[310px] ">
          
          <div className=" w-11/12 max-w-maxContent flex flex-col  justify-between  items-center gap-5 mx-auto " >
            <div className=" hidden lg:block  lg:h-[150px]" >  </div>
            
           <div className=" flex flex-row text-white gap-7  mt-10  " >
            <CTAButton  Linkto={"/signup"} active={true}  >
            <div className="flex flex-row items-center gap-2  ">
            Explore Full Catalog <FaArrowRight />
            </div> 
             
            </CTAButton>

           <CTAButton Linkto={"/login"} active={false} >
             <div className="text-white " >
              Learn More
              </div> 
           </CTAButton>

           </div>
            
         </div>
          
        </div>

        <div className=" mx-auto  w-11/12 max-w-maxContent flex flex-col justify-between items-center gap-8     " >
           
           
           <div className=" mb-10 mt-[-100px] flex flex-col justify-between gap-7 lg:mt-20 lg:flex-row lg:gap-0" >

          
            

            <div className="text-4xl font-semibold lg:w-[45%] " >
             Get the skills you need for a
             <span className="bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text font-bold ml-2" >job that is in demand.</span>
             </div>
             
             <div className=" flex flex-col lg:w-[40%] items-start  gap-10    " >
                <div className="text-[16px]" > 
                The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.
                </div>
                <CTAButton Linkto={"/signup"} active={true} >
                   Learn More
                </CTAButton>


              </div>

              
            </div>


            <TimeLineSection  />
            <LearningLanguageSection/> 
            
        </div> 
        
        

      </div>

      {/* {section 3} */}
      <div className="w-11/12 max-w-maxContent mx-auto flex flex-col items-center justify-between gap-8 bg-richblack-900 text-white " >
          <InstructorSection/>
          <h2 className="text-center font-semibold text-4xl mt-10 " >Reviews from other learners</h2>
          {/* review */}
      </div>
 



      {/* {footer} */}
    
       <Footer />

    </div>
  );
};

export default Home;
