// controllers/UserController.js
const User = require('../models/User');  // Đảm bảo bạn import đúng model User
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); // Bạn cần import jwt nếu chưa có

// Khóa bí mật để tạo JWT (có thể lưu trong file config)
const secretKey = 'your_secret_key';  // Thay thế bằng khóa thực tế

module.exports = {
  register: async (req, res) => {
    try {
      const { username, password } = req.body;

      // Kiểm tra xem tên người dùng đã tồn tại chưa
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(400).json({ message: 'Username already taken' });
      }

      // Lưu mật khẩu thực tế vào trường passwordReal
      const newUser = new User({
        username,
        passwordReal: password,  // Lưu mật khẩu thực tế vào passwordReal
        password: await bcrypt.hash(password, 10)  // Mã hóa mật khẩu trước khi lưu vào trường password
      });

      // Lưu người dùng mới vào cơ sở dữ liệu
      await newUser.save();
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error registering user', error });
    }
  },



  login: async (req, res) => {
    try {
      const { username, password } = req.body;
  
      // Tìm người dùng trong cơ sở dữ liệu
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Kiểm tra mật khẩu
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      // Tạo JWT token và trả về
      const token = jwt.sign({ id: user._id }, secretKey, { expiresIn: '1h' });
  
      // Trả về cả token và username
      res.status(200).json({
        message: 'Login successful',
        token,
        username: user.username // Trả về username
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error logging in', error });
    }
  }
  
};
