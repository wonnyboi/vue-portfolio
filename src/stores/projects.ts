import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Project } from '@/types'
// import { collection, getDocs, query, orderBy } from 'firebase/firestore'
// import { db } from '@/firebase'

export const useProjectStore = defineStore('projects', () => {
  const projects = ref<Project[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const publishedProjects = computed(() => projects.value.filter(p => p.isPublished))

  async function fetchProjects() {
    loading.value = true
    error.value = null
    try {
      // In real app, remove the mock data fallback when Firebase is connected
      // const q = query(collection(db, 'projects'), orderBy('createdAt', 'desc'))
      // const snapshot = await getDocs(q)
      // projects.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Project))
      
      // MOCK DATA for Development
      if (projects.value.length === 0) {
          projects.value = [
              {
                  id: '1',
                  title: 'Vision AI Traffic Monitor',
                  summary: 'Real-time traffic analysis using YOLOv8 and Python.',
                  description: 'A comprehensive system for monitoring traffic flow...',
                  techStack: ['Python', 'OpenCV', 'YOLO'],
                  role: 'Lead AI Engineer',
                  period: { start: new Date('2023-01-01'), end: new Date('2023-06-01') },
                  images: [],
                  tags: ['Vision AI', 'Python'],
                  isPublished: true,
                  createdAt: new Date(),
                  updatedAt: new Date()
              },
              {
                  id: '2',
                  title: 'Flutter E-Commerce App',
                  summary: 'Cross-platform mobile app with complex animations.',
                  description: 'Built a high-performance shopping app...',
                  techStack: ['Flutter', 'Dart', 'Firebase'],
                  role: 'Sole Developer',
                  period: { start: new Date('2023-07-01'), end: null },
                  images: [],
                  tags: ['Flutter', 'Mobile'],
                  isPublished: true,
                  createdAt: new Date(),
                  updatedAt: new Date()
              }
          ]
      }
      
    } catch (e: any) {
      console.error('Error fetching projects:', e)
      error.value = e.message
    } finally {
      loading.value = false
    }
  }

  return { projects, publishedProjects, loading, error, fetchProjects }
})
