// models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // bcrypt hash karna
  role: { type: String, enum: ["Admin", "Warden"], default: "Admin" },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
