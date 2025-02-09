const bcrypt = require('bcryptjs');
const mongoose = require("mongoose");
const Learner = require('../models/Learner');
const Course = require('../models/Course');

// ✅ Register a new learner
exports.registerLearner = async (req, res) => {
  const { name, email, password, courses } = req.body;

  try {
    // ✅ Check if the learner already exists
    const existingLearner = await Learner.findOne({ email });
    if (existingLearner) {
      return res.status(400).json({ message: 'Learner with this email already exists' });
    }

    // ✅ Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Create the learner
    const newLearner = new Learner({
      name,
      email,
      password: hashedPassword,
      courses: courses || [], // ✅ Default to an empty array if no courses provided
    });

    // ✅ Save the learner
    await newLearner.save();
    res.status(201).json({ message: 'Learner registered successfully', learner: newLearner });
  } catch (error) {
    console.error("Error registering learner:", error);
    res.status(500).json({ message: 'Server error, try again later' });
  }
};

// ✅ Get all learners (for admin or reporting)
exports.getAllLearners = async (req, res) => {
  try {
    const learners = await Learner.find().populate('courses', 'title'); // ✅ Fetch course titles
    res.status(200).json(learners);
  } catch (error) {
    console.error("Error fetching learners:", error);
    res.status(500).json({ message: 'Server error' });
  }
};

// ✅ Enroll a learner in a course (Prevent duplicate enrollments)
exports.enrollInCourse = async (req, res) => {
  const { learnerId, courseId } = req.body;

  if (!mongoose.Types.ObjectId.isValid(learnerId) || !mongoose.Types.ObjectId.isValid(courseId)) {
    return res.status(400).json({ message: "Invalid Learner ID or Course ID" });
  }

  try {
    const learner = await Learner.findById(learnerId);
    if (!learner) {
      return res.status(404).json({ message: 'Learner not found' });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // ✅ Prevent duplicate enrollments
    if (learner.courses.includes(courseId)) {
      return res.status(400).json({ message: 'Learner is already enrolled in this course' });
    }

    // ✅ Enroll learner
    learner.courses.push(courseId);
    await learner.save();

    res.status(200).json({ message: 'Enrolled in course successfully' });
  } catch (error) {
    console.error("Error enrolling in course:", error);
    res.status(500).json({ message: 'Server error' });
  }
};

// ✅ Get courses a learner is enrolled in (with full details)
exports.getEnrolledCourses = async (req, res) => {
  const { learnerId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(learnerId)) {
    return res.status(400).json({ message: "Invalid Learner ID" });
  }

  try {
    // ✅ Populate course details (title, category, image)
    const learner = await Learner.findById(learnerId).populate("courses", "title category image description level");

    if (!learner) {
      return res.status(404).json({ message: "Learner not found." });
    }

    res.status(200).json(learner.courses); 
  } catch (error) {
    console.error("Error fetching enrolled courses:", error);
    res.status(500).json({ message: "Failed to fetch courses" });
  }
};
