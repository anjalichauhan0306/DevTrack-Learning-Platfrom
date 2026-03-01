import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { setLectureData } from "../../redux/lectureSliece";
import img from "../../assets/logo.png";
import { serverURL } from "../../App";
import { toast } from "react-toastify";
import { FiAward } from "react-icons/fi";
import { setQuizData } from "../../redux/quizSlice";
import axios from "axios";
import {
  FiArrowLeft,
  FiPlus,
  FiTrash2,
  FiVideo,
  FiCheckCircle,
  FiEdit,
} from "react-icons/fi";

const CreateLecture = () => {
  const { quizData } = useSelector((state) => state.quiz);
  const [showPreview, setShowPreview] = useState(false);
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [editedQuiz, setEditedQuiz] = useState(null);
  const [quizLoading, setQuizLoading] = useState(false);
  const { courseId } = useParams();
  const [lectureTitle, setLectureTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { lectureData } = useSelector((state) => state.lecture);
  const courseQuiz = quizData && quizData.courseId?.toString() === courseId ? quizData : null;

  const handleLecture = async () => {
    if (!lectureTitle.trim()) return toast.error("Lecture title is required");

    setLoading(true);

    try {
      const result = await axios.post(
        `${serverURL}/api/course/createlecture/${courseId}`,
        { lectureTitle },
        { withCredentials: true },
      );
      dispatch(setLectureData([...lectureData, result.data.lecture]));
      toast.success("Lecture added! 🎉");
      setLectureTitle("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const removeLecture = async (lectureId) => {
    setLoading(true);
    try {
      const result = await axios.delete(
        serverURL + `/api/course/deletelecture/${lectureId}`,
        { withCredentials: true },
      );
      setLoading(false);
      const filterCourse = lectureData.filter((c) => c._id !== lectureId);
      dispatch(setLectureData(filterCourse));
      toast.success("Lecture deleted successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Delete failed");
      setLoading(false);
    }
  };
  useEffect(() => {
    const getCourseLecture = async () => {
      try {
        const result = await axios.get(
          `${serverURL}/api/course/courselecture/${courseId}`,
          { withCredentials: true },
        );
        dispatch(setLectureData(result.data.lectures));
      } catch (error) {
        toast.error(
          `Failed to fetch course lecture: ${error.response?.data?.message || error.message}`,
        );
      }
    };
    getCourseLecture();
  }, [courseId, dispatch]);

  useEffect(() => {
    if (!courseId) return;

    const getQuiz = async () => {
      try {
        const result = await axios.get(
          `${serverURL}/api/quiz/getquiz/${courseId}`,
          { withCredentials: true },
        );
        dispatch(setQuizData(result.data.quiz));
      } catch (error) {
        toast.error(
          `Failed to fetch quiz: ${error.response?.data?.message || error.message}`,
        );
      }
    };
    getQuiz();
  }, [courseId, dispatch]);

  const handleGenerateQuiz = async () => {
    setQuizLoading(true);

    try {
      const result = await axios.post(
        serverURL + `/api/quiz/generatequiz/${courseId}`,
        {},
        { withCredentials: true },
      );
      dispatch(setQuizData(result.data.quiz));
      toast.success("AI Final Exam Generated Successfully 🎓✨");
      setShowPreview(true);
    } catch (error) {
      dispatch(setQuizData([]));
      toast.error(`Quiz generation failed ${error.message}`);
    } finally {
      setQuizLoading(false);
    }
  };


  useEffect(() => {
    if (courseQuiz) {
     setEditedQuiz(structuredClone(courseQuiz));
    }
  }, [courseQuiz]);


  const handleEditQuiz = async () => {
    try {
      console.log(editedQuiz._id)
      const result = await axios.post(
        `${serverURL}/api/quiz/updatequiz/${editedQuiz._id}`,
        { questions: editedQuiz.questions },
        { withCredentials: true }
      );

      dispatch(setQuizData(result.data.quiz));
      toast.success("Quiz updated successfully!");
      setIsEditing(false);
    } catch (error) {
      toast.error("Update failed");
    }
  }

  const handleDeleteQuiz = async () => {
    try {
      console.log(editedQuiz._id)
      const result = await axios.post(
        `${serverURL}/api/quiz//deletequiz/${editedQuiz._id}`,
        { questions: editedQuiz.questions },
        { withCredentials: true }
      );

      dispatch(setQuizData(result.data.quiz));
      toast.success("Quiz updated successfully!");
      setShowPreview(false); 
      setIsEditing(false);
    } catch (error) {
      toast.error("Update failed");
      console.log(error);
    }
  }
  
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      <header className="h-20 bg-white/70 backdrop-blur-xl border-b border-slate-200 sticky top-0 z-50 px-8 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <button
            onClick={() => navigate(`/editcourse/${courseId}`)}
            className="group flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-all font-semibold text-sm"
          >
            <div className="p-2 bg-slate-100 group-hover:bg-blue-50 rounded-lg">
              <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
            </div>
            Back to Course
          </button>
          <div className="h-8 w-px bg-slate-200 hidden md:block"></div>
          <div>
            <h1 className="text-lg font-bold text-slate-800 leading-tight">
              Curriculum Designer
            </h1>
            <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest">
              Course ID: {courseId?.slice(-6)}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-bold text-slate-400">STATUS</p>
            <p className="text-sm font-bold text-emerald-500 flex items-center gap-1">
              <FiCheckCircle /> Auto-saving
            </p>
          </div>
        </div>
      </header>
      <main className="flex-1 flex flex-col lg:flex-row">
        <aside className="w-full lg:w-100 border-r border-slate-200 bg-white p-8 lg:sticky lg:top-20 lg:h-[calc(100vh-80px)]">
          <div className="mb-10">
            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-xl shadow-blue-100 mb-6 overflow-hidden border border-slate-100">
              <img
                src={img}
                alt="Logo"
                className="w-full h-full object-cover p-1"
              />
            </div>
            <h2 className="text-2xl font-black text-slate-900">Add Content</h2>
            <p className="text-slate-500 text-sm mt-2">
              Create structural milestones for your course. You can drag and
              drop to reorder later.
            </p>
          </div>

          <div className="space-y-6">
            <div className="group">
              <label className="block text-xs font-black text-slate-400 uppercase mb-2 ml-1 group-focus-within:text-blue-600 transition-colors">
                Lecture Title
              </label>
              <input
                type="text"
                placeholder="e.g. Mastering the useEffect Hook"
                className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-2 border-slate-50 focus:border-blue-500 focus:bg-white outline-none transition-all text-slate-700 font-medium placeholder:text-slate-300"
                value={lectureTitle}
                onChange={(e) => setLectureTitle(e.target.value)}
              />
            </div>

            <button
              disabled={loading}
              onClick={handleLecture}
              className="w-full bg-slate-900 hover:bg-black text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all active:scale-95 shadow-xl shadow-slate-200"
            >
              {loading ? (
                <ClipLoader size={20} color="white" />
              ) : (
                <>
                  <FiPlus strokeWidth={3} /> Create Module
                </>
              )}
            </button>

            <div className="mt-6">
              {!courseQuiz ? (
                <button
                  disabled={quizLoading}
                  onClick={() => handleGenerateQuiz()}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg"
                >
                  {quizLoading ? (
                    <ClipLoader size={18} color="white" />
                  ) : (
                    <>
                      <FiAward /> Generate Final Exam
                    </>
                  )}
                </button>
              ) : (
                <button
                  onClick={() => setShowPreview(true)}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg"
                >
                  <FiCheckCircle /> Preview Final Exam
                </button>
              )}
            </div>
          </div>

          <div className="mt-12 p-6 bg-blue-50 rounded-3xl border border-blue-100">
            <h4 className="text-blue-900 font-bold text-sm mb-1">Need help?</h4>
            <p className="text-blue-700/70 text-xs leading-relaxed">
              Each lecture can later hold video files, PDFs, and assignments.
              Start with a clear title.
            </p>
          </div>
        </aside>

        <section className="flex-1 p-6 lg:p-12">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-black text-slate-800">
                Curriculum Overview
              </h3>
              <div className="px-4 py-2 bg-slate-200/50 rounded-full text-[10px] font-black text-slate-500 uppercase tracking-tighter">
                {lectureData?.length || 0} Modules Created
              </div>
            </div>

            {showPreview && (
              <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
                <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl max-h-[90vh] overflow-hidden flex flex-col">
                  <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                    <div>
                      <h2 className="text-xl font-black text-slate-800">
                        {isEditing ? "Editing Final Exam" : "Final Exam Preview"}
                      </h2>
                      <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">
                        {courseQuiz?.questions?.length || 0} Questions Total
                      </p>
                    </div>
                    <div className="flex gap-3">
                      <button
                        onClick={() => setIsEditing(!isEditing)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-sm transition-all ${isEditing
                          ? "bg-amber-100 text-amber-600 hover:bg-amber-200"
                          : "bg-blue-100 text-blue-600 hover:bg-blue-200"
                          }`}
                      >
                        {isEditing ? <><FiCheckCircle /> View Mode</> : <><FiEdit /> Edit Quiz</>}
                      </button>
                      <button
                        onClick={handleDeleteQuiz}
                        className="p-2 hover:bg-red-50 text-slate-400 hover:text-red-500 rounded-lg transition-colors"
                      >
                        <FiTrash2 size={20} />
                      </button>
                    </div>
                  </div>
                  <div className="flex-1 overflow-y-auto p-8 space-y-8">
                   {(isEditing ? editedQuiz?.questions : courseQuiz?.questions)?.map((q, index) => (
                      <div key={index} className="group relative p-6 rounded-2xl border border-slate-100 bg-slate-50/30 hover:border-blue-200 transition-all">
                        <div className="flex gap-4">
                          <span className="shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold">
                            {index + 1}
                          </span>

                          <div className="flex-1 space-y-4">
                            {isEditing ? (
                              <input
                                className="w-full p-3 bg-white border border-slate-200 rounded-xl font-semibold focus:ring-2 focus:ring-blue-500 outline-none"
                                value={editedQuiz?.questions[index]?.question || ""}
                                onChange={(e) => {
                                  const updated = { ...editedQuiz };
                                  updated.questions[index].question = e.target.value;
                                  setEditedQuiz(updated);
                                }}
                              />
                            ) : (
                              <p className="text-lg font-bold text-slate-800 leading-snug">
                                {q.question}
                              </p>
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              {q.options.map((opt, i) => (
                                <div key={i} className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${isEditing ? "bg-white border-slate-200" : "bg-slate-100/50 border-transparent"
                                  }`}>
                                  <span className="text-[10px] font-black text-slate-400 uppercase">{i + 1}</span>
                                  {isEditing ? (
                                    <input
                                      className="flex-1 text-sm font-medium outline-none"
                                      value={editedQuiz?.questions[index]?.options[i] || ""}
                                      onChange={(e) => {
                                        const updated = { ...editedQuiz };
                                        updated.questions[index].options[i] = e.target.value;
                                        setEditedQuiz(updated);
                                      }}
                                    />
                                  ) : (
                                    <span className="text-sm font-medium text-slate-600">{opt}</span>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-6 border-t border-slate-100 flex justify-end gap-4 bg-white">
                    {isEditing && (
                      <button
                        className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold shadow-lg shadow-emerald-100 transition-all active:scale-95"
                        onClick={handleEditQuiz}>
                        Save Changes
                      </button>
                    )}
                    <button
                      onClick={() => { setShowPreview(false); setIsEditing(false); }}
                      className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl font-bold transition-all"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-4">
              {lectureData && lectureData.length > 0 ? (
                lectureData.map((lecture, index) => (
                  <div
                    key={index}
                    className="group flex items-center gap-6 p-6 rounded-3xl bg-white border border-slate-100 hover:border-blue-400 hover:shadow-2xl hover:shadow-blue-100/50 transition-all duration-500 cursor-default"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-lg font-black text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                      {String(index + 1).padStart(2, "0")}
                    </div>

                    <div className="flex-1">
                      <h4 className="text-lg font-bold text-slate-700 group-hover:text-slate-900 transition-colors">
                        {lecture?.lectureTitle}
                      </h4>
                      <div className="flex items-center gap-4 mt-2">
                        <span className="flex items-center gap-1 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                          <FiVideo className="text-blue-500" /> Video Module
                        </span>
                        <div className="w-1 h-1 bg-slate-300 rounded-full"></div>
                        <span
                          className={`text-[10px] font-black uppercase tracking-widest ${lecture?.videoUrl
                            ? "text-emerald-500"
                            : "text-amber-500"
                            }`}
                        >
                          {lecture?.videoUrl
                            ? "Content Ready"
                            : "Pending Upload"}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <button
                        onClick={() => removeLecture(lecture._id)}
                        className="p-3 hover:bg-red-50 hover:text-red-500 rounded-xl transition-colors text-slate-400"
                      >
                        <FiTrash2 size={20} />
                      </button>
                      <button
                        onClick={() =>
                          navigate(`/editlecture/${courseId}/${lecture._id}`)
                        }
                        className="p-3 hover:bg-indigo-50 hover:text-indigo-500 rounded-xl transition-colors text-slate-400"
                      >
                        <FiEdit size={20} />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-32 flex flex-col items-center justify-center border-4 border-dashed border-slate-100 rounded-[3rem]">
                  <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                    <FiVideo className="text-slate-200 text-3xl" />
                  </div>
                  <h4 className="text-xl font-bold text-slate-400">
                    Your stage is empty
                  </h4>
                  <p className="text-slate-300 text-sm mt-2">
                    Start adding lectures to build your curriculum.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      <style>
        {`
    html {
      scroll-behavior: smooth;
    }
    ::-webkit-scrollbar {
      width: 6px;
    }
    ::-webkit-scrollbar-track {
      background: transparent;
    }
    ::-webkit-scrollbar-thumb {
      background: #cbd5e1;
      border-radius: 10px;
    }
    /* Taaki scrollbar dikhne me professional lage */
    ::-webkit-scrollbar-thumb:hover {
      background: #94a3b8;
    }
  `}
      </style>
    </div>
  );
};

export default CreateLecture;
