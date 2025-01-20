// routes/supportRoutes.js
const express = require("express");
const router = express.Router();
const supportController = require("../controllers/supportController");

// Route to create a support request
router.post("/create", supportController.createSupportRequest);

// Route to fetch all support requests, optionally filtered by learnerId
router.get("/", supportController.getSupportRequestsByLearner);

module.exports = router;
