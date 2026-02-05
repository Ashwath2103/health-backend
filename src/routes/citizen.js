const express = require('express');
const router = express.Router();
const citizenController = require('../controllers/citizenController');
// const { verifyToken } = require('../middleware/auth'); // Enable when ready
const upload = require('../config/upload'); // New upload config

// router.use(verifyToken); // Apply to all routes

router.get('/profile/:userId', citizenController.getProfile);
router.get('/history/:userId', citizenController.getHistory);
router.post('/consent', citizenController.toggleConsent);
router.post('/upload', upload.single('file'), citizenController.uploadRecord);

module.exports = router;
