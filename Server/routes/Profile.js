const express=require("express");
const router=express.Router();

const{UpdateProfile,deleteAccount,getAllUserDetails}=require("../controller/Profiles");
const{auth}=require("../middelwares/auth");
const{isDemo}=require("../middelwares/isDemo");

router.put("/updateprofile",auth,UpdateProfile)
router.delete("/deleteProfile",auth,deleteAccount);
router.get("/getUserDetails",auth,getAllUserDetails);

module.exports=router;