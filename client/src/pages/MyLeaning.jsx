import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FiBook, FiArrowRight } from "react-icons/fi";
import Navbar from "../component/Nav";
import certificateTemplate from "/certificateTemp.png";

const MyLearning = () => {
  const navigate = useNavigate();

  const { userData } = useSelector((state) => state.user || {});
  const { courseData } = useSelector((state) => state.course || {});
  const getProgress = (courseId) => {
    if (!courseId || !courseData || !userData) return 0;
    const course = courseData.find((c) => c._id === courseId);
    const totalLectures = course?.lectures?.length || 0;
    if (totalLectures === 0) return 0;
    const courseProgress = userData?.completedLectures?.find(
      (c) => c.courseId === courseId,
    );
    const completedCount = courseProgress?.lectureIds?.length || 0;
    return Math.min(100, Math.round((completedCount / totalLectures) * 100));
  };
  const enrolledCourses = userData?.enrolledCourses || [];

  const inProgressCourses = useMemo(() => {
    return enrolledCourses.filter((course) => getProgress(course._id) < 100);
  }, [enrolledCourses, courseData, userData]);

  const completedCourses = useMemo(() => {
    return enrolledCourses.filter((course) => getProgress(course._id) === 100);
  }, [enrolledCourses, courseData, userData]);

  return (
    <div className="min-h-screen bg-[#050517] text-slate-200">
      <Navbar />

      <header className="relative pt-32 pb-24 px-4 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-purple-600/10 rounded-full blur-[100px]" />

        <div className="relative z-10 max-w-6xl mx-auto text-left">
          <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight">
            My{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-400 to-cyan-400">
              Learning
            </span>
          </h1>

          <p className="text-slate-400 mt-3 text-lg font-medium">
            Welcome back,{" "}
            <span className="text-white">{userData?.name || "Learner"}</span> 👋
            <br />
            Track your progress and continue where you left off.
          </p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-5 pb-20">
        <div className="mb-16">
          <h2 className="text-xl font-black text-white uppercase tracking-widest mb-8 flex items-center gap-3">
            <span className="w-8 h-[2px] bg-indigo-500"></span> In Progress
          </h2>

          {inProgressCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {inProgressCourses.map((course) => {
                const progressPercent = getProgress(course._id);
                const isCompleted = progressPercent === 100;

                return (
                  <div
                    key={course._id}
                    onClick={() => navigate(`/viewlecture/${course._id}`)}
                    className="group relative bg-[#0f1120] rounded-[2.5rem] p-5 transition-all duration-500 hover:bg-[#161930] border border-white/5 hover:border-indigo-500/50 cursor-pointer overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600/10 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-indigo-600/20 transition-all" />

                    <div className="flex flex-col h-full">
                      <div className="relative w-full h-44 mb-6">
                        <img
                          src={course?.thumbnail}
                          alt={course?.title}
                          className="w-full h-full object-cover rounded-[2rem] brightness-90 group-hover:brightness-110 transition-all duration-700"
                        />
                        <div className="absolute -bottom-2 -right-2 bg-indigo-600 text-[10px] font-black px-4 py-2 rounded-2xl shadow-xl border-4 border-[#0f1120]">
                          {course?.level?.toUpperCase()}
                        </div>
                      </div>

                      <div className="flex-1 px-1">
                        <h3 className="text-xl font-black text-white leading-[1.2] mb-2 group-hover:text-indigo-300 transition-colors line-clamp-2">
                          {course?.title}
                        </h3>

                        <p className="text-slate-500 text-[13px] font-medium line-clamp-2 mb-4">
                          {course?.subTitle}
                        </p>
                      </div>

                      <div className="flex items-center justify-between bg-white/5 rounded-3xl p-4 mt-auto">
                        <div className="relative flex items-center justify-center w-12 h-12">
                          <svg className="w-full h-full transform -rotate-90">
                            <circle
                              cx="24"
                              cy="24"
                              r="20"
                              stroke="currentColor"
                              strokeWidth="4"
                              fill="transparent"
                              className="text-white/10"
                            />
                            <circle
                              cx="24"
                              cy="24"
                              r="20"
                              stroke="currentColor"
                              strokeWidth="4"
                              fill="transparent"
                              strokeDasharray={125.6}
                              strokeDashoffset={
                                125.6 - (125.6 * progressPercent) / 100
                              }
                              className={`${
                                isCompleted
                                  ? "text-emerald-500"
                                  : "text-indigo-500"
                              } transition-all duration-1000 ease-out`}
                            />
                          </svg>

                          <span className="absolute text-[10px] font-bold text-white">
                            {progressPercent}%
                          </span>
                        </div>

                        <div className="flex flex-col items-end">
                          {isCompleted ? (
                            <button className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white text-[10px] font-black px-4 py-2 rounded-xl transition-all uppercase tracking-tight shadow-lg shadow-emerald-500/20">
                              Claim Certificate
                            </button>
                          ) : (
                            <div className="flex items-center gap-3">
                              <div className="text-right">
                                <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest">
                                  Lectures
                                </p>
                                <p className="text-sm font-bold text-slate-200">
                                  {course?.lectures?.length || 0} Total
                                </p>
                              </div>
                              <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-all">
                                <FiArrowRight size={20} />
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-24 bg-[#0f0f2d] rounded-[2rem] border border-white/5 border-dashed">
              <div className="bg-indigo-500/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <FiBook className="text-indigo-500 text-3xl" />
              </div>

              <h2 className="text-2xl font-bold text-white">
                No active courses
              </h2>

              <p className="text-slate-400 mt-2">
                Ready to start something new today?
              </p>

              <button
                onClick={() => navigate("/")}
                className="mt-8 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white px-10 py-3.5 rounded-2xl font-bold hover:shadow-[0_10px_20px_rgba(79,70,229,0.3)] transition-all"
              >
                Explore Catalog
              </button>
            </div>
          )}
        </div>
        {completedCourses.length > 0 && (
          <div className="mt-24">
            <h2 className="text-xl font-black text-white uppercase tracking-widest mb-10 flex items-center gap-3">
              <span className="w-8 h-[2px] bg-emerald-500"></span>
              Achievements
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {completedCourses.map((course) => (
                <div
                  key={course._id}
                  className="group relative h-64 rounded-[2.5rem] overflow-hidden border border-white/5 shadow-2xl transition-all duration-500 hover:-translate-y-2"
                >
                  <img
                    src={certificateTemplate}
                    className="absolute inset-0 w-full h-full object-cover blur-[2px] group-hover:blur-md transition-all duration-700 brightness-50 group-hover:brightness-[0.3]"
                    alt="Certificate"
                  />

                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                    <div className="bg-emerald-500/20 backdrop-blur-xl p-4 rounded-3xl border border-emerald-500/30 shadow-[0_0_30px_rgba(16,185,129,0.2)] mb-4">
                      <FiBook className="text-emerald-400 text-3xl" />
                    </div>

                    <h4 className="text-white font-black text-lg uppercase">
                      {course?.title}
                    </h4>

                    <p className="text-emerald-400 text-[10px] font-black tracking-[0.2em] mt-2 mb-6 uppercase">
                      Course Certified
                    </p>

                    <button className="opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 bg-white text-black px-6 py-2.5 rounded-2xl font-black text-[10px] uppercase tracking-tighter hover:bg-emerald-500 hover:text-white">
                      Download Certificate
                    </button>
                  </div>

                  <div className="absolute top-5 right-5 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                    <span className="text-[9px] font-black text-white uppercase tracking-widest">
                      Verified
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default MyLearning;
