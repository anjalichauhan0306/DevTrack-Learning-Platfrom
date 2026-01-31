import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import Navbar from '../../component/Nav.jsx';

const StudentsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const students = [
    { id: 1, name: "Arjun Mehta", email: "arjun@example.com", course: "React Mastery", progress: 65, lastLogin: "2 hours ago" },
    { id: 2, name: "Sneha Rao", email: "sneha.r@example.com", course: "Fullstack BootCamp", progress: 100, lastLogin: "1 day ago" },
    { id: 3, name: "Rahul Singh", email: "rahul.s@example.com", course: "UI/UX Design", progress: 0, lastLogin: "Never" },
  ];

  // Search Filter Logic
  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusStyles = (progress) => {
    if (progress === 100) return { label: "Completed", color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-100", bar: "bg-emerald-500" };
    if (progress > 0) return { label: "In Progress", color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-100", bar: "bg-amber-500" };
    return { label: "Not Started", color: "text-rose-600", bg: "bg-rose-50", border: "border-rose-100", bar: "bg-rose-400" };
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans">
      <Navbar />
      
      {/* 1. Header/Hero Section - This provides the dark background for the Navbar */}
      <div className="bg-[#0a0a23] pt-32 pb-20 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-indigo-400 font-bold tracking-[0.2em] uppercase text-xs mb-2">Educator Dashboard</h2>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Student <span className="text-indigo-500">Engagement</span>
          </h1>
          <p className="text-slate-400 text-sm mt-2">Manage your students and track their learning milestones in real-time.</p>
        </div>
      </div>

      {/* 2. Main Content - Shifted up slightly to overlap the hero */}
      <main className="max-w-7xl mx-auto px-6 md:px-10 -mt-10 pb-12">
        
        {/* Action Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Search by name or email..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-600/5 focus:border-indigo-600 outline-none transition-all shadow-sm"
            />
          </div>
          <button className="flex items-center justify-center gap-2 px-6 py-4 bg-white border border-slate-200 rounded-2xl text-slate-600 font-bold text-sm hover:bg-slate-50 transition-all shadow-sm">
            <Filter size={18} className="text-indigo-600" /> Filter Status
          </button>
        </div>

        {/* Table Card */}
        <div className="bg-white border border-slate-200 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100">
                  <th className="px-8 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Student Details</th>
                  <th className="px-8 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Course</th>
                  <th className="px-8 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Progress</th>
                  <th className="px-8 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Last Visit</th>
                  <th className="px-8 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredStudents.map((student) => {
                  const status = getStatusStyles(student.progress);
                  return (
                    <tr key={student.id} className="hover:bg-indigo-50/30 transition-colors group">
                      <td className="px-8 py-6">
                        <div className="font-bold text-slate-800 text-[15px] group-hover:text-indigo-600 transition-colors">{student.name}</div>
                        <div className="text-xs text-slate-400 font-medium">{student.email}</div>
                      </td>
                      <td className="px-8 py-6">
                        <span className="text-sm font-bold text-slate-600">{student.course}</span>
                        <div className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter mt-0.5">ID: #DEV-{student.id}024</div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <div className="w-24 bg-slate-100 rounded-full h-2 overflow-hidden">
                            <div 
                                className={`${status.bar} h-full rounded-full transition-all duration-1000`} 
                                style={{ width: `${student.progress}%` }}
                            ></div>
                          </div>
                          <span className="text-xs font-black text-slate-700">{student.progress}%</span>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                         <span className={`text-sm font-bold ${student.lastLogin === 'Never' ? 'text-rose-500' : 'text-slate-600'}`}>
                            {student.lastLogin}
                         </span>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <span className={`inline-flex items-center px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider border ${status.bg} ${status.color} ${status.border}`}>
                          {status.label}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {filteredStudents.length === 0 && (
                <div className="py-20 text-center text-slate-400">
                    No students found matching your search.
                </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentsPage;