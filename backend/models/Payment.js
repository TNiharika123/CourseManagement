const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
  amount: { type: Number, required: true },
  paymentMethod: { type: String, required: true },
  paymentStatus: { type: String, enum: ["Pending", "Success", "Failed"], default: "Pending" },
  transactionId: { type: String, required: true, unique: true },
}, { timestamps: true });

module.exports = mongoose.model("Payment", PaymentSchema);
