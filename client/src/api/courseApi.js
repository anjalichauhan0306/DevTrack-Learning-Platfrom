import axiosInstance from "./axiosInstance";

export const searchCourses = (query) =>
  axiosInstance.post("/course/search", { input: query });

export const getCreator = (creatorId) =>
  axiosInstance.post("/course/creator", { userId: creatorId });

export const enrollPaidCourse = (courseId, userId) =>
  axiosInstance.post("/payment/create-checkout-session", { courseId, userId });

export const verifyPaymentSession = (sessionId) =>
  axiosInstance.post("/payment/verify-checkout", { sessionId });

export const enrollFreeCourse = (courseId, userId) =>
  axiosInstance.post("/payment/free-enroll", { courseId, userId });

export const submitReview = (courseId, rating, comment) =>
  axiosInstance.post("/review/createreview", { courseId, rating, comment });

export const downloadCertificateAPI = (courseId, userId, score, totalQuestions) =>
  axiosInstance.post(
    `/course/certificate/${courseId}`,
    { userId, score, totalQuestions },
    { responseType: "blob" }
  );

export const markLectureComplete = (courseId, lectureId, totalLectures) =>
  axiosInstance.post("/user/updateprogress", {
    courseId,
    lectureId,
    totalLectures,
  });

export const createCourse = (data) =>
  axiosInstance.post("/course/create", data);

export const deleteCourse = (courseId) =>
  axiosInstance.delete(`/course/delete/${courseId}`, { withCredentials: true })
    .then(res => res.data);


export const createLecture = (courseId, lectureTitle) =>
  axiosInstance.post(`/course/createlecture/${courseId}`, { lectureTitle });

export const deleteLecture = (lectureId) =>
  axiosInstance.delete(`/course/deletelecture/${lectureId}`);

export const getCourseLectures = (courseId) =>
  axiosInstance.get(`/course/courselecture/${courseId}`);

export const getEnrolled = () =>
  axiosInstance.get(`/course/getenrolled`).then(res => res.data)

export const updateLecture = (courseId, lectureId, formData, onUploadProgress) =>
  axiosInstance.post(
    `/course/editlecture/${courseId}/${lectureId}`,
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
       timeout: 0,
      onUploadProgress,
    }
  ).then(res => res.data);


  export const updateCourse = (courseId, formData) =>
  axiosInstance.post(
    `/course/editcourse/${courseId}`,
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
      timeout: 0,
      withCredentials: true,
    }
  ).then(res => res.data);