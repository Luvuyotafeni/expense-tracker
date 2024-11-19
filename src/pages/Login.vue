<script setup>
</script>

<template>
    <form class="form-container">
      <div class="form-group">
        <label for="username">Enter your Username</label>
        <input type="text" id="username" placeholder="Enter your username" />
      </div>
      <div class="form-group">
        <label for="password">Enter your Password</label>
        <input type="password" id="password" placeholder="Enter your password" />
      </div>
      <button type="submit" class="btn">Log In</button>
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
</style>