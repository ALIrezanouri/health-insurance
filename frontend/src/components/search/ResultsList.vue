<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { useSearchStore } from '@/stores/search';
import AppCard from '@/components/base/AppCard.vue';
import AppButton from '@/components/base/AppButton.vue';
import Badge from '@/components/ui/Badge.vue';
import Skeleton from '@/components/ui/Skeleton.vue';

const { t } = useI18n();
const searchStore = useSearchStore();

onMounted(() => {
  searchStore.searchCenters();
});

const loading = computed(() => searchStore.loading);
const centers = computed(() => searchStore.filteredCenters);
const error = computed(() => searchStore.error);
</script>

<template>
  <div>
    <div v-if="error" class="text-center py-8">
      <div class="text-destructive mb-4">
        <i class="fas fa-exclamation-triangle text-2xl mb-2"></i>
        <h3 class="text-xl font-semibold">{{ t('common.error') }}</h3>
        <p class="mt-2">{{ error }}</p>
      </div>
      <AppButton @click="searchStore.searchCenters()" class="mt-4">
        <i class="fas fa-redo mr-2"></i>
        {{ t('common.retry') }}
      </AppButton>
    </div>
    
    <div v-else-if="loading" class="space-y-5">
      <AppCard v-for="n in 5" :key="n" class="glass-card animate-slide-up">
        <div class="grid md:grid-cols-[1fr_auto] gap-4">
          <div>
            <div class="h-6 bg-muted rounded w-3/4 mb-2"></div>
            <div class="h-4 bg-muted rounded w-full mb-4"></div>
            
            <div class="flex flex-wrap gap-2 mb-4">
              <div v-for="i in 2" :key="i" class="h-6 bg-muted rounded w-24"></div>
            </div>
            
            <div class="h-4 bg-muted rounded w-1/2"></div>
          </div>
          
          <div class="flex items-center">
            <div class="h-10 bg-muted rounded w-full"></div>
          </div>
        </div>
      </AppCard>
    </div>
    
    <div v-else-if="centers.length === 0" class="text-center py-12">
      <h3 class="text-xl font-semibold mb-2">{{ t('search.results.noResults') }}</h3>
      <p class="text-muted-foreground">
        {{ t('search.results.noResultsDescription') }}
      </p>
    </div>
    
    <div v-else class="space-y-5">
      <AppCard 
        v-for="(center, index) in centers" 
        :key="center.id" 
        class="glass-card overflow-hidden animate-slide-up"
        :style="{ animationDelay: `${index * 0.1}s` }"
      >
        <div class="grid md:grid-cols-[1fr_auto] gap-4">
          <div>
            <h3 class="text-lg font-bold mb-1">{{ center.name }}</h3>
            <p class="text-muted-foreground text-sm mb-3 line-clamp-2">
              {{ center.address }}
            </p>
            
            <div class="flex flex-wrap gap-2 mb-3">
              <Badge 
                v-for="insurance in center.accepted_insurance" 
                :key="insurance.id"
                variant="secondary"
                class="text-xs py-1 px-2"
              >
                {{ insurance.name }}
                <span v-if="insurance.services.length > 0">
                  ({{ insurance.services.map(s => t(`search.filters.services.options.${s}`)).join('، ') }})
                </span>
              </Badge>
            </div>
            
            <p v-if="center.phone" class="text-muted-foreground text-sm">
              {{ t('common.phone') }}: {{ center.phone }}
            </p>
          </div>
          
          <div class="flex items-center">
            <AppButton 
              variant="outline" 
              size="sm"
              class="w-full md:w-auto whitespace-nowrap"
            >
              <i class="fas fa-directions ml-2"></i>
              {{ t('search.results.direction') }}
            </AppButton>
          </div>
        </div>
      </AppCard>
      
      <div v-if="centers.length >= 10" class="flex justify-center mt-6">
        <AppButton variant="outline" @click="searchStore.loadMore()">
          {{ t('search.results.showMore') }}
        </AppButton>
      </div>
    </div>
  </div>
</template>