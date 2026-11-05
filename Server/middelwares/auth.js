const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/user");

// auth
exports.auth = async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");
    let token =
      req.cookies?.token ||
      req.body?.token ||
      (authHeader && authHeader.replace(/^Bearer\s+/i, ""));

    if (token && typeof token === "string") {
      token = token.replace(/^"(.*)"$/, "$1").trim();
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token not found",
      });
    }

    // token verification
    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decode;
      req.User = decode;
      next();
    } catch (error) {
      console.error("JWT ERROR:", error.name, error.message);
      return res.status(401).json({
        success: false,
        message:
          error.name === "TokenExpiredError"
            ? "Token expired, please log in again"
            : "Token is invalid",
        error: error.message,
      });
    }
  } catch (error) {
    console.error("AUTH MIDDLEWARE ERROR:", error);
    return res.status(401).json({
      success: false,
      message: "Something went wrong during validating token",
    });
  }
};

// isStudent
exports.isStudent = async (req, res, next) => {
  try {
    const accountType = req.user?.accountType || req.User?.accountType;
    if (accountType !== "Student") {
      return res.status(401).json({
        success: false,
        message: "This is a protected route for Students only",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong during validation",
    });
  }
};

// isInstructor
exports.isInstructor = async (req, res, next) => {
  try {
    const accountType = req.user?.accountType || req.User?.accountType;
    if (accountType !== "Instructor") {
      return res.status(401).json({
        success: false,
        message: "This is a protected route for Instructors only",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong during validation",
    });
  }
};

// isAdmin
exports.isAdmin = async (req, res, next) => {
  try {
    const accountType = req.user?.accountType || req.User?.accountType;
    if (accountType !== "Admin") {
      return res.status(401).json({
        success: false,
        message: "This is a protected route for Admins only",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong during validation",
    });
  }
};
