// import React, { useState } from 'react';
// import {
//     Search, Filter, BookOpen, CheckCircle2, XCircle,
//     Users, Calendar, MoreVertical, Eye, ExternalLink,
//     Layers, CheckSquare, Clock
// } from 'lucide-react';
// import Navbar from '../../component/Nav';

// const CourseManager = () => {
//     const [searchTerm, setSearchTerm] = useState("");
//     const [filterStatus, setFilterStatus] = useState("All");

//     const [courses, setCourses] = useState([
//         { id: 1, title: "Full Stack MERN Mastery", instructor: "Dr. Sarah Jenkins", enrolled: 1240, status: "Active", date: "10 Jan 2024", category: "Development" },
//         { id: 2, title: "Advanced Python Data Science", instructor: "Arjun Mehta", enrolled: 850, status: "Active", date: "22 Jan 2024", category: "Data Science" },
//         { id: 3, title: "UI/UX Design Fundamentals", instructor: "Sneha Kapoor", enrolled: 432, status: "Draft", date: "05 Feb 2024", category: "Design" },
//         { id: 4, title: "Cyber Security Essentials", instructor: "Marcus Thorne", enrolled: 0, status: "Inactive", date: "01 Mar 2024", category: "Security" },
//     ]);

//     const toggleCourseStatus = (id) => {
//         setCourses(courses.map(c =>
//             c.id === id ? { ...c, status: c.status === "Active" ? "Inactive" : "Active" } : c
//         ));
//     };

//     return (
//         <div className="min-h-screen bg-[#0a0a23] text-slate-200 p-6 pt-28 font-sans">
//             <div className="max-w-7xl mx-auto">
//                 <Navbar />
//                     <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
//                         <div>
//                             <h2 className="text-2xl font-semibold italic">Dashboard Overview</h2>
//                             <p className="text-slate-400 text-sm mt-1">You currently have <span className="text-emerald-400 font-mono">{courses.filter(c => c.status === "Active").length}</span> active courses out of <span className="text-indigo-400 font-mono">{courses.length}</span> total.</p>
//                         </div>

//                         <div className="h-px md:h-12 md:w-px bg-slate-700"></div>

//                         <div className="flex items-center gap-4">
//                             <div className="p-3 bg-white/5 rounded-2xl border border-white/10">
//                                 <Users className="text-amber-400" size={28} />
//                             </div>
//                             <div>
//                                 <p className="text-xs text-slate-500 uppercase font-bold tracking-tighter">Star Performer</p>
//                                 <p className="text-lg font-medium text-slate-200">MERN Mastery <span className="text-amber-400 ml-2 text-sm">(1.2k)</span></p>
//                             </div>
//                         </div>
//                     </div>

//                 {/* --- Filters & Search --- */}
//                 <div className="flex flex-col md:flex-row gap-4 mb-8 mt-8">
//                     <div className="relative flex-1">
//                         <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
//                         <input
//                             type="text"
//                             placeholder="Search by course or instructor..."
//                             className="w-full bg-[#161636] border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 outline-none focus:border-indigo-500/50 transition-all text-sm"
//                             onChange={(e) => setSearchTerm(e.target.value)}
//                         />
//                     </div>
//                     <select
//                         className="bg-[#161636] border border-white/10 px-4 py-3 rounded-xl text-sm font-bold outline-none focus:border-indigo-500 transition cursor-pointer"
//                         onChange={(e) => setFilterStatus(e.target.value)}
//                     >
//                         <option value="All">All Status</option>
//                         <option value="Active">Active</option>
//                         <option value="Draft">Draft</option>
//                         <option value="Inactive">Inactive</option>
//                     </select>
//                 </div>

