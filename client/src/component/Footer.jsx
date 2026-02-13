import React from 'react';
import logo from '../assets/logo.png'

const Footer = () => {
    return (
        <>
            <style>
                {`
                    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
                    .devtrack-footer * {
                        font-family: "Plus Jakarta Sans", sans-serif;
                    }
                `}
            </style>
            <div className='bg-[#0a0f1c] pt-20 px-4 devtrack-footer'>
                <footer className="bg-[#0f172a] w-full max-w-[1350px] mx-auto text-white pt-8 lg:pt-12 px-4 sm:px-8 md:px-16 lg:px-28 rounded-tl-[3rem] rounded-tr-[3rem] overflow-hidden border-t border-white/5">
                    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-6 gap-12">
                        
                        {/* --- Section 1: DevTrack Brand & About --- */}
                        <div className="lg:col-span-2 space-y-6">
                            <div className="flex items-center gap-2">
                                <div className="w-10 h-10  rounded-lg flex items-center justify-center">
                                     <img src={logo} alt="" />
                                </div>
                                <span className="font-bold text-2xl  tracking-tight text-white">
            Dev<span className="text-indigo-500">Track</span>
          </span>
                            </div>
                            <p className="text-sm/6 text-slate-400">
                                A modern Learning Management System designed to simplify education and track student progress in real-time.
                            </p>
                        </div>
                        <div className="lg:col-span-2 grid grid-cols-2 gap-8">
                            <div>
                                <h3 className="font-bold text-sm mb-4 text-white uppercase tracking-wider">Platform</h3>
                                <ul className="space-y-3 text-sm text-slate-400">
                                    <li><a href="#" className="hover:text-blue-400">My Courses</a></li>
                                    <li><a href="#" className="hover:text-blue-400">Students</a></li>
                                    <li><a href="#" className="hover:text-blue-400">Analytics</a></li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="font-bold text-sm mb-4 text-white uppercase tracking-wider">Resources</h3>
                                <ul className="space-y-3 text-sm text-slate-400">
                                    <li><a href="#" className="hover:text-blue-400">Documentation</a></li>
                                    <li><a href="#" className="hover:text-blue-400">Help Center</a></li>
                                    <li><a href="#" className="hover:text-blue-400">Privacy</a></li>
                                </ul>
                            </div>
                        </div>

                        {/* --- Section 3: Developer Info (Your Personal Touch) --- */}
                        <div className="lg:col-span-2 bg-white/5 p-6 rounded-2xl border border-white/10">
                            <h3 className="font-bold text-sm mb-4 text-blue-400 uppercase tracking-wider">Developed By</h3>
                            <div className="flex flex-col space-y-3">
                                <p className="text-lg font-bold text-white text-sky-400">Anjali Chauhan</p>
                                <p className="text-xs text-slate-400 leading-relaxed">
                                    Full-stack developer passionate about building educational tools. Certified in React and GitHub Fundamentals.
                                </p>
                                <div className="pt-2 flex flex-col space-y-2">
                                    <a href="mailto:contact@anjliben.dev" className="text-xs text-blue-400 hover:underline">anjliben.dev@example.com</a>
                                    <div className="flex gap-4 pt-1">
                                        <a href="#" className="text-slate-400 hover:text-white transition-colors">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
                                        </a>
                                        <a href="#" className="text-slate-400 hover:text-white transition-colors">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-white/5 flex justify-between items-center">
                        <p className="text-slate-500 text-sm">© 2026 DevTrack LMS. All rights reserved.</p>
                    </div>

                    {/* --- Big Branding Section (Back to DevTrack) --- */}
                    <div className="relative mt-4">
                        <div className="absolute inset-x-0 bottom-0 mx-auto w-full max-w-4xl h-full max-h-64 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"/>
                        <h3 className="text-center font-black leading-[0.7] text-transparent text-[clamp(3rem,16vw,16rem)] [-webkit-text-stroke:1px_#1e293b] mt-8 select-none opacity-40">
                            DEVTRACK
                        </h3>
                    </div>
                </footer>
            </div>
        </>
    )
}
export default Footer;