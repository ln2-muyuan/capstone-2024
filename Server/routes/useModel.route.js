const express = require('express');
const useModelController = require('../controllers/useModel.controller');

const router = express.Router();

router.post('/', useModelController.handleUseModel);


module.exports = router;