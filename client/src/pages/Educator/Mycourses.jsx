import React, { useEffect } from "react";
import {
  Plus,
  Search,
  Filter,
  MoreVertical,
  Users,
  Star,
  Edit3,
  CheckCircle,
  Layout,
} from "lucide-react";
import placeholder from "../../assets/placeholder.jpg";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { serverURL } from "../../App.jsx";
import { setCreatorCourseData } from "../../redux/courseSliec.js";
import Navbar from "../../component/Nav.jsx";

const MyCourses = () => {
  const navigate = useNavigate();
  const { creatorCourseData } = useSelector((state) => state.course);
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);

  useEffect(() => {
    const creatorCourses = async () => {
      try {
        const result = await axios.get(serverURL + "/api/course/getcreator", {
          withCredentials: true,
        });
        dispatch(setCreatorCourseData(result.data));
      } catch (error) {
        console.log(error);
      }
    };
    creatorCourses();
  }, [userData, dispatch]);

  return (
    <div className="p-4 md:p-8 bg-slate-900 min-h-screen text-slate-100">
      <Navbar />

      {/* 1. Header Section - Fixed Alignment */}
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center mb-8 gap-4 mt-24">
        <div className="text-center sm:text-left">
          <h1 className="text-3xl font-extrabold text-white tracking-tight">My Courses</h1>
          <p className="text-slate-400 text-sm mt-1">
            Manage your curriculum and track student engagement
          </p>
        </div>

        <button
          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-indigo-500/20 transition-all active:scale-95"
          onClick={() => navigate("/createcourse")}
        >
          <Plus size={20} />
          Create New Course
        </button>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* 2. Search & Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-10">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
            <input
              type="text"
              placeholder="Search your courses..."
              className="w-full pl-12 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none text-white transition-all"
            />
          </div>
          <button className="flex items-center justify-center gap-2 px-6 py-3 border border-slate-700 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 transition-colors">
            <Filter size={18} />
            Filter
          </button>
        </div>

        {/* 3. Course Grid - Fixed Card Heights */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {creatorCourseData.map((course) => (
            <div
              key={course._id}
              className="group bg-slate-800/40 border border-slate-700/50 rounded-2xl overflow-hidden flex flex-col h-full hover:border-indigo-500/50 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300"
            >
              {/* Thumbnail Container */}
              <div className="relative aspect-video w-full overflow-hidden">
                <img
                  src={course.thumbnail || placeholder}
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-transparent opacity-60" />
                
                <div
                  className={`absolute top-4 left-4 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest shadow-lg ${
                    course.isPublished ? "bg-emerald-500 text-emerald-950" : "bg-amber-500 text-amber-950"
                  }`}
                >
                  {course.isPublished ? "Live" : "Draft"}
                </div>
              </div>

              {/* Content Section - flex-1 pushes footer to bottom */}
              <div className="p-5 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-4 gap-2">
                  <h3 className="font-bold text-white text-lg leading-tight line-clamp-2 group-hover:text-indigo-400 transition-colors">
                    {course.title}
                  </h3>
                  <button className="p-1.5 hover:bg-slate-700 rounded-lg transition-colors flex-shrink-0">
                    <MoreVertical className="text-slate-500" size={18} />
                  </button>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-y-4 gap-x-2 mb-6">
                  <Stat icon={<Users size={14} />} label="Students" value={course.enrolledStudents?.length || 0} />
                  <Stat icon={<Star size={14} />} label="Rating" value={course.rating || "N/A"} />
                  <Stat 
                    icon={<CheckCircle size={14} />} 
                    label="Price" 
                    value={course.isPaid ? `₹${course.Price}` : "Free"} 
                    isPrice={!course.isPaid}
                  />
                  <Stat icon={<Layout size={14} />} label="Category" value={course.category || "General"} />
                </div>

                {/* Action Footer - Always stays at bottom */}
                <div className="mt-auto pt-4 border-t border-slate-700/50 flex items-center justify-between gap-2">
                  <span className="text-[10px] text-slate-500 font-medium uppercase tracking-tighter">
                    Updated: {new Date(course.updatedAt).toLocaleDateString()}
                  </span>
                  <button
                    onClick={() => navigate(`/editcourse/${course._id}`)}
                    className="flex items-center gap-2 px-3 py-2 bg-indigo-500/10 hover:bg-indigo-500 text-indigo-400 hover:text-white rounded-lg text-xs font-bold transition-all"
                  >
                    <Edit3 size={14} />
                    Edit
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Stat = ({ icon, label, value, isPrice }) => (
  <div className="flex flex-col gap-0.5">
    <div className="flex items-center gap-1.5 text-slate-500">
      <span className="text-indigo-400">{icon}</span>
      <span className="text-[10px] uppercase font-bold tracking-wider">{label}</span>
    </div>
    <span className={`text-sm font-semibold truncate ${isPrice ? "text-emerald-400" : "text-slate-200"}`}>
      {value}
    </span>
  </div>
);

export default MyCourses;