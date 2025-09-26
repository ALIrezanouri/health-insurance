<script setup lang="ts">
withDefaults(defineProps<{
  variant?: 'default' | 'secondary' | 'destructive' | 'outline'
}>(), {
  variant: 'default'
})
</script>

<template>
  <div class="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2" 
       :class="{
         'bg-secondary text-secondary-foreground border-transparent': variant === 'secondary',
         'bg-destructive text-destructive-foreground border-transparent': variant === 'destructive',
         'bg-transparent border-border': variant === 'outline'
       }">
    <slot></slot>
  </div>
</template>