const express = require('express');
const router = express.Router();
const aiController = require('../controllers/aiController');
const { verifyToken } = require('../middleware/auth');

router.post('/generate-note', verifyToken, aiController.generateClinicalNote);

module.exports = router;
