import { ALL_CARDS } from '../constants';
import { CardDefinition, Recommendation, UserQuery, Category } from '../types';

const getOnlineMerchants = () => [
  'amazon', 'flipkart', 'myntra', 'swiggy', 'zomato', 'bookmyshow', 
  'makemytrip', 'cleartrip', 'goibibo', 'uber', 'ola', 'bigbasket', 
  'blinkit', 'zepto', 'ajio', 'nykaa', 'tataneu', 'meesho'
];

const calculateEffectiveRate = (card: CardDefinition, query: UserQuery): { rate: number, reason: string, tip: string } => {
  const merchant = query.merchant.toLowerCase();
  const category = query.category;
  
  let rate = card.baseRewardRate;
  let reason = `Base reward rate`;
  let tip = "Redeem against statement or catalog";

  // --- HDFC Cards ---
  if (card.issuer === 'HDFC') {
      if (card.id === 'hdfc-diners-black' || card.id === 'hdfc-infinia') {
        tip = "Redeem for Flights/Hotels via SmartBuy (1:1)";
        if (category === Category.Travel && (merchant.includes('makemytrip') || merchant.includes('goibibo') || merchant.includes('cleartrip'))) {
            rate = 16.5; // 5x/10x SmartBuy
            reason = "Accelerated Rewards on SmartBuy Portal";
        } else if (merchant.includes('swiggy') || merchant.includes('zomato')) {
            // Diners Black specifically has dining benefits
            if (card.id === 'hdfc-diners-black') {
                rate = 3.3; 
                reason = "High base rate for dining";
            }
        }
      } else if (card.id === 'hdfc-swiggy') {
          if (merchant.includes('swiggy')) {
              rate = 10.0;
              reason = "10% Cashback on Swiggy";
          } else if (getOnlineMerchants().some(m => merchant.includes(m))) {
              rate = 5.0;
              reason = "5% Cashback on Online platforms";
          }
      } else if (card.id === 'hdfc-millennia') {
          if (['amazon', 'flipkart', 'bookmyshow', 'cult.fit', 'myntra', 'sony liv', 'swiggy', 'tata cliq', 'uber', 'zomato'].some(m => merchant.includes(m))) {
            rate = 5.0;
            reason = "5% Cashback on Partner Merchants";
          }
      } else if (card.id === 'hdfc-tata-neu-infinity') {
          if (merchant.includes('tata') || merchant.includes('bigbasket') || merchant.includes('1mg')) {
              rate = 5.0; // 10% on app, 5% generally
              reason = "5-10% NeuCoins on Tata Neu App";
          } else if (merchant.includes('upi')) {
              rate = 1.5;
              reason = "1.5% on UPI spends";
          }
      }
  }

  // --- ICICI Cards ---
  else if (card.id === 'icici-amazon') {
    tip = "Auto-credited as Amazon Pay Balance";
    if (merchant.includes('amazon')) {
      rate = 5.0;
      reason = "5% Unlimited Cashback on Amazon";
    }
  }

  // --- SBI Cards ---
  else if (card.id === 'sbi-cashback') {
    tip = "Auto-credited to statement";
    const isOnline = getOnlineMerchants().some(m => merchant.includes(m)) || category === Category.Shopping || category === Category.Movies || category === Category.Travel;
    if (isOnline && category !== Category.Utilities && category !== Category.Fuel) {
      rate = 5.0;
      reason = "5% Cashback on Online spends";
    }
  }

  // --- Axis Cards ---
  else if (card.id === 'axis-ace') {
    if (merchant.includes('google pay') && category === Category.Utilities) {
        rate = 5.0;
        reason = "5% Cashback on GPay Bill Payments";
    } else if (merchant.includes('swiggy') || merchant.includes('zomato') || merchant.includes('ola')) {
        rate = 4.0;
        reason = "4% Cashback on Swiggy/Zomato/Ola";
    }
  } else if (card.id === 'axis-airtel') {
      if (merchant.includes('airtel') || merchant.includes('bill')) {
          rate = 10.0; // Up to limits
          reason = "10% Cashback on Airtel/Bills";
      }
  } else if (card.id === 'axis-atlas') {
      if (category === Category.Travel) {
          rate = 4.0; // 2 EDGE Miles = 4 Partner Points (approx)
          reason = "2x Miles on Travel";
      }
  }

  // --- AMEX Cards ---
  else if (card.issuer === 'AMEX') {
      if (card.id === 'amex-plat-travel' && category === Category.Travel) {
          rate = 8.0; // Milestone based, roughly 8-9% if 4L spent
          reason = "Milestone benefits (~8% return)";
          tip = "Reach 4L milestone for Taj Vouchers + Points";
      }
      if (card.id === 'amex-mrcc' && (category === Category.Utilities || category === Category.Fuel)) {
          // MRCC specific monthly bonuses
          rate = 1.0; 
          tip = "Do 4x1500 txns for bonus points";
      }
  }

  // --- AU Cards ---
  else if (card.id === 'au-ixigo') {
      if (category === Category.Travel && (merchant.includes('ixigo') || merchant.includes('train'))) {
          rate = 10.0; // Offers
          reason = "10% off/points on Ixigo";
      }
  }

  // --- HSBC Cards ---
  else if (card.id === 'hsbc-cashback') {
      if (category === Category.Dining || category === Category.Grocery || merchant.includes('swiggy') || merchant.includes('zomato')) {
          rate = 10.0; // Capped usually
          reason = "10% Cashback on Dining/Grocery/Food delivery";
      }
  } else if (card.id === 'hsbc-live-plus') {
       if (category === Category.Dining || merchant.includes('zomato') || merchant.includes('swiggy')) {
           rate = 10.0;
           reason = "10% Cashback on Dining & Food Delivery";
       }
  }

  // --- Generic Fallback Corrections ---
  if (category === Category.Fuel && !card.name.includes('Fuel') && !card.name.includes('Ace')) {
    if (rate > 1) {
        rate = 1.0; // Cap
        reason = "Fuel surcharge waiver only";
    }
  }

  return { rate, reason, tip };
};


export const getRecommendations = (walletCardIds: string[], query: UserQuery): Recommendation[] => {
  // Map IDs to definitions
  const walletCards = ALL_CARDS.filter(c => walletCardIds.includes(c.id));
  
  const recommendations: Recommendation[] = walletCards.map(card => {
    const { rate, reason, tip } = calculateEffectiveRate(card, query);
    const projectedSavings = query.amount ? (query.amount * rate / 100) : 0;
    
    return {
      cardId: card.id,
      cardName: card.name,
      issuer: card.issuer,
      effectiveRate: parseFloat(rate.toFixed(2)),
      projectedSavings: Math.round(projectedSavings),
      rewardType: card.tags.includes('Cashback') ? 'Cashback' : 'Points',
      pointsEarned: card.tags.includes('Cashback') ? 0 : Math.round(projectedSavings * 4),
      reason,
      redemptionTip: tip,
      rank: 0
    };
  });

  recommendations.sort((a, b) => b.effectiveRate - a.effectiveRate);

  return recommendations.map((rec, index) => ({
    ...rec,
    rank: index + 1
  }));
};