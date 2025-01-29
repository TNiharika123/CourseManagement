const bcrypt = require('bcryptjs');
const Learner = require('../models/Learner');
const Course = require('../models/Course');

// Register a new learner
exports.registerLearner = async (req, res) => {
  const { name, email, password, courses } = req.body;

  try {
    // Check if the learner already exists
    const existingLearner = await Learner.findOne({ email });
    if (existingLearner) {
      return res.status(400).json({ message: 'Learner with this email already exists' });
    }

    // Hash the password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create the learner
    const newLearner = new Learner({
      name,
      email,
      password: hashedPassword,
      courses: courses || [], // Array of course IDs (this could be empty or filled)
    });

    // Save the learner
    await newLearner.save();
    res.status(201).json({ message: 'Learner registered successfully', learner: newLearner });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error, try again later' });
  }
};

// Get all learners (for admin or course-related operations)
exports.getAllLearners = async (req, res) => {
  try {
    const learners = await Learner.find().populate('courses'); // Populate courses if needed
    res.status(200).json(learners);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Enroll a learner in a course
exports.enrollInCourse = async (req, res) => {
  const { learnerId, courseId } = req.body;

  try {
    const learner = await Learner.findById(learnerId);
    if (!learner) {
      return res.status(404).json({ message: 'Learner not found' });
    }

    // Check if course exists (if required)
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Add course to learner's enrolled courses
    learner.courses.push(courseId);
    await learner.save();
    res.status(200).json({ message: 'Enrolled in course successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all courses a learner is enrolled in
// In controllers/learnerController.js
exports.getEnrolledCourses = async (req, res) => {
  const learnerId = req.params.id;  // Access the learnerId from the route parameter
  try {
    const learner = await Learner.findById(learnerId).populate('courses');
    if (!learner) {
      return res.status(404).json({ message: 'Learner not found' });
    }

    res.status(200).json(learner.courses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


