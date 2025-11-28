import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
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
    login: (data) => api.post('/auth/login', data),
    register: (data) => api.post('/auth/register', data),
    getMe: () => api.get('/auth/me'),

    // Activities
    getActivities: () => api.get('/activities'),
    createActivity: (data) => api.post('/activities', data),
    deleteActivity: (id) => api.delete(`/activities/${id}`),

    // Challenges
    getChallenges: () => api.get('/challenges'),
    createChallenge: (data) => api.post('/challenges', data),

    // Employees
    getEmployees: () => api.get('/employees'),
    addEmployee: (data) => api.post('/employees', data),
};