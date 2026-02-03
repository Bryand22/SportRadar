import axios from 'axios';

const axiosInstance = axios.create({
    // Utilise VITE_API_URL pour correspondre à Netlify
    baseURL: import.meta.env.VITE_API_URL || 'https://sportradar2.onrender.com',
    withCredentials: true,
});

// Intercepteur pour gérer les erreurs
axiosInstance.interceptors.response.use(
    response => response,
    error => {
        // Petit tips : affiche l'URL qui a échoué pour débugger plus vite
        console.error('Erreur API sur:', error.config?.url, error);
        return Promise.reject(error);
    }
);

export default axiosInstance;
