
// import required models

    const user=require("../models/user");
    const OTP=require("../models/OTP");
    const otpGenerator=require("otp-generator");
    const bcrypt=require("bcryptjs");
    const jwt=require("jsonwebtoken");
    
      require("dotenv").config();
    const mailSender=require("../utils/mailSender");
      const Profile = require("../models/Profile");
    // Otp generator

    exports.sendOTP=async (req, res)=>{
        try{
    //fectch email
        const {email}=req.body;

        // check if user already exist or not

        const ceheckUser=await user.findOne({email});

        if(ceheckUser){
            return res.status(401).json({
                success:false,
                message: 'user already exist',
            })
            
        }

        // generate otp

        var otp=otpGenerator.generate(6,{
            //things that your otp consists or not
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false,
        });

        console.log("otp generated :", otp);
        

        // now check the generated otp is unique or not
        
        var result=await OTP.findOne({otp});

        // if we find otp previously exit then gernrate again and again untill u get unique
        while(result){
            otp=otpGenerator.generate(6,{
                //things that your otp consists or not
                upperCaseAlphabets:false,
                lowerCaseAlphabets:false,
                specialChars:false,
            });
            result=await OTP.findOne({otp});

        }

        // now create an entry in db for verification

        const otpPayload={email,otp};

        const otpBody=await OTP.create(otpPayload);
        console.log(otpBody);

        // return response successful

        res.status(200).json({
            success:true,
            message:"OTP Send Successfully at Your Email",
            otp,
        })

    
        }
        catch (error){
        console.log(error);
        
            return  res.status(500).json({
                success:false,
                message:error.message,
            })
        
        }
    
    };


    exports.signUp=async (req,res) =>{
        try{
            // fetch data

        const{firstName,lastName, email,password,confirmPassword,accountType,otp  }=req.body;
        console.log("SignUp Request Data: ", { firstName, lastName, email, password, confirmPassword, accountType, otp });


        // validate data 
        if(!firstName||!lastName|| !email ||!password|| !confirmPassword  || !otp){
            return res.status(403).json({
                success:false,
                message:"all fields are required",
            })
        }
        
        //check password and confirmPassword are mismatch
        if(password!==confirmPassword){
            return res.status(400).json({
                status:false,
                message:"password and confirmPassword are mismatch",
            })
        }

        // check user exist or not

        const ceheckUser=await user.findOne({email});
        if(ceheckUser){
            return res.status(400).json({
                status:false,
                message:"user already exist",
            })
        }

        // find the recent otp
        
        const recentOtp=await OTP.find({email}).sort({createdAt:-1}).limit(1);
        console.log(recentOtp);

        if(recentOtp.length == 0 ){
            return res.status(400).json({
                status:false,
                message:"otp not found",
            })
        }
        else if(recentOtp[0].otp !== otp ){
            return res.status(400).json({
                status:false,
                message:"Incorrect OTP",
            })
        }
        

        // hasing a password using bcrypt lib
        const hashedpassword= await bcrypt.hash(password,10);

    //  crate profile details for additional details
    const profileDetails=await Profile.create({
        gender:null,
        dateOfBirth:null,
        about:null,
        // contactNumber:null,
    })
        // create an entry in db

        const User=await user.create({
            firstName,lastName, email,
            password:hashedpassword
            ,accountType,
            // contactNumber,
            additionalDetails:profileDetails._id,
            // api to genrate automted img of our first and last name letter

            image:`https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,

        
        })
        // return response
        return  res.status(200).json({
            success:true,
            message:"User is resistered successfully",
            User,
        })


        }
        catch (error){
            console.log(error);
        
            return  res.status(500).json({
                success:false,
                message:"User cannot be resistered. please try again",
            })
        }
    

    };

    exports.login= async (req,res)=>{
        try{
            const {email,password}=req.body;

            if( !email ||!password ){
                return res.status(403).json({
                    success:false,
                    message:"all fields are required",
                })
            }

            // check user exist or not

            const User=await user.findOne({email}).populate("additionalDetails");
            if(!User){
                return res.status(401).json({
                    success:false,
                    message:"user does not exist, please signUp first ",
                })
            }
            // check the password and generate jwt token
            if(await bcrypt.compare(password,User.password)){
                const payload = {
                    email : User.email,
                    id:User._id,
                    accountType:User.accountType,
                }
            const token =jwt.sign(payload,process.env.JWT_SECRET,
                {
                    expiresIn:"2h"
                })
            

            User.token=token;
            User.password=undefined; 

            // create cookie and send response

            const options={
                expires:new Date(Date.now() + 3*24*60*60*1000),//3 days
                httpOnly:true,
            }
            res.cookie("token",token , options).status(200).json({
                success:true,
                message:"login successfully" ,
                token,
                User,
            })

            }
            else{
                return  res.status(401).json({
                    success:false,
                    message:"password is incorrect",
                    
                })
            }

            

        }
        catch(error){
            console.log(error);
        
            return  res.status(500).json({
                success:false,
                message:"User cannot loggedIn. please try again",
            })
        }
    }

    exports.changedPassword=async (req,res)=>{
    try{

        
    const {email,oldPassword, newPassword,confirmNewPassword}=req.body;

    if(!oldPassword||!newPassword ||!confirmNewPassword){
        return res.status(403).json({
            success:false,
            message:'all fields are required'
        })
    }

    const User=await user.findOne({email});
    if (!User) {
        return res.status(404).json({
            success: false,
            message: "User not found.",
        });
    }
    //  Check if oldPassword matches the existing password
    const isPasswordValid = await bcrypt.compare(oldPassword, User.password);
    if (!isPasswordValid) {
        return res.status(401).json({
            success: false,
            message: "Old password is incorrect.",
        });
    }
    //  Ensure newPassword matches confirmNewPassword
    if (newPassword !== confirmNewPassword) {
        return res.status(400).json({
            success: false,
            message: "New password and confirm new password do not match.",
        });
    }


    if(bcrypt.compare(newPassword,User.password)){
        return res.status(401).json({
            success:false,
            message:' New password must be different from  previous password',
        })
    }
    //Hash the new password
    const hashedpassword=await bcrypt.hash(newPassword,10);
    //  Update the password in the database
    User.password=hashedpassword;
    await user.save();

    const title = "Password Updated Successfully";

    const body = `<p>Hi ${User.name},</p>
            <p>Your password has been successfully updated. If you did not make this change, please contact our support team immediately.</p>
            <p>Best regards,<br>TutorVerse</p>`;
    await mailSender(email, title, body);


    return res.status(200).json({
        success: true,
        message: "Password changed successfully.",
    });

    }

    catch(error){
    console.log(error);
    return res.status(500).json({
        success:false,
        message:"Something went wrong. Please try again."
    });
    }


    }
