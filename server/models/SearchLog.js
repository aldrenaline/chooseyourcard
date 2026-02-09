const mongoose = require('mongoose');

const SearchLogSchema = new mongoose.Schema({
  // User Identification (Privacy: Null if anonymous)
  userId: { type: String, index: true, default: null },
  
  // Search Context
  merchant: { type: String, required: true, index: true },
  category: { type: String, required: true, index: true },
  amount: { type: Number, default: 0 },
  
  // Recommendation Result
  recommendedCard: { type: String, required: true }, // Card ID
  recommendedCardName: { type: String },
  effectiveRate: { type: Number },
  
  // User Context (Snapshot of wallet at time of search)
  userCards: [{ type: String }], 
  
  // Technical & Telemetry
  device: { type: String, enum: ['mobile', 'tablet', 'desktop', 'unknown'] },
  userAgent: { type: String },
  ipHash: { type: String, select: false }, // Hashed for privacy, excluded from default queries
  
  // Location (Approximate)
  location: {
    city: String,
    region: String,
    country: String
  },

  timestamp: { type: Date, default: Date.now, index: true }
}, { 
  timestamps: true 
});

// Performance Indexes
SearchLogSchema.index({ timestamp: -1 }); // Fast chronological sorting
SearchLogSchema.index({ merchant: 1, timestamp: -1 }); // Fast merchant analytics

// Data Retention Policy: Auto-delete logs older than 90 days (Privacy Compliance)
SearchLogSchema.index({ timestamp: 1 }, { expireAfterSeconds: 90 * 24 * 60 * 60 });

module.exports = mongoose.model('SearchLog', SearchLogSchema);