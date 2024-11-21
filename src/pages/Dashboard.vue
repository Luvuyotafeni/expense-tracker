<template>
    <div>
      <Header />
      <div class="container">
        <Balance :total="total" />
        <BalanceExpenses :income="income" :expense="expense" />
        <!-- <TransactionHistory :transactions="transactions" @transactionDeleted="handleTransactionDeleted" /> -->
        <TransactionHistoryDashboard/>
        <AddTransaction @transactionSubmitted="handleTransactionSubmitted" />
      </div>
    </div>
  </template>
  
  <script setup>
  import Header from '../components/Header.vue';
  import Balance from '../components/Balance.vue';
  import BalanceExpenses from '../components/BalanceExpenses.vue';
  import TransactionHistory from '../components/TranscationHistory.vue';
  import AddTransaction from '../components/AddTransaction.vue';
  
  import { ref, computed } from 'vue';
import TransactionHistoryDashboard from '@/components/TransactionHistoryDashboard.vue';
  
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
  </script>
  