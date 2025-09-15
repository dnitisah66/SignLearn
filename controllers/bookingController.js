const Booking = require("../models/Booking");

exports.bookClass = async (req, res) => {
  if (!req.session.user) return res.send("Please login first!");

  await Booking.create({
    userId: req.session.user._id,
    tutor: req.body.tutor,
    date: req.body.date
  });

   res.send("✅ Class booked successfully!");
};
