const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth_controller');
const validateEmail = require('../middleware/emailvalidation');
const sanitizeInput = require('../middleware/sanitizeinput');

router.use(sanitizeInput);

router.post('/login',validateEmail,authController.login);
router.post('/forgot_password',validateEmail ,authController.forgotPassword);
router.post('/reset_password',validateEmail ,authController.resetPassword);

module.exports = router;
