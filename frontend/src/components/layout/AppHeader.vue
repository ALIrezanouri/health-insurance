<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { useBackendStatus } from '@/composables/useBackendStatus';

const { t } = useI18n();
const { isBackendOnline, isLoading } = useBackendStatus();
</script>

<template>
  <header class="border-b">
    <div class="container mx-auto px-4 py-4">
      <div class="flex justify-between items-center">
        <h1 class="text-xl font-bold">{{ t('header.title') }}</h1>
        
        <!-- Status indicator -->
        <div class="flex items-center">
          <div 
            v-if="!isLoading" 
            class="w-3 h-3 rounded-full mr-2"
            :class="isBackendOnline ? 'bg-green-500' : 'bg-red-500'"
            :title="isBackendOnline ? 'Backend is online' : 'Backend is offline'"
          ></div>
          <div 
            v-else 
            class="w-3 h-3 rounded-full mr-2 bg-yellow-500"
            title="Checking backend status..."
          ></div>
          
          <nav class="hidden md:flex space-x-4">
            <router-link to="/" class="hover:text-primary">{{ t('header.nav.home') }}</router-link>
            <router-link to="/search" class="hover:text-primary">{{ t('header.nav.search') }}</router-link>
            <router-link to="/about" class="hover:text-primary">{{ t('header.nav.about') }}</router-link>
          </nav>
        </div>
        
        <div class="md:hidden">
          <button class="p-2">
            <i class="fas fa-bars"></i>
          </button>
        </div>
      </div>
    </div>
  </header>
</template>