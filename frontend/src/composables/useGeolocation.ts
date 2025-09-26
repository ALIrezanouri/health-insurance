import { ref } from 'vue';

// Define the type for the position object
interface GeolocationPosition {
  latitude: number;
  longitude: number;
}

export function useGeolocation() {
  // Use a more specific type for position
  const position = ref<GeolocationPosition | null>(null);
  const error = ref<string | null>(null);
  const loading = ref(false);
  
  const getCurrentPosition = (): Promise<GeolocationPosition | null> => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        error.value = 'مرورگر شما از موقعیت‌یابی پشتیبانی نمی‌کند';
        reject(new Error('Geolocation not supported'));
        return;
      }
      
      loading.value = true;
      error.value = null;
      
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const coords: GeolocationPosition = {
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude
          };
          position.value = coords; // Update the ref
          loading.value = false;
          resolve(coords); // Resolve with the coordinates
        },
        (err) => {
          error.value = 'اجازه دسترسی به موقعیت مکانی داده نشد';
          loading.value = false;
          console.error(err);
          reject(err); // Reject with the error
        },
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      );
    });
  };
  
  return {
    position,
    error,
    loading,
    getCurrentPosition
  };
}
