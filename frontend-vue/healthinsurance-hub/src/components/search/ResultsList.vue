<template>
  <div>
    <div v-if="error" class="text-center py-8 text-red-500">
      خطا در دریافت اطلاعات: {{ error }}
      <button @click="retrySearch" class="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
        تلاش مجدد
      </button>
    </div>
    
    <div v-else-if="loading" class="space-y-5">
      <div v-for="n in 5" :key="n" class="bg-white rounded-xl shadow-sm p-4">
        <div class="grid md:grid-cols-[1fr_auto] gap-4">
          <div>
            <div class="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div class="h-4 bg-gray-200 rounded w-full mb-4"></div>
            
            <div class="flex flex-wrap gap-2 mb-4">
              <div v-for="i in 2" :key="i" class="h-6 bg-gray-200 rounded w-24"></div>
            </div>
            
            <div class="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
          
          <div class="flex items-center">
            <div class="h-10 bg-gray-200 rounded w-full"></div>
          </div>
        </div>
      </div>
    </div>
    
    <div v-else-if="centers.length === 0" class="text-center py-12">
      <h3 class="text-xl font-semibold mb-2">مرکزی یافت نشد</h3>
      <p class="text-gray-600">
        متأسفانه با فیلترهای انتخاب شده هیچ مرکز درمانی یافت نشد.
      </p>
    </div>
    
    <div v-else class="space-y-5">
      <div 
        v-for="(center, index) in centers" 
        :key="center.id" 
        class="bg-white rounded-xl shadow-sm overflow-hidden"
      >
        <div class="grid md:grid-cols-[1fr_auto] gap-4 p-4">
          <div>
            <h3 class="text-lg font-bold mb-1">{{ center.name }}</h3>
            <p class="text-gray-600 text-sm mb-3 line-clamp-2">
              {{ center.address }}
            </p>
            
            <div class="flex flex-wrap gap-2 mb-3">
              <span 
                v-for="insurance in center.accepted_insurance" 
                :key="insurance.id"
                class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
              >
                {{ insurance.name }}
                <span v-if="insurance.services.length > 0">
                  ({{ insurance.services.map(s => getServiceName(s)).join('، ') }})
                </span>
              </span>
            </div>
            
            <p v-if="center.phone" class="text-gray-600 text-sm">
              تلفن: {{ center.phone }}
            </p>
          </div>
          
          <div class="flex items-center">
            <button 
              class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-100 whitespace-nowrap"
            >
              <i class="fas fa-directions ml-2"></i>
              جهت‌یابی
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Props
const props = defineProps<{
  centers: any[]
  loading: boolean
  error: string | null
}>()

// Emits
const emit = defineEmits<{
  (e: 'retry'): void
  (e: 'loadMore'): void
}>()

// Methods
const retrySearch = () => {
  emit('retry')
}

const loadMore = () => {
  emit('loadMore')
}

// Service names mapping
const getServiceName = (service: string) => {
  const serviceNames: Record<string, string> = {
    'dentistry': 'دندانپزشکی',
    'imaging': 'تصویربرداری',
    'lab': 'آزمایشگاه',
    'general': 'معاینه عمومی',
    'specialist': 'معاینه تخصصی'
  }
  return serviceNames[service] || service
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>