import express from "express";
import { generateQuiz,  getQuizById, submitQuiz } from "../controller/quizController.js";
import isAuth  from "../middleware/isAuth.js";
const quizRouter = express.Router();


quizRouter.post("/generatequiz/:courseId", isAuth, generateQuiz);
quizRouter.get("/getquiz/:quizId", isAuth, getQuizById);
quizRouter.post("/submit", isAuth, submitQuiz);

export default quizRouter;
