const express = require('express');
const router = express.Router();
const userController = require('../controllers/user_controller');

router.put('/user/:id/updatepassword', userController.updatePassword);
router.put('/user/:id', userController.updateuser);
router.get('/user/:id', userController.findById);
router.get('/user/profile', userController.getProfile);

module.exports = router;