const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  tutor: String,
  date: String
});

module.exports = mongoose.model("Booking", BookingSchema);
