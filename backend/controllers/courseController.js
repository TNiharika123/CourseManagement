// const Course = require('../models/Course'); // Ensure the import is here

const Learner = require('../models/Learner');
const Course = require('../models/Course');

exports.createCourse = async (req, res) => {
  try {
    const courseData = req.body;
    console.log("Received Data:", courseData); // Debugging

    // Validate required fields
    if (!courseData.title || !courseData.pricing || !courseData.instructorId || !courseData.instructorName) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Create a new course
    const newCourse = new Course(courseData);
    await newCourse.save();

    res.status(201).json({ message: 'Course created successfully', course: newCourse });
  } catch (error) {
    console.error('Error creating course:', error); // Debugging
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
      const { id } = req.params;
      const course = await Course.findById(id);  // Fetch the course by ID from the database
  
      if (!course) {
        return res.status(404).json({ message: 'Course not found' });
      }
  
      res.status(200).json(course);  // Return the course details
    } catch (error) {
      console.error('Error fetching course:', error);
      res.status(500).json({ message: 'Failed to fetch course details', error: error.message });
    }
  };
  
// Update Course (Fixed parameter name)
exports.updateCourse = async (req, res) => {
    try {
      const { id } = req.params;
      if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).json({ success: false, message: "Invalid Course ID format" });
      }
      const { title, pricing,category,level,primaryLanguage,subtitle } = req.body;
      const updatedCourse = await Course.findByIdAndUpdate(
        id,
        { title, pricing,category,level,primaryLanguage,subtitle },
        { new: true }
      );
      if (!updatedCourse) {
        return res.status(404).json({ success: false, message: "Course not found" });
      }
      res.json(updatedCourse);
    } catch (error) {
      res.status(500).json({ success: false, message: "Update failed", error: error.message });
    }
  };
  

// Delete course by ID
exports.deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;  // Use `id` as per the route
    const course = await Course.findByIdAndDelete(id);

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.json({ message: 'Course deleted successfully' });
  } catch (error) {
    console.error('Error deleting course:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get courses by status "enrolled"
exports.getCoursesByStatus = async (req, res) => {
  try {
    const status = req.params.status;  // Get the status parameter from the URL

    // Find courses that match the "status" field
    const courses = await Course.find({ status: status });

    if (!courses) {
      return res.status(404).json({ message: "No courses found with this status" });
    }

    res.json(courses);
  } catch (error) {
    console.error("Error fetching courses:", error);
    res.status(500).json({ message: "Error fetching courses" });
  }
};