<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  variant?: 'default' | 'secondary' | 'outline' | 'destructive' | 'success' | 'warning'
}>()

const variants = {
  default: 'bg-primary-500 text-white',
  secondary: 'bg-gray-100 text-gray-900',
  outline: 'border border-gray-200 text-gray-900',
  destructive: 'bg-red-500 text-white',
  success: 'bg-green-500 text-white',
  warning: 'bg-yellow-500 text-white'
}

const variantClass = computed(() => variants[props.variant || 'default'])
</script>

<template>
  <span :class="['inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium', variantClass]">
    <slot />
  </span>
</template>
