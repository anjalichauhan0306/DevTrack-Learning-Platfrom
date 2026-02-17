import React, { useState, useEffect , useRef} from 'react';
import ai from '../assets/ai.png';
import { RiMicAiFill } from 'react-icons/ri';
import { FaArrowLeftLong } from 'react-icons/fa6';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import axios from 'axios';
import { serverURL } from '../App';
import start from '../assets/start.mp3';

const SearchWithAI = () => {
    const startSound = new Audio(start);
    const navigate = useNavigate();
    const [input, setInput] = useState("");
    const [recommendations, setRecommendations] = useState([]);
    const [listening, setListening] = useState(false);

    function speak(message) {
        const utterance = new SpeechSynthesisUtterance(message);
        utterance.lang = 'en-IN';
        window.speechSynthesis.speak(utterance);
    }

    const SpeechRecognition = window.SpeechRecognitionEvent || window.webkitSpeechRecognition;
    let recognition = null;
    if (SpeechRecognition) {
        recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-IN';
    }

    const handleSearch = () => {
        if (!recognition) {
            toast.error("Speech recognition is not supported in this browser.");
            return;
        }

        if (listening) {
            recognition.stop();
            return;
        }

        setListening(true);
        startSound.play();
        recognition.start();

        recognition.onresult = async (e) => {
            const transcript = e.results[0][0].transcript.trim();
            setInput(transcript);
            setListening(false);
            await handleRecommendation(transcript);
        };

        recognition.onerror = (err) => {
            setListening(false);
            if(err.error !== 'no-speech') toast.error("Speech Error: " + err.error);
        };

        recognition.onend = () => {
            setListening(false);
        };
    };

    const handleRecommendation = async (query) => {
        if (!query) return;
        try {
            const result = await axios.post(`${serverURL}/api/course/search`, { input: query }, { withCredentials: true });
            setRecommendations(result.data);
            if (result.data.length) {
                speak(`I found ${result.data.length} courses for you.`);
            } else {
                speak("No courses found for your search.");
            }
        } catch (error) {
            console.error(error);
            toast.error("Search failed. Please try again.");
        }
    };

    return (
        <div className='min-h-screen bg-linear-to-br from-gray-900 via-black to-gray-900 flex flex-col items-center px-4 py-8'>
            
            {/* Search Container */}
            <div className='bg-white shadow-2xl rounded-[2.5rem] p-6 sm:p-10 w-full max-w-2xl mt-10 transition-all'>
                
                {/* Header */}
                <div className='flex items-center justify-between mb-8'>
                    <button onClick={() => navigate(-1)} className='p-2 hover:bg-gray-100 rounded-full transition-all'>
                        <FaArrowLeftLong className='text-gray-700 w-5 h-5'/>
                    </button>
                    <div className='flex items-center gap-2'>
                        <img src={ai} alt='AI' className={`w-8 h-8 ${listening ? 'animate-spin' : ''}`} />
                        <h1 className='text-xl sm:text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-gray-700 to-black'>
                            AI Assistant
                        </h1>
                    </div>
                    <div className='w-8' />
                </div>

                {/* Input Bar */}
                <div className={`relative flex items-center bg-gray-100 rounded-2xl p-2 border-2 transition-all ${listening ? 'border-purple-400 ring-4 ring-purple-100' : 'border-transparent'}`}>
                    <input 
                        type="text" 
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleRecommendation(input)}
                        className='grow px-4 py-3 bg-transparent text-gray-800 placeholder-gray-400 focus:outline-none' 
                        placeholder={listening ? "Listening..." : "Ask me anything..."}
                    />

                    <div className='flex items-center gap-2'>
                        <button onClick={() => handleRecommendation(input)} className='p-2 bg-white rounded-xl shadow-sm hover:scale-105 transition-transform'>
                            <img src={ai} alt="Search" className='w-7 h-7' />
                        </button>
                        <button 
                            onClick={handleSearch}
                            className={`${listening ? 'bg-red-500 animate-pulse' : 'bg-gradient-to-tr from-purple-500 to-pink-500'} text-white rounded-xl w-11 h-11 flex items-center justify-center shadow-lg transition-all active:scale-90`}
                        >
                            <RiMicAiFill className="w-6 h-6" />
                        </button>
                    </div>
                </div>

                {/* Suggestions */}
                {!listening && recommendations.length === 0 && (
                    <div className='mt-8'>
                        <p className='text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center mb-4'>Recommended Topics</p>
                        <div className='flex flex-wrap gap-2 justify-center'>
                            {["Web Development", "Data Science", "UI/UX Design"].map((text) => (
                                <button key={text} onClick={() => { setInput(text); handleRecommendation(text); }} className='text-xs font-semibold bg-gray-50 hover:bg-purple-50 hover:text-purple-600 text-gray-500 px-4 py-2 rounded-full border border-gray-100 transition-all'>
                                    {text}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Results Section */}
            <div className='w-full max-w-6xl mt-12 mb-20'>
                {listening ? (
                    <div className="flex flex-col items-center justify-center space-y-4">
                         <div className="flex space-x-2">
                            <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                            <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                            <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce"></div>
                        </div>
                        <p className="text-gray-400 font-medium animate-pulse text-lg tracking-wide">Processing your voice...</p>
                    </div>
                ) : recommendations.length > 0 ? (
                    <div>
                        <h2 className='text-white text-2xl font-bold mb-8 px-4 border-l-4 border-purple-500 ml-4'>Top Results</h2>
                        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4'>
                            {recommendations.map((course, index) => (
                                <div 
                                    key={index} 
                                    onClick={() => navigate(`/viewlecture/${course._id}`)}
                                    className='bg-white/10 backdrop-blur-xl border border-white/10 p-6 rounded-[2rem] hover:bg-white/15 transition-all cursor-pointer group hover:-translate-y-2'
                                >
                                    <div className='w-full h-44 bg-gray-800 rounded-2xl mb-4 overflow-hidden relative'>
                                        <img src={course.thumbnail || 'https://via.placeholder.com/400x225'} alt={course.title} className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-500' />
                                        <div className='absolute top-3 right-3 bg-purple-600 text-[10px] font-bold text-white px-3 py-1 rounded-full uppercase'>
                                            {course.category}
                                        </div>
                                    </div>
                                    <h3 className='text-white text-xl font-bold line-clamp-1 group-hover:text-purple-400 transition-colors'>{course.title}</h3>
                                    <p className='text-gray-400 text-sm mt-2 line-clamp-2 leading-relaxed'>{course.description || "Learn the fundamentals of " + course.category + " with industry experts."}</p>
                                    <div className='mt-6 flex justify-between items-center border-t border-white/5 pt-4'>
                                        <span className='text-white font-black text-xl'>₹{course.Price || 'Free'}</span>
                                        <span className='text-purple-400 text-xs font-bold flex items-center gap-1'>Explore Details →</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className='text-center opacity-40'>
                        <h1 className='text-white text-3xl font-light tracking-tighter'>Ready to learn something new?</h1>
                    </div>
                )}
            </div>
        </div>
    );
}

export default SearchWithAI;