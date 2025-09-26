<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { useGeolocation } from '@/composables/useGeolocation';
import AppCard from '@/components/base/AppCard.vue';
import AppInput from '@/components/base/AppInput.vue';
import AppButton from '@/components/base/AppButton.vue';

const { t } = useI18n();
const { getCurrentPosition, loading, error } = useGeolocation();
</script>

<template>
  <AppCard>
    <h3 class="font-bold mb-3">{{ t('search.filters.location.title') }}</h3>
    <div class="space-y-3">
      <AppButton @click="getCurrentPosition" :disabled="loading" class="w-full">
        {{ loading ? t('common.loading') : t('search.filters.location.useCurrent') }}
      </AppButton>
      <p v-if="error" class="text-destructive text-sm">{{ error }}</p>

      <AppInput :placeholder="t('search.filters.location.searchPlaceholder')" />

      <div>
        <label for="radius" class="block text-sm font-medium text-muted-foreground mb-1">
          {{ t('search.filters.location.radius') }}
        </label>
        <AppInput id="radius" type="range" min="1" max="50" value="10" />
      </div>
    </div>
  </AppCard>
</template>