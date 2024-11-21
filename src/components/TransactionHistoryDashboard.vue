<script setup>
import TranscationHistory from './TranscationHistory.vue';
import BalanceExpenses from './BalanceExpenses.vue';
import {ref, onMounted, onUnmounted} from 'vue'
import axios from 'axios'


const transactions = ref([]);
const totalIncome = ref(0);
const totalExpense = ref(0);

let intervalId;

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
        if (!userId) {
            console.error('User is not logged in');
            return;
        }

        const [expensesResponse, incomesResponse] = await Promise.all([
            axios.get(`http://localhost:5000/api/expense/${userId}`),
            axios.get(`http://localhost:5000/api/income/${userId}`)
        ]);

        const expenses = expensesResponse.data.map(transaction => ({
            ...transaction,
            type: 'expense',
            amount: -Math.abs(transaction.amount),
            id: transaction._id, 
        }));

        const incomes = incomesResponse.data.map(transaction => ({
            ...transaction,
            type: 'income',
            id: transaction._id, 
        }));

        transactions.value = [...expenses, ...incomes].sort((a, b) => new Date(b.date) - new Date(a.date));
        calculateTotals();
    } catch (err) {
        console.error('Error fetching transactions', err);
    }
};


//polling the server
const startPolling = () => {
    intervalId = setInterval(fetchTransactions,1000);
}

const stopPolling = () => {
    if (intervalId) clearInterval(intervalId);
}
// Deleting a transaction

const deleteTransaction = async (id) => {
    try {
        const userId = localStorage.getItem('userId');
        if (!userId) {
            console.error('User is not logged in');
            return;
        }

        const transaction = transactions.value.find(t => t.id === id);
        if (!transaction) {
            console.error('Transaction not found');
            return;
        }

        const route = transaction.type === 'expense'
            ? `http://localhost:5000/api/expense/${id}`
            : `http://localhost:5000/api/income/${id}`;
        await axios.delete(route);

        transactions.value = transactions.value.filter(t => t.id !== id);
    } catch (err) {
        console.error('Error deleting transaction', err);
    }
};


//fetch the transaction when this component in mounted 
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
        <BalanceExpenses :income="totalIncome" :expense="totalExpense"/>
        <TranscationHistory :transactions="transactions" @transaction-deleted="deleteTransaction"/>
    </div>
</template>
