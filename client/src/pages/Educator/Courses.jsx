import React from "react";
import {
  Plus,
  Search,
  Filter,
  MoreVertical,
  Users,
  Star,
  BarChart3,
  Edit3,
  CheckCircle,
  FileText,
  Layout,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const EducatorDashboard = () => {
  const navigate = useNavigate();

  const courses = [
    {
      id: 1,
      title: "Full Stack Web Development with React",
      status: "Published",
      students: 450,
      rating: 4.9,
      completion: 72,
      revenue: "₹45,000",
      image:
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&q=80",
    },
    {
      id: 2,
      title: "Advanced System Design for Startups",
      status: "Draft",
      students: 0,
      rating: 0,
      completion: 0,
      revenue: "₹0",
      image:
        "https://images.unsplash.com/photo-1558494949-ef010cbdcc51?w=400&q=80",
    },
  ];

  return (
    <div className="p-8 bg-slate-50 min-h-screen font-inter">
      {/* 1. Header & Create Button */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">My Courses</h1>
          <p className="text-slate-500 text-sm">
            Create and manage your educational content
          </p>
        </div>
        <button
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg font-semibold shadow-sm transition-all active:scale-95"
          onClick={() => navigate("/createcourses")}
        >
          <Plus size={18} />
          Create New Course
        </button>
      </div>

      {/* 2. Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Search your courses..."
            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-white"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg bg-white text-slate-600 hover:bg-slate-50">
          <Filter size={18} />
          Filter
        </button>
      </div>

      {/* 3. Course Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {courses.map((course) => (
          <div
            key={course.id}
            className="bg-white border border-slate-200 rounded-xl overflow-hidden flex flex-col md:flex-row hover:shadow-md transition-shadow"
          >
            {/* Thumbnail */}
            <div className="w-full md:w-48 h-48 md:h-auto relative">
              <img
                src={course.image}
                alt=""
                className="w-full h-full object-cover"
              />
              <div
                className={`absolute top-3 left-3 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider shadow-sm ${
                  course.status === "Published"
                    ? "bg-green-500 text-white"
                    : "bg-amber-500 text-white"
                }`}
              >
                {course.status}
              </div>
            </div>

            {/* Content & Stats */}
            <div className="p-5 flex-1 flex flex-col">
              <div className="flex justify-between">
                <h3 className="font-bold text-slate-800 text-lg leading-tight mb-1">
                  {course.title}
                </h3>
                <MoreVertical
                  className="text-slate-400 cursor-pointer"
                  size={20}
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 my-4">
                <Stat
                  icon={<Users size={14} />}
                  label="Students"
                  value={course.students}
                />
                <Stat
                  icon={<Star size={14} />}
                  label="Rating"
                  value={course.rating}
                />
                <Stat
                  icon={<CheckCircle size={14} />}
                  label="Done"
                  value={`${course.completion}%`}
                />
                <Stat
                  icon={<Layout size={14} />}
                  label="Revenue"
                  value={course.revenue}
                />
              </div>

              {/* ⚡ Quick Actions (The "Meat" of the Page) */}
              <div className="mt-auto pt-4 border-t border-slate-50 flex flex-wrap gap-2">
                <ActionButton
                  icon={<Edit3 size={16} />}
                  label="Edit"
                  color="text-blue-600 bg-blue-50"
                />
                <ActionButton
                  icon={<BarChart3 size={16} />}
                  label="Analytics"
                  color="text-indigo-600 bg-indigo-50"
                />
                <ActionButton
                  icon={<FileText size={16} />}
                  label="Curriculum"
                  color="text-slate-600 bg-slate-100"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Sub-components for cleaner code
const Stat = ({ icon, label, value }) => (
  <div className="flex flex-col">
    <span className="text-slate-400 text-[10px] uppercase font-bold flex items-center gap-1">
      {icon} {label}
    </span>
    <span className="text-slate-800 font-semibold text-sm">{value}</span>
  </div>
);

const ActionButton = ({ icon, label, color }) => (
  <button
    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold transition-opacity hover:opacity-80 ${color}`}
  >
    {icon} {label}
  </button>
);

export default EducatorDashboard;
