import { useEffect, useState } from 'react';
import { 
  Search,  UserX, UserCheck, 
  Eye, GraduationCap, Calendar, Mail, BarChart3, 
  CheckCircle2, X, ArrowUpRight
} from 'lucide-react';
import { useMemo } from "react";
import Navbar from '../../component/Nav';
import axios from 'axios';
import { serverURL } from '../../App';

const LearnersManager = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [students, setStudents] = useState([]);

  const getStudnet = async () => {
    try {
      const result = await axios.get(serverURL + "/api/admin/users",{withCredentials:true})
      const educators = result.data.filter(
        user => user.role === "Student");
      setStudents(educators);
    } catch (error) {
      console.log(error);
    }
  }

    useEffect(() => {
      getStudnet();
    }, []);


  // 2. Toggle Status (Syncing both list and drawer)
  const toggleStatus = async (id, currentStatus) => {
    try {
      const res = await axios.patch(
        `${serverURL}/api/admin/user/${id}`,
        { isActive: !currentStatus },
        { withCredentials: true }
      );

      const updatedUser = res.data.user || res.data; // Handles different API response structures

      // Update the main list
      setStudents(prev =>
        prev.map(s => s._id === id ? { ...s, isActive: updatedUser.isActive } : s)
      );

      // CRITICAL FIX: Update the drawer data immediately
      if (selectedStudent?._id === id) {
        setSelectedStudent(prev => ({
          ...prev,
          isActive: updatedUser.isActive
        }));
      }
    } catch (error) {
      console.error("Status update failed:", error);
    }
  };

