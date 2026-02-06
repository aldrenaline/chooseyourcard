import React, { useState } from 'react';
import { Search, MapPin, IndianRupee, Sparkles } from 'lucide-react';
import { CATEGORIES, POPULAR_MERCHANTS } from '../constants';
import { UserQuery, Category } from '../types';

interface QueryFormProps {
  onSearch: (query: UserQuery) => void;
}

const QueryForm: React.FC<QueryFormProps> = ({ onSearch }) => {
  const [merchant, setMerchant] = useState('');
  const [category, setCategory] = useState<string>(Category.Shopping);
  const [amount, setAmount] = useState<string>('');

  const handleSearch = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!merchant) return;

    onSearch({
      merchant,
      category,
      amount: amount ? parseFloat(amount) : 0,
    });
  };

  const fillExample = (cat: string, merch: string) => {
    setCategory(cat);
    setMerchant(merch);
    // Don't auto submit, let user enter amount or adjust
  };

  return (
    <section className="py-12 px-4 max-w-4xl mx-auto" id="find-card">
      <div className="glass-panel rounded-3xl p-6 md:p-10 shadow-xl shadow-brand-blue/5">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Ask CYC</h2>
          <p className="text-gray-500">Where are you spending money right now?</p>
        </div>

        <form onSubmit={handleSearch} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Merchant Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 ml-1">Merchant / Platform</label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input 
                  type="text" 
                  value={merchant}
                  onChange={(e) => setMerchant(e.target.value)}
                  placeholder="e.g. Amazon, Swiggy, Starbucks" 
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-brand-blue focus:border-brand-blue outline-none transition-all font-medium"
                  list="merchants"
                  required
                />
                <datalist id="merchants">
                  {POPULAR_MERCHANTS.map(m => <option key={m} value={m} />)}
                </datalist>
              </div>
            </div>

            {/* Category Select */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 ml-1">Category</label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none">
                  <Search className="w-5 h-5" />
                </div>
                <select 
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full pl-12 pr-10 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-brand-blue focus:border-brand-blue outline-none transition-all font-medium appearance-none cursor-pointer"
                >
                  {CATEGORIES.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
              </div>
            </div>
          </div>

          {/* Amount (Optional) */}
          <div className="space-y-2">
             <label className="text-sm font-medium text-gray-700 ml-1">Amount (Optional)</label>
             <div className="relative">
                <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input 
                  type="number" 
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="2500" 
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-brand-blue focus:border-brand-blue outline-none transition-all font-medium"
                />
             </div>
          </div>

          <button 
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-brand-blue to-brand-purple text-white font-bold rounded-2xl shadow-lg shadow-brand-blue/30 hover:shadow-brand-blue/50 transform hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
          >
            <Sparkles className="w-5 h-5" />
            Find Best Card
          </button>
        </form>

        {/* Quick Pills */}
        <div className="mt-8">
          <p className="text-xs text-gray-400 uppercase tracking-wide font-semibold mb-3 text-center">Try these examples</p>
          <div className="flex flex-wrap justify-center gap-2">
            <button onClick={() => fillExample(Category.Movies, 'BookMyShow')} className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm text-gray-600 hover:border-brand-blue hover:text-brand-blue transition-colors">🍿 Movie on BookMyShow</button>
            <button onClick={() => fillExample(Category.Travel, 'MakeMyTrip')} className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm text-gray-600 hover:border-brand-blue hover:text-brand-blue transition-colors">✈️ Flight on MMT</button>
            <button onClick={() => fillExample(Category.Shopping, 'Amazon')} className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm text-gray-600 hover:border-brand-blue hover:text-brand-blue transition-colors">📦 Amazon Shopping</button>
            <button onClick={() => fillExample(Category.Dining, 'Swiggy')} className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm text-gray-600 hover:border-brand-blue hover:text-brand-blue transition-colors">🍔 Swiggy Food</button>
            <button onClick={() => fillExample(Category.Fuel, 'HPCL')} className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm text-gray-600 hover:border-brand-blue hover:text-brand-blue transition-colors">⛽ Fuel</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QueryForm;