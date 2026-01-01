
const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema(
  {
    student: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
    studentName: {type: String, required: true},
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    status: { type: String, default: "Pending" }, // Pending / Resolved
  },
  { timestamps: true }
);

module.exports = mongoose.model("Complaint", complaintSchema);


