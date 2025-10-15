const express = require('express');
const router = express.Router();
const userController = require('../controllers/user_controller');
const verifyToken = require('../middleware/auth_middleware');
const sanitizeInput = require('../middleware/sanitizeinput');
const validateEmail = require('../middleware/emailvalidation');

router.use(sanitizeInput);


// Rutas de usuario publicas
router.get('/public-profile', userController.getProfile);
router.post('/create', validateEmail,userController.createUser);

// Rutas de usuario protegidas
router.get('/profile/:id', verifyToken ,userController.findById);
router.put('/:id/update-password',verifyToken, userController.updatePassword);
router.put('/:id/update',verifyToken, userController.updateuser);
router.put('/:id/update-pin', userController.updatePin);


module.exports = router;