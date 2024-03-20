const express = require('express');
const useModelController = require('../controllers/useModel.controller');

const router = express.Router();

router.get('/', useModelController.handleUseModel);


module.exports = router;