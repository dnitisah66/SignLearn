const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  tutor: { type: String, required: true },
  sessionType: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  specialRequests: { type: String, default: '' },
  status: { 
    type: String, 
    enum: ['pending', 'confirmed', 'cancelled', 'completed'], 
    default: 'pending' 
  },
  notes: { type: String, default: '' }
}, {
  timestamps: true
});

module.exports = mongoose.model('Booking', BookingSchema);
