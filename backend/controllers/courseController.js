const Course = require('../models/Course'); // Ensure the import is here

exports.createCourse = async (req, res) => {
  try {
    const courseData = req.body;

    // Validate required fields
    if (!courseData.title || !courseData.pricing || !courseData.instructorId || !courseData.instructorName) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Create a new course
    const newCourse = new Course(courseData);
    await newCourse.save();

    res.status(201).json({ message: 'Course created successfully', course: newCourse });
  } catch (error) {
    console.error('Error creating course:', error);
    res.status(500).json({ message: 'Failed to create course', error: error.message });
  }
};

// Controller function
exports.getCourses = async (req, res) => {
    try {
      const courses = await Course.find(); // Assuming you're using Mongoose for MongoDB
      res.status(200).json(courses);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch courses", error: error.message });
    }
  };

  // Controller function to get a course by its ID
exports.getCourseById = async (req, res) => {
    try {
      const courseId = req.params.courseId;
      const course = await Course.findById(courseId);  // Fetch the course by ID from the database
  
      if (!course) {
        return res.status(404).json({ message: 'Course not found' });
      }
  
      res.status(200).json(course);  // Return the course details
    } catch (error) {
      console.error('Error fetching course:', error);
      res.status(500).json({ message: 'Failed to fetch course details', error: error.message });
    }
  };
  

  // Delete course by ID
exports.deleteCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const course = await Course.findByIdAndDelete(courseId);

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.json({ message: 'Course deleted successfully' });
  } catch (error) {
    console.error('Error deleting course:', error);
    res.status(500).json({ message: 'Server error' });
  }
};