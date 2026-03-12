import axiosInstance from "./axiosInstance"; 

export const getQuizByCourse = async (courseId) => {
  try {
    const response = await axiosInstance.get(`/quiz/getquiz/${courseId}`, {
      withCredentials: true,
    });
    return response.data.quiz;
  } catch (error) {
    throw error.response?.data || { message: "Failed to fetch quiz" };
  }
};

export const submitQuiz = async (quizId, answers) => {
  try {
    const response = await axiosInstance.post(
      "/quiz/submit",
      { quizId, answers },
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Quiz submission failed" };
  }
};