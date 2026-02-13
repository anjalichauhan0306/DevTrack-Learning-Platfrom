import React from 'react';
import { FiPlus, FiMinus } from "react-icons/fi";

const FAQ = () => {
    const faqs = [
        {
            question: "What is DevTrack LMS?",
            answer: "DevTrack is a streamlined Learning Management System designed to simplify education and help developers track their technical growth in real-time."
        },
        {
            question: "Can I download my progress certificates?",
            answer: "Yes! Upon course completion, you can download verified certificates for React, GitHub, and Database tracks to showcase on your portfolio."
        },
        {
            question: "How do I connect with instructors?",
            answer: "DevTrack features a direct connection module where students can get feedback and resolve queries with mentors seamlessly."
        },
        {
            question: "Is this platform suitable for beginners?",
            answer: "Absolutely. The UI is built to be intuitive, ensuring that new developers can focus on learning without any technical distractions."
        }
    ];

    return (
        <section className="w-full py-16 px-6 bg-white">
            <div className="max-w-3xl mx-auto"> {/* Max-width reduced to 3xl for compact look */}
                
                {/* Header - Scaled down */}
                <div className="text-center mb-10">
                    <h2 className="text-blue-600 font-bold tracking-widest uppercase text-[10px] mb-2">Support</h2>
                    <h3 className="text-3xl font-bold text-slate-900 tracking-tight">
                        Frequently Asked Questions
                    </h3>
                </div>

                {/* FAQ List - More compact spacing */}
                <div className="space-y-3">
                    {faqs.map((faq, index) => (
                        <div 
                            key={index} 
                            className="group bg-[#f8fafc] border border-slate-100 rounded-2xl transition-all duration-300 hover:bg-white hover:shadow-sm hover:border-blue-200 overflow-hidden"
                        >
                            {/* Hover Reveal container */}
                            <div className="p-5 md:p-6 cursor-pointer">
                                <div className="flex justify-between items-center gap-4">
                                    <h4 className="text-base md:text-lg font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">
                                        {faq.question}
                                    </h4>
                                    
                                    {/* Icon - Smaller & Sleeker */}
                                    <div className="flex-shrink-0 w-8 h-8 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
                                        <FiPlus className="group-hover:hidden w-4 h-4" />
                                        <FiMinus className="hidden group-hover:block w-4 h-4" />
                                    </div>
                                </div>

                                {/* Answer revealed on Hover */}
                                <div className="max-h-0 opacity-0 group-hover:max-h-32 group-hover:opacity-100 transition-all duration-500 ease-in-out">
                                    <div className="mt-4 pt-4 border-t border-slate-200/50">
                                        <p className="text-slate-500 leading-relaxed text-sm md:text-base">
                                            {faq.answer}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;