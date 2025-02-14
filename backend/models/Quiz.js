// models/Quiz.js
const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({
  title: { type: String, required: true },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  questions: [{
    questionText: { type: String, required: true },
    options: [{ type: String, required: true }],
    correctAnswer: { type: Number, required: true },
  }],
  duration: { type: Number, required: true }, // Duration in minutes
  createdAt: { type: Date, default: Date.now },
});

const Quiz = mongoose.models.Quiz || mongoose.model("Quiz", quizSchema);
module.exports = Quiz;