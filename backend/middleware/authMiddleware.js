// middleware/authMiddleware.js
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const Instructor = require("../models/Instructor");

const authMiddleware = asyncHandler(async (req, res, next) => {
  let token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Access Denied: No Token Provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Auth error:", error);
    res.status(401).json({ message: "Invalid Token" });
  }
});

const protectInstructor = asyncHandler(async (req, res, next) => {
  await authMiddleware(req, res, async () => {
    try {
      const instructor = await Instructor.findById(req.user.userId).select("-Password");

      if (!instructor) {
        return res.status(403).json({ message: "Access Denied: Instructor not found" });
      }

      req.user = instructor;
      next();
    } catch (error) {
      console.error("Instructor auth error:", error);
      res.status(500).json({ message: "Server error in authentication" });
    }
  });
});

module.exports = { authMiddleware, protectInstructor };
