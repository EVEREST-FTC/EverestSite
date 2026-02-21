import axios from 'axios';

const api = axios.create({
  // Garanta que esta porta é a mesma onde o Spring Boot está rodando
  baseURL: 'http://localhost:3000', 
});

// Interceptor: Injeta o token em toda requisição se ele existir
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export {api};