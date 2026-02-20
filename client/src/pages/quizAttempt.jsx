import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  FiClock, FiCheckCircle, FiAlertTriangle, 
  FiArrowRight, FiInfo, FiRotateCcw, FiLogOut 
} from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { serverURL } from "../App";
import axios from "axios";
import { setQuizData } from "../redux/quizSlice";
import { toast } from "react-toastify";

const QuizAttempt = () => {
  const { courseId } = useParams(); 
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { quizData } = useSelector(state => state.quiz);

  // --- States ---
  const [attemptsLeft, setAttemptsLeft] = useState(3); 
  const [quizStarted, setQuizStarted] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const [timeLeft, setTimeLeft] = useState(600);
  const [selectedOptions, setSelectedOptions] = useState({});

  const totalQuestions = quizData?.questions?.length || 0;

  // --- Fetch Quiz ---
  useEffect(() => {
    if (!courseId) return;

    const getQuiz = async () => {
      try {
        const result = await axios.get(
          `${serverURL}/api/quiz/getquiz/${courseId}`,
          { withCredentials: true }
        );
        dispatch(setQuizData(result.data.quiz));
      } catch (error) {
        console.log(`No quiz found for course ID: ${error}`);
      }
    };
    getQuiz();
  }, [courseId, dispatch]);

  // --- Timer ---
  useEffect(() => {
    if (quizStarted && timeLeft > 0 && !isSubmitted) {
      const timer = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && quizStarted) {
      handleSubmit();
    }
  }, [timeLeft, isSubmitted, quizStarted]);

  // --- Option Select ---
  const handleOptionSelect = (qIndex, optIndex) => {
    if (isSubmitted) return;
    setSelectedOptions(prev => ({ ...prev, [qIndex]: optIndex }));
  };

  // --- Submit Quiz ---
  const handleSubmit = async () => {
    if (!quizData) return;

    let finalScore = 0;
    quizData.questions.forEach((q, idx) => {
      if (selectedOptions[idx] === q.correctAnswer) finalScore += 1;
    });

    const formattedAnswers = Object.entries(selectedOptions).map(([qIndex, optIndex]) => ({
      questionIndex: Number(qIndex),
      selectedAnswer: optIndex
    }));
    
      const MAX_ATTEMPTS = 13;

    try {
      const result = await axios.post(`${serverURL}/api/quiz/submit`, {
        quizId: quizData._id,
        answers: formattedAnswers,
        score: finalScore,

      }, { withCredentials: true });
      console.log("Submit Quiz Result:", result.data);
      setScore(finalScore);
      setPercentage(totalQuestions ? Math.round((finalScore / totalQuestions) * 100) : 0);
      setAttemptsLeft(Math.max(0, MAX_ATTEMPTS - (quizData?.attempts?.length || 0)));
      setIsSubmitted(true);
      setShowConfirm(false);

      if (result.data.quiz) dispatch(setQuizData(result.data.quiz));

    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to submit quiz. Please try again.");
      console.error("Failed to submit quiz:", err);
    }
  };

  // --- 1. PRE-QUIZ INSTRUCTION SCREEN ---
  if (!quizStarted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6 font-sans">
        <div className="max-w-2xl w-full bg-white rounded-[2.5rem] shadow-xl p-10 border border-gray-100">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-4 bg-indigo-600 rounded-2xl text-white shadow-lg shadow-indigo-100">
              <FiInfo size={30} />
            </div>
            <div>
              <h1 className="text-2xl font-black text-gray-900 uppercase">Final Exam Rules</h1>
              <p className="text-sm text-gray-400 font-bold uppercase tracking-widest">Course ID: {courseId}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 text-sm font-bold">
            <div className="bg-gray-50 p-4 rounded-2xl flex items-center gap-3 border border-gray-100 text-gray-600">
              <FiClock className="text-indigo-600" /> Duration: 10 Minutes
            </div>
            <div className="bg-gray-50 p-4 rounded-2xl flex items-center gap-3 border border-gray-100 text-gray-600">
              <FiCheckCircle className="text-emerald-600" /> Passing Score: 7/10
            </div>
            <div className={`p-4 rounded-2xl flex items-center gap-3 border ${attemptsLeft > 0 ? 'bg-orange-50 border-orange-100 text-orange-600' : 'bg-red-50 border-red-100 text-red-600'}`}>
              <FiAlertTriangle /> Attempts Left: {quizData?.attempts ? Math.max(0, 13 - quizData.attempts.length) : 13}
            </div>
          </div>

          <ul className="space-y-3 text-gray-500 text-sm mb-10 list-disc px-5 font-medium">
            <li>Multiple questions are displayed simultaneously (Double Layout).</li>
            <li>Once submitted, you cannot modify your answers.</li>
            <li>Certificate unlocks only if you score 70% or higher.</li>
            <li>Do not refresh the page; it may result in an automatic submission.</li>
          </ul>

          <div className="flex gap-4">
            <button onClick={() => navigate(-1)} className="flex-1 py-4 bg-gray-100 text-gray-600 rounded-2xl font-bold hover:bg-gray-200 transition-all">Go Back</button>
            <button 
              disabled={attemptsLeft <= 0}
              onClick={() => setQuizStarted(true)} 
              className={`flex-1 py-4 rounded-2xl font-bold text-white shadow-lg transition-all ${attemptsLeft > 0 ? 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-100 active:scale-95' : 'bg-gray-300 cursor-not-allowed text-gray-500'}`}
            >
              {attemptsLeft > 0 ? "Start Final Exam" : "No Attempts Left"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --- 2. POST-QUIZ RESULT SCREEN ---
  if (isSubmitted) {
    const passed = percentage >= 70; // use percentage instead of fixed score
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-6">
        <div className="max-w-lg w-full text-center">
          <div className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-6 shadow-2xl ${passed ? 'bg-emerald-500 text-white shadow-emerald-200' : 'bg-red-500 text-white shadow-red-200'}`}>
            {passed ? <FiCheckCircle size={50} /> : <FiAlertTriangle size={50} />}
          </div>
          <h2 className="text-4xl font-black mb-2 text-gray-900">{passed ? "EXAM PASSED!" : "EXAM FAILED"}</h2>
          <p className="text-gray-400 font-bold mb-2 uppercase tracking-widest">
            Correct Answers: {quizData?.attempts[quizData?.attempts.length - 1]?.score || 0} / {totalQuestions}
          </p>
          <p className="text-gray-400 font-bold mb-8 uppercase tracking-widest">
            Percentage: {percentage}%
          </p>
          
          <div className="flex flex-col gap-4">
            <button onClick={() => navigate(`/viewlecture/${courseId}`)} className="py-4 bg-gray-900 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-black transition-all shadow-xl">
              <FiLogOut /> Return to Course
            </button>
            {!passed && attemptsLeft > 0 && (
              <button 
                onClick={() => { setIsSubmitted(false); setQuizStarted(false); setTimeLeft(600); setSelectedOptions({}); }} 
                className="py-4 bg-indigo-50 text-indigo-600 border border-indigo-100 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-indigo-100 transition-all"
              >
                <FiRotateCcw /> Retake Exam ({attemptsLeft} attempts remaining)
              </button>
            )}
            {!passed && attemptsLeft <= 0 && (
              <p className="text-red-500 font-bold text-sm">Maximum attempts reached. Contact support if needed.</p>
            )}
          </div>
        </div>
      </div>
    );
  }

  // --- 3. LIVE QUIZ SCREEN ---
  return (
    <div className="min-h-screen bg-[#f8fafc] pb-20 font-sans">
      {/* STICKY HEADER */}
      <div className="bg-white sticky top-0 z-40 px-6 py-4 shadow-sm flex justify-between items-center">
        <div className="flex items-center gap-4">
          <h3 className="font-black text-gray-900 tracking-tighter">FINAL EXAM</h3>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-red-50 text-red-600 px-4 py-1.5 rounded-full font-mono font-bold border border-red-100 text-sm">
            <FiClock className="animate-pulse" /> 
            {Math.floor(timeLeft / 60)}:{timeLeft % 60 < 10 ? '0' : ''}{timeLeft % 60}
          </div>
          <button 
            onClick={() => setShowConfirm(true)} 
            className="bg-emerald-600 text-white px-8 py-1.5 rounded-full font-bold text-sm hover:bg-emerald-700 shadow-lg shadow-emerald-100 transition-all active:scale-95"
          >
            FINISH
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6 md:p-10">
        <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
          {quizData?.questions?.map((q, qIndex) => (
            <div key={qIndex} className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
              <div className="flex justify-between items-center mb-4">
                <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest underline decoration-2 underline-offset-4">Question {qIndex + 1}</span>
                {selectedOptions[qIndex] !== undefined && <FiCheckCircle className="text-emerald-500" />}
              </div>
              <h4 className="text-lg font-bold text-gray-800 mb-6 leading-tight h-auto md:h-14">{q.question}</h4>
              <div className="space-y-3">
                {q.options.map((opt, optIndex) => (
                  <button 
                    key={optIndex} 
                    onClick={() => handleOptionSelect(qIndex, optIndex)}
                    className={`w-full p-4 rounded-2xl text-left text-sm font-bold border-2 transition-all flex items-center justify-between ${
                      selectedOptions[qIndex] === optIndex 
                      ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg' 
                      : 'bg-gray-50 border-transparent text-gray-500 hover:border-indigo-200'
                    }`}
                  >
                    {opt}
                    <div className={`h-4 w-4 rounded-full border-2 ${selectedOptions[qIndex] === optIndex ? 'bg-white border-white' : 'border-gray-200'}`}></div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CONFIRMATION MODAL */}
      {showConfirm && (
        <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-md z-50 flex items-center justify-center p-6">
          <div className="bg-white rounded-[2.5rem] p-10 max-w-sm w-full text-center shadow-2xl border border-gray-100">
            <div className="bg-orange-100 text-orange-600 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 transform rotate-12"><FiAlertTriangle size={35} /></div>
            <h3 className="text-2xl font-black mb-3 text-gray-900">Finish Exam?</h3>
            <p className="text-gray-400 text-sm mb-8 font-medium leading-relaxed">
              You have answered {Object.keys(selectedOptions).length} of {totalQuestions} questions. Do you want to submit?
            </p>
            <div className="flex flex-col gap-3">
              <button onClick={handleSubmit} 
                className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-bold shadow-lg shadow-emerald-100 hover:bg-emerald-700 transition-all"
              >
                Yes, Submit My Answers
              </button>
              <button onClick={() => setShowConfirm(false)} className="w-full py-3 bg-gray-50 rounded-2xl font-bold text-gray-400 hover:text-gray-600 transition-all">
                Keep Reviewing
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizAttempt;
