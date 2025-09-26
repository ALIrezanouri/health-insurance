export interface InsuranceCompany {
  id: string;
  name: string;
}

export interface MedicalCenter {
  id: string;
  name: string;
  address: string;
  phone?: string;
  accepted_insurance: Array<{
    id: string;
    name: string;
    services: string[];
  }>;
}