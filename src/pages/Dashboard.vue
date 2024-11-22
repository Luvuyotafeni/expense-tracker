<template>
  <div>
    <Header />
    <div class="container">
      <button class="logout-button" @click="logout">Log Out</button>
      <Balance :total="total" />
      <!-- <BalanceExpenses :income="income" :expense="expense" /> -->
      <!-- <TransactionHistory :transactions="transactions" @transactionDeleted="handleTransactionDeleted" /> -->
      <TransactionHistoryDashboard />
      <AddTransaction @transactionSubmitted="handleTransactionSubmitted" />
    </div>
  </div>
</template>

<script setup>
import Header from '../components/Header.vue';
import Balance from '../components/Balance.vue';
import AddTransaction from '../components/AddTransaction.vue';
import TransactionHistoryDashboard from '@/components/TransactionHistoryDashboard.vue';
import { useRouter } from 'vue-router';

import { ref, computed } from 'vue';
const router = useRouter();

const transactions = ref([]);
const total = computed(() =>
  transactions.value.reduce((acc, transaction) => acc + transaction.amount, 0)
);

const income = computed(() =>
  transactions.value
    .filter((transaction) => transaction.amount > 0)
    .reduce((acc, transaction) => acc + transaction.amount, 0)
);

const expense = computed(() =>
  transactions.value
    .filter((transaction) => transaction.amount < 0)
    .reduce((acc, transaction) => acc + transaction.amount, 0)
);

const handleTransactionSubmitted = (transaction) => {
  transactions.value.push({
    id: Math.random().toString(36).substr(2, 9),
    ...transaction,
  });
};

const handleTransactionDeleted = (id) => {
  transactions.value = transactions.value.filter((transaction) => transaction.id !== id);
};

const logout = () => {
  alert('Logging out...');
  // Add your logout logic here, e.g., clearing authentication tokens or redirecting
  router.push('/register');
};
</script>

<style scoped>
.logout-button {
  background-color: #ff4d4f;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  margin-bottom: 20px;
}

.logout-button:hover {
  background-color: #d9363e;
}
</style>
