const express = require('express');
const userController = require('../controllers/user.controller');

const router = express.Router();

router.get('/getPatients', userController.getPatients);

router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/addPatientToUser', userController.addPatientToUser);


module.exports = router;