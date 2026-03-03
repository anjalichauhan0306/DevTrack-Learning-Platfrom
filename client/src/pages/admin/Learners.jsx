import React, { useState } from 'react';
import { 
  Search, Filter, MoreHorizontal, UserX, UserCheck, 
  Eye, GraduationCap, Calendar, Mail, BarChart3, 
  CheckCircle2, X, ArrowUpRight
} from 'lucide-react';
import Navbar from '../../component/Nav';

const LearnersManager = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);
  
  // Mock Data: Real world scenario stats
  const [students, setStudents] = useState([
    { id: 1, name: "Ankit Raj", email: "ankit.dev@gmail.com", joined: "12 Feb 2024", courses: 4, status: "Active", progress: "85%", activity: "High" },
    { id: 2, name: "Sneha Kapoor", email: "sneha.edu@outlook.com", joined: "01 Mar 2024", courses: 2, status: "Active", progress: "40%", activity: "Medium" },
    { id: 3, name: "Vicky Malhotra", email: "vicky.v@tech.io", joined: "20 Jan 2024", courses: 1, status: "Blocked", progress: "0%", activity: "None" },
  ]);

  const toggleStatus = (id) => {
    setStudents(students.map(s => 
      s.id === id ? { ...s, status: s.status === "Active" ? "Blocked" : "Active" } : s
    ));
    if(selectedStudent?.id === id) setSelectedStudent(null);
  };

  return (
    <div className="min-h-screen bg-[#0a0a23] text-slate-200 p-6 pt-28">
      <div className="max-w-7xl mx-auto">
        <Navbar />
        {/* --- Header & Quick Analytics --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          <div className="lg:col-span-1">
            <h1 className="text-3xl font-black text-white tracking-tight">Learners <span className="text-indigo-500 underline decoration-indigo-500/30">Hub</span></h1>
            <p className="text-slate-500 text-sm mt-2 font-medium">Monitor student engagement and account security.</p>
          </div>
          
          {/* Small Stats Cards for Visual Impact */}
          <div className="bg-[#161636]/50 border border-white/10 p-4 rounded-2xl flex items-center gap-4 backdrop-blur-md">
            <div className="bg-indigo-500/10 p-3 rounded-xl text-indigo-500"><BarChart3 size={20}/></div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Avg. Completion</p>
              <p className="text-xl font-bold text-white">64.2%</p>
            </div>
          </div>
          
          <div className="bg-[#161636]/50 border border-white/10 p-4 rounded-2xl flex items-center gap-4 backdrop-blur-md">
            <div className="bg-emerald-500/10 p-3 rounded-xl text-emerald-500"><UserCheck size={20}/></div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Active Now</p>
              <p className="text-xl font-bold text-white">128 Users</p>
            </div>
          </div>
        </div>

        {/* --- Search & Filter Bar --- */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <input 
              type="text" 
              placeholder="Search by name, email or UID..." 
              className="w-full bg-[#161636] border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-sm focus:border-indigo-500/50 outline-none transition-all placeholder:text-slate-600"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="bg-[#161636] border border-white/10 px-6 py-3 rounded-xl flex items-center gap-2 text-sm font-bold hover:bg-white/5 transition tracking-wide">
            <Filter size={18} className="text-indigo-500"/> SORT BY: NEWEST
          </button>
        </div>

        {/* --- Learners Table --- */}
        <div className="bg-[#161636]/40 border border-white/10 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-md">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-white/5 border-b border-white/10 text-[11px] font-black uppercase tracking-[0.2em] text-slate-500">
                  <th className="px-6 py-5">Student Details</th>
                  <th className="px-6 py-5 text-center">Enrolled</th>
                  <th className="px-6 py-5 text-center">Progress</th>
                  <th className="px-6 py-5">Status</th>
                  <th className="px-6 py-5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {students.filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase())).map((student) => (
                  <tr key={student.id} className="hover:bg-white/[0.02] transition-all group">
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        <div className="size-10 rounded-full bg-gradient-to-tr from-slate-700 to-slate-900 border border-white/10 flex items-center justify-center font-bold text-indigo-400 group-hover:scale-110 transition-transform">
                          {student.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-bold text-slate-100">{student.name}</div>
                          <div className="text-[10px] text-slate-500 font-medium flex items-center gap-1">
                            <Calendar size={10}/> Joined {student.joined}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-center">
                      <span className="text-sm font-mono font-bold text-indigo-400 bg-indigo-500/5 px-3 py-1 rounded-lg border border-indigo-500/10">
                        {student.courses} Courses
                      </span>
                    </td>
                    <td className="px-6 py-5 text-center">
                       <div className="flex flex-col items-center gap-1">
                         <span className="text-xs font-bold text-slate-300">{student.progress}</span>
                         <div className="w-16 h-1 bg-white/5 rounded-full overflow-hidden">
                            <div className="h-full bg-indigo-500" style={{width: student.progress}} />
                         </div>
                       </div>
                    </td>
                    <td className="px-6 py-5">
                      <button 
                        onClick={() => toggleStatus(student.id)}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-[10px] font-black tracking-widest uppercase transition-all ${
                        student.status === 'Active' 
                        ? 'bg-emerald-500/5 border-emerald-500/20 text-emerald-500' 
                        : 'bg-rose-500/5 border-rose-500/20 text-rose-500'
                      }`}>
                        <div className={`h-1.5 w-1.5 rounded-full ${student.status === 'Active' ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`} />
                        {student.status}
                      </button>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <div className="flex justify-end gap-2">
                        <button onClick={() => setSelectedStudent(student)} className="p-2.5 hover:bg-white/5 rounded-xl text-slate-400 hover:text-white transition shadow-sm">
                          <Eye size={18} />
                        </button>
                        <button className="p-2.5 hover:bg-white/5 rounded-xl text-slate-400 transition">
                          <MoreHorizontal size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* --- Student Detail Side Drawer --- */}
      {selectedStudent && (
        <div className="fixed inset-0 z-[150] flex justify-end">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedStudent(null)} />
          <div className="relative w-full max-w-md bg-[#0d0d2b] border-l border-white/10 h-full p-8 animate-in slide-in-from-right duration-300">
            <button onClick={() => setSelectedStudent(null)} className="absolute top-6 right-6 p-2 hover:bg-white/10 rounded-full transition text-slate-400"><X size={20}/></button>
            
            <div className="mt-10 flex flex-col items-center text-center">
              <div className="size-24 rounded-3xl bg-indigo-600 flex items-center justify-center text-4xl font-black mb-4 shadow-2xl shadow-indigo-600/20">
                {selectedStudent.name.charAt(0)}
              </div>
              <h2 className="text-2xl font-bold text-white">{selectedStudent.name}</h2>
              <p className="text-slate-500 text-sm mt-1">{selectedStudent.email}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-10">
               <div className="bg-white/5 border border-white/5 p-4 rounded-2xl">
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Learning Time</p>
                  <p className="text-xl font-bold text-white">42 Hours</p>
               </div>
               <div className="bg-white/5 border border-white/5 p-4 rounded-2xl">
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Certificates</p>
                  <p className="text-xl font-bold text-white">03</p>
               </div>
            </div>

            <div className="mt-10 space-y-6">
               <h4 className="text-[11px] font-black text-indigo-500 uppercase tracking-[0.2em] border-b border-white/5 pb-2">Recent Activity</h4>
               <div className="space-y-4">
                  <div className="flex gap-4 items-start">
                     <div className="size-2 bg-emerald-500 rounded-full mt-1.5" />
                     <div>
                        <p className="text-sm font-bold text-slate-200">Completed "React Basics" Module</p>
                        <p className="text-[10px] text-slate-500 font-medium italic">Yesterday at 4:30 PM</p>
                     </div>
                  </div>
                  <div className="flex gap-4 items-start opacity-60">
                     <div className="size-2 bg-indigo-500 rounded-full mt-1.5" />
                     <div>
                        <p className="text-sm font-bold text-slate-200">Enrolled in "Node.js Mastery"</p>
                        <p className="text-[10px] text-slate-500 font-medium italic">2 days ago</p>
                     </div>
                  </div>
               </div>
            </div>

            <div className="mt-auto absolute bottom-8 left-8 right-8 flex gap-4">
              <button 
                onClick={() => toggleStatus(selectedStudent.id)}
                className={`flex-1 py-4 rounded-2xl font-black text-xs tracking-widest transition-all ${
                selectedStudent.status === 'Active' 
                ? 'bg-rose-500/10 text-rose-500 border border-rose-500/20 hover:bg-rose-500 hover:text-white' 
                : 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 hover:bg-emerald-500 hover:text-white'
              }`}>
                {selectedStudent.status === 'Active' ? 'BLOCK ACCOUNT' : 'ACTIVATE ACCOUNT'}
              </button>
              <button className="p-4 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition">
                <Mail size={18} className="text-slate-400"/>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LearnersManager;