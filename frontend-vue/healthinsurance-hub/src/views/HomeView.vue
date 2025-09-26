<template>
  <div class="min-h-screen gradient-bg">
    <header class="sticky top-0 z-50 w-full border-b bg-white">
      <div class="container flex h-16 items-center justify-between px-4">
        <div class="flex items-center gap-6">
          <RouterLink to="/" class="flex items-center gap-2">
            <h1 class="text-xl font-bold">هاب بیمه‌های درمانی</h1>
          </RouterLink>
          <nav class="hidden md:flex items-center gap-4">
            <RouterLink 
              to="/" 
              class="text-sm font-medium text-blue-500"
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
    
    <main class="container mx-auto px-4 py-8">
      <div class="text-center mb-12">
        <h1 class="text-3xl md:text-4xl font-bold mb-4">هاب بیمه‌های درمانی</h1>
        <p class="text-gray-600 max-w-2xl mx-auto text-lg">
          مراکز درمانی معتبر که با بیمه شما قرارداد دارند را پیدا کنید
        </p>
      </div>
      
      <div class="max-w-4xl mx-auto">
        <div class="bg-white rounded-xl shadow-sm p-8 mb-8">
          <h2 class="text-2xl font-bold mb-6 text-center">جستجوی مراکز درمانی</h2>
          <div class="grid md:grid-cols-3 gap-6">
            <div class="text-center">
              <div class="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span class="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 class="text-lg font-semibold mb-2">بیمه‌های مورد نظر</h3>
              <p class="text-gray-600">
                انتخاب بیمه‌ها
              </p>
            </div>
            <div class="text-center">
              <div class="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span class="text-2xl font-bold text-blue-600">2</span>
              </div>
              <h3 class="text-lg font-semibold mb-2">انواع خدمات</h3>
              <p class="text-gray-600">
                انتخاب خدمات
              </p>
            </div>
            <div class="text-center">
              <div class="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span class="text-2xl font-bold text-blue-600">3</span>
              </div>
              <h3 class="text-lg font-semibold mb-2">جهت‌یابی</h3>
              <p class="text-gray-600">
                بیمه‌های پذیرفته شده
              </p>
            </div>
          </div>
        </div>
        
        <div class="text-center">
          <router-link 
            to="/search" 
            class="inline-block px-6 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors"
          >
            جستجوی مراکز
          </router-link>
        </div>
      </div>
    </main>
    
    <nav class="mobile-bottom-nav lg:hidden">
      <div class="flex justify-around">
        <router-link 
          to="/" 
          class="flex flex-col items-center text-blue-500"
        >
          <i class="fas fa-home text-xl mb-1"></i>
          <span class="text-xs">صفحه اصلی</span>
        </router-link>
        <router-link 
          to="/search" 
          class="flex flex-col items-center text-gray-500 hover:text-gray-900"
        >
          <i class="fas fa-search text-xl mb-1"></i>
          <span class="text-xs">جستجوی مراکز</span>
        </router-link>
        <router-link 
          to="/about" 
          class="flex flex-col items-center text-gray-500 hover:text-gray-900"
        >
          <i class="fas fa-info-circle text-xl mb-1"></i>
          <span class="text-xs">درباره ما</span>
        </router-link>
      </div>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>