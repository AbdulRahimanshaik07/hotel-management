// const express = require("express");
// const jwt = require("jsonwebtoken");
// const Student = require("../models/Student");
// const router = express.Router();
//  const bcrypt = require("bcryptjs");

// router.post("/student/login", async (req, res) => {
//   console.log("Received body:", req.body); // 👈 add this line
//   const { studentId, password } = req.body;

//   if (!studentId || !password) {
//     return res.status(400).json({ message: "Student ID and password are required" });
//   }

//   try {
//     const student = await Student.findOne({ studentId });
//     if (!student) {
//       return res.status(404).json({ message: "No student found with this ID" });
//     }

//     // const isMatch = await student.comparePassword(password);
//     const isMatch = await bcrypt.compare(password, student.password);
//     console.log(isMatch);
//     if (!isMatch) {
//       return res.status(400).json({ message: "Invalid credentials" });
//     }

//     res.status(200).json({
//       success: true,
//       message: "Login successful",
//       student,
//     });
//   } catch (err) {
//     console.error("Login error:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// });


// module.exports = router;


const express = require("express");
const jwt = require("jsonwebtoken");
const Student = require("../models/Student");
const router = express.Router();
const bcrypt = require("bcryptjs");

router.post("/student/login", async (req, res) => {
  const { studentId, password } = req.body;

  if (!studentId || !password) {
    return res.status(400).json({ message: "Student ID and password are required" });
  }

  try {
    const student = await Student.findOne({ studentId });
    if (!student) {
      return res.status(404).json({ message: "No student found with this ID" });
    }

    const bcrypt = require("bcryptjs");
    const isMatch = await bcrypt.compare(password, student.password);
    console.log(isMatch);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // ✅ Generate JWT token
    const token = jwt.sign(
      { id: student._id, role: "student", studentId: student.studentId },
      process.env.JWT_SECRET || "secretkey",
      { expiresIn: "1d" } // 1 hour expiry
    );

    res.status(200).json({
      success: true,
      message: "Login successful",
      student,
      token, // ✅ send token to frontend
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
