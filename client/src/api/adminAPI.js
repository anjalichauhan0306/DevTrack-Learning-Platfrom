import axios from "axios";
import axiosInstance from "./axiosInstance";
import { serverURL } from "../App";

export const getAllCourseByAdmin =  async () => {
    try {
        const result = await axiosInstance.get(serverURL + "/admin/courses" , {withCredentials:true});
        return result.data;
    } catch (error) {
        console.log(error);
    }
}

export const analyticsByAdmin =  async () => {
    try {
        const result = await axiosInstance.get(serverURL + "/admin/analytics" , {withCredentials:true});
        return result.data;
    } catch (error) {
        console.log(error);
    }
}


export const AllUsersByAdmin =  async () => {
    try {
        const result = await axiosInstance.get(serverURL + "/admin/users" , {withCredentials:true});
        return result.data;
    } catch (error) {
        console.log(error);
    }
}

export const blockUser = async (userId, isActive) => {
  try {
    const response = await axios.patch(
      `${serverURL}/api/admin/user/${userId}`,
      { isActive },
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to update status" };
  }
};





