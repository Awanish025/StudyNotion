import React from "react";
import ContactUsForm from "../components/common/ContactUsForm";
import logo from "../assets/Logo/Logo-Full-Light.png";
import { IoIosChatboxes } from "react-icons/io";
import { FaPhone } from "react-icons/fa6";
import { BsGlobeCentralSouthAsia } from "react-icons/bs";

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
export default ContactUs;