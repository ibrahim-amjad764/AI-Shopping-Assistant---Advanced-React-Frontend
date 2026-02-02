import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api'

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add token to requests if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Handle token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// ==================== AUTH APIs ====================
export const authAPI = {
  login: async (email, password) => {
    const response = await api.post('/auth/login', { email, password })
    return response.data
  },
  
  register: async (userData) => {
    const response = await api.post('/auth/register', userData)
    return response.data
  },
  
  getCurrentUser: async () => {
    const response = await api.get('/auth/me')
    return response.data
  },
}

// ==================== PRODUCT APIs ====================
export const productAPI = {
  getAll: async (params = {}) => {
    const response = await api.get('/products', { params })
    return response.data
  },
  
  getById: async (id) => {
    const response = await api.get(`/products/${id}`)
    return response.data
  },
  
  search: async (query, filters = {}) => {
    const response = await api.get('/search', {
      params: { query, ...filters },
    })
    return response.data
  },
  
  getPriceHistory: async (productId) => {
    const response = await api.get(`/products/${productId}/price-history`)
    return response.data
  },
}

// ==================== SEARCH SUGGESTIONS API ====================
export const searchAPI = {
  getSuggestions: async (query) => {
    if (!query || query.length < 2) return []
    const response = await api.get('/search/suggestions', {
      params: { query },
    })
    return response.data
  },
}

// ==================== FAVORITES APIs ====================
export const favoritesAPI = {
  getAll: async () => {
    const response = await api.get('/favorites')
    return response.data
  },
  
  add: async (productId) => {
    const response = await api.post(`/favorites/${productId}`)
    return response.data
  },
  
  remove: async (productId) => {
    const response = await api.delete(`/favorites/${productId}`)
    return response.data
  },
  
  check: async (productId) => {
    const response = await api.get(`/favorites/${productId}/check`)
    return response.data
  },
}

export default api

