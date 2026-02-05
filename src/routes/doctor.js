const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctorController');

router.get('/search-patient', doctorController.searchPatient);
router.get('/patient-records', doctorController.getPatientRecords);
router.post('/record', doctorController.addRecord);

module.exports = router;
