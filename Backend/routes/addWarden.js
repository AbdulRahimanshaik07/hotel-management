
const express = require("express");
const router = express.Router();
const Warden = require("../models/Warden");
const multer = require("multer");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken"); // ✅ Add JWT
const verifyWarden = require("../middleware/verifyWarden"); // ✅ Middleware to protect routes
const path = require("path");

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/wardens/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});

const upload = multer({ storage });

/* =======================================================
   ✅ Add new warden
======================================================= */
router.post("/newwarden", upload.single("profilePic"), async (req, res) => {
  try {
    const { name, fatherName, email, password, phone, hostel, yearAssigned } = req.body;

    // Check for existing warden
    const existing = await Warden.findOne({
      $or: [{ email }, { hostel }, { yearAssigned }],
    });

    if (existing) {
      let message = "Duplicate entry!";
      if (existing.email === email) message = "Email already registered!";
      else if (existing.hostel === hostel)
        message = "Hostel already assigned to another warden!";
      else if (existing.yearAssigned === yearAssigned)
        message = "This year already has a warden!";
      return res.status(400).json({ success: false, message });
    }

    // const hashedPassword = await bcrypt.hash(password, 10);
    
    const hashedPassword = await bcrypt.hash(password || "warden@123", 10);

    const newWarden = new Warden({
      name,
      fatherName,
      email,
      password: hashedPassword,
      phone,
      hostel,
      yearAssigned,
    });

    await newWarden.save();
    res.status(201).json({ success: true, message: "Warden added successfully!" });
  } catch (error) {
    console.error("Error adding warden:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

/* =======================================================
   ✅ Change password (keep this above /warden/:id)
======================================================= */
// 🔹 Change Password
router.put("/warden/change-password", verifyWarden, async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res.status(400).json({ success: false, message: "All fields are required!" });
    }

    // Fetch warden including password
    const warden = await Warden.findById(req.warden.id); // DO NOT exclude password
    if (!warden) {
      return res.status(404).json({ success: false, message: "Warden not found" });
    }

    // Compare old password
    const isMatch = await bcrypt.compare(oldPassword, warden.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Old password is incorrect" });
    }

    // Hash new password and save
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    warden.password = hashedPassword;
    await warden.save();

    res.json({ success: true, message: "Password updated successfully" });
  } catch (err) {
    console.error("Error changing password:", err);
    res.status(500).json({ success: false, message: "Server error. Try again." });
  }
});

/* =======================================================
   ✅ Get all wardens (for Admin)
======================================================= */
router.get("/wardens", async (req, res) => {
  try {
    const wardens = await Warden.find().select("-password");
    if (!wardens.length)
      return res.status(404).json({ message: "No wardens found" });

    res.status(200).json({ success: true, count: wardens.length, wardens });
  } catch (error) {
    console.error("❌ Error fetching wardens:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

/* =======================================================
   ✅ Get single warden by ID
======================================================= */
router.get("/warden/:id", async (req, res) => {
  try {
    const warden = await Warden.findById(req.params.id).select("-password");
    if (!warden)
      return res.status(404).json({ success: false, message: "Warden not found" });

    res.status(200).json({ success: true, data: warden });
  } catch (error) {
    console.error("Error fetching warden:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

/* =======================================================
   ✅ Update warden
======================================================= */
router.put("/warden/:id", async (req, res) => {
  try {
    const updateData = { ...req.body };
    if (updateData.password) {
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(updateData.password, salt);
    }

    const updated = await Warden.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    if (!updated)
      return res.status(404).json({ success: false, message: "Warden not found" });

    res.json({
      success: true,
      message: "Warden updated successfully",
      data: updated,
    });
  } catch (err) {
    console.error("Error updating warden:", err);
    res.status(500).json({ success: false, message: "Server error: " + err.message });
  }
});

/* =======================================================
   ✅ Delete warden
======================================================= */
router.delete("/warden/:id", async (req, res) => {
  try {
    const deleted = await Warden.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res.status(404).json({ success: false, message: "Warden not found" });

    res.json({ success: true, message: "Warden deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
