<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import Button from '@/core/components/ui/Button.vue'
import Card from '@/core/components/ui/Card.vue'
import profileImage from '@/assets/hero-profile.jpg'
import { useRouter } from 'vue-router'

const router = useRouter()

const roles = [
  'Flutter Expert',
  'Vue.js Developer',
  'Vision AI Engineer', 
  'Problem Solver'
]

const currentRole = ref('')
const roleIndex = ref(0)
const charIndex = ref(0)
const isDeleting = ref(false)
const typingSpeed = ref(100)

let timeoutId: any = null;

const typeRole = () => {
  const currentFullRole = roles[roleIndex.value] || ''
  
  if (isDeleting.value) {
    currentRole.value = currentFullRole.substring(0, charIndex.value - 1)
    charIndex.value--
    typingSpeed.value = 50
  } else {
    currentRole.value = currentFullRole.substring(0, charIndex.value + 1)
    charIndex.value++
    typingSpeed.value = 100
  }

  if (!isDeleting.value && charIndex.value === currentFullRole.length) {
    isDeleting.value = true
    typingSpeed.value = 2000 // Pause at end
  } else if (isDeleting.value && charIndex.value === 0) {
    isDeleting.value = false
    roleIndex.value = (roleIndex.value + 1) % roles.length
    typingSpeed.value = 500 // Pause before typing new
  }

  timeoutId = setTimeout(typeRole, typingSpeed.value)
}

// Optimization: Use a smaller set of active particles
interface Particle {
  id: number;
  text: string;
  x: number;
  y: number;
  rotation: number;
  style: any;
}

const particles = ref<Particle[]>([])
const particleIdCounter = ref(0)
let particleInterval: any = null

const keywords = [
  'Flutter', 'Vue.js', 'Firebase', 'Dart', 'TypeScript', 'Python',
  'OpenCV', 'YOLO', 'TensorFlow', 'Pinia', 'State Management',
  'Clean Architecture', 'MVVM', 'Deep Learning', 'REST API',
  'GraphQL', 'PostgreSQL', 'Git', 'CI/CD', 'UI/UX'
]

const spawnParticle = () => {
  // Spawn 1-2 particles
  const count = Math.floor(Math.random() * 2) + 1
  
  for (let i = 0; i < count; i++) {
    const text = keywords[Math.floor(Math.random() * keywords.length)] || ''
    const angle = Math.random() * Math.PI * 2
    // Move slightly varied distance
    const distance = 180 + Math.random() * 60 
    
    // Start from center (0,0 relative to container center)
    // End position calculations
    const endX = Math.cos(angle) * distance
    const endY = Math.sin(angle) * distance
    
    const duration = 3 + Math.random() * 2 // 3-5 seconds
    
    particles.value.push({
      id: particleIdCounter.value++,
      text,
      x: 0,
      y: 0,
      rotation: (Math.random() - 0.5) * 30, // Slight random rotation
      style: {
        '--end-x': `${endX}px`,
        '--end-y': `${endY}px`,
        '--duration': `${duration}s`
      }
    })

    // Cleanup old particles to prevent memory leaks (keep max 20)
    if (particles.value.length > 20) {
      particles.value.shift()
    }
  }
}

onMounted(() => {
  timeoutId = setTimeout(typeRole, 1000)
  // Spawn particles every 2 seconds
  particleInterval = setInterval(spawnParticle, 1500)
})

onUnmounted(() => {
  if (timeoutId) clearTimeout(timeoutId)
  if (particleInterval) clearInterval(particleInterval)
})

const techStacks = [
  {
    name: 'Flutter',
    description: '아름다운 UI와 퍼포먼스를 겸비한 크로스 플랫폼 앱 개발.',
    class: 'border-flutter/30 hover:border-flutter/60 bg-gradient-to-br from-flutter/10 to-transparent',
    iconColor: 'text-flutter',
    button: 'flutter' as const
  },
  {
    name: 'Vue.js',
    description: 'Composition API를 활용한 반응형 웹 애플리케이션 구축.',
    class: 'border-vue/30 hover:border-vue/60 bg-gradient-to-br from-vue/10 to-transparent',
    iconColor: 'text-vue',
    button: 'vue' as const
  },
  {
    name: 'Vision AI',
    description: 'Python & OpenCV 기반의 지능형 컴퓨터 비전 솔루션.',
    class: 'border-vision/30 hover:border-vision/60 bg-gradient-to-br from-vision/10 to-transparent',
    iconColor: 'text-vision',
    button: 'vision' as const
  }
]
</script>

