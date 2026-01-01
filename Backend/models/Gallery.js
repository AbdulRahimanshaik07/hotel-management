const mongoose = require("mongoose");

const gallerySchema = new mongoose.Schema({
  title: { type: String, required: true }, // optional: image title
  filename: { type: String, required: true }, // stored filename
  originalName: { type: String }, // original uploaded name
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Gallery", gallerySchema);
