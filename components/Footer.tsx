import React from 'react';
import { Lock } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200 pt-16 pb-8 mt-20">
      <div className="container mx-auto px-4 text-center">
        <div className="flex justify-center mb-6">
          <div className="p-3 bg-gray-50 rounded-full">
            <Lock className="w-6 h-6 text-gray-400" />
          </div>
        </div>
        
        <h3 className="font-semibold text-gray-900 mb-2">Why we are safe</h3>
        <p className="text-gray-500 max-w-lg mx-auto mb-8 text-sm leading-relaxed">
          CYC operates entirely in your browser. We do not ask for card numbers, CVVs, or expiry dates. 
          Your card configuration is stored locally on your device (`localStorage`) and never transmitted to any server.
        </p>
        
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8 text-sm text-gray-400 mb-8">
           <span>Educational Purposes Only</span>
           <span className="hidden md:inline">•</span>
           <span>Not Financial Advice</span>
           <span className="hidden md:inline">•</span>
           <span>Rates Subject to Bank Change</span>
        </div>

        <div className="text-xs text-gray-300">
          &copy; 2026 Choose Your Card | chooseyourcard.in
        </div>
      </div>
    </footer>
  );
};

export default Footer;