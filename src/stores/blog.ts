import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { BlogPost } from '@/types'
import blogData from '@/data/blog-posts.json'

export const useBlogStore = defineStore('blog', () => {
  const posts = ref<BlogPost[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function fetchPosts() {
    loading.value = true
    try {
      // Sort by date desc
      posts.value = (blogData as BlogPost[]).sort((a, b) => {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      })
    } catch (e: any) {
      error.value = e.message
    } finally {
      loading.value = false
    }
  }

  return { posts, loading, error, fetchPosts }
})
