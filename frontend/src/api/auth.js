import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
})

export const registerUser    = (data) => api.post('/api/auth/user/register', data)
export const loginUser       = (data) => api.post('/api/auth/user/login', data)
export const logoutUser      = ()     => api.post('/api/auth/user/logout')

export const registerPartner = (data) => api.post('/api/auth/foodpartner/register', data)
export const loginPartner    = (data) => api.post('/api/auth/foodpartner/login', data)
export const logoutPartner   = ()     => api.post('/api/auth/foodpartner/logout')
