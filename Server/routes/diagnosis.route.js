const express = require('express');
const diagnosisController = require('../controllers/diagnosis.controller');

const router = express.Router();


router.post('/addDiagnosis', diagnosisController.addDiagnosis);

module.exports = router;