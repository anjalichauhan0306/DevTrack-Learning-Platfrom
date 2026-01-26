'use client'
import React from 'react';
import Nav from '../component/Nav.jsx';
import { CheckIcon, ChevronRightIcon, SearchIcon, PlayCircle, Star } from "lucide-react";
import { motion } from "framer-motion"; // Make sure to install framer-motion

const Home = () => {
    const specialFeatures = [
        "Expert-Led Courses",
        "AI-Powered Learning",
        "Lifetime Access",
    ];

    return (
        <div className="w-full min-h-screen bg-[#0a0a20] overflow-hidden">
            <Nav />

            {/* Main Hero Container */}
            <div className="relative flex flex-col items-center justify-center px-6 pt-32 md:pt-44 pb-20">
                
                {/* Background Glows (Tumhare code jaisa logic) */}
                <div className="absolute top-20 -z-10 left-1/2 -translate-x-1/2 size-[500px] bg-indigo-600/20 blur-[120px] rounded-full"></div>
                <div className="absolute bottom-0 -z-10 right-0 size-[400px] bg-blue-600/10 blur-[100px] rounded-full"></div>

                {/* Badge: "NEW" (Inspired by your code) */}
                <motion.div 
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
                    className="group flex items-center gap-2 rounded-full p-1 pr-4 mb-8 text-indigo-100 bg-indigo-500/10 border border-indigo-500/20"
                >
                    <span className="bg-indigo-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase">
                        New
                    </span>
                    <p className="flex items-center gap-1 text-sm">
                        <span>Join the 2026 Batch for Free</span>
                        <ChevronRightIcon size={14} className="group-hover:translate-x-1 transition duration-300" />
                    </p>
                </motion.div>

                {/* Main Heading */}
                <motion.h1 
                    className="text-5xl md:text-7xl font-black text-center text-white max-w-4xl leading-[1.1] tracking-tight"
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    Unlock Your Potential, <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-cyan-400 to-blue-500">
                        Grow Your Future
                    </span>
                </motion.h1>

                {/* Subtext */}
                <motion.p 
                    className="text-lg md:text-xl text-center text-slate-400 max-w-2xl mt-8 leading-relaxed font-light"
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1, duration: 0.5 }}
                >
                    Stop searching, start learning. Get industry-ready skills with our advanced AI-integrated curriculum designed for modern developers.
                </motion.p>

                {/* Action Buttons */}
                <motion.div 
                    className="flex flex-col sm:flex-row items-center gap-5 mt-10"
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                >
                    <button className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-full px-10 h-14 text-lg transition-all shadow-[0_20px_40px_-10px_rgba(79,70,229,0.4)] hover:-translate-y-1">
                        Get Started Now
                    </button>
                    
                    <button className="flex items-center gap-3 border border-slate-800 hover:bg-white/5 transition rounded-full px-8 h-14 text-white font-semibold">
                        <PlayCircle size={20} className="text-indigo-400" />
                        <span>Watch Demo</span>
                    </button>
                </motion.div>

                {/* Features Checklist */}
                <div className="flex flex-wrap justify-center items-center gap-6 md:gap-12 mt-16">
                    {specialFeatures.map((feature, index) => (
                        <motion.div 
                            key={index}
                            className="flex items-center gap-2.5"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 + (index * 0.1) }}
                        >
                            <div className="bg-indigo-500/20 p-1 rounded-full">
                                <CheckIcon className="size-4 text-indigo-400" />
                            </div>
                            <span className="text-slate-300 font-medium text-sm md:text-base">{feature}</span>
                        </motion.div>
                    ))}
                </div>

                {/* Hero Image / Mockup Area (Like TiltedImage) */}
                <motion.div 
                    className="mt-20 w-full max-w-5xl px-4"
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                >
                    <div className="relative rounded-2xl border border-white/10 bg-white/5 p-2 shadow-2xl backdrop-blur-3xl">
                        <img 
                            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1600" 
                            alt="Dashboard Preview" 
                            className="rounded-xl w-full shadow-inner opacity-90"
                        />
                        {/* Overlay Gradient to blend bottom */}
                        <div className="absolute inset-0 bg-linear-to-t from-[#0a0a20] via-transparent to-transparent"></div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

export default Home;