<script setup lang="ts">
import Navbar from '@/components/layout/Navbar.vue'
</script>

<template>
  <div class="min-h-screen bg-primary">
    <Navbar />
    <router-view />
  </div>
</template>
