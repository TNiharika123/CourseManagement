// routes/learnerRoutes.js
const express = require('express');
const { registerLearner, getAllLearners, enrollInCourse, getEnrolledCourses } = require('../controllers/learnerController');
const router = express.Router();

// POST route to register a learner
router.post('/register', registerLearner);

// GET route to fetch all learners (for testing or admin purposes)
router.get('/', getAllLearners);

// POST route for enrolling in a course
router.post('/enroll', enrollInCourse);

// GET route for fetching courses a learner is enrolled in
router.get('/enrolled/:id', getEnrolledCourses);

module.exports = router;
