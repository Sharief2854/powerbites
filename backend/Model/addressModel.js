const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true
  },

  label: {
    type: String, // Home, Work
    default: "Home",
    enum: ["Home", "Work", "Other"],
    required: true
  },

  street: {
    type: String,
    required: true
  },

  city: {
    type: String,
    required: true
  },

  state: {
    type: String,
    required: true
  },

  pincode: {
    type: Number,
    required: true
  },

  country: {
    type: String,
    default: "India"
  },

  isDefault: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

 const addressModel = mongoose.model("Address", addressSchema);
 module.exports = addressModel;