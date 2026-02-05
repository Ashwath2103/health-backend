const express = require('express');
const router = express.Router();
const meetingController = require('../controllers/meetingController');
const { verifyToken } = require('../middleware/auth');

router.post('/create', verifyToken, meetingController.createMeeting);
router.post('/join', verifyToken, meetingController.joinMeeting);

module.exports = router;
