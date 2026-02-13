import React from 'react';
import { TfiLayoutLineSolid } from "react-icons/tfi";
import { BsFillPatchCheckFill } from "react-icons/bs"; 

const About = () => {
    const features = [
        "Simplified Learning",
        "Track Progress",
        "Expert Instructors",
        "Community Support"
    ];

    return (
        <section className='w-full py-16 px-4 bg-white'>
            <div className='max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 items-center'>
                
                {/* --- Left Column: Images --- */}
                <div className='relative flex justify-center lg:justify-start'>
                    {/* Main Image - Reduced height to 450px */}
                    <div className='relative z-0 w-full max-w-[500px] h-[450px] overflow-hidden rounded-3xl shadow-lg'>
                        <img 
                            src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop" 
                            alt="Students learning" 
                            className='w-full h-full object-cover' 
                        />
                    </div>

                    {/* Floating Video Overlay - Balanced size and position */}
                    <div className='absolute -bottom-6 right-0 md:-right-4 z-10 w-[220px] md:w-[280px] bg-white p-1.5 rounded-2xl shadow-2xl'>
                        <video 
                            src="https://videos.pexels.com/video-files/853789/853789-hd_1920_1080_25fps.mp4" 
                            className='w-full h-full rounded-xl object-cover' 
                            autoPlay 
                            muted 
                            loop
                            playsInline
                        />
                    </div>
                </div>

                {/* --- Right Column: Content --- */}
                <div className='flex flex-col space-y-5 lg:pl-6'>
                    
                    {/* Badge */}
                    <div className='flex items-center gap-2 text-indigo-600 font-semibold tracking-wide uppercase text-sm'>
                        <TfiLayoutLineSolid className="w-6 h-6"/>
                        <span>About us</span>
                    </div>

                    {/* Heading - Size reduced to 4xl for better balance */}
                    <h2 className='text-3xl md:text-5xl font-bold text-gray-900 leading-tight'>
                        We Maximize Your <br className='hidden md:block' /> 
                        <span className='text-indigo-600 font-extrabold'>Learning Growth</span>
                    </h2>

                    {/* Description */}
                    <p className='text-gray-500 text-base md:text-lg leading-relaxed max-w-lg'>
                        We provide a modern Learning Management System to simplify online education, track progress, and enhance the student-instructor connection.
                    </p>

                    {/* Feature List - Compact grid */}
                    <div className='grid grid-cols-2 gap-y-4 gap-x-4 pt-2'>
                        {features.map((item, index) => (
                            <div key={index} className='flex items-center gap-2'>
                                <BsFillPatchCheckFill className="w-5 h-5 text-indigo-600 flex-shrink-0"/>
                                <span className='font-medium text-gray-700 text-sm md:text-base'>{item}</span>
                            </div>
                        ))}
                    </div>
                    
                    {/* CTA Button */}
                    <div className='pt-4'>
                        <button className="px-8 py-3 bg-indigo-600 text-white rounded-lg font-bold hover:bg-indigo-700 transition-all shadow-md active:scale-95">
                            Learn More
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default About;