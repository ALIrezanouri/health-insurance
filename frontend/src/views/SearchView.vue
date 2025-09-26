<script setup lang="ts">
import { onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { useSearchStore } from '@/stores/search';
import InsuranceFilter from '@/components/search/InsuranceFilter.vue';
import ServiceFilter from '@/components/search/ServiceFilter.vue';
import LocationSearch from '@/components/search/LocationSearch.vue';
import ResultsList from '@/components/search/ResultsList.vue';
import AppHeader from '@/components/layout/AppHeader.vue';

const { t } = useI18n();
const searchStore = useSearchStore();

onMounted(() => {
  searchStore.fetchInsuranceCompanies();
});
</script>

<template>
  <div class="min-h-screen bg-gradient-bg">
    <AppHeader />

    <main class="container mx-auto px-4 py-6">
      <div class="text-center mb-8 animate-fade-in">
        <h1 class="text-2xl md:text-3xl font-bold mb-2">{{ t('search.title') }}</h1>
        <p class="text-muted-foreground max-w-2xl mx-auto">
          {{ t('search.description') }}
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <!-- Filters (Hidden on mobile, shown as drawer on mobile) -->
        <div class="lg:col-span-1 space-y-6">
          <InsuranceFilter />
          <ServiceFilter />
          <LocationSearch />
        </div>

        <!-- Results -->
        <div class="lg:col-span-3">
          <ResultsList />
        </div>
      </div>
    </main>

    <!-- Mobile Bottom Navigation -->
    <nav v-if="$route.name !== 'search'" class="mobile-bottom-nav lg:hidden">
      <div class="flex justify-around">
        <router-link
          to="/"
          class="flex flex-col items-center text-muted-foreground hover:text-foreground"
        >
          <i class="fas fa-home text-xl mb-1"></i>
          <span class="text-xs">{{ t('header.nav.home') }}</span>
        </router-link>
        <router-link
          to="/search"
          class="flex flex-col items-center text-primary"
        >
          <i class="fas fa-search text-xl mb-1"></i>
          <span class="text-xs font-medium">{{ t('header.nav.search') }}</span>
        </router-link>
        <router-link
          to="/about"
          class="flex flex-col items-center text-muted-foreground hover:text-foreground"
        >
          <i class="fas fa-info-circle text-xl mb-1"></i>
          <span class="text-xs">{{ t('header.nav.about') }}</span>
        </router-link>
      </div>
    </nav>
  </div>
</template>