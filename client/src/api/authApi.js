import axiosInstance from "./axiosInstance";

export const loginUser = (data) =>
  axiosInstance.post("/auth/login", data).then(res => res.data);

export const signupUser = (data) =>
  axiosInstance.post("/auth/signup", data).then(res => res.data);

export const googleAuth = (data) =>
  axiosInstance.post("/auth/googleauth", data).then(res => res.data);

export const logoutUser = () =>
  axiosInstance.post("/auth/logout").then(res => res.data);

export const sendOtpApi = (email) =>
  axiosInstance.post("/auth/sendotp", { email }).then(res => res.data);

export const verifyOtpApi = (email, otp) =>
  axiosInstance.post("/auth/verifyotp", { email, otp }).then(res => res.data);

export const resetPasswordApi = (email, password) =>
  axiosInstance.post("/auth/resetpassword", { email, password }).then(res => res.data);

export const updateProfile = (formData) =>
  axiosInstance.post("/user/profile", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  })