<template>
<Header />
<div class="container">
 <Balance/>
 <BalanceExpenses/>
 <TranscationHistory/>
 <AddTransaction/>
</div>
</template>

<script>
import Header from './components/Header.vue';
import Balance from './components/Balance.vue';
import BalanceExpenses from './components/BalanceExpenses.vue';
import TranscationHistory from './components/TranscationHistory.vue';
import AddTransaction from './components/AddTransaction.vue';


export default {
  components: {
    Header, 
    Balance,
    BalanceExpenses,
    TranscationHistory,
    AddTransaction, 


  }
}
</script>