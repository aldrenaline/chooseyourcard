import React, { useEffect, useRef } from 'react';
import { Recommendation, UserQuery } from '../types';
import { Trophy, TrendingUp, AlertCircle, RefreshCw } from 'lucide-react';
import { ALL_CARDS } from '../constants';

interface ResultsProps {
  recommendations: Recommendation[];
  query: UserQuery;
  onReset: () => void;
}

const Results: React.FC<ResultsProps> = ({ recommendations, query, onReset }) => {
  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Smooth scroll to results on mount
    resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  if (recommendations.length === 0) return null;

  const winner = recommendations[0];
  const winnerCardDef = ALL_CARDS.find(c => c.id === winner.cardId);

  return (
    <section ref={resultRef} className="py-8 px-4 max-w-5xl mx-auto">
      
      {/* Winner Section */}
      <div className="relative mb-12">
        <div className="absolute inset-0 bg-gradient-to-r from-brand-blue/20 to-brand-purple/20 blur-3xl rounded-full transform scale-90 -z-10"></div>
        
        <div className="glass-panel rounded-3xl overflow-hidden shadow-2xl border-brand-blue/20">
          <div className="bg-gradient-to-r from-brand-blue to-brand-purple text-white p-4 text-center">
             <div className="flex items-center justify-center gap-2 font-bold tracking-wide uppercase text-sm">
                <Trophy className="w-5 h-5 text-yellow-300" />
                Best Choice for {query.merchant}
             </div>
          </div>
          
          <div className="p-6 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            
            {/* Card Visual */}
            <div className="flex flex-col items-center">
               <div className={`w-72 h-44 rounded-2xl bg-gradient-to-br ${winnerCardDef?.colorFrom || 'from-gray-700'} ${winnerCardDef?.colorTo || 'to-black'} shadow-2xl relative flex flex-col justify-between p-5 text-white transform hover:scale-105 transition-transform duration-500`}>
                  <div className="flex justify-between items-start">
                     <div className="text-xs opacity-70 font-semibold tracking-wider">{winner.issuer}</div>
                     <div className="w-8 h-5 bg-yellow-400/30 rounded-md backdrop-blur-sm border border-yellow-200/40"></div>
                  </div>
                  <div>
                    <div className="text-lg font-bold tracking-wide mb-1">{winnerCardDef?.name}</div>
                    <div className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse"></div>
                        <span className="text-[10px] uppercase tracking-widest opacity-80">Best Match</span>
                    </div>
                  </div>
               </div>
               
               {winner.projectedSavings > 0 && (
                 <div className="mt-6 bg-green-50 text-green-700 px-4 py-2 rounded-full font-bold text-lg flex items-center gap-2 shadow-sm border border-green-100">
                    <TrendingUp className="w-5 h-5" />
                    Save approx ₹{winner.projectedSavings}
                 </div>
               )}
            </div>

            {/* Winner Details */}
            <div>
               <div className="mb-6">
                 <p className="text-gray-500 text-sm font-medium uppercase tracking-wider mb-1">Effective Return</p>
                 <h3 className="text-5xl font-extrabold text-brand-dark mb-2">{winner.effectiveRate}%</h3>
                 <p className="text-brand-blue font-medium">{winner.reason}</p>
               </div>

               <div className="bg-blue-50/50 rounded-xl p-4 border border-blue-100 mb-6">
                  <div className="flex gap-3">
                     <div className="mt-1"><AlertCircle className="w-5 h-5 text-brand-blue" /></div>
                     <div>
                        <h4 className="font-semibold text-brand-dark text-sm mb-1">Redemption Strategy</h4>
                        <p className="text-sm text-gray-600 leading-relaxed">{winner.redemptionTip}</p>
                     </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h3 className="font-bold text-lg text-gray-800">Card Comparison</h3>
          <button onClick={onReset} className="text-sm text-brand-blue hover:text-blue-700 font-medium flex items-center gap-1">
             <RefreshCw className="w-4 h-4" /> Reset Search
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
             <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                <tr>
                   <th className="px-6 py-4 font-semibold">Rank</th>
                   <th className="px-6 py-4 font-semibold">Card</th>
                   <th className="px-6 py-4 font-semibold">Return</th>
                   <th className="px-6 py-4 font-semibold">Reason</th>
                </tr>
             </thead>
             <tbody className="divide-y divide-gray-100">
                {recommendations.map((rec, idx) => (
                   <tr key={rec.cardId} className={`hover:bg-gray-50 transition-colors ${idx === 0 ? 'bg-blue-50/30' : ''}`}>
                      <td className="px-6 py-4">
                         <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold ${idx === 0 ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-500'}`}>
                            {idx + 1}
                         </span>
                      </td>
                      <td className="px-6 py-4">
                         <div className="font-medium text-gray-900">{rec.cardName}</div>
                         <div className="text-xs text-gray-500">{rec.issuer}</div>
                      </td>
                      <td className="px-6 py-4">
                         <div className="flex items-center gap-2">
                            <span className={`font-bold ${idx === 0 ? 'text-green-600' : 'text-gray-700'}`}>{rec.effectiveRate}%</span>
                            {/* Simple Visual Bar */}
                            <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden hidden sm:block">
                               <div className={`h-full rounded-full ${idx === 0 ? 'bg-green-500' : 'bg-gray-400'}`} style={{ width: `${Math.min(rec.effectiveRate * 10, 100)}%` }}></div>
                            </div>
                         </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                         {rec.reason}
                      </td>
                   </tr>
                ))}
             </tbody>
          </table>
        </div>
      </div>

    </section>
  );
};

export default Results;