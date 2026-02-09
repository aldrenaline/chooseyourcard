import React, { useState, useEffect, useRef } from 'react';
import { X, Mail, Lock, Loader2, ShieldCheck, ArrowRight } from 'lucide-react';
import { mockAuthService } from '../services/mockAuthService';
import { User as UserType } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: UserType) => void;
  initialMode?: 'signin' | 'signup';
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLoginSuccess, initialMode = 'signin' }) => {
  const [mode, setMode] = useState<'signin' | 'signup'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const googleButtonRef = useRef<HTMLDivElement>(null);

  // Initialize Google Sign-In
  useEffect(() => {
    const initializeGoogle = () => {
      if (typeof window !== 'undefined' && (window as any).google && googleButtonRef.current) {
        try {
          (window as any).google.accounts.id.initialize({
            client_id: '793727705178-3o5lt7bhnqdbkmluivi6p8stpi19cip0.apps.googleusercontent.com',
            callback: handleGoogleCallback
          });
          
          (window as any).google.accounts.id.renderButton(
            googleButtonRef.current,
            { 
              theme: 'outline', 
              size: 'large', 
              type: 'standard',
              shape: 'rectangular',
              text: 'continue_with',
              logo_alignment: 'left',
              width: '100%' // Allow resizing to container
            }
          );
        } catch (e) {
          console.error("Google Sign-In initialization failed", e);
        }
      }
    };

    if (isOpen) {
      // If script is already loaded
      if ((window as any).google) {
        initializeGoogle();
      } else {
        // Wait for script (rare case if index.html script is async)
        const checkGoogle = setInterval(() => {
          if ((window as any).google) {
            initializeGoogle();
            clearInterval(checkGoogle);
          }
        }, 100);
        return () => clearInterval(checkGoogle);
      }
    }
  }, [isOpen]);

  const handleGoogleCallback = async (response: any) => {
    setIsLoading(true);
    setError('');
    try {
      // Pass the JWT credential directly to service for decoding
      const user = await mockAuthService.signInWithGoogle(response.credential);
      onLoginSuccess(user);
      onClose();
    } catch (e) {
      console.error(e);
      setError('Failed to authenticate with Google.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      let user: UserType;
      if (mode === 'signup') {
        if (password.length < 6) throw new Error("Password must be at least 6 characters");
        user = await mockAuthService.signUp(email, password);
      } else {
        user = await mockAuthService.signIn(email, password);
      }
      onLoginSuccess(user);
      onClose();
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <h3 className="font-bold text-lg text-gray-900">
            {mode === 'signin' ? 'Sign In to CYC' : 'Create Account'}
          </h3>
          <button onClick={onClose} className="p-1 hover:bg-gray-200 rounded-full transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="p-6">
          {/* Official Google Button Container */}
          <div className="w-full mb-6 flex justify-center min-h-[40px]">
            <div ref={googleButtonRef} className="w-full"></div>
          </div>

          {/* Divider */}
          <div className="relative flex py-2 items-center mb-6">
             <div className="flex-grow border-t border-gray-200"></div>
             <span className="flex-shrink-0 mx-4 text-gray-400 text-xs font-semibold uppercase tracking-wider">Or continue with email</span>
             <div className="flex-grow border-t border-gray-200"></div>
          </div>

          {/* Email Form */}
          <form onSubmit={handleEmailSubmit} className="space-y-4">
            {error && (
                <div className="p-3 rounded-lg bg-red-50 text-red-600 text-sm font-medium border border-red-100 animate-in slide-in-from-top-1">
                {error}
                </div>
            )}

            <div className="space-y-4">
                <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-700 ml-1">Email Address</label>
                <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-blue focus:border-brand-blue outline-none transition-all"
                    required
                    />
                </div>
                </div>

                <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-700 ml-1">Password</label>
                <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-blue focus:border-brand-blue outline-none transition-all"
                    required
                    />
                </div>
                </div>
            </div>

            <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 rounded-xl font-bold text-white shadow-lg shadow-brand-blue/20 flex items-center justify-center gap-2 transition-all bg-brand-blue hover:bg-blue-700 hover:scale-[1.02] disabled:opacity-70 disabled:hover:scale-100"
            >
                {isLoading ? (
                <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Processing...
                </>
                ) : (
                <>
                    {mode === 'signin' ? 'Sign In' : 'Create Account'}
                    <ArrowRight className="w-4 h-4" />
                </>
                )}
            </button>

            <div className="text-center mt-4">
               <button 
                 type="button" 
                 onClick={() => { setMode(mode === 'signin' ? 'signup' : 'signin'); setError(''); }}
                 className="text-sm text-brand-blue font-semibold hover:underline"
               >
                  {mode === 'signin' ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
               </button>
            </div>
          </form>

          <div className="text-center mt-6">
            <div className="inline-flex items-center gap-1.5 text-[10px] text-gray-400 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100">
              <ShieldCheck className="w-3 h-3 text-brand-green" />
              We respect your privacy. No card numbers stored.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;