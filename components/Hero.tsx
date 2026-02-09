import React from 'react';
import { ArrowRight, ShieldCheck, UserX, Laptop, Lock } from 'lucide-react';

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
        {/* Top Trust Badge */}
        <div className="inline-flex items-center space-x-2 bg-green-50 border border-green-200 rounded-full px-5 py-2 mb-8 shadow-sm hover:shadow-md transition-shadow cursor-default">
          <ShieldCheck className="w-5 h-5 text-green-600" />
          <span className="text-sm font-bold text-green-800 tracking-wide">No Card Numbers Required</span>
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

        {/* Enhanced Bottom Trust Indicators */}
        <div className="mt-14 flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          <div className="flex items-center gap-3 bg-white/80 backdrop-blur border border-gray-200 px-4 py-3 rounded-xl shadow-sm hover:border-green-300 transition-colors">
             <div className="bg-gray-100 p-2 rounded-full text-gray-600">
                <UserX className="w-5 h-5" />
             </div>
             <div className="text-left">
                <div className="text-xs text-gray-500 font-medium uppercase tracking-wider">Account</div>
                <div className="font-bold text-gray-800">No Sign-up Needed</div>
             </div>
          </div>

          <div className="flex items-center gap-3 bg-white/80 backdrop-blur border border-gray-200 px-4 py-3 rounded-xl shadow-sm hover:border-green-300 transition-colors">
             <div className="bg-green-100 p-2 rounded-full text-green-600">
                <ShieldCheck className="w-5 h-5" />
             </div>
             <div className="text-left">
                <div className="text-xs text-green-700 font-medium uppercase tracking-wider">Privacy</div>
                <div className="font-bold text-gray-800">Privacy First</div>
             </div>
          </div>

          <div className="flex items-center gap-3 bg-white/80 backdrop-blur border border-gray-200 px-4 py-3 rounded-xl shadow-sm hover:border-green-300 transition-colors">
             <div className="bg-blue-100 p-2 rounded-full text-blue-600">
                <Laptop className="w-5 h-5" />
             </div>
             <div className="text-left">
                <div className="text-xs text-blue-700 font-medium uppercase tracking-wider">Processing</div>
                <div className="font-bold text-gray-800">Client-side Only</div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;