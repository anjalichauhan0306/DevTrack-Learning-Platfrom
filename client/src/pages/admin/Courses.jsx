import { useState, useEffect, useMemo } from 'react';
import {
    Search, BookOpen, Eye, Users,
    Layers, CheckSquare, Loader2
} from 'lucide-react';
import Navbar from '../../component/Nav';
import { getAllCourseByAdmin } from '../../api/adminAPI';

const CourseManager = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState("All");

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const res = await getAllCourseByAdmin();
                setCourses(res.data.courses || res.data);
            } catch (err) {
                console.error("Fetch error", err);
            } finally {
                setLoading(false);
            }
        };
        fetchCourses();
    }, []);

    const filteredCourses = useMemo(() => {
        return courses.filter(c => {
            const matchesStatus = filterStatus === "All" ||
                (filterStatus === "Published" ? c.isPublished : !c.isPublished);
            const matchesSearch = c.title?.toLowerCase().includes(searchTerm.toLowerCase());
            return matchesStatus && matchesSearch;
        });
    }, [courses, searchTerm, filterStatus]);

    const totalPublished = useMemo(() =>
    courses.filter(c => c.isPublished).length,
    [courses]
);
    return (
        <div className="min-h-screen bg-[#0a0a23] text-slate-200 p-6 pt-28">
            <div className="max-w-7xl mx-auto">
                <Navbar />

                <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-black text-white tracking-tight">Course <span className="text-indigo-500">Catalog</span></h1>
                        <p className="text-slate-500 text-sm mt-1">Manage content, pricing, and student accessibility.</p>
                    </div>

                    <div className="flex gap-4">
                        <div className="bg-[#161636] border border-white/5 px-5 py-3 rounded-2xl">
                            <p className="text-[10px] font-bold text-slate-500 uppercase">Total Published</p>
                            <p className="text-xl font-black text-emerald-400">{totalPublished}</p>
                        </div>
                    </div>
                </div>

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
                                <tr key={course._id} className="hover:bg-white/2 transition-colors group">
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-4">
                                            <div className="size-14 rounded-xl bg-slate-800 border border-white/10 overflow-hidden shrink-0">
                                                {course.thumbnail ? <img src={course.thumbnail} alt="" className="size-full object-cover" /> : <div className="size-full flex items-center justify-center text-indigo-500"><Layers size={20} /></div>}
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-slate-100 leading-tight group-hover:text-indigo-400 transition-colors">{course.title}</h3>
                                                <div className="flex items-center gap-3 mt-1.5 text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                                                    <span className="flex items-center gap-1"><BookOpen size={12} /> {course.lectures?.length || 0} Lectures</span>
                                                    <span className="flex items-center gap-1"><CheckSquare size={12} /> {course.quizzes?.length || 0} Quizzes</span>
                                                </div>
                                            </div>
                                        </div>
                                    </td>

                                    <td className="px-6 py-5">
                                        <div className="flex flex-col gap-1">
                                            <span className={`text-[10px] font-black px-2 py-0.5 rounded-md w-fit ${course.level === 'Beginner' ? 'bg-emerald-500/10 text-emerald-500' :
                                                    course.level === 'Advanced' ? 'bg-rose-500/10 text-rose-500' : 'bg-blue-500/10 text-blue-500'
                                                }`}>
                                                {course.level?.toUpperCase()}
                                            </span>
                                            <p className="text-sm font-bold text-white">
                                                {course.isPaid ? `₹${course.Price}` : <span className="text-emerald-400">FREE</span>}
                                            </p>
                                        </div>
                                    </td>

                                    <td className="px-6 py-5 text-center">
                                        <div className="inline-flex flex-col items-center bg-white/5 px-3 py-1.5 rounded-xl border border-white/5">
                                            <span className="text-sm font-black text-white flex items-center gap-1.5">
                                                <Users size={14} className="text-indigo-400" /> {course.enrolledStudents?.length || 0}
                                            </span>
                                            <span className="text-[9px] text-slate-500 font-black uppercase">Learners</span>
                                        </div>
                                    </td>

                                    <td className="px-6 py-5">
                                        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg border text-[10px] font-black tracking-widest ${course.isPublished
                                                ? 'bg-emerald-500/5 border-emerald-500/20 text-emerald-500'
                                                : 'bg-amber-500/5 border-amber-500/20 text-amber-500'
                                            }`}>
                                            <div className={`size-1.5 rounded-full ${course.isPublished ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
                                            {course.isPublished ? 'PUBLISHED' : 'DRAFT'}
                                        </div>
                                    </td>

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