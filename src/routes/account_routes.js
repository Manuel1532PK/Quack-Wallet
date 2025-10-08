const express = require('express');
const router = express.Router();
const accountController = require('../controllers/account_controller');

router.get('/balance/:userId', accountController.getBalance);
router.get('/AllTransactions/:userId', accountController.getAllTransactions);

module.exports = router;
