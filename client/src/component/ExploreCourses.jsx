import React from "react";
import {
  Monitor,
  Smartphone,
  Database,
  Globe,
  ShieldCheck,
  Cpu,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";

const ExploreCourses = () => {
  const categories = [
    { name: "Web Development", icon: Monitor },
    { name: "Mobile Apps", icon: Smartphone },
    { name: "Backend Engineering", icon: Database },
    { name: "Cloud & DevOps", icon: Globe },
    { name: "Cybersecurity", icon: ShieldCheck },
    { name: "AI / Machine Learning", icon: Cpu },
  ];

  return (
    <section className="relative w-full bg-white py-25 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-20">

          {/* LEFT CONTENT */}
          <div className="lg:w-1/2 space-y-8">
            <span className="text-xs font-bold tracking-widest uppercase text-indigo-600">
              Learning Paths
            </span>

            <h2 className="text-4xl md:text-6xl font-black leading-tight text-slate-900">
              Build Skills That
              <span className="block text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-purple-600">
                Companies Want
              </span>
            </h2>

            <p className="text-lg text-slate-600 max-w-xl">
              Structured learning paths designed to take you from beginner to
              job-ready with real-world projects and mentorship.
            </p>

            <Link
              to="/courses"
              className="inline-flex items-center gap-3 px-10 py-4 rounded-xl
              bg-linear-to-r from-indigo-600 to-purple-600
              text-white font-bold text-lg shadow-xl hover:scale-105 transition-transform"
            >
              Explore Courses
              <ArrowRight size={20} />
            </Link>
          </div>

          {/* RIGHT SIDE – SMALL BOXES */}
          <div className="lg:w-1/2 grid grid-cols-2 gap-6">
            {categories.map((item, index) => {
              const Icon = item.icon;
              return (
                <Link
                  key={index}
                  to="/courses"
                  className="group relative overflow-hidden rounded-2xl p-5
                  border border-white/10 hover:-translate-y-2 transition-all duration-300"
                >
                  {/* 🔥 HERO STYLE BOX BACKGROUND */}
                  <div className="absolute inset-0 bg-[#050B2E]" />

                  {/* GRID */}
                  <div
                    className="absolute inset-0 opacity-[0.06]"
                    style={{
                      backgroundImage: `
                        linear-gradient(to right, #ffffff 1px, transparent 1px),
                        linear-gradient(to bottom, #ffffff 1px, transparent 1px)
                      `,
                      backgroundSize: "32px 32px",
                    }}
                  />

                  {/* GLOWS */}
                  <div className="absolute -top-10 -left-10 w-40 h-40 bg-indigo-600/30 blur-[80px]" />
                  <div className="absolute bottom-0 right-0 w-40 h-40 bg-indigo-600/30 blur-[90px]" />

                  {/* CONTENT */}
                  <div className="relative z-10 flex items-center gap-4">
                    <div className="w-11 h-11 rounded-xl
                      bg-linear-to-r from-indigo-500 to-indigo-900
                      flex items-center justify-center shadow-lg
                      group-hover:scale-110 transition-transform"
                    >
                      <Icon size={20} className="text-white" />
                    </div>

                    <h3 className="text-sm font-semibold text-white">
                      {item.name}
                    </h3>
                  </div>
                </Link>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
};

export default ExploreCourses;
