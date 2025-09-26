<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>

<template>
  <header class="bg-background/80 backdrop-blur-sm sticky top-0 z-50 border-b border-border">
    <nav class="container mx-auto px-4 py-3 flex justify-between items-center">
      <div class="font-bold text-lg">
        <router-link to="/">{{ t('header.title') }}</router-link>
      </div>
      <div class="hidden md:flex items-center space-x-6">
        <router-link to="/" class="hover:text-primary">{{ t('header.nav.home') }}</router-link>
        <router-link to="/search" class="hover:text-primary">{{ t('header.nav.search') }}</router-link>
        <router-link to="/about" class="hover:text-primary">{{ t('header.nav.about') }}</router-link>
      </div>
    </nav>
  </header>
</template>