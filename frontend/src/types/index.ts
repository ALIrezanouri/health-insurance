export interface InsuranceCompany {
  id: string;
  name: string;
}

export interface AcceptedInsurance {
  id: string;
  name: string;
  services: string[];
}

export interface MedicalCenter {
  id: string;
  name: string;
  address: string;
  phone?: string;
  services: string[];
  accepted_insurance: AcceptedInsurance[];
}

export interface SearchParams {
  insurance_id?: string[];
  service?: string[];
  lat?: number;
  lng?: number;
  radius?: number;
}