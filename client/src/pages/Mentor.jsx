import React from "react";
import { FiStar, FiUsers, FiLinkedin, FiTwitter, FiAward, FiArrowUpRight } from "react-icons/fi";
import Footer from "../component/Footer";
import Navbar from "../component/Nav";

const MentorsList = () => {
  const devtrackMentors = [
    {
      id: "m1",
      name: "Dr. Ankit Sharma",
      role: "Lead Full Stack Architect",
      expertise: ["React", "Node.js", "System Design"],
      students: "15,000+",
      rating: 4.9,
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      bio: "Ex-Google Engineer with 10+ years of experience in scaling complex web applications and microservices.",
      linkedin: "#",
      twitter: "#"
    },
    {
      id: "m2",
      name: "Sneha Kapoor",
      role: "Principal UI/UX Designer",
      expertise: ["Figma", "Tailwind CSS", "User Psychology"],
      students: "8,500+",
      rating: 4.8,
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      bio: "Creative lead at DevTrack, specializing in crafting intuitive and delightful user experiences.",
      linkedin: "#",
      twitter: "#"
    },
    {
      id: "m3",
      name: "Rahul Verma",
      role: "Senior DevOps & Cloud Expert",
      expertise: ["Docker", "AWS", "Kubernetes"],
      students: "12,200+",
      rating: 4.7,
      image: "https://randomuser.me/api/portraits/men/50.jpg",
      bio: "A cloud-native enthusiast focused on building robust and scalable infrastructure.",
      linkedin: "#",
      twitter: "#"
    }
    // ... add more mentors as needed
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col font-sans">
      <Navbar />

      {/* --- HERO SECTION (Navbar Matching) --- */}
      <div className="bg-[#0f172a] text-white pt-20 pb-32 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 px-4 py-1.5 rounded-full mb-6">
            <FiAward className="text-blue-400" />
            <span className="text-blue-400 text-xs font-bold uppercase tracking-widest">Industry Experts</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">
            Learn from the <span className="text-blue-500">Top 1%.</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto font-medium">
            Our mentors don't just teach; they build. Get direct access to engineers from 
            top tech giants and innovative startups.
          </p>
        </div>
      </div>

      {/* --- MENTORS GRID SECTION --- */}
      <main className="flex-grow -mt-20 px-6 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {devtrackMentors.map((mentor) => (
              <div
                key={mentor.id}
                className="group bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-xl hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 relative overflow-hidden"
              >
                {/* Decorative Element */}
                <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity">
                  <FiArrowUpRight className="text-blue-600 text-2xl" />
                </div>

                <div className="flex flex-col items-center text-center">
                  {/* Photo with Ring Effect */}
                  <div className="relative mb-6">
                    <div className="h-32 w-32 rounded-[2rem] overflow-hidden rotate-3 group-hover:rotate-0 transition-transform duration-500 border-4 border-white shadow-lg">
                      <img
                        src={mentor.image}
                        alt={mentor.name}
                        className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-500"
                      />
                    </div>
                    <div className="absolute -bottom-2 -right-2 bg-yellow-400 text-black text-xs font-black px-3 py-1 rounded-xl shadow-lg flex items-center gap-1">
                      <FiStar className="fill-black" /> {mentor.rating}
                    </div>
                  </div>

                  {/* Name & Title */}
                  <div className="mb-4">
                    <h3 className="text-2xl font-black text-gray-900 group-hover:text-blue-600 transition-colors">
                      {mentor.name}
                    </h3>
                    <p className="text-blue-600 text-xs font-black uppercase tracking-widest mt-1">
                      {mentor.role}
                    </p>
                  </div>

                  {/* Skills/Expertise */}
                  <div className="flex flex-wrap justify-center gap-2 mb-6">
                    {mentor.expertise.map((skill, i) => (
                      <span key={i} className="text-[10px] font-bold bg-gray-50 text-gray-400 px-3 py-1.5 rounded-full border border-gray-100 group-hover:border-blue-100 group-hover:text-blue-600 transition-all">
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Bio */}
                  <p className="text-gray-500 text-sm leading-relaxed mb-8 line-clamp-2 px-2">
                    {mentor.bio}
                  </p>

                  {/* Stats Row */}
                  <div className="grid grid-cols-2 w-full bg-gray-50 rounded-3xl p-4 gap-4">
                    <div className="flex flex-col items-center border-r border-gray-200">
                      <span className="text-lg font-black text-gray-900">{mentor.students}</span>
                      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">Mentees</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="flex gap-4">
                        <a href={mentor.linkedin} className="text-gray-400 hover:text-blue-600 transition-colors">
                          <FiLinkedin size={18} />
                        </a>
                        <a href={mentor.twitter} className="text-gray-400 hover:text-blue-400 transition-colors">
                          <FiTwitter size={18} />
                        </a>
                      </div>
                      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter mt-1">Connect</span>
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