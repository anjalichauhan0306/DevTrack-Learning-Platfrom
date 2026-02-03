import { Star, Clock, BarChart3, Users, MoveRight } from 'lucide-react';
import React from 'react';

const Card = ({ thumbnail, title, category, price, level = "Beginner" }) => {
    return (
        <div className='group bg-white rounded-2xl border border-slate-200/60 hover:border-indigo-500/30 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] transition-all duration-500'>
            {/* Image Section */}
            <div className='relative aspect-16/10 overflow-hidden rounded-t-2xl'>
                <img 
                    src={thumbnail} 
                    alt={title} 
                    className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-105' 
                />
                
                {/* Top Badges */}
                <div className='absolute inset-x-3 top-3 flex justify-between items-start'>
                    <span className='px-2.5 py-1 bg-white/90 backdrop-blur-md text-[10px] font-bold text-slate-800 rounded-lg shadow-sm uppercase tracking-tight border border-white/20'>
                        {category}
                    </span>
                    <span className='px-2.5 py-1 bg-indigo-600 text-white text-[10px] font-bold rounded-lg shadow-md uppercase tracking-tight'>
                        {level}
                    </span>
                </div>
            </div>

            {/* Content Section */}
            <div className='p-5'>
                <h3 className='text-[17px] font-bold text-slate-900 leading-snug mb-1 line-clamp-1 group-hover:text-indigo-600 transition-colors'>
                    {title}
                </h3>
                <p className='text-slate-500 text-xs font-medium mb-4 line-clamp-1'>
                    Master the fundamentals and build production-ready apps.
                </p>

                {/* Minimal Stats Bar */}
                <div className='flex items-center gap-4 py-3 border-y border-slate-50 mb-4'>
                    <div className='flex items-center gap-1.5 text-slate-500 text-[11px] font-semibold'>
                        <Clock size={14} className='text-indigo-500' /> 12h
                    </div>
                    <div className='flex items-center gap-1.5 text-slate-500 text-[11px] font-semibold'>
                        <Users size={14} className='text-indigo-500' /> 1.2k
                    </div>
                    <div className='ml-auto flex items-center gap-1 text-amber-500 text-[11px] font-bold'>
                        <Star size={13} fill="currentColor" /> 4.9
                    </div>
                </div>

                {/* Price & Action */}
                <div className='flex items-center justify-between'>
                    <div className='flex flex-col'>
                        <span className='text-xl font-black text-slate-900 bg-linear-to-r from-slate-900 to-slate-700 bg-clip-text'>
                            ₹{price}
                        </span>
                    </div>
                    <button className='flex items-center gap-2 text-[13px] font-bold text-indigo-600 group/btn transition-all'>
                        Enroll <MoveRight size={16} className='group-hover/btn:translate-x-1 transition-transform' />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Card;