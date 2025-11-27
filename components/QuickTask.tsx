import React, { useState, useEffect } from 'react';
import { getFastSuggestion } from '../services/geminiService';

const QuickTask: React.FC = () => {
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  // Debounce logic for fast AI suggestions
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (input.length > 3) {
        setLoading(true);
        const result = await getFastSuggestion(input);
        if (result) {
          setSuggestions(result.split('|'));
        }
        setLoading(false);
      } else {
        setSuggestions([]);
      }
    }, 500); // 500ms debounce

    return () => clearTimeout(timer);
  }, [input]);

  return (
    <div className="w-full max-w-2xl mx-auto -mt-6 relative z-10 px-4">
      <div className="bg-white rounded-xl shadow-xl p-2 border border-gray-100">
        <div className="flex items-center bg-gray-50 rounded-lg px-4 py-3">
          <span className="material-symbols-outlined text-primary text-xl mr-3">
            bolt
          </span>
          <input
            type="text"
            className="bg-transparent flex-grow outline-none text-gray-700 placeholder-gray-400 font-medium"
            placeholder="What do you need done today? (e.g., 'hungry', 'dirty house')"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
           {loading && (
             <div className="animate-spin h-5 w-5 border-2 border-primary border-t-transparent rounded-full"></div>
           )}
        </div>
        
        {suggestions.length > 0 && (
           <div className="mt-2 border-t border-gray-100 pt-2 px-2">
             <p className="text-xs text-gray-400 mb-2 uppercase tracking-wider font-semibold">Quick Suggestions</p>
             <div className="flex flex-wrap gap-2">
               {suggestions.map((s, i) => (
                 <button 
                   key={i}
                   className="px-3 py-1 bg-purple-50 text-primary text-sm rounded-full hover:bg-purple-100 transition-colors border border-purple-100"
                   onClick={() => setInput(s)}
                 >
                   {s}
                 </button>
               ))}
             </div>
           </div>
        )}
      </div>
    </div>
  );
};

export default QuickTask;