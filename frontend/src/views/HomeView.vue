<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import AppHeader from '@/components/layout/AppHeader.vue';
import AppButton from '@/components/base/AppButton.vue';

const { t } = useI18n();
</script>

<template>
  <div class="min-h-screen flex flex-col bg-gradient-bg">
    <AppHeader />
    <main class="flex-grow flex items-center justify-center">
      <div class="text-center p-8">
        <h1 class="text-4xl md:text-5xl font-bold mb-4 animate-slide-up">
          {{ t('header.title') }}
        </h1>
        <p class="text-lg text-muted-foreground mb-8 max-w-xl mx-auto animate-slide-up" style="animation-delay: 0.2s;">
          {{ t('search.description') }}
        </p>
        <router-link to="/search" class="animate-slide-up" style="animation-delay: 0.4s;">
          <AppButton size="lg" class="bg-primary text-primary-foreground hover:bg-primary/90">
            {{ t('search.title') }}
          </AppButton>
        </router-link>
      </div>
    </main>
  </div>
</template>