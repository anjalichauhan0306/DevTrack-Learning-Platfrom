import axiosInstance from "./axiosInstance";

export const loginUser = (data) => axiosInstance.post("/auth/login", data);
export const signupUser = (data) => axiosInstance.post("/auth/signup", data);
export const googleAuth = (data) => axiosInstance.post("/auth/googleauth", data);
export const logoutUser = async () => {
  try {
    const response = await axiosInstance.post("/auth/logout");
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Logout failed" };
  }
};

export const sendOtpApi = async (email) => {
  try {
    const response = await axiosInstance.post("/auth/sendotp", { email });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to send OTP" };
  }
};

export const verifyOtpApi = async (email, otp) => {
  try {
    const response = await axiosInstance.post("/auth/verifyotp", { email, otp });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "OTP verification failed" };
  }
};

export const resetPasswordApi = async (email, password) => {
  try {
    const response = await axiosInstance.post("/auth/resetpassword", { email, password });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Password reset failed" };
  }
};

export const updateProfile = async (formData) => {
  try {
    const response = await axiosInstance.post("/user/profile", formData, {
      withCredentials: true,
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Profile update failed" };
  }
};