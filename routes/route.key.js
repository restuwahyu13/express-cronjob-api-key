const express = require('express');
const router = express.Router();
const { keyController } = require('../controllers/controller.key');

router.get('/key', keyController.generateController);

module.exports = router;
