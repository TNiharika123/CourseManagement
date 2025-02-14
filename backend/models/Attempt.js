// models/Attempt.js
const mongoose = require("mongoose");

const attemptSchema = new mongoose.Schema({
  learner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  quiz: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz", required: true },
  score: { type: Number, required: true },
  correctAnswers: { type: Number, required: true },
  wrongAnswers: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Attempt = mongoose.models.Attempt || mongoose.model("Attempt", attemptSchema);
module.exports = Attempt;