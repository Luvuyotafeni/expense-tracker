<script setup>
import TranscationHistory from './TranscationHistory.vue';
import {ref, onMounted} from 'vue'
import axios from 'axios'


const transactions = ref([]);

//fetching the expenses and incomes from the backend
const fetchTransactions = async () => {
    try {
        const userId = localStorage.getItem('userId');
        if (!userId){
            console.error('user is not logged in');
            return;
        }

        // fetch both expenses and incomes
        const [expensesResponse, incomesResponse] = await Promise.all([
            axios.get(`http://localhost:5000/api/expense/${userId}`),
            axios.get(`http://localhost:5000/api/income/${userId}`)
        ]);

        //Combining the expenses and incomes in order to display them as an array

        const allTransactions = [
            ...expensesResponse.data.map( transaction => ({...transaction, amount: -transaction.amount})),
            ...incomesResponse.data
        ];

        //sorting the transactions

        transactions.value = allTransactions.sort((a,b ) => new Date(b.date) - new Date(a.date));
    } catch (err) {
        console.error('Error fetching the transacctions', err)
    }
};
//fetch the transaction when this component in mounted 
onMounted(() => {
    fetchTransactions();
});

</script>
<template>
    <div>
        <TranscationHistory :transactions="transactions"/>
    </div>
</template>
