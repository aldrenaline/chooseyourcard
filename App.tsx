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
import AdminDashboard from './components/AdminDashboard';
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

  // State: View Mode
  const [showAdmin, setShowAdmin] = useState(false);

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

  const loadLocalWallet = () => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && typeof parsed[0] === 'string') {
           const migrated: SavedCard[] = parsed.map(id => ({ id, addedAt: Date.now() }));
           setSavedCards(migrated);
        } else {
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
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaults));
  };

  const handleUpdateWallet = async (newCards: SavedCard[]) => {
    setSavedCards(newCards);
    
    if (user) {
      try {
        const updatedUser = await mockAuthService.syncWallet(newCards);
        setUser(updatedUser);
      } catch (e) {
        console.error("Sync failed", e);
      }
    } else {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newCards));
    }
    
    if (currentQuery) {
        const cardIds = newCards.map(c => c.id);
        const recs = getRecommendations(cardIds, currentQuery);
        setRecommendations(recs);
    }
  };

  const handleLoginSuccess = async (loggedInUser: User) => {
    const localWallet = savedCards;
    const mergedWallet = await mockAuthService.mergeWallets(localWallet);
    setUser({ ...loggedInUser, wallet: mergedWallet });
    setSavedCards(mergedWallet);
  };

  const handleLogout = async () => {
    await mockAuthService.signOut();
    setUser(null);
    loadLocalWallet();
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

  if (showAdmin) {
    return <AdminDashboard onBack={() => setShowAdmin(false)} />;
  }

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

      <Footer onAdminClick={() => setShowAdmin(true)} />

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