const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { createSupportRequest, getSupportRequestsByLearner } = require("../controllers/supportController");

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Save files in the "uploads" folder
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage }).single("file"); // single file upload

// Route to create a support request with optional file upload
router.post("/create", upload, createSupportRequest);

// Route to fetch support requests for a learner
router.get("/", getSupportRequestsByLearner);

module.exports = router;
