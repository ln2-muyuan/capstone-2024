const userRoutes = require('./user.route');
const patientRoutes = require('./patient.route');
const diagnosisRoutes = require('./diagnosis.route');
const uploadRoutes = require('./upload.route');
const useModelRoutes = require('./useModel.route');
const express = require('express');


const router = express.Router();

// router.use('/', (req, res) => {
//     res.send('Welcome to Capstone 2024 API');
// });
router.use('/user', userRoutes);
router.use('/patient', patientRoutes);
router.use('/diagnosis', diagnosisRoutes);
router.use('/upload', uploadRoutes);
router.use('/useModel', useModelRoutes);

module.exports = router;