const mongoose = require("mongoose");

const AIExamSchema = new mongoose.Schema({
  user: String,
  responses: Array,
});

module.exports = mongoose.model("AIExam", AIExamSchema);
