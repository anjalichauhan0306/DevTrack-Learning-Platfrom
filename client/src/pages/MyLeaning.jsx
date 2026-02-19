import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FiBook, FiPlay, FiArrowRight } from "react-icons/fi";
import Navbar from "../component/Nav";

const MyLearning = () => {
  const navigate = useNavigate();
  const { userData } = useSelector((state) => state.user);
  const { courseData } = useSelector((state) => state.course);

  const getProgress = (courseId) => {
    const progress = JSON.parse(localStorage.getItem("lectureProgress") || "{}");
    const courseLectures =
      courseData?.find((c) => c._id === courseId)?.lectures || [];

    if (courseLectures.length === 0) return 0;

    const completed = courseLectures.filter(
      (lec) => progress[lec._id]?.completed
    ).length;

    return Math.round((completed / courseLectures.length) * 100);
  };

  return (
    <div className="min-h-screen bg-[#050517] text-slate-200">
      <Navbar />
      <header className="relative pt-32 pb-24 px-4 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-purple-600/10 rounded-full blur-[100px]"></div>

        <div className="relative z-10 max-w-6xl mx-auto text-left">
          <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight">
            My <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-400 to-cyan-400">Learning</span>
          </h1>
          <p className="text-slate-400 mt-3 text-lg font-medium">
            Welcome back, <span className="text-white">{userData?.name || "Learner"}</span> 👋 <br />
            Track your progress and continue where you left off.
          </p>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-5 pb-20">
        {userData?.enrolledCourses?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {userData.enrolledCourses.map((course, index) => {
              const progressPercent = getProgress(course._id);

              return (
                <div
                  onClick={() => navigate(`/viewlecture/${course._id}`)}
                  key={index}
                  className="group bg-[#0f0f2d] border border-white/5 rounded-3xl overflow-hidden hover:border-indigo-500/50 hover:shadow-[0_0_30px_rgba(79,70,229,0.15)] transition-all duration-500 flex flex-col"
                >
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-[#0f0f2d] via-transparent to-transparent opacity-60"></div>
                    <button
                      onClick={() => navigate(`/viewlecture/${course._id}`)}
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-indigo-600 text-white p-4 rounded-full shadow-xl opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300"
                    >
                      <FiPlay size={24} fill="currentColor" />
                    </button>
                  </div>
                  <div className="p-6 flex flex-col grow">
                    <h3 className="text-lg font-bold text-white line-clamp-2 min-h-12 group-hover:text-indigo-400 transition-colors">
                      {course.title}
                    </h3>

                    <div className="flex items-center gap-2 mt-3 text-slate-400 text-sm font-medium">
                      <FiBook className="text-indigo-400" />
                      {course.lectures?.length || 0} Modules
                    </div>
                    <div className="mt-8 mb-6">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-[10px] uppercase tracking-widest font-bold text-slate-500">Course Progress</span>
                        <span className="text-xs font-bold text-indigo-400">{progressPercent}%</span>
                      </div>
                      <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
                        <div
                          className="bg-linear-to-r from-indigo-500 to-cyan-400 h-full rounded-full transition-all duration-1000 ease-in-out"
                          style={{ width: `${progressPercent}%` }}
                        ></div>
                      </div>
                    </div>
                    <button
                      onClick={() => navigate(`/viewlecture/${course._id}`)}
                      className="mt-auto flex items-center justify-center gap-2 w-full bg-white/5 border border-white/10 text-white py-3 rounded-2xl font-semibold hover:bg-indigo-600 hover:border-indigo-600 transition-all duration-300"
                    >
                      {progressPercent > 0 ? "Continue" : "Start Now"}
                      <FiArrowRight size={18} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Empty State for Dark Theme */
          <div className="text-center py-24 bg-[#0f0f2d] rounded-[2rem] border border-white/5 border-dashed">
            <div className="bg-indigo-500/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <FiBook className="text-indigo-500 text-3xl" />
            </div>
            <h2 className="text-2xl font-bold text-white">No active courses</h2>
            <p className="text-slate-400 mt-2">Ready to start something new today?</p>
            <button
              onClick={() => navigate("/")}
              className="mt-8 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white px-10 py-3.5 rounded-2xl font-bold hover:shadow-[0_10px_20px_rgba(79,70,229,0.3)] transition-all"
            >
              Explore Catalog
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default MyLearning;