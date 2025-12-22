<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useBlogStore } from '@/stores/blog'
import Button from '@/components/ui/Button.vue'
import Badge from '@/components/ui/Badge.vue'

const router = useRouter()
const blogStore = useBlogStore()
const deleting = ref<string | null>(null)

onMounted(() => {
  blogStore.fetchPosts()
})

const handleEdit = (id: string) => {
  router.push(`/admin/blog/edit/${id}`)
}

const handleDelete = async (id: string) => {
  if (!confirm('Are you sure you want to delete this post?')) return
  
  deleting.value = id
  try {
    await blogStore.removePost(id)
  } catch (e: any) {
    alert('Failed to delete: ' + e.message)
  } finally {
    deleting.value = null
  }
}

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' }).format(date)
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <h2 class="text-2xl font-bold text-white">Manage Blog Posts</h2>
      <Button variant="primary" size="sm" @click="router.push('/admin/blog/new')">
        + New Post
      </Button>
    </div>

    <!-- Loading State -->
    <div v-if="blogStore.loading && !blogStore.posts.length" class="text-white">Loading...</div>

    <!-- Table -->
    <div v-else class="bg-white/5 border border-white/10 rounded-xl overflow-hidden backdrop-blur-md">
      <table class="w-full text-left">
        <thead class="bg-black/20 text-gray-400 uppercase text-xs">
          <tr>
            <th class="px-6 py-3">Title</th>
            <th class="px-6 py-3">Category</th>
            <th class="px-6 py-3">Published</th>
            <th class="px-6 py-3">Date</th>
            <th class="px-6 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-white/5">
          <tr v-for="post in blogStore.posts" :key="post.id" class="hover:bg-white/5 transition-colors">
            <td class="px-6 py-4 text-white font-medium">{{ post.title }}</td>
            <td class="px-6 py-4">
              <Badge variant="outline">{{ post.category }}</Badge>
            </td>
            <td class="px-6 py-4">
              <span :class="post.isPublished ? 'text-green-400' : 'text-gray-500'">
                {{ post.isPublished ? 'Published' : 'Draft' }}
              </span>
            </td>
            <td class="px-6 py-4 text-gray-400 text-sm">
              {{ formatDate(post.createdAt as Date) }}
            </td>
            <td class="px-6 py-4 text-right space-x-2">
              <Button variant="ghost" size="sm" @click="handleEdit(post.id)">Edit</Button>
              <Button 
                variant="ghost" 
                size="sm" 
                class="text-red-400 hover:text-red-300" 
                :disabled="deleting === post.id"
                @click="handleDelete(post.id)"
              >
                {{ deleting === post.id ? 'Deleting...' : 'Delete' }}
              </Button>
            </td>
          </tr>
        </tbody>
      </table>
      
      <div v-if="!blogStore.posts.length && !blogStore.loading" class="p-8 text-center text-gray-500">
        No posts found. Create your first one!
      </div>
    </div>
  </div>
</template>
