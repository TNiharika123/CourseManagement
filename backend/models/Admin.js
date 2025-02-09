const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  AdminID: {
    type: String,
    unique: true,
    default: function () {
      return `ADMIN-${Date.now()}`;
    },
  },
  Salutation: { type: String, required: true },
  FName: { type: String, required: true },
  LName: { type: String, required: true },
  DOB: { type: Date, required: true },
  Email: {
    type: String,
    required: true,
    unique: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  Mobile: {
    type: String,
    required: true,
    unique: true,
    match: /^\d{10}$/,
  },
  AddressLine1: { type: String, required: true },
  AddressLine2: { type: String },
  City: { type: String, required: true },
  State: { type: String, required: true },
  Country: { type: String, required: true },
  Password: { type: String, required: true },
});

const Admin = mongoose.model("Admin", adminSchema);
module.exports = Admin;
