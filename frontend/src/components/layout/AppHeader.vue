<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>

<template>
  <header class="border-b">
    <div class="container mx-auto px-4 py-4">
      <div class="flex justify-between items-center">
        <h1 class="text-xl font-bold">{{ t('header.title') }}</h1>
        <nav class="hidden md:flex space-x-4">
          <router-link to="/" class="hover:text-primary">{{ t('header.nav.home') }}</router-link>
          <router-link to="/search" class="hover:text-primary">{{ t('header.nav.search') }}</router-link>
          <router-link to="/about" class="hover:text-primary">{{ t('header.nav.about') }}</router-link>
        </nav>
        <div class="md:hidden">
          <button class="p-2">
            <i class="fas fa-bars"></i>
          </button>
        </div>
      </div>
    </div>
  </header>
</template>