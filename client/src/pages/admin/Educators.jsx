import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { Search, X, Users, Filter} from "lucide-react";
import Navbar from "../../component/Nav";
import { serverURL } from "../../App";

const EducatorsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEducator, setSelectedEducator] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const getEducator = async () => {
    setLoading(true)
    try {
      const result = await axios.get(serverURL + "/api/admin/users", { withCredentials: true })

      const educators = result.data.filter(
        user => user.role === "Educator");
        setLoading(false)
      setUsers(educators);
    } catch (error) {
      console.log(error);
      setLoading(false)
    }
  }

  useEffect(() => {
    getEducator()
  }, []);

  const toggleStatus = async (id, currentStatus) => {
  try {
    const res = await axios.post(
      `${serverURL}/api/admin/user/${id}`,
      { isActive: !currentStatus },
      { withCredentials: true }
    );

    setUsers(prev =>
      prev.map(u =>
        u._id === id
          ? { ...u, ...res.data }
          : u
      )
    );

    if (selectedEducator?._id === id) {
      setSelectedEducator(prev => ({
        ...prev,
        ...res.data
      }));
    }

  } catch (error) {
    console.error(error);
  }
};

  const filteredUsers = useMemo(() => {
    return users.filter(u =>
      u.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [users, searchTerm]);

  return (
    <div className="min-h-screen bg-[#0a0a23] text-slate-200 p-6 pt-28 font-sans">
      <div className="max-w-7xl mx-auto">
        <Navbar />

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">Users</h1>
            <p className="text-slate-400 text-sm mt-1">Manage all platform users (students & educators).</p>
          </div>
          <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-2 rounded-xl shadow-inner">
            <Users className="text-indigo-500" size={20} />
            <span className="text-sm font-bold text-slate-300">Total: {users.length}</span>
          </div>
        </div>

        <div className="mb-6 flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <input
              type="text"
              placeholder="Filter by name or email..."
              className="w-full bg-[#161636] border border-white/5 rounded-xl py-3 pl-12 pr-4 text-sm focus:border-indigo-500/50 focus:bg-[#1a1a40] outline-none transition-all"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="bg-[#161636] border border-white/5 p-3 rounded-xl hover:bg-white/5 transition">
            <Filter size={18} className="text-slate-400" />
          </button>
        </div>

        <div className="bg-[#161636]/40 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-md shadow-xl">
          <table className="w-full border-collapse">
            <thead>
              <tr className="text-left bg-white/5 border-b border-white/10">
                <th className="p-5 text-[11px] font-bold uppercase tracking-wider text-slate-500">User Info</th>
                <th className="p-5 text-[11px] font-bold uppercase tracking-wider text-slate-500 text-center">joined</th>
                <th className="p-5 text-[11px] font-bold uppercase tracking-wider text-slate-500 text-center">Role</th>
                <th className="p-5 text-[11px] font-bold uppercase tracking-wider text-slate-500 text-center">Status</th>
                <th className="p-5 text-[11px] font-bold uppercase tracking-wider text-slate-500 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {loading ? (
                <tr>
                  <td colSpan="5" className="text-center py-10 text-slate-500">Loading...</td>
                </tr>
              ) : filteredUsers.length > 0 ? (
                filteredUsers.map(u => (
                <tr key={u._id} className="hover:bg-white/2 transition-colors group">
                  <td className="p-5 flex items-center gap-4">
                    <div className="h-11 w-11 rounded-full bg-linear-to-tr from-indigo-600 to-violet-500 flex items-center justify-center font-bold text-white shadow-lg ring-2 ring-white/5">
                      {u.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-white group-hover:text-indigo-400 transition-colors">{u.name}</p>
                      <p className="text-xs text-slate-500">{u.email}</p>
                    </div>
                  </td>
                  <td className="p-5 text-center font-medium text-slate-300">{new Date(u.createdAt).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}</td>
                  <td className="p-5 text-center font-medium text-slate-300">{u.role}</td>
                  <td className="p-5 text-center">
                        <button
                          onClick={() => toggleStatus(u._id, u.isActive)}
                          className={`px-3 py-1.5 rounded-lg border text-[11px] font-bold uppercase transition-all ${
                            u.isActive
                              ? 'bg-emerald-500/5 border-emerald-500/20 text-emerald-500 hover:bg-emerald-500/10'
                              : 'bg-rose-500/5 border-rose-500/20 text-rose-500 hover:bg-rose-500/10'
                          }`}
                        >
                          {u.isActive ? 'Active' : 'Inactive'}
                        </button>
                      </td>
                  <td className="p-5 text-right">
                    <button
                      onClick={() => setSelectedEducator(u)}
                      className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-10 text-slate-500">No educators found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {selectedEducator && (
          <>
            <div
              className="fixed inset-0 bg-[#050510]/80 backdrop-blur-md z-[110] transition-opacity duration-300"
              onClick={() => setSelectedEducator(null)}
            />
            <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-[#0f111a] border border-white/10 z-120 rounded-[2.5rem] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.6)] animate-in zoom-in-95 duration-300 flex flex-col max-h-[90vh]">
              <div className="px-10 pt-10 pb-4 flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-semibold text-white">Educator Profile</h2>
                </div>
                <button
                  onClick={() => setSelectedEducator(null)}
                  className="p-2.5 bg-white/5 hover:bg-white/10 rounded-2xl text-slate-400 transition-all border border-white/5"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto px-10 no-scrollbar pb-6" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                <style>{`.no-scrollbar::-webkit-scrollbar { display: none; }`}</style>
                <div className="flex items-center gap-6 py-8 px-6 bg-white/2 border border-white/5 rounded-4xl my-4">
                  <div className="relative">
                    <div className="absolute -inset-1 bg-linear-to-tr from-indigo-500 to-fuchsia-600 rounded-[1.8rem] blur opacity-20"></div>
                    {selectedEducator.photoUrl ? (
                      <img src={selectedEducator.photoUrl} className="relative h-24 w-24 object-cover rounded-[1.6rem] border border-white/10" />
                    ) : (
                      <div className="relative h-24 w-24 rounded-[1.6rem] bg-[#1a1d2e] flex items-center justify-center text-4xl font-light text-white border border-white/10">
                        {selectedEducator.name.charAt(0)}
                      </div>
                    )}
                    <div className={`absolute -bottom-1 -right-1 h-6 w-6 rounded-full border-4 border-[#0f111a] ${selectedEducator.isActive ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.4)]' : 'bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.4)]'}`} />
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-white tracking-tight">{selectedEducator.name}</h3>
                    <p className="text-slate-400 text-sm mb-3">{selectedEducator.email}</p>
                    <div className="flex gap-2">
                      <span className="px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-lg text-[10px] font-black uppercase tracking-widest">
                        {selectedEducator.role}
                      </span>
                      <span className="px-3 py-1 bg-white/5 border border-white/10 text-slate-500 rounded-lg text-[10px] font-black uppercase">
                        ID: {selectedEducator._id.slice(-6)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-white/2 border border-white/5 p-4 rounded-3xl">
                    <p className="text-slate-500 text-[10px] font-bold uppercase tracking-wider mb-1">created  Courses</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-semibold text-white">{selectedEducator?.totalCourses}</span>
                      <span className="text-xs text-slate-600 italic font-medium">Items</span>
                    </div>
                  </div>
                  <div className="bg-white/2 border border-white/5 p-4 rounded-3xl">
                    <p className="text-slate-500 text-[10px] font-bold uppercase tracking-wider mb-1">enrolled students</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-semibold text-white">{selectedEducator.totalStudents || 0}</span>
                      <span className="text-xs text-slate-600 italic font-medium">students </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <section>
                    <h4 className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.15em] mb-2">Biography</h4>
                    <p className="text-sm text-slate-300 leading-relaxed font-light italic">
                      "{selectedEducator.description || "No professional summary provided for this user."}"
                    </p>
                  </section>

                  <div className="pt-6 border-t border-white/5 space-y-3">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-500">Registration Date</span>
                      <span className="text-slate-200 font-medium">
                        {new Date(selectedEducator.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-500">Identity Status</span>
                      <span className={`font-bold px-2 py-0.5 rounded ${selectedEducator.isOTPVerified ? 'text-emerald-500' : 'text-amber-500'}`}>
                        {selectedEducator.isOTPVerified ? 'VERIFIED' : 'PENDING'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-10 bg-[#141622]/50 border-t border-white/5 flex gap-4">
                <button className="flex-[0.4] py-4 bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white rounded-[1.5rem] font-bold text-xs transition-all border border-white/10">
                  Reset PW
                </button>
                <button
                  onClick={() => toggleStatus(
                    selectedEducator._id,
                    selectedEducator.isActive
                  )}
                  className={`flex-1 py-4 rounded-[1.5rem] font-bold text-sm transition-all active:scale-95 shadow-xl ${selectedEducator.isActive
                    ? 'bg-rose-500/10 text-rose-500 border border-rose-500/20 hover:bg-rose-500 hover:text-white'
                    : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-emerald-500/20'
                    }`}
                >
                  {selectedEducator.isActive ? 'Restrict Access' : 'Activate User'}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default EducatorsPage;