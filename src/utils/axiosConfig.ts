import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000',
    withCredentials: true,
});

// Intercepteur pour gérer les erreurs
axiosInstance.interceptors.response.use(
    response => response,
    error => {
        console.error('Erreur API:', error);
        return Promise.reject(error);
    }
);

export default axiosInstance;