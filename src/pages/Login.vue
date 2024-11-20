<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const username = ref('');
const password = ref('');
const errorMessage = ref('');

// Initialize Vue Router for redirection
const router = useRouter();

const handleLogin = async () => {
  errorMessage.value = ''; // Clear previous error message

  try {
    // Send the login request to the backend
    const response = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username.value,
        password: password.value,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      // Handle successful login (store session or token if necessary)
      alert('Login successful');
      // Redirect to another page after successful login
      router.push('/dashboard'); // Adjust the target route as necessary
    } else {
      // Display error message if login fails
      errorMessage.value = data.message || 'An error occurred during login.';
    }
  } catch (error) {
    console.error('Error:', error);
    errorMessage.value = 'An error occurred. Please try again later.';
  }
};
</script>

<template>
  <form @submit.prevent="handleLogin" class="form-container">
    <div class="form-group">
      <label for="username">Enter your Username</label>
      <input type="text" id="username" v-model="username" placeholder="Enter your username" required />
    </div>
    <div class="form-group">
      <label for="password">Enter your Password</label>
      <input type="password" id="password" v-model="password" placeholder="Enter your password" required />
    </div>
    <button type="submit" class="btn">Log In</button>
    
    <div v-if="errorMessage" class="error-message">
      <p style="color: red;">{{ errorMessage }}</p>
    </div>

    <div class="register-text">
      <p>Don't have an account? <a href="/register">Register</a></p>
    </div>
  </form>
</template>

<style scoped>
.form-container {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

.form-group {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

input {
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
}

input:focus {
  outline: none;
  border-color: #4a90e2;
  box-shadow: 0 0 4px rgba(74, 144, 226, 0.5);
}

.btn {
  width: 100%;
  padding: 0.8rem;
  background-color: #4a90e2;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
}

.btn:hover {
  background-color: #357ab8;
}

.register-text {
  text-align: center;
  margin-top: 1rem;
}

.register-text a {
  color: #4a90e2;
  text-decoration: none;
}

.register-text a:hover {
  text-decoration: underline;
}

.error-message {
  text-align: center;
  margin-top: 1rem;
}
</style>
