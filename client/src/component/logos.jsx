import React from 'react';
import { 
    MdSchool, 
  MdOutlineAllInclusive, 
  MdPeopleOutline, 
  MdPsychology 
} from 'react-icons/md';
import { ShieldCheck } from 'lucide-react';

const Logos = () => {
  const features = [
    { text: '20K+ Online Courses', icon: <MdSchool /> },
    { text: 'Lifetime Access', icon: <MdOutlineAllInclusive /> },
    { text: 'Community Support', icon: <MdPeopleOutline /> },
    { text: 'Expert Instructors', icon: <MdPsychology /> },
    { text: "Career Focused", icon: <ShieldCheck /> }
  ];

  return (
    <div className="w-full py-10 ">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-center gap-8 flex-wrap">
        
        {features.map((item, i) => (
          <div
            key={i}
            className="
              group relative flex items-center gap-4 px-5 py-3.5 rounded-xl
              bg-white border border-slate-200/60
              shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]
              hover:shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1),0_10px_10px_-5px_rgba(0,0,0,0.04)]
              hover:-translate-y-1.5 transition-all duration-500 ease-out cursor-default
            "
          >
            {/* Icon Container */}
            <div
              className="
                relative z-10 w-10 h-10 rounded-lg flex items-center justify-center
                bg-slate-50 text-indigo-600 text-xl
                group-hover:bg-indigo-600 group-hover:text-white
                transition-colors duration-300
              "
            >
              {item.icon}
            </div>

            {/* Text */}
            <div className="flex flex-col">
              <span className="text-slate-700 font-medium text-sm tracking-tight">
                {item.text}
              </span>
            </div>

            {/* Subtle bottom border accent */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-indigo-500 group-hover:w-1/2 transition-all duration-300 opacity-0 group-hover:opacity-100" />
          </div>
        ))}

      </div>
    </div>
  );
};

export default Logos;