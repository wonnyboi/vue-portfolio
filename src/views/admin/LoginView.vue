<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import Button from '@/components/ui/Button.vue'

const email = ref('')
const password = ref('')
const authStore = useAuthStore()
const router = useRouter()

const handleLogin = async () => {
  await authStore.login(email.value, password.value)
  if (!authStore.error) {
    router.push('/admin/projects')
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-primary px-4">
    <div class="w-full max-w-md bg-white/5 border border-white/10 rounded-xl p-8 backdrop-blur-md">
      <h1 class="text-2xl font-bold text-white mb-6 text-center">관리자 접속</h1>
      
      <form @submit.prevent="handleLogin" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-400 mb-1">이메일</label>
          <input 
            v-model="email" 
            type="email" 
            class="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-flutter focus:outline-none"
            required
          />
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-400 mb-1">비밀번호</label>
          <input 
            v-model="password" 
            type="password" 
            class="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-flutter focus:outline-none"
            required
          />
        </div>

        <div v-if="authStore.error" class="text-red-400 text-sm">
          {{ authStore.error }}
        </div>

        <Button :disabled="authStore.loading" block variant="primary">
          {{ authStore.loading ? '로그인 중...' : '로그인' }}
        </Button>
      </form>
    </div>
  </div>
</template>
