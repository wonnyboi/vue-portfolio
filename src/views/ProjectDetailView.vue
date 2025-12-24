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
      <router-link to="/projects" class="text-gray-400 hover:text-white mb-6 inline-block">← 프로젝트 목록으로</router-link>
      
      <h1 class="text-4xl md:text-5xl font-bold text-white mb-6">{{ project.title }}</h1>
      
      <div class="flex flex-wrap gap-4 mb-8">
        <span v-for="tag in project.tags" :key="tag" class="px-3 py-1 rounded-full bg-primary/80 border border-white/20 text-sm text-gray-300">
          {{ tag }}
        </span>
      </div>

      <div class="aspect-video bg-gray-800 rounded-2xl overflow-hidden mb-12 relative">
          <img v-if="project.images.length > 0" :src="project.images[0]" class="w-full h-full object-cover" />
          <div v-else class="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center text-gray-600">
            이미지 없음
          </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
        <div class="md:col-span-2 space-y-8">
          <section>
            <h2 class="text-2xl font-bold text-white mb-4">개요</h2>
            <p class="text-gray-300 leading-relaxed whitespace-pre-line">{{ project.description }}</p>
          </section>
          
          <section>
            <h2 class="text-2xl font-bold text-white mb-4">기술적 도전 과제</h2>
            <p class="text-gray-400">상세한 개발 과정과 기술적인 해결 방법 내용이 이곳에 들어갑니다.</p>
          </section>
        </div>

        <div class="space-y-8">
          <div class="bg-white/5 rounded-xl p-6 border border-white/10">
            <h3 class="text-lg font-bold text-white mb-4">프로젝트 정보</h3>
            
            <div class="space-y-4">
              <div>
                <div class="text-xs text-gray-500 uppercase">역할</div>
                <div class="text-gray-200">
                  <span v-for="(role, index) in project.role" :key="role">
                    {{ role }}{{ index < project.role.length - 1 ? ', ' : '' }}
                  </span>
                </div>
              </div>
              <div>
                <div class="text-xs text-gray-500 uppercase">기간</div>
                <div class="text-gray-200">
                  {{ new Date(project.period.start).toLocaleDateString() }} - 
                  {{ project.period.end ? new Date(project.period.end).toLocaleDateString() : '진행중' }}
                </div>
              </div>
              <div>
                <div class="text-xs text-gray-500 uppercase">기술 스택</div>
                <div class="flex flex-wrap gap-2 mt-2">
                  <span v-for="tech in project.techStack" :key="tech" class="text-xs bg-white/10 px-2 py-1 rounded text-gray-300">
                    {{ tech }}
                  </span>
                </div>
              </div>
            </div>

            <div class="mt-8 space-y-3">
              <Button v-if="project.demoUrl" block variant="primary">데모 보기</Button>
              <Button v-if="project.repoUrl" block variant="outline">코드 보기</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="pt-32 text-center text-gray-500">
    프로젝트를 찾을 수 없습니다.
  </div>
</template>
