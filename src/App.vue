<template>
  <div class="home">
    <div>정휘원의 Vue를 활용한 블로그/포트폴리오에 오신것을 환영합니다</div>
    <HomePage></HomePage>
  </div>
</template>

<script setup>
import HomePage from './views/HomePage.vue'
</script>

<style scoped>
.home {
  grid-template-rows: auto;
}
</style>