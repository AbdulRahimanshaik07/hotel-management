// const express = require("express");
// const router = express.Router();
// const Hostel = require("../models/hostels");

// // Get all hostels
// router.get("/hostels", async (req, res) => {
//   try {
//     const hostels = await Hostel.find();
//     res.json(hostels);
//   } catch (err) {
//     res.status(500).json({ error: "Server Error" });
//   }
// });

// // Get hostel by ID
// router.get("/:id", async (req, res) => {
//   try {
//     const hostel = await Hostel.findById(req.params.id);
//     if (!hostel) return res.status(404).json({ error: "Hostel not found" });
//     res.json(hostel);
//   } catch (err) {
//     res.status(500).json({ error: "Server Error" });
//   }
// });

// // Optional: Add new hostel (for admin)
// router.post("/add", async (req, res) => {
//   try {
//     const hostel = new Hostel(req.body);
//     await hostel.save();
//     res.status(201).json(hostel);
//   } catch (err) {
//     res.status(400).json({ error: "Bad Request" });
//   }
// });

// module.exports = router;
