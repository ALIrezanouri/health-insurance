import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useApi } from '@/composables/useApi'
import type { MedicalCenter, InsuranceCompany } from '@/types'

export const useSearchStore = defineStore('search', () => {
  // State
  const insuranceCompanies = ref<InsuranceCompany[]>([])
  const medicalCenters = ref<MedicalCenter[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const currentPage = ref(1)
  const itemsPerPage = ref(100)
  
  // Filters
  const selectedInsuranceIds = ref<string[]>([])
  const selectedServices = ref<string[]>([])
  const locationQuery = ref('')
  const city = ref('')
  const province = ref('')
  const radius = ref(10)
  
  // Computed
  const filteredCenters = computed(() => {
    // فیلتر کردن مراکز بر اساس بیمه انتخاب شده
    let filtered = medicalCenters.value
    
    // فیلتر کردن بر اساس بیمه‌های انتخاب شده
    if (selectedInsuranceIds.value.length > 0) {
      filtered = filtered.filter(center => 
        center.accepted_insurance.some(insurance => 
          selectedInsuranceIds.value.includes(insurance.id)
        )
      )
    }
    
    // فیلتر کردن بر اساس خدمات انتخاب شده
    if (selectedServices.value.length > 0) {
      filtered = filtered.filter(center => {
        // بررسی اینکه آیا مرکز حداقل یکی از خدمات انتخاب شده را ارائه می‌دهد
        return selectedServices.value.some(service => 
          center.services.includes(service)
        )
      })
    }
    
    // فیلتر کردن بر اساس شهر
    if (city.value) {
      filtered = filtered.filter(center => 
        center.city && center.city.includes(city.value)
      )
    }
    
    // فیلتر کردن بر اساس استان
    if (province.value) {
      filtered = filtered.filter(center => 
        center.province && center.province.includes(province.value)
      )
    }
    
    // نمایش همه مراکز بدون صفحه‌بندی
    return filtered
  })
  
  // Actions
  const fetchInsuranceCompanies = async () => {
    try {
      loading.value = true
      error.value = null
      const api = useApi()
      insuranceCompanies.value = await api.getInsuranceCompanies()
    } catch (err: any) {
      console.error('Error in fetchInsuranceCompanies:', err)
      error.value = err.message || 'Failed to load insurance companies'
    } finally {
      loading.value = false
    }
  }
  
  const searchCenters = async () => {
    try {
      loading.value = true
      error.value = null
      currentPage.value = 1
      
      const api = useApi()
      const params: any = {}
      
      if (selectedInsuranceIds.value.length > 0) {
        params.insurance_id = selectedInsuranceIds.value
      }
      
      if (selectedServices.value.length > 0) {
        params.service = selectedServices.value
      }
      
      if (locationQuery.value) {
        params.location = locationQuery.value
      }
      
      // اضافه کردن شهر به پارامترها
      if (city.value) {
        params.city = city.value
      }
      
      // اضافه کردن استان به پارامترها
      if (province.value) {
        params.province = province.value
      }
      
      // اضافه کردن radius به پارامترها
      if (radius.value) {
        params.radius = radius.value
      }
      
      medicalCenters.value = await api.getMedicalCenters(params)
    } catch (err: any) {
      console.error('Error in searchCenters:', err)
      error.value = err.message || 'Failed to search medical centers'
    } finally {
      loading.value = false
    }
  }
  
  const loadMore = () => {
    currentPage.value++
  }
  
  const setSearchFilters = (filters: {
    insuranceIds?: string[]
    services?: string[]
    location?: string
    city?: string
    province?: string
    radius?: number
  }) => {
    if (filters.insuranceIds !== undefined) selectedInsuranceIds.value = filters.insuranceIds
    if (filters.services !== undefined) selectedServices.value = filters.services
    if (filters.location !== undefined) locationQuery.value = filters.location
    if (filters.city !== undefined) city.value = filters.city
    if (filters.province !== undefined) province.value = filters.province
    if (filters.radius !== undefined) radius.value = filters.radius
  }
  
  // Method to generate simulated data for demonstration purposes
  const generateSimulatedData = () => {
    const simulatedCenters: MedicalCenter[] = []
    const cities = ['تهران', 'اصفهان', 'شیراز', 'تبریز', 'مشهد', 'اهواز', 'کرج', 'قم', 'کرمانشاه', 'ارومیه']
    const provinces = ['تهران', 'اصفهان', 'فارس', 'آذربایجان شرقی', 'خراسان رضوی', 'خوزستان', 'البرز', 'قم', 'کرمانشاه', 'آذربایجان غربی']
    const services = ['dentistry', 'imaging', 'lab', 'general', 'specialist', 'orthodontics', 'mri', 'ctscan', 'blood_test']
    const insuranceCompaniesList = [
      { id: 'asia123', name: 'بیمه آسیا', services: ['dentistry', 'imaging', 'lab'] },
      { id: 'saman456', name: 'بیمه سامان', services: ['dentistry', 'imaging', 'lab'] },
      { id: 'parsian789', name: 'بیمه پارسیان', services: ['dentistry', 'imaging', 'lab'] },
      { id: 'novin123', name: 'بیمه نوین', services: ['dentistry', 'lab'] }
    ]
    
    // Generate 100 simulated centers
    for (let i = 0; i < 100; i++) {
      const cityIndex = Math.floor(Math.random() * cities.length)
      const city = cities[cityIndex]
      const province = provinces[cityIndex]
      
      // Random services
      const centerServices = []
      const numServices = Math.floor(Math.random() * 4) + 2 // 2-5 services
      for (let j = 0; j < numServices; j++) {
        const service = services[Math.floor(Math.random() * services.length)]
        if (!centerServices.includes(service)) {
          centerServices.push(service)
        }
      }
      
      // Random accepted insurance
      const acceptedInsurance = []
      const numInsurance = Math.floor(Math.random() * 3) + 1 // 1-3 insurance companies
      const shuffledInsurance = [...insuranceCompaniesList].sort(() => 0.5 - Math.random())
      
      for (let j = 0; j < numInsurance; j++) {
        if (j < shuffledInsurance.length) {
          const insurance = shuffledInsurance[j]
          // Filter services that this insurance covers
          const insuranceServices = insurance.services.filter(s => centerServices.includes(s))
          if (insuranceServices.length > 0) {
            acceptedInsurance.push({
              id: insurance.id,
              name: insurance.name,
              services: insuranceServices
            })
          }
        }
      }
      
      simulatedCenters.push({
        id: `sim-center-${i + 1}`,
        name: `مرکز درمانی ${city} ${i + 1}`,
        address: `${city}، خیابان ${['ولیعصر', 'انقلاب', 'فردوسی', 'مفتح'][Math.floor(Math.random() * 4)]}، پلاک ${Math.floor(Math.random() * 500) + 1}`,
        city: city,
        province: province,
        phone: `0${Math.floor(Math.random() * 9000000000) + 1000000000}`,
        services: centerServices,
        accepted_insurance: acceptedInsurance
      })
    }
    
    medicalCenters.value = simulatedCenters
  }
  
  return {
    // State
    insuranceCompanies,
    medicalCenters,
    loading,
    error,
    currentPage,
    itemsPerPage,
    selectedInsuranceIds,
    selectedServices,
    locationQuery,
    city,
    province,
    radius,
    
    // Computed
    filteredCenters,
    
    // Actions
    fetchInsuranceCompanies,
    searchCenters,
    loadMore,
    setSearchFilters,
    generateSimulatedData
  }
})