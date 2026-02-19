import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setQuizData } from "../redux/quizSlice.js";
import { serverURL } from "../App";
import { useParams } from "react-router-dom";

const GetQuiz = () => {
  const dispatch = useDispatch();
  const { courseId } = useParams();

  useEffect(() => {
    if (!courseId) return; // 👈 important check

    const getQuiz = async () => {
      try {
        const result = await axios.get(
          `${serverURL}/api/quiz/getquiz/${courseId}`,
          { withCredentials: true }
        );

        dispatch(setQuizData([result.data.quiz]));
      } catch (error) {
        console.log("Quiz not found");
      }
    };

    getQuiz();
  }, [courseId, dispatch]);

  return null; // 👈 component kuch render nahi karega
};

export default GetQuiz;
