import axios from 'axios';

const API_URL = 'http://localhost:8080';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // ADD THIS FOR COOKIE AUTH
});

// Request interceptor
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => Promise.reject(error));

// Response interceptor
api.interceptors.response.use(response => response, error => {
  if (error.response?.status === 401) {
    // Handle token expiration
    localStorage.removeItem('token');
    window.location.href = '/login';
  }
  
  return Promise.reject({
    message: error.response?.data?.message || 'Request failed',
    status: error.response?.status || 0,
    data: error.response?.data
  });
});

// Auth API
export const authAPI = {
  login: (username, password) => api.post('/login', { username, password }), // Use specific auth endpoint
  register: (username, password) => api.post('/register', { username, password }),
};

// Watchlist API
export const watchlistAPI = {
  getWatchlist: () => api.get('/movies'), // Better endpoint naming
  addToWatchlist: (movie) => api.post('/movies', movie),
  removeFromWatchlist: (id) => api.delete(`/movies/${id}`),
};

export default api;