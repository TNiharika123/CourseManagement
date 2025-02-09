const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const Admin = require("../models/Admin");

// Admin Registration
const registerAdmin = asyncHandler(async (req, res) => {
  const { Salutation, FName, LName, DOB, Email, Mobile, AddressLine1, AddressLine2, City, State, Country, Password, confirmPassword } = req.body;

  if (!Salutation || !FName || !LName || !DOB || !Email || !Mobile || !AddressLine1 || !City || !State || !Country || !Password || !confirmPassword) {
    res.status(400);
    throw new Error("All fields are required.");
  }

  if (Password !== confirmPassword) {
    res.status(400);
    throw new Error("Passwords do not match.");
  }

  if (await Admin.findOne({ Email })) {
    res.status(400);
    throw new Error("Email already exists.");
  }

  const hashedPassword = await bcrypt.hash(Password, 10);
  const newAdmin = await Admin.create({
    Salutation, FName, LName, DOB, Email, Mobile, AddressLine1, AddressLine2, City, State, Country, Password: hashedPassword
  });

  res.status(201).json({ message: "Admin registered successfully!" });
});

// Admin Login
const loginAdmin = asyncHandler(async (req, res) => {
  const { Email, Password } = req.body;

  if (!Email || !Password) {
    res.status(400);
    throw new Error("Email and password are required.");
  }

  const admin = await Admin.findOne({ Email });
  if (!admin || !(await bcrypt.compare(Password, admin.Password))) {
    res.status(401);
    throw new Error("Invalid credentials.");
  }

  const token = jwt.sign({ id: admin.id }, process.env.JWT_SECRET, { expiresIn: "1h" });
  res.status(200).json({ message: "Login successful!", token, admin });
});

module.exports = { registerAdmin, loginAdmin };
