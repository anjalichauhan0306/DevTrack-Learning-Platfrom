import React, { useState } from 'react';
import logo from '../assets/logo.png';
import google from '../assets/google.jpg';
import { IoEye, IoEyeOutline, IoSchoolOutline, IoTerminalOutline } from 'react-icons/io5';

const Signup = () => {
    const [show, setShow] = useState(false);
    const [role, setRole] = useState('Student');

    return (
        // Added h-screen and overflow-hidden to stop page scroll
        <div className='bg-[#0f172a] h-screen w-full flex items-center justify-center font-sans p-4 relative overflow-hidden'>
            
            {/* Background Orbs */}
            <div className='absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none'>
                <div className='absolute -top-24 -left-24 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px]'></div>
                <div className='absolute -bottom-24 -right-24 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px]'></div>
            </div>

            {/* Main Card - Max height set to 90% of viewport */}
            <div className='relative z-10 w-full max-w-250 max-h-[90vh] bg-white/95 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] rounded-[2.5rem] flex flex-col md:flex-row overflow-hidden border border-white/20'>
                
                {/* Left Side: Form - Internal Scroll Enabled */}
                <div className='w-full md:w-[55%] p-8 md:p-12 flex flex-col justify-center overflow-hidden custom-scrollbar'>
                    <div className='mb-6 text-center md:text-left'>
                        <h1 className='text-3xl font-extrabold text-gray-900 tracking-tight'>
                            Create Account
                        </h1>
                        <p className='text-gray-500 mt-1 font-medium text-sm'>
                            Join the DevTrack community today
                        </p>
                    </div>

                    <form className='space-y-4' onSubmit={(e) => e.preventDefault()}>
                        {/* Name */}
                        <div className='group'>
                            <label className='block text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-1.5 ml-1 transition-colors group-focus-within:text-blue-600'>
                                Full Name
                            </label>
                            <input 
                                type="text" 
                                className='w-full h-11 px-5 rounded-2xl border-2 border-gray-100 outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 transition-all bg-gray-50/50' 
                                placeholder='John Doe' 
                            />
                        </div>

                        {/* Email */}
                        <div className='group'>
                            <label className='block text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-1.5 ml-1 transition-colors group-focus-within:text-blue-600'>
                                Email Address
                            </label>
                            <input 
                                type="email" 
                                className='w-full h-11 px-5 rounded-2xl border-2 border-gray-100 outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 transition-all bg-gray-50/50' 
                                placeholder='name@example.com' 
                            />
                        </div>

                        {/* Role Selection */}
                        <div className='group'>
                            <label className='block text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-1.5 ml-1'>
                                I am a
                            </label>
                            <div className='flex gap-3'>
                                {[
                                    { id: 'Student', icon: <IoSchoolOutline size={18}/> },
                                    { id: 'Educator', icon: <IoTerminalOutline size={18}/> }
                                ].map((item) => (
                                    <button
                                        key={item.id}
                                        type="button"
                                        onClick={() => setRole(item.id)}
                                        className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-2xl border-2 transition-all font-bold text-sm ${
                                            role === item.id 
                                            ? 'border-blue-600 bg-blue-50 text-blue-600 shadow-sm' 
                                            : 'border-gray-100 bg-gray-50/50 text-gray-400 hover:border-gray-200'
                                        }`}
                                    >
                                        {item.icon}
                                        {item.id}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Password */}
                        <div className='group'>
                            <label className='block text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-1.5 ml-1 transition-colors group-focus-within:text-blue-600'>
                                Password
                            </label>
                            <div className='relative'>
                                <input 
                                    type={show ? "text" : "password"} 
                                    className='w-full h-11 px-5 rounded-2xl border-2 border-gray-100 outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 transition-all bg-gray-50/50' 
                                    placeholder='••••••••' 
                                />
                                <button 
                                    type="button"
                                    className='absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-600'
                                    onClick={() => setShow(!show)}
                                >
                                    {show ? <IoEyeOutline size={22} /> : <IoEye size={22} />}
                                </button>
                            </div>
                        </div>

                        <button className='w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-2xl mt-2 hover:shadow-lg hover:shadow-blue-500/30 transition-all active:scale-[0.97]'>
                            Sign Up
                        </button>

                        <div className='flex items-center gap-4 py-2'>
                            <div className='h-[1px] bg-gray-200 flex-1'></div>
                            <span className='text-gray-400 text-[10px] font-bold uppercase tracking-[0.2em]'>Or</span>
                            <div className='h-[1px] bg-gray-200 flex-1'></div>
                        </div>

                        <button className='w-full h-12 border-2 border-gray-100 rounded-2xl flex items-center justify-center gap-3 hover:bg-gray-50 transition-all font-bold text-gray-700 text-sm'>
                            <img src={google} alt="google" className='w-5' />
                            Google
                        </button>
                    </form>

                    <p className='text-center mt-6 text-sm text-gray-500 font-medium'>
                        Already have an account? <a href="#" className='text-blue-600 font-bold hover:underline'>Sign In</a>
                    </p>
                </div>

                {/* Right Side: Visuals - No changes to maintain exact login look */}
                <div className='hidden md:flex md:w-[45%] bg-[#020617] relative flex-col items-center justify-center p-12 overflow-hidden'>
                    <div className='absolute inset-0 bg-gradient-to-br from-blue-600/20 via-transparent to-purple-600/20'></div>
                    
                    <div className='relative z-10 flex flex-col items-center text-center'>
                        <div className='bg-white/5 p-6 rounded-[2.5rem] backdrop-blur-2xl mb-8 border border-white/10 shadow-2xl animate-bounce-slow'>
                            <img src={logo} alt="logo" className='w-20 h-20 object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]' />
                        </div>
                        <h2 className='text-5xl font-black text-white tracking-tighter mb-4'>
                            Dev<span className='text-blue-500'>Track</span>
                        </h2>
                        <div className='w-12 h-1 bg-blue-500 rounded-full mb-6'></div>
                        <p className='text-gray-300 text-lg font-medium max-w-[280px] leading-relaxed opacity-80'>
                            Level up your workflow with real-time analytics.
                        </p>
                    </div>

                    <div className='absolute bottom-10 text-gray-500 text-xs font-bold tracking-widest uppercase'>
                        © 2024 DevTrack Inc.
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes bounce-slow {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-15px); }
                }
                .animate-bounce-slow {
                    animation: bounce-slow 4s ease-in-out infinite;
                }
                /* Thin scrollbar for the form side */
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #e2e8f0;
                    border-radius: 10px;
                }
            `}</style>
        </div>
    );
}

export default Signup; 