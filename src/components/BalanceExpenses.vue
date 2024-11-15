<template>
    <div class="inc-exp-container">
        <div>
            <h4>Balance</h4>
            <p id="money-plus" class="money plus">+R{{income}}</p>
        </div>
        <div>
            <h4>Expenses</h4>
            <p id="money-minus" class="money minus">R{{expense}}</p>
        </div>
    </div>
</template>


<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    income:{
        type: Number,
        required: true,
    },
    expense:{
        type:Number,
        required:true,
    }
})
</script>