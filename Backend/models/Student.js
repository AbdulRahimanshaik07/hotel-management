
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const studentSchema = new mongoose.Schema({
  studentName: { type: String },
  fatherName: { type: String },
  motherName: { type: String },
  studentMobile: { type: String, match: /^[0-9]{10}$/ },
  fatherMobile: { type: String, match: /^[0-9]{10}$/ },
  email: { type: String, unique: true, sparse: true }, // ✅ sparse: true to avoid duplicate null errors
  studentId: { type: String, unique: true, required: true },
  course: { type: String },
  session: { type: String },
  year: { type: String },
  room: { type: String },
  photo: { type: String },
  joinDate: { type: Date, default: Date.now },

  // 🆕 Auth fields
  password: { type: String, required: true, default: "student@123" },
  passwordChanged: { type: Boolean, default: false },
});

module.exports = mongoose.model("Student", studentSchema);
