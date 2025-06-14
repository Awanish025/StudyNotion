import React from "react";
import img1 from "../assets/Images/aboutus1.webp"
import img2 from "../assets/Images/aboutus2.webp"
import img3 from "../assets/Images/aboutus3.webp"
import img4 from "../assets/Images/FoundingStory.png"
import logo from "../assets/Logo/Logo-Full-Light.png";
import StatsComponent from "../components/core/HomePage/AboutPage/stats";
import LearningSection from "../components/core/HomePage/AboutPage/learning";
import FormSection from "../components/core/HomePage/AboutPage/FormSection";

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
         <div className=" bg-richblack-800  " >
        
        <div className=" flex lg:flex-row gap-8 items-center justify-between w-11/12 max-w-maxContent text-richblack-400 leading-6 mx-auto relative py-14    " >
        

          <div className=" border-b w-[100%] flex flex-col lg:flex-row pb-5 border-richblack-700  " >
           {/* ***************** */}
            <div className="lg:w-[50%] flex flex-wrap flex-row justify-between lg:border-r lg:border-richblack-700 pl-3 lg:pr-5 gap-3 mb-6   ">
             <div className="w-[30%] flex flex-col gap-3 lg:w-[30%] mb-7 lg:pl-0">
             <img className="   " src={logo} type="png" ></img>
              <h1 className="text-richblack-50 font-semibold text-[16px] " >Company</h1>
              <div className="flex flex-col gap-2  " >
                <a className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200" href="/About">About</a>
                <a className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200" href="/Careers">Careers</a>
                <a className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200" href="/Affiliates">About</a>
              </div>
              </div>
             
            
            {/*  ****************** */}
            <div className="w-[48%] lg:w-[30%] mb-7 lg:pl-0 " >
              <h1 className="text-pure-greys-50  font-semibold  " >Resources</h1>
              <div className=" text-richblack-400 flex flex-col gap-2 mt-2 " >
                <a className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"href="/Articles">Articles</a>
                <a className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"href="/Blog">Blog</a>
                <a className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"href="/ChartSheet">Chart Sheet</a>
                <a className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"href="/Codechallenges">Code challenges</a>
                <a className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"href="/Docs">Docs</a>
                <a className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"href="/Projects">Projects</a>
                <a className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"href="/Videos">Videos</a>
                <a className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"href="/Workspaces">Workspaces</a>
            
              </div>
              <h1 className="text-richblack-50 font-semibold text-[16px] mt-7" >Support</h1>
                <div className=" text-richblack-400 flex flex-col ">
                  <a className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"href="/Help">Help Center</a>
                </div>
            </div>
            {/* *************** */}

            <div className="w-[30%] space-y-3 " >
            <h1 className="text-pure-greys-50  font-semibold" >Plans</h1>
            <div className=" text-richblack-400 flex flex-col space-y-2  " >
                <a className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"href="/Paid">Paid memberships</a>
                <a className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"href="/Forstudents">For students</a>
                <a className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"href="/BusinessSolutions">Business solutions</a>
                
            </div>
            <h1 className="text-pure-greys-50  font-semibold" >Community</h1>
            <div className=" text-richblack-400 flex flex-col space-y-2  " >
                <a className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"href="/Forums">Forums</a>
                <a className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"href="/Chapters">Chapters</a>
                <a className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"href="/Events">Events</a>
                
            </div>

            </div>
            
          </div>

          

          {/* second */}

          <div className=" lg:w-[50%] flex flex-wrap flex-row justify-between   pl-4     lg:pr-5 gap-3   " >
           {/* ***************** */}
            <div className="w-[30%] flex flex-col gap-3 lg:w-[30%] mb-7 lg:pl-0 ">
              
              <h1 className="text-richblack-50 font-semibold text-[16px] " >Subjects</h1>
              <div className="text-richblack-400 flex flex-col space-y-2  " >
                <a className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"href="/Al">Al</a>
                <a className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"href="/CodeFoundations">Code Foundations</a>
                <a className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"href="/ComputerScience">Computer Science</a>
                <a className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"href="/Cybersecurity">Cybersecurity</a>
                <a className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"href="/DataAnalytics">Data Analytics</a>
                <a className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"href="/DataScience">Data Science</a>
                <a className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"href="/DataVisualization">Data Visualization</a>
                <a className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"href="#">Developer Tools</a>
                <a className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"href="#">DevOps</a>
                <a className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"href="#">Game Development</a>
                <a className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"href="#">IT</a>
                <a className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"href="#">Machine Learning</a>
                <a className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"href="#">Math</a>
                <a className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"href="#">Mobile Development</a>
                <a className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"href="#">Web Design</a>
                <a className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"href="#">Web Development</a>
              </div>
            </div>
            {/*  ****************** */}
            <div className="w-[48%] lg:w-[30%] mb-7 lg:pl-0 " >
              <h1 className="text-pure-greys-50  font-semibold" >Languages</h1>
              <div className=" text-richblack-400 flex flex-col space-y-2  " >
                <a className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"href="/Articles">Bash</a>
                <a className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"href="/Blog">C++</a>
                <a className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"href="/ChartSheet">C#</a>
                <a className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"href="/Codechallenges">Go</a>
                <a className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"href="/Docs">HTML & CSS</a>
                <a className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"href="/P">Java</a>
                <a className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"href="/Videos">JavaScript</a>
                <a className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"href="#">PHP</a>
                <a className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"href="#">Python</a>
                <a className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"href="#">R</a>
                <a className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"href="#">Ruby</a>
                <a className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"href="#">SQL</a>
                <a className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"href="#">Swift</a>
                <a className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"href="#">Python</a>
            
              </div>
              
            </div>
            {/* *************** */}

            <div className="w-[30%] space-y-3 " >
            <h1 className="text-pure-greys-50  font-semibold" >Career building</h1>
            <div className=" text-richblack-400 flex flex-col space-y-2  " >
                <a className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200" href="/Paid">Career paths</a>
                <a className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200" href="/Forstudents">Career services</a>
                <a className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200" href="/BusinessSolutions">Interview prep</a>
                <a className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200" href="#">Professional certification</a>
                <a className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200" href="/Forums">Full Catalog</a>
                <a className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200" href="/Chapters">-</a>
                <a className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200" href="/Events">Beta Content</a>
                
            </div>
            </div>
            

          </div>
          </div>
          

        </div>

         </div>
      </div>
    )
}
export default About;