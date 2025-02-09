const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const Instructor = require("../models/Instructor");

// ✅ General Authentication Middleware (for users & instructors)
const authMiddleware = asyncHandler(async (req, res, next) => {
  let token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Access Denied: No Token Provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // ✅ Store user data in `req.user`
    next(); // ✅ Proceed to next middleware
  } catch (error) {
    console.error("Auth error:", error);
    res.status(401).json({ message: "Invalid Token" });
  }
});

// ✅ Instructor-Only Middleware (Ensures Instructor Exists)
const protectInstructor = asyncHandler(async (req, res, next) => {
  await authMiddleware(req, res, async () => { // ✅ Run `authMiddleware` first
    try {
      const instructor = await Instructor.findById(req.user.userId).select("-Password");

      if (!instructor) {
        return res.status(403).json({ message: "Access Denied: Instructor not found" });
      }

      req.user = instructor; // ✅ Attach instructor data
      next();
    } catch (error) {
      console.error("Instructor auth error:", error);
      res.status(500).json({ message: "Server error in authentication" });
    }
  });
});

// ✅ Fix: Export both middleware functions correctly
module.exports = { authMiddleware, protectInstructor };
