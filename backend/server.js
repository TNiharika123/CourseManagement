const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config(); // Load environment variables

const app = express();

// Connect to DB
connectDB();

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files statically
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


// Import Routes

app.use("/api/auth", require("./routes/authRoutes")); 
app.use("/api/courses", require("./routes/courseRoutes"));
app.use("/api/learners", require("./routes/learnerRoutes"));
app.use("/api/payments", require("./routes/paymentRoutes"));
app.use("/api/quizzes", require("./routes/quizRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/exams", require("./routes/aiExamRoutes")); // ✅ Ensure this is correct
app.use("/api/support", require("./routes/supportRoutes"));

// Default Route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
