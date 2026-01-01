// if (process.env.NODE_ENV !== "production") {
//   require("dotenv").config();
// }

// const express = require("express");
// const router = express.Router();
// const fs = require("fs");
// const { upload, cloudinary } = require("../cloudConfig");
// const MessPDF = require("../models/Mess");

// // ✅ Upload PDF to Cloudinary
//   router.post("/mess/upload", upload.single("pdf"), async (req, res) => {
//   try {
//     // Cloudinary URL auto milta hai
//     const newPdf = new MessPDF({
//       title: req.body.title,
//       fileUrl: req.file.path, // Cloudinary URL
//       publicId: req.file.filename, // Cloudinary public ID
//       originalName: req.file.originalname,
//     });

//     await newPdf.save();
//     res.status(200).json({ success: true, message: "Uploaded!", pdf: newPdf });
//   } catch (error) {
//     console.error("Upload error:", error);
//     res.status(500).json({ success: false, message: "Upload failed" });
//   }
// });


// // ✅ Get all PDFs
// router.get("/mess", async (req, res) => {
//   try {
//     const pdfs = await MessPDF.find().sort({ createdAt: -1 });
//     res.json(pdfs);
//   } catch (err) {
//     console.error("Fetch error:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// // ✅ Delete a PDF (from Cloudinary + DB)
// router.delete("/mess/:id", async (req, res) => {
//   try {
//     const pdf = await MessPDF.findById(req.params.id);
//     if (!pdf) return res.status(404).json({ message: "PDF not found" });

//     // 🔹 Delete from Cloudinary (as raw file)
//     await cloudinary.uploader.destroy(pdf.publicId, { resource_type: "raw" });

//     // 🔹 Delete from MongoDB
//     await pdf.deleteOne();

//     res.json({ success: true, message: "PDF deleted successfully" });
//   } catch (err) {
//     console.error("Delete error:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// module.exports = router;


const express = require("express");
const router = express.Router();
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const Mess = require("../models/Notification");

// ✅ Cloudinary Config
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// ✅ Multer memory storage (no local file saving)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// =============================
// 📥 Upload PDF to Cloudinary
// =============================
router.post("/mess/upload", upload.single("pdf"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    // Upload to Cloudinary as raw file (PDF)
    const stream = cloudinary.uploader.upload_stream(
      { resource_type: "raw", folder: "mess_pdfs" },
      async (error, result) => {
        if (error) {
          console.error("Cloudinary upload error:", error);
          return res.status(500).json({ message: "Upload failed" });
        }

        // Save file info to MongoDB
        const newPDF = new Mess({
          title: req.body.title,
          filename: result.public_id, // public_id saved here
          fileUrl: result.secure_url, // Cloudinary link
          originalName: req.file.originalname,
        });

        await newPDF.save();
        res.json({ success: true, message: "PDF uploaded", data: newPDF });
      }
    );

    // send file buffer to Cloudinary
    stream.end(req.file.buffer);
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// =============================
// 📤 Get All PDFs
// =============================
router.get("/mess", async (req, res) => {
  try {
    const pdfs = await Mess.find().sort({ createdAt: -1 });
    res.json(pdfs);
  } catch (err) {
    console.error("Fetch error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// =============================
// 🗑️ Delete PDF (Cloudinary + DB)
// =============================
router.delete("/mess/:id", async (req, res) => {
  try {
    const pdf = await Mess.findById(req.params.id);
    if (!pdf) return res.status(404).json({ message: "PDF not found" });

    console.log("Deleting from Cloudinary:", pdf.filename);

    // Delete from Cloudinary
    await cloudinary.uploader.destroy(pdf.filename, { resource_type: "raw" });

    // Delete from MongoDB
    await pdf.deleteOne();

    res.json({ success: true, message: "PDF deleted successfully" });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
