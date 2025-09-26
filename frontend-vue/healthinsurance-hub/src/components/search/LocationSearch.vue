<template>
  <div class="bg-white rounded-xl shadow-sm p-4">
    <h3 class="text-lg font-semibold mb-3">موقعیت مکانی</h3>
    <div class="space-y-4">
      <div>
        <label class="block text-sm font-medium mb-1">
          استان
        </label>
        <select 
          v-model="province"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">انتخاب استان</option>
          <option 
            v-for="provinceOption in provinceOptions" 
            :key="provinceOption" 
            :value="provinceOption"
          >
            {{ provinceOption }}
          </option>
        </select>
      </div>
      
      <div>
        <label class="block text-sm font-medium mb-1">
          شهر
        </label>
        <select 
          v-model="city"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">انتخاب شهر</option>
          <option 
            v-for="cityOption in cityOptions" 
            :key="cityOption" 
            :value="cityOption"
          >
            {{ cityOption }}
          </option>
        </select>
      </div>
      
      <div>
        <label class="block text-sm font-medium mb-1">
          آدرس کامل
        </label>
        <input 
          v-model="locationQuery"
          placeholder="جستجوی آدرس..."
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      
      <div>
        <label class="block text-sm font-medium mb-1">
          شعاع جستجو (کیلومتر)
        </label>
        <div class="flex items-center gap-2">
          <input 
            v-model="radius"
            type="range" 
            min="1" 
            max="50" 
            class="w-full"
          />
          <span class="text-sm w-16 text-center">{{ radius }} کم</span>
        </div>
      </div>
      
      <button 
        @click="useCurrentLocation"
        :disabled="loading"
        class="w-full px-4 py-2 border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-100 disabled:opacity-50 flex items-center justify-center gap-2"
      >
        <i class="fas fa-location-arrow"></i>
        استفاده از موقعیت فعلی
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

// استفاده از prop به جای model برای اتصال به store
const locationQuery = defineModel<string>({ default: '' })
const province = defineModel<string>('province', { default: '' })
const city = defineModel<string>('city', { default: '' })
const radius = defineModel<number>('radius', { default: 10 })

// گزینه‌های استان و شهر (داده‌های ساختگی برای نمایش)
const provinceOptions = ref([
  'تهران',
  'اصفهان',
  'شیراز',
  'تبریز',
  'مشهد',
  'اهواز',
  'کرج',
  'قم',
  'کرمانشاه',
  'ارومیه'
])

// گزینه‌های شهر بر اساس استان انتخاب شده
const cityOptions = computed(() => {
  const cities: Record<string, string[]> = {
    'تهران': ['تهران', 'شهریار', 'اسلامشهر', 'ملارد', 'پاکدشت', 'قرچک', 'ورامین', 'فیروزکوه'],
    'اصفهان': ['اصفهان', 'کاشان', 'خمینی‌شهر', 'نجف‌آباد', 'لردگان', 'شاهین‌شهر', 'مبارکه'],
    'شیراز': ['شیراز', 'مرودشت', 'جهرم', 'فسا', 'کازرون', 'آباده', 'داراب'],
    'تبریز': ['تبریز', 'مراغه', 'میانه', 'شبستر', 'مرند', 'جلفا', 'اهر'],
    'مشهد': ['مشهد', 'نیشابور', 'سبزوار', 'تایباد', 'قوچان', 'کاشمر', 'گناباد'],
    'اهواز': ['اهواز', 'آبادان', 'خرمشهر', 'Dezful', 'ایذه', 'شوش', 'شوشتر'],
    'کرج': ['کرج', 'محمدشهر', 'ماهدشت', 'نظرآباد', 'هشتگرد'],
    'قم': ['قم'],
    'کرمانشاه': ['کرمانشاه', 'اسلام‌آباد غرب', 'سرپل ذهاب', 'سنقر', 'قصر شیرین'],
    'ارومیه': ['ارومیه', 'خوی', 'مهاباد', 'بوکان', 'نقده', 'سلماس', 'پیرانشهر']
  }
  
  return province.value ? cities[province.value] || [] : []
})

const loading = ref(false)

const useCurrentLocation = () => {
  loading.value = true
  // In a real app, this would use the geolocation API
  setTimeout(() => {
    loading.value = false
    // Mock location
    locationQuery.value = 'تهران'
  }, 1000)
}
</script>