import React, { useMemo } from "react";
import {
  Users,
  BookOpen,
  DollarSign,
  Star,
  TrendingUp,
  ArrowUpRight,
  Award,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import Navbar from "../../component/Nav.jsx";
import { useSelector } from "react-redux";

const Analytics = () => {
  const { userData } = useSelector((state) => state.user);
  const { creatorCourseData } = useSelector((state) => state.course);

  // 1. Prepare Summary Data
  const summaryStats = useMemo(() => {
    const totalCourses = creatorCourseData?.length || 0;

     const studentSet = new Set();
  creatorCourseData?.forEach((course) => {
    course.enrolledStudents?.forEach((student) => {
      // Assuming student is an object with _id, else just use student
      studentSet.add(student._id?.toString() || student);
    });
  });
  const totalStudents = studentSet.size;

    const totalEarnings =
      creatorCourseData?.reduce(
        (sum, course) =>{
          const studentCount = course.enrolledStudents?.length || 0;
          const price = Number(course.Price || course.Price || 0);
          const courseRevenue = price * studentCount;
          return sum + courseRevenue
        },0) || 0;

    return [
      {
        label: "Total Students",
        value: totalStudents.toLocaleString(),
        icon: Users,
        color: "from-blue-500 to-indigo-600",
        shadow: "shadow-blue-200",
      },
      {
        label: "Total Courses",
        value: totalCourses,
        icon: BookOpen,
        color: "from-purple-500 to-pink-600",
        shadow: "shadow-purple-200",
      },
      {
        label: "Total Earnings",
        value: `$${totalEarnings.toLocaleString()}`,
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
  }, [creatorCourseData]);

  const sortedCourses = creatorCourseData ? [...creatorCourseData].sort((a, b) => {
  return (b.enrolledStudents?.length || 0) - (a.enrolledStudents?.length || 0);
}) : [];

const popularCourses = sortedCourses.slice(0, 4);

  const chartData = useMemo(
    () =>
      creatorCourseData?.map((course) => ({
        name: course.title?.slice(0, 10) + "...",
        students: course.enrolledStudents?.length || 0,
        fullName: course.title,
      })),
    [creatorCourseData],
  );

  const lectureData = useMemo(
    () =>
      creatorCourseData?.map((course) => ({
        name: course.title?.slice(0, 10) + "...",
        lectures: course.lectures?.length || 0, 
        fullName: course.title,
      })),
    [creatorCourseData],
  );



  const COLORS = ["#6366f1", "#8b5cf6", "#ec4899", "#f43f5e", "#f59e0b"];

  return (
    <div className="min-h-screen bg-[#f1f5f9] font-sans pb-20">
      <Navbar />

      <div className="bg-[#0a0a23] pt-32 pb-30 px-3 md:px-10 clip-path-slant">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="relative group">
              <div className="absolute -inset-1 bg-linear-to-tr from-indigo-500 to-cyan-400 rounded-[2.5rem] blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>

              <div className="relative bg-[#1a1a40] p-1 rounded-[2.5rem] border border-white/10">
                <img
                  src={
                    userData?.photoUrl ||
                    "https://api.dicebear.com/7.x/avataaars/svg?seed=Arjun"
                  }
                  className="w-22 h-22 md:w-30 md:h-30 rounded-[2.2rem] object-cover"
                  alt="Educator"
                />
              </div>
            </div>

            <div className="text-center md:text-left">
              <h1 className="text-2xl md:text-3xl font-black text-white">
                {userData?.name || "Educator"}
              </h1>

              <p className="text-slate-400 text-sm mt-1">{userData?.email}</p>

              <div className="mt-6 flex gap-8 justify-center md:justify-start">
                <div className="flex flex-col">
                  <span className="text-indigo-400 font-black text-xl">
                    {creatorCourseData?.length || 0}
                  </span>

                  <span className="text-slate-500 text-[9px] font-bold uppercase">
                    Total Courses
                  </span>
                </div>

                <div className="flex flex-col">
                  <span className="text-white font-black text-xl">
                    {summaryStats[0].value}
                  </span>

                  <span className="text-slate-500 text-[9px] font-bold uppercase">
                    Active Students
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-[2.5rem]">
            <p className="text-slate-300 text-[9px] font-bold">
              Estimated Revenue
            </p>

            <h2 className="text-2xl font-black text-white mt-2">
              {summaryStats[2].value}
            </h2>

            <div className="mt-6 inline-flex items-center gap-1 bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full text-xs font-bold">
              <ArrowUpRight size={12} /> +12.5% this month
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 md:px-10 -mt-20">
        {/* Bento Summary Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {summaryStats.map((item, i) => (
            <div
              key={i}
              className={`bg-white p-6 rounded-4xl shadow-xl ${item.shadow} hover:-translate-y-1 transition-all`}
            >
              <div className="flex items-center gap-4">
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
          {/* Chart 1: Enrollments */}
          <div className="lg:col-span-6 bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
            <h3 className="text-xl font-bold text-slate-900 mb-8">
              Enrollment Analytics
            </h3>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#f1f5f9"
                  />
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#94a3b8", fontSize: 10 }}
                    dy={10}
                  />
                  <YAxis hide />
                  <Tooltip
                    contentStyle={{
                      borderRadius: "16px",
                      border: "none",
                      boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
                    }}
                  />
                  <Bar
                    dataKey="students"
                    radius={[10, 10, 10, 10]}
                    barSize={35}
                  >
                    {chartData?.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chart 2: Lectures (Progress) */}
          <div className="lg:col-span-6 bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
            <h3 className="text-xl font-bold text-slate-900 mb-8">
              Course Content (Lectures)
            </h3>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={lectureData}>
                  {" "}
                  {/* Data fixed: lectureData use kiya */}
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#f1f5f9"
                  />
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#94a3b8", fontSize: 10 }}
                    dy={10}
                  />
                  <YAxis hide />
                  <Tooltip
                    contentStyle={{
                      borderRadius: "16px",
                      border: "none",
                      boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
                    }}
                  />
                  <Bar
                    dataKey="lectures"
                    radius={[10, 10, 10, 10]}
                    barSize={35}
                  >
                    {" "}
                    {/* dataKey fixed: lectures use kiya */}
                    {lectureData?.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Table Section */}
          <div className="lg:col-span-12 mt-4">
  <h3 className="text-xl font-bold text-slate-800 mb-6 px-4">Most Popular Courses</h3>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {popularCourses.map((course, idx) => (
      <div key={idx} className="bg-white p-5 rounded-3xl border border-slate-100 flex items-center justify-between group hover:shadow-md transition-all">
        <div className="flex items-center gap-4">
          {/* Rank Circle */}
          <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold">
            #{idx + 1}
          </div>
          <div>
            <h4 className="font-bold text-slate-800 text-sm">{course.title}</h4>
            <p className="text-[11px] text-slate-500">
              <span className="text-indigo-600 font-bold">{course.enrolledStudents?.length || 0}</span> Students enrolled
            </p>
          </div>
        </div>
        <div className="bg-emerald-100 text-emerald-600 p-2 rounded-xl">
          <TrendingUp size={16} />
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
