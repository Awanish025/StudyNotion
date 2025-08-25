import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {updateAdditionalDetails,updatePassword, updateProfilePic } from "../../../../services/operation/profileAPI";
import {AiOutlineEyeInvisible} from 'react-icons/ai'
import {AiOutlineEye} from 'react-icons/ai'
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



        //update additional info
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    contactNumber: "",
    about: "",
  })

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))
  }

  const handelAdditionalDetails = (e) => {
    e.preventDefault()
     console.log("Token being sent additional:", token);
    updateAdditionalDetails(token,formData);
  }

 //update password
 const [showOldPassword, setShowOldPassword] = useState(false)
const [showNewPassword, setShowNewPassword] = useState(false)
const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [password, setPassword] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const handleOnChangePassword = (e) => {
    setPassword((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))
  }

  const handlePassword = (e) => {
    e.preventDefault()
    const {newPassword, confirmPassword } = password;
    if (newPassword === confirmPassword) {
      updatePassword(token,password);
    } else {
      alert("Password does not match")
    }
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

           {/*update additional info */}
           
           <form onSubmit={handelAdditionalDetails}>
            <div className="my-10 flex flex-col gap-y-6 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
          <h2 className="text-lg font-semibold text-richblack-5">Profile Information</h2>
          <div className="flex flex-col gap-5 lg:flex-row">
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="firstName" className=" text-richblack-50">First Name</label>
              <input defaultValue={user?.firstName } type="text" name="firstName" id="firstName" placeholder="Enter first name" className="rounded-md py-1 pl-2 items-center" onChange={handleOnChange}/>
              </div>
              <div className="flex flex-col gap-2 lg:w-[48%]">
                <label htmlFor="lastName" className="text-richblack-50">Last Name</label>
                <input defaultValue={user?.lastName } type="text" name="lastName" id="lastName" placeholder="Enter first name" className="rounded-md py-1 pl-2 items-center" onChange={handleOnChange}/>
                </div>
                </div>
                <div className="flex flex-col gap-5 lg:flex-row">
                  <div className="flex flex-col gap-2 lg:w-[48%]">
                    <label htmlFor="dateOfBirth" className="text-richblack-50">Date of Birth</label>
                    <input defaultValue={user?.additionalDetails.dateOfBirth} type="date" name="dateOfBirth" id="dateOfBirth" className="rounded-md py-1 pl-2 items-center" onChange={handleOnChange}/>
                    </div>
                    <div className="flex flex-col gap-2 lg:w-[48%]">
                      <label htmlFor="gender" className="text-richblack-50">Gender</label>
                      <select defaultValue={user?.additionalDetails.gender } type="text" name="gender" id="gender" className="rounded-md py-1 pl-2 items-center" onChange={handleOnChange}>
                      <option value="Prefer not to say">Prefer not to say</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Non-Binary">Non-Binary</option>
                        <option value="Other">Other</option>
                        </select>
                        </div>
                        </div>
                        <div className="flex flex-col gap-5 lg:flex-row">
                          <div className="flex flex-col gap-2 lg:w-[48%]">
                            <label htmlFor="contactNumber" className="text-richblack-50">Contact Number</label>
                            <input defaultValue={user?.additionalDetails.contactNumber } type="tel" name="contactNumber" id="contactNumber" placeholder="Enter Contact Number" className="rounded-md py-1 pl-2 items-center" onChange={handleOnChange}/>
                            </div>
                            <div className="flex flex-col gap-2 lg:w-[48%]">
                              <label htmlFor="about" className="text-richblack-50">About</label>
                              <input defaultValue={user?.additionalDetails.about } type="text" name="about" id="about" placeholder="Enter Bio Details" className="rounded-md py-1 pl-2 items-center" onChange={handleOnChange}/>
                </div>
              </div>
          </div>
          <div className="flex justify-end gap-2"><button className="flex items-center bg-yellow-50 cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-richblack-900 undefined" type="submit">Save</button></div>
          </form>
           

            {/* update Password */}
        <form onSubmit={handlePassword}>
  <div className="relative mt-4">
    <label className="w-full">
      <p className="mb-1 text-[0.875rem] text-richblack-5">Old Password <sup className="text-pink-200">*</sup></p>
      <input
        required
        type={showOldPassword ? "text" : "password"}
        name="oldPassword"
        value={password.oldPassword}
        onChange={handleOnChangePassword}
        placeholder="Enter Old Password"
        className="w-full rounded-md bg-richblack-800 p-[12px] pr-12 text-richblack-5"
      />
    </label>
    <span onClick={() => setShowOldPassword((prev) => !prev)} className="absolute right-3 top-9 cursor-pointer">
      {showOldPassword ? <AiOutlineEyeInvisible fontSize={24} /> : <AiOutlineEye fontSize={24} />}
    </span>
  </div>

  <div className="relative mt-4">
    <label className="w-full">
      <p className="mb-1 text-[0.875rem] text-richblack-5">New Password <sup className="text-pink-200">*</sup></p>
      <input
        required
        type={showNewPassword ? "text" : "password"}
        name="newPassword"
        value={password.newPassword}
        onChange={handleOnChangePassword}
        placeholder="Enter New Password"
        className="w-full rounded-md bg-richblack-800 p-[12px] pr-12 text-richblack-5"
      />
    </label>
    <span onClick={() => setShowNewPassword((prev) => !prev)} className="absolute right-3 top-9 cursor-pointer">
      {showNewPassword ? <AiOutlineEyeInvisible fontSize={24} /> : <AiOutlineEye fontSize={24} />}
    </span>
  </div>

  <div className="relative mt-4">
    <label className="w-full">
      <p className="mb-1 text-[0.875rem] text-richblack-5">Confirm New Password <sup className="text-pink-200">*</sup></p>
      <input
        required
        type={showConfirmPassword ? "text" : "password"}
        name="confirmPassword"
        value={password.confirmPassword}
        onChange={handleOnChangePassword}
        placeholder="Confirm New Password"
        className="w-full rounded-md bg-richblack-800 p-[12px] pr-12 text-richblack-5"
      />
    </label>
    <span onClick={() => setShowConfirmPassword((prev) => !prev)} className="absolute right-3 top-9 cursor-pointer">
      {showConfirmPassword ? <AiOutlineEyeInvisible fontSize={24} /> : <AiOutlineEye fontSize={24} />}
    </span>
  </div>

  <div className="flex justify-end gap-2 mt-3">
    <button type="submit" className="flex items-center bg-yellow-50 rounded-md py-2 px-5 font-semibold text-richblack-900">
      Save
    </button>
  </div>
</form>



            </div>
          </div>
        </div>
    )
}
export default Setting;