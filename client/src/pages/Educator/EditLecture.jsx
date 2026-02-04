import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { serverURL } from "../../App.jsx";
import { ClipLoader } from "react-spinners";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiArrowLeft,
  FiVideo,
  FiType,
  FiAlignLeft,
  FiUpload,
  FiCheck,
  FiLock,
  FiUnlock,
  FiInfo,
} from "react-icons/fi";
import { useDispatch } from "react-redux";

const EditLecture = () => {
  const { courseId, lectureId } = useParams();
  const navigate = useNavigate();
  const { lectureData } = useState((state) => state.lecture);
  const selectedLecture = lectureData.find(
    (lecture) => lecture._id === lectureId,
  );
  const dispatch = useDispatch();
  // States
  const [lectureTitle, setLectureTitle] = useState(
    selectedLecture.lectureTitle,
  );
  const [description, setDescription] = useState("");
  const [isPreviewFree, setIsPreviewFree] = useState(false);
  const [video, setVideo] = useState(null);
  const [videoPreview, setVideoPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [uploadProgress, setUploadProgress] = useState(0);

  useEffect(() => {
    const fetchLecture = async () => {
      try {
        const { data } = await axios.get(
          `${serverURL}/api/course/lecture/${lectureId}`,
          { withCredentials: true },
        );
        setLectureTitle(data.lecture.lectureTitle);
        setDescription(data.lecture.description || "");
        setIsFree(data.lecture.isFree || false);
        setVideoPreview(data.lecture.videoUrl || "");
      } catch (error) {
        toast.error("Failed to load lecture details");
      } finally {
        setFetching(false);
      }
    };
    fetchLecture();
  }, [lectureId]);

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideo(file);
      setVideoPreview(URL.createObjectURL(file));
    }
  };

  const formData = new FormData();
  formData.append("lectureTitle", lectureTitle);
  formData.append("videoUrl", videoUrl);
  formData.append("isPreviewFree", isPreviewFree);

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!lectureTitle.trim()) return toast.error("Title is required");

    const formData = new FormData();
    formData.append("lectureTitle", lectureTitle);
    formData.append("description", description);
    formData.append("isFree", isFree);
    if (video) formData.append("video", video);

    setLoading(true);
    try {
      await axios.put(
        `${serverURL}/api/course/editlecture/${lectureId}`,formData,{withCredentials: true, onUploadProgress: (p) =>
        setUploadProgress(Math.round((p.loaded * 100) / p.total)),},);

      toast.success("Lecture updated successfully!");
      navigate(`/createlecture/${courseId}`);
      
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  if (fetching)
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a23]">
        <ClipLoader color="#6366F1" size={50} />
      </div>
    );

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-32">
      <div className="bg-[#0a0a23] pt- pb-24 px-6 border-b border-white/5">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <button
              onClick={() => navigate(`/createlecture/${courseId}`)}
              className="flex items-center gap-2 text-slate-400 hover:text-indigo-400 mb-4 transition-colors font-medium text-sm"
            >
              <FiArrowLeft /> Back to Curriculum
            </button>
            <h1 className="text-4xl font-bold text-white tracking-tight">
              Edit <span className="text-indigo-500">Lecture</span>
            </h1>
            <p className="text-slate-400 mt-2 font-medium">
              Refining:{" "}
              <span className="text-slate-200">
                {lectureTitle || "Untitled Content"}
              </span>
            </p>
          </motion.div>

          <div className="hidden md:block">
            <div className="bg-white/5 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/10">
              <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-1">
                Content Status
              </p>
              <p className="text-white font-bold flex items-center gap-2 text-sm">
                <span className="h-2 w-2 bg-emerald-500 rounded-full animate-pulse"></span>
                Published & Live
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 -mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT: MAIN FORM */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2 space-y-6"
          >
            <div className="bg-white p-8 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100">
              <div className="flex items-center gap-3 mb-8">
                <div className="h-8 w-1 bg-indigo-600 rounded-full"></div>
                <h2 className="text-xl font-bold text-slate-800 tracking-tight">
                  Lecture Details
                </h2>
              </div>

              <div className="space-y-8">
                {/* Title Input */}
                <div className="group">
                  <label className="flex items-center gap-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-3 group-focus-within:text-indigo-600 transition-colors">
                    <FiType /> Title
                  </label>
                  <input
                    type="text"
                    value={lectureTitle}
                    onChange={(e) => setLectureTitle(e.target.value)}
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 rounded-xl outline-none transition-all font-semibold text-slate-700 shadow-sm"
                    placeholder="E.g. Introduction to React Hooks"
                  />
                </div>

                {/* Description Textarea */}
                <div className="group">
                  <div className="flex justify-between items-center mb-3">
                    <label className="flex items-center gap-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider group-focus-within:text-indigo-600 transition-colors">
                      <FiAlignLeft /> Description
                    </label>
                    <span
                      className={`text-[10px] font-bold ${description.length > 450 ? "text-red-500" : "text-slate-400"}`}
                    >
                      {description.length}/500
                    </span>
                  </div>
                  <textarea
                    rows="5"
                    maxLength="500"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 rounded-xl outline-none transition-all font-medium text-slate-600 resize-none shadow-sm leading-relaxed"
                    placeholder="What will students learn in this lecture?"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT: VIDEO PANEL */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-6"
          >
            <div className="bg-white p-6 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100">
              <h3 className="text-xs font-bold text-slate-800 mb-5 flex items-center gap-2 uppercase tracking-wider">
                <FiVideo className="text-indigo-600" /> Video Asset
              </h3>

              <div className="aspect-video bg-[#0a0a23] rounded-xl overflow-hidden relative group border-2 border-slate-100 shadow-inner mb-6">
                <AnimatePresence mode="wait">
                  {videoPreview ? (
                    <motion.video
                      key="video"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      src={videoPreview}
                      className="w-full h-full object-cover"
                      controls
                    />
                  ) : (
                    <motion.div
                      key="empty"
                      className="w-full h-full flex flex-col items-center justify-center text-center p-4"
                    >
                      <FiUpload
                        size={32}
                        className="text-slate-600 mb-2 opacity-20"
                      />
                      <p className="text-[10px] font-bold text-slate-500 uppercase">
                        No Video Selected
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <label className="block w-full text-center py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl cursor-pointer transition-all active:scale-[0.98] font-bold text-xs mb-6 shadow-lg shadow-indigo-200">
                {video ? "Change Video File" : "Replace Video"}
                <input
                  type="file"
                  accept="video/*"
                  className="hidden"
                  onChange={handleVideoChange}
                />
              </label>

              <div className="space-y-3">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
                  <FiInfo /> Permissions
                </p>
                <div
                  onClick={() => setIsPreviewFree((prev) => !prev)}
                  className={`flex items-center justify-between p-4 rounded-xl cursor-pointer transition-all border ${isFree ? "bg-emerald-50 border-emerald-200" : "bg-slate-50 border-slate-100"}`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-lg ${isFree ? "bg-emerald-500 text-white" : "bg-slate-200 text-slate-500"}`}
                    >
                      {isFree ? <FiUnlock size={16} /> : <FiLock size={16} />}
                    </div>
                    <div>
                      <p
                        className={`text-xs font-bold ${isFree ? "text-emerald-700" : "text-slate-700"}`}
                      >
                        Free Preview
                      </p>
                      <p className="text-[9px] text-slate-400 font-medium">
                        Visible to everyone
                      </p>
                    </div>
                  </div>
                  <div
                    className={`w-10 h-5 rounded-full p-1 transition-colors ${isFree ? "bg-emerald-500" : "bg-slate-300"}`}
                  >
                    <div
                      className={`bg-white w-3 h-3 rounded-full transition-transform ${isFree ? "translate-x-5" : "translate-x-0"}`}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* UPLOAD PROGRESS */}
            {loading && (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-[#0a0a23] p-5 rounded-2xl text-white"
              >
                <div className="flex justify-between text-[10px] font-bold mb-2 uppercase tracking-tight">
                  <span className="text-indigo-400">Syncing to Cloud</span>
                  <span>{uploadProgress}%</span>
                </div>
                <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                  <motion.div
                    animate={{ width: `${uploadProgress}%` }}
                    className="bg-indigo-500 h-full"
                  />
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>

      {/* 2. STICKY FOOTER */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-white/80 backdrop-blur-md border-t border-slate-100 z-50">
        <div className="max-w-6xl mx-auto">
          <button
            onClick={handleUpdate}
            disabled={loading}
            className="w-full bg-[#0a0a23] hover:bg-indigo-600 text-white py-4 rounded-xl font-bold text-sm shadow-xl shadow-indigo-900/10 flex items-center justify-center gap-2 transition-all active:scale-[0.99] disabled:opacity-70"
          >
            {loading ? (
              <ClipLoader size={18} color="white" />
            ) : (
              <>
                <FiCheck /> Update Lecture Content
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditLecture;
