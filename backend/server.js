const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");
const fs = require("fs");
const fetch = require("node-fetch");  // Add the node-fetch module for the server-side fetch requests

dotenv.config(); // Load environment variables

const app = express();

// Connect to DB
connectDB();

// Create uploads folder if it doesn't exist
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log("Uploads folder created.");
}

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// // reCAPTCHA verification route
// app.post('/verify-recaptcha', async (req, res) => {
//   try {
//     const { token } = req.body;  // Get the reCAPTCHA token from the request body
//     console.log("reCAPTCHA Token:", token);  // Log the token

//     if (!token) {
//       return res.status(400).json({ error: 'No token provided' });
//     }

//     // Prepare the request payload for the reCAPTCHA API
//     const requestData = {
//       event: {
//         token: token,
//       },
//     };

//     // Define your reCAPTCHA secret API key from environment variables (use your actual secret key here)
//     const apiKey = process.env.RECAPTCHA_SECRET_KEY;  // Ensure the key is in your .env file

//     // Define the Google reCAPTCHA API endpoint
//     const endpoint = `https://recaptchaenterprise.googleapis.com/v1/projects/learning-managem-1738163567080/assessments?key=${apiKey}`;

//     // Make the POST request to the Google reCAPTCHA API
//     const response = await fetch(endpoint, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(requestData),  // Send the requestData with the token
//     });
//     console.log("Response from reCAPTCHA API:", response);  // Log the response

//     // Parse and handle the response
//     const data = await response.json();

//     // Send the response back to the frontend
//     if (data.success) {
//       return res.json({ success: true, message: 'reCAPTCHA verified successfully', data });
//     } else {
//       return res.status(400).json({ success: false, message: 'reCAPTCHA verification failed' });
//     }
//   } catch (error) {
//     console.error('Error during verification:', error);
//     res.status(500).json({ error: 'Server error during verification' });
//   }
// });

// Serve uploaded files statically
app.use("/uploads", express.static(uploadsDir));

// Import Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/courses", require("./routes/courseRoutes"));
app.use("/api/learners", require("./routes/learnerRoutes"));
app.use("/api/payments", require("./routes/paymentRoutes"));
app.use("/api/quizzes", require("./routes/quizRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/exams", require("./routes/aiExamRoutes"));
app.use("/api/support", require("./routes/supportRoutes"));
// Add this line with your other routes
app.use("/api/recaptcha", require("./routes/recaptchaRoutes"));

// Default Route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Something went wrong!" });
});

// Catch-all for undefined routes
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
