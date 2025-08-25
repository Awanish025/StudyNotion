const express=require("express");
const router=express.Router();

const{UpdateProfile,deleteAccount,getAllUserDetails,updateDisplayPicture}=require("../controller/Profiles");
const{auth}=require("../middelwares/auth");


router.put("/updateDisplayPicture", auth, updateDisplayPicture)
router.put("/updateprofile",auth,UpdateProfile)
router.delete("/deleteProfile",auth,deleteAccount);
router.get("/getUserDetails",auth,getAllUserDetails);

module.exports=router;