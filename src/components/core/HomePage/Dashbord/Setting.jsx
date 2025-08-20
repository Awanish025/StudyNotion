import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateProfilePic } from "../../../../services/operation/profileAPI";
const Setting = () => {
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const user=useSelector((state)=>state.profile.user);
    const pfp=useSelector((state)=>state.profile.user?.image);
    const [profilePicture, setprofilePicture] = useState(pfp)
   const token= useSelector(state=>state.auth.token);
    

     const handelUpload = (e)=>{
      e.preventDefault();
        const file = e.target[0].files[0];
        console.log("Token being sent:", token);
        updateProfilePic(token, file)
        }

    const handelFileChange = (e)=>{
          const file = e.target.files[0];
           
         setprofilePicture(URL.createObjectURL(file));  
        }

    return(

        <div>
          <div className=' flex-1 overflow-auto'>
            <div className='mx-auto w-11/12 max-w-[1000px] py-10'>
                 <h1 className="mb-14 text-3xl font-medium text-richblack-5">Edit Profile</h1>
            {/* update profile picture */}
           <div className='flex items-center justify-between rounded-md border-[1px] border-richblack-700 bg-richblack-800 md:p-8 md:px-12 px-3 py-3 text-richblack-5'>
              <div className='flex items-center gap-x-4'>
                   <img className='aspect-square w-[78px] rounded-full object-cover'  src={profilePicture} alt={`profile-${user?.firstName}`}>
                   </img>
                <div className='space-y-2'>
                <p>Change Profile Picture </p>
               <form onSubmit={handelUpload}>
                <div className='flex flex-row gap-3'>
                    <label className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50" htmlFor="upload">Select
                        <input type="file" 
                          onChange={handelFileChange}
                          id="upload"
                          className="hidden"
                          accept="image/png, image/gif, image/jpeg"
                        
                        />
                    </label>
                    <button type='submit' className='flex items-center bg-yellow-50 cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-richblack-900 undefined'>Upload</button>
                </div>

               </form>
              </div>
              </div>
              
           </div>
            </div>
          </div>
        </div>
    )
}
export default Setting;