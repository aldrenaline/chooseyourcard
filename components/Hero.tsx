import React from 'react';
import { ArrowRight, ShieldCheck } from 'lucide-react';

interface HeroProps {
  onStart: () => void;
  onAddCards: () => void;
}

const Hero: React.FC<HeroProps> = ({ onStart, onAddCards }) => {
  return (
    <section className="relative pt-20 pb-16 md:pt-32 md:pb-24 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-brand-purple/20 rounded-full blur-3xl opacity-60"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-brand-blue/20 rounded-full blur-3xl opacity-60"></div>
      </div>

      <div className="container mx-auto px-4 text-center max-w-4xl">
        <div className="inline-flex items-center space-x-2 bg-white/50 backdrop-blur-sm border border-brand-blue/20 rounded-full px-4 py-1.5 mb-8 shadow-sm">
          <span className="flex h-2 w-2 rounded-full bg-brand-green"></span>
          <span className="text-sm font-medium text-brand-dark/70">No Card Numbers Required</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 text-brand-dark">
          Maximum Benefits, <br />
          <span className="gradient-text">Every Purchase.</span>
        </h1>

        <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
          India's smartest credit card recommender. Identify the best card in your wallet for shopping, travel, and dining instantly.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button 
            onClick={onStart}
            className="w-full sm:w-auto px-8 py-4 bg-brand-blue hover:bg-blue-700 text-white rounded-2xl font-semibold shadow-lg shadow-blue-500/30 transition-all hover:scale-105 flex items-center justify-center gap-2 group"
          >
            Find Best Card
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <button 
            onClick={onAddCards}
            className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-gray-50 text-brand-dark border border-gray-200 rounded-2xl font-semibold shadow-sm transition-all hover:scale-105"
          >
            Manage Wallet
          </button>
        </div>

        <div className="mt-12 flex items-center justify-center gap-6 text-gray-500 text-sm">
          <div className="flex items-center gap-2">
             <ShieldCheck className="w-4 h-4 text-brand-green" />
             <span>Privacy First</span>
          </div>
          <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
          <div>100% Free</div>
          <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
          <div>Client-side Only</div>
        </div>
      </div>
    </section>
  );
};

export default Hero;