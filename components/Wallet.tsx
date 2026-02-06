import React, { useState } from 'react';
import { Plus, Trash2, X, Loader2, Image as ImageIcon, Cloud, Lock, Wifi } from 'lucide-react';
import { ALL_CARDS, BANK_NAMES } from '../constants';
import { SavedCard, CardIssuer, User, CardDefinition } from '../types';
import { fetchCardImage } from '../services/imageService';

interface WalletProps {
  savedCards: SavedCard[];
  onUpdateWallet: (newCards: SavedCard[]) => void;
  user: User | null;
  onLoginClick: () => void;
}

const Wallet: React.FC<WalletProps> = ({ savedCards, onUpdateWallet, user, onLoginClick }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Modal State
  const [selectedIssuer, setSelectedIssuer] = useState<CardIssuer | ''>('');
  const [selectedCardId, setSelectedCardId] = useState<string>('');
  const [isAdding, setIsAdding] = useState(false);

  // Derived lists
  const availableIssuers = Object.keys(BANK_NAMES) as CardIssuer[];
  const cardsForSelectedIssuer = ALL_CARDS.filter(c => c.issuer === selectedIssuer);

  const handleAddCard = async () => {
    if (!selectedCardId) return;
    
    setIsAdding(true);
    const cardDef = ALL_CARDS.find(c => c.id === selectedCardId);
    
    let imageUrl = cardDef?.imageUrl; // First priority: Hardcoded URL
    
    if (!imageUrl && cardDef) {
       // Second priority: Fetch from GenAI
       const fetchedUrl = await fetchCardImage(BANK_NAMES[cardDef.issuer], cardDef.name);
       if (fetchedUrl) imageUrl = fetchedUrl;
    }

    const newCard: SavedCard = {
      id: selectedCardId,
      customImageUrl: imageUrl,
      addedAt: Date.now()
    };

    onUpdateWallet([...savedCards, newCard]);
    setIsAdding(false);
    resetModal();
  };

  const removeCard = (id: string) => {
    onUpdateWallet(savedCards.filter(c => c.id !== id));
  };

  const resetModal = () => {
    setSelectedIssuer('');
    setSelectedCardId('');
    setIsModalOpen(false);
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8" id="wallet">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Your Wallet</h2>
          <p className="text-gray-500">Manage your cards to get personalized recommendations.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-brand-dark text-white px-4 py-2 rounded-xl hover:bg-gray-800 transition-colors shadow-lg shadow-gray-200"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Add Card</span>
        </button>
      </div>

      {/* Auth/Sync Banner */}
      {!user ? (
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
           <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-2 rounded-full text-brand-blue">
                 <Cloud className="w-5 h-5" />
              </div>
              <div>
                 <h4 className="text-sm font-bold text-gray-900">Guest Mode</h4>
                 <p className="text-xs text-gray-600">Your cards are saved on this device only.</p>
              </div>
           </div>
           <button onClick={onLoginClick} className="text-sm font-semibold text-brand-blue bg-white border border-blue-200 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors whitespace-nowrap">
              Sign In to Sync
           </button>
        </div>
      ) : (
        <div className="bg-green-50 border border-green-100 rounded-xl p-3 mb-8 flex items-center gap-2 text-sm text-green-700">
           <div className="bg-green-100 p-1.5 rounded-full"><Lock className="w-3.5 h-3.5" /></div>
           <span className="font-medium">Wallet securely synced to your account.</span>
        </div>
      )}

      {/* Horizontal Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {savedCards.map(saved => {
          const cardDef = ALL_CARDS.find(c => c.id === saved.id);
          if (!cardDef) return null;

          return <RealisticCard key={saved.id} cardDef={cardDef} savedCard={saved} onRemove={() => removeCard(saved.id)} />;
        })}

        <button 
          onClick={() => setIsModalOpen(true)}
          className="aspect-[1.586/1] flex flex-col items-center justify-center bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl hover:bg-gray-100 hover:border-brand-blue/30 transition-all group"
        >
          <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm mb-3 group-hover:scale-110 transition-transform">
            <Plus className="w-6 h-6 text-gray-400 group-hover:text-brand-blue" />
          </div>
          <span className="text-sm font-medium text-gray-500 group-hover:text-brand-blue">Add New Card</span>
        </button>
      </div>

      {/* Enhanced Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden flex flex-col animate-in fade-in zoom-in duration-200">
            
            <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h3 className="font-bold text-lg text-gray-900">Add to Wallet</h3>
              <button onClick={resetModal} className="p-1 hover:bg-gray-200 rounded-full transition-colors">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              
              {/* Step 1: Select Bank */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">1. Select Bank</label>
                <select 
                  value={selectedIssuer}
                  onChange={(e) => {
                    setSelectedIssuer(e.target.value as CardIssuer);
                    setSelectedCardId('');
                  }}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-blue outline-none transition-all appearance-none"
                >
                  <option value="">Choose a bank...</option>
                  {availableIssuers.map(issuer => (
                    <option key={issuer} value={issuer}>{BANK_NAMES[issuer]}</option>
                  ))}
                </select>
              </div>

              {/* Step 2: Select Card */}
              <div className={`space-y-2 transition-opacity duration-300 ${selectedIssuer ? 'opacity-100' : 'opacity-50 pointer-events-none'}`}>
                <label className="text-sm font-semibold text-gray-700">2. Select Card</label>
                <select 
                  value={selectedCardId}
                  onChange={(e) => setSelectedCardId(e.target.value)}
                  disabled={!selectedIssuer}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-blue outline-none transition-all appearance-none"
                >
                  <option value="">
                     {selectedIssuer ? `Select ${selectedIssuer} card...` : 'Select a bank first'}
                  </option>
                  {cardsForSelectedIssuer.map(card => {
                     const isSaved = savedCards.some(sc => sc.id === card.id);
                     if (isSaved) return null;
                     return <option key={card.id} value={card.id}>{card.name}</option>;
                  })}
                </select>
              </div>

              {/* Action Button */}
              <button
                onClick={handleAddCard}
                disabled={!selectedCardId || isAdding}
                className={`w-full py-3.5 rounded-xl font-bold text-white shadow-lg shadow-brand-blue/20 flex items-center justify-center gap-2 transition-all
                  ${!selectedCardId || isAdding ? 'bg-gray-300 cursor-not-allowed' : 'bg-brand-blue hover:bg-blue-700 hover:scale-[1.02]'}`}
              >
                {isAdding ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Adding Card...
                  </>
                ) : (
                  'Add to Wallet'
                )}
              </button>

            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const RealisticCard: React.FC<{ cardDef: CardDefinition, savedCard: SavedCard, onRemove: () => void }> = ({ cardDef, savedCard, onRemove }) => {
  const [imageError, setImageError] = useState(false);
  
  // Prefer saved custom image, then hardcoded definition image
  const imageUrl = !imageError ? (savedCard.customImageUrl || cardDef.imageUrl) : null;
  const isFallback = !imageUrl;
  
  const NetworkLogo = () => {
    if (cardDef.network === 'Visa') {
        return <div className="text-white font-bold italic tracking-wider text-xl" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>VISA</div>;
    }
    if (cardDef.network === 'MasterCard') {
        return (
            <div className="flex -space-x-3 opacity-90">
                <div className="w-8 h-8 rounded-full bg-red-600/90 mix-blend-screen"></div>
                <div className="w-8 h-8 rounded-full bg-yellow-500/90 mix-blend-screen"></div>
            </div>
        );
    }
    if (cardDef.network === 'Amex' || cardDef.issuer === 'AMEX') {
        return (
            <div className="bg-[#2671b9] text-white text-[10px] font-bold border-2 border-white px-1.5 py-0.5 rounded tracking-tighter uppercase">
                American Express
            </div>
        );
    }
    if (cardDef.network === 'Diners') {
        return <div className="text-white text-xs font-bold uppercase tracking-widest">Diners Club</div>;
    }
    if (cardDef.network === 'Rupay') {
        return (
             <div className="flex flex-col items-end leading-none">
                 <span className="text-orange-500 font-bold text-lg -mb-1">Ru</span>
                 <span className="text-green-600 font-bold text-lg">Pay</span>
             </div>
        );
    }
    return null;
  }

  return (
    <div className="group relative w-full aspect-[1.586/1] rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 perspective-1000">
      
      {/* Card Face */}
      <div className={`absolute inset-0 rounded-2xl overflow-hidden ${isFallback ? `bg-gradient-to-br ${cardDef.colorFrom} ${cardDef.colorTo}` : 'bg-gray-800'}`}>
        
        {/* Background Image - Full Cover for Horizontal Cards */}
        {imageUrl && (
            <img 
                src={imageUrl} 
                alt={cardDef.name}
                className="w-full h-full object-cover"
                onError={() => setImageError(true)} 
            />
        )}

        {/* Fallback Decoration */}
        {isFallback && (
             <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        )}
        
        {/* Shine/Reflection Effect (lighter if image present) */}
        <div className={`absolute inset-0 bg-gradient-to-tr ${imageUrl ? 'from-white/5 via-transparent to-black/10' : 'from-white/10 via-transparent to-black/20'} pointer-events-none`}></div>
      </div>

      {/* Remove Button - Always visible on hover/group */}
      <div className="absolute top-3 right-3 z-20">
         <button 
             onClick={(e) => { e.stopPropagation(); onRemove(); }}
             className="p-2 bg-black/40 hover:bg-red-500/90 backdrop-blur-md rounded-full text-white transition-all transform scale-90 hover:scale-100 opacity-0 group-hover:opacity-100 shadow-lg"
             title="Remove Card"
         >
             <Trash2 className="w-4 h-4" />
         </button>
      </div>

      {/* Overlay Content - ONLY show if it's a fallback (no image) */}
      {isFallback && (
        <div className="absolute inset-0 p-5 flex flex-col justify-between text-white pointer-events-none">
           
           {/* Top Row - Bank Name */}
           <div className="flex justify-between items-start">
              <div className="font-bold tracking-wider text-sm drop-shadow-md origin-top-left">
                  {BANK_NAMES[cardDef.issuer].toUpperCase()}
              </div>
           </div>

           {/* Middle Row - Chip & Contactless */}
           <div className="flex flex-col gap-4 mt-1">
              <div className="flex items-center gap-3">
                <div className="w-10 h-8 rounded-md bg-gradient-to-tr from-yellow-200 to-yellow-500 border border-yellow-600 flex items-center justify-center relative overflow-hidden shadow-sm">
                    <div className="absolute inset-0 border border-black/10 rounded-md"></div>
                    <div className="w-full h-[1px] bg-black/20 absolute top-1/2 -translate-y-1/2"></div>
                    <div className="h-full w-[1px] bg-black/20 absolute left-1/2 -translate-x-1/2"></div>
                </div>
                <Wifi className="w-6 h-6 rotate-90 text-white/80" />
              </div>
           </div>

           {/* Bottom Row - Details */}
           <div className="mt-auto pt-2 flex justify-between items-end">
              <div>
                  <div className="text-sm font-mono tracking-widest mb-1 opacity-90">
                      **** 1234
                  </div>
                  <h3 className="text-sm font-bold tracking-wide uppercase drop-shadow-md leading-tight max-w-[200px]">
                      {cardDef.name}
                  </h3>
              </div>
              <div className="opacity-90">
                  <NetworkLogo />
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default Wallet;