export interface InsuranceCompany {
  id: string
  name: string
  code: string
}

export interface MedicalCenter {
  id: string
  name: string
  address: string
  phone?: string
  latitude?: number
  longitude?: number
  accepted_insurance: Array<{
    id: string
    name: string
    services: string[]
  }>
}

export interface SearchFilters {
  insuranceIds?: string[]
  services?: string[]
  location?: string
  radius?: number
}