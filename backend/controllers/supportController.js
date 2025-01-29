// // controllers/supportController.js
// const Support = require("../models/Support");

// // Function to create a support request
// const createSupportRequest = async (req, res) => {
//   try {
//     const { learnerId, subject, message } = req.body;

//     // Create new support request
//     const newRequest = new Support({
//       learnerId,
//       subject,
//       message,
//       status: "Pending", // Default status
//     });

//     // Save to database
//     await newRequest.save();

//     res.status(201).json({ message: "Support request created successfully" });
//   } catch (error) {
//     console.error("Error creating support request:", error);
//     res.status(500).json({ error: "Failed to create support request." });
//   }
// };

// // Function to fetch all support requests, optionally filtered by learnerId
// const getSupportRequestsByLearner = async (req, res) => {
//   try {
//     const { learnerId } = req.query;
//     const filter = learnerId ? { learnerId } : {};

//     // Fetch support requests with the optional learnerId filter
//     const supportRequests = await Support.find(filter);

//     res.status(200).json(supportRequests);
//   } catch (error) {
//     console.error("Error fetching support requests:", error);
//     res.status(500).json({ error: "Failed to fetch support requests." });
//   }
// };

// module.exports = { createSupportRequest, getSupportRequestsByLearner };


const Support = require("../models/Support");

// Handle creating a support request
const createSupportRequest = async (req, res) => {
  const { learnerId, category, subject, message, relatedCourse, file } = req.body;

  try {
    const supportRequest = new Support({
      learnerId,
      category,
      subject,
      message,
      relatedCourse,
      file, // Assuming the file is handled properly on the frontend
    });

    await supportRequest.save();
    res.status(200).json({ message: 'Support request created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create support request' });
  }
};

// Get support requests for a learner
const getSupportRequests = async (req, res) => {
  const { learnerId } = req.query;

  try {
    const supportRequests = await Support.find({ learnerId });
    res.status(200).json(supportRequests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch support requests' });
  }
};


// Function to fetch all support requests, optionally filtered by learnerId
const getSupportRequestsByLearner = async (req, res) => {
  try {
    const { learnerId } = req.query;
    const filter = learnerId ? { learnerId } : {};

    // Fetch support requests
    const supportRequests = await Support.find(filter);

    res.status(200).json(supportRequests);
  } catch (error) {
    console.error("Error fetching support requests:", error);
    res.status(500).json({ error: "Failed to fetch support requests." });
  }
};

module.exports = { createSupportRequest, getSupportRequestsByLearner, getSupportRequests };
