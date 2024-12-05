// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

// Route đăng ký
router.post('/register', UserController.register);

// Route đăng nhập
router.post('/login', UserController.login);

module.exports = router;  // Chỉ xuất khẩu router, không xuất khẩu UserSchema ở đây
