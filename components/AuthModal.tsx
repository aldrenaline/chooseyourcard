import React, { useState } from 'react';
import { X, Mail, Lock, Loader2, ShieldCheck, ArrowRight, CheckCircle2, User } from 'lucide-react';
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
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState('');

  // Google Mock State
  const [googleFlowStep, setGoogleFlowStep] = useState<'none' | 'select_account' | 'consent' | 'redirecting'>('none');

  if (!isOpen) return null;

  // Google Icon Component
  const GoogleIcon = () => (
    <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  );

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

  const startGoogleFlow = () => {
    setGoogleLoading(true);
    // Simulate initial connection delay then open "popup"
    setTimeout(() => {
        setGoogleLoading(false);
        setGoogleFlowStep('select_account');
    }, 800);
  };

  const handleGoogleAccountSelect = () => {
    setGoogleFlowStep('consent');
  };

  const handleGoogleConsent = async () => {
    setGoogleFlowStep('redirecting');
    try {
        const user = await mockAuthService.signInWithGoogle('user@gmail.com');
        // Success
        setTimeout(() => {
            onLoginSuccess(user);
            onClose();
        }, 1000); // Redirect delay
    } catch (e) {
        setGoogleFlowStep('none');
        setError('Google sign in failed');
    }
  };

  // --- MOCK GOOGLE POPUP RENDERING ---
  if (googleFlowStep !== 'none') {
      return (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
           <div className="bg-white rounded-lg shadow-2xl w-full max-w-[400px] h-[500px] flex flex-col overflow-hidden relative border border-gray-300">
              
              {/* Fake Chrome Browser Bar */}
              <div className="bg-gray-100 border-b border-gray-300 p-2 flex items-center gap-2">
                 <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                 </div>
                 <div className="flex-1 bg-white rounded-md h-6 flex items-center px-2 text-[10px] text-green-600 truncate border border-gray-200">
                    <Lock className="w-2.5 h-2.5 mr-1" />
                    accounts.google.com/signin/oauth/v2/consent
                 </div>
              </div>

              {/* Step 1: Account Selection */}
              {googleFlowStep === 'select_account' && (
                  <div className="flex-1 p-8 flex flex-col items-center animate-in slide-in-from-right duration-300">
                     <GoogleIcon />
                     <h2 className="text-xl font-medium mt-4 mb-2 text-gray-800">Sign in with Google</h2>
                     <p className="text-sm text-gray-600 mb-8">Choose an account to continue to <br/><span className="font-semibold">Choose Your Card</span></p>

                     <button onClick={handleGoogleAccountSelect} className="w-full flex items-center gap-3 p-3 border-b border-gray-100 hover:bg-gray-50 transition-colors text-left group">
                         <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold text-sm">U</div>
                         <div>
                             <div className="text-sm font-medium text-gray-800">User Name</div>
                             <div className="text-xs text-gray-500">user@gmail.com</div>
                         </div>
                     </button>
                     <button className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 transition-colors text-left text-sm font-medium text-gray-600">
                         <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                            <User className="w-4 h-4 text-gray-500" />
                         </div>
                         Use another account
                     </button>
                  </div>
              )}

              {/* Step 2: Consent */}
              {googleFlowStep === 'consent' && (
                  <div className="flex-1 p-8 flex flex-col animate-in slide-in-from-right duration-300">
                      <div className="flex items-center gap-2 mb-6">
                         <GoogleIcon />
                         <span className="text-gray-400 text-xs">Sign in with Google</span>
                      </div>
                      
                      <h2 className="text-lg font-medium text-gray-800 mb-6">
                          <span className="font-bold">Choose Your Card</span> wants access to your Google Account
                      </h2>

                      <div className="space-y-4 mb-8">
                          <div className="flex items-start gap-3">
                             <div className="mt-0.5"><CheckCircle2 className="w-5 h-5 text-blue-600" /></div>
                             <div className="text-sm text-gray-600">
                                 <span className="font-medium text-gray-800">Associate you with your personal info on Google</span>
                                 <p className="text-xs mt-0.5">See your personal info, including any personal info you've made publicly available.</p>
                             </div>
                          </div>
                          <div className="flex items-start gap-3">
                             <div className="mt-0.5"><CheckCircle2 className="w-5 h-5 text-blue-600" /></div>
                             <div className="text-sm text-gray-600">
                                 <span className="font-medium text-gray-800">View your email address</span>
                                 <p className="text-xs mt-0.5">See the primary email address associated with your Google Account.</p>
                             </div>
                          </div>
                      </div>

                      <div className="mt-auto flex justify-end gap-3">
                          <button onClick={() => setGoogleFlowStep('none')} className="px-5 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded">Cancel</button>
                          <button onClick={handleGoogleConsent} className="px-6 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded shadow-sm">Allow</button>
                      </div>
                  </div>
              )}

              {/* Step 3: Redirecting */}
              {googleFlowStep === 'redirecting' && (
                  <div className="flex-1 flex flex-col items-center justify-center animate-in fade-in duration-300">
                      <Loader2 className="w-10 h-10 text-blue-600 animate-spin mb-4" />
                      <p className="text-sm text-gray-600 font-medium">Redirecting to Choose Your Card...</p>
                  </div>
              )}

           </div>
        </div>
      );
  }

  // --- STANDARD AUTH MODAL ---
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
          {/* Google Button - Top Priority */}
          <button 
             onClick={startGoogleFlow}
             disabled={googleLoading}
             className="w-full bg-white border border-gray-300 hover:bg-gray-50 hover:shadow-sm text-gray-700 font-medium py-3 rounded-xl flex items-center justify-center gap-3 transition-all mb-6 relative overflow-hidden"
          >
             {googleLoading ? (
                 <>
                   <Loader2 className="w-5 h-5 animate-spin text-gray-500" />
                   <span className="text-gray-500">Connecting...</span>
                 </>
             ) : (
                 <>
                   <GoogleIcon />
                   <span>Continue with Google</span>
                 </>
             )}
          </button>

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