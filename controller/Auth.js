const User = require("../models/userSchema");
const bcrypt = require("bcrypt");

exports.signup = async (req, res) => {
  try {
    // get data from client
    const { name, password, role, email, confirmPassword } = req.body;

    // check all data are full field
    if (!name || !password || !role || !email || !confirmPassword) {
      return res.status(409).json({
        success: false,
        message: "all fields are required",
      });
    }

    //check password or confirm password are same or not

    if (confirmPassword !== password) {
      return res.status(400).json({
        success: false,
        message: "confirm password is not matched",
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

// handling login

exports.login = async (req, res) => {
  try {
    // fetching the data from client
    const { email, password } = req.body;

    // checking the data is full fieled or not
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "all fields are required",
      });
    }

    // checking of registerd or not
    let user = await User.findOne({ email });

    // if not a registered user
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "you are not our custumer please signup",
      });
    }

    // verify the password and genrate jwt token
    const jwt = require("jsonwebtoken");

    const payload = {
      email: user.email,
      id: user._id,
      role: user.role,
    };

    require("dotenv").config();

    if (await bcrypt.compare(password, user.password)) {
      let token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "4h",
      });

      // adding token and password undefined at client side
      user = user.toObject();
      user.token = token;
      user.password = null;


      const option = {
        maxAge: 4 * 60 * 60 * 1000,
        httpOnly: true,
      };
      //adding cookie
      res
        .cookie("Cookies", token, option)
        .status(200)
        .json({
          success: true,
          data: user,
          message: `User logged in successfully ${user.name}`,
        });
    } else {
      res.status(403).json({
        success: false,
        message: "password do not matched.",
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      data: err,
      message: "loggin failure",
    });
  }
};
