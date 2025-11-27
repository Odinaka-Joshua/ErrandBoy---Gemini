import React, { useState } from 'react';
import { generateErrandVisual } from '../services/geminiService';
import { ImageSize } from '../types';

interface VisualizerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const VisualizerModal: React.FC<VisualizerModalProps> = ({ isOpen, onClose }) => {
  const [prompt, setPrompt] = useState('');
  const [size, setSize] = useState<ImageSize>('1K');
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setError(null);
    setImage(null);

    try {
      const result = await generateErrandVisual(prompt, size);
      if (result) {
        setImage(result);
      } else {
        setError("Could not generate image. Please try again.");
      }
    } catch (err) {
      setError("Failed to generate. Ensure API key is set for 3 Pro Image.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
        <div className="bg-gradient-to-r from-primary to-purple-800 p-6 relative">
          <button 
            onClick={onClose} 
            className="absolute top-4 right-4 text-white/70 hover:text-white"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
          <h2 className="text-2xl font-serif font-bold text-white mb-1">Visualizer</h2>
          <p className="text-purple-200 text-sm">Visualize your custom errand or meal request.</p>
        </div>

        <div className="p-6 overflow-y-auto">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Describe your request</label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g., A perfectly arranged fruit basket with pineapples and watermelons..."
                className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-primary/50 outline-none text-sm min-h-[100px]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Quality / Size</label>
              <div className="flex bg-gray-100 rounded-lg p-1 w-fit">
                {(['1K', '2K', '4K'] as ImageSize[]).map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                      size === s 
                      ? 'bg-white text-primary shadow-sm' 
                      : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleGenerate}
              disabled={loading || !prompt}
              className="w-full bg-secondary hover:bg-amber-600 text-white font-bold py-3 rounded-xl shadow-lg shadow-amber-500/20 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
                  <span>Generating...</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined">auto_awesome</span>
                  <span>Generate Visual</span>
                </>
              )}
            </button>
            
            {error && (
              <p className="text-red-500 text-sm text-center bg-red-50 p-2 rounded-lg">{error}</p>
            )}

            {image && (
              <div className="mt-4 rounded-xl overflow-hidden border border-gray-200 shadow-inner bg-gray-50">
                <img src={image} alt="Generated result" className="w-full h-auto object-cover" />
                <div className="p-2 flex justify-between items-center bg-white border-t border-gray-100">
                    <span className="text-xs text-gray-500 font-medium">{size} Output</span>
                    <a href={image} download="errand-visual.png" className="text-primary text-xs font-bold hover:underline">Download</a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisualizerModal;