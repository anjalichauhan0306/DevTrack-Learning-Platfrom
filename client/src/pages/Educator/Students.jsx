import React, { useState, useEffect } from "react";
import { Search, Mail, Calendar, CreditCard, Star, GraduationCap, Zap } from "lucide-react";
import Navbar from "../../component/Nav.jsx";
import axios from "axios";
import { serverURL } from "../../App.jsx";

const StudentsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const result = await axios.get(serverURL + "/api/course/getenrolled", {
        withCredentials: true,
      });
      setStudents(result.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const getCustomerTier = (amount) => {
    if (amount === 0)
      return { label: "Free User", color: "bg-slate-100 text-slate-600 border-slate-200" };
    if (amount < 2000)
      return { label: "Basic", color: "bg-blue-50 text-blue-600 border-blue-100" };
    if (amount < 5000)
      return { label: "Premium", color: "bg-purple-50 text-purple-600 border-purple-100" };
    return { label: "VIP ✨", color: "bg-amber-50 text-amber-700 border-amber-200" };
  };

  const getProcessedList = () => {
    const search = searchTerm.toLowerCase();
    const studentMap = new Map();

    students.forEach((item) => {
      const id = item.user?._id || item._id;
      if (!studentMap.has(id)) {
        studentMap.set(id, {
          ...item,
          totalSpend: item.price || 0,
          courseCount: 1,
          allCourses: [item.courseId?.courseTitle]
        });
      } else {
        const existing = studentMap.get(id);
        existing.totalSpend += (item.price || 0);
        existing.courseCount += 1;
        existing.allCourses.push(item.courseId?.courseTitle);
      }
    });

    return Array.from(studentMap.values()).filter(s =>
      (s.user?.name || s.name || "").toLowerCase().includes(search) ||
      (s.user?.email || s.email || "").toLowerCase().includes(search)
    );
  };

  const finalStudentsList = getProcessedList();

  return (
    <div className="min-h-screen bg-[#FDFEFF] font-sans">
      <Navbar />

      {/* Hero Section */}
      <div className="bg-[#050517] pt-32 pb-24 px-6 md:px-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-indigo-400 mb-3">
              <Zap size={16} className="fill-indigo-400" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em]">Admin Intelligence</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
              Revenue <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Insights</span>
            </h1>
            <p className="text-slate-400 text-sm mt-3 max-w-md leading-relaxed">
              Analyze student lifetime value, course distribution, and overall platform engagement metrics.
            </p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-sm">
            <div className="text-[10px] text-slate-500 uppercase font-bold mb-1">Total Students</div>
            <div className="text-2xl font-black text-white">{finalStudentsList.length}</div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 md:px-10 -mt-12 pb-20">
        {/* Search Bar Refined */}
        <div className="relative mb-10 group">
          <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
            <Search className="text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={20} />
          </div>
          <input
            type="text"
            placeholder="Search by student name, email or enrollment ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-14 pr-6 py-5 bg-white border-0 rounded-[1.5rem] shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all text-slate-600 placeholder:text-slate-400 font-medium"
          />
        </div>

        {/* Professional Table Design */}
        <div className="bg-white border border-slate-100 rounded-[2.5rem] shadow-[0_20px_60px_-20px_rgba(0,0,0,0.05)] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100">
                  <th className="px-8 py-6 text-[11px] font-bold text-slate-400 uppercase tracking-[0.1em]">Student Identity</th>
                  <th className="px-8 py-6 text-[11px] font-bold text-slate-400 uppercase tracking-[0.1em]">Academic & Financial</th>
                  <th className="px-8 py-6 text-[11px] font-bold text-slate-400 uppercase tracking-[0.1em]">History</th>
                  <th className="px-8 py-6 text-[11px] font-bold text-slate-400 uppercase tracking-[0.1em]">Tier Status</th>
                  <th className="px-8 py-6 text-[11px] font-bold text-slate-400 uppercase tracking-[0.1em] text-right">Performance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {finalStudentsList.map((student, index) => {
                  const tier = getCustomerTier(student.totalSpend);
                  return (
                    <tr key={index} className="hover:bg-indigo-50/30 transition-all group">
                      {/* Identity */}
                      <td className="px-8 py-7">
                        <div className="flex items-center gap-4">
                          <div className="relative">
                            <img
                              src={student.user?.photo || `https://ui-avatars.com/api/?name=${student.user?.name}&background=6366f1&color=fff`}
                              className="w-12 h-12 rounded-2xl object-cover shadow-sm group-hover:scale-105 transition-transform"
                              alt="profile"
                            />
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full"></div>
                          </div>
                          <div>
                            <div className="text-sm font-black text-slate-800 leading-tight mb-1">{student.user?.name}</div>
                            <div className="text-[11px] text-slate-400 flex items-center gap-1.5 font-medium">
                              <Mail size={12} className="text-slate-300" /> {student.user?.email}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Financials */}
                      <td className="px-8 py-7">
                        <div className="flex flex-col gap-2">
                          <div className="flex items-center gap-2">
                            <span className="bg-indigo-50 text-indigo-600 px-2.5 py-1 rounded-lg text-[10px] font-bold flex items-center gap-1.5 w-fit">
                              <GraduationCap size={12} /> {student.courseCount} Courses
                            </span>
                          </div>
                          <div className="text-[15px] font-black text-slate-900 flex items-center gap-1">
                            <span className="text-slate-400 font-normal">₹</span>{student.totalSpend.toLocaleString()}
                          </div>
                        </div>
                      </td>

                      {/* History */}
                      <td className="px-8 py-7">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-50 rounded-xl text-slate-500 border border-slate-100">
                          <Calendar size={13} className="text-slate-400" /> 
                          <span className="text-[11px] font-bold uppercase tracking-tight">
                            {student.enrolledAt ? new Date(student.enrolledAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : "—"}
                          </span>
                        </div>
                      </td>

                      {/* Tier Badge */}
                      <td className="px-8 py-7">
                        <span className={`text-[10px] font-black uppercase px-4 py-1.5 rounded-full border shadow-sm tracking-widest ${tier.color}`}>
                          {tier.label}
                        </span>
                      </td>

                      {/* Reviews Refined */}
                      <td className="px-8 py-7 text-right">
                        <div className="flex items-center justify-end gap-0.5 mb-1.5">
                          {[1,2,3,4,5].map(star => (
                            <Star key={star} size={12}
                              className={star <= (student.rating || 4) ? "fill-amber-400 text-amber-400" : "text-slate-200"} 
                            />
                          ))}
                        </div>
                        <div className="text-[10px] text-slate-400 font-medium italic opacity-70 group-hover:opacity-100 transition-opacity">
                          "Student feedback summary..."
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {finalStudentsList.length === 0 && !loading && (
            <div className="py-24 text-center">
              <div className="text-slate-300 mb-2 font-black text-xl uppercase tracking-widest">No Results</div>
              <p className="text-slate-400 text-sm">Try adjusting your search filters.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default StudentsPage;