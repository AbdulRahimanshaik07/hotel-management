
const express = require("express");
const Student = require("../models/Student");
const auth = require("../middleware/verifyStudent");
const router = express.Router();


router.get("/warden/students", auth, async (req, res) => {
  try {
    if (req.user.role.toLowerCase() !== "warden")
      return res.status(403).json({ msg: "Access denied" });

    const students = await Student.find({ year: req.user.yearAssigned });
    res.json(students);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;
