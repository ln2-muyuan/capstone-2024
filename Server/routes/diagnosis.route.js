const express = require('express');
const diagnosisController = require('../controllers/diagnosis.controller');

const router = express.Router();

router.get('/getDiagnosis', diagnosisController.getDiagnosis);
router.post('/addDiagnosis', diagnosisController.addDiagnosis);

module.exports = router;