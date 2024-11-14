<template>
    <h3>Transaction History</h3>
    <ul id="list" class="list">
        <li v-for="transaction in transactions " :key="transaction.id"> {{ transaction.text }} <span>{{ transaction.amount }}</span><button class="delete-btn">x</button></li>
        
    </ul>
</template>
<script>
export default {
    data() {
        return{
            transactions: [
                { id: 1, text:'flour', amount: -999 },
                { id: 2, text:'flour', amount: 999 },
                { id: 3, text:'flour', amount: 999 },
                { id: 4, text:'flour', amount: -699 },

            ]
        }
    }
}
</script>