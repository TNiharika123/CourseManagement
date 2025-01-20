const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema({
  title: String,
  category: String,
  level: String,
  primaryLanguage: String,
  subtitle: String,
  description: String,
  pricing: Number,
  objectives: String,
  welcomeMessage: String,
  image: String,
  instructorId: String,
  instructorName: String,
  date: Date,
  curriculum: Array,
  isPublished: Boolean,
});

module.exports = mongoose.model('Course', courseSchema);
