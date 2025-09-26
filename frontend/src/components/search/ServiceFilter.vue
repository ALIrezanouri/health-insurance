<script setup lang="ts">
import { computed, watch } from 'vue';
import { useSearchStore } from '@/stores/search';

const searchStore = useSearchStore();

// Define available services (this might ideally come from a store or API if dynamic)
const availableServices = [
  { key: 'dentistry', label: 'search.filters.services.options.dentistry' },
  { key: 'imaging', label: 'search.filters.services.options.imaging' },
  { key: 'lab', label: 'search.filters.services.options.lab' },
  // Add more services here if needed
];

// Computed property for selected services
const selectedServices = computed({
  get: () => searchStore.filters.services,
  set: (services) => searchStore.updateFilter({ services }),
});

// Watch for changes in selectedServices and trigger a search
watch(selectedServices, () => {
  searchStore.searchCenters();
});

// Logic for "Select All" (optional, if a select all is desired for services)
// For now, we'll just manage individual service selections.
</script>

<template>
  <div class="p-4 border rounded-lg">
    <h3 class="font-medium mb-3">{{ $t('search.filters.services.title') }}</h3>
    <div class="space-y-2">
      <label 
        v-for="service in availableServices" 
        :key="service.key" 
        class="flex items-center cursor-pointer"
      >
        <input 
          type="checkbox" 
          :value="service.key" 
          v-model="selectedServices" 
          class="form-checkbox h-4 w-4 text-primary rounded border-gray-300 focus:ring-primary"
        />
        <span class="ml-2 text-sm">{{ $t(service.label) }}</span>
      </label>
    </div>
  </div>
</template>