const activeUsersCount = students.filter(s => s.isActive).length;

  const totalAvgCompletion = students.length > 0 
    ? (students.reduce((acc, curr) => {
        const count = curr.enrolledCourses?.length || 0;
        return acc + Math.min(100, count * 20); 
      }, 0) / students.length).toFixed(1)
    : "0.0";

    const filteredStudents = useMemo(() => {
  return students.filter(s =>
    s.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );
}, [students, searchTerm]);

  return (
    <div className="min-h-screen bg-[#0a0a23] text-slate-200 p-6 pt-28">
      <div className="max-w-7xl mx-auto">
        <Navbar />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          <div className="lg:col-span-1">
            <h1 className="text-3xl font-black text-white tracking-tight">Learners <span className="text-indigo-500 underline decoration-indigo-500/30">Hub</span></h1>
            <p className="text-slate-500 text-sm mt-2 font-medium">Monitor student engagement and account security.</p>
          </div>
          
          <div className="bg-[#161636]/50 border border-white/10 p-4 rounded-2xl flex items-center gap-4 backdrop-blur-md">
            <div className="bg-indigo-500/10 p-3 rounded-xl text-indigo-500"><BarChart3 size={20}/></div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Avg. Completion</p>
              <p className="text-xl font-bold text-white">{totalAvgCompletion}</p>
            </div>
          </div>
          
          <div className="bg-[#161636]/50 border border-white/10 p-4 rounded-2xl flex items-center gap-4 backdrop-blur-md">
            <div className="bg-emerald-500/10 p-3 rounded-xl text-emerald-500"><UserCheck size={20}/></div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Active Now</p>
              <p className="text-xl font-bold text-white">{activeUsersCount}</p>
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
                {filteredStudents.length > 0 ? (
                  filteredStudents.map((student) => {
                    const coursesCount = student.enrolledCourses?.length || 0;
                    const progress = coursesCount === 0 
                      ? "0%" 
                      : `${Math.min(100, coursesCount * 20)}%`;
                    return (
                      <tr key={student._id} className="hover:bg-white/2 transition-all group">
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-4">
                            <div className="size-10 rounded-full bg-linear-to-tr from-slate-700 to-slate-900 border border-white/10 flex items-center justify-center font-bold text-indigo-400 group-hover:scale-110 transition-transform">
                              {student.photoUrl ? <img src={student.photoUrl} alt="" className="size-full object-cover" /> : student.name?.charAt(0)}
                            </div>
                            <div>
                              <div className="font-bold text-slate-100">{student.name}</div>
                              <div className="text-[10px] text-slate-500 font-medium flex items-center gap-1">
                                <Calendar size={10}/> Joined {new Date(student.createdAt).toLocaleDateString("en-GB")}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-5 text-center">
                          <span className="text-sm font-mono font-bold text-indigo-400 bg-indigo-500/5 px-3 py-1 rounded-lg border border-indigo-500/10">
                          {coursesCount} {coursesCount === 1 ? 'Course' : 'Courses'}
                          </span>
                        </td>
                        <td className="px-6 py-5 text-center">
                          <div className="flex flex-col items-center gap-1">
                            <span className="text-xs font-bold text-slate-300">{progress}</span>
                            <div className="w-16 h-1 bg-white/5 rounded-full overflow-hidden">
                              <div className="h-full bg-indigo-500" style={{width: progress}} />
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          <button 
                            onClick={() => toggleStatus(student._id, student.isActive)}
                            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-[10px] font-black tracking-widest uppercase transition-all ${
                                student.isActive 
                                ? 'bg-emerald-500/5 border-emerald-500/20 text-emerald-500' 
                                : 'bg-rose-500/5 border-rose-500/20 text-rose-500'
                            }`}>
                            <div className={`h-1.5 w-1.5 rounded-full ${student.isActive ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`} />
                            {student.isActive ? 'Active' : 'Blocked'}
                          </button>
                        </td>
                        <td className="px-6 py-5 text-right">
                          <div className="flex justify-end gap-2">
                            <button onClick={() => setSelectedStudent(student)} className="p-2.5 hover:bg-white/5 rounded-xl text-slate-400 hover:text-white transition shadow-sm">
                              <Eye size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      className="text-center py-10 text-slate-500"
                    >
                      No learners found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {selectedStudent && (
        <div className="fixed inset-0 z-150 flex justify-end">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setSelectedStudent(null)} />
          
          <div className="relative w-full max-w-md bg-[#0d0d2b] border-l border-white/10 h-full flex flex-col shadow-[-20px_0_50px_rgba(0,0,0,0.5)] animate-in slide-in-from-right duration-500">
            
            <div className="relative h-32 bg-linear-to-r from-indigo-600 to-indigo-900 w-full">
               <button onClick={() => setSelectedStudent(null)} className="absolute top-4 right-4 p-2 bg-black/20 hover:bg-black/40 rounded-full transition text-white z-10">
                 <X size={20}/>
               </button>
            </div>

            <div className="px-8 -mt-12 relative flex flex-col items-center">
              <div className="size-24 rounded-2xl bg-[#161636] border-4 border-[#0d0d2b] flex items-center justify-center text-4xl font-black text-white shadow-xl overflow-hidden">
                {selectedStudent.photoUrl ? (
                  <img src={selectedStudent.photoUrl} alt="" className="size-full object-cover" />
                ) : (
                  selectedStudent.name.charAt(0)
                )}
              </div>
              <div className="mt-4 text-center">
                <h2 className="text-2xl font-bold text-white tracking-tight">{selectedStudent.name}</h2>
                <div className="flex items-center justify-center gap-2 mt-1">
                  <Mail size={12} className="text-slate-500" />
                  <p className="text-slate-400 text-sm font-medium">{selectedStudent.email}</p>
                </div>
              </div>
            </div>

            <div className="p-8 space-y-8 flex-1 overflow-y-auto">
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 border border-white/10 p-4 rounded-2xl backdrop-blur-sm group hover:border-indigo-500/50 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-500"><GraduationCap size={16}/></div>
                    <ArrowUpRight size={14} className="text-slate-600" />
                  </div>
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Enrolled</p>
                  <p className="text-xl font-bold text-white">{selectedStudent.enrolledCourses?.length || 0} Courses</p>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-2xl backdrop-blur-sm group hover:border-emerald-500/50 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-500"><CheckCircle2 size={16}/></div>
                  </div>
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Avg Score</p>
                  <p className="text-xl font-bold text-white">
                    {selectedStudent.examScores?.length > 0 
                      ? Math.round(selectedStudent.examScores.reduce((a, b) => a + b.score, 0) / selectedStudent.examScores.length)
                      : 0}%
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-[11px] font-black text-indigo-500 uppercase tracking-[0.2em] flex items-center gap-2">
                  <div className="h-px w-4 bg-indigo-500" /> Bio & About
                </h3>
                <div className="bg-white/3 border border-white/5 p-4 rounded-2xl italic text-slate-400 text-sm leading-relaxed">
                  {selectedStudent.description || "No bio information provided by the student yet."}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-[11px] font-black text-indigo-500 uppercase tracking-[0.2em] flex items-center gap-2">
                  <div className="h-px w-4 bg-indigo-500" /> Learning Progress
                </h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-sm font-bold text-white">Total Lectures Completed</p>
                      <p className="text-xs text-slate-500">Across all enrolled subjects</p>
                    </div>
                    <p className="text-2xl font-black text-indigo-400">
                       {selectedStudent.completedLectures?.reduce((acc, curr) => acc + curr.lectureIds.length, 0) || 0}
                    </p>
                  </div>
                  <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.5)] transition-all duration-1000" 
                      style={{ width: selectedStudent.enrolledCourses?.length > 0 ? '65%' : '0%' }} 
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8 border-t border-white/5 bg-white/2 flex gap-3">
              <button 
                onClick={() => toggleStatus(selectedStudent._id, selectedStudent.isActive)}
                className={`flex-2 py-4 rounded-xl font-black text-xs tracking-widest transition-all flex items-center justify-center gap-2 ${
                  selectedStudent.isActive 
                  ? 'bg-rose-500/10 text-rose-500 border border-rose-500/20 hover:bg-rose-500 hover:text-white' 
                  : 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 hover:bg-emerald-500 hover:text-white shadow-[0_0_20px_rgba(16,185,129,0.1)]'
                }`}
              >
                {selectedStudent.isActive ? <UserX size={16}/> : <UserCheck size={16}/>}
                {selectedStudent.isActive ? 'RESTRICT ACCOUNT' : 'UNBLOCK LEARNER'}
              </button>
              
              <button className="flex-1 py-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition flex items-center justify-center text-slate-400 hover:text-white">
                <Mail size={18} />
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default LearnersManager;