import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

const ViewCourse = () => {
    const navigate = useNavigate()
    
    return (
        <div className='min-h-screen bg-gray-50 p-6'>
            <div className='max-w-6xl mx-auto bg-white shadow-md rounded-xl p-6 space-y-6 relative'>
                <div className='flex flex-col md:flex-row gap-6'>
                    <div className='w-full md:m-1/2'>
                        <FiArrowLeft className='text-black w-5.5 h=[22px] cursor-pointer' onClick={()=>navigate("/")} />

                    </div>
                </div>
            </div>
            
        </div>
    );
}

export default ViewCourse;
