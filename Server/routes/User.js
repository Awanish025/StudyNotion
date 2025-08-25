const express=require("express");
const router=express.Router();

const{sendOTP,signUp,login,changedPassword}=require("../controller/Auth");

const {auth}=require("../middelwares/auth");
const {resetPasswordToken,resetPassword}=require("../controller/ResetPassword");

// routes for login signUp and authentication




// router for user login
router.post("/login",login);

// router for signup
router.post("/signUp",signUp);

// router for send otp

router.post("/sendOtp",sendOTP);


// router for changedPassword
router.post("/changepassword",auth,changedPassword);




//**************************************reset password************************ */

router.post("/reset-password-token",resetPasswordToken);

router.post("/reset-password",resetPassword);


// Export the router for use in the main application

module.exports=router;

//******************************************************************************************* */