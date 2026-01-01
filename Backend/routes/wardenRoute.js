
// require("dotenv").config();
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Warden = require("../models/Warden");
const router = express.Router();
const Student = require("../models/Student");
const auth = require("../middleware/verifyStudent");
const DailyAttendance = require("../models/Attendance");
const Attendance = require("../models/Attendance");
const multer = require("multer");
const path = require("path");
const verifyWarden = require("../middleware/verifyWarden");


// ✅ Warden login
router.post("/warden/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("🔹 Login request:", email, password);
    if (!email || !password)
      return res.status(400).json({ success: false, message: "Email and password required" });

    const warden = await Warden.findOne({ email: { $regex: new RegExp(`^${email}$`, "i") } });
    if (!warden)
      return res.status(400).json({ success: false, message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, warden.password);
    if (!isMatch)
      return res.status(400).json({ success: false, message: "Invalid email or password" });

    // const token = jwt.sign({ id: warden._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
      const token = jwt.sign(
    {
      id: warden._id,
      role: "warden",
      yearAssigned: warden.yearAssigned,  // 🧠 ye zaruri hai
      hostel: warden.hostel
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      warden: { _id: warden._id, name: warden.name, email: warden.email },
    });
  } catch (err) {
    console.error("Warden login error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});



// Get students for logged-in warden
router.get("/warden/students", verifyWarden, async (req, res) => {
  try {
    // yahan req.warden.yearAssigned JWT se aayega
    const yearAssigned = req.warden.yearAssigned;

    const students = await Student.find({ year: yearAssigned });

    if (!students || students.length === 0) {
      return res.status(404).json({ message: "No students found for your year" });
    }

    res.status(200).json(students);
  } catch (err) {
    console.error("Error fetching students:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});


router.get("/warden/attendance/today", verifyWarden, async (req, res) => {
  try {
    if (req.user.role !== "warden") return res.status(403).json({ msg: "Access denied" });

    const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD format
    const year = req.user.yearAssigned;

    const dailyAttendance = await DailyAttendance.findOne({ date: today, year });

    // ✅ always return array
    res.json(dailyAttendance?.attendance || []);
  } catch (err) {
    console.error("Error fetching attendance:", err.message);
    res.status(500).json([]); // return empty array on error
  }
});


// Get attendance history for a specific student
router.get("/attendance/history/:studentId", verifyWarden, async (req, res) => {
  try {
    if (req.user.role !== "warden") return res.status(403).json({ msg: "Access denied" });

    const studentId = req.params.studentId;

    // Find all daily attendance records where this student appears
    const records = await DailyAttendance.find({ "attendance.studentId": studentId })
      .sort({ date: -1 }); // latest first

    // Map to simple array
    const history = records.map((record) => {
      const studentAttendance = record.attendance.find(a => a.studentId.toString() === studentId);
      return {
        date: record.date,
        status: studentAttendance.status
      };
    });

    res.json(history);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: err.message });
  }
});


// GET /api/warden/attendance/report
router.get("/warden/attendance/report", verifyWarden, async (req, res) => {
  try {
    const { startDate, endDate, room, studentName } = req.query;

    const filter = {};

    // Date range filter
    if (startDate || endDate) {
      filter.date = {};
      if (startDate) filter.date.$gte = new Date(startDate);
      if (endDate) {
        const nextDate = new Date(endDate);
        nextDate.setDate(nextDate.getDate() + 1); // include endDate
        filter.date.$lt = nextDate;
      }
    }

    // Room filter
    if (room) filter.room = room;

    // Fetch attendance
    const attendanceData = await Attendance.find(filter)
      .populate("studentId", "studentName fatherName room year")
      .sort({ date: -1 });

    // Filter by studentName if provided
    const result = attendanceData
      .map((a) => ({
        studentName: a.studentId?.studentName || "Unknown",
        fatherName: a.studentId?.fatherName || "",
        room: a.studentId?.room || "",
        status: a.status,
        year: a.studentId?.year,
        date: a.date,
      }))
      .filter((a) =>
        studentName
          ? a.studentName.toLowerCase().includes(studentName.toLowerCase())
          : true
      );

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});



module.exports = router;


