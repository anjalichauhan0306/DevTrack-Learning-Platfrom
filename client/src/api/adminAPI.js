import axiosInstance from "./axiosInstance";

export const getAllCourseByAdmin = () =>
  axiosInstance.get("/admin/courses").then(res => res.data);

export const analyticsByAdmin = () =>
  axiosInstance.get("/admin/analytics").then(res => res.data);

export const AllUsersByAdmin = () =>
  axiosInstance.get("/admin/users").then(res => res.data);

export const blockUser = (userId, isActive) =>
  axiosInstance.patch(`/admin/user/${userId}`, { isActive })
  .then(res => res.data);