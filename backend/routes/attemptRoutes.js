
// routes/attemptRoutes.js
const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  submitQuizAttempt,
  getAttemptById
} = require("../controllers/attemptController");

router.post("/submit", authMiddleware, submitQuizAttempt);
router.get("/:attemptId", authMiddleware, getAttemptById);

module.exports = router;