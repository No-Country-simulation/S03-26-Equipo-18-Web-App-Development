import axios from 'axios';

const api = axios.create({
  // Aquí va la URL que pase el equipo de Backend
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;