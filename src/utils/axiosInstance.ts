import axios from 'axios';

// Create an Axios instance with a base URL
const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000/api',  // Set your API's base URL here
});

// Axios request interceptor to attach token to the Authorization header
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('authToken'); // Or wherever you store the token
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Axios response interceptor (optional) to handle errors or responses globally
axiosInstance.interceptors.response.use(
    (response) => {
        // Handle successful response
        return response;
    },
    (error) => {
        // Handle errors globally, e.g., logging out on 401
        if (error.response && error.response.status === 401) {
            // Handle unauthorized access, like redirect to login page
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
