import axios from "axios";
import { serverURL } from "../App";
import axiosInstance from "./axiosInstance";

export const searchCourses = async (query) => {
  try {
    const res = await axios.post(
      `${serverURL}/api/course/search`,
      { input: query },
      { withCredentials: true }
    );
    return res.data;
  } catch (error) {
    console.error("Search API failed:", error);
    throw error;
  }
};


// Fetch creator details
export const getCreator = async (creatorId) => {
  const res = await axios.post(
    `${serverURL}/api/course/creator`,
    { userId: creatorId },
    { withCredentials: true }
  );
  return res.data;
};

// Enroll in paid course
export const enrollPaidCourse = async (courseId, userId) => {
  const res = await axios.post(
    `${serverURL}/api/payment/create-checkout-session`,
    { courseId, userId },
    { withCredentials: true }
  );
  return res.data; // contains redirect URL
};

// Verify payment session
export const verifyPaymentSession = async (sessionId) => {
  const res = await axios.post(
    `${serverURL}/api/payment/verify-checkout`,
    { sessionId },
    { withCredentials: true }
  );
  return res.data;
};

// Enroll free course
export const enrollFreeCourse = async (courseId, userId) => {
  const res = await axios.post(
    `${serverURL}/api/payment/free-enroll`,
    { courseId, userId },
    { withCredentials: true }
  );
  return res.data;
};

// Submit a review
export const submitReview = async (courseId, rating, comment) => {
  const res = await axios.post(
    `${serverURL}/api/review/createreview`,
    { courseId, rating, comment },
    { withCredentials: true }
  );
  return res.data;
};

export const downloadCertificateAPI = async (courseId, userId, score, totalQuestions) => {
  const res = await axios.post(
    `${serverURL}/api/course/certificate/${courseId}`,
    { userId, score, totalQuestions },
    { withCredentials: true, responseType: "blob" }
  );
  return res.data; 
};

export const markLectureComplete = async (courseId, lectureId, totalLectures) => {
  const res = await axios.post(
    `${serverURL}/api/user/updateprogress`,
    { courseId, lectureId, totalLectures },
    { withCredentials: true }
  );
  return res.data; 
};