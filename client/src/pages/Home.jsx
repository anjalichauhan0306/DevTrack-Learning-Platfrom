import React from "react";
import Nav from "../component/Nav.jsx";
import {
  SearchIcon,
  BookOpen,
  Award,
  Users,
  Code,
  Terminal,
  GraduationCap,
} from "lucide-react";
import Logos from "../component/logos.jsx";
import ExploreCourses from "../component/ExploreCourses.jsx";
import CardPage from "../component/CardPage.jsx";
import { useNavigate } from "react-router-dom";
import About from "../component/About.jsx";
import Footer from "../component/Footer.jsx";
import FAQ from "../component/FAQ.jsx";
import ReviewPage from "../component/Reviewpage.jsx";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen overflow-x-hidden bg-white font-sans selection:bg-indigo-100 selection:text-indigo-900">
      <Nav />
      <section className="relative overflow-hidden bg-[#0a0a23] pt-28 pb-16 text-white sm:pt-32 sm:pb-20 md:pt-40 lg:pt-48 lg:pb-24">
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[-10%] left-[-5%] h-72 w-72 rounded-full bg-indigo-600/20 blur-[90px] animate-pulse sm:h-96 sm:w-96 lg:h-125 lg:w-125 lg:blur-[120px]" />
          <div className="absolute right-[-5%] bottom-[-10%] h-72 w-72 rounded-full bg-blue-600/10 blur-[90px] sm:h-96 sm:w-96 lg:h-125 lg:w-125 lg:blur-[120px]" />
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
              backgroundSize: "50px 50px",
            }}
          />

          <div className="absolute top-[25%] left-[10%] hidden text-indigo-400/20 transition-all duration-1000 animate-bounce md:block">
            <Code size={40} strokeWidth={1} />
          </div>
          <div className="absolute right-[12%] bottom-[20%] hidden text-blue-400/20 animate-pulse md:block">
            <Terminal size={38} strokeWidth={1} />
          </div>
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-col items-center gap-12 lg:flex-row lg:gap-8">
            <div className="w-full space-y-6 text-center lg:w-1/2 lg:text-left sm:space-y-8">
              <div className="inline-flex max-w-full items-center justify-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-indigo-300 sm:text-[11px] sm:tracking-widest lg:justify-start">
                <span className="w-2 h-2 rounded-full bg-indigo-500 animate-ping" />
                Empowering Digital Careers
              </div>

              <h1 className="text-3xl font-black leading-[1.1] tracking-tight sm:text-4xl md:text-6xl">
                Unlock Your Potential,
                <span className="mt-2 block bg-linear-to-r from-indigo-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  Grow Your Future
                </span>
              </h1>

              <p className="mx-auto max-w-xl text-base leading-relaxed font-light text-slate-400 sm:text-lg md:text-xl lg:mx-0">
                Master the skills of tomorrow with industry-leading courses.
                Join
                <span className="text-white font-semibold"> 25,000+ </span>{" "}
                students learning from the best.
              </p>

              <div className="flex flex-col justify-center gap-4 pt-2 sm:flex-row lg:justify-start">
                <button
                  className="w-full rounded-xl bg-indigo-600 px-6 py-3.5 font-bold text-white transition-all shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:-translate-y-1 hover:bg-indigo-500 active:scale-95 sm:w-auto sm:px-10 sm:py-4"
                  onClick={() => navigate("/allcourses")}
                >
                  Explore Courses
                </button>
                <button
                  onClick={() => navigate("/search")}
                  className="group flex w-full items-center justify-center gap-3 rounded-xl border border-slate-700 bg-slate-800/40 px-6 py-3.5 font-semibold text-white transition-all hover:bg-slate-800 sm:w-auto sm:px-8 sm:py-4"
                >
                  <div className="bg-indigo-600 p-1.5 rounded-lg group-hover:scale-110 transition-transform">
                    <SearchIcon size={16} strokeWidth={3} />
                  </div>
                  Search with AI
                </button>
              </div>
            </div>
            <div className="relative flex w-full justify-center pb-12 sm:pb-4 lg:w-1/2 lg:pb-0">
              <div className="relative h-[min(82vw,18rem)] w-[min(82vw,18rem)] sm:h-80 sm:w-80 md:h-96 md:w-96 lg:h-115 lg:w-115">
                <div className="absolute inset-0 border-2 border-dashed border-indigo-500/20 rounded-full animate-[spin_80s_linear_infinite]" />
                <div className="group absolute inset-5 overflow-hidden rounded-full bg-linear-to-tr from-indigo-500/30 to-purple-500/30 p-0.5 shadow-2xl backdrop-blur-sm sm:inset-8">
                  <img
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800"
                    alt="Students"
                    className="w-full h-full object-cover rounded-full transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0 grayscale-20"
                  />
                </div>
                <div className="absolute bottom-[-1.5rem] left-1/2 flex w-[calc(100%-1rem)] max-w-[15rem] -translate-x-1/2 items-center gap-3 rounded-2xl border border-slate-100 bg-white px-4 py-3 shadow-2xl transition-all duration-3000 animate-bounce sm:bottom-4 sm:left-auto sm:right-2 sm:w-auto sm:max-w-none sm:translate-x-0 sm:p-4 lg:top-20 lg:-right-6 lg:bottom-auto">
                  <div className="rounded-xl bg-indigo-100 p-2 text-indigo-600">
                    <GraduationCap size={20} strokeWidth={2.2} />
                  </div>
                  <div className="text-left">
                    <p className="text-[9px] font-bold leading-none tracking-[0.16em] text-slate-400 uppercase sm:text-[10px]">
                      Global Community
                    </p>
                    <p className="text-xs font-extrabold text-slate-900 sm:text-sm">
                      25k+ Active Students
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-0">
          <svg
            className="relative block w-full h-10 sm:h-12 md:h-15"
            viewBox="0 0 1440 120"
            preserveAspectRatio="none"
          >
            <path
              d="M0,96L120,85.3C240,75,480,53,720,53.3C960,53,1200,75,1320,85.3L1440,96V120H0V96Z"
              fill="#ffffff"
            />
          </svg>
        </div>
      </section>
      <div className="relative z-20 -mt-2 bg-white sm:-mt-4">
        <Logos />
      </div>
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:py-24">
        <div className="mb-12 space-y-4 text-center sm:mb-16">
          <h2 className="text-indigo-600 font-bold tracking-[0.2em] uppercase text-xs">
            Why Choose DevTrack?
          </h2>
          <h3 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl md:text-4xl">
            Education that delivers real results
          </h3>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 sm:gap-8">
          {[
            {
              icon: <BookOpen />,
              title: "Expert-Led Courses",
              desc: "Learn directly from industry veterans with hands-on projects.",
            },
            {
              icon: <Award />,
              title: "Verified Certificates",
              desc: "Boost your professional profile with recognized credentials.",
            },
            {
              icon: <Users />,
              title: "Global Mentorship",
              desc: "Connect with a vibrant network of mentors and peers globally.",
            },
          ].map((feature, idx) => (
            <div
              key={idx}
              className="group rounded-3xl border border-slate-100 bg-white p-6 shadow-sm transition-all duration-500 hover:border-indigo-100 hover:shadow-xl hover:shadow-indigo-500/5 sm:p-8"
            >
              <div className="w-14 h-14 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300 transform group-hover:rotate-6">
                {React.cloneElement(feature.icon, { size: 28 })}
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-3">
                {feature.title}
              </h4>
              <p className="text-slate-500 leading-relaxed font-light">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </section>
      <ExploreCourses />
      <CardPage />
      <About />
      <FAQ />
      <ReviewPage />
      <Footer />
    </div>
  );
};

export default Home;
