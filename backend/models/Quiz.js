const mongoose = require("mongoose");

const QuizSchema = new mongoose.Schema({
  user: String,
  score: Number,
  answers: Array,
});

module.exports = mongoose.model("Quiz", QuizSchema);
