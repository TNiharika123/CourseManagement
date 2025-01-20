const express = require("express");
const router = express.Router();
const Payment = require("../models/Payment");
const Course = require("../models/Course");

// Payment Processing Route (Mock Payment)
router.post("/process", async (req, res) => {
  const { userId, courseId, paymentMethod } = req.body;

  // Validate Request Data
  if (!userId || !courseId || !paymentMethod) {
    return res.status(400).json({ success: false, message: "Missing required fields" });
  }

  try {
    // Check if the course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ success: false, message: "Course not found" });
    }

    // Mock Payment Processing
    const transactionId = `PAY-${Math.random().toString(36).substr(2, 9)}`; // Simulated transaction ID
    const amountPaid = course.price; // Fetching price from course

    // Save Payment in Database
    const payment = new Payment({
      userId,
      courseId,
      amount: amountPaid,
      paymentMethod,
      paymentStatus: "Success", // Since we're mocking, it's always "Success"
      transactionId,
    });

    await payment.save(); // Save to MongoDB

    res.status(200).json({
      success: true,
      message: "Payment successful!",
      paymentId: transactionId,
      amountPaid,
      paymentMethod,
    });
  } catch (error) {
    console.error("Payment Processing Error:", error);
    res.status(500).json({ success: false, message: "Payment failed", error: error.message });
  }
});

module.exports = router;
