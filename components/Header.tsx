import React, { useState } from 'react';
import { LogOut, Check, CreditCard, UserCircle } from 'lucide-react';
import { User as UserType } from '../types';

interface HeaderProps {
  user: UserType | null;
  onLoginClick: () => void;
  onLogoutClick: () => void;
  scrollToSection: (id: string) => void;
}

const Header: React.FC<HeaderProps> = ({ user, onLoginClick, onLogoutClick, scrollToSection }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Google G Logo SVG
  const GoogleIcon = () => (
    <svg viewBox="0 0 24 24" width="16" height="16" xmlns="http://www.w3.org/2000/svg">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  );

  return (
    <nav className="fixed top-0 w-full z-40 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-brand-blue to-brand-purple flex items-center justify-center text-white font-bold text-sm">
              CYC
          </div>
          <span className="font-bold text-lg tracking-tight text-brand-dark">Choose Your Card</span>
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden md:flex gap-6 text-sm font-medium text-gray-500">
             <button onClick={() => scrollToSection('wallet')} className="hover:text-brand-blue transition-colors">My Wallet</button>
             <button onClick={() => scrollToSection('find-card')} className="hover:text-brand-blue transition-colors">Find Best Card</button>
          </div>

          <div className="h-6 w-px bg-gray-200 hidden md:block"></div>

          {user ? (
            <div className="relative">
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-full pl-1 pr-3 py-1 transition-all"
              >
                {user.authProvider === 'google' ? (
                   <div className="w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-sm overflow-hidden">
                      {user.profilePicture ? (
                        <img src={user.profilePicture} alt="Google" className="w-full h-full" />
                      ) : (
                        <GoogleIcon />
                      )}
                   </div>
                ) : (
                   <div className="w-7 h-7 bg-brand-blue/10 rounded-full flex items-center justify-center text-brand-blue">
                      <UserCircle className="w-5 h-5" />
                   </div>
                )}
                
                <span className="text-sm font-medium text-gray-700 max-w-[100px] truncate">{user.name || 'User'}</span>
                <div className="w-2 h-2 bg-green-500 rounded-full ml-1" title="Synced"></div>
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-100 py-2 animate-in fade-in slide-in-from-top-2">
                  <div className="px-4 py-3 border-b border-gray-50 mb-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-sm font-semibold text-gray-900 truncate">{user.email}</p>
                      {user.authProvider === 'google' && <GoogleIcon />}
                    </div>
                    <p className="text-xs text-gray-400">
                      {user.authProvider === 'google' ? 'Signed in with Google' : 'Signed in with Email'}
                    </p>
                  </div>
                  
                  <button onClick={() => scrollToSection('wallet')} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-gray-400" /> My Wallet
                  </button>

                  <div className="px-4 py-2 flex items-center gap-2 text-xs text-green-600 bg-green-50/50 mx-2 rounded mb-1 mt-1">
                    <Check className="w-3 h-3" /> Wallet Synced
                  </div>

                  <button 
                    onClick={() => { onLogoutClick(); setIsDropdownOpen(false); }}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                  >
                    <LogOut className="w-4 h-4" /> 
                    {user.authProvider === 'google' ? 'Sign out of Google' : 'Sign Out'}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button 
              onClick={onLoginClick}
              className="text-sm font-semibold text-brand-blue border border-brand-blue/20 hover:bg-brand-blue/5 px-4 py-2 rounded-full transition-all"
            >
              Sign In
            </button>
          )}
        </div>
      </div>
      
      {/* Mobile Menu Backdrop */}
      {isDropdownOpen && <div className="fixed inset-0 z-[-1]" onClick={() => setIsDropdownOpen(false)}></div>}
    </nav>
  );
};

export default Header;