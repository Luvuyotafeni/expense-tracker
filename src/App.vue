<template>
<Header />
<div class="container">
 <Balance :total="total"/>
 <BalanceExpenses :income="+income" :expense="+expense"/>
 <TranscationHistory :transactions="transactions"/>
 <AddTransaction/>
</div>
</template>

<script setup>
import Header from './components/Header.vue';
import Balance from './components/Balance.vue';
import BalanceExpenses from './components/BalanceExpenses.vue';
import TranscationHistory from './components/TranscationHistory.vue';
import AddTransaction from './components/AddTransaction.vue';

import { ref, computed } from 'vue';

const transactions = ref( [
                { id: 1, text:'flour', amount: -999 },
                { id: 2, text:'flour', amount: 999 },
                { id: 3, text:'flour', amount: 999 },
                { id: 4, text:'flour', amount: -699 },
            ]);
const total = computed(() => {
    return transactions.value.reduce((acc, transaction) => {
        return acc + transaction.amount;
    }, 0);
});

//getting an income

const income = computed(() => {
    return transactions.value
    .filter((transaction) => transaction.amount > 0)
    .reduce((acc, transaction) => {
        return acc + transaction.amount;
    }, 0).toFixed(2);
})

//getting the expense

const expense = computed(() => {
    return transactions.value
    .filter((transaction) => transaction.amount < 0)
    .reduce((acc, transaction) => {
        return acc + transaction.amount;
    }, 0).toFixed(2);
})


</script>