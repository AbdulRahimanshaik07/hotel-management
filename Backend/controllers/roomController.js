import Room from "../models/Room.js";

// Create Room
export const createRoom = async (req, res) => {
  try {
    const room = new Room(req.body); // {roomNo, capacity, hostel: hostelId}
    await room.save();
    res.status(201).json(room);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get Rooms with Hostel
export const getRooms = async (req, res) => {
  try {
    const rooms = await Room.find().populate("hostel");
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
