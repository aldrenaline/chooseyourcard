import React, { useEffect, useState } from 'react';
import { analyticsService } from '../services/analyticsService';
import { BarChart, PieChart, Activity, Users, CreditCard, ShoppingBag, ArrowLeft, Loader2 } from 'lucide-react';

interface AdminDashboardProps {
  onBack: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onBack }) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [analytics, dash] = await Promise.all([
          analyticsService.getAnalytics('30d'),
          analyticsService.getDashboardData()
        ]);
        
        if (!analytics || !dash) {
          throw new Error("Could not connect to backend");
        }
        
        setData(analytics);
        setDashboardData(dash);
      } catch (err) {
        setError('Failed to load data. Is the backend running?');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-10 h-10 text-brand-blue animate-spin mx-auto mb-4" />
          <p className="text-gray-500">Loading Analytics...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Activity className="w-8 h-8 text-red-500" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Connection Error</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button onClick={onBack} className="px-6 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg font-medium transition-colors">
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const StatCard = ({ title, value, icon: Icon, color }: any) => (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">{title}</p>
          <h3 className="text-3xl font-bold text-gray-900 mt-1">{value}</h3>
        </div>
        <div className={`p-3 rounded-xl ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Analytics Dashboard</h1>
              <p className="text-xs text-gray-500">Real-time search insights</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
             <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold flex items-center gap-1">
               <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div> Live
             </span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        
        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard 
            title="Total Volume" 
            value={dashboardData?.dailyVolume?.reduce((acc: any, curr: any) => acc + curr.count, 0) || 0} 
            icon={Activity} 
            color="bg-blue-500" 
          />
          <StatCard 
            title="Registered Users" 
            value={dashboardData?.userType?.find((u: any) => u._id === 'registered')?.count || 0} 
            icon={Users} 
            color="bg-purple-500" 
          />
          <StatCard 
            title="Unique Merchants" 
            value={data?.topMerchants?.length || 0} 
            icon={ShoppingBag} 
            color="bg-orange-500" 
          />
          <StatCard 
            title="Top Card" 
            value={data?.topCards?.[0]?._id || "N/A"} 
            icon={CreditCard} 
            color="bg-green-500" 
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          
          {/* Top Merchants */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-brand-blue" /> Most Searched Merchants
            </h3>
            <div className="space-y-4">
              {data?.topMerchants?.map((m: any, idx: number) => (
                <div key={m._id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-6 text-sm font-bold text-gray-400">#{idx + 1}</span>
                    <span className="font-medium text-gray-800">{m._id}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-32 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-brand-blue" style={{ width: `${(m.count / data.topMerchants[0].count) * 100}%` }}></div>
                    </div>
                    <span className="text-sm font-bold text-gray-600 w-8 text-right">{m.count}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Cards */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-brand-purple" /> Top Recommended Cards
            </h3>
            <div className="space-y-4">
              {data?.topCards?.map((c: any, idx: number) => (
                <div key={c._id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-6 text-sm font-bold text-gray-400">#{idx + 1}</span>
                    <span className="font-medium text-gray-800 truncate max-w-[180px]">{c._id}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-32 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-brand-purple" style={{ width: `${(c.count / data.topCards[0].count) * 100}%` }}></div>
                    </div>
                    <span className="text-sm font-bold text-gray-600 w-8 text-right">{c.count}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Daily Volume & Categories */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-6">Daily Search Volume</h3>
              <div className="h-64 flex items-end justify-between gap-2">
                 {dashboardData?.dailyVolume?.map((day: any) => (
                    <div key={day._id} className="flex flex-col items-center flex-1 group relative">
                       <div 
                         className="w-full bg-blue-100 hover:bg-blue-500 rounded-t-md transition-all relative"
                         style={{ height: `${Math.max((day.count / 50) * 100, 10)}%` }}
                       >
                         <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                            {day.count} searches
                         </div>
                       </div>
                       <span className="text-[10px] text-gray-400 mt-2 rotate-45 origin-left translate-y-2">{day._id.slice(5)}</span>
                    </div>
                 ))}
                 {(!dashboardData?.dailyVolume || dashboardData.dailyVolume.length === 0) && (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      No data available yet
                    </div>
                 )}
              </div>
           </div>

           <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-6">Categories</h3>
              <div className="space-y-4">
                 {data?.topCategories?.map((cat: any) => (
                    <div key={cat._id} className="group cursor-default">
                       <div className="flex justify-between text-sm mb-1">
                          <span className="font-medium text-gray-700">{cat._id}</span>
                          <span className="text-gray-500">{cat.count}</span>
                       </div>
                       <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-green-500" style={{ width: `${(cat.count / (data.topCategories[0]?.count || 1)) * 100}%` }}></div>
                       </div>
                    </div>
                 ))}
              </div>
           </div>
        </div>

      </main>
    </div>
  );
};

export default AdminDashboard;