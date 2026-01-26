import React from 'react';
import Nav from '../component/Nav.jsx';
import { Code, Terminal, Database, Binary, SearchIcon } from 'lucide-react';

const Home = () => {
  return (
    <div className="w-full overflow-hidden bg-white">
      {/* <style>
        {`
          @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-12px); }
            100% { transform: translateY(0px); }
          }
          .animate-float {
            animation: float 4s ease-in-out infinite;
          }
          .animate-float-delayed {
            animation: float 4s ease-in-out infinite;
            animation-delay: 2s;
          }
        `}
      </style> */}

      <div className="w-full relative min-h-screen flex flex-col">
        {/* Navbar */}
        <div className="absolute top-0 left-0 w-full z-50">
          <Nav />
        </div>

        {/* HERO SECTION - Reduced height and padding for better balance */}
        <section className="relative bg-[#1a1a40] text-white pt-20 md:pt-36 pb-20 overflow-hidden min-h-[85vh] flex items-center">
          
          <div className='absolute inset-0 z-0 pointer-events-none'>
            {/* Main Gradient Glows */}
            <div className='absolute top-[-10%] left-[-10%] w-100 h-100 bg-blue-600/15 rounded-full blur-[100px] animate-pulse' />
            <div className='absolute bottom-[-10%] right-[-10%] w-100 h-100 bg-purple-600/15 rounded-full blur-[100px] animate-pulse' />
            
            {/* Subtle Grid Pattern */}
            <div className="absolute inset-0 opacity-[0.04]" 
                 style={{ backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`, backgroundSize: '45px 45px' }}>
            </div>

            {/* Floating Icons */}
            <div className='absolute top-[20%] left-[8%] text-blue-400/20 animate-float'>
              <Code size={38} strokeWidth={1} />
            </div>
            <div className='absolute top-[12%] right-[12%] text-purple-400/20 animate-float-delayed'>
              <Terminal size={35} strokeWidth={1} />
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center relative z-10 gap-12 lg:gap-8">
            
            {/* LEFT CONTENT - Adjusted font sizes for hierarchy */}
            <div className="lg:w-1/2 space-y-6 text-center lg:text-left">
              <h1 className="text-3xl md:text-5xl lg:text-5xl font-extrabold leading-[1.2] tracking-tight">
                Unlock Your Potential, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
                  Grow Your Future
                </span>
              </h1>

              <p className="text-indigo-100/70 text-base md:text-lg max-w-md mx-auto lg:mx-0 leading-relaxed font-light">
                Smarter education starts here. Join <span className="text-white font-medium underline decoration-indigo-500/50 underline-offset-4">thousands of students</span> learning from industry experts.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2">
                <button className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3.5 px-8 rounded-full transition-all duration-300 shadow-lg hover:-translate-y-1 active:scale-95 text-sm md:text-base">
                  View All Courses
                </button>

                <button className="flex items-center justify-center gap-3 group border border-white/10 hover:border-white/30 bg-white/5 hover:bg-white/10 py-3.5 px-7 rounded-full transition-all duration-300">
                  <div className="bg-indigo-600 h-8 w-8 flex items-center justify-center rounded-full shadow-md">
                    <SearchIcon size={14} strokeWidth={3} className="text-white" />
                  </div>
                  <span className="font-semibold text-white text-sm md:text-base">Search With AI</span>
                </button>
              </div>
            </div>

            {/* RIGHT IMAGE - Scaled down for balance */}
            <div className="lg:w-1/2 mt-12 lg:mt-0 relative flex justify-center">
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-[420px] lg:h-[420px]">
                
                {/* Rotating Border */}
                <div className="absolute inset-0 border border-dashed border-indigo-400/20 rounded-full animate-[spin_80s_linear_infinite]"></div>

                {/* Image Container */}
                <div className="absolute inset-4 lg:inset-10 rounded-full p-1 bg-gradient-to-tr from-indigo-500/20 to-purple-500/20 backdrop-blur-sm overflow-hidden shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800"
                    alt="Students collaborating"
                    className="w-full h-full object-cover rounded-full grayscale-[20%] hover:grayscale-0 hover:scale-105 transition-all duration-700"
                  />
                </div>

                {/* Floating Badge - Made slightly smaller */}
                <div className="absolute -top-2 right-0 lg:top-16 lg:-right-4 bg-white/95 backdrop-blur-md p-3 md:p-4 rounded-2xl shadow-xl flex items-center gap-3 animate-float border border-white/20">
                  <div className="bg-indigo-600 h-10 w-10 rounded-xl flex items-center justify-center text-xl shadow-lg">
                    🎓
                  </div>
                  <div className="text-left">
                    <p className="text-[9px] text-gray-500 font-bold uppercase tracking-widest">Community</p>
                    <p className="text-base font-extrabold text-indigo-950 leading-tight">25k+ Students</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* WAVE TRANSITION */}
          <div className="absolute -bottom-px left-0 w-full overflow-hidden">
            <svg 
              viewBox="0 0 1440 120" 
              fill="white" 
              xmlns="http://www.w3.org/2000/svg"
              className="relative block w-full h-12 md:h-20"
              preserveAspectRatio="none"
            >
              <path d="M0,84L30,81.3C60,79,120,73,180,72C240,71,300,75,360,78.2C420,81,480,84,540,80.8C600,78,660,68,720,60.8C780,53,840,48,900,52.2C960,56,1020,69,1080,73.8C1140,78,1200,74,1260,69.5C1320,65,1380,61,1410,58.7L1440,56V120H0V84Z"></path>
            </svg>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;