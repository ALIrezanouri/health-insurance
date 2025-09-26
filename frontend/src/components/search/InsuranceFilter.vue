<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { useSearchStore } from '@/stores/search';
import AppCard from '@/components/base/AppCard.vue';

const { t } = useI18n();
const searchStore = useSearchStore();
</script>

<template>
  <AppCard>
    <h3 class="font-bold mb-3">{{ t('search.filters.insurance.title') }}</h3>
    <!-- A multi-select or checkbox list will go here -->
    <div class="space-y-2">
      <div v-for="company in searchStore.insuranceCompanies" :key="company.id" class="flex items-center">
        <input type="checkbox" :id="`ins-${company.id}`" class="ml-2" />
        <label :for="`ins-${company.id}`">{{ company.name }}</label>
      </div>
    </div>
  </AppCard>
</template>