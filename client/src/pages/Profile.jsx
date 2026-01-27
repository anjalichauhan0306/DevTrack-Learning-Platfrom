import React, { useState } from 'react';
import { 
  User, BookOpen, CheckCircle, Award, 
  Settings, LayoutDashboard, Github, 
  Linkedin, Globe, Camera, LogOut,
  CreditCard, Bell, ChevronRight, Zap, Clock
} from 'lucide-react';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const [user, setUser] = useState({
    name: "Aaruba",
    role: "Full Stack Developer",
    bio: "Building digital products and modern web experiences. Passionate about MERN Stack and System Design.",
    avatar: "https://i.pravatar.cc/150",
    email: "aaruba@devtrack.com"
  });

  const renderContent = () => {
    switch(activeTab) {
      case 'overview':
        return (
          <div className="animate-in fade-in duration-500">
            {/* Bio Section */}
            <div className="mb-8">
              <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">Mission Control 🚀</h1>
              <p className="text-slate-500 mt-4 text-lg leading-relaxed italic border-l-4 border-indigo-500 pl-4 bg-slate-50 py-2 rounded-r-xl">
                "{user.bio}"
              </p>
              <div className="flex gap-5 mt-6">
                <Github className="text-slate-400 hover:text-indigo-600 cursor-pointer transition-transform hover:scale-110" size={22} />
                <Linkedin className="text-slate-400 hover:text-indigo-600 cursor-pointer transition-transform hover:scale-110" size={22} />
                <Globe className="text-slate-400 hover:text-indigo-600 cursor-pointer transition-transform hover:scale-110" size={22} />
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
              {[
                { label: 'Enrolled', value: '12', color: 'bg-blue-50 text-blue-600', icon: <BookOpen size={16}/> },
                { label: 'Completed', value: '07', color: 'bg-emerald-50 text-emerald-600', icon: <CheckCircle size={16}/> },
                { label: 'Certificates', value: '04', color: 'bg-purple-50 text-purple-600', icon: <Award size={16}/> },
                { label: 'Streaks', value: '05 Days', color: 'bg-orange-50 text-orange-600', icon: <Zap size={16}/> },
              ].map((item, i) => (
                <div key={i} className={`${item.color} rounded-3xl p-5 shadow-sm border border-white flex flex-col items-center justify-center hover:shadow-md transition`}>
                  <div className="mb-2 opacity-70">{item.icon}</div>
                  <h3 className="text-2xl font-bold">{item.value}</h3>
                  <p className="text-[10px] font-bold uppercase tracking-widest mt-1 opacity-80">{item.label}</p>
                </div>
              ))}
            </div>

            {/* Resume Learning */}
            <div className="bg-slate-50 rounded-[2rem] p-6 border border-slate-100">
              <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                <Clock size={18} className="text-indigo-600"/> Resume Learning
              </h3>
              <div className="bg-white p-5 rounded-2xl shadow-sm flex items-center justify-between border border-slate-200 group cursor-pointer hover:border-indigo-400 transition">
                <div className="flex-1">
                  <p className="font-bold text-slate-700">MERN Stack Development</p>
                  <div className="mt-3 bg-slate-100 h-2.5 rounded-full overflow-hidden w-full max-w-md">
                    <div className="bg-indigo-600 h-full w-[65%] rounded-full shadow-[0_0_8px_rgba(79,70,229,0.4)]" />
                  </div>
                </div>
                <div className="bg-slate-50 p-2 rounded-full group-hover:bg-indigo-600 group-hover:text-white transition">
                  <ChevronRight size={20} />
                </div>
              </div>
            </div>
          </div>
        );

      case 'settings':
        return (
          <div className="animate-in slide-in-from-right-4 duration-500">
            <h2 className="text-2xl font-bold text-slate-800 mb-8">Profile Settings</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Full Name</label>
                <input type="text" defaultValue={user.name} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 ring-indigo-500/20 outline-none transition" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Professional Role</label>
                <input type="text" defaultValue={user.role} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 ring-indigo-500/20 outline-none transition" />
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Bio</label>
                <textarea rows="4" defaultValue={user.bio} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 ring-indigo-500/20 outline-none resize-none transition" />
              </div>
            </div>
            <button className="mt-8 px-10 py-3.5 rounded-xl bg-indigo-600 text-white font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all hover:scale-[1.02]">
              Save Changes
            </button>
          </div>
        );

      default:
        return (
          <div className="flex flex-col items-center justify-center py-20 bg-slate-50 rounded-[2.5rem] border-2 border-dashed border-slate-200">
            <BookOpen className="text-slate-300 mb-4" size={48} />
            <h3 className="font-bold text-slate-400 uppercase tracking-widest text-xs">No Data in {activeTab}</h3>
          </div>
        );
    }
  };

  return (
    // Yahan ho raha hai Magic: Outer Background is Dark Slate
    <div className="min-h-screen bg-slate-900 flex justify-center items-center py-10 px-4">
      
      {/* Main Card is White */}
      <div className="w-full max-w-6xl bg-white rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)] overflow-hidden flex flex-col md:flex-row min-h-[85vh]">
        
        {/* --- SIDEBAR --- */}
        <div className="w-full md:w-72 bg-slate-50 border-r border-slate-100 p-8 flex flex-col">
          <div className="text-center mb-10">
            <div className="relative size-24 mx-auto mb-4 group">
              <img src={user.avatar} alt="pfp" className="rounded-4xl border-4 border-white shadow-xl transition-transform group-hover:scale-105 duration-300" />
              <div className="absolute -bottom-2 -right-2 bg-indigo-600 p-2.5 rounded-xl text-white shadow-lg border-2 border-white cursor-pointer hover:bg-indigo-700 transition">
                <Camera size={14} />
              </div>
            </div>
            <h2 className="font-bold text-slate-800 text-xl tracking-tight">{user.name}</h2>
            <p className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.2em] mt-1.5">{user.role}</p>
          </div>

          <nav className="space-y-2 flex-1">
            {[
              { id: 'overview', label: 'Dashboard', icon: <LayoutDashboard size={20}/> },
              { id: 'courses', label: 'My Courses', icon: <BookOpen size={20}/> },
              { id: 'certificates', label: 'Certificates', icon: <Award size={20}/> },
              { id: 'billing', label: 'Billing', icon: <CreditCard size={20}/> },
              { id: 'settings', label: 'Settings', icon: <Settings size={20}/> },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl font-bold text-sm transition-all duration-300 ${
                  activeTab === tab.id 
                  ? 'bg-white text-indigo-600 shadow-[0_10px_25px_rgba(0,0,0,0.08)] translate-x-2' 
                  : 'text-slate-400 hover:bg-slate-100 hover:text-slate-600'
                }`}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </nav>

          <button className="mt-10 flex items-center gap-4 px-6 py-4 text-rose-500 font-bold text-sm hover:bg-rose-50 transition-colors rounded-2xl">
            <LogOut size={20} /> Sign Out
          </button>
        </div>

        {/* --- MAIN CONTENT --- */}
        <div className="flex-1 p-8 md:p-12 overflow-y-auto bg-white">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-xs font-black text-slate-300 uppercase tracking-[0.4em]">{activeTab}</h2>
            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 relative cursor-pointer group">
              <Bell size={20} className="text-slate-400 group-hover:text-indigo-600 transition" />
              <span className="absolute top-3 right-3 size-2.5 bg-indigo-500 rounded-full border-2 border-white" />
            </div>
          </div>
          
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Profile;