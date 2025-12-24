<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  hover?: boolean
  padding?: string
}

const props = withDefaults(defineProps<Props>(), {
  hover: true,
  padding: 'p-6'
})

const classes = computed(() => {
  return [
    'rounded-xl border border-white/10 backdrop-blur-md bg-white/5 overflow-hidden transition-all duration-300',
    props.hover ? 'hover:border-white/20 hover:bg-white/10 hover:shadow-xl hover:-translate-y-1' : '',
    props.padding
  ].join(' ')
})
</script>

<template>
  <div :class="classes">
    <slot />
  </div>
</template>
