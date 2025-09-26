import { ref } from 'vue'

export function useGeolocation() {
  const position = ref<{ lat: number; lng: number } | null>(null)
  const error = ref<string | null>(null)
  const loading = ref(false)
  
  const getCurrentPosition = () => {
    if (!navigator.geolocation) {
      error.value = 'مرورگر شما از موقعیت‌یابی پشتیبانی نمی‌کند'
      return
    }
    
    loading.value = true
    error.value = null
    
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        position.value = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        }
        loading.value = false
      },
      (err) => {
        error.value = 'اجازه دسترسی به موقعیت مکانی داده نشد'
        loading.value = false
        console.error(err)
      },
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
    )
  }
  
  return {
    position,
    error,
    loading,
    getCurrentPosition
  }
}