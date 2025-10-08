const express = require('express');
const router = express.Router();
const transferController = require('../controllers/transference_controller');

router.get('/transfer/:userId', transferController.transfer);
router.get('/deposit/:userId', transferController.deposit);
router.get('/withdraw/:userId', transferController.withdraw);

module.exports = router;