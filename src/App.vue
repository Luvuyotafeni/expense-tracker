<template>
<Header />
<div class="container">
 <Balance/>
 <BalanceExpenses/>
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

import { ref } from 'vue';

const transactions = ref( [
                { id: 1, text:'flour', amount: -999 },
                { id: 2, text:'flour', amount: 999 },
                { id: 3, text:'flour', amount: 999 },
                { id: 4, text:'flour', amount: -699 },
            ]);
</script>