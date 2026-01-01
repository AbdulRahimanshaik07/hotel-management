const express = require("express");
const multer = require("multer");
const path = require("path");
const Complaint = require("../models/Complaint");
const verifyStudent = require("../middleware/verifyStudent");
const verifyAdmin = require("../middleware/verifyAdmin");
const verifyWarden = require("../middleware/verifyWarden");
const router = express.Router();
const Student = require("../models/Student");

// Complaint submit
router.post("/student/complaint", verifyStudent, async (req, res) => {
  try {
    const { title, description, category, studentName } = req.body;

    if (!title || !description || !category || !studentName) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    // ✅ Use req.student instead of req.user
    const student = await Student.findById(req.student.id);
    if (!student) return res.status(404).json({ msg: "Student not found" });

    const complaint = new Complaint({
      student: student._id,
      studentName,
      title,
      description,
      category,
      status: "Pending",
      date: new Date(),
    });

    await complaint.save();
    res.status(200).json({ msg: "Complaint submitted successfully", complaint });
  } catch (err) {
    console.error("Complaint Error:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

// Get student complaints
router.get("/student/my-complaints", verifyStudent, async (req, res) => {
  try {
    console.log("Logged in student:", req.student);

    // ✅ Use req.student.id
    const complaints = await Complaint.find({ student: req.student.id }).sort({ date: -1 });
    res.json(complaints);
  } catch (err) {
    console.error("Get complaints error:", err);
    res.status(500).json({ msg: "Server Error" });
  }
});


// DELETE /api/student/complaint/:id
router.delete("/student/delete/:id", verifyStudent, async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);
    if (!complaint) return res.status(404).json({ msg: "Complaint not found" });

    // ✅ Ensure student owns this complaint
    if (complaint.student.toString() !== req.student.id)
      return res.status(403).json({ msg: "Unauthorized" });

    await complaint.deleteOne();
    res.json({ msg: "Complaint deleted successfully" });
  } catch (err) {
    console.error("Delete complaint error:", err);
    res.status(500).json({ msg: "Server error" });
  }
});


// ye route admin ke liye hai yaha admin complaint ko access kar raha hai
router.get("/admin/complaints", verifyAdmin, async (req, res) => {
  try {
    const complaints = await Complaint.find().sort({ createdAt: -1 });

    const data = complaints.map((c) => ({
      _id: c._id,
      title: c.title,
      description: c.description,
      category: c.category,
      status: c.status,
      date: c.createdAt,
      studentName: c.studentName || "Unknown", // directly use stored studentName
    }));

    res.json({ complaints: data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

// Update complaint status admin
router.patch("/admin/complaint/:id", verifyAdmin, async (req, res) => {
  try {
    const { status } = req.body;
    const complaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.json({ complaint });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

// Delete complaint admin
router.delete("/admin/complaint/:id", verifyAdmin, async (req, res) => {
  try {
    await Complaint.findByIdAndDelete(req.params.id);
    res.json({ msg: "Complaint deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});




module.exports = router;
