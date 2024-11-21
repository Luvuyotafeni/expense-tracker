<script setup>
import TranscationHistory from './TranscationHistory.vue';
import BalanceExpenses from './BalanceExpenses.vue';
import {ref, onMounted} from 'vue'
import axios from 'axios'


const transactions = ref([]);
const totalIncome = ref(0);
const totalExpense = ref(0);

// Calculating the total for all transactions
const calculateTotals = () => {
    totalIncome.value = transactions.value.filter((transaction)=> transaction.type === 'income')
    .reduce((sum, transaction ) => sum + transaction.amount, 0);


    totalExpense.value = transactions.value
    .filter((transaction) => transaction.type === 'expense')
    .reduce((sum, transaction) => sum + transaction.amount, 0);
};

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

        //acknowledging the difference between the incomes and expenses
        const expenses = expensesResponse.data.map(transaction => ({
            ...transaction,
            type: 'expense',
            amount: -Math.abs(transaction.amount)
        }));

        const incomes = incomesResponse.data.map(transaction => ({
            ...transaction,
            type: 'income',
        }));

        //sorting the transactions

        transactions.value = [...expenses, ...incomes].sort((a, b) => new Date(b.date) - new Date(a.date) );
        calculateTotals();
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
        <BalanceExpenses :income="totalIncome" :expense="totalExpense"/>
        <TranscationHistory :transactions="transactions"/>
    </div>
</template>
