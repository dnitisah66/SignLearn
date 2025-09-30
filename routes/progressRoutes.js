const express = require('express');
const router = express.Router();
const progressController = require('../controllers/progressController');

// Progress routes
router.get('/', progressController.getProgress);
router.post('/', progressController.updateProgress);
router.delete('/reset/:courseId', progressController.resetCourse);
router.get('/stats/:courseId', progressController.getCourseStats);

module.exports = router;
