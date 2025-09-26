<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import AppCard from '@/components/base/AppCard.vue';

const { t } = useI18n();
const services = [
  'dentistry',
  'imaging',
  'lab',
  'general',
  'specialist'
];
</script>

<template>
  <AppCard>
    <h3 class="font-bold mb-3">{{ t('search.filters.services.title') }}</h3>
    <div class="space-y-2">
      <div v-for="service in services" :key="service" class="flex items-center">
        <input type="checkbox" :id="`svc-${service}`" class="ml-2" />
        <label :for="`svc-${service}`">{{ t(`search.filters.services.options.${service}`) }}</label>
      </div>
    </div>
  </AppCard>
</template>