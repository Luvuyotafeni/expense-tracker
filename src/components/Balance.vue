<template>
    <h4>You balance</h4>
    <h1 id="balance"> R{{ total }}</h1>
</template>

<script setup>
 import { defineProps } from 'vue';

 const props = defineProps({
    total:{
        type: Number,
        reuqired: true, 
    }
 })
</script>