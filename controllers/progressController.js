const Progress = require('../models/Progress');

exports.updateProgress = async (req, res) => {
  try {
    const { courseId, lessonId, completed, score } = req.body;
    const progress = await Progress.findOneAndUpdate(
      { userId: req.session.user._id, courseId, lessonId },
      { completed, score: score || 0, updatedAt: new Date() },
      { upsert: true, new: true }
    );
    res.json({ success: true, progress });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to update progress' });
  }
};

exports.getProgress = async (req, res) => {
  try {
    const progress = await Progress.find({ userId: req.session.user._id });
    res.json(progress);
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch progress' });
  }
};

exports.resetCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    await Progress.deleteMany({ 
      userId: req.session.user._id, 
      courseId: courseId 
    });
    res.json({ success: true, message: 'Course progress reset successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to reset course progress' });
  }
};

exports.getCourseStats = async (req, res) => {
  try {
    const { courseId } = req.params;
    const progress = await Progress.find({ 
      userId: req.session.user._id, 
      courseId: courseId 
    });
    
    const stats = {
      totalLessons: progress.length,
      completedLessons: progress.filter(p => p.completed).length,
      averageScore: progress.length > 0 ? 
        Math.round(progress.reduce((sum, p) => sum + p.score, 0) / progress.length) : 0,
      completionPercentage: progress.length > 0 ? 
        Math.round((progress.filter(p => p.completed).length / progress.length) * 100) : 0
    };
    
    res.json({ success: true, stats });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch course stats' });
  }
};
