<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useProjectStore } from '@/stores/projects'
import Button from '@/components/ui/Button.vue'

const route = useRoute()
const store = useProjectStore()

const projectId = route.params.id as string

const project = computed(() => {
  return store.projects.find(p => p.id === projectId)
})

onMounted(() => {
  if (store.projects.length === 0) {
    store.fetchProjects()
  }
})
</script>

<template>
  <div class="pt-24 min-h-screen container mx-auto px-4" v-if="project">
    <div class="max-w-4xl mx-auto">
      <router-link to="/projects" class="text-gray-400 hover:text-white mb-6 inline-block">← Back to Projects</router-link>
      
      <h1 class="text-4xl md:text-5xl font-bold text-white mb-6">{{ project.title }}</h1>
      
      <div class="flex flex-wrap gap-4 mb-8">
        <span v-for="tag in project.tags" :key="tag" class="px-3 py-1 rounded-full bg-primary/80 border border-white/20 text-sm text-gray-300">
          {{ tag }}
        </span>
      </div>

      <div class="aspect-video bg-gray-800 rounded-2xl overflow-hidden mb-12 relative">
          <img v-if="project.images.length > 0" :src="project.images[0]" class="w-full h-full object-cover" />
          <div v-else class="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center text-gray-600">
            No Image Available
          </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
        <div class="md:col-span-2 space-y-8">
          <section>
            <h2 class="text-2xl font-bold text-white mb-4">Overview</h2>
            <p class="text-gray-300 leading-relaxed whitespace-pre-line">{{ project.description }}</p>
          </section>
          
          <section>
            <h2 class="text-2xl font-bold text-white mb-4">Technical Challenges</h2>
            <p class="text-gray-400">Detailed case study logic would go here...</p>
          </section>
        </div>

        <div class="space-y-8">
          <div class="bg-white/5 rounded-xl p-6 border border-white/10">
            <h3 class="text-lg font-bold text-white mb-4">Project Info</h3>
            
            <div class="space-y-4">
              <div>
                <div class="text-xs text-gray-500 uppercase">Role</div>
                <div class="text-gray-200">{{ project.role }}</div>
              </div>
              <div>
                <div class="text-xs text-gray-500 uppercase">Timeline</div>
                <div class="text-gray-200">
                  {{ new Date(project.period.start).toLocaleDateString() }} - 
                  {{ project.period.end ? new Date(project.period.end).toLocaleDateString() : 'Present' }}
                </div>
              </div>
              <div>
                <div class="text-xs text-gray-500 uppercase">Tech Stack</div>
                <div class="flex flex-wrap gap-2 mt-2">
                  <span v-for="tech in project.techStack" :key="tech" class="text-xs bg-white/10 px-2 py-1 rounded text-gray-300">
                    {{ tech }}
                  </span>
                </div>
              </div>
            </div>

            <div class="mt-8 space-y-3">
              <Button v-if="project.demoUrl" block variant="primary">View Live Demo</Button>
              <Button v-if="project.repoUrl" block variant="outline">View Source</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="pt-32 text-center text-gray-500">
    Project not found.
  </div>
</template>
