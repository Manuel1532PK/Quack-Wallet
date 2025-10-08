const express = require('express');
const router = express.Router();
const historyController = require('../controllers/history_controller');

router.get('/tranfer/history/:userId', historyController.getTransferHistory);
router.get('/withdraw/history/:userId', historyController.getWithdrawalHistory);
router.get('/deposit/history/:userId', historyController.getDepositHistory);

module.exports = router;