//                 {/* --- Courses Table --- */}
//                 <div className="bg-[#161636]/40 border border-white/10 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-md">
//                     <table className="w-full text-left">
//                         <thead>
//                             <tr className="bg-white/5 border-b border-white/10 text-[11px] font-black uppercase tracking-[0.2em] text-slate-500">
//                                 <th className="px-6 py-5">Course Details</th>
//                                 <th className="px-6 py-5">Instructor</th>
//                                 <th className="px-6 py-5 text-center">Enrollment</th>
//                                 <th className="px-6 py-5">Status</th>
//                                 <th className="px-6 py-5 text-right">Actions</th>
//                             </tr>
//                         </thead>
//                         <tbody className="divide-y divide-white/5">
//                             {courses
//                                 .filter(c => (filterStatus === "All" || c.status === filterStatus))
//                                 .filter(c => c.title.toLowerCase().includes(searchTerm.toLowerCase()) || c.instructor.toLowerCase().includes(searchTerm.toLowerCase()))
//                                 .map((course) => (
//                                     <tr key={course.id} className="hover:bg-white/[0.02] transition-all group">
//                                         <td className="px-6 py-5">
//                                             <div className="flex items-center gap-4">
//                                                 <div className="size-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-indigo-500/50 transition-colors">
//                                                     <BookOpen size={20} className="text-indigo-400" />
//                                                 </div>
//                                                 <div>
//                                                     <div className="font-bold text-slate-100 group-hover:text-indigo-400 transition-colors">{course.title}</div>
//                                                     <div className="text-[10px] text-slate-500 font-medium flex items-center gap-1 mt-0.5">
//                                                         <Clock size={10} /> {course.date} • {course.category}
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         </td>
//                                         <td className="px-6 py-5 text-sm font-semibold text-slate-300 italic underline decoration-indigo-500/20 underline-offset-4">
//                                             {course.instructor}
//                                         </td>
//                                         <td className="px-6 py-5 text-center">
//                                             <div className="flex flex-col items-center">
//                                                 <span className="text-sm font-black text-white">{course.enrolled.toLocaleString()}</span>
//                                                 <span className="text-[9px] text-slate-500 uppercase font-bold tracking-tighter">Students</span>
//                                             </div>
//                                         </td>
//                                         <td className="px-6 py-5">
//                                             <span className={`px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase border ${course.status === 'Active' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' :
//                                                     course.status === 'Draft' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' :
//                                                         'bg-slate-500/10 text-slate-500 border-slate-500/20'
//                                                 }`}>
//                                                 {course.status}
//                                             </span>
//                                         </td>
//                                         <td className="px-6 py-5 text-right">
//                                             <div className="flex justify-end gap-2">
//                                                 <button className="p-2.5 hover:bg-white/5 rounded-xl text-slate-400 hover:text-indigo-400 transition shadow-sm">
//                                                     <Eye size={18} />
//                                                 </button>
//                                                 <button
//                                                     onClick={() => toggleCourseStatus(course.id)}
//                                                     className={`p-2.5 hover:bg-white/5 rounded-xl transition ${course.status === 'Active' ? 'text-rose-500' : 'text-emerald-500'}`}
//                                                 >
//                                                     {course.status === 'Active' ? <XCircle size={18} /> : <CheckCircle2 size={18} />}
//                                                 </button>
//                                             </div>
//                                         </td>
//                                     </tr>
//                                 ))}
//                         </tbody>
//                     </table>
//                 </div>
//             </div>
//         </div>
//     );
// };

// // Sub-component for Stats
// const CourseStatCard = ({ label, value, icon, color, sub }) => (
//     <div className="bg-[#161636]/50 border border-white/10 p-6 rounded-3xl backdrop-blur-md relative overflow-hidden group">
//         <div className={`absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform ${color}`}>
//             {icon}
//         </div>
//         <div className={`${color} mb-4`}>{icon}</div>
//         <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">{label}</p>
//         <div className="flex items-baseline gap-2 mt-1">
//             <h2 className="text-3xl font-black text-white">{value}</h2>
//             {sub && <span className="text-[10px] font-bold text-slate-400">{sub}</span>}
//         </div>
//     </div>
// );

// export default CourseManager;


import React, { useState, useEffect, useMemo } from 'react';
import { 
  Search, BookOpen, Eye, Users, 
  Layers, CheckSquare, Loader2, AlertCircle, Clock 
} from 'lucide-react';
import Navbar from '../../component/Nav';
import axios from 'axios';
import { serverURL } from '../../App';

