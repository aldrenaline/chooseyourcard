require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const crypto = require('crypto');
const SearchLog = require('./models/SearchLog');

const app = express();
const PORT = process.env.PORT || 5000;
const IP_SALT = process.env.IP_SALT || 'default_salt_change_in_prod';

// --- Middleware ---
app.use(cors()); // Allow frontend access
app.use(express.json());

// Security: Rate Limiting (100 requests per IP per hour)
const apiLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: 'Too many requests from this IP, please try again after an hour'
});
app.use('/api/', apiLimiter);

// --- Database Connection & Mock Mode Setup ---
let isMockMode = false;
let mockDb = []; // In-memory store for testing

if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('✅ MongoDB Connected'))
    .catch(err => {
      console.error('❌ MongoDB Connection Error:', err.message);
      console.warn('⚠️ Falling back to MOCK MODE (In-Memory Database). Data will be lost on restart.');
      isMockMode = true;
    });
} else {
  console.warn('⚠️ No MONGODB_URI found in .env');
  console.warn('⚠️ Running in MOCK MODE (In-Memory Database). Data will be lost on restart.');
  isMockMode = true;
}

// --- Helpers ---
const hashIp = (ip) => {
  return crypto.createHash('sha256').update(ip + IP_SALT).digest('hex');
};

// --- Mock Data Generators ---
const generateMockData = (count = 50) => {
  const merchants = ['Amazon', 'Swiggy', 'Zomato', 'Uber', 'BookMyShow', 'Flipkart', 'Starbucks', 'Shell'];
  const categories = ['Shopping', 'Dining', 'Travel', 'Movies', 'Fuel'];
  const cards = ['HDFC Regalia', 'SBI Cashback', 'Axis Ace', 'ICICI Amazon Pay'];
  
  const newLogs = [];
  for (let i = 0; i < count; i++) {
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * 10)); // Random last 10 days
    
    newLogs.push({
      _id: 'mock_' + Math.random().toString(36).substr(2, 9),
      userId: Math.random() > 0.7 ? 'user_' + Math.floor(Math.random() * 5) : null,
      merchant: merchants[Math.floor(Math.random() * merchants.length)],
      category: categories[Math.floor(Math.random() * categories.length)],
      amount: Math.floor(Math.random() * 5000) + 100,
      recommendedCardName: cards[Math.floor(Math.random() * cards.length)],
      timestamp: date
    });
  }
  return newLogs;
};

// --- Routes ---

/**
 * POST /api/search/log
 * Log a user search transaction for analytics
 */
app.post('/api/search/log', async (req, res) => {
  try {
    const logData = req.body;
    console.log(`[LOG] Search: ${logData.merchant} (${logData.category}) - ₹${logData.amount}`);

    if (isMockMode) {
      const mockLog = {
        ...logData,
        _id: 'mock_' + Date.now(),
        timestamp: new Date()
      };
      mockDb.push(mockLog);
      return res.status(201).json({ success: true, id: mockLog._id, mode: 'mock' });
    }

    // Real MongoDB Logic
    const { 
      userId, merchant, category, amount, 
      recommendedCard, recommendedCardName, effectiveRate,
      userCards, device, userAgent 
    } = req.body;

    const rawIp = req.ip || req.connection.remoteAddress;
    const ipHash = hashIp(rawIp);

    const log = new SearchLog({
      userId, merchant, category, amount,
      recommendedCard, recommendedCardName, effectiveRate,
      userCards, device, userAgent, ipHash,
      timestamp: new Date()
    });

    await log.save();
    res.status(201).json({ success: true, id: log._id });
  } catch (error) {
    console.error('Logging failed:', error);
    res.status(500).json({ error: 'Failed to log search' });
  }
});

/**
 * POST /api/test/seed
 * Generate dummy data for testing analytics
 */
