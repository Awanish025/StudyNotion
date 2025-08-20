const User = require("../models/user");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcryptjs");

exports.resetPasswordToken = async (req, res) => {
  try {
    // get email
    const { email } = req.body;

    // validated
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Your mail is not registered",
      });
    }

    // generate token by using crypto.randomUUID this helps us to diff diff people

    const token = crypto.randomUUID();

    // update user by token and update expiration time
    const updateDetails = await User.findOneAndUpdate(
      { email },
      {
        token: token,
        resetPasswordExpires: Date.now() + 5 * 60 * 1000,
      },
      { new: true } // due to this we get updated data
    );
    console.log("Details :" ,updateDetails);
    // creating url
    const url = `http://localhost:3000/update-password/${token}`;
    //send mail containing the url
    await mailSender(
      email,
      "Password reset Link",
     `Your Link for email verification is ${url}. Please click this url to reset your password.`
    );
    // return response
    return res.json({
      success: true,
      message: "email sent sucessfully at your registered email",
      updateDetails
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "something went wrong while resting password",
    });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    // get data
    const { password, confirmPassword, token } = req.body;
    // validation
    if (password !== confirmPassword) {
      return res.json({
        success: false,
        message: "password mismatch",
      });
    }

    const userDetails = await User.findOne({ token: token });
    if (!userDetails) {
      return res.json({
        success: false,
        message: "token invalid",
      });
    }
    // check time

    if (userDetails.resetPasswordExpires < Date.now()) {
      return res.json({
        success: false,
        message: "token is expired",
      });
    }

    // hash pwd
    const hashedpassword = await bcrypt.hash(password, 10);
    // password update
    await User.findOneAndUpdate(
      { token: token },
      { password: hashedpassword },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      message: "Password reset Successful",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "something went wrong during reseting password",
    });
  }
};
