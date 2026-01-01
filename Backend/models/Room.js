// models/Room.js
const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  roomNo: { type: String, required: true, unique: true },
  capacity: { type: Number, required: true },
  occupied: { type: Number, default: 0 },
  status:{type: String},
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],
});

const Room =  mongoose.model("Room", roomSchema);
 module.exports = Room;
