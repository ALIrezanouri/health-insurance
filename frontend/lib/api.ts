import { MedicalCenter, InsuranceCompany } from './types';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export async function getMedicalCenters(filters: {
  insuranceIds?: string[];
  services?: string[];
  city?: string;
  province?: string;
}) {
  const params = new URLSearchParams();
  
  // Only add insurance IDs if they exist and are not empty
  if (filters.insuranceIds?.length) {
    filters.insuranceIds.forEach(id => params.append('insurance_id', id));
  }
  
  // Only add services if they exist and are not empty
  if (filters.services?.length) {
    filters.services.forEach(service => params.append('service', service));
  }
  
  // Add city filter if provided
  if (filters.city) {
    params.append('city', filters.city);
  }
  
  // Add province filter if provided
  if (filters.province) {
    params.append('province', filters.province);
  }
  
  // Construct the URL with or without parameters
  let url = `${API_BASE}/api/v1/public/centers`;
  if (params.toString()) {
    url += `?${params.toString()}`;
  }
  
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error('Failed to fetch medical centers');
  }
  
  return response.json();
}

export async function getInsuranceCompanies() {
  const response = await fetch(`${API_BASE}/api/v1/public/insurance`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch insurance companies');
  }
  
  return response.json();
}