import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000', 
    withCredentials: true, // NECESSÁRIO para Sanctum
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

export default api;
