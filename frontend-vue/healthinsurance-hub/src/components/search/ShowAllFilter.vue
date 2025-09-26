<template>
  <div class="bg-white rounded-xl shadow-sm p-4">
    <h3 class="text-lg font-semibold mb-3">نمایش همه مراکز</h3>
    <div class="flex items-center justify-between">
      <span class="text-sm">نمایش همه مراکز بدون فیلتر</span>
      <label class="relative inline-flex items-center cursor-pointer">
        <input 
          type="checkbox" 
          v-model="showAll"
          class="sr-only peer"
        />
        <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
      </label>
    </div>
    
    <div v-if="showAll" class="mt-3 pt-3 border-t border-gray-200">
      <button 
        @click="generateData"
        class="w-full px-3 py-2 text-sm bg-green-100 text-green-800 rounded-md hover:bg-green-200 transition-colors"
      >
        تولید داده شبیه‌سازی شده
      </button>
      <p class="text-xs text-gray-500 mt-1 text-center">
        برای نمایش ۱۰۰ مرکز درمانی
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useSearchStore } from '@/stores/search'

const searchStore = useSearchStore()
const showAll = ref(false)

// وقتی چک باکس تغییر کند، وضعیت نمایش همه را در store تنظیم کن
watch(showAll, (newValue) => {
  if (newValue) {
    // پاک کردن همه فیلترها
    searchStore.setSearchFilters({
      insuranceIds: [],
      services: [],
      location: '',
      city: '',
      province: '',
      radius: 10
    })
    
    // جستجوی مجدد بدون فیلتر
    searchStore.searchCenters()
  }
})

const generateData = () => {
  searchStore.generateSimulatedData()
}
</script>