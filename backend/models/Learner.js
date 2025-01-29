const mongoose = require("mongoose");
const bcrypt = require("bcryptjs"); // Use bcryptjs instead of bcrypt

const learnerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
}, { timestamps: true });

// learnerSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) return next();

//   try {
//     console.log("Original password:", this.password); // Add this
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//     console.log("Newly hashed password:", this.password); // Add this
//     next();
//   } catch (err) {
//     console.error("Error hashing password:", err);
//     next(err);
//   }
// });

const Learner = mongoose.model("Learner", learnerSchema);
module.exports = Learner;
