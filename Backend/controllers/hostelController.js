import Hostel from "../models/Hostel.js";

// Create Hostel
module.exports.createHostel = async (req, res) => {
  try {
    const hostel = new Hostel(req.body);
    await hostel.save();
    res.status(201).json(hostel);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all Hostels
module.exports.getHostels = async (req, res) => {
  try {
    const hostels = await Hostel.find();
    res.json(hostels);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
