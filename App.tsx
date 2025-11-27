import React, { useState } from 'react';
import Navbar from './components/Navbar';
import QuickTask from './components/QuickTask';
import ChatBot from './components/ChatBot';
import VisualizerModal from './components/VisualizerModal';
import ProfileModal from './components/ProfileModal';
import { CATEGORIES, ERRANDERS } from './constants';

const App: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isVisualizerOpen, setIsVisualizerOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);

  const toggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(fid => fid !== id) : [...prev, id]
    );
  };
  
  const filteredErranders = selectedCategory 
    ? ERRANDERS.filter(e => {
        if (selectedCategory === 'market') return e.specialty.includes('Market');
        if (selectedCategory === 'cleaning') return e.specialty.includes('Cleaning') || e.specialty.includes('Laundry');
        if (selectedCategory === 'moving') return false; 
        if (selectedCategory === 'projects') return e.specialty.includes('Tech');
        return true;
    })
    : ERRANDERS;

  return (
    <div className="min-h-screen bg-surface font-sans pb-20">
      {/* Load Material Symbols */}
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />

      <Navbar 
        onOpenChat={() => setIsChatOpen(true)} 
        onOpenVisualizer={() => setIsVisualizerOpen(true)}
        onOpenProfile={() => setIsProfileOpen(true)}
      />

      {/* Hero Section */}
      <div className="relative bg-primary pt-12 pb-24 px-4 rounded-b-[2.5rem] shadow-xl overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
             <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-500 rounded-full blur-[100px]"></div>
             <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-secondary rounded-full blur-[100px]"></div>
        </div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4 leading-tight">
            Errands done. <br />
            <span className="text-secondary italic">Life lived.</span>
          </h1>
          <p className="text-purple-100 text-lg md:text-xl max-w-2xl mx-auto font-light">
            The premium on-demand concierge for students and professionals in Awka.
          </p>
        </div>
      </div>

      <QuickTask />

      {/* Categories */}
      <div className="max-w-7xl mx-auto px-4 mt-12">
        <h2 className="text-2xl font-serif font-bold text-gray-800 mb-6">Service Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(selectedCategory === cat.id ? null : cat.id)}
              className={`flex flex-col items-center p-6 rounded-2xl transition-all duration-300 border ${
                selectedCategory === cat.id 
                ? 'bg-white border-primary shadow-lg scale-105' 
                : 'bg-white border-transparent shadow-sm hover:shadow-md hover:border-gray-200'
              }`}
            >
              <div className={`h-12 w-12 rounded-full flex items-center justify-center mb-4 ${
                  selectedCategory === cat.id ? 'bg-primary text-white' : 'bg-purple-50 text-primary'
              }`}>
                <span className="material-symbols-outlined">{cat.icon}</span>
              </div>
              <span className="font-semibold text-gray-800">{cat.title}</span>
              <span className="text-xs text-gray-500 text-center mt-1 leading-tight hidden md:block">{cat.description}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Erranders List */}
      <div className="max-w-7xl mx-auto px-4 mt-16">
        <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-serif font-bold text-gray-800">Available Erranders</h2>
            <div className="flex gap-2">
                 <span className="text-xs font-semibold text-primary bg-purple-50 px-3 py-1 rounded-full border border-purple-100">
                    Awka
                 </span>
            </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredErranders.map((person) => {
            const isFav = favorites.includes(person.id);
            return (
              <div key={person.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow duration-300 group relative">
                
                {/* Favorite Toggle */}
                <button 
                  onClick={() => toggleFavorite(person.id)}
                  className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 hover:bg-white backdrop-blur-sm shadow-sm transition-all group-hover:scale-110"
                >
                  <span className={`material-symbols-outlined text-xl transition-colors ${
                    isFav ? 'text-red-500 fill-current font-bold' : 'text-gray-400 hover:text-red-400'
                  }`}>
                    {isFav ? 'favorite' : 'favorite'}
                  </span>
                </button>

                <div className="p-5 flex gap-4">
                  <div className="relative">
                      <img 
                          src={person.imageUrl} 
                          alt={person.name} 
                          className="w-16 h-16 rounded-xl object-cover border border-gray-100" 
                      />
                      {person.verified && (
                          <div className="absolute -bottom-2 -right-2 bg-green-500 text-white rounded-full p-0.5 border-2 border-white" title="Verified ID">
                              <span className="material-symbols-outlined text-[14px] block">check</span>
                          </div>
                      )}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 group-hover:text-primary transition-colors">{person.name}</h3>
                    <p className="text-sm text-gray-500 mb-1">{person.specialty}</p>
                    <div className="flex items-center gap-1 text-amber-500 text-sm font-medium">
                      <span className="material-symbols-outlined text-sm">star</span>
                      <span>{person.rating}</span>
                      <span className="text-gray-300">|</span>
                      <span className="text-gray-400 font-normal">{person.reviews} reviews</span>
                    </div>
                  </div>
                </div>
                
                <div className="px-5 pb-3">
                   <p className="text-sm text-gray-600 line-clamp-2 italic">"{person.bio}"</p>
                   <div className="flex flex-wrap gap-2 mt-3">
                      {person.tags.map(tag => (
                          <span key={tag} className="text-[10px] uppercase tracking-wider font-semibold text-gray-500 bg-gray-100 px-2 py-1 rounded-md">
                              {tag}
                          </span>
                      ))}
                   </div>
                </div>

                <div className="px-5 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                  <div>
                      <span className="text-xs text-gray-400 uppercase font-bold block">Rate</span>
                      <span className="text-lg font-bold text-primary">₦{person.hourlyRate.toLocaleString()}</span>
                      <span className="text-xs text-gray-500">/hr</span>
                  </div>
                  <button className="bg-gray-900 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-primary transition-colors shadow-lg shadow-gray-200">
                      Book Now
                  </button>
                </div>
              </div>
            );
          })}
          {filteredErranders.length === 0 && (
              <div className="col-span-full py-12 text-center text-gray-400">
                  <span className="material-symbols-outlined text-4xl mb-2">search_off</span>
                  <p>No errand runners found for this category currently.</p>
              </div>
          )}
        </div>
      </div>

      {/* Modals */}
      <ChatBot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
      <VisualizerModal isOpen={isVisualizerOpen} onClose={() => setIsVisualizerOpen(false)} />
      <ProfileModal 
        isOpen={isProfileOpen} 
        onClose={() => setIsProfileOpen(false)}
        favorites={favorites}
        toggleFavorite={toggleFavorite}
      />
    </div>
  );
};

export default App;