import React, { useState } from "react";
import {
  Mail,
  Github,
  Linkedin,
  Send,
  ArrowLeft,
  Copy,
  CheckCircle2,
  MapPin,
  Code2,
  Sparkles,
} from "lucide-react";
import axios from "axios";
import { serverURL } from "../App";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom"; // Navigation ke liye

const ContactPage = () => {
  const navigate = useNavigate(); // Hook initialize kiya
  const [copied, setCopied] = useState(false);
  const [loading, setloading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const copyEmail = () => {
    navigator.clipboard.writeText("aaruba.dev@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setloading(true);
    try {
      await axios.post(serverURL + "/api/user/contact", formData, { withCredentials: true });
      alert("Message sent successfully 🚀");
      setFormData({ name: "", email: "", message: "" });
      setloading(false);
    } catch (error) {
      console.log(error);
      setloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#e4e4e7] flex items-center justify-center p-4 font-sans selection:bg-indigo-500/30 overflow-x-hidden">
      
      {/* --- BACK BUTTON --- */}
      <button 
        onClick={() => navigate(-1)} 
        className="fixed top-8 left-8 z-50 flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-all group backdrop-blur-md"
      >
        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
        <span className="text-xs font-bold uppercase tracking-widest">Go Back</span>
      </button>

      {/* Background Subtle Grid - Fixed Classes */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

      <div className="max-w-6xl w-full grid lg:grid-cols-12 gap-6 relative z-10">
        
        {/* Left Column: Profile Card */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#0a0a0a] border border-white/5 rounded-[2.5rem] p-10 flex flex-col h-full shadow-2xl">
            <div className="flex-1 space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-bold uppercase tracking-widest">
                <Sparkles size={12} /> Open for Opportunities
              </div>

              <div>
                <h1 className="text-5xl font-black tracking-tighter text-white mb-2">
                  Anjali <br /> Chauhan
                </h1>
                <h2 className="text-indigo-400 font-mono text-sm tracking-widest uppercase">
                  Full Stack Developer
                </h2>
              </div>

              <p className="text-gray-400 leading-relaxed text-sm">
                Focused on building scalable MERN applications like{" "}
                <span className="text-white font-medium italic">DevTrack</span>.
                I specialize in turning complex logic into elegant, performant
                digital experiences.
              </p>

              <div className="grid grid-cols-1 gap-3">
                <div
                  onClick={copyEmail}
                  className="group cursor-pointer flex items-center gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-indigo-500/30 transition-all"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-gray-400 group-hover:text-white transition-colors">
                    <Mail size={18} />
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <p className="text-[10px] font-bold text-gray-600 uppercase">Email</p>
                    <p className="text-sm font-medium truncate">aaruba.dev@gmail.com</p>
                  </div>
                  {copied ? (
                    <CheckCircle2 size={16} className="text-green-500" />
                  ) : (
                    <Copy size={16} className="text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity" />
                  )}
                </div>

                <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-gray-400">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-gray-600 uppercase">Location</p>
                    <p className="text-sm font-medium">India • Remote</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 flex gap-3">
              <a href="https://github.com/anjalichauhan0306" className="flex-1 h-14 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center hover:bg-white hover:text-black transition-all group">
                <Github size={20} />
              </a>
              <a href="https://www.linkedin.com/in/anjali-chauhan-22b93430a/" className="flex-1 h-14 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center hover:bg-[#0077b5] hover:text-white transition-all group">
                <Linkedin size={20} />
              </a>
              <a href="#" className="flex-1 h-14 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-all group">
                <Code2 size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Form */}
        <div className="lg:col-span-7">
          <div className="bg-[#0a0a0a] border border-white/5 rounded-[2.5rem] p-10 lg:p-14 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/5 blur-[100px] -z-10"></div>
            <div className="mb-10">
              <h3 className="text-2xl font-bold text-white mb-2 font-mono tracking-tight">Drop a Message</h3>
              <p className="text-gray-500 text-sm">Whether it's a project inquiry or just a tech talk.</p>
            </div>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-600 uppercase tracking-widest ml-1">Your Name</label>
                  <input
                    type="text"
                    name="name"
                    onChange={handleChange}
                    value={formData.name}
                    placeholder="John Doe"
                    className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-4 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-600 uppercase tracking-widest ml-1">Email Address</label>
                  <input
                    name="email"
                    onChange={handleChange}
                    value={formData.email}
                    type="email"
                    placeholder="john@company.com"
                    className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-4 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all outline-none"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-600 uppercase tracking-widest ml-1">Project Message</label>
                <textarea
                  rows="5"
                  name="message"
                  onChange={handleChange}
                  value={formData.message}
                  placeholder="Tell me what you're working on..."
                  className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-4 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all outline-none resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-white text-black font-black py-5 rounded-2xl hover:bg-indigo-600 hover:text-white transition-all shadow-xl shadow-white/5 flex items-center justify-center gap-3 group active:scale-[0.98]"
                onClick={handleSubmit}
                disabled={loading}
              >
                <span className="uppercase text-xs tracking-widest font-black">
                  {loading ? <ClipLoader size={20} color="#000000" /> : "Submit Inquiry"}
                </span>
                {!loading && <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
              </button>
            </form>

            <div className="mt-10 flex items-center justify-between border-t border-white/5 pt-8 text-[10px] font-bold text-gray-700 uppercase tracking-[0.2em]">
              <span>Est. 2026</span>
              <span className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></div> Local Time IST
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;