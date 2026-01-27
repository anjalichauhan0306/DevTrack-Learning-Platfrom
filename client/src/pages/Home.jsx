import React from 'react';
import Nav from '../component/Nav.jsx';
import { SearchIcon, BookOpen, Award, Users, Code, Terminal } from 'lucide-react';
import Logos from '../component/logos.jsx';

const Home = () => {
  return (
    <div className="w-full min-h-screen bg-white font-sans selection:bg-indigo-100 selection:text-indigo-900">
      
      {/* Navbar Container */}
      <Nav />

      {/* --- HERO SECTION --- */}
      <section className="relative bg-[#0a0a23] text-white pt-32 md:pt-48 pb-24 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[-10%] left-[-5%] w-125 h-125 bg-indigo-600/20 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-[-10%] right-[-5%] w-125 h-125 bg-blue-600/10 rounded-full blur-[120px]" />
          <div className="absolute inset-0 opacity-[0.03]" 
               style={{ backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`, backgroundSize: '50px 50px' }} />
          
          {/* Floating Lucide Icons */}
          <div className="absolute top-[25%] left-[10%] text-indigo-400/20 animate-bounce transition-all duration-1000">
            <Code size={40} strokeWidth={1} />
          </div>
          <div className="absolute bottom-[20%] right-[12%] text-blue-400/20 animate-pulse"> 
            <Terminal size={38} strokeWidth={1} />
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-8">
            
            {/* Left Content */}
            <div className="lg:w-1/2 text-center lg:text-left space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-[11px] font-bold tracking-widest uppercase">
                <span className="w-2 h-2 rounded-full bg-indigo-500 animate-ping" />
                Empowering Digital Careers
              </div>

              <h1 className="text-4xl md:text-6xl font-black leading-[1.1] tracking-tight">
                Unlock Your Potential, <br />
                <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-400 via-cyan-400 to-blue-500">
                  Grow Your Future
                </span>
              </h1>

              <p className="text-slate-400 text-lg md:text-xl max-w-xl mx-auto lg:mx-0 leading-relaxed font-light">
                Master the skills of tomorrow with industry-leading courses. Join 
                <span className="text-white font-semibold"> 25,000+ </span> students learning from the best.
              </p>

              <div className="flex flex-wrap gap-4 justify-center lg:justify-start pt-2">
                <button className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 px-10 rounded-xl transition-all shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:-translate-y-1 active:scale-95">
                  Explore Courses
                </button>
                <button className="flex items-center gap-3 px-8 py-4 rounded-xl border border-slate-700 bg-slate-800/40 hover:bg-slate-800 transition-all text-white font-semibold group">
                  <div className="bg-indigo-600 p-1.5 rounded-lg group-hover:scale-110 transition-transform">
                    <SearchIcon size={16} strokeWidth={3} />
                  </div>
                  Search with AI
                </button>
              </div>
            </div>

            {/* Right Visual */}
            <div className="lg:w-1/2 relative flex justify-center">
              <div className="relative w-72 h-72 md:w-96 md:h-96 lg:w-115 lg:h-115">
                <div className="absolute inset-0 border-2 border-dashed border-indigo-500/20 rounded-full animate-[spin_80s_linear_infinite]" />
                <div className="absolute inset-8 rounded-full bg-linear-to-tr from-indigo-500/30 to-purple-500/30 p-0.5 shadow-2xl overflow-hidden backdrop-blur-sm group">
                  <img
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800"
                    alt="Students"
                    className="w-full h-full object-cover rounded-full transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0 grayscale-20"
                  />
                </div>
                {/* Minimal Floating Badge */}
                <div className="absolute -top-4 right-0 lg:top-20 lg:-right-6 bg-white p-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-bounce transition-all duration-3000 border border-slate-100">
                  <div className="bg-indigo-100 text-indigo-600 p-2 rounded-xl text-xl">🎓</div>
                  <div className="text-left">
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter leading-none">Global Community</p>
                    <p className="text-slate-900 font-extrabold text-sm">25k+ Active Students</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Professional Curve Transition */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-0">
          <svg className="relative block w-full h-15" viewBox="0 0 1440 120" preserveAspectRatio="none">
            <path d="M0,96L120,85.3C240,75,480,53,720,53.3C960,53,1200,75,1320,85.3L1440,96V120H0V96Z" fill="#ffffff" />
          </svg>
        </div>
      </section>

      {/* --- TRUST BAR --- */}
      <div className="-mt-8 relative z-20">
        <Logos />
      </div>

      {/* --- FEATURES SECTION --- */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-indigo-600 font-bold tracking-[0.2em] uppercase text-xs">Why Choose DevTrack?</h2>
          <h3 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">Education that delivers real results</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: <BookOpen />, title: "Expert-Led Courses", desc: "Learn directly from industry veterans with hands-on projects." },
            { icon: <Award />, title: "Verified Certificates", desc: "Boost your professional profile with recognized credentials." },
            { icon: <Users />, title: "Global Mentorship", desc: "Connect with a vibrant network of mentors and peers globally." }
          ].map((feature, idx) => (
            <div key={idx} className="group p-8 rounded-3xl bg-white border border-slate-100 hover:border-indigo-100 shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-500">
              <div className="w-14 h-14 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300 transform group-hover:rotate-6">
                {React.cloneElement(feature.icon, { size: 28 })}
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h4>
              <p className="text-slate-500 leading-relaxed font-light">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default Home;