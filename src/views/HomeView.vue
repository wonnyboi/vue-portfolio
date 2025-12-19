<script setup lang="ts">
import Button from '@/components/ui/Button.vue'
import Card from '@/components/ui/Card.vue'

const techStacks = [
  {
    name: 'Flutter',
    description: 'Building cross-platform native experiences with beautiful UI.',
    class: 'border-flutter/30 hover:border-flutter/60 bg-gradient-to-br from-flutter/10 to-transparent',
    iconColor: 'text-flutter',
    button: 'flutter' as const
  },
  {
    name: 'Vue.js',
    description: 'Crafting reactive and performant web applications with Composition API.',
    class: 'border-vue/30 hover:border-vue/60 bg-gradient-to-br from-vue/10 to-transparent',
    iconColor: 'text-vue',
    button: 'vue' as const
  },
  {
    name: 'Vision AI',
    description: 'Implementing Computer Vision models with Python & OpenCV.',
    class: 'border-vision/30 hover:border-vision/60 bg-gradient-to-br from-vision/10 to-transparent',
    iconColor: 'text-vision',
    button: 'vision' as const
  }
]
</script>

<template>
  <div class="pt-16 min-h-screen">
    <!-- Hero Section -->
    <section class="relative overflow-hidden py-24 sm:py-32">
      <!-- Background Glow -->
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-flutter/20 rounded-full blur-[120px] pointer-events-none mix-blend-screen animate-float"></div>
      <div class="absolute top-1/3 left-1/3 w-[400px] h-[400px] bg-vision/20 rounded-full blur-[100px] pointer-events-none mix-blend-screen animate-float" style="animation-delay: -2s;"></div>

      <div class="container mx-auto px-4 relative z-10 text-center">
        <div class="inline-flex items-center px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-sm">
          <span class="w-2 h-2 rounded-full bg-vue mr-2 animate-pulse"></span>
          <span class="text-sm text-gray-300">Open for new opportunities</span>
        </div>
        
        <h1 class="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6">
          Architecting <span class="text-transparent bg-clip-text bg-gradient-to-r from-flutter to-vision">Intelligence</span>
          <br />
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-vue to-flutter">Visualizing Data</span>
        </h1>
        
        <p class="mt-6 text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
          I bridge the gap between AI models and user experience. 
          Specializing in 
          <span class="text-flutter font-semibold">Flutter</span> for mobile, 
          <span class="text-vue font-semibold">Vue.js</span> for web, and 
          <span class="text-vision font-semibold">Computer Vision</span> for intelligence.
        </p>

        <div class="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button variant="primary" size="lg">Explore Projects</Button>
          <Button variant="outline" size="lg">Read Technical Blog</Button>
        </div>
      </div>
    </section>

    <!-- Tech Stack Section -->
    <section class="py-20 bg-black/20">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-white mb-16 text-center">Core Technologies</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card 
            v-for="tech in techStacks" 
            :key="tech.name" 
            class="group hover:-translate-y-2 transition-transform duration-300"
            :class="[tech.class]"
          >
            <div class="h-12 w-12 rounded-lg bg-white/10 flex items-center justify-center mb-6 text-2xl group-hover:scale-110 transition-transform">
              <!-- Icons would go here, using first letter for now -->
              <span :class="tech.iconColor" class="font-bold">{{ tech.name[0] }}</span>
            </div>
            <h3 class="text-xl font-bold text-white mb-3">{{ tech.name }}</h3>
            <p class="text-gray-400 mb-6">{{ tech.description }}</p>
            <Button :variant="tech.button" size="sm" class="w-full">View Projects</Button>
          </Card>
        </div>
      </div>
    </section>

    <!-- Recent Projects Preview -->
    <section class="py-20">
      <div class="container mx-auto px-4">
        <div class="flex items-end justify-between mb-12">
          <div>
            <h2 class="text-3xl font-bold text-white mb-2">Selected Works</h2>
            <p class="text-gray-400">Recent applications and experiments.</p>
          </div>
          <Button variant="ghost" class="hidden sm:inline-flex group">
            View All 
            <span class="ml-2 group-hover:translate-x-1 transition-transform">→</span>
          </Button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <!-- Placeholder Cards to simulate content -->
          <Card v-for="i in 3" :key="i" class="group cursor-pointer">
            <div class="aspect-video rounded-lg bg-gray-800 mb-4 overflow-hidden relative">
              <div class="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60"></div>
              <div class="absolute bottom-4 left-4">
                <span class="px-2 py-1 rounded bg-vision/20 text-vision text-xs font-medium border border-vision/30 backdrop-blur-sm">
                  Vision AI
                </span>
              </div>
            </div>
            <h3 class="text-lg font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">
              Project Title {{ i }}
            </h3>
            <p class="text-sm text-gray-400 line-clamp-2">
              A brief description of the project goes here. It involves sophisticated AI models and real-time processing.
            </p>
          </Card>
        </div>
      </div>
    </section>
  </div>
</template>
