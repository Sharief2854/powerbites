const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  discription: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },

  role: {
    type: String,
    default: "user",
    enum: ["user", "admin"]
  },

  isVerified: {
    type: Boolean,
    default: false
  }
});

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;