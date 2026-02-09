import React, { useState, useEffect } from 'react';
import Hero from './components/Hero';
import Wallet from './components/Wallet';
import QueryForm from './components/QueryForm';
import Results from './components/Results';
import HowItWorks from './components/HowItWorks';
import PrivacySection from './components/PrivacySection';
import Footer from './components/Footer';
import Header from './components/Header';
import AuthModal from './components/AuthModal';
import { INITIAL_WALLET_IDS } from './constants';
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

  // Nudge logic: Removed to reduce friction as per request
  useEffect(() => {
    // Passive banner in Wallet is sufficient
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
           // If parsed array is empty, maybe load defaults? 
           // Better to respect empty state if user cleared it.
           // But if it's the very first time (null stored), initializeDefault handles it.
           if (parsed.length === 0) {
             setSavedCards([]);
           } else {
             setSavedCards(parsed);
           }
        }
      } catch (e) {
        initializeDefault();
      }
    } else {
      initializeDefault();
    }
  };

  const initializeDefault = () => {
    // Start with empty wallet for new users
    const defaults: SavedCard[] = INITIAL_WALLET_IDS.map(id => ({
      id,
      addedAt: Date.now()
    }));
    setSavedCards(defaults);
    // Persist defaults so they don't disappear on reload
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaults));
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
      
      // Removed automatic auth modal trigger to allow seamless anonymous usage
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
            user={user}
            onLogin={() => { setAuthModalMode('signin'); setIsAuthModalOpen(true); }}
          />
        )}

        <HowItWorks />
        
        <PrivacySection />
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