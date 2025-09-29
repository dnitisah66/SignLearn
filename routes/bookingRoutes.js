const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

// Booking routes
router.post('/create', bookingController.createBooking);
router.get('/', bookingController.getBookings);
router.put('/:bookingId', bookingController.updateBooking);
router.delete('/:bookingId', bookingController.cancelBooking);

module.exports = router;
