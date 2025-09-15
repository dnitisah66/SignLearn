const mongoose = require("mongoose");

const ProgressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  course: String,
  completed: Number,
  total: Number
});

module.exports = mongoose.model("Progress", ProgressSchema);
