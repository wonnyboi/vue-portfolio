export interface Project {
  id: string
  title: string
  summary: string
  description: string
  techStack: string[]
  role: string
  period: {
    start: Date | string
    end: Date | string | null // null means 'Present'
  }
  images: string[]
  repoUrl?: string
  demoUrl?: string
  tags: string[]
  isPublished: boolean
  createdAt: Date | string
  updatedAt: Date | string
}

export interface BlogPost {
  id: string
  title: string
  summary: string
  content: string // Markdown or HTML
  category: string
  tags: string[]
  icon?: string
  thumbnail?: string
  isPublished: boolean
  createdAt: Date | string
  updatedAt: Date | string
}
