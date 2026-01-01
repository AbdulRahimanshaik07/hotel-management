// const mongoose = require("mongoose");

// const messSchema = new mongoose.Schema({
//   title: { type: String, required: true }, // e.g., "Weekly Mess Menu"
//   filename: { type: String, required: true },
//   originalName: { type: String },
//   createdAt: { type: Date, default: Date.now }
// });

// module.exports = mongoose.model("Mess", messSchema);


const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  filename: String,       // Cloudinary public_id
  fileUrl: String,        // Cloudinary URL
  originalName: String,
}, { timestamps: true });

module.exports = mongoose.model("Mess", NotificationSchema);
