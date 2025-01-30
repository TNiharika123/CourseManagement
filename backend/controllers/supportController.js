const Support = require("../models/Support");

// Handle creating a support request
const createSupportRequest = async (req, res) => {
  const { learnerId, category, subject, message, relatedCourse } = req.body;
  const file = req.file ? req.file.path : null; // Get file path if file exists

  if (!learnerId || !category || !subject || !message) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const supportRequest = new Support({
      learnerId,
      category,
      subject,
      message,
      relatedCourse,
      file, // Store file path if file exists
    });

    await supportRequest.save();
    res.status(200).json({ message: "Support request created successfully" });
  } catch (error) {
    console.error("Error creating support request:", error);
    res.status(500).json({ message: "Failed to create support request" });
  }
};

// Get support requests for a learner
const getSupportRequestsByLearner = async (req, res) => {
  const { learnerId } = req.query;

  try {
    const supportRequests = await Support.find({ learnerId });
    res.status(200).json(supportRequests);
  } catch (error) {
    console.error("Error fetching support requests:", error);
    res.status(500).json({ message: "Failed to fetch support requests" });
  }
};

module.exports = { createSupportRequest, getSupportRequestsByLearner };
