const express = require("express");
const router = express.Router();
const Room = require("../models/Room");
const Student = require("../models/Student");


router.get("/api/rooms", async (req, res) => {
  try {
    const rooms = await Room.find({});
    const roomsWithOccupied = await Promise.all(
      rooms.map(async (room) => {
        const occupiedCount = await Student.countDocuments({ room: room.roomNo });
        return {
          _id: room._id,
          roomNo: room.roomNo,
          capacity: room.capacity,
          status: room.status,
          occupied: occupiedCount,
          available: room.capacity - occupiedCount,
        };
      })
    );
    res.json(roomsWithOccupied);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});


router.post("/api/addRoom", async (req, res) => {
  try {
    const { roomNo, capacity, status } = req.body;

    // room already exist check
    const existingRoom = await Room.findOne({ roomNo });
    if (existingRoom) {
      return res.status(409).json({ message: "Room already exists" });
    }

    const newRoom = new Room({ roomNo, capacity, status });
    await newRoom.save();

    return res.status(201).json({ message: "Room added successfully", room: newRoom });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});


router.get("/rooms/:roomNo/students", async (req, res) => {
  const { roomNo } = req.params;
  try {
    const students = await Student.find({ room: roomNo }).select("studentName fatherName");
    res.json(students);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

// GET all rooms with available seats and dynamic status
router.get("/api/rooms", async (req, res) => {
  try {
    const rooms = await Room.find();

    const roomsWithStatus = await Promise.all(
      rooms.map(async (room) => {
        const studentCount = await Student.countDocuments({ room: room.roomNo });
        let status = studentCount >= room.capacity ? "Occupied" : "Available";

        return {
          ...room._doc,
          studentCount,
          available: room.capacity - studentCount,
          status,
        };
      })
    );

    res.status(200).json(roomsWithStatus);
  } catch (err) {
    console.error("Error fetching rooms:", err);
    res.status(500).json({ error: "Failed to fetch rooms" });
  }
});

// Update Room
// PUT /api/rooms/:id
router.put("/api/rooms/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedRoom = await Room.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedRoom) return res.status(404).json({ message: "Room not found" });

    res.json({ message: "Room updated successfully", room: updatedRoom });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



//Destroy Room
router.delete("/api/rooms/:id", async (req, res) => {
  try {
    const room = await Room.findByIdAndDelete(req.params.id);
    if (!room) return res.status(404).json({ message: "Room not found" });

    // ✅ Unassign students from this room
    await Student.updateMany(
      { room: room.roomNo },
      { $set: { room: null } }   // ya "Unassigned"
    );

    res.json({ message: "Room deleted successfully & students unassigned" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


module.exports = router;





