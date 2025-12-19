<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { useProjectStore } from '@/stores/projects'
import Card from '@/components/ui/Card.vue'
import Button from '@/components/ui/Button.vue'
import { useRouter } from 'vue-router'

const store = useProjectStore()
const router = useRouter()
const activeTag = ref<string | null>(null)

onMounted(() => {
  store.fetchProjects()
})

const allTags = computed(() => {
  const tags = new Set<string>()
  store.publishedProjects.forEach(p => p.tags.forEach(t => tags.add(t)))
  return Array.from(tags)
})

const filteredProjects = computed(() => {
  if (!activeTag.value) return store.publishedProjects
  return store.publishedProjects.filter(p => p.tags.includes(activeTag.value!))
})

const navigateToDetail = (id: string) => {
  router.push(`/projects/${id}`)
}
</script>

<template>
  <div class="pt-24 min-h-screen container mx-auto px-4">
    <div class="mb-12 text-center">
      <h1 class="text-4xl font-bold text-white mb-4">Projects</h1>
      <p class="text-gray-400 max-w-2xl mx-auto">
        A collection of my work in Vision AI, Web Development, and Mobile Apps.
      </p>
    </div>

    <!-- Filters -->
    <div class="flex flex-wrap gap-2 justify-center mb-12">
      <Button 
        variant="ghost" 
        size="sm" 
        :class="{ 'bg-white/10 text-white': activeTag === null }"
        @click="activeTag = null"
      >
        All
      </Button>
      <Button 
        v-for="tag in allTags" 
        :key="tag" 
        variant="ghost"
        size="sm"
        :class="{ 'bg-white/10 text-white': activeTag === tag }"
        @click="activeTag = tag"
      >
        {{ tag }}
      </Button>
    </div>

    <!-- Loading State -->
    <div v-if="store.loading" class="text-center py-20 text-gray-500">
      Loading projects...
    </div>

    <!-- Error State -->
    <div v-else-if="store.error" class="text-center py-20 text-red-400">
      {{ store.error }}
    </div>

    <!-- Projects Grid -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card 
        v-for="project in filteredProjects" 
        :key="project.id" 
        class="flex flex-col h-full cursor-pointer group"
        @click="navigateToDetail(project.id)"
      >
        <div class="aspect-video bg-gray-800 rounded-lg mb-4 overflow-hidden relative">
          <!-- Image Placeholder -->
          <img v-if="project.images.length > 0" :src="project.images[0]" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
          <div v-else class="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-gray-600">
            No Image
          </div>
          
          <div class="absolute top-2 right-2 flex gap-1">
             <span v-for="tag in project.tags.slice(0, 2)" :key="tag" class="px-2 py-1 text-xs font-bold rounded bg-black/50 text-white backdrop-blur-md">
               {{ tag }}
             </span>
          </div>
        </div>

        <h3 class="text-xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">{{ project.title }}</h3>
        <p class="text-gray-400 text-sm mb-4 line-clamp-3 flex-grow">{{ project.summary }}</p>
        
        <div class="flex flex-wrap gap-2 mt-auto">
          <span v-for="tech in project.techStack.slice(0,3)" :key="tech" class="text-xs text-gray-500 bg-white/5 px-2 py-1 rounded">
            {{ tech }}
          </span>
        </div>
      </Card>
    </div>
  </div>
</template>
