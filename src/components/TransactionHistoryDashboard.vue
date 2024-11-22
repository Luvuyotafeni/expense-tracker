<script setup>
import TranscationHistory from './TranscationHistory.vue';
import BalanceExpenses from './BalanceExpenses.vue';
import { ref, onMounted, onUnmounted, computed } from 'vue';
import axios from 'axios';

const transactions = ref([]);
const totalIncome = ref(0);
const totalExpense = ref(0);
const intervalId = ref(null);

// Computed property for balance
const balance = computed(() => totalIncome.value + totalExpense.value);

// Calculating the total for all transactions
const calculateTotals = () => {
  totalIncome.value = transactions.value
    .filter((transaction) => transaction.type === 'income')
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  totalExpense.value = transactions.value
    .filter((transaction) => transaction.type === 'expense')
    .reduce((sum, transaction) => sum + transaction.amount, 0);
};

// Fetching the expenses and incomes from the backend
const fetchTransactions = async () => {
  try {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      console.error('User is not logged in');
      return;
    }

    const [expensesResponse, incomesResponse] = await Promise.all([
      axios.get(`https://expense-tracker-backend-2cs2.onrender.com/api/expense/${userId}`),
      axios.get(`https://expense-tracker-backend-2cs2.onrender.com/api/income/${userId}`),
    ]);

    const expenses = expensesResponse.data.map((transaction) => ({
      ...transaction,
      type: 'expense',
      amount: -Math.abs(transaction.amount),
      id: transaction._id,
    }));

    const incomes = incomesResponse.data.map((transaction) => ({
      ...transaction,
      type: 'income',
      id: transaction._id,
    }));

    transactions.value = [...expenses, ...incomes].sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );
    calculateTotals();
  } catch (err) {
    console.error('Error fetching transactions', err);
  }
};

// Polling the server
const startPolling = () => {
  intervalId.value = setInterval(fetchTransactions, 1000);
};

const stopPolling = () => {
  if (intervalId.value) clearInterval(intervalId.value);
};

// Deleting a transaction
const deleteTransaction = async (id) => {
  try {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      console.error('User is not logged in');
      return;
    }

    const transaction = transactions.value.find((t) => t.id === id);
    if (!transaction) {
      console.error('Transaction not found');
      return;
    }

    const route =
      transaction.type === 'expense'
        ? `https://expense-tracker-backend-2cs2.onrender.com/api/expense/${id}`
        : `https://expense-tracker-backend-2cs2.onrender.com/api/income/${id}`;
    await axios.delete(route);

    transactions.value = transactions.value.filter((t) => t.id !== id);
  } catch (err) {
    console.error('Error deleting transaction', err);
  }
};

// Fetch the transaction when this component is mounted
onMounted(() => {
  fetchTransactions();
  startPolling();
});

onUnmounted(() => {
  stopPolling();
});
</script>

<template>
  <div>
    <div class="balance">
      <h4>Your Balance</h4>
      <h1>R{{ balance }}</h1>
    </div>  
    <BalanceExpenses :income="totalIncome" :expense="totalExpense" />
    
    <TranscationHistory
      :transactions="transactions"
      @transaction-deleted="deleteTransaction"
    />
  </div>
</template>

<style scoped>

h4 {
  font-size: 1.2rem;
  color: black;
}
h1 {
  font-size: 2rem;
  color: black;
}
</style>
