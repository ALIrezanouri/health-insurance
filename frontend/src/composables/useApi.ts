import type { MedicalCenter, InsuranceCompany } from '@/types';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export function useApi() {
  return {
    getInsuranceCompanies: async (): Promise<InsuranceCompany[]> => {
      try {
        const response = await fetch(`${API_BASE}/api/v1/public/insurance`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch insurance companies: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Error fetching insurance companies:', error);
        throw error;
      }
    },
    
    getMedicalCenters: async (params?: any): Promise<MedicalCenter[]> => {
      try {
        // Build query parameters
        const queryParams = new URLSearchParams();
        
        if (params) {
          // Handle insurance IDs
          if (params.insurance_id) {
            if (Array.isArray(params.insurance_id)) {
              params.insurance_id.forEach((id: string) => queryParams.append('insurance_id', id));
            } else {
              queryParams.append('insurance_id', params.insurance_id);
            }
          }
          
          // Handle services
          if (params.service) {
            if (Array.isArray(params.service)) {
              params.service.forEach((service: string) => queryParams.append('service', service));
            } else {
              queryParams.append('service', params.service);
            }
          }
          
          // Handle location parameters
          if (params.lat && params.lng) {
            queryParams.append('lat', params.lat);
            queryParams.append('lng', params.lng);
            queryParams.append('radius', params.radius || '10');
          }
          
          // Handle city and province
          if (params.city) {
            queryParams.append('city', params.city);
          }
          
          if (params.province) {
            queryParams.append('province', params.province);
          }
        }
        
        // Construct URL
        let url = `${API_BASE}/api/v1/public/centers`;
        if (queryParams.toString()) {
          url += `?${queryParams.toString()}`;
        }
        
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch medical centers: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Error fetching medical centers:', error);
        throw error;
      }
    }
  };
}