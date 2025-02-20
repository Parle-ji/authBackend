const mongoose = require("mongoose");

const userScheama = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  confirmPassword: {
    type: String,
  },
  role: {
    type: String,
    enum: ["admin", "student", "visitor"],
  },
});

module.exports = mongoose.model("User", userScheama);
