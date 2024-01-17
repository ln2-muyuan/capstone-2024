const express = require('express');
const patientController = require('../controllers/patient.controller');

const router = express.Router();

router.get('/getDiagnosis', patientController.getDiagnosis);

router.post('/addPatient', patientController.addPatient);
router.post('/addDiagnosisToPatient', patientController.addDiagnosisToPatient);

module.exports = router;