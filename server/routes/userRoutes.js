const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { protect, admin } = require('../middleware/authMiddleware');

router.get('/me', protect, userController.getUserProfile);


router.put('/profile', protect, userController.updateUserProfile);

router.put('/role', protect, admin, userController.updateUserRole);

//  admin
router.get('/all', protect, admin, userController.getAllUsers);

module.exports = router;