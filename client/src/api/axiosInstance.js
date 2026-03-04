import axios from 'axios';
import { serverURL } from '../App';

const axiosInstance = axios.create({
  baseURL: "https://devtrack-cla8.onrender.com/api",
  timeout: 10000, 
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials : true
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      console.log('Session expired, logging out...');
      localStorage.removeItem('token');
      window.location.href = '/login'; 
    }
    
    return Promise.reject(error);
  }
);

export default axiosInstance;