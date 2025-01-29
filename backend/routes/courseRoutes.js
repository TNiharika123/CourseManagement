    const express = require('express');
    const router = express.Router();
    const courseController = require('../controllers/courseController');

    // const { enrollInCourse, getEnrolledCourses } = require('../controllers/coursesController');


    // Create a new course
    router.post('/', courseController.createCourse);

    // Get all courses
    router.get('/', courseController.getCourses);

    // Get a specific course by ID
    router.get('/:id', courseController.getCourseById);

    // Update a course by ID (Fixed parameter name)
    router.put('/:id', courseController.updateCourse);
    
// Delete a course by ID
router.delete('/:id', courseController.deleteCourse);  // Use `id` as the route parameter

    module.exports = router;
