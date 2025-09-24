const express = require('express');
const router = express.Router();
const userController = require('../controllers/user_controller');

router.get('/profile', userController.getProfile);
router.post('/create', userController.createUser);
router.put('/:id/updatepassword', userController.updatePassword);
router.put('/:id', userController.updateuser);
router.get('/:id', userController.findById);


module.exports = router;