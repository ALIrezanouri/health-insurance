<template>
  <header class="sticky top-0 z-50 w-full border-b bg-white">
    <div class="container flex h-16 items-center justify-between px-4">
      <div class="flex items-center gap-6">
        <RouterLink to="/" class="flex items-center gap-2">
          <h1 class="text-xl font-bold">هاب بیمه‌های درمانی</h1>
        </RouterLink>
        <nav class="hidden md:flex items-center gap-4">
          <RouterLink 
            to="/" 
            class="text-sm font-medium text-gray-600 hover:text-gray-900"
            active-class="text-blue-500"
          >
            صفحه اصلی
          </RouterLink>
          <RouterLink 
            to="/search" 
            class="text-sm font-medium text-gray-600 hover:text-gray-900"
            active-class="text-blue-500"
          >
            جستجوی مراکز
          </RouterLink>
        </nav>
      </div>
      <div class="flex items-center gap-2">
        <button class="md:hidden p-2">
          <i class="fas fa-bars"></i>
        </button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>