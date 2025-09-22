const Booking = require('../models/Booking');

exports.createBooking = async (req, res) => {
  try {
    const booking = new Booking({
      userId: req.session.user._id,
      courseId: req.body.courseId,
      date: req.body.date,
      time: req.body.time
    });
    await booking.save();
    res.json({ success: true, message: 'Booking created successfully!' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Booking failed' });
  }
};

exports.getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.session.user._id });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch bookings' });
  }
};
