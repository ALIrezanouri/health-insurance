import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { useApi } from '@/composables/useApi';
import type { MedicalCenter, InsuranceCompany } from '@/types';

// Define the structure for filters
interface SearchFilters {
  insuranceIds: string[];
  services: string[];
  location: { lat: number; lng: number } | null;
  radius: number;
}

export const useSearchStore = defineStore('search', () => {
  // State
  const insuranceCompanies = ref<InsuranceCompany[]>([]);
  const medicalCenters = ref<MedicalCenter[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const currentPage = ref(1);
  const itemsPerPage = ref(10);
  
  // Filters state
  const filters = ref<SearchFilters>({
    insuranceIds: [],
    services: [],
    location: null,
    radius: 10, // Default radius
  });

  // Computed
  const filteredCenters = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value;
    return medicalCenters.value.slice(start, start + itemsPerPage.value);
  });
  
  // Actions
  const fetchInsuranceCompanies = async () => {
    try {
      loading.value = true;
      error.value = null;
      insuranceCompanies.value = await useApi().getInsuranceCompanies();
    } catch (err: any) {
      error.value = err.message || 'Failed to load insurance companies';
      console.error('Error fetching insurance companies:', err);
    } finally {
      loading.value = false;
    }
  };
  
  // Action to update filters
  const updateFilter = (newFilters: Partial<SearchFilters>) => {
    filters.value = { ...filters.value, ...newFilters };
  };

  // Action to perform search with current filters
  const searchCenters = async () => {
    try {
      loading.value = true;
      error.value = null;
      currentPage.value = 1;
      
      const params: any = {};
      
      if (filters.value.insuranceIds.length > 0) {
        params.insurance_id = filters.value.insuranceIds;
      }
      
      if (filters.value.services.length > 0) {
        params.service = filters.value.services;
      }
      
      if (filters.value.location) {
        params.lat = filters.value.location.lat;
        params.lng = filters.value.location.lng;
        params.radius = filters.value.radius;
      }
      
      medicalCenters.value = await useApi().getMedicalCenters(params);
    } catch (err: any) {
      error.value = err.message || 'Failed to search medical centers';
      console.error('Error searching medical centers:', err);
    } finally {
      loading.value = false;
    }
  };
  
  const loadMore = () => {
    currentPage.value++;
  };
  
  return {
    insuranceCompanies,
    medicalCenters,
    filteredCenters,
    loading,
    error,
    currentPage,
    itemsPerPage,
    filters, // Expose filters state
    fetchInsuranceCompanies,
    searchCenters,
    loadMore,
    updateFilter // Expose updateFilter action
  };
});