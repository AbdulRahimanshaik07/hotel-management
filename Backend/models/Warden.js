
const mongoose = require("mongoose");

const wardenSchema = new mongoose.Schema({
  name: { type: String, required: true },
  fatherName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: {type: String, required: true, default: "warden@123"},
  phone: { type: String },
  hostel: { type: String, required: true, unique: true },
  yearAssigned: {type: String, required: true, unique: true},
  resetPasswordToken: {type: String},
  resetPasswordExpires:  {type: Date},
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Warden", wardenSchema);
