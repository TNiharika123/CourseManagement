// const Course = require('../models/Course'); // Ensure the import is here

const Learner = require('../models/Learner');
const Course = require('../models/Course');

const Instructor = require("../models/Instructor");
const mongoose = require("mongoose"); // ✅ Import mongoose for ObjectId validation


exports.createCourse = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Unauthorized: Token is missing or invalid." });
    }

    const instructorId = req.user.id;
    const { title, category, level, primaryLanguage, subtitle, description, pricing, objectives, welcomeMessage, image } = req.body;

    // ✅ Validate required fields
    if (!title || !pricing) {
      return res.status(400).json({ message: "Title and Pricing are required." });
    }

    // ✅ Accept both Base64 and URL formats
    const validUrlRegex = /^https?:\/\/.+\.(jpg|jpeg|png|gif|svg|webp)$/i;
    const isBase64 = image.startsWith("data:image");

    if (!validUrlRegex.test(image) && !isBase64) {
      return res.status(400).json({ message: "Invalid image format. Please provide a valid URL or a Base64 image." });
    }

    const instructor = await Instructor.findById(instructorId);
    if (!instructor) {
      return res.status(404).json({ message: "Instructor not found." });
    }

    const newCourse = new Course({
      title, category, level, primaryLanguage, subtitle, description, pricing,
      objectives, welcomeMessage, image, // ✅ Store the image URL or Base64 string
      instructorId,
      instructorName: `${instructor.FName} ${instructor.LName}`,
      date: new Date(),
      isPublished: true,
    });

    const savedCourse = await newCourse.save();
    instructor.Courses.push(savedCourse._id);
    await instructor.save();

    res.status(201).json({ message: "Course created successfully!", course: savedCourse });

  } catch (error) {
    console.error("Error creating course:", error);
    res.status(500).json({ message: "Server error. Failed to create course.", error: error.message });
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
    const updates = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Course ID" });
    }

    // ✅ Ensure curriculum updates properly
    const updatedCourse = await Course.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!updatedCourse) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json(updatedCourse);
  } catch (error) {
    console.error("Error updating course:", error);
    res.status(500).json({ message: "Error updating course", error: error.message });
  }
};

// ✅ Fix Delete Course Function
exports.deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;

    // ✅ Validate ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Course ID" });
    }

    const course = await Course.findByIdAndDelete(id);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.json({ message: "Course deleted successfully" });
  } catch (error) {
    console.error("Error deleting course:", error);
    res.status(500).json({ message: "Server error. Could not delete course." });
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

// ✅ Fetch courses uploaded by logged-in instructor
exports.getInstructorCourses = async (req, res) => {
  try {
    const instructorId = req.user.userId; // ✅ Extract instructor ID from token

    if (!instructorId || !mongoose.Types.ObjectId.isValid(instructorId)) {
      return res.status(400).json({ message: "Invalid or missing Instructor ID" });
    }

    const courses = await Course.find({ instructorId });
    res.status(200).json(courses);
  } catch (error) {
    console.error("Error fetching instructor courses:", error);
    res.status(500).json({ message: "Server error. Could not fetch courses.", error: error.message });
  }
};


exports.getCourseLearners = async (req, res) => {
  try {
    const { id } = req.params; // ✅ Course ID from request

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Course ID" });
    }

    // ✅ Populate the enrolled learners with `name` and `email`
    const course = await Course.findById(id).populate("enrolledLearners", "name email");

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json({ 
      courseTitle: course.title, 
      learners: course.enrolledLearners 
    });

  } catch (error) {
    console.error("Error fetching learners:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


exports.enrollLearnerInCourse = async (req, res) => {
  try {
    const { learnerId } = req.body;
    const { id } = req.params; // Course ID

    if (!mongoose.Types.ObjectId.isValid(id) || !mongoose.Types.ObjectId.isValid(learnerId)) {
      return res.status(400).json({ message: "Invalid Course ID or Learner ID" });
    }

    const course = await Course.findById(id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Check if learner is already enrolled
    if (course.enrolledLearners.includes(learnerId)) {
      return res.status(400).json({ message: "Learner already enrolled" });
    }

    // Add learner to course's enrolled learners
    course.enrolledLearners.push(learnerId);
    await course.save();

    res.status(200).json({ success: true, message: "Learner enrolled successfully" });

  } catch (error) {
    console.error("Enrollment Error:", error);
    res.status(500).json({ message: "Server error during enrollment" });
  }
};
