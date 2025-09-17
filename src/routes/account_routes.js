const express = require('express');
const router = express.Router();
const accountController = require('../controllers/account_controller');

router.get('/account/balance/:id', accountController.getBalance);
router.post('/account/transfer', accountController.transfer);
router.get('/account/transfer/history/:id', accountController.transferHistory);
router.post('/account/withdraw', accountController.withdraw);
router.get('/account/withdraw/history/:id', accountController.withdrawHistory);
router.post('/account/deposit', accountController.deposit);
router.get('/account/deposit/history/:id', accountController.depositHistory);
router.get('/account/transactions/:id', accountController.transactions);
router.post('/account/logout', accountController.logout);

module.exports = router;
