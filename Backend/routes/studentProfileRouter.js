// Backend: routes/student.js
const express = require("express");
const router = express.Router();
const Student = require("../models/Student");
const verifyStudent = require("../middleware/verifyStudent"); // JWT auth middleware
const bcrypt = require("bcryptjs");

router.get("/studentProfile", verifyStudent, async (req, res) => {
  try {
    const student = await Student.findById(req.student._id).select(
      "name studentName studentId room year"
    );

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json({ student });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Change student password
router.put("/student/change-password", verifyStudent, async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const studentId = req.student.id; // decoded from token in verifyStudent

    if (!oldPassword || !newPassword) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    // Find student by ID
    const student = await Student.findById(studentId);
    if (!student) {
      return res
        .status(404)
        .json({ success: false, message: "Student not found" });
    }

    // Compare old password
    const isMatch = await bcrypt.compare(oldPassword, student.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Old password is incorrect" });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password
    student.password = hashedPassword;
    await student.save();

    res.json({
      success: true,
      message: "Password updated successfully!",
    });
  } catch (error) {
    console.error("Error changing password:", error);
    res.status(500).json({
      success: false,
      message: "Server error while changing password",
    });
  }
});


module.exports = router;
