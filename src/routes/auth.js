const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/citizen/login', authController.citizenLogin);
router.post('/citizen/register', authController.registerCitizen);
router.post('/doctor/login', authController.doctorLogin);
router.post('/doctor/register', authController.registerDoctor);

module.exports = router;
