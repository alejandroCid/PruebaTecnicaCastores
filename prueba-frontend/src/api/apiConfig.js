import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:8080/'
    //baseURL: 'https://xt77whw4-8080.usw3.devtunnels.ms/'
});

// Interceptor para enviar el Bearer Token en cada petición
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default api;