import axios from 'axios';

// 🚨 MODIFICATION ICI : On force l'adresse de Render.
// On ne laisse plus le choix au système.
const api = axios.create({
    baseURL: 'https://sportradar2.onrender.com',
    headers: {
        'Content-Type': 'application/json'
    }
});

// Intercepteur pour injecter le token JWT
api.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

// On exporte les fonctions prêtes à l'emploi
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
