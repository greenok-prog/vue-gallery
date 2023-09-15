

<template>
  <Header />

  <RouterView />
</template>
<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Header from './components/header/index.vue'

console.log(import.meta.env.VITE_API_URL);



</script>
<style scoped></style>
