import type { MedicalCenter, InsuranceCompany, SearchParams } from '@/types';

// In a real app, this would use fetch or a library like axios
// and would handle headers, authentication, and error handling.
// const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

export function useApi() {
  const getInsuranceCompanies = async (): Promise<InsuranceCompany[]> => {
    console.log('Fetching insurance companies...');
    // const response = await fetch(`${API_BASE_URL}/insurances`);
    // if (!response.ok) throw new Error('Network response was not ok.');
    // return response.json();
    return Promise.resolve([
      { id: '1', name: 'بیمه ایران' },
      { id: '2', name: 'بیمه آسیا' },
      { id: '3', name: 'بیمه البرز' },
      { id: '4', name: 'بیمه دانا' },
    ]);
  };

  const getMedicalCenters = async (params: SearchParams): Promise<MedicalCenter[]> => {
    console.log('Searching medical centers with params:', params);
    // const query = new URLSearchParams(params as Record<string, string>).toString();
    // const response = await fetch(`${API_BASE_URL}/centers?${query}`);
    // if (!response.ok) throw new Error('Network response was not ok.');
    // return response.json();
    return Promise.resolve([
       { id: '1', name: 'مرکز درمانی شفا', address: 'خیابان ولیعصر، بالاتر از پارک ساعی', phone: '021-88123456', accepted_insurance: [{id: '1', name: 'بیمه ایران', services: ['dentistry', 'lab']}], services: ['dentistry', 'lab'] },
       { id: '2', name: 'بیمارستان آتیه', address: 'شهرک غرب، بلوار فرحزادی', phone: '021-88098765', accepted_insurance: [{id: '2', name: 'بیمه آسیا', services: ['imaging']}], services: ['imaging'] },
       { id: '3', name: 'کلینیک نور', address: 'میدان ونک، خیابان جهان کودک', phone: '021-88776655', accepted_insurance: [{id: '3', name: 'بیمه البرز', services: ['specialist']}], services: ['specialist'] },
    ]);
  };

  return {
    getInsuranceCompanies,
    getMedicalCenters,
  };
}