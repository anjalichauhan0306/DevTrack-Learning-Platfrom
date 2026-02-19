import { Quiz } from "../model/quizModel.js";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import Course from "../model/courseModel.js";
import User from "../model/userModel.js";

dotenv.config();

const genAI = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

/* ======================================
   GENERATE QUIZ (AI)
====================================== */
export const generateQuiz = async (req, res) => {
  let newQuiz;

  try {
    const { courseId } = req.params;
    const userId = req.userId;

    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    if (!courseId)
      return res.status(400).json({ message: "Course ID missing" });

    const course = await Course.findById(courseId).populate("lectures quizzes");

    if (!course) return res.status(404).json({ message: "Course not found" });

    // Prevent duplicate quiz
    const existQuiz = await Quiz.findOne({ userId, courseId });
    if (existQuiz && existQuiz.questions?.length > 0) {
      return res.status(400).json({ message: "Quiz already generated" });
    }

    // Create empty quiz with correct userId
    newQuiz = await Quiz.create({ userId, courseId, questions: [] });

    // AI Prompt
    const prompt = `
Generate 10 technical multiple choice questions for the course titled:
genearate the questions based on the course title and the lecture titles of the course.  The questions should be in English. Each question should have 4 options and only 1 correct answer. Also provide a brief explanation for the correct answer. Format the response in JSON as shown below: "${course.title}"

quiz have must be hard level and should test the in depth understanding of the course content. 

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
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const text = result.text || "";
    const cleanText = text
      .replace(/```json/gi, "")
      .replace(/```/g, "")
      .trim();

    let parsed;
    try {
      parsed = JSON.parse(cleanText);
    } catch (err) {
      console.error("JSON Parse Error:", err, "AI Response:", cleanText);
      await Quiz.findByIdAndDelete(newQuiz._id);
      return res.status(500).json({ message: "AI returned invalid JSON" });
    }

    const generatedQuestions = parsed.questions || [];
    if (!Array.isArray(generatedQuestions) || generatedQuestions.length === 0) {
      await Quiz.findByIdAndDelete(newQuiz._id);
      return res.status(500).json({ message: "No questions generated" });
    }

    newQuiz.questions = generatedQuestions;
    await newQuiz.save();

   if (!course.quizzes) {
  course.quizzes = [];
}

course.quizzes.push(newQuiz._id);
await course.save();

    return res
      .status(201)
      .json({ message: "Final course quiz generated", quiz: newQuiz });

  } catch (error) {

    console.error("Generate Quiz Error:", error);
    if (newQuiz) await Quiz.findByIdAndDelete(newQuiz._id);
    return res
      .status(500)
      .json({ message: `Quiz generation failed: ${error.message}` });

  }
};

/* ======================================
   GET QUIZ
====================================== */
export const getQuizById = async (req, res) => {
  try {
    const { courseId } = req.params;
    const {quizId} = req.params;

    if(quizId){
      const quiz = await Quiz.findById(quizId);
      if (!quiz) return res.status(404).json({ message: "Quiz not found" });
      return res.status(200).json({ quiz });  
    }
    if(!quizId){
      return res.status(400).json({ message: "Quiz ID missing" });
    }
    
    const userId = req.userId;
    if (!courseId)
      return res.status(400).json({ message: "Course ID missing" });

    const quiz = await Quiz.findOne({ userId, courseId });
    if (!quiz) return res.status(404).json({ message: "Quiz not found" });

    return res.status(200).json({ quiz });
  } catch (error) {
    console.error("Get Quiz Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

/* ======================================
   SUBMIT QUIZ
====================================== */
export const submitQuiz = async (req, res) => {
  try {
    const { quizId, answers } = req.body;

    if (!quizId || !answers)
      return res.status(400).json({ message: "Missing data" });

    const quiz = await Quiz.findById(quizId);
    if (!quiz) return res.status(404).json({ message: "Quiz not found" });

    // Calculate score
    let score = 0;
    const total = quiz.questions.length;

    quiz.questions.forEach((q, index) => {
      const userAnswer = answers.find((a) => a.questionIndex === index);
      if (userAnswer && userAnswer.selectedAnswer === q.correctAnswer) score++;
    });

    // Record attempt
    quiz.attempts = quiz.attempts || [];
    quiz.attempts.push({ score, total, date: new Date() });

    await quiz.save();

    return res.status(200).json({
      message: "Quiz submitted successfully",
      score,
      total,
      percentage: Math.round((score / total) * 100),
    });
  } catch (error) {
    console.error("Submit Quiz Error:", error);
    return res.status(500).json({ message: "Submission failed" });
  }
};
