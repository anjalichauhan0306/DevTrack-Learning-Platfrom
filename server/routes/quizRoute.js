import express from "express";
import {
  generateQuiz,
  getQuiz,
  submitQuiz,
} from "../controller/quizController.js";

const router = express.Router();

router.post("/generate/:courseId", generateQuiz);
router.get("/:courseId", getQuiz);
router.post("/submit", submitQuiz);

export default router;
