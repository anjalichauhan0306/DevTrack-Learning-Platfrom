import React, { useState, useEffect, useRef } from "react";
import {
  RiMicAiFill,
  RiSearchLine,
  RiCompass3Line,
  RiArrowLeftLine,
} from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import start from "../assets/start.mp3";
import { searchCourses } from "../api/courseApi";

const SearchWithAI = () => {
  const startSound = new Audio(start);
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const recognitionRef = useRef(null);
  const [listening, setListening] = useState(false);

  function speak(message) {
    const utterance = new SpeechSynthesisUtterance(message);
    utterance.lang = "en-IN";
    window.speechSynthesis.speak(utterance);
  }

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = "en-IN";
      recognitionRef.current = recognition;
    }
  }, []);

  const handleSearch = () => {
    const recognition = recognitionRef.current;
    if (!recognition) {
      toast.error("Speech recognition is not supported.");
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
      if (err.error !== "no-speech") toast.error("Speech Error: " + err.error);
    };

    recognition.onend = () => setListening(false);
  };

  const handleRecommendation = async (query) => {
    if (!query) return;
    try {
      const result = await searchCourses(
        { input: query },
      );
      setRecommendations(result.data);
      if (result.data.length > 0) {
        speak(`I found ${result.data.length} courses for you.`);
      } else {
        speak("No courses found for your search.");
      }
    } catch (error) {
      toast.error("Search failed.");
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-purple-500/30 overflow-x-hidden">
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-900/10 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-16">
          <button
            onClick={() => navigate(-1)}
            className="group flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <RiArrowLeftLine className="text-xl group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium">Back</span>
          </button>

          <div className="flex items-center gap-3">
            <div
              className={`p-2 rounded-xl bg-linear-to-br from-purple-500 to-pink-500 shadow-[0_0_20px_rgba(168,85,247,0.4)] ${listening ? "animate-pulse" : ""}`}
            >
              <RiMicAiFill className="text-white text-xl" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-linear-to-r from-white to-gray-500">
              AI Vision
            </h1>
          </div>
          <div className="w-10" />
        </div>

        <div className="flex flex-col items-center mb-20">
          <div className="w-full max-w-3xl relative group">
            <div
              className={`absolute -inset-1 bg-linear-to-r from-purple-600 to-pink-600 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000 ${listening ? "opacity-70 animate-pulse" : ""}`}
            ></div>

            <div className="relative flex items-center bg-black/40 backdrop-blur-2xl border border-white/10 rounded-2xl p-2 shadow-2xl">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" &&
                  input.trim() &&
                  handleRecommendation(input)
                }
                placeholder={
                  listening
                    ? "Listening to your voice..."
                    : "What do you want to learn today?"
                }
                className="grow bg-transparent px-6 py-4 text-lg outline-none placeholder:text-gray-500 font-light"
              />

              <div className="flex items-center gap-2 pr-2">
                <button
                  onClick={() => handleRecommendation(input)}
                  className="p-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-all"
                >
                  <RiSearchLine size={24} />
                </button>
                <button
                  onClick={handleSearch}
                  className={`relative overflow-hidden group p-4 rounded-xl transition-all active:scale-95 ${listening
                      ? "bg-red-500 shadow-[0_0_20px_rgba(239,68,68,0.5)]"
                      : "bg-white text-black"
                    }`}
                >
                  <RiMicAiFill
                    size={24}
                    className={listening ? "animate-bounce" : ""}
                  />
                </button>
              </div>
            </div>
          </div>

          {!listening && recommendations.length === 0 && (
            <div className="mt-8 flex flex-wrap justify-center gap-3 animate-fade-in">
              {["Full Stack Web", "Machine Learning", "Graphic Design"].map(
                (tag) => (
                  <button
                    key={tag}
                    onClick={() => {
                      setInput(tag);
                      handleRecommendation(tag);
                    }}
                    className="px-5 py-2 rounded-full border border-white/10 bg-white/5 text-xs font-medium text-gray-400 hover:border-purple-500/50 hover:text-white hover:bg-purple-500/10 transition-all"
                  >
                    {tag}
                  </button>
                ),
              )}
            </div>
          )}
        </div>

        <div className="min-h-100">
          {listening ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="flex gap-1 items-end h-12 mb-6">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="w-1.5 bg-purple-500 rounded-full animate-[quiet_1.2s_ease-in-out_infinite]"
                    style={{
                      animationDelay: `${i * 0.1}s`,
                      height: `${Math.random() * 100}%`,
                    }}
                  ></div>
                ))}
              </div>
              <p className="text-purple-400 font-medium tracking-[0.2em] uppercase text-xs">
                Analyzing Audio Signal
              </p>
            </div>
          ) : recommendations.length > 0 ? (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="flex items-center gap-4 mb-10">
                <RiCompass3Line className="text-purple-500 text-3xl" />
                <h2 className="text-2xl font-semibold tracking-tight">
                  Personalized Recommendations
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {recommendations.map((course, index) => (
                  <div
                    key={index}
                    onClick={() => navigate(`/viewlecture/${course._id}`)}
                    className="group relative bg-[#0f0f0f] border border-white/5 rounded-[2.5rem] overflow-hidden hover:border-purple-500/30 transition-all duration-500"
                  >
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={
                          course.thumbnail ||
                          "https://via.placeholder.com/400x225"
                        }
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-2"
                        alt={course.title}
                      />
                    </div>

                    <div className="p-8">
                      <div className="flex justify-between items-start mb-4">
                        <span className="px-3 py-1 rounded-lg bg-purple-500/10 text-purple-400 text-[10px] font-bold uppercase tracking-wider">
                          {course.category}
                        </span>
                        <span className="text-xl font-bold">
                          ₹{course.Price || "Free"}
                        </span>
                      </div>

                      <h3 className="text-lg font-bold mb-3 line-clamp-1 group-hover:text-purple-400 transition-colors">
                        {course.title}
                      </h3>
                      <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed mb-6">
                        {course.description ||
                          `Master ${course.category} with professional training.`}
                      </p>

                      <div className="pt-4 border-t border-white/5 flex items-center justify-between opacity-60 group-hover:opacity-100 transition-opacity">
                        <span className="text-xs font-semibold">
                          VIEW DETAILS
                        </span>
                        <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-purple-500 group-hover:text-white transition-all">
                          →
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6">
                <RiMicAiFill className="text-3xl text-gray-700" />
              </div>
              <h3 className="text-xl text-gray-400 font-light">
                Tap the mic to start your journey
              </h3>
            </div>
          )}
        </div>
      </div>
      <style>{`
        @keyframes quiet {
          0%, 100% { height: 10px; }
          50% { height: 40px; }
        }
      `}</style>
    </div>
  );
};

export default SearchWithAI;
