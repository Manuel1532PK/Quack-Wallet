const express = require('express');
const router = express.Router();
const userController = require('../controllers/user_controller');

router.put('/users/updatepassword/:id', userController.updatePassword);
router.put('/users/update/:id', userController.updateUser);
router.get('/users/profile/:id', userController.findById);
router.get('/users/profile', userController.getProfile);

module.exports = router;
