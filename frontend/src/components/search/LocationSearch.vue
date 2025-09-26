<script setup lang="ts">
import { computed, watch, ref } from 'vue';
import { useSearchStore } from '@/stores/search';
import { useGeolocation } from '@/composables/useGeolocation'; // Import useGeolocation

const searchStore = useSearchStore();
// Correctly destructure to get the actual function
const { getCurrentPosition } = useGeolocation(); 

// Local state for the text input to avoid direct mutation of store during typing
const locationInput = ref('');

// Computed property for selected location
const selectedLocation = computed({
  get: () => searchStore.filters.location,
  set: (location) => searchStore.updateFilter({ location }),
});

// Computed property for selected radius
const selectedRadius = computed({
  get: () => searchStore.filters.radius,
  set: (radius) => searchStore.updateFilter({ radius: Number(radius) }), // Ensure radius is a number
});

// Watch for changes in location or radius and trigger a search
watch([selectedLocation, selectedRadius], () => {
  searchStore.searchCenters();
});

// Handler for "Use Current Location" button
const handleUseCurrentLocation = async () => {
  try {
    // Call the correctly destructured function
    const coords = await getCurrentPosition(); 
    if (coords) {
      selectedLocation.value = { lat: coords.latitude, lng: coords.longitude };
      // Optionally update locationInput if you want to display the current location
      // locationInput.value = `Lat: ${coords.latitude.toFixed(4)}, Lng: ${coords.longitude.toFixed(4)}`;
    }
  } catch (error) {
    console.error("Error getting current location:", error);
    // Handle error, e.g., show a message to the user
  }
};

// Handler for location text input (e.g., geocoding would happen here)
// For now, we'll just update the store if a valid location is entered.
// A more robust solution would involve geocoding the input text.
const handleLocationInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  locationInput.value = target.value;
  // In a real app, you'd geocode locationInput.value and set selectedLocation.value
  // For now, we'll assume the user might manually enter lat,lng or we'll rely on "Use Current Location"
  // If we were to implement geocoding, we'd call an API here and update selectedLocation.value
};

// Initialize locationInput if a location is already set in the store
// This might be useful if the user navigates back to this filter
// onMounted(() => {
//   if (selectedLocation.value) {
//     locationInput.value = `Lat: ${selectedLocation.value.lat.toFixed(4)}, Lng: ${selectedLocation.value.lng.toFixed(4)}`;
//   }
// });

</script>

<template>
  <div class="p-4 border rounded-lg">
    <h3 class="font-medium mb-3">{{ $t('search.filters.location.title') }}</h3>
    <div class="space-y-3">
      <button 
        @click="handleUseCurrentLocation"
        class="w-full py-2 text-sm border rounded flex items-center justify-center hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
      >
        <i class="fas fa-location-arrow ml-2"></i>
        {{ $t('search.filters.location.useCurrent') }}
      </button>
      <div>
        <input 
          type="text" 
          v-model="locationInput"
          @input="handleLocationInput"
          :placeholder="$t('search.filters.location.searchPlaceholder')"
          class="w-full p-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
        />
      </div>
      <div>
        <label class="text-sm flex items-center justify-between">
          <span>{{ $t('search.filters.location.radius') }}: {{ selectedRadius }} km</span>
          <input 
            type="range" 
            min="1" 
            max="50" 
            v-model="selectedRadius" 
            class="w-1/2 ml-4"
          />
        </label>
      </div>
    </div>
  </div>
</template>
