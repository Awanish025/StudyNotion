// FIND INSTANCE BY DESTRUTRING
const { instance } = require("../config/razorpay");
const Course = require("../models/Course");
const user = require("../models/user");
const mailSender = require("../utils/mailSender"); // for sending a mail after enrollemnt



const { courseEnrollementEmail} = require("../mail/templates/courseEnrollmentEmail");
       

const { default: mongoose } = require("mongoose");
const { json } = require("express");

// cpature the payment and initiate razorpay order




exports.capturePayment = async (req, res) => {
  
    // fist get userId and courseId
    const { courseId } = req.body; // we will send this id in req
    const userId = req.user.id;

    // validate courseId
    if (!courseId) {
      return res.status(400).json({
        success: false,
        message: "please provide me a valid course Id",
      });
    }

    // validate course details
    // making a db call
    let course;
    try {
      course = await Course.findById(courseId);
      if (!course) {
        return res.json({
          success: false,
          message: "could not find the course",
        });
      }

      // check wether user is already enrolled in the cousre
      // currently we have user id as a string but in cousre it is present as a obj id so convert it into a obj id
      

//       mongoose.Types.ObjectId(userId) is the recommended way to create an ObjectId from a string.
//       new mongoose.Types.ObjectId() is used when you want to generate a new ObjectId.
         const uid =  mongoose.Types.ObjectId(userId);

        if(Course.studentEnrolled.include({uid})){
            return res.status(200).json({
                success:false,
                message:"student is already enrolled",
            })
        }

    } catch (error) {
       console.error(error);
       return res.status(500).json({
        success:false,
        message:error.message,
    });
    }

    // create order

    const amount =course.price;
    const currency="INR";

    const options={
        amount:amount*100,
        currency,
        receipt:Math.random(Date.now()).toString(),
        notes:{
            courseId:courseId
            ,userId,
        }
    }
   

    try{
       // initiate the payment using razorpay
       const paymentResponse = await instance.orders.create(options);
       console.log(paymentResponse);

       return res.status(200).json({
        success:true,
        courseName:course.courseName,
        courseDescription:course.courseDescription,
        thumbnail:course.thumbnail,
        orderId:paymentResponse.id,
        currency:paymentResponse.currency,
        amount:paymentResponse.amount,

       
    })
    }
    catch(error) {
        console.log(error);
        res.json({
            success:false,
            message:"could not initiate order",
        })
    }
  
   
};



// verify the signature of razorpay and server

exports.verifySignature=async(req,res)=>{
    const webHookSecreat="12345678";

    const signature=req.headers["x-razorpay-signature"];// this will given by razorpay
    // hasing method
    // these are of 3 level// step
    const shasum=crypto.createHmac("sha256" , webHookSecreat);
    shasum.update(json.stringify(req.body));
    const digest=shasum.digest("hex");

    if(signature=== digest){
        console.log("payment is authorised");

        const {courseId,userId}=req.body.payload.payment.entity.notes;
   // add course id in user's course and add student enrolled in courses
        try{
              const enrolledStudent=await user.findOneAndUpdate({_id:userId},
                {
                    $push:{
                        courses:courseId,
                    }
                },
                {new:true}
            )
             

              console.log(enrolledStudent);
             
            const enrolledCourses=  await Course.findOneAndUpdate({_id:courseId},
                {
                    $push:{
                        studentEnrolled:userId,
                    }
                },
                {new:true}
              )
              if(!enrolledCourses){
                return res.status(500).json({
                    success:false,
                     message:"course not found", 
                })
              }

              console.log(enrolledCourses);
              // now send a enrolled mail
             const emailResponse= await mailSender(enrolledStudent.email,"enrollement successfull","congrats you successfully enrolled into the course");
               console.log(emailResponse);

              return res.status(200).json({
                success:true,
                message: "course successfully in user and enrolle students"
              });
        }
        catch(error){
         console.log(error);
         return res.status(500).json({
            success:false,
            message: "course addition faild in user and enrolle students"
          });
        }
    }else{
        return res.status(400).json({
            success:false,
            message: "invalid request"
          });
    }
}

