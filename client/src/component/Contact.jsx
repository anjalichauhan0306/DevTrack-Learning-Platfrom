import React from 'react';

const ContactSection = () => {
    return (
        <section className="bg-[#0a0f1c] py-20 px-6">
            <div className="max-w-4xl mx-auto bg-[#0f172a] rounded-[2.5rem] p-10 border border-white/5 shadow-2xl">
                <div className="text-center mb-10">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Get in Touch</h2>
                    <p className="text-slate-400">Have a question about DevTrack? Reach out to me directly.</p>
                </div>

                <div className="grid md:grid-cols-2 gap-10 items-start">
                    {/* Developer Info Card */}
                    <div className="space-y-6">
                        <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                            <h3 className="text-blue-400 font-bold text-sm uppercase tracking-widest mb-2">Developer</h3>
                            <p className="text-2xl font-bold text-white mb-2">Anjliben</p>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                I'm building DevTrack to bridge the gap between students and instructors. 
                                certified in React, GitHub, and Oracle Databases.
                            </p>
                        </div>
                        
                        <div className="space-y-4">
                            <div className="flex items-center gap-4 text-slate-300">
                                <div className="w-10 h-10 rounded-full bg-blue-600/20 flex items-center justify-center text-blue-500">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                                </div>
                                <span className="text-sm">anjliben.dev@example.com</span>
                            </div>
                        </div>
                    </div>

                    {/* Simple Contact Form */}
                    <form className="space-y-4">
                        <input 
                            type="text" 
                            placeholder="Your Name" 
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                        />
                        <input 
                            type="email" 
                            placeholder="Your Email" 
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                        />
                        <textarea 
                            placeholder="Your Message" 
                            rows="4"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                        ></textarea>
                        <button className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-lg shadow-blue-900/20 transition-all active:scale-95">
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;