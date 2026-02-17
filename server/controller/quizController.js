import { Quiz } from "../model/quizModel.js";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import Course from "../model/courseModel.js";
dotenv.config();

const genAI = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export const generateQuiz = async (req, res) => {
  let newQuiz;

  try {
    const { courseId } = req.params;

    if (!courseId) {
      return res.status(400).json({ message: "Course ID missing" });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // ✅ Prevent regenerate
    const existQuiz = await Quiz.findOne({
      userId: req.user.id,
      courseId,
    });

    if (existQuiz && existQuiz.questions?.length > 0) {
      return res.status(400).json({
        message: "Quiz already generated",
      });
    }

    newQuiz = await Quiz.create({
      userId: req.user.id,
      courseId,
      questions: [],
    });

    const prompt = `
Generate 10 technical multiple choice questions for the course titled:

"${course.title}"

Return ONLY valid JSON in this format:

{
  "questions": [
    {
      "question": "String",
      "options": ["String","String","String","String"],
      "correctAnswer": "String",
      "explanation": "String"
    }
  ]
}

No extra text.
`;

    const result = await genAI.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
    });

    const text = result.text;

    const cleanText = text
      .replace(/```json/gi, "")
      .replace(/```/g, "")
      .trim();

    let parsed;

    try {
      parsed = JSON.parse(cleanText);
    } catch (err) {
      await Quiz.findByIdAndDelete(newQuiz._id);
      return res.status(500).json({
        message: "AI returned invalid JSON",
      });
    }

    const generatedQuestions = parsed.questions || [];

    if (!Array.isArray(generatedQuestions) || generatedQuestions.length === 0) {
      await Quiz.findByIdAndDelete(newQuiz._id);
      return res.status(500).json({
        message: "No questions generated",
      });
    }

    newQuiz.questions = generatedQuestions;
    await newQuiz.save();

    return res.status(201).json({
      message: "Final course quiz generated",
      quiz: newQuiz,
    });

  } catch (error) {
    if (newQuiz) {
      await Quiz.findByIdAndDelete(newQuiz._id);
    }
    return res.status(500).json({
      message: "Quiz generation failed",
    });
  }
};


/* ======================================
   GET QUIZ
====================================== */
export const getQuiz = async (req, res) => {
  try {
    const { courseId } = req.params;

    const quiz = await Quiz.findOne({
      userId: req.user.id,
      courseId,
    });

    if (!quiz) {
      return res.status(404).json({
        message: "Quiz not found",
      });
    }

    return res.status(200).json({ quiz });

  } catch (error) {
    return res.status(500).json({
      message: "Server error",
    });
  }
};

/* ======================================
   SUBMIT QUIZ
====================================== */
export const submitQuiz = async (req, res) => {
  try {
    const { quizId, answers } = req.body;

    if (!quizId || !answers) {
      return res.status(400).json({
        message: "Missing data",
      });
    }

    const quiz = await Quiz.findById(quizId);

    if (!quiz) {
      return res.status(404).json({
        message: "Quiz not found",
      });
    }

    let score = 0;
    const total = quiz.questions.length;

    quiz.questions.forEach((q, index) => {
      const userAnswer = answers.find(
        (a) => a.questionIndex === index
      );

      if (
        userAnswer &&
        userAnswer.selectedAnswer === q.correctAnswer
      ) {
        score++;
      }
    });

    quiz.attempts.push({
      score,
      total,
    });

    await quiz.save();

    return res.status(200).json({
      message: "Quiz submitted",
      score,
      total,
      percentage: Math.round((score / total) * 100),
    });

  } catch (error) {
    return res.status(500).json({
      message: "Submission failed",
    });
  }
};
