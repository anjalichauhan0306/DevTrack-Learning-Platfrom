import React, { useState } from 'react';
import { Mail, Github, Linkedin, FileText, Send, User, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';

const ContactPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    alert("Message sent! I'll get back to you soon.");
  };

  return (
    <div className="min-h-screen bg-[#F3F4F6] flex items-center justify-center p-6 font-sans">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-5xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[600px]"
      >
        
        {/* Left Section: Branding & Info */}
        <div className="md:w-[40%] bg-[#2D3E72] p-10 text-white flex flex-col justify-between relative overflow-hidden">
          {/* Decorative Circles for Professional Look */}
          <div className="absolute top-[-10%] left-[-10%] w-40 h-40 bg-white/5 rounded-full" />
          
          <div className="relative z-10">
            <h2 className="text-4xl font-extrabold tracking-tight mb-2">Aaruba Chauhan</h2>
            <p className="text-blue-200 text-lg font-medium mb-8">MERN Stack & Java Developer</p>
            
            <p className="text-blue-100/80 leading-relaxed mb-10 text-sm">
              I built <span className="text-white font-semibold">DevTrack</span> to bridge the gap between learning and building. 
              Looking for a developer who owns the product? Let’s connect.
            </p>

            <div className="space-y-6">
              <a href="mailto:aaruba.dev@email.com" className="flex items-center gap-4 group transition-all">
                <div className="p-2 bg-white/10 rounded-lg group-hover:bg-white/20">
                  <Mail size={20} />
                </div>
                <span className="group-hover:translate-x-1 transition-transform">aaruba.dev@email.com</span>
              </a>
              <a href="#" className="flex items-center gap-4 group transition-all">
                <div className="p-2 bg-white/10 rounded-lg group-hover:bg-white/20">
                  <Linkedin size={20} />
                </div>
                <span className="group-hover:translate-x-1 transition-transform">linkedin.com/in/aaruba</span>
              </a>
              <a href="#" className="flex items-center gap-4 group transition-all">
                <div className="p-2 bg-white/10 rounded-lg group-hover:bg-white/20">
                  <Github size={20} />
                </div>
                <span className="group-hover:translate-x-1 transition-transform">github.com/aaruba-dev</span>
              </a>
            </div>
          </div>

          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="relative z-10 mt-12 flex items-center justify-center gap-3 bg-white text-[#2D3E72] font-bold py-4 rounded-xl shadow-lg hover:bg-blue-50 transition-all"
          >
            <FileText size={20} /> Download My Resume
          </motion.button>
        </div>

        {/* Right Section: Modern Form */}
        <div className="md:w-[60%] p-12 flex flex-col justify-center">
          <div className="mb-8">
            <h3 className="text-3xl font-bold text-gray-800">Send a Message</h3>
            <p className="text-gray-500 mt-2 text-sm">Got a project or a job opportunity? Drop a line below.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Full Name</label>
              <div className="relative mt-1">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="text" 
                  required
                  placeholder="John Doe"
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-[#2D3E72] focus:bg-white outline-none transition-all text-gray-700"
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
            </div>

            <div className="relative">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Email Address</label>
              <div className="relative mt-1">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="email" 
                  required
                  placeholder="email@example.com"
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-[#2D3E72] focus:bg-white outline-none transition-all text-gray-700"
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>

            <div className="relative">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Your Message</label>
              <div className="relative mt-1">
                <MessageSquare className="absolute left-4 top-5 text-gray-400" size={18} />
                <textarea 
                  rows="4" 
                  required
                  placeholder="Hey Aaruba, I'd like to talk about..."
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-[#2D3E72] focus:bg-white outline-none transition-all text-gray-700 resize-none"
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                ></textarea>
              </div>
            </div>

            <motion.button 
              whileHover={{ y: -2 }}
              className="w-full bg-[#2D3E72] text-white font-bold py-4 rounded-xl flex items-center justify-center gap-3 shadow-xl hover:bg-[#1e2a4d] transition-all"
            >
              <Send size={18} /> Send Message
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default ContactPage;