<template>
  <div class="pt-16 min-h-screen">
    <!-- Hero Section -->
    <section class="relative overflow-hidden py-12 md:py-24">
      <!-- Background Glow -->
      <div class="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] bg-flutter/20 rounded-full blur-[120px] pointer-events-none mix-blend-screen animate-pulse"></div>
      <div class="absolute top-0 left-0 w-[400px] h-[400px] bg-vision/10 rounded-full blur-[100px] pointer-events-none mix-blend-screen"></div>

      <div class="container mx-auto px-4 relative z-10">
        <div class="flex flex-col-reverse md:flex-row items-center gap-12">
          
          <!-- Left Content -->
          <div class="flex-1 text-center md:text-left">
            <div class="inline-flex items-center px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
              <span class="w-2 h-2 rounded-full bg-green-400 mr-2 animate-pulse"></span>
              <span class="text-sm text-gray-300">새로운 프로젝트를 찾고 있습니다</span>
            </div>
            
            <h1 class="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6 leading-tight">
              안녕하세요,<br/>
              <span class="text-transparent bg-clip-text bg-gradient-to-r from-flutter to-vision">정휘원</span>입니다.
            </h1>

            <div class="h-8 mb-6">
               <span class="text-xl md:text-2xl text-primary-300 font-mono border-r-2 border-white pr-1 animate-pulse">
                {{ currentRole }}
               </span>
            </div>
            
            <p class="text-lg text-gray-400 max-w-2xl mb-8 leading-relaxed">
              사용자 경험과 인공지능 기술의 접점을 탐구합니다.<br class="hidden md:block"/>
              <span class="text-flutter font-semibold">Flutter</span>의 유려함, 
              <span class="text-vue font-semibold">Vue.js</span>의 효율성, 그리고 
              <span class="text-vision font-semibold">AI</span>의 지능을 결합하여 가치를 창출합니다.
            </p>

            <div class="flex flex-col sm:flex-row items-center md:justify-start justify-center gap-4">
              <Button variant="primary" size="lg" @click="router.push('/projects')">프로젝트 보기</Button>
              <Button variant="outline" size="lg" @click="router.push('/blog')">기술 블로그</Button>
            </div>
          </div>

          <!-- Right Image -->
          <div class="flex-1 flex justify-center md:justify-end relative">
             <div class="relative w-64 h-64 md:w-96 md:h-96 flex items-center justify-center">
                <!-- Decorative Circles -->
                <div class="absolute inset-0 border-2 border-dashed border-white/10 rounded-full animate-[spin_10s_linear_infinite]"></div>
                <div class="absolute -inset-4 border border-white/5 rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>
                
                <!-- Main Image -->
                <div class="absolute inset-2 rounded-full overflow-hidden border-4 border-white/10 shadow-2xl backdrop-blur-sm z-10">
                   <img :src="profileImage" alt="Jeong Hwi-won" class="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                </div>

                <!-- Particle Emitter Container -->
                <div class="absolute inset-0 pointer-events-none z-0">
                  <transition-group name="particle">
                    <div 
                      v-for="p in particles" 
                      :key="p.id"
                      class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-sm font-bold text-gray-300/80 bg-black/40 backdrop-blur-sm px-2 py-1 rounded border border-white/5"
                      :style="p.style"
                    >
                      {{ p.text }}
                    </div>
                  </transition-group>
                </div>
             </div>
          </div>

        </div>
      </div>
    </section>

    <!-- Tech Stack Section -->
    <section class="py-20 bg-black/20">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-white mb-16 text-center">핵심 기술 (Core Technologies)</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card 
            v-for="tech in techStacks" 
            :key="tech.name" 
            class="group hover:-translate-y-2 transition-transform duration-300"
            :class="[tech.class]"
          >
            <div class="h-12 w-12 rounded-lg bg-white/10 flex items-center justify-center mb-6 text-2xl group-hover:scale-110 transition-transform">
              <span :class="tech.iconColor" class="font-bold">{{ tech.name[0] }}</span>
            </div>
            <h3 class="text-xl font-bold text-white mb-3">{{ tech.name }}</h3>
            <p class="text-gray-400 mb-6 word-keep-all">{{ tech.description }}</p>
            <Button :variant="tech.button" size="sm" class="w-full">자세히 보기</Button>
          </Card>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
@keyframes float-out {
  0% {
    transform: translate(-50%, -50%) scale(0.5);
    opacity: 0;
  }
  20% {
    opacity: 1;
  }
  80% {
    opacity: 1;
    transform: translate(calc(-50% + var(--end-x)), calc(-50% + var(--end-y))) scale(1);
  }
  100% {
    opacity: 0;
    transform: translate(calc(-50% + var(--end-x) * 1.2), calc(-50% + var(--end-y) * 1.2)) scale(1.1);
  }
}

.particle-enter-active {
  animation: float-out var(--duration) ease-out forwards;
}

.particle-leave-active {
  transition: opacity 0.5s;
}
.particle-leave-to {
  opacity: 0;
}

.word-keep-all {
  word-break: keep-all;
}
</style>
