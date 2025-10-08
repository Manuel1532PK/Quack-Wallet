const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth_controller');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/forgot_password', authController.forgotPassword);
router.post('/reset_password', authController.resetPassword);

module.exports = router;
