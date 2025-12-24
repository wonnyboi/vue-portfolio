import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Project } from '@/types'
import { getDataConnect } from 'firebase/data-connect'
import { auth } from '@/firebase'
import { listProjects, connectorConfig } from '@/dataconnect-generated'

export const useProjectStore = defineStore('projects', () => {
  const projects = ref<Project[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const publishedProjects = computed(() => projects.value.filter(p => p.isPublished))
  
  // Use auth.app - assuming Firebase App is initialized
  const dc = getDataConnect(auth.app, connectorConfig as any)

  async function fetchProjects() {
    loading.value = true
    error.value = null
    try {
      const response = await listProjects(dc);
      // Map SDK response to Project type
      projects.value = response.data.projects.map((p: any) => ({
        id: p.id,
        title: p.title,
        summary: p.summary,
        description: p.description,
        techStack: p.techStack,
        role: p.role,
        period: {
           start: p.periodStart || new Date().toISOString(),
           end: p.periodEnd
        },
        images: p.images,
        tags: p.tags,
        isPublished: p.isPublished,
        createdAt: p.createdAt,
        updatedAt: p.updatedAt
      })) as Project[];
    } catch (e: any) {
      console.error('Failed to fetch projects:', e)
      error.value = e.message
    } finally {
      loading.value = false
    }
  }

  // Placeholder for future actions
  async function addProject(project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) {
      // TODO: Implement with createProject mutation when needed
      console.warn('addProject not implemented yet');
  }

  return { projects, loading, error, publishedProjects, fetchProjects, addProject }
})
