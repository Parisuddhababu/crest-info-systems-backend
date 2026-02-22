const express = require('express');
const authController = require('./auth.controller');
const authValidation = require('./auth.validation');
const authMiddleware = require('../../middlewares/auth.middleware');

const router = express.Router();

router.post('/signup', authValidation.signupValidation, authController.signup);
router.post('/login', authValidation.loginValidation, authController.login);
router.get('/me', authMiddleware, authController.getMe);
router.put('/profile', authMiddleware, authController.updateProfile);

module.exports = router;
