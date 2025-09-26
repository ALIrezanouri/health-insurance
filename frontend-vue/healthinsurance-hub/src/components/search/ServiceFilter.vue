<template>
  <div class="bg-white rounded-xl shadow-sm p-4">
    <h3 class="text-lg font-semibold mb-3">انواع خدمات</h3>
    <div class="space-y-2">
      <div 
        v-for="(label, service) in serviceOptions" 
        :key="service"
        class="flex items-center"
      >
        <input 
          type="checkbox" 
          :value="service"
          v-model="selectedServices"
          class="rounded border-gray-300 text-blue-500 focus:ring-blue-500"
        />
        <span class="mr-2 text-sm">{{ label }}</span>
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

<script setup lang="ts">
const serviceOptions = {
  dentistry: 'دندانپزشکی',
  imaging: 'تصویربرداری',
  lab: 'آزمایشگاه',
  general: 'معاینه عمومی',
  specialist: 'معاینه تخصصی'
}

// استفاده از prop به جای model برای اتصال به store
const selectedServices = defineModel<string[]>({ default: [] })

const clearSelection = () => {
  selectedServices.value = []
}
</script>