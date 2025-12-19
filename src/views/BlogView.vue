<script setup lang="ts">
import { onMounted, computed, ref } from 'vue'
import { useBlogStore } from '@/stores/blog'
import Card from '@/components/ui/Card.vue'
import { useRouter } from 'vue-router'

const store = useBlogStore()
const router = useRouter()
const activeCategory = ref<string | null>(null)

onMounted(() => {
  store.fetchPosts()
})

const categories = computed(() => {
  const cats = new Set<string>()
  store.posts.forEach(p => cats.add(p.category))
  return Array.from(cats)
})

const filteredPosts = computed(() => {
  if (!activeCategory.value) return store.posts
  return store.posts.filter(p => p.category === activeCategory.value)
})

const formatDate = (date: Date | string) => {
  return new Date(date).toLocaleDateString()
}
</script>

<template>
  <div class="pt-24 min-h-screen container mx-auto px-4">
    <div class="mb-12 text-center">
      <h1 class="text-4xl font-bold text-white mb-4">Technical Blog</h1>
      <p class="text-gray-400">Insights, tutorials, and experiments.</p>
    </div>

    <!-- Category Filter -->
    <div class="flex flex-wrap gap-2 justify-center mb-12">
      <button 
        class="px-4 py-2 rounded-full text-sm transition-colors"
        :class="activeCategory === null ? 'bg-white text-primary font-bold' : 'bg-white/10 text-gray-300 hover:bg-white/20'"
        @click="activeCategory = null"
      >
        All
      </button>
      <button 
        v-for="cat in categories" 
        :key="cat"
        class="px-4 py-2 rounded-full text-sm transition-colors"
        :class="activeCategory === cat ? 'bg-white text-primary font-bold' : 'bg-white/10 text-gray-300 hover:bg-white/20'"
        @click="activeCategory = cat"
      >
        {{ cat }}
      </button>
    </div>

    <div v-if="store.loading" class="text-center py-20 text-gray-500">
      Loading posts...
    </div>

    <div v-else class="grid gap-6 max-w-4xl mx-auto">
      <Card 
        v-for="post in filteredPosts" 
        :key="post.id" 
        class="group cursor-pointer hover:bg-white/5 transition-colors duration-300"
        @click="router.push(`/blog/${post.id}`)"
      >
        <div class="flex flex-col md:flex-row gap-6">
          <div class="flex-grow">
            <div class="flex items-center gap-2 mb-2">
              <span class="text-xs font-bold text-primary-400 uppercase tracking-wider bg-primary-400/10 px-2 py-1 rounded text-blue-400">{{ post.category }}</span>
              <span class="text-gray-600">•</span>
              <span class="text-xs text-gray-500">{{ formatDate(post.createdAt) }}</span>
            </div>
            
            <h2 class="text-2xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">{{ post.title }}</h2>
            <p class="text-gray-400 mb-4 line-clamp-2 md:line-clamp-3">{{ post.summary }}</p>
            
            <div class="flex flex-wrap gap-2">
              <span v-for="tag in post.tags" :key="tag" class="text-xs text-gray-500 px-2 py-1 bg-black/20 rounded">#{{ tag }}</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  </div>
</template>
