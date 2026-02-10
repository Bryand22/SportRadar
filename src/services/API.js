import axios from 'axios';

const api = axios.create({
    // On garde l'adresse de base de Render
    baseURL: 'https://sportradar2.onrender.com',
    headers: {
        'Content-Type': 'application/json'
    }
});

// Intercepteur pour le token
api.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

// On exporte l'instance 'api' elle-même pour le Context
// ET les fonctions raccourcies
export const apiInstance = api;

export default {
    // Auth - Vérifie bien si ton backend utilise /api/auth ou juste /auth
    login: (data) => api.post('/api/auth/login', data),
    register: (data) => api.post('/api/auth/register', data),
    getMe: () => api.get('/api/auth/me'),

    // Activités
    getActivities: () => api.get('/api/activities'),
    createActivity: (data) => api.post('/api/activities', data),
    
    // On exporte aussi l'objet api pour qu'il soit utilisable partout
    api
};
