import axios from "axios";
import React, { useEffect, useState ,useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { serverURL } from "../App";
import { FiArrowLeft, FiPlayCircle, FiBookOpen } from "react-icons/fi";

const ViewLecture = () => {
  const { courseId } = useParams();
  const { courseData } = useSelector((state) => state.course);
  const {quizData} = useSelector(state=>state.quiz);

  
  const selectedCourse = courseData?.find((course) => course._id === courseId);
  const navigate = useNavigate();
  const [creatorData, setCreatorData] = useState(null);
  const [selectedLecture, setSelectedLecture] = useState(
    selectedCourse?.lectures?.[0] || null,
  );
  const videoRef = useRef(null);


  const [progress, setProgress] = useState({});
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedProgress = JSON.parse(
      localStorage.getItem("lectureProgress") || "{}",
    );
    setProgress(savedProgress);

    const savedNotes = JSON.parse(localStorage.getItem("lectureNotes") || "{}");
    setNotes(savedNotes[selectedLecture?._id] || "");

    setLoading(false);
  }, [selectedLecture]);

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video || !selectedLecture) return;

    const percent = (video.currentTime / video.duration) * 100;

    const updated = {
      ...progress,
      [selectedLecture._id]: {
        percent,
        time: video.currentTime,
        completed: percent > 95,
      },
    };
    setProgress(updated);
    localStorage.setItem("lectureProgress", JSON.stringify(updated));
  };
  const handleLoaded = () => {
    const saved = progress[selectedLecture?._id];
    if (saved && videoRef.current) {
      videoRef.current.currentTime = saved.time || 0;
    }
  };

  const playNextLecture = () => {
    const index = selectedCourse.lectures.findIndex(
      (lec) => lec._id === selectedLecture._id,
    );

    if (index < selectedCourse.lectures.length - 1) {
      setSelectedLecture(selectedCourse.lectures[index + 1]);
    }
  };

  // Save Notes
  const saveNotes = (value) => {
    setNotes(value);

    const savedNotes = JSON.parse(localStorage.getItem("lectureNotes") || "{}");
    savedNotes[selectedLecture._id] = value;

    localStorage.setItem("lectureNotes", JSON.stringify(savedNotes));
  };

  const totalLectures = selectedCourse?.lectures?.length || 0;
  const completedLectures = Object.values(progress).filter(
    (p) => p.completed,
  ).length;
  const coursePercent = totalLectures
    ? Math.round((completedLectures / totalLectures) * 100)
    : 0;

  useEffect(() => {
    const handleCreator = async () => {
      if (selectedCourse?.creator) {
        try {
          const result = await axios.post(
            serverURL + "/api/course/creator",
            { userId: selectedCourse?.creator },
            { withCredentials: true },
          );
          setCreatorData(result.data);
        } catch (error) {
          console.log(error);
        }
      }
    };
    handleCreator();
  }, [selectedCourse]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HEADER */}
      <div className="bg-white border-b sticky top-0 z-10 px-4 py-4">
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          <button
            onClick={() => navigate("/")}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <FiArrowLeft className="text-xl text-gray-700" />
          </button>
          <h1 className="text-xl font-bold text-gray-800 truncate">
            {selectedCourse?.title || "Course Player"}
          </h1>

          <div className="ml-auto font-semibold text-blue-600">
            Progress: {coursePercent}%
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto p-4 lg:p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT SIDE - VIDEO PLAYER */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-black rounded-2xl overflow-hidden shadow-xl aspect-video flex items-center justify-center">
            {selectedLecture?.videoUrl ? (
              <video
                key={selectedLecture.videoUrl}
                className="w-full h-full"
                src={selectedLecture.videoUrl}
                controls
                controlsList="nodownload"
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoaded}
                onEnded={playNextLecture}
                ref={videoRef}
              />
            ) : (
              <div className="text-white flex flex-col items-center gap-3">
                <FiPlayCircle className="text-5xl opacity-50" />
                <p className="text-gray-400">
                  Select a lecture to start learning
                </p>
              </div>
            )}
          </div>

          {/* LECTURE DETAILS */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {selectedLecture?.lectureTitle || "Welcome to the course"}
            </h2>

            <div className="flex flex-wrap gap-4 text-sm mb-4">
              <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full font-medium">
                {selectedCourse?.category}
              </span>
              <span className="bg-purple-50 text-purple-600 px-3 py-1 rounded-full font-medium">
                {selectedCourse?.level}
              </span>
            </div>

            <hr className="my-4" />

            {/* LECTURE DESCRIPTION */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-800 mb-2">
                What you will learn
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {selectedLecture?.description ||
                  "No description available for this lecture."}
              </p>
            </div>

            {/* QUIZ SECTION */}
            <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4 mt-4">
              <h3 className="font-semibold text-indigo-700 mb-2">
                Lecture Quiz
              </h3>

              {selectedLecture?.quiz ? (
                <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-indigo-700 transition">
                  Start Quiz
                </button>
              ) : (
                <p className="text-sm text-gray-600">
                  No quiz available for this lecture
                </p>
              )}
            </div>

            {/* NOTES SECTION */}
            <div className="mt-6">
              <h3 className="font-semibold text-gray-800 mb-2">Your Notes</h3>
              <textarea
                className="w-full border rounded-xl p-3 text-sm outline-none focus:ring-2 focus:ring-blue-200"
                rows="4"
                value={notes}
                onChange={(e) => saveNotes(e.target.value)}
                placeholder="Write important points from this lecture..."
              />
            </div>
          </div>
        </div>

        {/* RIGHT SIDE - LECTURE LIST */}
        <div className="lg:col-span-1 space-y-4">
          {/* LECTURE PANEL */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col sticky top-24 max-h-[70vh]">
            <div className="p-4 border-b">
              <h3 className="font-bold text-gray-800 flex items-center gap-2">
                <FiBookOpen /> Course Content
              </h3>
            </div>

            {/* LECTURE LIST */}
            <div className="flex-1 overflow-y-auto p-2 custom-scrollbar">
              {selectedCourse?.lectures?.map((lecture, index) => {
                const lectureProgress = progress[lecture._id]?.percent || 0;
                const isCompleted = progress[lecture._id]?.completed;

                return (
                  <button
                    key={index}
                    onClick={() => setSelectedLecture(lecture)}
                    className={`w-full text-left p-4 rounded-xl mb-2 transition-all border ${
                      selectedLecture?._id === lecture._id
                        ? "bg-blue-50 border-blue-200"
                        : "hover:bg-gray-50 border-gray-100"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {/* Play or Completed Icon */}
                      <div>
                        {isCompleted ? (
                          <span className="text-green-600 text-lg">✔</span>
                        ) : (
                          <FiPlayCircle
                            className={`text-lg ${
                              selectedLecture?._id === lecture._id
                                ? "text-blue-600"
                                : "text-gray-400"
                            }`}
                          />
                        )}
                      </div>

                      <div className="flex-1">
                        <p
                          className={`text-sm font-semibold ${
                            selectedLecture?._id === lecture._id
                              ? "text-blue-700"
                              : "text-gray-700"
                          }`}
                        >
                          {lecture.lectureTitle}
                        </p>

                        {/* Progress Bar */}
                        <div className="w-full bg-gray-200 h-1 rounded mt-2">
                          <div
                            className="bg-green-500 h-1 rounded transition-all"
                            style={{ width: `${lectureProgress}%` }}
                          />
                        </div>
                      </div>

                      <span className="text-xs text-gray-400">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ===== INSTRUCTOR CARD - ALAG LOOK ===== */}
          <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-4 fixed">
            <p className="text-sm text-gray-500 mb-3 font-semibold">
              Course Instructor
            </p>

            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-lg">
                {creatorData?.name?.charAt(0) || "I"}
              </div>

              <div>
                <p className="font-semibold text-gray-800">
                  {creatorData?.name}
                </p>

                <p className="text-xs text-gray-500">Professional Instructor</p>
              </div>
            </div>

            <div className="mt-3 text-xs text-gray-500">
              Learn directly from experienced mentor with structured content.
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ViewLecture;
