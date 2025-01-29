const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema({
  title: String,
  category: String,
  status: { type: String, required: true, enum: ['draft', 'published'], default: 'draft' }, // Add default
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
  learners: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Learner' }]
});

module.exports = mongoose.model('Course', courseSchema);
