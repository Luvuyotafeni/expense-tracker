<template>
    <h3>Add New Transaction</h3>
    <form id="form" @submit.prevent="onSubmit">
      <div class="form-control">
        <label for="text">Transaction Name</label>
        <input type="text" id="text" v-model="text" placeholder="Enter text" />
      </div>
      <div class="form-control">
        <label for="amount">
          Amount<br />
          (negative - expense, positive - income)
        </label>
        <input type="number" id="amount" v-model="amount" placeholder="Enter amount" />
      </div>
      <button class="btn">Add a Transaction</button>
    </form>
  </template>
  
  <script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useToast } from 'vue-toastification';

const text = ref('');
const amount = ref('');
const toast = useToast();

// Define emits for parent communication
const emit = defineEmits(['transactionSubmitted']);

const onSubmit = async () => {
  if (!text.value || !amount.value) {
    toast.error('Please fill in both fields.');
    return;
  }

  if (isNaN(amount.value) || amount.value === 0) {
    toast.error('Amount must be a valid number and not zero.');
    return;
  }

  const userId = localStorage.getItem('userId'); // Dynamically retrieve user ID
  if (!userId) {
    toast.error('User is not logged in.');
    return;
  }

  const transactionData = {
    userId,
    text: text.value.trim(),
    amount: parseFloat(amount.value),
  };

  try {
    // Determine route based on transaction type
    const route = transactionData.amount >= 0 ? 'https://expense-tracker-backend-2cs2.onrender.com/api/income' : 'https://expense-tracker-backend-2cs2.onrender.com/api/expense';

    // Send transaction to the backend
    const response = await axios.post(route, transactionData);

    // Emit success event with response data
    emit('transactionSubmitted', response.data);

    // Show success message and clear form
    toast.success('Transaction added successfully.');
    text.value = '';
    amount.value = '';
  } catch (err) {
    console.error('Error:', err);
    toast.error('Failed to add transaction. Please try again.');
  }
};
</script>

  