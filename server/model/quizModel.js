import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  options: {
    type: [String],
    required: true,
  },
  correctAnswer: {
    type: String,
    required: true,
  },
  explanation: {
    type: String,
  },
});

const attemptSchema = new mongoose.Schema({
  score: Number,
  total: Number,
  attemptedAt: {
    type: Date,
    default: Date.now,
  },
});

const QuizSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    questions: [questionSchema],
    attempts: [attemptSchema],
  },
  { timestamps: true }
);

export const Quiz = mongoose.model("Quiz", QuizSchema);
