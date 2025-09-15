const Progress = require("../models/Progress");

exports.updateProgress = async (req, res) => {
  if (!req.session.user) return res.send("Please login first!");

  await Progress.findOneAndUpdate(
    { userId: req.session.user._id, course: req.body.course },
    { completed: req.body.completed, total: req.body.total },
    { upsert: true }
  );

  res.send("✅ Progress updated");
};

exports.getProgress = async (req, res) => {
  if (!req.session.user) return res.send("Please login first!");
  const progress = await Progress.find({ userId: req.session.user._id });
   res.json(progress);
};
