<!-- src/views/Profile.vue -->
<template>
    <div class="profile">
      <h1>Welcome, {{ username }}</h1>
      <p>This is your profile page.</p>
      <p>Email: {{ email }}</p>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        username: localStorage.getItem('username') || 'Guest',  // Fetch username from localStorage
        email: 'nguyenvankhang220725@fpt.edu.vn',  // Replace this with the email from localStorage if available
      };
    }
  };
  </script>
  
  <style scoped>
  .profile {
    padding: 20px;
    text-align: center;
  }
  </style>
  