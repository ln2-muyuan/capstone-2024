const userRoutes = require('./user.route');
const patientRoutes = require('./patient.route');
const diagnosisRoutes = require('./diagnosis.route');
const express = require('express');


const router = express.Router();

router.use('/user', userRoutes);
router.use('/patient', patientRoutes);
router.use('/diagnosis', diagnosisRoutes);

module.exports = router;