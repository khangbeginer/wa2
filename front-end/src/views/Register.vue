<template>
  <div class="register-container">
    <h2 class="title">Create an Account</h2>
    <form @submit.prevent="register" class="form">
      <div class="input-group">
        <label for="username" class="label">Username</label>
        <input v-model="username" id="username" type="text" placeholder="Enter your username" required class="input-field"/>
      </div>
      <div class="input-group">
        <label for="password" class="label">Password</label>
        <input v-model="password" id="password" type="password" placeholder="Enter your password" required class="input-field"/>
      </div>
      <button type="submit" class="submit-btn">Register</button>
    </form>
    <p v-if="message" class="message">{{ message }}</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      username: '',
      password: '',
      message: ''
    };
  },
  methods: {
    async register() {
      try {
        const response = await axios.post('http://localhost:3000/api/auth/register', {
          username: this.username,
          password: this.password
        });
        this.message = response.data.message;
        this.$router.push('/login'); // Chuyển đến trang login sau khi đăng ký thành công
      } catch (error) {
        this.message = 'Registration failed: ' + error.response.data.message;
      }
    }
  }
};
</script>

<style scoped>
.register-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f4f7fc;
  padding: 20px;
}

.title {
  font-size: 2rem;
  color: #333;
  margin-bottom: 20px;
  font-weight: 600;
}

.form {
  background-color: #fff;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

.input-group {
  margin-bottom: 15px;
  width: 100%;
}

.label {
  display: block;
  font-size: 1rem;
  margin-bottom: 5px;
  color: #555;
}

.input-field {
  width: 100%;
  padding: 12px;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
}

.input-field:focus {
  outline: none;
  border-color: #007bff;
}

.submit-btn {
  width: 100%;
  padding: 14px;
  font-size: 1.1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.submit-btn:hover {
  background-color: #0056b3;
}

.message {
  margin-top: 15px;
  color: #d9534f;
  text-align: center;
}
</style>
