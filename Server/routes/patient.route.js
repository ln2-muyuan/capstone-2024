const express = require('express');
const patientController = require('../controllers/patient.controller');

const router = express.Router();


router.post('/addPatient', patientController.addPatient);
router.post('/addDiagnosisToPatient', patientController.addDiagnosisToPatient);

module.exports = router;