import { defineStore } from 'pinia'
import { ref } from 'vue'
import { auth } from '@/firebase'
import { signInWithEmailAndPassword, signOut, onAuthStateChanged, type User } from 'firebase/auth'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const loading = ref(true)
  const error = ref<string | null>(null)

  // Initialize auth listener
  onAuthStateChanged(auth, (u) => {
    user.value = u
    loading.value = false
  })

  async function login(email: string, pass: string) {
    loading.value = true
    error.value = null
    try {
      await signInWithEmailAndPassword(auth, email, pass)
    } catch (e: any) {
      error.value = e.message
    } finally {
      loading.value = false
    }
  }

  async function logout() {
    await signOut(auth)
  }

  return { user, loading, error, login, logout }
})
