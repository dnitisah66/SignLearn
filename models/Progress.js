const mongoose = require('mongoose');

const ProgressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  courseId: { type: String, required: true },
  lessonId: { type: String, required: true },
  completed: { type: Boolean, default: false },
  score: { type: Number, default: 0 }
}, {
  timestamps: true
});

module.exports = mongoose.model('Progress', ProgressSchema);
