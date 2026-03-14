import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
})

export const getFoods = () => api.get('/api/food')
export const getFoodsByPartner = (partnerId) => api.get(`/api/food/partner/${partnerId}`)
export const createFood = (data) => api.post('/api/food', data)
