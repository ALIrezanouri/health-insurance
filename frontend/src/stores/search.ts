import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { useApi } from '@/composables/useApi';
import type { MedicalCenter, InsuranceCompany, SearchParams } from '@/types';

export const useSearchStore = defineStore('search', () => {
  const api = useApi();
  // State
  const insuranceCompanies = ref<InsuranceCompany[]>([]);
  const medicalCenters = ref<MedicalCenter[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const currentPage = ref(1);
  const itemsPerPage = ref(10);

  // Computed
  const paginatedCenters = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value;
    const end = start + itemsPerPage.value;
    return medicalCenters.value.slice(start, end);
  });

  // Actions
  const fetchInsuranceCompanies = async () => {
    try {
      loading.value = true;
      insuranceCompanies.value = await api.getInsuranceCompanies();
      error.value = null;
    } catch (err) {
      error.value = 'Failed to load insurance companies';
      console.error(err);
    } finally {
      loading.value = false;
    }
  };

  const searchCenters = async (filters?: {
    insuranceIds?: string[];
    services?: string[];
    location?: { lat: number; lng: number };
  }) => {
    try {
      loading.value = true;
      currentPage.value = 1;

      const params: SearchParams = {
        ...(filters?.insuranceIds?.length && { insurance_id: filters.insuranceIds }),
        ...(filters?.services?.length && { service: filters.services }),
        ...(filters?.location && {
          lat: filters.location.lat,
          lng: filters.location.lng,
          radius: 10
        })
      };

      medicalCenters.value = await api.getMedicalCenters(params);
      error.value = null;
    } catch (err) {
      error.value = 'Failed to search medical centers';
      console.error(err);
    } finally {
      loading.value = false;
    }
  };

  const loadMore = () => {
    currentPage.value++;
  };

  return {
    insuranceCompanies,
    medicalCenters: paginatedCenters,
    filteredCenters: paginatedCenters, // alias for consistency
    loading,
    error,
    currentPage,
    itemsPerPage,
    fetchInsuranceCompanies,
    searchCenters,
    loadMore
  };
});