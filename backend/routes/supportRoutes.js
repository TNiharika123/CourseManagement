// // routes/supportRoutes.js
// const express = require("express");
// const router = express.Router();
// const supportController = require("../controllers/supportController");

// // Route to create a support request
// router.post("/create", supportController.createSupportRequest);

// // Route to fetch all support requests, optionally filtered by learnerId
// router.get("/", supportController.getSupportRequestsByLearner);

// module.exports = router;

const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const supportController = require("../controllers/supportController");

// Importing the function from controller (or define it here directly)
const { getCoursesByStatus } = require("../controllers/courseController"); // Adjust the path accordingly

const { createSupportRequest, getSupportRequests } = require('../controllers/supportController');

// Create a support request
router.post('/create', createSupportRequest);

// Get support requests for a learner
router.get('/', getSupportRequests);

// Multer Setup: Setting the storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Save uploaded files in the "uploads" folder
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`); // Generate unique filename
  },
});

// File filter to allow only specific file types (optional)
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true); // Accept only image files
  } else {
    cb(new Error("Only image files are allowed."), false); // Reject other files
  }
};

// Multer upload middleware
const upload = multer({ storage, fileFilter });

// Route to create a support request with optional file upload
router.post("/create", upload.single("file"), supportController.createSupportRequest);

// Route to fetch all support requests, optionally filtered by learnerId
router.get("/", supportController.getSupportRequestsByLearner);

// Route to get courses by status
router.get("/status/:status", getCoursesByStatus);


module.exports = router;