app.post('/api/test/seed', async (req, res) => {
  const count = req.body.count || 50;
  const logs = generateMockData(count);
  
  if (isMockMode) {
    mockDb.push(...logs);
    console.log(`[SEED] Added ${count} mock records to In-Memory DB`);
    return res.json({ success: true, message: `Seeded ${count} mock logs`, total: mockDb.length });
  }

  try {
    // Transform mock logs to Mongoose models
    const docs = logs.map(l => ({ ...l, recommendedCard: 'mock-card-id' }));
    await SearchLog.insertMany(docs);
    console.log(`[SEED] Added ${count} records to MongoDB`);
    res.json({ success: true, message: `Seeded ${count} logs to MongoDB` });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

/**
 * GET /api/search/analytics
 * Public/Admin endpoint to fetch aggregated insights
 */
app.get('/api/search/analytics', async (req, res) => {
  try {
    console.log('[ANALYTICS] Request received');
    
    if (isMockMode) {
      // Simple In-Memory Aggregation
      const merchantCounts = {};
      const categoryCounts = {};
      const cardCounts = {};

      mockDb.forEach(log => {
        merchantCounts[log.merchant] = (merchantCounts[log.merchant] || 0) + 1;
        categoryCounts[log.category] = (categoryCounts[log.category] || 0) + 1;
        cardCounts[log.recommendedCardName] = (cardCounts[log.recommendedCardName] || 0) + 1;
      });

      const toArray = (obj) => Object.entries(obj)
        .map(([k, v]) => ({ _id: k, count: v }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5);

      return res.json({
        period: 'mock-all-time',
        topMerchants: toArray(merchantCounts),
        topCategories: toArray(categoryCounts),
        topCards: toArray(cardCounts)
      });
    }

    // Real MongoDB Aggregation
    const period = req.query.period || '7d';
    const days = period === '30d' ? 30 : 7;
    const dateLimit = new Date();
    dateLimit.setDate(dateLimit.getDate() - days);

    const matchQuery = { timestamp: { $gte: dateLimit } };

    const [topMerchants, topCategories, topCards] = await Promise.all([
      SearchLog.aggregate([
        { $match: matchQuery },
        { $group: { _id: '$merchant', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 10 }
      ]),
      SearchLog.aggregate([
        { $match: matchQuery },
        { $group: { _id: '$category', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 5 }
      ]),
      SearchLog.aggregate([
        { $match: matchQuery },
        { $group: { _id: '$recommendedCardName', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 5 }
      ])
    ]);

    res.json({ period, topMerchants, topCategories, topCards });
  } catch (error) {
    console.error('Analytics fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch analytics' });
  }
});

/**
 * GET /api/search/dashboard
 * Detailed admin dashboard data
 */
app.get('/api/search/dashboard', async (req, res) => {
  try {
    if (isMockMode) {
      // Mock Daily Volume
      const dailyMap = {};
      mockDb.forEach(log => {
        const dateStr = new Date(log.timestamp).toISOString().split('T')[0];
        if (!dailyMap[dateStr]) dailyMap[dateStr] = { count: 0, totalAmt: 0 };
        dailyMap[dateStr].count++;
        dailyMap[dateStr].totalAmt += (log.amount || 0);
      });

      const dailyVolume = Object.keys(dailyMap).sort().map(date => ({
        _id: date,
        count: dailyMap[date].count,
        avgAmount: dailyMap[date].totalAmt / dailyMap[date].count
      }));

      // Mock User Type
      const registered = mockDb.filter(l => l.userId).length;
      const anonymous = mockDb.length - registered;
      const userType = [
        { _id: 'registered', count: registered },
        { _id: 'anonymous', count: anonymous }
      ];

      return res.json({ dailyVolume, userType });
    }

    // Real MongoDB Dashboard Aggregation
    const dailyVolume = await SearchLog.aggregate([
      { 
        $group: { 
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$timestamp" } }, 
          count: { $sum: 1 },
          avgAmount: { $avg: "$amount" }
        } 
      },
      { $sort: { _id: 1 } },
      { $limit: 30 }
    ]);

    const userType = await SearchLog.aggregate([
      {
        $group: {
          _id: { $cond: [{ $ifNull: ["$userId", false] }, "registered", "anonymous"] },
          count: { $sum: 1 }
        }
      }
    ]);

    res.json({ dailyVolume, userType });
  } catch (error) {
    res.status(500).json({ error: 'Dashboard data failed' });
  }
});

app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
  if (isMockMode) console.log('👉 Test API at: http://localhost:5000/api/test/seed');
});