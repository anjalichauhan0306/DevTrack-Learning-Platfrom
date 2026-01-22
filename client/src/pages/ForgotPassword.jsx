import React, { useState } from 'react';
import logo from '../assets/logo.png'
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
    const [step , setStep] = useState(3);
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    return (
        <div className="min-h-screen flex items-center justify-center bg-indigo-50/30 p-4">
         {/* Main Card */}
            { step === 1 &&
      <div className="w-full max-w-105 bg-white rounded-4xl shadow-xl shadow-indigo-100/50 border border-indigo-50 p-10">
        
        {/* Logo & Header */}
        <div className="flex flex-col items-center mb-10">
          <div className="flex items-center gap-2 mb-8">
            <div className="bg-indigo-900 p-2 rounded-xl shadow-lg shadow-indigo-200">
              <img src={logo} className='w-8 h-8' alt="devTrack Logo" />
              </div>
            <span className="text-2xl font-extrabold tracking-tight text-slate-900">
              dev<span className="text-indigo-700">Track</span>
            </span>
          </div>

          <h1 className="text-2xl font-bold text-slate-900 mb-3">Forgot Password?</h1>
          <p className="text-center text-slate-500 text-[15px] leading-relaxed">
            Enter your email and we'll send you instructions to reset your password
          </p>
        </div>

        {/* Form */}
        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 block ml-1">
              Email address*
            </label>
            <div className="relative">
              <input 
                type="email" 
                placeholder="name@company.com"
                className="w-full pl-4 pr-4 py-3.5 rounded-2xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 transition-all duration-200 placeholder:text-slate-400 text-slate-900"
                required
              />
            </div>
          </div>

          <button 
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-4 rounded-2xl transition-all duration-300 shadow-lg shadow-indigo-200 active:scale-[0.98]"
          >
            Send OTP
          </button>
        </form>

        {/* Footer */}
        <div className="mt-10 text-center">
          <button onClick={()=>navigate("/login")} className="inline-flex items-center text-sm font-bold text-indigo-600 hover:text-indigo-700 transition-colors gap-2 group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to login
          </button>
        </div>
      </div>}
      
            
        { /* Step 2: OTP Verification Form */ }
        
        { step === 2 && <div className="w-full max-w-105 bg-white rounded-4xl shadow-xl shadow-indigo-100/50 border border-indigo-50 p-10">
        
        {/* Logo & Header */}
        <div className="flex flex-col items-center mb-10">
          <div className="flex items-center gap-2 mb-8">
            <div className="bg-indigo-900 p-2 rounded-xl shadow-lg shadow-indigo-200">
              <img src={logo} className='w-8 h-8' alt="devTrack Logo" />
              </div>
            <span className="text-2xl font-extrabold tracking-tight text-slate-900">
              dev<span className="text-indigo-700">Track</span>
            </span>
          </div>

          <h1 className="text-2xl font-bold text-slate-900 mb-3">Enter OTP</h1>
          <p className="text-center text-slate-500 text-[15px] leading-relaxed">
            Enter the OTP sent to your email address
          </p>
        </div>

        {/* Form */}
        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-2">
            <label htmlFor="otp" className="text-sm font-bold text-slate-700 block ml-1">
              Enter the 4-digit OTP*
            </label>
            <div className="relative">
              <input 
                type="text" 
                placeholder=" * * * * "
                className="w-full pl-4 pr-4 py-3.5 rounded-2xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 transition-all duration-200 placeholder:text-slate-400 text-slate-900"
                required
              />
            </div>
          </div>

          <button 
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-4 rounded-2xl transition-all duration-300 shadow-lg shadow-indigo-200 active:scale-[0.98]"
          >
            Verify OTP
          </button>
        </form>

        {/* Footer */}
        <div className="mt-10 text-center">
          <button onClick={()=>navigate("/login")} className="inline-flex items-center text-sm font-bold text-indigo-600 hover:text-indigo-700 transition-colors gap-2 group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to login
          </button>
        </div>
      </div> }

           
        
        { /* Step 3: Reset Password Form */ }
    
        { step === 3 && <div className="w-full max-w-120 bg-white rounded-4xl shadow-xl shadow-indigo-100/50 border border-indigo-50 p-10">
        
        {/* Logo & Header */}
        <div className="flex flex-col items-center mb-10">
          <div className="flex items-center gap-2 mb-8">
            <div className="bg-indigo-900 p-2 rounded-xl shadow-lg shadow-indigo-200">
              <img src={logo} className='w-8 h-8' alt="devTrack Logo" />
              </div>
            <span className="text-2xl font-extrabold tracking-tight text-slate-900">
              dev<span className="text-indigo-700">Track</span>
            </span>
          </div>

          <h1 className="text-2xl font-bold text-slate-900 mb-3">Enter OTP</h1>
          <p className="text-center text-slate-500 text-[15px] leading-relaxed">
            reset your password securely and conveniently for your account
          </p>
        </div>

            {/* Form */}
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>

            {/* New Password */}
                <div className="space-y-2">
                <label
                htmlFor="newPassword"
                className="text-sm font-bold text-slate-700 block ml-1"
                >
                 New Password*
                 </label>

            <div className="relative">
                <input
                id="newPassword"
                type="password"
                placeholder="********"
                className="w-full px-4 py-3.5 rounded-2xl border border-slate-200
                            focus:outline-none focus:ring-4 focus:ring-indigo-50
                            focus:border-indigo-500 transition-all duration-200
                            placeholder:text-slate-400 text-slate-900"
                required
                />
            </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
            <label
                htmlFor="confirmPassword"
                className="text-sm font-bold text-slate-700 block ml-1"
            >
                Confirm Password*
            </label>

            <div className="relative">
                <input
                id="confirmPassword"
                type="password"
                placeholder="********"
                className="w-full px-4 py-3.5 rounded-2xl border border-slate-200
                            focus:outline-none focus:ring-4 focus:ring-indigo-50
                            focus:border-indigo-500 transition-all duration-200
                            placeholder:text-slate-400 text-slate-900"
                required
                />
            </div>
            </div>

            {/* Submit Button */}
            <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white
                        font-semibold py-4 rounded-2xl transition-all duration-300
                        shadow-lg shadow-indigo-200 active:scale-[0.98]"
            >
            Reset Password
            </button>

            </form>


        {/* Footer */}
        <div className="mt-10 text-center">
          <button onClick={()=>navigate("/login")} className="inline-flex items-center text-sm font-bold text-indigo-600 hover:text-indigo-700 transition-colors gap-2 group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to login
          </button>
        </div>
      </div>}
        </div>
    );
}


export default ForgotPassword;
