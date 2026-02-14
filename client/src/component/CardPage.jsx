import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Card from './Card';

const CardPage = () => {
    const courseData = useSelector(state => state.course?.courseData);
    const [popularCourses, setPopularCourses] = useState([]);
    console.log(popularCourses);
    useEffect(() => {
        if (Array.isArray(courseData) && courseData.length > 0) {
            setPopularCourses(courseData?.slice(0, 6));
        }
    }, [courseData]);

    return (
        <section className='relative overflow-hidden bg-[#fcfcfd] py-20'>
            {/* Background Aesthetic Elements */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-50/50 blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] rounded-full bg-blue-50/50 blur-[120px]" />
            </div>

            <div className='max-w-7xl mx-auto px-6'>
                {/* Header Section */}
                <div className='text-center mb-16 space-y-4'>
                    <h2 className='inline-block px-4 py-1.5 mb-4 text-sm font-bold tracking-widest text-indigo-600 uppercase bg-indigo-50 rounded-full'>
                        Trending Now
                    </h2>
                    <h1 className='text-4xl md:text-6xl font-black text-gray-900 tracking-tight'>
                        Our Popular <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-violet-600">Courses</span>
                    </h1>
                    <p className='text-gray-500 text-lg md:text-xl max-w-2xl mx-auto font-medium'>
                        Learn from the most-loved courses across tech, AI, business, and beyond.
                    </p>
                </div>

                {/* Course Grid */}
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10'>
                   {popularCourses?.map((course, index) => (
                    

                        <Card 
                            key={course._id || index} 
                            thumbnail={course.thumbnail} 
                            title={course.title} 
                            category={course.category} 
                            price={course.Price} 
                            id={course._id} 
                            subtitle={course.subtitle}
                            reviews={course.reviews}
                            level={course.level}
                        />
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className='mt-16 text-center'>
                    <button className='px-8 py-4 bg-gray-900 text-white font-bold rounded-2xl hover:bg-gray-800 transition-all shadow-xl hover:shadow-gray-200'>
                        View All 100+ Courses
                    </button>
                </div>
            </div>
        </section>
    );
}

export default CardPage;