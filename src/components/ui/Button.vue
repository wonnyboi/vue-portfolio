<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'flutter' | 'vue' | 'vision'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  block?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  disabled: false,
  block: false
})

const classes = computed(() => {
  const base = 'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'
  
  const variants = {
    primary: 'bg-white text-primary hover:bg-gray-100 focus:ring-white',
    secondary: 'bg-secondary text-white hover:bg-gray-700 focus:ring-gray-500',
    outline: 'border border-gray-600 text-gray-300 hover:border-white hover:text-white',
    ghost: 'text-gray-300 hover:text-white hover:bg-white/10',
    flutter: 'bg-flutter text-white hover:brightness-110 shadow-lg shadow-flutter/20',
    vue: 'bg-vue text-white hover:brightness-110 shadow-lg shadow-vue/20',
    vision: 'bg-vision text-white hover:brightness-110 shadow-lg shadow-vision/20'
  }
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  }
  
  return [
    base,
    variants[props.variant],
    sizes[props.size],
    props.block ? 'w-full' : '',
    'active:scale-95'
  ].join(' ')
})
</script>

<template>
  <button :class="classes" :disabled="disabled">
    <slot />
  </button>
</template>
