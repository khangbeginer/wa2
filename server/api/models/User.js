// models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Định nghĩa schema cho User
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  passwordReal: { type: String, required: true }
});

// Đăng ký schema thành model
const User = mongoose.model('User', UserSchema);

module.exports = User;  // Chỉ xuất khẩu model User ở đây
