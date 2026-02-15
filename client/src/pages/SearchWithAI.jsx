import React, { useState, useEffect } from 'react';
import { Search, Sparkles, Send, Loader2, Mic, MicOff, Globe, Zap } from 'lucide-react';

const SearchWithAi = () => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [result, setResult] = useState('');

  // Speech Recognition Setup
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = SpeechRecognition ? new SpeechRecognition() : null;

  const startListening = () => {
    if (!recognition) return alert("Browser voice support nahi karta!");
    setIsListening(true);
    recognition.start();
  };

  if (recognition) {
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setQuery(transcript);
      setIsListening(false);
    };
    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);
  }

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    
    // API Mockup
    setTimeout(() => {
      setResult(`Maine aapke sawal "${query}" ka vishleshan kiya hai. Premium UI experience ke liye yahan formatting aur clear data display hoga.`);
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 selection:bg-blue-500/30 font-sans antialiased">
      {/* Background Glows */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full"></div>
      </div>

      <main className="max-w-4xl mx-auto px-6 pt-24 pb-12">
        {/* Hero Section */}
        <div className="text-center mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-4">
            <Zap size={14} /> <span>Powered by Next-Gen AI</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-b from-white to-slate-400 bg-clip-text text-transparent">
            How can I help you?
          </h1>
        </div>

        {/* Premium Search Box */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-[24px] blur opacity-25 group-focus-within:opacity-50 transition duration-1000"></div>
          
          <form 
            onSubmit={handleSearch}
            className="relative flex items-center bg-[#1e293b]/80 backdrop-blur-xl border border-slate-700/50 rounded-[22px] p-2 shadow-2xl"
          >
            <button 
              type="button"
              onClick={startListening}
              className={`p-3 rounded-xl transition-all ${isListening ? 'bg-red-500/20 text-red-400 animate-pulse' : 'hover:bg-slate-700/50 text-slate-400'}`}
            >
              {isListening ? <MicOff size={22} /> : <Mic size={22} />}
            </button>

            <input
              type="text"
              className="flex-1 bg-transparent border-none outline-none px-4 py-3 text-lg text-white placeholder:text-slate-500"
              placeholder="Ask anything..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />

            <button 
              type="submit"
              disabled={loading || !query}
              className="bg-white hover:bg-slate-200 text-black px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : <><span className="hidden md:inline">Search</span> <Send size={18} /></>}
            </button>
          </form>
        </div>

        {/* Suggestion Chips */}
        {!result && (
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            {['Write a poem', 'Explain Quantum Physics', 'Travel ideas', 'Code a button'].map((hint) => (
              <button 
                key={hint}
                onClick={() => setQuery(hint)}
                className="px-4 py-2 rounded-full border border-slate-700 bg-slate-800/40 hover:bg-slate-700/60 text-sm text-slate-400 transition-colors"
              >
                {hint}
              </button>
            ))}
          </div>
        )}

        {/* Result Area */}
        {result && (
          <div className="mt-12 p-8 rounded-[24px] bg-slate-800/30 border border-slate-700/50 backdrop-blur-sm animate-in fade-in zoom-in-95 duration-500">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
                <Sparkles size={18} className="text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white">AI Analysis</h3>
            </div>
            <div className="prose prose-invert max-w-none text-slate-300 leading-relaxed text-lg">
              {loading ? (
                <div className="space-y-3">
                  <div className="h-4 bg-slate-700 rounded w-3/4 animate-pulse"></div>
                  <div className="h-4 bg-slate-700 rounded w-full animate-pulse"></div>
                  <div className="h-4 bg-slate-700 rounded w-5/6 animate-pulse"></div>
                </div>
              ) : (
                <p>{result}</p>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default SearchWithAi;