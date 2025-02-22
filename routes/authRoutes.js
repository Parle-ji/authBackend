const express = require("express");
const router = express.Router();

const { signup, login } = require("../controller/Auth");

const { autho, isStudent, isAdmin } = require("../middleware/userAutho");

router.post("/signup", signup);
router.post("/login", login);

// for testing purpose
router.get("/testing", autho, (req, res) => {
    res.status(200).json({
        success:true,
        message:"welcome to the testing route"
    })
});

// protected routes
router.get("/student", autho, isStudent, (req, res) => {
  res.status(200).json({
    success: true,
    message: "welcome to the student page",
  });
});
router.get("/admin", autho, isAdmin, (req, res) => {
  res.status(200).json({
    success: true,
    message: "welcome to the admin page",
  });
});
module.exports = router;
