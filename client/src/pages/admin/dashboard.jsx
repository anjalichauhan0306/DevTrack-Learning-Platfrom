import React, { useState, useEffect } from 'react';
import { Users, BookOpen, UserCheck, DollarSign, TrendingUp, Loader2, PieChart as PieIcon } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import Navbar from '../../component/Nav';
import axios from 'axios';
import { serverURL } from '../../App';

const AdminDashboard = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get(`${serverURL}/api/admin/analytics`, { withCredentials: true });
        setAnalytics(res.data);
      } catch (err) {
        console.error("Fetch error", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return (
    <div className="min-h-screen bg-[#0a0a23] flex flex-col items-center justify-center">
      <Loader2 className="animate-spin text-indigo-500 mb-4" size={40} />
      <p className="text-slate-400 font-medium tracking-widest uppercase text-xs">Syncing Data...</p>
    </div>
  );

  const pieData = [
    { name: 'Students', value: analytics?.totalStudents || 0, color: '#6366f1' },
    { name: 'Educators', value: analytics?.totalEducators || 0, color: '#10b981' },
  ];

  const hasData = (analytics?.totalStudents || 0) + (analytics?.totalEducators || 0) > 0;
  const formatCurrency = (value) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(value);
  return (
    <div className="bg-[#0a0a23] min-h-screen pt-28 pb-12 font-sans text-slate-200">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 space-y-10">

        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-black text-white tracking-tight italic">System <span className="text-indigo-500">Analytics</span></h1>
            <p className="text-slate-500 text-sm mt-1">LMS Platform Performance Overview</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard icon={<Users />} label="Total Users" value={analytics?.totalUsers} color="indigo" />
          <StatCard icon={<BookOpen />} label="Courses" value={analytics?.totalCourses} color="amber" />
          <StatCard icon={<UserCheck />} label="Enrollments" value={analytics?.totalEnrollments} color="emerald" />
          <StatCard icon={<DollarSign />} label="Total Revenue" value={formatCurrency(analytics?.totalRevenue || 0)} color="rose" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-[#161636]/40 border border-white/10 rounded-4xl p-8 backdrop-blur-md">
            <h3 className="text-base font-bold text-white mb-8 flex items-center gap-2">
              <TrendingUp className="text-indigo-400" size={18} /> Platform Growth (Weekly)
            </h3>
            <div className="h-80 w-full min-w-0">
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={analytics?.chartData?.length > 0 ? analytics.chartData : defaultChartData}>
                  <defs>
                    <linearGradient id="colorInd" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff05" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#475569', fontSize: 11, fontWeight: 600 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#475569', fontSize: 11 }} />
                  <Tooltip contentStyle={{ backgroundColor: '#161636', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }} />
                  <Area type="monotone" dataKey="signups" stroke="#6366f1" strokeWidth={4} fill="url(#colorInd)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-[#161636]/40 border border-white/10 rounded-4xl p-8 backdrop-blur-md">
            <h3 className="text-sm font-black text-slate-500 uppercase tracking-widest mb-8 text-center">User Split</h3>
            <div className="h-64 w-full min-w-0">
              {hasData ? (
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      innerRadius={65}
                      outerRadius={85}
                      paddingAngle={10}
                      dataKey="value"
                      stroke="none"
                    >
                      {pieData.map((e, i) => <Cell key={i} fill={e.color} cornerRadius={10} />)}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: '#161636', border: 'none', borderRadius: '8px' }} />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-slate-600">
                  <PieIcon size={40} className="mb-2 opacity-20" />
                  <p className="text-xs italic">No user data found</p>
                </div>
              )}
            </div>

            <div className="mt-8 space-y-3">
              {pieData.map(item => (
                <div key={item.name} className="flex justify-between items-center bg-white/5 p-4 rounded-2xl border border-white/5">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span className="text-xs font-bold text-slate-400">{item.name}</span>
                  </div>
                  <span className="text-sm font-black text-white">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon, label, value, color }) => {
  const themes = {
    indigo: 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400',
    amber: 'bg-amber-500/10 border-amber-500/20 text-amber-400',
    emerald: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400',
    rose: 'bg-rose-500/10 border-rose-500/20 text-rose-400',
  };

  return (
    <div className="bg-[#161636]/60 border border-white/10 p-6 rounded-3xl backdrop-blur-sm group hover:border-white/20 transition-all">
      <div className="flex items-center gap-4">
        <div className={`p-4 rounded-2xl border ${themes[color]}`}>
          {React.cloneElement(icon, { size: 24 })}
        </div>
        <div>
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{label}</p>
          <h2 className="text-2xl font-black text-white mt-1">{value || 0}</h2>
        </div>
      </div>
    </div>
  );
};

const defaultChartData = [
  { name: 'Mon', signups: 0 }, { name: 'Tue', signups: 0 },
  { name: 'Wed', signups: 0 }, { name: 'Thu', signups: 0 },
  { name: 'Fri', signups: 0 }, { name: 'Sat', signups: 0 }, { name: 'Sun', signups: 0 }
];

export default AdminDashboard;