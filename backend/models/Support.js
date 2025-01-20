const mongoose = require("mongoose");

const SupportSchema = new mongoose.Schema({
  user: String,
  query: String,
});

module.exports = mongoose.model("Support", SupportSchema);
