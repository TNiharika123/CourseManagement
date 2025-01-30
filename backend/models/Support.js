const mongoose = require("mongoose");

const supportRequestSchema = new mongoose.Schema({
  learnerId: { type: String, required: true },
  category: { type: String, required: true }, // Added category
  subject: { type: String, required: true },
  message: { type: String, required: true },
  relatedCourse: { type: String }, // Added related course
  file: { type: String }, // Added file field
  status: { type: String, default: "Pending" },
  createdAt: { type: Date, default: Date.now },
});

const Support = mongoose.model("Support", supportRequestSchema);

module.exports = Support;
