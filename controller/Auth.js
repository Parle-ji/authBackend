const User = require("../models/userSchema");
const bcrypt = require("bcrypt");

exports.signup = async (req, res) => {
  try {
    // get data from client
    const { name, password, role, email } = req.body;

    // check all data are full field
    if (!name || !password || !role || !email) {
      return res.status(409).json({
        success: false,
        message: "all fields are required",
      });
    }

    const existingUser = await User.findOne({ email }); // check user are already or not

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "user already exists",
      });
    }

    // secure password
    let hashedPassword;

    try {
      hashedPassword = await bcrypt.hash(password, 10);
    } catch (err) {
      console.log("hashing err");
      return res.status(500).json({
        success: false,
        message: "error in hashing",
      });
    }

    const userData = new User({
      name,
      email,
      password: hashedPassword,
      role,
    });

    const result = await userData.save();
    // const result = await User.create({
    //   name,
    //   email,
    //   password: hashedPassword,
    //   role,
    // });
    res.status(200).json({
      success: true,
      data: result,
      message: "entry created successfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      data: err,
      message: "user cannot be created please try again leter",
    });
  }
};
