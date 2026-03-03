import React, { useState } from 'react';
import {
    Search, Filter, BookOpen, CheckCircle2, XCircle,
    Users, Calendar, MoreVertical, Eye, ExternalLink,
    Layers, CheckSquare, Clock
} from 'lucide-react';
import Navbar from '../../component/Nav';

const CourseManager = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState("All");

    const [courses, setCourses] = useState([
        { id: 1, title: "Full Stack MERN Mastery", instructor: "Dr. Sarah Jenkins", enrolled: 1240, status: "Active", date: "10 Jan 2024", category: "Development" },
        { id: 2, title: "Advanced Python Data Science", instructor: "Arjun Mehta", enrolled: 850, status: "Active", date: "22 Jan 2024", category: "Data Science" },
        { id: 3, title: "UI/UX Design Fundamentals", instructor: "Sneha Kapoor", enrolled: 432, status: "Draft", date: "05 Feb 2024", category: "Design" },
        { id: 4, title: "Cyber Security Essentials", instructor: "Marcus Thorne", enrolled: 0, status: "Inactive", date: "01 Mar 2024", category: "Security" },
    ]);

    const toggleCourseStatus = (id) => {
        setCourses(courses.map(c =>
            c.id === id ? { ...c, status: c.status === "Active" ? "Inactive" : "Active" } : c
        ));
    };

    return (
        <div className="min-h-screen bg-[#0a0a23] text-slate-200 p-6 pt-28 font-sans">
            <div className="max-w-7xl mx-auto">
                <Navbar />
                    <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div>
                            <h2 className="text-2xl font-semibold italic">Dashboard Overview</h2>
                            <p className="text-slate-400 text-sm mt-1">You currently have <span className="text-emerald-400 font-mono">{courses.filter(c => c.status === "Active").length}</span> active courses out of <span className="text-indigo-400 font-mono">{courses.length}</span> total.</p>
                        </div>

                        <div className="h-px md:h-12 md:w-px bg-slate-700"></div>

                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-white/5 rounded-2xl border border-white/10">
                                <Users className="text-amber-400" size={28} />
                            </div>
                            <div>
                                <p className="text-xs text-slate-500 uppercase font-bold tracking-tighter">Star Performer</p>
                                <p className="text-lg font-medium text-slate-200">MERN Mastery <span className="text-amber-400 ml-2 text-sm">(1.2k)</span></p>
                            </div>
                        </div>
                    </div>

                {/* --- Filters & Search --- */}
                <div className="flex flex-col md:flex-row gap-4 mb-8 mt-8">
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                        <input
                            type="text"
                            placeholder="Search by course or instructor..."
                            className="w-full bg-[#161636] border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 outline-none focus:border-indigo-500/50 transition-all text-sm"
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <select
                        className="bg-[#161636] border border-white/10 px-4 py-3 rounded-xl text-sm font-bold outline-none focus:border-indigo-500 transition cursor-pointer"
                        onChange={(e) => setFilterStatus(e.target.value)}
                    >
                        <option value="All">All Status</option>
                        <option value="Active">Active</option>
                        <option value="Draft">Draft</option>
                        <option value="Inactive">Inactive</option>
                    </select>
                </div>

                {/* --- Courses Table --- */}
                <div className="bg-[#161636]/40 border border-white/10 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-md">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-white/5 border-b border-white/10 text-[11px] font-black uppercase tracking-[0.2em] text-slate-500">
                                <th className="px-6 py-5">Course Details</th>
                                <th className="px-6 py-5">Instructor</th>
                                <th className="px-6 py-5 text-center">Enrollment</th>
                                <th className="px-6 py-5">Status</th>
                                <th className="px-6 py-5 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {courses
                                .filter(c => (filterStatus === "All" || c.status === filterStatus))
                                .filter(c => c.title.toLowerCase().includes(searchTerm.toLowerCase()) || c.instructor.toLowerCase().includes(searchTerm.toLowerCase()))
                                .map((course) => (
                                    <tr key={course.id} className="hover:bg-white/[0.02] transition-all group">
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-4">
                                                <div className="size-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-indigo-500/50 transition-colors">
                                                    <BookOpen size={20} className="text-indigo-400" />
                                                </div>
                                                <div>
                                                    <div className="font-bold text-slate-100 group-hover:text-indigo-400 transition-colors">{course.title}</div>
                                                    <div className="text-[10px] text-slate-500 font-medium flex items-center gap-1 mt-0.5">
                                                        <Clock size={10} /> {course.date} • {course.category}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5 text-sm font-semibold text-slate-300 italic underline decoration-indigo-500/20 underline-offset-4">
                                            {course.instructor}
                                        </td>
                                        <td className="px-6 py-5 text-center">
                                            <div className="flex flex-col items-center">
                                                <span className="text-sm font-black text-white">{course.enrolled.toLocaleString()}</span>
                                                <span className="text-[9px] text-slate-500 uppercase font-bold tracking-tighter">Students</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <span className={`px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase border ${course.status === 'Active' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' :
                                                    course.status === 'Draft' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' :
                                                        'bg-slate-500/10 text-slate-500 border-slate-500/20'
                                                }`}>
                                                {course.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-5 text-right">
                                            <div className="flex justify-end gap-2">
                                                <button className="p-2.5 hover:bg-white/5 rounded-xl text-slate-400 hover:text-indigo-400 transition shadow-sm">
                                                    <Eye size={18} />
                                                </button>
                                                <button
                                                    onClick={() => toggleCourseStatus(course.id)}
                                                    className={`p-2.5 hover:bg-white/5 rounded-xl transition ${course.status === 'Active' ? 'text-rose-500' : 'text-emerald-500'}`}
                                                >
                                                    {course.status === 'Active' ? <XCircle size={18} /> : <CheckCircle2 size={18} />}
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
    );
};

// Sub-component for Stats
const CourseStatCard = ({ label, value, icon, color, sub }) => (
    <div className="bg-[#161636]/50 border border-white/10 p-6 rounded-3xl backdrop-blur-md relative overflow-hidden group">
        <div className={`absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform ${color}`}>
            {icon}
        </div>
        <div className={`${color} mb-4`}>{icon}</div>
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">{label}</p>
        <div className="flex items-baseline gap-2 mt-1">
            <h2 className="text-3xl font-black text-white">{value}</h2>
            {sub && <span className="text-[10px] font-bold text-slate-400">{sub}</span>}
        </div>
    </div>
);

export default CourseManager;