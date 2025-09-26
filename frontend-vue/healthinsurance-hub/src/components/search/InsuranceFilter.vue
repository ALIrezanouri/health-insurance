<script setup lang="ts">
import { computed, watch } from 'vue'
import { useSearchStore } from '@/stores/search'

const searchStore = useSearchStore()

// Directly use the store's refs for selectedInsuranceIds
const selectedInsurances = computed({
  get: () => searchStore.selectedInsuranceIds,
  set: (value) => searchStore.selectedInsuranceIds = value,
})

// Computed property for insurance companies
const insuranceCompanies = computed(() => searchStore.insuranceCompanies)

// Watch for changes in selectedInsurances and trigger a search
watch(selectedInsurances, (newValue) => {
  searchStore.searchCenters()
}, { deep: true })

// Logic for "Select All"
const allSelected = computed(() => {
  return selectedInsurances.value.length === insuranceCompanies.value.length && insuranceCompanies.value.length > 0
})

const toggleAll = () => {
  if (allSelected.value) {
    selectedInsurances.value = []
  } else {
    selectedInsurances.value = insuranceCompanies.value.map(company => company.id)
  }
}

const clearSelection = () => {
  selectedInsurances.value = []
}

// Ensure insurance companies are fetched if not already
// This might be redundant if SearchView already fetches them, but good for component self-sufficiency
// if (insuranceCompanies.value.length === 0) {
//   searchStore.fetchInsuranceCompanies()
// }
</script>

<template>
  <div class="bg-white rounded-xl shadow-sm p-4">
    <h3 class="text-lg font-semibold mb-3">بیمه‌های مورد نظر</h3>
    <div class="space-y-2">
      <label class="flex items-center cursor-pointer">
        <input 
          type="checkbox" 
          :checked="allSelected" 
          @change="toggleAll"
          class="rounded border-gray-300 text-blue-500 focus:ring-blue-500"
        />
        <span class="mr-2 text-sm">انتخاب همه</span>
      </label>
      <div 
        v-for="company in insuranceCompanies" 
        :key="company.id"
        class="flex items-center cursor-pointer"
      >
        <input 
          type="checkbox" 
          :value="company.id"
          v-model="selectedInsurances"
          class="rounded border-gray-300 text-blue-500 focus:ring-blue-500"
        />
        <span class="mr-2 text-sm">{{ company.name }}</span>
      </div>
    </div>
    <div class="mt-3 flex gap-2">
      <button 
        @click="clearSelection"
        class="text-xs px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-100"
      >
        پاک کردن
      </button>
    </div>
  </div>
</template>
