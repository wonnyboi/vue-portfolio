<script setup lang="ts">
import Button from '@/components/ui/Button.vue'
</script>

<template>
  <nav class="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-primary/80 backdrop-blur-md">
    <div class="container mx-auto px-4 h-16 flex items-center justify-between">
      <router-link to="/" class="text-xl font-bold bg-gradient-to-r from-flutter via-vue to-vision bg-clip-text text-transparent">
        Vision.AI
      </router-link>
      
      <div class="hidden md:flex items-center gap-8">
        <router-link to="/projects" class="text-gray-300 hover:text-white transition-colors">프로젝트</router-link>
        <router-link to="/blog" class="text-gray-300 hover:text-white transition-colors">블로그</router-link>
        <router-link to="/about" class="text-gray-300 hover:text-white transition-colors">소개</router-link>
      </div>

      <div class="flex items-center gap-4">
        <Button variant="primary" size="sm">문의하기</Button>
      </div>
    </div>
  </nav>
</template>
