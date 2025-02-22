const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.autho = (req, res, next) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "JWT token is missing",
      });
    }
    // getting the token fron server

    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      req.user = payload;
     } catch (err) {
      return res.status(401).json({
        success: false,
        message: "JWT token is invalid or does not exist",
      });
    }
    next(); 
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "internal server err",
    });
  }
};

exports.isStudent = (req, res, next) => {
  try {
    if (req.user.role !== "student") {
      res.status(403).json({
        success: false,
        message: "this is the protected route for students",
      });
    }
    next();
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "internal server err",
    });
  }
};

exports.isAdmin = (req, res, next) => {
  try {
    if (req.user.role !== "admin") {
      res.status(403).json({
        success: false,
        message: "this is the protected route for admin",
      });
    }
    next();
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "internal server err",
    });
  }
};