const CourseManager = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState("All");

    // Real data fetch logic
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const res = await axios.get(`${serverURL}/api/admin/courses`, { withCredentials: true });
                setCourses(res.data.courses || res.data);
            } catch (err) {
                console.error("Fetch error", err);
            } finally {
                setLoading(false);
            }
        };
        fetchCourses();
    }, []);

    // Filter Logic
    const filteredCourses = useMemo(() => {
        return courses.filter(c => {
            const matchesStatus = filterStatus === "All" || 
                (filterStatus === "Published" ? c.isPublished : !c.isPublished);
            const matchesSearch = c.title.toLowerCase().includes(searchTerm.toLowerCase());
            return matchesStatus && matchesSearch;
        });
    }, [courses, searchTerm, filterStatus]);

    return (
        <div className="min-h-screen bg-[#0a0a23] text-slate-200 p-6 pt-28">
            <div className="max-w-7xl mx-auto">
                <Navbar />

                {/* Header Section */}
                <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-black text-white tracking-tight">Course <span className="text-indigo-500">Catalog</span></h1>
                        <p className="text-slate-500 text-sm mt-1">Manage content, pricing, and student accessibility.</p>
                    </div>
                    
                    {/* Compact Stats */}
                    <div className="flex gap-4">
                        <div className="bg-[#161636] border border-white/5 px-5 py-3 rounded-2xl">
                            <p className="text-[10px] font-bold text-slate-500 uppercase">Total Published</p>
                            <p className="text-xl font-black text-emerald-400">{courses.filter(c => c.isPublished).length}</p>
                        </div>
                    </div>
                </div>

                {/* Controls */}
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={18} />
                        <input 
                            type="text" 
                            placeholder="Search by title..."
                            className="w-full bg-[#161636] border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm focus:border-indigo-500/50 outline-none"
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <select 
                        className="bg-[#161636] border border-white/10 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-widest outline-none"
                        onChange={(e) => setFilterStatus(e.target.value)}
                    >
                        <option value="All">All Status</option>
                        <option value="Published">Published</option>
                        <option value="Draft">Drafts</option>
                    </select>
                </div>

                {/* Table */}
                <div className="bg-[#161636]/40 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-md">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-white/5 border-b border-white/10 text-[11px] font-black uppercase tracking-[0.2em] text-slate-500">
                                <th className="px-6 py-5">Content Details</th>
                                <th className="px-6 py-5">Difficulty & Price</th>
                                <th className="px-6 py-5 text-center">Engagement</th>
                                <th className="px-6 py-5">Status</th>
                                <th className="px-6 py-5 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {loading ? (
                                <tr><td colSpan="5" className="py-20 text-center"><Loader2 className="animate-spin mx-auto text-indigo-500" /></td></tr>
                            ) : filteredCourses.map((course) => (
                                <tr key={course._id} className="hover:bg-white/[0.02] transition-colors group">
                                    {/* Column 1: Image + Title + Content Count */}
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-4">
                                            <div className="size-14 rounded-xl bg-slate-800 border border-white/10 overflow-hidden flex-shrink-0">
                                                {course.thumbnail ? <img src={course.thumbnail} alt="" className="size-full object-cover" /> : <div className="size-full flex items-center justify-center text-indigo-500"><Layers size={20}/></div>}
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-slate-100 leading-tight group-hover:text-indigo-400 transition-colors">{course.title}</h3>
                                                <div className="flex items-center gap-3 mt-1.5 text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                                                    <span className="flex items-center gap-1"><BookOpen size={12}/> {course.lectures?.length || 0} Lectures</span>
                                                    <span className="flex items-center gap-1"><CheckSquare size={12}/> {course.quizzes?.length || 0} Quizzes</span>
                                                </div>
                                            </div>
                                        </div>
                                    </td>

                                    {/* Column 2: Level & Pricing */}
                                    <td className="px-6 py-5">
                                        <div className="flex flex-col gap-1">
                                            <span className={`text-[10px] font-black px-2 py-0.5 rounded-md w-fit ${
                                                course.level === 'Beginner' ? 'bg-emerald-500/10 text-emerald-500' : 
                                                course.level === 'Advanced' ? 'bg-rose-500/10 text-rose-500' : 'bg-blue-500/10 text-blue-500'
                                            }`}>
                                                {course.level?.toUpperCase()}
                                            </span>
                                            <p className="text-sm font-bold text-white">
                                                {course.isPaid ? `₹${course.Price}` : <span className="text-emerald-400">FREE</span>}
                                            </p>
                                        </div>
                                    </td>

                                    {/* Column 3: Stats */}
                                    <td className="px-6 py-5 text-center">
                                        <div className="inline-flex flex-col items-center bg-white/5 px-3 py-1.5 rounded-xl border border-white/5">
                                            <span className="text-sm font-black text-white flex items-center gap-1.5">
                                                <Users size={14} className="text-indigo-400"/> {course.enrolledStudents?.length || 0}
                                            </span>
                                            <span className="text-[9px] text-slate-500 font-black uppercase">Learners</span>
                                        </div>
                                    </td>

                                    {/* Column 4: Publish Status */}
                                    <td className="px-6 py-5">
                                        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg border text-[10px] font-black tracking-widest ${
                                            course.isPublished 
                                            ? 'bg-emerald-500/5 border-emerald-500/20 text-emerald-500' 
                                            : 'bg-amber-500/5 border-amber-500/20 text-amber-500'
                                        }`}>
                                            <div className={`size-1.5 rounded-full ${course.isPublished ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
                                            {course.isPublished ? 'PUBLISHED' : 'DRAFT'}
                                        </div>
                                    </td>

                                    {/* Column 5: Action */}
                                    <td className="px-6 py-5 text-right">
                                        <button className="p-3 bg-white/5 hover:bg-indigo-500 hover:text-white rounded-xl text-slate-400 transition-all shadow-xl group/btn">
                                            <Eye size={18} className="group-hover/btn:scale-110 transition-transform" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {filteredCourses.length === 0 && !loading && (
                        <div className="py-20 text-center text-slate-500 font-medium italic">No courses found matching your criteria.</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CourseManager;