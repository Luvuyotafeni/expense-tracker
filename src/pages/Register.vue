<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';

const username = ref('');
const password = ref('');
const confirmPassword = ref('');
const errorMessage = ref('');
const router = useRouter();
const toast = useToast();

const handleSubmit = async (event) => {
  event.preventDefault();

  if (password.value !== confirmPassword.value) {
    errorMessage.value = "Passwords do not match.";
    return;
  }

  try {
    const response = await axios.post('https://expense-tracker-backend-2cs2.onrender.com/api/auth/register', {
      username: username.value,
      password: password.value,
    });
    toast.success('Registration successful');
    router.push('/login');  // Redirect to login page after successful registration
  } catch (error) {
    errorMessage.value = error.response.data.error;
  }
};

const goToLogin = () => {
  router.push('/login');
};
</script>


<template>
  
  <form class="form-container" @submit="handleSubmit">
  <div class="form-group">
    <label for="username">Enter your Username</label>
    <input type="text" id="username" v-model="username" placeholder="Enter your username" />
  </div>
  <div class="form-group">
    <label for="password">Create Password</label>
    <input type="password" id="password" v-model="password" placeholder="Create a password" />
  </div>
  <div class="form-group">
    <label for="confirm-password">Confirm Password</label>
    <input type="password" id="confirm-password" v-model="confirmPassword" placeholder="Confirm your password" />
  </div>
  <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
  <div class="login-text">
    <button type="submit" class="btn">Register</button>
    <p>Already have an account? <a @click.prevent="goToLogin">Log In</a></p>
  </div>
</form>

</template>

<style scoped>
/*  */

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
.login-text a:hover {
  text-decoration: underline;
}
</style>
