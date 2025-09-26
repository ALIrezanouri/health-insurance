<script setup lang="ts">
import { computed, watch } from 'vue';
import { useSearchStore } from '@/stores/search';

const searchStore = useSearchStore();

// Computed properties to get filter states and actions from the store
const insuranceCompanies = computed(() => searchStore.insuranceCompanies);
const selectedInsuranceIds = computed({
  get: () => searchStore.filters.insuranceIds,
  set: (ids) => searchStore.updateFilter({ insuranceIds: ids }),
});

// Watch for changes in selectedInsuranceIds and trigger a search
watch(selectedInsuranceIds, (newIds) => {
  searchStore.searchCenters();
});

// Fetch insurance companies when the component mounts (or is first used)
// This might be better handled in the parent component (SearchView.vue) or a dedicated setup
// For now, assuming it's fetched elsewhere or will be added here if needed.
// onMounted(() => {
//   if (insuranceCompanies.value.length === 0) {
//     searchStore.fetchInsuranceCompanies();
//   }
// });

// Logic for "Select All"
const selectAll = computed({
  get: () => selectedInsuranceIds.value.length === insuranceCompanies.value.length,
  set: (value) => {
    if (value) {
      selectedInsuranceIds.value = insuranceCompanies.value.map(company => company.id);
    } else {
      selectedInsuranceIds.value = [];
    }
  }
});
</script>

<template>
  <div class="p-4 border rounded-lg">
    <h3 class="font-medium mb-3">{{ $t('search.filters.insurance.title') }}</h3>
    <div class="space-y-2">
      <label class="flex items-center cursor-pointer">
        <input type="checkbox" class="form-checkbox h-4 w-4 text-primary rounded border-gray-300 focus:ring-primary" v-model="selectAll" />
        <span class="ml-2 text-sm">{{ $t('search.filters.insurance.selectAll') }}</span>
      </label>
      
      <label 
        v-for="company in insuranceCompanies" 
        :key="company.id" 
        class="flex items-center cursor-pointer"
      >
        <input 
          type="checkbox" 
          :value="company.id" 
          v-model="selectedInsuranceIds" 
          class="form-checkbox h-4 w-4 text-primary rounded border-gray-300 focus:ring-primary"
        />
        <span class="ml-2 text-sm">{{ company.name }}</span>
      </label>
    </div>
  </div>
</template>
