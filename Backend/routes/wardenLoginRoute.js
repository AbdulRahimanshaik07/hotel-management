// routes/wardenAuth.js
const express = require("express");
const router = express.Router();
const Warden = require("../models/Warden");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

// POST /api/warden/forgot-password
router.post("/warden/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required" });

    const warden = await Warden.findOne({ email });
    if (!warden) return res.status(404).json({ message: "Warden not found" });

    // Generate a token valid for 1 hour
    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenExpiry = Date.now() + 60 * 60 * 1000; // 1 hour

    // Save token & expiry to warden model
    warden.resetPasswordToken = resetToken;
    warden.resetPasswordExpires = resetTokenExpiry;
    await warden.save();

    // Create reset URL
    const resetURL = `http://localhost:3000/warden/reset-password/${resetToken}`;

    // Send email
    const transporter = nodemailer.createTransport({
      service: "Gmail", // or any SMTP service
      auth: {
        user: process.env.EMAIL_USER, // your email
        pass: process.env.EMAIL_PASS, // your email password / app password
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Hostel Management System - Reset Password",
      html: `<p>Hi ${warden.name},</p>
             <p>You requested a password reset. Click the link below to reset your password:</p>
             <a href="${resetURL}">Reset Password</a>
             <p>This link will expire in 1 hour.</p>`,
    };

    await transporter.sendMail(mailOptions);

    res.json({ message: "Password reset link sent to your email" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
