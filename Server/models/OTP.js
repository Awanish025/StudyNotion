const mongoose=require("mongoose");
const mailSender = require("../utils/mailSender");


const OTPSchema=mongoose.Schema({
 email:{
    type:String,
 },
 otp:{
    type:String,
    reuired:true,
    
 },
 createdAt:{
    type:Date,
    default:Date.now(),
    expires:5*60*1000,
 },
  
});

// a function  to send emails
async function sendVerificationEmail(email , otp) {
    try{
       const mailResponse =await mailSender(email, "Verification Email from TutorVerse" , otp);
       console.log("Email sent Successfully : ", mailResponse);
    }catch(error) {
        console.log("error occured while sending mails", error);
        throw error;

    }
}

OTPSchema.pre("save" ,
     async function(next){
    await sendVerificationEmail( this.email, this.otp);
    next();
})
module.exports=mongoose.model("OTP" , OTPSchema);