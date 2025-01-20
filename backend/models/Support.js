// models/Support.js
const mongoose = require("mongoose");

const supportRequestSchema = new mongoose.Schema({
  learnerId: { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  status: { type: String, default: "Pending" }, // Default status
  createdAt: { type: Date, default: Date.now },
});

const Support = mongoose.model("Support", supportRequestSchema);

module.exports = Support;
