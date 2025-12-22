import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  { 
    path: '/', 
    name: 'Home', 
    component: () => import('@/views/HomeView.vue') 
  },
  { 
    path: '/projects', 
    name: 'Projects', 
    component: () => import('@/views/ProjectsView.vue') 
  },
  {
    path: '/projects/:id',
    name: 'ProjectDetail',
    component: () => import('@/views/ProjectDetailView.vue')
  },
  { 
    path: '/blog', 
    name: 'Blog', 
    component: () => import('@/views/BlogView.vue') 
  },
  {
    path: '/blog/:id',
    name: 'Article',
    component: () => import('@/views/ArticleView.vue')
  },
  {
    path: '/admin/login',
    name: 'Login',
    component: () => import('@/views/admin/LoginView.vue')
  },
  {
    path: '/admin',
    component: () => import('@/views/admin/AdminLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: 'projects',
        name: 'AdminProjects',
        component: () => import('@/views/ProjectsView.vue') // Reusing for MVP or create dedicated
      },
      {
        path: 'blog',
        name: 'AdminBlog',
        component: () => import('@/views/admin/AdminBlogView.vue')
      },
      {
        path: 'blog/new',
        name: 'AdminBlogNew',
        component: () => import('@/views/admin/BlogPostEditor.vue')
      },
      {
        path: 'blog/edit/:id',
        name: 'AdminBlogEdit',
        component: () => import('@/views/admin/BlogPostEditor.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

// Simple Navigation Guard
import { getAuth } from 'firebase/auth'
router.beforeEach(async (to, _from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  if (requiresAuth) {
    const auth = getAuth()
    await auth.authStateReady() // Wait for auth state to initialize
    const user = auth.currentUser
    if (user) {
      next()
    } else {
      next('/admin/login')
    }
  } else {
    next()
  }
})

export default router
