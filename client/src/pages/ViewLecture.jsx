import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { serverURL } from "../App";
import {
  FiArrowLeft,
  FiPlayCircle,
  FiBookOpen,
  FiAward,
  FiLock,
  FiCheckCircle,
  FiFileText,
  FiUser,
} from "react-icons/fi";
import { setQuizData } from "../redux/quizSlice";
import { setUserData } from "../redux/userSlice";

const ViewLecture = () => {
  const { courseId } = useParams();
  const { courseData } = useSelector((state) => state.course);
  const { quizData } = useSelector((state) => state.quiz);
  const { userData } = useSelector((state) => state.user);
  const [isMarked, setIsMarked] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const selectedCourse = courseData?.find((course) => course._id === courseId);
  const [creatorData, setCreatorData] = useState(null);
  const [selectedLecture, setSelectedLecture] = useState(
    selectedCourse?.lectures?.[0] || null,
  );
  

  const videoRef = useRef(null);
  const [notes, setNotes] = useState("");
  const [quizScore, setQuizScore] = useState(0);

const courseProgress = userData.completedLectures?.find(c => c.courseId === courseId);
const coursePercent = courseProgress 
  ? Math.round((courseProgress.lectureIds.length / (selectedCourse?.lectures?.length || 1)) * 100) 
  : 0;
  const completedLectures = courseProgress?.lectureIds?.length || 0;
  const totalLectures = selectedCourse?.lectures?.length || 0;
  const isCourseFinished = coursePercent === 100;

  const quizAttempts = quizData?.attempts?.length || 0;
  const isCertificateUnlocked =
  isCourseFinished && 
  quizData?.questions?.length > 0 && // quiz loaded
  quizScore >= Math.ceil(quizData.questions.length * 0.7);

  const handleTimeUpdate = async () => {
  const video = videoRef.current;
  if (!video || !selectedLecture) return;
  const percent = (video.currentTime / video.duration) * 100;
   if (percent > 90) { 
    try {
      const response = await axios.post(
        `${serverURL}/api/user/updateprogress`,
        {
          courseId,
          lectureId: selectedLecture._id,
          totalLectures: selectedCourse.lectures.length,
        },
        { withCredentials: true },
      );
      dispatch(setUserData(response.data.user)); 
    } catch (err) {
      console.error("Failed to mark lecture completed", err);
    }
  }
};
  
  const courseQuizAvailable = quizData?.questions?.length > 0;

  useEffect(() => {
    if (!courseId) return;

    const getQuiz = async () => {
      try {
        const result = await axios.get(
          `${serverURL}/api/quiz/getquiz/${courseId}`,
          { withCredentials: true },
        );
        const quiz = result.data.quiz;

        if (quiz) {
          const attempts = quiz.attempts || [];
          const bestScore =
            attempts.length > 0 ? Math.max(...attempts.map((a) => a.score)) : 0;

          setQuizScore(bestScore);
        }
        dispatch(setQuizData(quiz));
        console.log(result.data);
      } catch (error) {
        console.error("Error fetching quiz:", error);
        console.log("No quiz found");
      }
    };
    getQuiz();
  }, [courseId, dispatch]);

  const downloadCertificate = async () => {

    if(!isCertificateUnlocked) {
      alert("Certificate not unlocked yet! Score at least 7/10 in the final exam to unlock.");
      return;
    }

    try {
      const response = await axios.post(
        `${serverURL}/api/course/certificate/${courseId}`,
        { userId: userData._id  ,
          score: quizScore,
          totalQuestions: quizData?.questions?.length || 0,
        },
        {
          withCredentials: true,
          responseType: "blob",
        },
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `certificate_${courseId}.pdf`);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error("Certificate Download Error:", error);
      }
  };


  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* HEADER */}
      <header className="bg-white  sticky top-0 z-30 px-6 py-4 shadow-sm">
        <div className="max-w-400 mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/")}
              className="p-2 hover:bg-gray-100 rounded-xl transition-all"
            >
              <FiArrowLeft className="text-xl" />
            </button>
            <h1 className="text-xl font-extrabold text-gray-900 hidden md:block">
              {selectedCourse?.title}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-end">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                Overall Progress
              </span>
              <span className="text-lg font-black text-blue-600">
                {coursePercent}%
              </span>
            </div>
            <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden border border-gray-200">
              <div
                className="bg-blue-600 h-full transition-all duration-1000"
                style={{ width: `${coursePercent}%` }}
              ></div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-400 mx-auto p-4 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
          <div className="bg-black rounded-4xl overflow-hidden shadow-2xl aspect-video border-8 border-white">
            {selectedLecture?.videoUrl ? (
              <video
                key={selectedLecture.videoUrl}
                className="w-full h-full"
                src={selectedLecture.videoUrl}
                controls
                onTimeUpdate={handleTimeUpdate}
                ref={videoRef}
              />
            ) : (
              <div className="h-full flex items-center justify-center text-white/20">
                <FiPlayCircle size={80} />
              </div>
            )}
          </div>
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
            <div className="mb-6">
              <h2 className="text-2xl font-black text-gray-900 mb-2">
                {selectedLecture?.lectureTitle}
              </h2>
              <p className="text-gray-500 leading-relaxed">
                {selectedLecture?.description ||
                  "No description provided for this lecture."}
              </p>
            </div>
            <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-200">
              <h2 className="text-xl font-black mb-6 flex items-center gap-2">
                <FiAward className="text-blue-600" /> Course Completion &
                Rewards
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div
                  className={`p-6 rounded-2xl border-2 transition-all ${isCourseFinished ? "bg-orange-50 border-orange-200 shadow-md" : "bg-gray-50 border-gray-100 opacity-60"}`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div
                      className={`p-3 rounded-xl ${isCourseFinished ? "bg-orange-500 text-white" : "bg-gray-300 text-gray-500"}`}
                    >
                      <FiFileText className="text-2xl" />
                    </div>
                    {!isCourseFinished && <FiLock className="text-gray-400" />}
                  </div>
                  <h3 className="font-bold text-lg">Final Exam</h3>
                  <p className="text-xs text-gray-500 mb-4">
                    Complete 100% of the course to unlock the exam. (Max 5
                    attempts)
                  </p>

                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold text-orange-700">
                      Attempts: {quizAttempts}/5
                    </span>
                    {isCourseFinished && (
                      <span className="text-xs font-bold text-green-600">
                        Unlocked!
                      </span>
                    )}
                  </div>

                  <button
                    disabled={
                      !isCourseFinished || quizAttempts >= 5 || !courseQuizAvailable
                    }
                    onClick={() => {
                      if(courseQuizAvailable) {
                        navigate(`/quiz-attempt/${courseId}`);
                      }
                    }}
                    className={`w-full py-3 rounded-xl font-bold text-sm transition-all shadow-lg ${
                      !isCourseFinished
                        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                        : quizAttempts >= 5
                          ? "bg-red-100 text-red-500 cursor-not-allowed"
                          : !courseQuizAvailable
                            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                            : "bg-orange-500 text-white hover:bg-orange-600 hover:-translate-y-1"
                    }`}
                  >
                    {!isCourseFinished
                      ? "Complete Course First"
                      : quizAttempts >= 5
                        ? "Revise Course to Retry"
                        : !courseQuizAvailable
                          ? "Exam Not Available"
                          : "Start Final Exam"}
                  </button>
                </div>
                <div
                  className={`p-6 rounded-2xl border-2 transition-all ${isCertificateUnlocked ? "bg-emerald-50 border-emerald-200 shadow-md" : "bg-gray-50 border-gray-100 opacity-60"}`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div
                      className={`p-3 rounded-xl ${isCertificateUnlocked ? "bg-emerald-500 text-white" : "bg-gray-300 text-gray-500"}`}
                    >
                      <FiAward className="text-2xl" />
                    </div>
                    {!isCertificateUnlocked && (
                      <FiLock className="text-gray-400" />
                    )}
                  </div>
                  <h3 className="font-bold text-lg">Certificate</h3>
                  <p className="text-xs text-gray-500 mb-4">
                    Required: Score 7/10 or higher in Final Exam.
                  </p>

                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold text-emerald-700">
                      Best Score: {quizScore}/
                      {quizData?.questions?.length || 10}
                    </span>
                    {isCertificateUnlocked && (
                      <FiCheckCircle className="text-emerald-600" />
                    )}
                  </div>

                  <button
                    disabled={!isCertificateUnlocked}
                    onClick={downloadCertificate}
                    className={`w-full py-3 rounded-xl font-bold text-sm transition-all shadow-lg ${
                      isCertificateUnlocked
                        ? "bg-emerald-600 text-white hover:bg-emerald-700 hover:-translate-y-1"
                        : "bg-gray-200 text-gray-400 cursor-not-allowed border border-gray-300"
                    }`}
                  >
                    {isCertificateUnlocked ? "Download Certificate" : "Locked"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="p-6 border-b bg-gray-50/50 flex justify-between items-center">
              <h3 className="font-black text-sm uppercase tracking-tighter flex items-center gap-2">
                <FiBookOpen className="text-blue-600" /> Course Content
              </h3>
              <span className="text-xs font-bold text-gray-400">
                {completedLectures}/{totalLectures}
              </span>
            </div>
            <div className="max-h-125 overflow-y-auto p-4 space-y-3">
              {selectedCourse?.lectures?.map((lecture, index) => {
                const completed = userData.completedLectures
                  .find((c) => c.courseId === courseId)
                  ?.lectureIds.includes(lecture._id);
                  const isActive = (lec) => selectedLecture?._id === lecture._id;
                return (
                  <button
                    key={index}
                    onClick={() => setSelectedLecture(lecture)}
                    className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all ${
                      isActive(lecture)
                        ? "bg-blue-600 text-white shadow-lg"
                        : "hover:bg-gray-50 bg-white border border-gray-100"
                    }`}
                  >
                    <div
                      className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold ${
                        isActive(lecture)
                          ? "bg-white/20"
                          : completed
                            ? "bg-green-500 text-white"
                            : "bg-gray-100 text-gray-400"
                      }`}
                    >
                      {completed ? "✓" : index + 1}
                    </div>
                    <span className="flex-1 text-left text-sm font-bold truncate">
                      {lecture.lectureTitle}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
              <FiUser /> Your Instructor
            </h3>
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-2xl bg-linear-to-br from-blue-500 to-indigo-700 flex items-center justify-center text-white text-2xl font-black shadow-lg shadow-blue-100">
                {creatorData?.name?.charAt(0) || "I"}
              </div>
              <div>
                <h4 className="font-bold text-gray-900">
                  {creatorData?.name || "Instructor Name"}
                </h4>
                <p className="text-xs text-blue-600 font-semibold">
                  Senior Course Mentor
                </p>
              </div>
            </div>
            <div className="mt-4 p-3 bg-blue-50 rounded-xl text-[11px] text-blue-700 leading-relaxed font-medium">
              Professional mentor helping you master this course with
              step-by-step guidance.
            </div>
          </div>
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-sm font-bold mb-3">Quick Notes</h3>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Type something..."
              className="w-full bg-gray-50 border-none rounded-xl p-3 text-xs focus:ring-2 focus:ring-blue-100"
              rows="3"
            ></textarea>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ViewLecture;
