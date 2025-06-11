const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/user");

// auth
exports.auth = async (req, res, next) => {
  try {
    // extract token
    const token =
      req.cookies.token ||
      req.body.token ||
      req.header("Authorization").replace("Bearer", "");

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "token not found",
      });
    }

    // token verification
    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decode);
      req.User = decode;// add user in decode payload
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "token is invalid",
      });
    }
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "something went wrong during validating token",
    });
  }
};

//isStudent

exports.isStudent = async (req, res, next) => {
  try {
    if (req.User.accountType !== "Student") {
      return res.status(401).json({
        success: false,
        message: "this is protected route for student only",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "something went wrong during validating ",
    });
  }
};

// isInstructor
exports.isInstructor = async (req, res, next) => {
  try {
    if (req.User.accountType !== "Instructor") {
      return res.status(401).json({
        success: false,
        message: "this is protected route for Instructor only",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "something went wrong during validating ",
    });
  }
};

//isAdmin
exports.isAdmin = async (req, res, next) => {
  try {
    if (req.User.accountType !== "Admin") {
      return res.status(401).json({
        success: false,
        message: "this is protected route for Admin only",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "something went wrong during validating ",
    });
  }
};
