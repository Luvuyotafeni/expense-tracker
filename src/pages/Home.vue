<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const showWelcome = ref(true);
const router = useRouter();

onMounted(() => {
    setTimeout(() => {
        router.push('/login')
    }, 5000);
});
</script>
<template>
    <div>  
        <p v-if="showWelcome"> Welcome to the Money Tracker app</p>
        <img src="../assets/Money.jfif"/>
        
    </div>
    
</template>