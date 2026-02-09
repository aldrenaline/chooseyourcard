import React, { useState, useEffect } from 'react';
import Hero from './components/Hero';
import Wallet from './components/Wallet';
import QueryForm from './components/QueryForm';
import Results from './components/Results';
import HowItWorks from './components/HowItWorks';
import Footer from './components/Footer';
import Header from './components/Header';
import AuthModal from './components/AuthModal';
import { Recommendation, UserQuery, SavedCard, User } from './types';
import { getRecommendations } from './services/recommendationService';
import { mockAuthService } from './services/mockAuthService';

const STORAGE_KEY = 'cyc_wallet_v2';

const App: React.FC = () => {
  // State: Wallet
  const [savedCards, setSavedCards] = useState<SavedCard[]>([]);
  
  // State: Auth
  const [user, setUser] = useState<User | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'signin' | 'signup'>('signin');
  
  // State: Query & Results
  const [currentQuery, setCurrentQuery] = useState<UserQuery | null>(null);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);

  // Initialize App
  useEffect(() => {
    const init = async () => {
      // 1. Check if user is logged in
      const currentUser = await mockAuthService.getCurrentUser();
      if (currentUser) {
        setUser(currentUser);
        setSavedCards(currentUser.wallet);
      } else {
        // 2. Fallback to local storage
        loadLocalWallet();
      }
    };
    init();
  }, []);

  // Nudge logic: If user adds > 2 cards as guest, ask to sign up
  useEffect(() => {
    if (!user && savedCards.length > 2 && savedCards.length < 4) {
      // Simple debounce/check could be added here, for now relying on user action flow
      // We don't want to spam, so maybe only on specific triggers.
      // Leaving passive banner in Wallet for now as per "Nudge" requirement in UX
    }
  }, [savedCards, user]);

  const loadLocalWallet = () => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && typeof parsed[0] === 'string') {
          const migrated: SavedCard[] = parsed.map(id => ({ id, addedAt: Date.now() }));
          setSavedCards(migrated);
        } else {
          setSavedCards(parsed);
        }
      } catch (e) {
        initializeDefault();
      }
    } else {
      initializeDefault();
    }
  };

  const initializeDefault = () => {
    setSavedCards([]);
  };

  // Update wallet (handles both Local and Cloud sync)
  const handleUpdateWallet = async (newCards: SavedCard[]) => {
    setSavedCards(newCards);
    
    if (user) {
      // Sync with cloud
      try {
        const updatedUser = await mockAuthService.syncWallet(newCards);
        setUser(updatedUser);
      } catch (e) {
        console.error("Sync failed", e);
      }
    } else {
      // Sync locally
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newCards));
      
      // Onboarding nudge check
      if (newCards.length === 3) {
        setAuthModalMode('signup');
        setIsAuthModalOpen(true);
      }
    }
    
    // Refresh recommendations if needed
    if (currentQuery) {
      const cardIds = newCards.map(c => c.id);
      const recs = getRecommendations(cardIds, currentQuery);
      setRecommendations(recs);
    }
  };

  const handleLoginSuccess = async (loggedInUser: User) => {
    // Merge logic: If we have local cards, merge them with account
    const localWallet = savedCards;
    
    // Only merge if we actually have something different than defaults potentially
    // For simplicity, always try merge
    const mergedWallet = await mockAuthService.mergeWallets(localWallet);
    
    setUser({ ...loggedInUser, wallet: mergedWallet });
    setSavedCards(mergedWallet);
    
    // Clear local storage to avoid confusion? Or keep as backup? 
    // Requirement says "Remove LocalStorage limitation banner", implies switch of source.
    // We can leave local storage as is or clear it. Let's leave it but ignore it while logged in.
  };

  const handleLogout = async () => {
    await mockAuthService.signOut();
    setUser(null);
    loadLocalWallet(); // Revert to local state
  };

  const handleSearch = (query: UserQuery) => {
    setCurrentQuery(query);
    const cardIds = savedCards.map(c => c.id);
    const recs = getRecommendations(cardIds, query);
    setRecommendations(recs);
  };

  const handleReset = () => {
    setCurrentQuery(null);
    setRecommendations([]);
    const el = document.getElementById('find-card');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen font-sans selection:bg-brand-blue/20">
      <Header 
        user={user} 
        onLoginClick={() => { setAuthModalMode('signin'); setIsAuthModalOpen(true); }}
        onLogoutClick={handleLogout}
        scrollToSection={scrollToSection}
      />

      <main>
        <Hero 
          onStart={() => scrollToSection('find-card')} 
          onAddCards={() => scrollToSection('wallet')} 
        />
        
        <Wallet 
          savedCards={savedCards} 
          onUpdateWallet={handleUpdateWallet} 
          user={user}
          onLoginClick={() => { setAuthModalMode('signin'); setIsAuthModalOpen(true); }}
        />
        
        <QueryForm onSearch={handleSearch} />
        
        {currentQuery && (
          <Results 
            recommendations={recommendations} 
            query={currentQuery}
            onReset={handleReset}
          />
        )}

        <HowItWorks />
      </main>

      <Footer />

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
        initialMode={authModalMode}
      />
    </div>
  );
};

export default App;
