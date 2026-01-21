import logo from '../assets/logo.png';
import google from '../assets/google.jpg';
import { ClipLoader } from 'react-spinners';
import { IoEye, IoEyeOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useState } from 'react';
import axios from 'axios';
import { serverURL } from '../App';
import { useDispatch } from 'react-redux';

const Login = () => {
    const [show, setShow] = useState(false);
    const navigate = useNavigate();
    const [email , setEmail]= useState('');
    const [password , setPassword]= useState('');
    const [loading , setLoading]= useState(false);
    const dispatch =useDispatch()
    const handleLogin = async () => {
        setLoading(true);
        try {
            const result= await axios.post(serverURL + "/api/auth/" ,{email,password} ,{withCredentials:true})
            dispatch(setUserData(result.data))
            setLoading(false);
            toast.success("Login Successfully")
        } catch (error) {
            setLoading(false)
            console.log(error);
            toast.error(error.response.data.message);
        }
    }


    return (
        <div className='bg-[#0f172a] h-screen w-full flex items-center justify-center font-sans p-4 relative overflow-hidden'>
            
            {/* Background Orbs */}
            <div className='absolute inset-0 z-0 pointer-events-none'>
                <div className='absolute -top-24 -left-24 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px]' />
                <div className='absolute -bottom-24 -right-24 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px]' />
            </div>

            {/* Main Card */}
            <div className='relative z-10 w-full max-w-250 max-h-[90vh] bg-white/95 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] rounded-[2.5rem] flex flex-col md:flex-row overflow-hidden border border-white/20'>

                {/* Left Side */}
                <div className='w-full md:w-[55%] p-8 md:p-12 flex flex-col justify-between min-h-full overflow-y-auto md:overflow-hidden custom-scrollbar'>

                    {/* Top */}
                    <div>
                        <div className='mb-8 text-center md:text-left'>
                            <h1 className='text-3xl font-extrabold text-gray-900 tracking-tight'>
                                Welcome Back
                            </h1>
                            <p className='text-gray-500 mt-1 font-medium text-sm'>
                                Sign in to continue to DevTrack
                            </p>
                        </div>

                        <form className='space-y-5' onSubmit={(e) => e.preventDefault()}>

                            {/* Email */}
                            <div className='group'>
                                <label className='block text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-1.5 ml-1'>
                                    Email Address
                                </label>
                                <input
                                    onChange={(e)=>setEmail(e.target.value)} value={email}
                                    type="email"
                                    placeholder="name@example.com"
                                    className='w-full h-11 px-5 rounded-2xl border-2 border-gray-100 bg-gray-50/50 outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 transition-all'
                                />
                            </div>

                            {/* Password */}
                            <div className='group'>
                                <label className='block text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-1.5 ml-1'>
                                    Password
                                </label>
                                <div className='relative'>
                                    <input
                                     onChange={(e)=>setPassword(e.target.value)} value={password}
                                        type={show ? 'text' : 'password'}
                                        placeholder="••••••••"
                                        className='w-full h-11 px-5 rounded-2xl border-2 border-gray-100 bg-gray-50/50 outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 transition-all'
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShow(!show)}
                                        className='absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-600'
                                    >
                                        {show ? <IoEyeOutline size={22} /> : <IoEye size={22} />}
                                    </button>
                                </div>
                            </div>

                            <div className='text-right'>
                                <a href="#" className='text-sm font-semibold text-blue-600 hover:underline'>
                                    Forgot password?
                                </a>
                            </div>

                            <button className='w-full h-12 bg-linear-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-2xl hover:shadow-lg hover:shadow-blue-500/30 transition-all active:scale-[0.97]'onClick={handleLogin}>
                                {loading ? <ClipLoader size={30} color='#ffffff' /> : "Sign In"}
                            </button>

                            <div className='flex items-center gap-4'>
                                <div className='h-px bg-gray-200 flex-1' />
                                <span className='text-gray-400 text-[10px] font-bold uppercase tracking-[0.2em]'>
                                    Or
                                </span>
                                <div className='h-px bg-gray-200 flex-1' />
                            </div>

                            <button className='w-full h-12 border-2 border-gray-100 rounded-2xl flex items-center justify-center gap-3 hover:bg-gray-50 transition-all font-bold text-gray-700 text-sm'>
                                <img src={google} alt="google" className='w-5' />
                                Continue with Google
                            </button>
                        </form>
                    </div>

                    {/* Bottom spacer (IMPORTANT for same height UX) */}
                    <div className='pt-10'>
                        <p className='text-center text-sm text-gray-500 font-medium'>
                            Don’t have an account?{' '}
                            <a href="/signup"  onClick={()=>navigate("/signup")}className='text-blue-600 font-bold hover:underline'>
                                Sign Up
                            </a>
                        </p>
                    </div>
                </div>

                {/* Right Side */}
                <div className='hidden md:flex md:w-[45%] bg-[#020617] relative flex-col items-center justify-center p-12 overflow-hidden'>
                    <div className='absolute inset-0 bg-linear-to-br from-blue-600/20 via-transparent to-purple-600/20' />

                    <div className='relative z-10 flex flex-col items-center text-center'>
                        <div className='bg-white/5 p-6 rounded-[2.5rem] backdrop-blur-2xl mb-8 border border-white/10 shadow-2xl animate-bounce-slow'>
                            <img src={logo} alt="logo" className='w-20 h-20 object-contain' />
                        </div>

                        <h2 className='text-5xl font-black text-white tracking-tighter mb-4'>
                            Dev<span className='text-blue-500'>Track</span>
                        </h2>

                        <div className='w-12 h-1 bg-blue-500 rounded-full mb-6' />

                        <p className='text-gray-300 text-lg font-medium max-w-70 leading-relaxed opacity-80'>
                            Track progress. Learn faster. Build smarter.
                        </p>
                    </div>

                    <div className='absolute bottom-10 text-gray-500 text-xs font-bold tracking-widest uppercase'>
                        © 2024 DevTrack Inc.
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes bounce-slow {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-15px); }
                }
                .animate-bounce-slow {
                    animation: bounce-slow 4s ease-in-out infinite;
                }
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #e2e8f0;
                    border-radius: 10px;
                }
            `}</style>
        </div>
    );
};

export default Login;
