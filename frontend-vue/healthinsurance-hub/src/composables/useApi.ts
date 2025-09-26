import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://localhost:8000',
  timeout: 10000,
})

// Add interceptor to handle errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message)
    return Promise.reject(error)
  }
)

export function useApi() {
  const getInsuranceCompanies = async () => {
    try {
      const response = await apiClient.get('/api/v1/public/insurance/')
      return response.data
    } catch (error: any) {
      console.error('Error fetching insurance companies:', error)
      throw new Error('Failed to load insurance companies')
    }
  }

  const getMedicalCenters = async (params?: any) => {
    try {
      const response = await apiClient.get('/api/v1/public/centers/', { params })
      return response.data
    } catch (error: any) {
      console.error('Error fetching medical centers:', error)
      throw new Error('Failed to search medical centers')
    }
  }

  return {
    getInsuranceCompanies,
    getMedicalCenters
  }
}