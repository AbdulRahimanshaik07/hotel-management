
const express = require("express");
const router = express.Router();
const Attendance = require("../models/Attendance");
const Student = require("../models/Student");
const verifyWarden = require("../middleware/verifyWarden");
const verifyAdmin = require("../middleware/verifyAdmin");

// GET all students
router.get("/warden/students", verifyWarden, async (req, res) => {
  try {
    const students = await Student.find().sort({ room: 1, studentName: 1 });
    res.json(students);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// GET attendance by date
router.get("/warden/attendance/today", verifyWarden, async (req, res) => {
  try {
    let { date } = req.query;

    // Agar date pass nahi hui to default = today
    const selectedDate = date ? new Date(date) : new Date();
    selectedDate.setHours(0, 0, 0, 0);

    const nextDate = new Date(selectedDate);
    nextDate.setDate(selectedDate.getDate() + 1);

    const attendance = await Attendance.find({
      date: { $gte: selectedDate, $lt: nextDate },
    });

    res.json(attendance);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});


// 🔹 POST attendance (insert/update)
router.post("/warden/attendance", verifyWarden, async (req, res) => {
  try {
    const { date, attendance } = req.body;
    if (!date) return res.status(400).json({ error: "Date is required" });

    const attendanceDate = new Date(date);
    attendanceDate.setHours(0, 0, 0, 0);

    for (const record of attendance) {
      await Attendance.findOneAndUpdate(
        { studentId: record.studentId, date: attendanceDate },
        { $set: { status: record.status } },
        { upsert: true, new: true }
      );
    }

    res.json({ message: "Attendance submitted successfully" });
  } catch (error) {
    console.error("Error saving attendance:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// GET attendance history by date
router.get("/warden/attendance/history", verifyWarden, async (req, res) => {
  try {
    const { date } = req.query;
    if (!date) return res.status(400).json({ error: "Date is required" });

    const selectedDate = new Date(date);
    selectedDate.setHours(0, 0, 0, 0); // start of day
    const nextDate = new Date(selectedDate);
    nextDate.setDate(selectedDate.getDate() + 1); // end of day range

    const attendance = await Attendance.find({
      date: { $gte: selectedDate, $lt: nextDate },
    }).populate("studentId", "studentName fatherName room year");

    // Map response to frontend format
    const result = attendance.map((a) => ({
      _id: a._id,
      studentId: a.studentId?._id,
      studentName: a.studentId?.studentName || "Unknown",
      fatherName: a.studentId?.fatherName || "",
      room: a.studentId?.room || "",
      status: a.status,
      date: a.date,
      // year: a.studentId.year,
      year: a.studentId?.year || "Unknown", // ✅ Safe access
    }));

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});



// ✅ Admin: Get all wardens attendance
router.get("/allAttendance",verifyAdmin, async (req, res) => {
  try {
    const records = await Attendance.find()
      .populate("studentId", "studentName fatherName year") // ✅ Correct fields
      .populate("wardenId", "name yearAssigned");

    res.json(records);
  } catch (err) {
    console.error("Error fetching attendance:", err);
    res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
});


// Optional: filter by year
router.get("/attendance/year/:year", async (req, res) => {
  try {
    const year = req.params.year;
    const records = await Attendance.find()
      .populate("studentId", "studentName fatherName year")
      .populate("wardenId", "name yearAssigned");

    // Filter students by year
    const filtered = records.filter((a) => a.studentId?.year === year);
    res.json(filtered);
  } catch (err) {
    console.error("Error fetching attendance by year:", err);
    res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
});


// GET /api/warden/attendance/report
router.get("/admin/attendance/report", verifyAdmin, async (req, res) => {
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
