export interface InsuranceCompany {
  id: string;
  name: string;
  logo_url?: string;
  website?: string;
}

export interface MedicalCenter {
  id: string;
  name: string;
  address: string;
  location: {
    type: string;
    coordinates: [number, number];
  };
  phone?: string;
  services: string[];
  accepted_insurance: Array<{
    id: string;
    name: string;
    services: string[];
  }>;
}