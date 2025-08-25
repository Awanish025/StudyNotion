import React from "react";
import img1 from "../assets/Images/aboutus1.webp"
import img2 from "../assets/Images/aboutus2.webp"
import img3 from "../assets/Images/aboutus3.webp"
import img4 from "../assets/Images/FoundingStory.png"
import logo from "../assets/Logo/Logo-Full-Light.png";
import StatsComponent from "../components/core/HomePage/AboutPage/stats";
import LearningSection from "../components/core/HomePage/AboutPage/learning";
import FormSection from "../components/core/HomePage/AboutPage/FormSection";
import Footer from "../components/common/Footer";

const About =()=>{
   return (
      <div>
        {/* section 1 */}
          <div className=" bg-richblack-700  ">
            <div className=" relative w-11/12 max-w-maxContent text-white  items-center justify-between  mx-auto  flex flex-col gap-10 text-center ">
                <div className=" mx-auto text-4xl font-semibold py-20 lg:w-[70%]  ">
                    Driving Innovation in Online Education for a
                     <span className="bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text font-bold" > Brighter Future</span>
                     <p className=" mx-auto mt-3 flex text-center text-base font-medium text-richblack-300 lg:w-[95%]">Studynotion is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.</p>
               
                </div>
               <div className="sm:h-[70px] lg:h-[150px]"></div>
                <div className="absolute bottom-0 grid w-[100%] grid-cols-3 gap-3 lg:gap-5 translate-y-[30%]">
                <img src={img1} alt="img1" />
                <img src={img2} alt="img2" />
                <img src={img3} alt="img3" />
                 </div>
                
            </div>
            
        </div>
      
        {/* section 2 */}
         <div className="border-b border-richblack-700 ">
          <div className="w-11/12 max-w-maxContent mx-auto flex flex-col justify-between gap-10  ">
             <div className="h-[100px]"></div>
             <div className="text-white text-xl md:text-4xl font-semibold py-5  pb-20  text-center">
              We are passionate about revolutionizing the way we learn. Our innovative platform
              <span className="bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text font-bold"> combines technology</span>
              , <span className="bg-gradient-to-b from-[#FF512F] to-[#F09819] text-transparent bg-clip-text font-bold"> expertise</span>, and community to create an
              <span className="bg-gradient-to-b from-[#FF512F] to-[#F09819] text-transparent bg-clip-text font-bold"> unparalleled educational experience.</span>
             </div>
             {/* <div className="bg-richblack-25 h-[.5px] mb-20 "></div> */}
         </div>
         </div>
         <section>
          <div className="w-11/12 max-w-maxContent flex flex-col mx-auto justify-between gap-10 text-richblack-500">
          <div className="flex lg:flex-row flex-col gap-20 justify-between items-center mt-20 mb-20 ">
            <div className="flex flex-col lg:w-[50%] gap-10 font-semibold ">
              <p className="bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCB045] bg-clip-text text-4xl font-semibold text-transparent lg:w-[70%]   ">Our Founding Story</p>
              <p className="text-base font-medium text-richblack-300 lg:w-[95%]" >
                Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.</p>
              <p className="text-base font-medium text-richblack-300 lg:w-[95%]">
                As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.</p>
            </div>
            <div>
               <img src={img4} alt="img4"  className="shadow-[0_0_20px_0] shadow-[#FC6767]"/>
            </div>
          </div>

          </div>
         </section>

           {/* section 3 */}
         <section>
          <div className="w-11/12 max-w-maxContent flex flex-col mx-auto justify-between gap-10 text-richblack-500">
          <div className="flex lg:flex-row flex-col gap-20 justify-between items-center mt-20 mb-20 ">
            <div className="flex flex-col lg:w-[50%] gap-10 font-semibold ">
              <p className="bg-gradient-to-b from-[#FF512F] to-[#F09819] bg-clip-text text-4xl font-semibold text-transparent lg:w-[70%]    ">Our Vision</p>
              <p className="text-base font-medium text-richblack-300 lg:w-[95%]" >
              With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.</p>
              
            </div>
            <div className="flex flex-col lg:w-[50%] gap-10 font-semibold ">
              <p className="bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text text-4xl font-semibold lg:w-[70%]    "> Our Mission</p>
              <p className="text-base font-medium text-richblack-300 lg:w-[95%]" >
              Our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.</p>
              
            </div>
          </div>

          </div>
         </section>

          {/* section 4 */}
          <section className="">
            <StatsComponent/>
          </section>

          {/* section 5 */}
             {/* flex flex-col items-center  mx-auto gap-5 */}
          <section className="mx-auto mt-20 flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-10 text-white">
            <LearningSection/>
            <FormSection/>
          </section>


         {/* footter */}
         <Footer />
      </div>
    )
}
export default About;