import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { setLectureData } from "../../redux/lectureSliece";
import img from "../../assets/logo.png";
import { serverURL } from "../../App.jsx";
import { toast } from "react-toastify";
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
  const navigate = useNavigate();
  const { courseId } = useParams();
  const [lectureTitle, setLectureTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { lectureData } = useSelector((state) => state.lecture);

  const handleLecture = async () => {
    if (!lectureTitle.trim()) return toast.error("Lecture title is required");

    setLoading(true);

    try {
      const result = await axios.post(
        `${serverURL}/api/course/createlecture/${courseId}`,{ lectureTitle },{ withCredentials: true });
      console.log(result.data);
      dispatch(setLectureData([...lectureData , result.data.lecture]))
      toast.success("Lecture added! 🎉");
      setLectureTitle("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const getCourseLecture = async () => {
      try {
        const result = await axios.get(
          `${serverURL}/api/course/courselecture/${courseId}`,{ withCredentials: true });
        dispatch(setLectureData(result.data.lectures));
      } catch (error) {
        console.log(error);
      }
    };
    getCourseLecture();
  }, [courseId, dispatch]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      {/* --- TOP NAVIGATION BAR --- */}
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
          <div className="h-8 w-[1px] bg-slate-200 hidden md:block"></div>
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

      {/* --- MAIN CONTENT LAYOUT --- */}
      <main className="flex-1 flex flex-col lg:flex-row">
        {/* LEFT PANEL: The Builder Tool */}
        <aside className="w-full lg:w-[400px] border-r border-slate-200 bg-white p-8 lg:sticky lg:top-20 lg:h-[calc(100vh-80px)]">
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
          </div>

          <div className="mt-12 p-6 bg-blue-50 rounded-3xl border border-blue-100">
            <h4 className="text-blue-900 font-bold text-sm mb-1">Need help?</h4>
            <p className="text-blue-700/70 text-xs leading-relaxed">
              Each lecture can later hold video files, PDFs, and assignments.
              Start with a clear title.
            </p>
          </div>
        </aside>

        {/* RIGHT PANEL: The Content List */}
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

            <div className="space-y-4">
              {lectureData && lectureData.length > 0 ? (
                lectureData.map((lecture, index) => (
                  <div
                    key={lecture._id}
                    className="group flex items-center gap-6 p-6 rounded-3xl bg-white border border-slate-100 hover:border-blue-400 hover:shadow-2xl hover:shadow-blue-100/50 transition-all duration-500 cursor-default"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-lg font-black text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                      {String(index + 1).padStart(2, "0")}
                    </div>

                    <div className="flex-1">
                      <h4 className="text-lg font-bold text-slate-700 group-hover:text-slate-900 transition-colors">
                        {lecture.lectureTitle}
                      </h4>
                      <div className="flex items-center gap-4 mt-2">
                        <span className="flex items-center gap-1 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                          <FiVideo className="text-blue-500" /> Video Module
                        </span>
                        <div className="w-1 h-1 bg-slate-300 rounded-full"></div>
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                          Pending Upload
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <button className="p-3 hover:bg-red-50 hover:text-red-500 rounded-xl transition-colors text-slate-400">
                        <FiTrash2 size={20} />
                      </button>
                      <button
                        onClick={() =>
                          navigate(`/editlecture/${courseId}/${lecture._id}`)
                        }
                        className="p-3 hover:bg-indigo-50 hover:text-indigo-500 rounded-xl transition-colors text-slate-400"
                      >
                        <FiEdit size={20}  />
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

      {/* Global Smooth Scroll Support - Error Fixed */}
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
