import axiosInstance from "./axiosInstance";

export const loginUser = (data) => axiosInstance.post('/auth/login', data);
export const signupUser = (data) => axiosInstance.post('/auth/signup', data);
export const googleAuth = (data) => axiosInstance.post('/auth/googleauth', data);