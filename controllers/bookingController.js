const Booking = require('../models/Booking');

exports.createBooking = async (req, res) => {
  try {
    const { tutor, sessionType, date, time, specialRequests } = req.body;
    
    const booking = new Booking({
      userId: req.session.user._id,
      tutor: tutor,
      sessionType: sessionType,
      date: new Date(date),
      time: time,
      specialRequests: specialRequests || '',
      status: 'pending'
    });
    
    await booking.save();
    res.json({ success: true, message: 'Booking created successfully! We will contact you soon.' });
  } catch (err) {
    console.error('Booking error:', err);
    res.status(500).json({ success: false, message: 'Booking failed. Please try again.' });
  }
};

exports.getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.session.user._id })
      .sort({ date: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch bookings' });
  }
};

exports.updateBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { status, notes } = req.body;
    
    const booking = await Booking.findOneAndUpdate(
      { _id: bookingId, userId: req.session.user._id },
      { status, notes, updatedAt: new Date() },
      { new: true }
    );
    
    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }
    
    res.json({ success: true, booking });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to update booking' });
  }
};

exports.cancelBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;
    
    const booking = await Booking.findOneAndUpdate(
      { _id: bookingId, userId: req.session.user._id },
      { status: 'cancelled', updatedAt: new Date() },
      { new: true }
    );
    
    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }
    
    res.json({ success: true, message: 'Booking cancelled successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to cancel booking' });
  }
};
