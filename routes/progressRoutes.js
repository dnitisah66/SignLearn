const express = require("express");
const router = express.Router();
const progressController = require("../controllers/progressController");

router.post("/progress/update", progressController.updateProgress);
router.get("/progress", progressController.getProgress);

 module.exports = router;
