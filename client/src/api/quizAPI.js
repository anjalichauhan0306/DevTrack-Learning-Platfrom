import axiosInstance from "./axiosInstance";

export const getQuizByCourse = (courseId) =>
  axiosInstance.get(`/quiz/getquiz/${courseId}`).then(res => res.data);

export const submitQuiz = (quizId, answers) =>
  axiosInstance.post("/quiz/submit", { quizId, answers }).then(res => res.data);

export const generateQuiz = (courseId) =>
  axiosInstance.post(`/quiz/generatequiz/${courseId}`);

export const updateQuiz = (quizId, questions) =>
  axiosInstance.post(`/quiz/updatequiz/${quizId}`, { questions });

export const deleteQuiz = (quizId) =>
  axiosInstance.post(`/quiz/deletequiz/${quizId}`);