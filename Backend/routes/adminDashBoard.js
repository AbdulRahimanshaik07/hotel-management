

const express = require("express");
const router = express.Router();
const Student = require("../models/Student");
const Complaint = require("../models/Complaint");
const Room = require("../models/Room");
const Warden = require("../models/Warden");

// ✅ Dashboard Summary Route
router.get("/admin/dashboard-stats", async (req, res) => {
  try {
    const totalStudents = await Student.countDocuments();
    const totalComplaints = await Complaint.countDocuments({ status: "Pending" });
    const totalRooms = await Room.countDocuments();
    const totalWardens = await Warden.countDocuments();

    res.status(200).json({
      success: true,
      data: {
        totalStudents,
        totalComplaints,
        totalRooms,
        totalWardens,
      },
    });
  } catch (error) {
    console.error("Dashboard Error:", error);
    res.status(500).json({ success: false, message: "Failed to load dashboard data" });
  }
});

module.exports = router;
