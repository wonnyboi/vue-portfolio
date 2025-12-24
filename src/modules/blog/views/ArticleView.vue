<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useBlogStore } from '@/modules/blog/stores/blog'
import Button from '@/core/components/ui/Button.vue'

const route = useRoute()
const router = useRouter()
const store = useBlogStore()

const postId = route.params.id as string

const post = computed(() => {
  return store.posts.find(p => p.id === postId)
})

onMounted(() => {
  if (store.posts.length === 0) {
    store.fetchPosts()
  }
})

const formatDate = (date: Date | string) => {
  return new Date(date).toLocaleDateString()
}
</script>

<template>
  <div class="pt-24 min-h-screen container mx-auto px-4 pb-20" v-if="post">
    <div class="max-w-4xl mx-auto">
      <Button variant="ghost" @click="router.back()" class="mb-8">
        ← 블로그로 돌아가기
      </Button>

      <div class="flex items-center gap-3 text-sm text-gray-400 mb-4">
        <span>{{ post.category }}</span>
        <span>•</span>
        <span>{{ formatDate(post.createdAt) }}</span>
      </div>

      <h1 class="text-3xl md:text-5xl font-bold text-white mb-8">{{ post.title }}</h1>

      <div class="flex flex-wrap gap-2 mb-12">
        <span v-for="tag in post.tags" :key="tag" class="px-3 py-1 bg-white/5 rounded-full text-sm text-gray-300">
          #{{ tag }}
        </span>
      </div>

      <!-- Article Content (HTML) -->
      <article class="prose prose-invert prose-lg max-w-none bg-white/5 p-8 rounded-2xl border border-white/10">
        <div v-html="post.content"></div>
      </article>
      
    </div>
  </div>
  <div v-else class="pt-32 text-center text-gray-500">
    <div v-if="store.loading">글 불러오는 중...</div>
    <div v-else>글을 찾을 수 없습니다.</div>
  </div>
</template>

<style>
/* Custom Styles for Notion Content */
.prose img {
  border-radius: 0.5rem;
  margin: 2rem auto;
}
.prose pre {
  background: #1e1e1e !important;
  border-radius: 0.5rem;
  padding: 1rem;
}
.prose code {
  color: #fbbf24;
}
.prose a {
  color: #60a5fa;
  text-decoration: none;
}
.prose a:hover {
  text-decoration: underline;
}
.prose blockquote {
  border-left-color: #60a5fa;
  background: rgba(255,255,255,0.05);
  padding: 1rem;
  border-radius: 0.25rem;
}
</style>
