import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { BlogPost } from '@/types'
import { getDataConnect } from 'firebase/data-connect'
import { auth } from '@/firebase' // We need app, but auth.app is accessible
import { 
  listBlogPosts, 
  createBlogPost, 
  updateBlogPost, 
  deleteBlogPost, 
  connectorConfig 
} from '@/dataconnect-generated/esm/index.esm.js'

export const useBlogStore = defineStore('blog', () => {
  const posts = ref<BlogPost[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Initialize Data Connect
  const dc = getDataConnect(auth.app, connectorConfig as any);

  async function fetchPosts() {
    loading.value = true
    try {
      const result = await listBlogPosts(dc);
      // Map result to BlogPost and sort
      posts.value = result.data.blogPosts
        .map((p: any) => ({
            ...p,
            createdAt: new Date(p.createdAt), // Ensure Date object
            updatedAt: p.updatedAt ? new Date(p.updatedAt) : new Date(p.createdAt)
        }))
        .sort((a: any, b: any) => {
          return b.createdAt.getTime() - a.createdAt.getTime()
        })
    } catch (e: any) {
      console.error('Fetch posts failed:', e)
      error.value = e.message
    } finally {
      loading.value = false
    }
  }

  async function addPost(post: Omit<BlogPost, 'createdAt' | 'updatedAt'>) {
    loading.value = true
    try {
      const now = new Date().toISOString();
      await createBlogPost(dc, {
        ...post,
        isPublished: post.isPublished ?? false,
        createdAt: now,
        updatedAt: now
      });
      await fetchPosts();
    } catch (e: any) {
      error.value = e.message;
      throw e;
    } finally {
      loading.value = false;
    }
  }

  async function updatePost(id: string, data: Partial<BlogPost>) {
    loading.value = true;
    try {
      // Note: Currently mutation only supports content update.
      // Need to expand mutation if other fields update is required.
      await updateBlogPost(dc, {
        id,
        content: data.content,
        updatedAt: new Date().toISOString()
      });
      await fetchPosts();
    } catch (e: any) {
      error.value = e.message;
      throw e;
    } finally {
      loading.value = false;
    }
  }

  async function removePost(id: string) {
    loading.value = true;
    try {
        await deleteBlogPost(dc, { id });
        await fetchPosts();
    } catch (e: any) {
        error.value = e.message;
        throw e;
    } finally {
        loading.value = false;
    }
  }

  return { posts, loading, error, fetchPosts, addPost, updatePost, removePost }
})
