// routes/attendance.js
const express = require("express");
const Attendance = require("../models/Attendance");
const verifyStudent = require("../middleware/verifyStudent");
const verifyToken = require("../middleware/verifyToke");
const Student = require("../models/Student");

const router = express.Router();

router.get("/check", verifyStudent, async (req, res) => {
  try {
    console.log("Logged in student:", req.user);
    const studentId = req.user.id; // ✅ FIXED LINE

    const attendance = await Attendance.find({ student: studentId });
    res.json(attendance);
  } catch (err) {
    console.error("Error fetching attendance:", err);
    res.status(500).json({ msg: "Server error" });
  }
});


// Get attendance for logged in student
router.get("/attendance/my-attendance", verifyStudent, async (req, res) => {
  try {
    // console.log("Logged in student:", req.user); // ✅ check
    const records = await Attendance.find({ studentId: req.student.id }).sort({ date: -1 });
    // console.log("Attendance Found: ",records);
    res.json(records);
  } catch (err) {
    console.error("Error fetching attendance:", err);
    res.status(500).json({ msg: "Server error" });
  }
});


module.exports = router;
