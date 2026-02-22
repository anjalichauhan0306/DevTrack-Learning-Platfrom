import React, { useMemo } from "react";
import { FiMail, FiLinkedin,  FiAward, FiArrowUpRight, FiBookOpen } from "react-icons/fi";
import Footer from "../component/Footer";
import Navbar from "../component/Nav";
import { useSelector } from "react-redux";

const MentorsList = () => {

  const {courseData} = useSelector(state=>state.course);
   const creators = useMemo(() => {
    if (!courseData) return [];

    const map = new Map();

    courseData.forEach((course) => {
      if (course.creator) {
        const existing = map.get(course.creator._id);

        if (existing) {
          existing.courseCount += 1;
        } else {
          map.set(course.creator._id, {
            ...course.creator,
            courseCount: 1,
          });
        }
      }
    });

    return Array.from(map.values());
  }, [courseData]);

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col font-sans">
      <Navbar />
      <div className="bg-[#0f172a] text-white pt-20 pb-32 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 px-4 py-1.5 rounded-full mb-6">
            <FiAward className="text-blue-400" />
            <span className="text-blue-400 text-xs font-bold uppercase tracking-widest">Expert Instructors</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">
            Learn from the <span className="text-blue-500">Industry Leaders.</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto font-medium">
            Direct mentorship from verified educators to help you build your dream career in tech.
          </p>
        </div>
      </div>
      <main className="flex-grow -mt-20 px-6 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {creators.map((mentor) => (
              <div
                key={mentor._id}
                className="group bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-xl hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                  <FiArrowUpRight className="text-blue-600 text-2xl" />
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="relative mb-6">
                    <div className="h-32 w-32 rounded-[2.2rem] overflow-hidden rotate-3 group-hover:rotate-0 transition-transform duration-500 border-4 border-white shadow-lg">
                      <img
                        src={mentor.photoUrl || "https://via.placeholder.com/150"} 
                        alt={mentor.name}
                        className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-500"
                      />
                    </div>
                    <div className="absolute -bottom-2 -right-2 bg-blue-600 text-white text-[10px] font-black px-3 py-1 rounded-xl shadow-lg uppercase tracking-wider">
                      {mentor.role}
                    </div>
                  </div>
                  <div className="mb-4">
                    <h3 className="text-2xl font-black text-gray-900 group-hover:text-blue-600 transition-colors">
                      {mentor.name}
                    </h3>
                    <div className="flex items-center justify-center gap-2 mt-1">
                       <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse"></span>
                       <p className="text-gray-400 text-[11px] font-bold uppercase tracking-widest">Verified Expert</p>
                    </div>
                  </div>
                  <p className="text-gray-500 text-sm leading-relaxed mb-8 line-clamp-3 px-2 min-h-[60px]">
                    {mentor.description || "No description provided."}
                  </p>
                  <div className="grid grid-cols-2 w-full bg-gray-50 rounded-3xl p-4 gap-4 items-center">
                    <div className="flex flex-col items-center border-r border-gray-200">
                      <div className="flex items-center gap-1.5">
                        <FiBookOpen className="text-blue-600" size={14} />
                        <span className="text-lg font-black text-gray-900">
                          {mentor.courseCount || 0}
                        </span>
                      </div>
                      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">Courses</span>
                    </div>

                    <div className="flex flex-col items-center">
                      <div className="flex gap-4">
                        <a href={`mailto:${mentor.email}`} className="text-gray-400 hover:text-blue-600 transition-colors" title="Contact Email">
                          <FiMail size={18} />
                        </a>
                        <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
                          <FiLinkedin size={18} />
                        </a>
                      </div>
                      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter mt-1">Contact</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MentorsList;