const express = require("express");
const router = express.Router();
const Warden = require("../models/Warden");
const verifyWarden = require("../middleware/verifyWarden");


// ✅ Fetch Full Warden Profile
router.get("/wardenProfile", verifyWarden, async (req, res) => {
  try {
    // Get full details from DB (excluding password)
    const warden = await Warden.findById(req.warden.id).select("-password");

    if (!warden) {
      return res.status(404).json({ message: "Warden not found" });
    }

    res.status(200).json(warden);
  } catch (err) {
    console.error("Error fetching profile:", err);
    res.status(500).json({ message: "Server error" });
  }
});



// ✅ Warden change password
// router.put("/warden/change-password", verifyWarden, async (req, res) => {
//   try {
//     const { oldPassword, newPassword } = req.body;
//     const warden = await Warden.findById(req.warden._id);

//     const isMatch = await bcrypt.compare(oldPassword, warden.password);
//     if (!isMatch)
//       return res.status(400).json({ message: "Old password is incorrect" });

//     warden.password = await bcrypt.hash(newPassword, 10);
//     await warden.save();

//     res.json({ message: "Password updated successfully" });
//   } catch (err) {
//     console.error("Error updating password:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// });


module.exports = router;
