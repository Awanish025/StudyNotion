const express=require("express");
const router=express.Router();

const{UpdateProfile,deleteAccount,getAllUserDetails,updateDisplayPicture,getEnrolledCourses,instructorDashboard}=require("../controller/Profiles");
const{auth,isInstructor}=require("../middelwares/auth");


router.put("/updateDisplayPicture", auth, updateDisplayPicture)
router.put("/updateprofile",auth,UpdateProfile)
router.delete("/deleteProfile",auth,deleteAccount);
router.get("/getUserDetails",auth,getAllUserDetails);
router.get("/getEnrolledCourses", auth, getEnrolledCourses);
router.get("/instructorDashboard", auth, isInstructor, instructorDashboard);
module.exports=router;