import axios from 'axios'
import { AUTH_TOKEN } from '@/common/constants/constants'

export const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    //Authorization: `Bearer 54de1631-fc51-4e33-9be0-65e5da487a5a`,
    'API-KEY': import.meta.env.VITE_API_KEY,
  },
})

instance.interceptors.request.use(function (config) {
  config.headers.Authorization = `Bearer ${localStorage.getItem(AUTH_TOKEN)}`
  return config
})
