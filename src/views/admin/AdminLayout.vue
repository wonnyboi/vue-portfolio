<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const logout = async () => {
  await authStore.logout()
  router.push('/admin/login')
}
</script>

<template>
  <div class="min-h-screen bg-primary flex">
    <!-- Sidebar -->
    <aside class="w-64 bg-black/20 border-r border-white/10 py-6 flex flex-col">
      <div class="px-6 mb-8">
        <h2 class="text-xl font-bold text-white">관리자 패널</h2>
      </div>
      
      <nav class="flex-1 px-4 space-y-2">
        <router-link to="/admin/projects" class="block px-4 py-2 rounded-lg text-gray-300 hover:bg-white/5 hover:text-white" active-class="bg-flutter/20 text-flutter">
          프로젝트 관리
        </router-link>
        <router-link to="/admin/blog" class="block px-4 py-2 rounded-lg text-gray-300 hover:bg-white/5 hover:text-white" active-class="bg-vue/20 text-vue">
          블로그 관리
        </router-link>
      </nav>

      <div class="px-4 mt-auto">
        <button @click="logout" class="w-full text-left px-4 py-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg">
          로그아웃
        </button>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 overflow-auto">
      <div class="p-8">
        <router-view />
      </div>
    </main>
  </div>
</template>
