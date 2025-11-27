import React from 'react';

interface NavbarProps {
  onOpenChat: () => void;
  onOpenVisualizer: () => void;
  onOpenProfile: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onOpenChat, onOpenVisualizer, onOpenProfile }) => {
  return (
    <nav className="sticky top-0 z-50 bg-primary shadow-lg border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary text-3xl">
              room_service
            </span>
            <span className="font-serif text-2xl font-bold text-white tracking-wide">
              Errand Boy
            </span>
          </div>
          
          <div className="flex items-center space-x-4">
            <button 
              onClick={onOpenVisualizer}
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors text-sm"
            >
              <span className="material-symbols-outlined text-lg">image</span>
              <span>Visualize</span>
            </button>
            
            <button 
              onClick={onOpenChat}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary text-white hover:bg-amber-600 transition-all font-medium shadow-md"
            >
              <span className="material-symbols-outlined">support_agent</span>
              <span className="hidden sm:inline">Concierge</span>
            </button>
            
            <button 
              onClick={onOpenProfile}
              className="h-8 w-8 rounded-full bg-gray-200 overflow-hidden border-2 border-secondary hover:ring-2 hover:ring-white transition-all cursor-pointer"
            >
               <img src="https://picsum.photos/100/100" alt="User" className="h-full w-full object-cover" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;