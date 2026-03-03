import React from 'react';
import { Users, UserCheck, BookOpen, Search, ExternalLink, TrendingUp, MoreVertical } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import Navbar from '../../component/Nav';

const AdminDashboard = () => {
  const chartData = [
    { name: 'Mon', signups: 45 }, { name: 'Tue', signups: 52 }, { name: 'Wed', signups: 48 },
    { name: 'Thu', signups: 70 }, { name: 'Fri', signups: 65 }, { name: 'Sat', signups: 80 }, { name: 'Sun', signups: 95 },
  ];

  const pieData = [
    { name: 'Students', value: 850, color: '#6366f1' },
    { name: 'Educators', value: 120, color: '#10b981' },
  ];

  return (
    <div className="bg-[#43474a] min-h-screen pt-24 pb-12 font-sans antialiased">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-6 space-y-8">
        
        {/* Header Section - Clean & Balanced */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-extrabold text-white tracking-tight">Admin Dashboard</h1>
            <p className="text-slate-300 text-sm">Welcome back! Here's what's happening today.</p>
          </div>
          <div className="flex gap-3">
             <button className="bg-white/10 hover:bg-white/20 text-white text-sm font-semibold px-4 py-2 rounded-lg border border-white/10 transition-all">Export Report</button>
             <button className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold px-4 py-2 rounded-lg shadow-lg shadow-indigo-900/20 transition-all text-sm">Create New</button>
          </div>
        </div>

        {/* 1. Standard Stats Cards - Consistent Sizing */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard icon={<Users />} label="Total Learners" value="12,450" trend="+12.5%" color="indigo" />
          <StatCard icon={<UserCheck />} label="Verified Instructors" value="862" trend="+3.2%" color="emerald" />
          <StatCard icon={<BookOpen />} label="Published Courses" value="432" trend="+18" color="amber" />
        </div>

        {/* 2. Main Analytics Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Growth Chart - Standard Height */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm p-6 border border-slate-200">
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-2">
                <div className="w-1 h-5 bg-indigo-600 rounded-full"></div>
                <h3 className="text-base font-bold text-slate-800">Registration Growth</h3>
              </div>
              <select className="text-xs font-bold text-slate-500 bg-slate-50 border-none rounded-md px-2 py-1 outline-none cursor-pointer">
                <option>Last 7 Days</option>
                <option>Last 30 Days</option>
              </select>
            </div>
            <div className="h-[280px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorInd" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                  <Tooltip contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}} />
                  <Area type="monotone" dataKey="signups" stroke="#6366f1" strokeWidth={3} fill="url(#colorInd)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* User Distribution - Matches Dark Navbar Tone */}
          <div className="bg-[#0a0a23] rounded-2xl p-6 text-white shadow-xl border border-white/5 flex flex-col">
            <h3 className="text-sm font-bold text-indigo-300 uppercase tracking-widest mb-6">User Split</h3>
            <div className="flex-1 flex flex-col justify-center">
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={pieData} innerRadius={55} outerRadius={75} paddingAngle={8} dataKey="value" stroke="none">
                        {pieData.map((e, i) => <Cell key={i} fill={e.color} cornerRadius={6} />)}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-6 space-y-3">
                  {pieData.map(item => (
                    <div key={item.name} className="flex justify-between items-center bg-white/5 p-3 rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full" style={{backgroundColor: item.color}}></div>
                        <span className="text-xs font-medium text-slate-300">{item.name}</span>
                      </div>
                      <span className="text-xs font-bold">{item.value}</span>
                    </div>
                  ))}
                </div>
            </div>
          </div>
        </div>

        {/* 3. Consistent Activity Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center">
            <h3 className="text-base font-bold text-slate-800">Recent Transactions</h3>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                placeholder="Search records..." 
                className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500/20 w-64 transition-all" 
              />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50 text-[11px] uppercase font-bold text-slate-500 tracking-wider">
                  <th className="px-6 py-4">Full Name</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4 text-center">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {[
                  { name: 'Ankit Raj', role: 'Premium Student', status: 'Active', color: 'indigo' },
                  { name: 'Dr. Neha Sharma', role: 'Senior Educator', status: 'Pending', color: 'emerald' },
                  { name: 'Sahil Varma', role: 'Student', status: 'Active', color: 'indigo' },
                  { name: 'Priya Singh', role: 'Educator', status: 'Active', color: 'emerald' },
                ].map((user, i) => (
                  <tr key={i} className="hover:bg-slate-50/80 transition-all group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-slate-100 text-slate-600 rounded-lg flex items-center justify-center text-xs font-bold group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                          {user.name[0]}
                        </div>
                        <span className="text-sm font-semibold text-slate-700">{user.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-xs font-medium text-slate-500">{user.role}</td>
                    <td className="px-6 py-4 text-center">
                      <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${user.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all">
                        <ExternalLink size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

// Standard Stat Card Component
const StatCard = ({ icon, label, value, trend, color }) => {
  const colors = {
    indigo: 'bg-indigo-50 text-indigo-600',
    emerald: 'bg-emerald-50 text-emerald-600',
    amber: 'bg-amber-50 text-amber-600',
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-xl ${colors[color]}`}>
          {React.cloneElement(icon, { size: 20 })}
        </div>
        <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">
          <TrendingUp size={12} /> {trend}
        </div>
      </div>
      <div>
        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{label}</p>
        <h2 className="text-2xl font-black text-slate-800 mt-1">{value}</h2>
      </div>
    </div>
  );
};

export default AdminDashboard;