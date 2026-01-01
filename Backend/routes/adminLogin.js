const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

router.post("/admin/login", (req, res) => {
  const { email, password } = req.body;

  if (
    email === process.env.ADMIN_EMAIL &&
    password === process.env.ADMIN_PASSWORD
  ) {
    const token = jwt.sign(
      { role: "admin" },
      process.env.JWT_SECRET || "demo-secret",
      { expiresIn: "1d" }
    );

    res.json({
      success: true,
      token,
      admin: { email, name: "Admin" },
    });
  } else {
    res.status(401).json({ success: false, msg: "Invalid credentials" });
  }
});

module.exports = router;
