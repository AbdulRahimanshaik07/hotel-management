const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const Gallery = require("../models/Gallery");

// Multer storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/gallery/"); // Folder for gallery images
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // unique filename
  }
});

const upload = multer({ storage });

// ✅ Admin: upload single or multiple images
router.post("/gallery/upload", upload.array("images", 10), async (req, res) => {
  try {
    const files = req.files;
    const images = files.map(f => ({
      title: f.originalname,
      filename: f.filename,
      originalName: f.originalname
    }));
    const created = await Gallery.insertMany(images);
    res.status(201).json(created);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

// ✅ Get all images (for students / admin)
router.get("/gallery", async (req, res) => {
  try {
    const images = await Gallery.find().sort({ createdAt: -1 });
    res.json(images);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

// ✅ Delete image
router.delete("/gallery/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Gallery.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "Image not found" });
    res.json({ message: "Image deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
