const express=require("express");
const router=express.Router();

const {capturePayment,verifySignature}=require("../controller/Payment");

const {auth,isStudent}=require("../middelwares/auth");

router.post("/capturePayment",auth,isStudent,capturePayment);

router.post("/verifySignature",auth,verifySignature);

module.exports=router;