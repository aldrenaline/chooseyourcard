import { UserQuery, Recommendation, User } from '../types';

interface SearchLogPayload {
  userId?: string | null;
  merchant: string;
  category: string;
  amount: number;
  recommendedCard: string;
  recommendedCardName: string;
  effectiveRate: number;
  userCards: string[];
  device: string;
  userAgent: string;
  timestamp: string;
}

// --- Configuration ---
// If you deploy the backend to Railway/Render/Vercel, replace this URL with your actual backend URL.
// Example: 'https://cyc-backend.up.railway.app/api'
const PROD_API_BASE_URL = 'https://cyc-backend-production.up.railway.app/api'; 

const getApiBaseUrl = () => {
  if (typeof window === 'undefined') return 'http://localhost:5000/api';
  
  const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
  return isLocal ? 'http://localhost:5000/api' : PROD_API_BASE_URL;
};

const API_BASE_URL = getApiBaseUrl();

export const analyticsService = {
  
  /**
   * Logs a user search and the resulting recommendation to the backend.
   * This is a "fire and forget" operation that shouldn't block the UI.
   */
  async logSearch(query: UserQuery, recommendation: Recommendation, user: User | null) {
    // 1. Construct detailed telemetry payload
    const payload: SearchLogPayload = {
      userId: user?.email || null, // Mapping email to ID for this implementation
      merchant: query.merchant,
      category: query.category,
      amount: query.amount,
      recommendedCard: recommendation.cardId,
      recommendedCardName: recommendation.cardName,
      effectiveRate: recommendation.effectiveRate,
      userCards: user?.wallet.map(c => c.id) || [],
      device: this.getDeviceType(),
      userAgent: navigator.userAgent,
      timestamp: new Date().toISOString()
    };

    if (process.env.NODE_ENV === 'development') {
      console.log(`[Analytics] 📤 Logging search for "${query.merchant}"...`, payload);
    }

    // 2. Send to backend
    try {
      // Using keepalive: true ensures the request completes even if the user 
      // clicks a link and navigates away immediately after searching.
      const response = await fetch(`${API_BASE_URL}/search/log`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
        keepalive: true, 
      });

      if (!response.ok) {
        // Silently fail in production, but log in dev
        if (process.env.NODE_ENV === 'development') {
           console.warn(`[Analytics] ⚠️ API Error: ${response.status} ${response.statusText}`);
        }
      } else {
        if (process.env.NODE_ENV === 'development') {
           console.log('[Analytics] ✅ Log success');
        }
      }
    } catch (e) {
      if (process.env.NODE_ENV === 'development') {
        console.warn('[Analytics] ❌ Backend unreachable. Is the server running?');
      }
    }
  },

  /**
   * Fetch aggregated analytics data for the dashboard
   */
  async getAnalytics(period: string = '7d') {
    try {
      const response = await fetch(`${API_BASE_URL}/search/analytics?period=${period}`);
      if (!response.ok) throw new Error('Failed to fetch analytics');
      return await response.json();
    } catch (e) {
      console.error("Analytics fetch error", e);
      return null;
    }
  },

  /**
   * Fetch detailed dashboard data
   */
  async getDashboardData() {
    try {
      const response = await fetch(`${API_BASE_URL}/search/dashboard`);
      if (!response.ok) throw new Error('Failed to fetch dashboard data');
      return await response.json();
    } catch (e) {
      console.error("Dashboard data error", e);
      return null;
    }
  },

  /**
   * Determine device type based on User Agent
   */
  getDeviceType(): 'mobile' | 'tablet' | 'desktop' | 'unknown' {
    const ua = navigator.userAgent;
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
      return 'tablet';
    }
    if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
      return 'mobile';
    }
    return 'desktop';
  }
};