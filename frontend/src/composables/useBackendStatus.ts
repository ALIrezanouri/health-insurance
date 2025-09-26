import { ref, onMounted, onUnmounted } from 'vue';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export function useBackendStatus() {
  const isBackendOnline = ref(false);
  const isLoading = ref(true);
  let intervalId: number | null = null;

  const checkBackendStatus = async () => {
    try {
      const response = await fetch(`${API_BASE}/health`);
      isBackendOnline.value = response.ok;
    } catch (error) {
      isBackendOnline.value = false;
    } finally {
      isLoading.value = false;
    }
  };

  onMounted(() => {
    // Check status immediately
    checkBackendStatus();
    
    // Check status every 30 seconds
    intervalId = window.setInterval(checkBackendStatus, 30000);
  });

  onUnmounted(() => {
    if (intervalId) {
      clearInterval(intervalId);
    }
  });

  return {
    isBackendOnline,
    isLoading,
    checkBackendStatus
  };
}