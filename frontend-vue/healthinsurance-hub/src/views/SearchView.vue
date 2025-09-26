<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useSearchStore } from '@/stores/search'
import InsuranceFilter from '@/components/search/InsuranceFilter.vue'
import ServiceFilter from '@/components/search/ServiceFilter.vue'
import LocationSearch from '@/components/search/LocationSearch.vue'
import ShowAllFilter from '@/components/search/ShowAllFilter.vue'
import ExcelUpload from '@/components/search/ExcelUpload.vue'
import ResultsList from '@/components/search/ResultsList.vue'
import AppHeader from '@/components/layout/AppHeader.vue'

const { t } = useI18n()
const searchStore = useSearchStore()
const showExcelUpload = ref(false)

onMounted(() => {
  searchStore.fetchInsuranceCompanies()
  searchStore.searchCenters()
})

// Watch filters and re-search when they change
watch([
  () => searchStore.selectedInsuranceIds,
  () => searchStore.selectedServices,
  () => searchStore.locationQuery,
  () => searchStore.city,
  () => searchStore.province
], () => {
  searchStore.searchCenters()
}, { deep: true })

const handleRetry = () => {
  searchStore.searchCenters()
}

const handleLoadMore = () => {
  searchStore.loadMore()
}
</script>

<template>
  <div class="min-h-screen gradient-bg">
    <AppHeader />
    
    <main class="container mx-auto px-4 py-6">
      <div class="text-center mb-8">
        <h1 class="text-2xl md:text-3xl font-bold mb-2">جستجوی مراکز درمانی</h1>
        <p class="text-gray-600 max-w-2xl mx-auto">
          مراکز درمانی معتبر که با بیمه شما قرارداد دارند را پیدا کنید
        </p>
      </div>
      
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <!-- Filters (Hidden on mobile, shown as drawer on mobile) -->
        <div class="lg:col-span-1 space-y-6">
          <div class="bg-white rounded-xl shadow-sm p-4">
            <div class="flex justify-between items-center">
              <h3 class="text-lg font-semibold">ابزارها</h3>
              <button 
                @click="showExcelUpload = !showExcelUpload"
                class="text-sm text-blue-500 hover:text-blue-700"
              >
                {{ showExcelUpload ? 'لغو' : 'آپلود اکسل' }}
              </button>
            </div>
          </div>
          
          <ShowAllFilter />
          <ExcelUpload v-if="showExcelUpload" />
          <InsuranceFilter v-model="searchStore.selectedInsuranceIds" />
          <ServiceFilter v-model="searchStore.selectedServices" />
          <LocationSearch 
            v-model="searchStore.locationQuery" 
            v-model:province="searchStore.province"
            v-model:city="searchStore.city"
            v-model:radius="searchStore.radius"
          />
        </div>
        
        <!-- Results -->
        <div class="lg:col-span-3">
          <ResultsList 
            :centers="searchStore.filteredCenters"
            :loading="searchStore.loading"
            :error="searchStore.error"
            @retry="handleRetry"
            @load-more="handleLoadMore"
          />
        </div>
      </div>
    </main>
    
    <!-- Mobile Bottom Navigation -->
    <nav class="mobile-bottom-nav lg:hidden">
      <div class="flex justify-around">
        <router-link 
          to="/" 
          class="flex flex-col items-center text-gray-500 hover:text-gray-900"
        >
          <i class="fas fa-home text-xl mb-1"></i>
          <span class="text-xs">صفحه اصلی</span>
        </router-link>
        <router-link 
          to="/search" 
          class="flex flex-col items-center text-blue-500"
        >
          <i class="fas fa-search text-xl mb-1"></i>
          <span class="text-xs font-medium">جستجوی مراکز</span>
        </router-link>
        <router-link 
          to="/about" 
          class="flex flex-col items-center text-gray-500 hover:text-gray-900"
        >
          <i class="fas fa-info-circle text-xl mb-1"></i>
          <span class="text-xs">درباره ما</span>
        </router-link>
      </div>
    </nav>
  </div>
</template>