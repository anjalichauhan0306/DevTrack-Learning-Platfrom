import { Star } from 'lucide-react';
import React from 'react';

const ReviewCard = ({ comment, rating, name, photoUrl, description, courseTitle }) => {
    return (
        <div className='bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 max-w-sm w-full flex flex-col justify-between'>
            
            {/* Star Rating */}
            <div className='flex items-center mb-4 gap-1'>
                {[...Array(5)].map((_, index) => (
                    <Star 
                        key={index} 
                        size={18} 
                        className={index < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"} 
                    />
                ))}
            </div>

            {/* Review Content */}
            <div className='mb-6'>
                <p className='text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1'>
                    {courseTitle}
                </p>
                <p className='text-gray-700 italic leading-relaxed'>
                    "{comment}"
                </p>
            </div>

            {/* User Profile Section */}
            <div className='flex items-center gap-4 border-t pt-4'>
                <img 
                    src={photoUrl} 
                    alt={name} 
                    className='w-12 h-12 rounded-full object-cover border-2 border-gray-50'
                />
                <div className='overflow-hidden'>
                    <h2 className='font-bold text-gray-900 truncate'>{name}</h2>
                    <p className='text-sm text-gray-500 truncate'>{description}</p>
                </div>
            </div>
        </div>
    );
}

export default ReviewCard;