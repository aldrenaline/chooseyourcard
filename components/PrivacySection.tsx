import React from 'react';
import { Shield, EyeOff, Lock, ServerOff, CheckCircle } from 'lucide-react';

const PrivacySection: React.FC = () => {
  return (
    <section className="py-20 bg-green-50/50 border-y border-green-100/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-3 bg-green-100 rounded-2xl mb-4 text-green-600">
             <Shield className="w-8 h-8" />
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
            We Don't Want Your Data.
            <br />
            <span className="text-green-600">Seriously.</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose Your Card is designed with a "Privacy by Architecture" approach. 
            We removed the backend database for card numbers entirely.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          
          {/* Feature 1 */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-lg hover:border-green-200 transition-all group">
            <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center mb-6 text-gray-400 group-hover:bg-green-50 group-hover:text-green-600 transition-colors">
               <EyeOff className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">No Sensitive Info</h3>
            <p className="text-gray-500 leading-relaxed">
               We never ask for full card numbers, CVVs, expiry dates, or OTPs. We only need the card name (e.g., "HDFC Regalia").
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-lg hover:border-green-200 transition-all group">
            <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center mb-6 text-gray-400 group-hover:bg-green-50 group-hover:text-green-600 transition-colors">
               <ServerOff className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">No Remote Storage</h3>
            <p className="text-gray-500 leading-relaxed">
               Your wallet configuration lives in your browser's Local Storage. It is never sent to our servers unless you choose to sync.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-lg hover:border-green-200 transition-all group">
            <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center mb-6 text-gray-400 group-hover:bg-green-50 group-hover:text-green-600 transition-colors">
               <Lock className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Client-side Logic</h3>
            <p className="text-gray-500 leading-relaxed">
               All calculations for rewards and recommendations happen right on your device using JavaScript.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-lg hover:border-green-200 transition-all group">
            <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center mb-6 text-gray-400 group-hover:bg-green-50 group-hover:text-green-600 transition-colors">
               <CheckCircle className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Anonymous First</h3>
            <p className="text-gray-500 leading-relaxed">
               Use the entire platform without creating an account. Login is optional and only for syncing across devices.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default PrivacySection;