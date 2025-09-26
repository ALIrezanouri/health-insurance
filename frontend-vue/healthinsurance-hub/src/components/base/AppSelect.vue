<template>
  <select
    :class="[
      'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      'disabled:cursor-not-allowed disabled:opacity-50',
      $attrs.class
    ]"
  >
    <slot />
  </select>
</template>

<script setup lang="ts">
// Select component with proper styling
</script>