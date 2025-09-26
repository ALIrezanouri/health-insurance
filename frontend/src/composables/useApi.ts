import type { MedicalCenter, InsuranceCompany } from '@/types';

// Mock data for development
const mockInsuranceCompanies: InsuranceCompany[] = [
  { id: '1', name: 'بیمه البرز' },
  { id: '2', name: 'بیمه پاسارگاد' },
  { id: '3', name: 'بیمه ایران' },
  { id: '4', name: 'بیمه کارآفرین' },
];

const mockMedicalCenters: MedicalCenter[] = [
  {
    id: '1',
    name: 'کلینیک تخصصی دندانپزشکی',
    address: 'تهران، خیابان ولیعصر، نبش کوچه شهیدی',
    phone: '021-23456789',
    accepted_insurance: [
      { id: '1', name: 'بیمه البرز', services: ['dentistry'] },
      { id: '2', name: 'بیمه پاسارگاد', services: ['dentistry', 'general'] }
    ]
  },
  {
    id: '2',
    name: 'مرکز تصویربرداری پیشرفته',
    address: 'تهران، میدان تجریش، برج تجاری تجریش',
    phone: '021-98765432',
    accepted_insurance: [
      { id: '3', name: 'بیمه ایران', services: ['imaging'] },
      { id: '1', name: 'بیمه البرز', services: ['imaging', 'lab'] }
    ]
  }
];

export function useApi() {
  return {
    getInsuranceCompanies: async (): Promise<InsuranceCompany[]> => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      return mockInsuranceCompanies;
    },
    
    getMedicalCenters: async (params?: any): Promise<MedicalCenter[]> => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      return mockMedicalCenters;
    }
  };
}