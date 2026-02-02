import React from "react";
import {
  Users,
  BookOpen,
  DollarSign,
  Star,
  TrendingUp,
  ArrowUpRight,
  Award,
  Zap,
} from "lucide-react";
import Navbar from "../../component/Nav.jsx";
import { useSelector } from "react-redux";
import { CheckCircle } from "lucide-react";

const Analytics = () => {
  const { userData } = useSelector((state) => state.user);
  const summary = [
    {
      label: "Total Students",
      value: "2,540",
      icon: Users,
      color: "from-blue-500 to-indigo-600",
      shadow: "shadow-blue-200",
    },
    {
      label: "Total Courses",
      value: "12",
      icon: BookOpen,
      color: "from-purple-500 to-pink-600",
      shadow: "shadow-purple-200",
    },
    {
      label: "Total Earnings",
      value: "$18,245",
      icon: DollarSign,
      color: "from-emerald-400 to-teal-600",
      shadow: "shadow-emerald-200",
    },
    {
      label: "Avg. Rating",
      value: "4.9",
      icon: Star,
      color: "from-orange-400 to-amber-600",
      shadow: "shadow-orange-200",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f1f5f9] font-sans pb-20">
      <Navbar />

      {/* Dynamic Header Section */}
      <div className="bg-[#0a0a23] pt-32 pb-30 px-3 md:px-10 clip-path-slant">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Profile Identity Section (Left Side) */}

          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="relative group">
              <div className="absolute -inset-1 bg-linear-to-tr from-indigo-500 to-cyan-400 rounded-[2.5rem] blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
              <div className="relative bg-[#1a1a40] p-1 rounded-[2.5rem] border border-white/10 shadow-1xl">
                <img
                  src={
                    userData?.photoUrl ||
                    "https://api.dicebear.com/7.x/avataaars/svg?seed=Arjun"
                  }
                  className="w-22 h-22 md:w-30 md:h-30 rounded-[2.2rem] object-cover"
                  alt="Educator"
                />
                <div className="absolute top-4 right-4 w-2 h-2 bg-emerald-500 border-4 border-[#1a1a40] rounded-full shadow-lg shadow-emerald-500/20"></div>
              </div>
            </div>

            {/* Name, Email & Courses Info */}
            <div className="text-center md:text-left flex flex-col justify-center">
              <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">
                {userData?.name || "Arjun Mehta"}
              </h1>

              <p className="text-slate-400 font-sm mt-1 flex items-center text-[14px] justify-center md:justify-start gap-2">
                {userData?.email || "arjun.dev@example.com"}
              </p>

              {/* Horizontal Stats for Courses */}
              <div className="mt-6 flex items-center justify-center md:justify-start gap-8">
                <div className="flex flex-col">
                  <span className="text-indigo-400 font-black text-xl">12</span>
                  <span className="text-slate-500 text-[9px] font-bold uppercase tracking-widest">
                    Total Courses
                  </span>
                </div>
                <div className="w-px h-9 bg-white/10"></div>
                <div className="flex flex-col">
                  <span className="text-white font-black text-xl">2.5k</span>
                  <span className="text-slate-500 text-[9px] font-bold uppercase tracking-widest">
                    Active Students
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Revenue Glass Card */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-[2.5rem] relative overflow-hidden group">
            <div className="relative z-10">
              <p className="text-slate-300 text-[9px] font-bold">
                Monthly Payout
              </p>
              <h2 className="text-2xl font-black text-white mt-2 tracking-tighter">
                $2,400.00
              </h2>
              <div className="flex items-center gap-3 mt-6">
                <div className="bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full font-bold flex items-center gap-1 text-[12px]">
                  <ArrowUpRight size={12} /> +18.4%
                </div>
              </div>
            </div>
            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-indigo-500/20 rounded-full blur-3xl group-hover:bg-indigo-500/40 transition-all"></div>
          </div>
        </div>
      </div>

      {/* Overlapping Content Container */}
      <main className="max-w-7xl mx-auto px-6 md:px-10 -mt-20">
        {/* Bento Summary Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {summary.map((item, i) => (
            <div
              key={i}
              className={`bg-white p-2 rounded-4xl border border-white shadow-xl ${item.shadow} hover:-translate-y-2 transition-all duration-300`}
            >
              <div className="flex items-center gap-4 p-4">
                <div
                  className={`w-12 h-12 bg-linear-to-br ${item.color} rounded-2xl flex items-center justify-center text-white shadow-lg`}
                >
                  <item.icon size={24} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    {item.label}
                  </p>
                  <h3 className="text-2xl font-black text-slate-800">
                    {item.value}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Chart Section - Takes 8 cols */}
          <div className="lg:col-span-8 bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
            <div className="flex justify-between items-center mb-10">
              <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                Student Retention
              </h3>
              <div className="flex gap-2">
                <button className="px-4 py-2 bg-slate-50 rounded-xl text-xs font-bold text-slate-600 hover:bg-indigo-600 hover:text-white transition">
                  Week
                </button>
                <button className="px-4 py-2 bg-indigo-600 rounded-xl text-xs font-bold text-white shadow-lg shadow-indigo-200">
                  Month
                </button>
              </div>
            </div>

            <div className="h-64 flex items-end gap-4">
              {[40, 70, 45, 90, 65, 80, 55, 95, 70, 85].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 flex flex-col items-center gap-3 group"
                >
                  <div
                    className="w-full bg-slate-100 rounded-2xl group-hover:bg-indigo-600 transition-all duration-500 relative"
                    style={{ height: `${h}%` }}
                  >
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                      {h}%
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-slate-400">
                    0{i + 1}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Achievement Card - Takes 4 cols */}
          <div className="lg:col-span-4 bg-gradient-to-br from-indigo-600 to-violet-700 rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-2xl shadow-indigo-300">
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6">
                <Award size={30} className="text-yellow-300" />
              </div>
              <div>
                <h3 className="text-2xl font-bold leading-tight mb-2">
                  Top Performer <br />
                  Badge!
                </h3>
                <p className="text-indigo-100 text-sm leading-relaxed mb-6">
                  Your course completion rate is 25% higher than the global
                  average.
                </p>
                <button className="w-full py-4 bg-white text-indigo-600 rounded-2xl font-bold text-sm shadow-xl hover:scale-[1.02] transition-transform">
                  Share Milestone
                </button>
              </div>
            </div>
            {/* Decorative element */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 blur-2xl"></div>
          </div>

          {/* Table Section - Full width list style */}
          <div className="lg:col-span-12 mt-4">
            <div className="flex justify-between items-center mb-6 px-4">
              <h3 className="text-xl font-bold text-slate-800">
                Popular Content
              </h3>
              <TrendingUp size={20} className="text-indigo-600" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  name: "React Mastery 2026",
                  sales: "1.2k",
                  trend: "+12%",
                  color: "bg-blue-500",
                },
                {
                  name: "Fullstack Architecture",
                  sales: "840",
                  trend: "+5%",
                  color: "bg-purple-500",
                },
                {
                  name: "Modern CSS Mastery",
                  sales: "2.1k",
                  trend: "+24%",
                  color: "bg-pink-500",
                },
                {
                  name: "Backend with Node",
                  sales: "560",
                  trend: "-2%",
                  color: "bg-orange-500",
                },
              ].map((course, idx) => (
                <div
                  key={idx}
                  className="bg-white p-5 rounded-3xl border border-slate-100 flex items-center justify-between hover:border-indigo-200 transition-colors cursor-pointer group shadow-sm"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-3 h-12 rounded-full ${course.color} opacity-20 group-hover:opacity-100 transition-opacity`}
                    ></div>
                    <div>
                      <h4 className="font-bold text-slate-800 text-sm">
                        {course.name}
                      </h4>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">
                        Total Students: {course.sales}
                      </p>
                    </div>
                  </div>
                  <div
                    className={`text-xs font-black ${course.trend.includes("+") ? "text-emerald-500" : "text-rose-500"}`}
                  >
                    {course.trend}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Analytics;
