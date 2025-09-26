<template>
  <div :class="['inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2', variantClasses]">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default'
})

const variantClasses = computed(() => {
  switch (props.variant) {
    case 'default':
      return 'border-transparent bg-primary text-primary-foreground'
    case 'secondary':
      return 'border-transparent bg-secondary text-secondary-foreground'
    case 'destructive':
      return 'border-transparent bg-destructive text-destructive-foreground'
    case 'outline':
      return 'text-foreground'
    default:
      return 'border-transparent bg-primary text-primary-foreground'
  }
})
</script>