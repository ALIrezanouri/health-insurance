<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import AppHeader from '@/components/layout/AppHeader.vue';

const { t } = useI18n();
</script>

<template>
  <div class="min-h-screen bg-gradient-bg">
    <AppHeader />
    <main class="container mx-auto px-4 py-6">
      <div class="text-center mb-8 animate-fade-in">
        <h1 class="text-2xl md:text-3xl font-bold mb-2">{{ t('header.nav.about') }}</h1>
        <p class="text-muted-foreground max-w-2xl mx-auto">
          This is the about page for the HealthInsurance Hub.
        </p>
      </div>
    </main>
  </div>
</template>