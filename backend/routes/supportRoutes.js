const express = require("express");
const router = express.Router();
const Course = require("../models/Course");

router.post("/", async (req, res) => {
  const { title, description, instructor } = req.body;
  const course = new Course({ title, description, instructor });
  await course.save();
  res.status(201).json({ message: "Course added successfully!" });
});

module.exports = router;
