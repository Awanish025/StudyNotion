import { settingsEndpoints ,profileEndpoints} from "../apis";
import {apiConnector} from "../apiconnector";
import { toast } from "react-hot-toast";
import {logout} from "./authAPI"
import {setLoading, setuser } from "../../slices/profileSlice";

// Function to update profile picture
export async function updateProfilePic(token, pfp) {
    const toastId = toast.loading("Uploading...");
  try {
    const formData = new FormData();
    console.log("pfp",pfp)
    formData.append('pfp',pfp);
    const response = await apiConnector("PUT", settingsEndpoints.UPDATE_DISPLAY_PICTURE_API,formData,{
      Authorization: `Bearer ${token}`,
    });
    console.log("UPDATE_DISPLAY_PICTURE_API API RESPONSE............", response)
    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    toast.success("Profile Picture Updated Successfully");
    const imageUrl = response.data.data.image;
    localStorage.setItem("user",JSON.stringify({...JSON.parse(localStorage.getItem("user")),image:imageUrl}));
    console.log(JSON.parse(localStorage.getItem("user")).image);
  } catch (error) {
    console.log("UPDATE_DISPLAY_PICTURE_API API ERROR............", error)
    toast.error(error.response.data.message);
  }
  toast.dismiss(toastId);
}


//updateAdditionalDetails
export async function updateAdditionalDetails(token,additionalDetails){
  console.log("additionalDetails",additionalDetails);
  const {firstName,lastName,dateOfBirth,gender,contactNumber,about}=additionalDetails;
  console.log("additionalDetails",additionalDetails);
  const toastId = toast.loading("Updating...");
  try {
    const response = await apiConnector("PUT", settingsEndpoints.UPDATE_PROFILE_API,{firstName,lastName,dateOfBirth,gender,contactNumber,about},{
      Authorization: `Bearer ${token}`,
    });
    console.log("UPDATE_ADDITIONAL_DETAILS_API API RESPONSE............", response)
    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    toast.success("Additional Details Updated Successfully");
    const user = JSON.parse(localStorage.getItem("user"));
    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.additionalDetails.dateOfBirth = dateOfBirth  || user.additionalDetails.dateOfBirth;
    user.additionalDetails.contactNumber = contactNumber || user.additionalDetails.contactNumber;
    user.additionalDetails.about = about || user.additionalDetails.about;
    user.additionalDetails.gender=gender
    localStorage.setItem("user",JSON.stringify(user));

  } catch (error) {
    console.log("UPDATE_ADDITIONAL_DETAILS_API API ERROR............", error)
    toast.error(error.response.data.message)
  }
  toast.dismiss(toastId);
}


//updatePassword
export async function updatePassword(token,password){
  const { oldPassword, newPassword, confirmPassword:confirmNewPassword }=password;
  console.log("password",password);
  const toastId = toast.loading("Updating...");
  try {
   const response = await apiConnector("POST", settingsEndpoints.CHANGE_PASSWORD_API,{oldPassword, newPassword, confirmNewPassword},{
      Authorization: `Bearer ${token}`,
    });
    console.log("UPDATE_PASSWORD_API API RESPONSE............", response)
    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    toast.success("Password Updated Successfully");
  }
  catch (error) {
    console.log("UPDATE_PASSWORD_API API ERROR............", error)
    toast.error(error.response.data.message)
  }
  toast.dismiss(toastId);
}

//deleteAccount
export async function deleteAccount(token,dispatch,navigate){
  const toastId = toast.loading("Deleting...");
  try {
    const response = await apiConnector("DELETE", settingsEndpoints.DELETE_PROFILE_API,null,{
      Authorization: `Bearer ${token}`,
    });
    console.log("DELETE_ACCOUNT_API API RESPONSE............", response)
    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    toast.success("Account Deleted Successfully");
    dispatch(logout(navigate))
  }
  catch (error) {
    console.log("DELETE_ACCOUNT_API API ERROR............", error)
    toast.error(error.response.data.message)
  }
  toast.dismiss(toastId);
}

export function getUserDetails(token, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("GET", profileEndpoints.GET_USER_DETAILS_API, null, {
        Authorization: `Bearer ${token}`,
      })
      console.log("GET_USER_DETAILS API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      const userImage = response.data.data.image
        ? response.data.data.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.data.firstName} ${response.data.data.lastName}`
      dispatch(setuser({ ...response.data.data, image: userImage }))
    } catch (error) {
      dispatch(logout(navigate))
      console.log("GET_USER_DETAILS API ERROR............", error)
      toast.error("Could Not Get User Details")
    }
    toast.dismiss(toastId)
    dispatch(setLoading(false))
  }
}

export async function getUserEnrolledCourses(token) {
  const toastId = toast.loading("Loading...")
  let result = []
  try {
    console.log("BEFORE Calling BACKEND API FOR ENROLLED COURSES");
    const response = await apiConnector(
      "GET",
      profileEndpoints.GET_USER_ENROLLED_COURSES_API,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    )
    console.log("AFTER Calling BACKEND API FOR ENROLLED COURSES");
    // console.log(
    //   "GET_USER_ENROLLED_COURSES_API API RESPONSE............",
    //   response
    // )

    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    result = response.data.data
  } catch (error) {
    console.log("GET_USER_ENROLLED_COURSES_API API ERROR............", error)
    toast.error("Could Not Get Enrolled Courses")
  }
  toast.dismiss(toastId)
  return result
}


export async function getInstructorData(token) {
  const toastId = toast.loading("Loading...");
  let result = [];
  try{
    const response = await apiConnector("GET", profileEndpoints.GET_INSTRUCTOR_DATA_API, null, 
    {
      Authorization: `Bearer ${token}`,
    })

    console.log("GET_INSTRUCTOR_API_RESPONSE", response);
    result = response?.data?.courses

  }
  catch(error) {
    console.log("GET_INSTRUCTOR_API ERROR", error);
    toast.error("Could not Get Instructor Data")
  }
  toast.dismiss(toastId);
  return result;
}

