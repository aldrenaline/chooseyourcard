import React from 'react';
import { Wallet, ShoppingCart, Star } from 'lucide-react';

const HowItWorks: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
          <p className="text-gray-500 max-w-xl mx-auto">Get the best value in three simple steps.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto">
          {/* Step 1 */}
          <div className="flex flex-col items-center text-center group">
            <div className="w-20 h-20 bg-blue-50 rounded-3xl flex items-center justify-center mb-6 text-brand-blue group-hover:scale-110 transition-transform duration-300 shadow-sm">
              <Wallet className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">1. Add Your Cards</h3>
            <p className="text-gray-500 leading-relaxed">
              Select the cards you own from our list. Just the names—no numbers required.
            </p>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col items-center text-center group">
            <div className="w-20 h-20 bg-purple-50 rounded-3xl flex items-center justify-center mb-6 text-brand-purple group-hover:scale-110 transition-transform duration-300 shadow-sm">
              <ShoppingCart className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">2. Describe Purchase</h3>
            <p className="text-gray-500 leading-relaxed">
              Tell CYC what and where you are buying (e.g., "Flight on MakeMyTrip").
            </p>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col items-center text-center group">
            <div className="w-20 h-20 bg-green-50 rounded-3xl flex items-center justify-center mb-6 text-brand-green group-hover:scale-110 transition-transform duration-300 shadow-sm">
              <Star className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">3. Maximize Rewards</h3>
            <p className="text-gray-500 leading-relaxed">
              Instantly see which card gives the highest points or cashback.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;