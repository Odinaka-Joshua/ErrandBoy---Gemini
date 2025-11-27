import React from 'react';
import { ERRANDERS } from '../constants';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  favorites: string[];
  toggleFavorite: (id: string) => void;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose, favorites, toggleFavorite }) => {
  if (!isOpen) return null;

  const favoriteErranders = ERRANDERS.filter(e => favorites.includes(e.id));
  const referralCode = "AWKA-BOY-2025";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div 
        className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden flex flex-col max-h-[90vh]"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-white p-6 border-b border-gray-100 flex justify-between items-center sticky top-0 z-10">
          <div>
            <h2 className="text-xl font-serif font-bold text-gray-900">My Profile</h2>
            <p className="text-sm text-gray-500">Manage account & favorites</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="overflow-y-auto p-6 space-y-8">
          {/* User Info */}
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-gray-200 border-2 border-primary overflow-hidden">
               <img src="https://picsum.photos/100/100" alt="User" className="h-full w-full object-cover" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-gray-900">Chibuike Nnamdi</h3>
              <span className="inline-block bg-amber-100 text-amber-800 text-xs px-2 py-0.5 rounded-full font-semibold border border-amber-200">
                Premium Member
              </span>
            </div>
          </div>

          {/* Referral Card */}
          <div className="bg-gradient-to-br from-primary to-purple-800 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden group">
            <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
            <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-20 h-20 bg-secondary/30 rounded-full blur-xl"></div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-2 text-purple-200">
                <span className="material-symbols-outlined">redeem</span>
                <span className="text-xs font-bold uppercase tracking-wider">Refer & Earn</span>
              </div>
              <h3 className="text-xl font-bold mb-1">Give ₦500, Get ₦500</h3>
              <p className="text-sm text-purple-100 mb-4 opacity-90">
                Share your code with friends in Awka. You both get credit when they book their first errand.
              </p>
              
              <div className="bg-white/10 border border-white/20 rounded-lg p-3 flex justify-between items-center backdrop-blur-md">
                <code className="font-mono font-bold text-lg tracking-wider text-secondary">{referralCode}</code>
                <button 
                  onClick={() => {
                    navigator.clipboard.writeText(referralCode);
                    alert("Code copied to clipboard!");
                  }}
                  className="text-xs bg-white text-primary px-3 py-1.5 rounded-md font-bold hover:bg-gray-100 transition-colors"
                >
                  Copy
                </button>
              </div>
            </div>
          </div>

          {/* Favorites Section */}
          <div>
            <h3 className="font-serif font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-red-500 fill-current">favorite</span>
              Favorite Erranders
            </h3>
            
            {favoriteErranders.length === 0 ? (
              <div className="text-center py-8 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                <span className="material-symbols-outlined text-gray-300 text-4xl mb-2">heart_broken</span>
                <p className="text-gray-500 text-sm">No favorites yet.</p>
                <p className="text-xs text-gray-400 mt-1">Mark errand runners you trust to see them here.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {favoriteErranders.map(person => (
                  <div key={person.id} className="flex items-center p-3 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                    <img 
                      src={person.imageUrl} 
                      alt={person.name} 
                      className="w-12 h-12 rounded-lg object-cover bg-gray-100"
                    />
                    <div className="ml-3 flex-1 min-w-0">
                      <h4 className="font-bold text-gray-900 text-sm truncate">{person.name}</h4>
                      <p className="text-xs text-gray-500 truncate">{person.specialty}</p>
                      <div className="flex items-center gap-1 mt-0.5">
                        <span className="material-symbols-outlined text-amber-500 text-[12px]">star</span>
                        <span className="text-xs font-medium text-gray-700">{person.rating}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => toggleFavorite(person.id)}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                        title="Remove from favorites"
                      >
                        <span className="material-symbols-outlined text-xl">delete</span>
                      </button>
                      <button className="bg-primary text-white text-xs font-medium px-3 py-2 rounded-lg hover:bg-purple-800 transition-colors">
                        Book
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;