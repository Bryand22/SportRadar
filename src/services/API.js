import axios from 'axios';

const api = axios.create({
    // Vérifie bien que c'est VITE_API_URL pour Netlify
    baseURL: import.meta.env.VITE_API_URL || 'https://sportradar2.onrender.com',
});

// Intercepteur pour injecter le token JWT
api.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
});

export default {
    // Auth
    login: (data) => api.post('/api/auth/login', data),
    register: (data) => api.post('/api/auth/register', data),
    getMe: () => api.get('/api/auth/me'),

    // Activities
    getActivities: () => api.get('/api/activities'),
    createActivity: (data) => api.post('/api/activities', data),
    deleteActivity: (id) => api.delete(`/api/activities/${id}`),

    // Challenges
    getChallenges: () => api.get('/api/challenges'),
    createChallenge: (data) => api.post('/api/challenges', data),

    // Employees
    getEmployees: () => api.get('/api/employees'),
    addEmployee: (data) => api.post('/api/employees', data),
};
