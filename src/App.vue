<template>
  <HomePage></HomePage>
  <TechStack></TechStack>
  <div class="home">
  </div>
</template>

<script setup>
import HomePage from './views/HomePage.vue'
import TechStack from './views/TechStack.vue'
</script>

<style scoped>
.home {
  grid-template-rows: auto;
}
</style>