const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Connect to DB
connectDB();

app.use(cors());
app.use(express.json());

// Import Routes
app.use("/api/courses", require("./routes/courseRoutes"));  // No change needed here for Solution 1
app.use("/api/payments", require("./routes/paymentRoutes"));
app.use("/api/quizzes", require("./routes/quizRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/ai-exams", require("./routes/aiExamRoutes"));
app.use("/api/support", require("./routes/supportRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
