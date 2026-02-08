import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import emy from '../assets/empty.jpg';
import { setSelectedCourse } from '../redux/courseSliec';

const CourseDetailPage = () => {
    const navigate = useNavigate();
    const { courseId } = useParams();
    const dispatch = useDispatch();
    
    const { courseData, selectedCourse } = useSelector(state => state.course);
    
    const [activeLecture, setActiveLecture] = useState(null);

    useEffect(() => {
        if (courseData && courseId) {
            const course = courseData.find((item) => item._id === courseId);

            if (course) {
                dispatch(setSelectedCourse(course));

                // Default first free preview select
                const firstFreeLecture = course.lectures?.find(l => l.isPreviewFree);

                if (firstFreeLecture) {
                    setActiveLecture(firstFreeLecture);
                } else {
                    setActiveLecture(null);
                }
            }
        }
    }, [courseData, courseId, dispatch]);

    return (
        <div className="max-w-7xl mx-auto p-4 md:p-10 bg-white min-h-screen">
            <FiArrowLeft 
                className='text-black w-6 h-6 cursor-pointer mb-5' 
                onClick={() => navigate("/")} 
            />

            <div className="flex flex-col lg:flex-row gap-10 mb-16 border-b pb-12">
                <div className="w-full lg:w-3/5">
                    <img 
                        src={selectedCourse?.thumbnail || emy}
                        alt="Course Thumbnail" 
                        className="rounded-2xl shadow-xl w-full aspect-video object-cover border border-gray-100"
                    />
                </div>

                <div className="w-full lg:w-2/5 flex flex-col justify-center">
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-2 leading-tight">
                        {selectedCourse?.title}
                    </h1>
                    <p className="text-blue-600 font-semibold text-lg mb-4">
                        {selectedCourse?.subTitle}
                    </p>

                    <div className="flex items-center gap-2 mb-6">
                        <span className="text-yellow-500 font-bold text-xl">5</span>
                        <div className="flex text-yellow-400">★★★★★</div>
                        <span className="text-gray-400 text-sm">(1,200 reviews)</span>
                    </div>

                    <div className="flex items-center gap-4 mb-8">
                        <span className="text-4xl font-black text-gray-900">
                            ₹{selectedCourse?.Price}
                        </span>
                        <span className="text-2xl text-gray-400 line-through">
                            ₹599
                        </span>
                    </div>

                    <button className="w-full bg-black hover:bg-zinc-800 text-white text-xl font-bold py-4 rounded-xl transition-all">
                        Enroll Now
                    </button>
                </div>
            </div>

            <h2 className="text-3xl font-bold mb-8">Course Curriculum</h2>

            <div className="flex flex-col lg:flex-row gap-8 bg-zinc-50 p-6 rounded-3xl border border-zinc-200">
                
                {/* ALL LECTURES LIST */}
                <div className="w-full lg:w-1/3 space-y-4 max-h-[500px] overflow-y-auto pr-2">
                    <p className="text-sm font-bold text-zinc-400 uppercase tracking-widest">
                        {selectedCourse?.lectures?.length || 0} Lectures
                    </p>

                    {selectedCourse?.lectures?.map((lecture, index) => (
                        <div
                            key={lecture._id || index}
                            onClick={() => {
                                if (lecture.isPreviewFree) {
                                    setActiveLecture(lecture);
                                } else {
                                    alert("Please enroll to unlock this lecture");
                                }
                            }}
                            className={`p-5 rounded-2xl transition-all flex items-center gap-4 border-2 ${
                                activeLecture?._id === lecture._id
                                    ? "bg-white border-black shadow-md"
                                    : "bg-transparent border-transparent"
                            } ${
                                lecture.isPreviewFree 
                                ? "cursor-pointer hover:bg-zinc-100" 
                                : "cursor-not-allowed opacity-50 bg-gray-200"
                            }`}
                        >
                            <div className="flex flex-col">
                                <p className="text-sm font-bold">
                                    {index + 1}. {lecture.title}
                                </p>

                                {lecture.isPreviewFree ? (
                                    <span className="text-xs text-green-600 font-bold">
                                        Free Preview
                                    </span>
                                ) : (
                                    <span className="text-xs text-red-500 font-bold">
                                        Locked
                                    </span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                

                {/* VIDEO SECTION */}
                <div className="w-full lg:w-2/3">
                    <div className="aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl flex items-center justify-center">
                        {activeLecture?.videoUrl ? (
                            <iframe
                                className="w-full h-full"
                                src={activeLecture.videoUrl}
                                title="Lecture Video"
                                frameBorder="0"
                                allowFullScreen
                            ></iframe>
                        ) : (
                            <div className="text-white text-center p-10">
                                <p className="text-lg">
                                    Select a free preview lecture to start watching
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="mt-6 p-2">
                        <h4 className="text-2xl font-bold text-gray-900">
                            {activeLecture?.title || "No Lecture Selected"}
                        </h4>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseDetailPage;
