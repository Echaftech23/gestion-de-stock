import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://192.168.1.17:3000',
    timeout: 10000,
});

// Request interceptor
axiosInstance.interceptors.request.use(
    (config) => {        
        return config;
    },
    (error) => {
        console.error('errrr', error)
        return Promise.reject(error);
    }
);

// Response interceptor
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        console.error('errrr', error)
        return Promise.reject(error);
    }
);

export default axiosInstance;