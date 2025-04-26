import { API_BASE_URL } from '@/constants/domains'
import ax from 'axios'

const axios = ax.create({
  baseURL: API_BASE_URL,
})

axios.interceptors.request.use(
  (config) => {
    // set headers if needed
    // ex:
    const token = localStorage.getItem('token')
    if (token) config.headers['Authorization'] = `Bearer ${token}`
    return config
  },
  (error) => {
    Promise.reject(error)
  }
)

export default axios
