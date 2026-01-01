// routes/contact.js
const express = require("express");
const router = express.Router();
const ContactMessage = require("../models/Contact");

// POST /api/contact
router.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }

  try {
    const newMessage = new ContactMessage({ name, email, message });
    await newMessage.save();
    res.status(200).json({ success: true, message: "Message sent successfully" });
  } catch (error) {
    console.error("Error saving contact message:", error);
    res.status(500).json({ success: false, message: "Server error. Try again later." });
  }
});


// ye route admin ke liye hai
// GET /api/contact => fetch all messages
router.get("/contact", async (req, res) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 }); // newest first
    res.status(200).json({ success: true, data: messages });
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ✅ Delete a message by ID
router.delete("/contact/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const msg = await ContactMessage.findById(id);
    if (!msg) {
      return res.status(404).json({ success: false, message: "Message not found" });
    }

    await ContactMessage.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Message deleted successfully" });
  } catch (error) {
    console.error("Error deleting message:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
  });

module.exports = router;
