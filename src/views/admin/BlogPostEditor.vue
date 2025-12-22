<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useBlogStore } from '@/stores/blog'
import Button from '@/components/ui/Button.vue'
import Badge from '@/components/ui/Badge.vue'
import type { BlogPost } from '@/types'

const route = useRoute()
const router = useRouter()
const blogStore = useBlogStore()

const isEditMode = computed(() => route.params.id !== undefined)
const postId = route.params.id as string

const form = ref<Partial<BlogPost>>({
  title: '',
  summary: '',
  content: '',
  category: 'Tech', // Default
  tags: [],
  isPublished: false
})
const tagInput = ref('')
const saving = ref(false)
const error = ref<string | null>(null)

onMounted(async () => {
  if (isEditMode) {
    // If store is empty, fetch. If still empty or not found, maybe invalid ID.
    if (!blogStore.posts.length) {
      await blogStore.fetchPosts()
    }
    const post = blogStore.posts.find(p => p.id === postId)
    if (post) {
      form.value = { ...post }
    } else {
      error.value = 'Post not found'
    }
  }
})

const addTag = () => {
  const tag = tagInput.value.trim()
  if (tag && !form.value.tags?.includes(tag)) {
    form.value.tags = [...(form.value.tags || []), tag]
  }
  tagInput.value = ''
}

const removeTag = (tag: string) => {
  form.value.tags = form.value.tags?.filter(t => t !== tag)
}

const handleSave = async () => {
  saving.value = true
  error.value = null
  try {
    if (isEditMode) {
      await blogStore.updatePost(postId, form.value)
    } else {
      // Generate ID manually or let helper do it? 
      // Current addPost uses passed ID or needs one. 
      // Schema requires ID. Let's generic random ID here if not present.
      const newId = crypto.randomUUID();
      await blogStore.addPost({
        id: newId,
        title: form.value.title!,
        content: form.value.content,
        summary: form.value.summary,
        category: form.value.category,
        tags: form.value.tags,
        isPublished: form.value.isPublished
      } as any)
    }
    router.push('/admin/blog')
  } catch (e: any) {
    error.value = e.message
  } finally {
    saving.value = false
  }
}
</script>

<template>
  <div class="max-w-4xl mx-auto space-y-6">
    <div class="flex items-center justify-between">
      <h2 class="text-2xl font-bold text-white">
        {{ isEditMode ? 'Edit Post' : 'New Post' }}
      </h2>
      <div class="space-x-4">
        <Button variant="ghost" @click="router.back()">Cancel</Button>
        <Button variant="primary" :disabled="saving" @click="handleSave">
          {{ saving ? 'Saving...' : 'Save Post' }}
        </Button>
      </div>
    </div>

    <div v-if="error" class="bg-red-500/10 border border-red-500/50 text-red-500 p-4 rounded-lg">
      {{ error }}
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Main Content -->
      <div class="lg:col-span-2 space-y-6">
        <div>
          <label class="block text-gray-400 text-sm mb-2">Title</label>
          <input 
            v-model="form.title" 
            type="text" 
            class="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-lg font-bold focus:ring-2 focus:ring-primary focus:outline-none"
            placeholder="Post Title"
          />
        </div>

        <div>
          <label class="block text-gray-400 text-sm mb-2">Summary</label>
          <textarea 
            v-model="form.summary" 
            rows="3" 
            class="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-gray-300 focus:ring-2 focus:ring-primary focus:outline-none"
            placeholder="Short description..."
          ></textarea>
        </div>

        <div>
           <label class="block text-gray-400 text-sm mb-2 flex justify-between">
             Content (Markdown)
             <!-- TODO: Add image upload helper -->
           </label>
           <textarea 
             v-model="form.content" 
             rows="20" 
             class="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-gray-300 font-mono text-sm focus:ring-2 focus:ring-primary focus:outline-none"
             placeholder="# Hello World..."
           ></textarea>
        </div>
      </div>

      <!-- Sidebar -->
      <div class="space-y-6">
        <div class="bg-white/5 border border-white/10 rounded-xl p-6 space-y-4">
          <h3 class="text-lg font-bold text-white">Settings</h3>
          
          <!-- Published Toggle -->
          <div class="flex items-center justify-between">
             <span class="text-gray-300">Published</span>
             <button 
               @click="form.isPublished = !form.isPublished"
               class="w-12 h-6 rounded-full relative transition-colors duration-200"
               :class="form.isPublished ? 'bg-primary' : 'bg-gray-700'"
             >
               <span 
                 class="absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform duration-200"
                 :class="form.isPublished ? 'translate-x-6' : 'translate-x-0'"
               ></span>
             </button>
          </div>

          <!-- Category -->
          <div>
            <label class="block text-gray-400 text-sm mb-2">Category</label>
            <select 
              v-model="form.category"
              class="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none"
            >
              <option value="Tech">Tech</option>
              <option value="Flutter">Flutter</option>
              <option value="Vue">Vue</option>
              <option value="Vision AI">Vision AI</option>
              <option value="Life">Life</option>
            </select>
          </div>

          <!-- Tags -->
          <div>
            <label class="block text-gray-400 text-sm mb-2">Tags</label>
            <div class="flex flex-wrap gap-2 mb-2">
              <Badge 
                v-for="tag in form.tags" 
                :key="tag" 
                variant="outline"
                class="cursor-pointer hover:bg-red-500/20 hover:border-red-500"
                @click="removeTag(tag)"
              >
                {{ tag }} &times;
              </Badge>
            </div>
            <input 
              v-model="tagInput" 
              @keydown.enter.prevent="addTag"
              type="text" 
              class="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none"
              placeholder="Add tag + Enter"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
