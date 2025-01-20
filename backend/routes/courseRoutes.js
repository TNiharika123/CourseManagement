const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');

// POST request to create a new course
router.post('/', courseController.createCourse);

// GET request to fetch all courses
router.get('/', courseController.getCourses);

// Route to delete a course
router.delete('/:courseId', courseController.deleteCourse);

// Route to get a specific course by ID
router.get('/:courseId', courseController.getCourseById);


module.exports = router;
