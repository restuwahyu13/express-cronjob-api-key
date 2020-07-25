const express = require('express');
const router = express.Router();
const { mhsController } = require('../controllers/controller.mhs');

router.get('/results/mhs', mhsController.resultsController);
router.post('/create/mhs', mhsController.createController);
router.get('/result/mhs/:id', mhsController.resultController);
router.delete('/delete/mhs/:id', mhsController.deleteController);
router.put('/update/mhs/:id', mhsController.updateController);

module.exports = router;
