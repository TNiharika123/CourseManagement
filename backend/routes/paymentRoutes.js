const express = require('express');
const Payment = require('../models/Payment');  // Make sure you are requiring the model correctly
const router = express.Router();

router.post('/process', async (req, res) => {
  const { userId, courseId, paymentMethod, amount } = req.body;

  console.log("📩 Backend received payment data:", req.body); // Log incoming data

  try {
    const payment = new Payment({
      userId,
      courseId,
      amount,
      paymentMethod,
      paymentStatus: 'Success',  // Assume payment is successful
      transactionId: `PAY-${Math.random().toString(36).substring(7)}`,  // Generate a random transaction ID
    });

    console.log("💾 Saving payment to database:", payment); // Log the payment object before saving

    // Save the payment to MongoDB
    await payment.save();

    console.log("✅ Payment saved successfully!"); // Log success message

    // Send the response back to frontend
    res.json({ success: true, paymentId: payment.transactionId });
  } catch (error) {
    console.error("❌ Error processing payment:", error); // Log errors
    res.status(500).json({ success: false, message: "Payment processing failed." });
  }
});

module.exports = router;
