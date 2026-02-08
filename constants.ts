import { CardDefinition, Category, CardIssuer } from './types';

export const ALL_CARDS: CardDefinition[] = [
  // ==========================
  // HDFC BANK CARDS (Comprehensive List)
  // ==========================
  
  // --- PREMIUM & SUPER PREMIUM ---
  { 
    id: 'hdfc-infinia-metal', 
    issuer: 'HDFC', 
    name: 'INFINIA Metal Edition', 
    baseRewardRate: 3.3, 
    tags: ['Luxury', 'Travel', 'Rewards', 'Metal'], 
    colorFrom: 'from-slate-900', 
    colorTo: 'to-slate-800',
    imageUrl: 'https://credofly.com/wp-content/uploads/2023/11/HDFC-Bank-Infinia-Credit-Card-Metal-Edition-Credofly-Review.webp'
  },
  { 
    id: 'hdfc-diners-black', 
    issuer: 'HDFC', 
    name: 'Diners Club Black Metal', 
    baseRewardRate: 3.3, 
    tags: ['Travel', 'Dining', 'Lifestyle'], 
    colorFrom: 'from-black', 
    colorTo: 'to-gray-900',
    imageUrl: 'https://cardmaven.in/wp-content/uploads/2023/10/HDFC-Bank-Diners-Club-Black-Credit-Card.webp'
  },
  { 
    id: 'hdfc-regalia-gold', 
    issuer: 'HDFC', 
    name: 'Regalia Gold', 
    baseRewardRate: 1.33, 
    tags: ['Travel', 'Lifestyle'], 
    colorFrom: 'from-[#D4AF37]', 
    colorTo: 'to-[#AA8325]',
    imageUrl: 'https://www.hdfcbank.com/content/api/contentstream-id/723fb80a-2dde-42a3-9793-7ae1be57c87f/68712392-8073-4c92-95f2-9b2dc2747e45/Personal/Pay/Cards/Credit%20Card/Credit%20Card%20Landing%20Page/Credit%20Cards/Super%20Premium/Regalia%20Gold/Regalia-Gold-Credit-Card-264x167.png'
  },
  {
    id: 'hdfc-diners-privilege',
    issuer: 'HDFC',
    name: 'Diners Club Privilege',
    baseRewardRate: 1.3,
    tags: ['Lifestyle', 'Dining'],
    colorFrom: 'from-gray-700',
    colorTo: 'to-gray-900'
  },

  // --- POPULAR & CASHBACK ---
  { 
    id: 'hdfc-millennia', 
    issuer: 'HDFC', 
    name: 'Millennia Credit Card', 
    baseRewardRate: 1.0, 
    tags: ['Shopping', 'Cashback', 'Millennials'], 
    colorFrom: 'from-[#002D62]', 
    colorTo: 'to-[#0057B8]',
    imageUrl: 'https://www.hdfcbank.com/content/api/contentstream-id/723fb80a-2dde-42a3-9793-7ae1be57c87f/320092f6-8664-469b-980b-22240b90443d/Personal/Pay/Cards/Credit%20Card/Credit%20Card%20Landing%20Page/Credit%20Cards/CashBack/Millennia/Millennia-Credit-Card-264x167.png'
  },
  { 
    id: 'hdfc-moneyback-plus', 
    issuer: 'HDFC', 
    name: 'MoneyBack+ Credit Card', 
    baseRewardRate: 0.5, 
    tags: ['Entry', 'Rewards', 'Shopping'], 
    colorFrom: 'from-blue-500', 
    colorTo: 'to-indigo-600', 
    imageUrl: 'https://www.hdfcbank.com/content/api/contentstream-id/723fb80a-2dde-42a3-9793-7ae1be57c87f/5456209e-7110-4411-9252-870020163351/Personal/Pay/Cards/Credit%20Card/Credit%20Card%20Landing%20Page/Credit%20Cards/CashBack/MoneyBack%20Plus/MoneyBack-Plus-264x167.png'
  },
  {
    id: 'hdfc-freedom',
    issuer: 'HDFC',
    name: 'Freedom Credit Card',
    baseRewardRate: 0.5,
    tags: ['Entry', 'Rewards'],
    colorFrom: 'from-blue-400',
    colorTo: 'to-blue-600'
  },
  {
    id: 'hdfc-bharat',
    issuer: 'HDFC',
    name: 'Bharat Credit Card',
    baseRewardRate: 0.5,
    tags: ['Fuel', 'Rail', 'Entry'],
    colorFrom: 'from-orange-600',
    colorTo: 'to-orange-800'
  },

  // --- CO-BRANDED (TATA, SWIGGY, MARRIOTT, IRCTC) ---
  { 
    id: 'hdfc-swiggy', 
    issuer: 'HDFC', 
    name: 'Swiggy HDFC Bank', 
    baseRewardRate: 1.0, 
    tags: ['Food', 'Cashback', 'Co-brand'], 
    colorFrom: 'from-[#FC8019]', 
    colorTo: 'to-[#D96B10]',
    imageUrl: 'https://www.hdfcbank.com/content/api/contentstream-id/723fb80a-2dde-42a3-9793-7ae1be57c87f/81008060-6391-4929-9231-158223d758c6/Personal/Pay/Cards/Credit%20Card/Credit%20Card%20Landing%20Page/Credit%20Cards/Co-Brand/Swiggy%20HDFC%20Bank%20Credit%20Card/Swiggy_264x167.png'
  },
  { 
    id: 'hdfc-tata-neu-infinity', 
    issuer: 'HDFC', 
    name: 'Tata Neu Infinity', 
    baseRewardRate: 1.5, 
    tags: ['Shopping', 'Tata', 'UPI', 'Co-brand'], 
    colorFrom: 'from-[#3A3A3A]', 
    colorTo: 'to-black',
    imageUrl: 'https://www.hdfcbank.com/content/api/contentstream-id/723fb80a-2dde-42a3-9793-7ae1be57c87f/84379565-d04b-4b3f-a365-5c1a172778c7/Personal/Pay/Cards/Credit%20Card/Credit%20Card%20Landing%20Page/Credit%20Cards/Co-Brand/Tata%20Neu%20Infinity%20HDFC%20Bank%20Credit%20Card/TATA_Neu_Infinity_264x167.png' 
  },
  {
    id: 'hdfc-tata-neu-plus',
    issuer: 'HDFC', 
    name: 'Tata Neu Plus',
    baseRewardRate: 1.0,
    tags: ['Shopping', 'Tata', 'UPI'],
    colorFrom: 'from-purple-700',
    colorTo: 'to-purple-900'
  },
  {
    id: 'hdfc-marriott',
    issuer: 'HDFC',
    name: 'Marriott Bonvoy HDFC',
    baseRewardRate: 2.0,
    tags: ['Travel', 'Hotels', 'Luxury'],
    colorFrom: 'from-black',
    colorTo: 'to-gray-800'
  },
  {
    id: 'hdfc-irctc',
    issuer: 'HDFC',
    name: 'IRCTC HDFC Bank',
    baseRewardRate: 1.0,
    tags: ['Travel', 'Rail', 'Co-brand'],
    colorFrom: 'from-blue-500',
    colorTo: 'to-white'
  },
  {
    id: 'hdfc-shoppers-stop-black',
    issuer: 'HDFC',
    name: 'Shoppers Stop Black',
    baseRewardRate: 1.5,
    tags: ['Shopping', 'Retail'],
    colorFrom: 'from-black',
    colorTo: 'to-gray-900'
  },
  {
    id: 'hdfc-shoppers-stop',
    issuer: 'HDFC',
    name: 'Shoppers Stop HDFC',
    baseRewardRate: 1.0,
    tags: ['Shopping', 'Retail'],
    colorFrom: 'from-gray-200',
    colorTo: 'to-gray-400'
  },
  {
    id: 'hdfc-phonepe-ultimo',
    issuer: 'HDFC',
    name: 'PhonePe Ultimo',
    baseRewardRate: 1.0,
    tags: ['UPI', 'Digital'],
    colorFrom: 'from-[#5f259f]', 
    colorTo: 'to-[#481c7a]'
  },
  {
    id: 'hdfc-phonepe-uno',
    issuer: 'HDFC',
    name: 'PhonePe Uno',
    baseRewardRate: 0.5,
    tags: ['UPI', 'Digital'],
    colorFrom: 'from-[#5f259f]', 
    colorTo: 'to-[#481c7a]'
  },

  // --- DIGITAL / PIXEL ---
  {
    id: 'hdfc-pixel-play',
    issuer: 'HDFC',
    name: 'Pixel Play',
    baseRewardRate: 1.0,
    tags: ['Digital', 'Custom', 'GenZ'],
    colorFrom: 'from-indigo-500',
    colorTo: 'to-pink-500'
  },
  {
    id: 'hdfc-pixel-go',
    issuer: 'HDFC',
    name: 'Pixel Go',
    baseRewardRate: 0.5,
    tags: ['Digital', 'Entry'],
    colorFrom: 'from-green-400',
    colorTo: 'to-blue-500'
  },
  {
    id: 'hdfc-upi-rupay',
    issuer: 'HDFC',
    name: 'HDFC Bank UPI RuPay',
    baseRewardRate: 0.5,
    tags: ['UPI', 'Virtual'],
    colorFrom: 'from-blue-600',
    colorTo: 'to-blue-800'
  },

  // --- FUEL & OTHERS ---
  {
    id: 'hdfc-indianoil',
    issuer: 'HDFC',
    name: 'IndianOil HDFC Bank',
    baseRewardRate: 1.0,
    tags: ['Fuel', 'Rewards'],
    colorFrom: 'from-orange-500',
    colorTo: 'to-green-600'
  },
  {
    id: 'hdfc-all-miles',
    issuer: 'HDFC',
    name: 'All Miles Credit Card',
    baseRewardRate: 1.0,
    tags: ['Travel', 'Miles'],
    colorFrom: 'from-gray-500',
    colorTo: 'to-gray-700'
  },
  {
    id: 'hdfc-diners-premium',
    issuer: 'HDFC',
    name: 'Diners Club Premium',
    baseRewardRate: 1.0,
    tags: ['Travel', 'Dining'],
    colorFrom: 'from-gray-400',
    colorTo: 'to-gray-600'
  },
  {
    id: 'hdfc-diners-rewardz',
    issuer: 'HDFC',
    name: 'Diners Club Rewardz',
    baseRewardRate: 0.75,
    tags: ['Entry', 'Dining'],
    colorFrom: 'from-blue-300',
    colorTo: 'to-blue-500'
  },
  {
    id: 'hdfc-doctors-regalia',
    issuer: 'HDFC',
    name: 'Doctor\'s Regalia',
    baseRewardRate: 1.33,
    tags: ['Professional', 'Lifestyle'],
    colorFrom: 'from-cyan-800',
    colorTo: 'to-cyan-950'
  },
  {
    id: 'hdfc-doctors-superia',
    issuer: 'HDFC',
    name: 'Doctor\'s Superia',
    baseRewardRate: 1.0,
    tags: ['Professional', 'Lifestyle'],
    colorFrom: 'from-blue-700',
    colorTo: 'to-blue-900'
  },

  // ==========================
  // SBI CARDS (Comprehensive List)
  // ==========================

  // --- CORE PREMIUM ---
  { 
    id: 'sbi-aurum', 
    issuer: 'SBI', 
    name: 'AURUM', 
    baseRewardRate: 2.0, 
    tags: ['Luxury', 'Metal', 'Invite Only'], 
    colorFrom: 'from-[#1A1A1A]', 
    colorTo: 'to-[#4A3B2A]'
  },
  { 
    id: 'sbi-elite', 
    issuer: 'SBI', 
    name: 'SBI Card ELITE', 
    baseRewardRate: 1.25, 
    tags: ['Premium', 'Lifestyle', 'Movies'], 
    colorFrom: 'from-slate-700', 
    colorTo: 'to-black', 
    imageUrl: 'https://www.sbicard.com/sbi-card-en/assets/media/images/personal/credit-cards/lifestyle/sbi-card-elite/card-face-image-sbi-card-elite.png'
  },
  {
    id: 'sbi-elite-advantage',
    issuer: 'SBI',
    name: 'SBI Card ELITE Advantage',
    baseRewardRate: 1.25,
    tags: ['Premium', 'Lifestyle'],
    colorFrom: 'from-slate-600',
    colorTo: 'to-slate-800'
  },
  { 
    id: 'sbi-prime', 
    issuer: 'SBI', 
    name: 'SBI Card PRIME', 
    baseRewardRate: 1.0, 
    tags: ['Lifestyle', 'Dining', 'Utility'], 
    colorFrom: 'from-gray-700', 
    colorTo: 'to-gray-900', 
    imageUrl: 'https://www.sbicard.com/sbi-card-en/assets/media/images/personal/credit-cards/lifestyle/sbi-card-prime/card-face-image-sbi-card-prime.png'
  },
  {
    id: 'sbi-prime-advantage',
    issuer: 'SBI',
    name: 'SBI Card PRIME Advantage',
    baseRewardRate: 1.0,
    tags: ['Lifestyle', 'Dining'],
    colorFrom: 'from-gray-600',
    colorTo: 'to-gray-800'
  },

  // --- CORE SHOPPING & LIFESTYLE ---
  { 
    id: 'sbi-cashback', 
    issuer: 'SBI', 
    name: 'CASHBACK SBI Card', 
    baseRewardRate: 1.0, 
    tags: ['Online', 'Cashback', 'Shopping'], 
    colorFrom: 'from-[#6B3FA0]', 
    colorTo: 'to-[#4a1f80]', 
    imageUrl: 'https://www.sbicard.com/sbi-card-en/assets/media/images/personal/credit-cards/shopping/cashback-sbi-card/card-face-image-cashback-sbi-card.png'
  },
  { 
    id: 'sbi-simplyclick', 
    issuer: 'SBI', 
    name: 'SimplyCLICK SBI Card', 
    baseRewardRate: 0.25, 
    tags: ['Online', 'Shopping', 'Entry'], 
    colorFrom: 'from-blue-500', 
    colorTo: 'to-indigo-600', 
    imageUrl: 'https://www.sbicard.com/sbi-card-en/assets/media/images/personal/credit-cards/shopping/simplyclick-sbi-card/card-face-image-simplyclick-sbi-card.png'
  },
  {
    id: 'sbi-simplysave',
    issuer: 'SBI',
    name: 'SimplySAVE SBI Card',
    baseRewardRate: 0.25,
    tags: ['Entry', 'Offline'],
    colorFrom: 'from-yellow-400',
    colorTo: 'to-orange-500'
  },
  {
    id: 'sbi-pulse',
    issuer: 'SBI',
    name: 'SBI Card PULSE',
    baseRewardRate: 1.0, 
    tags: ['Health', 'Fitness'],
    colorFrom: 'from-[#2E8B57]',
    colorTo: 'to-[#20B2AA]'
  },
  {
    id: 'sbi-unnati',
    issuer: 'SBI',
    name: 'SBI Card Unnati',
    baseRewardRate: 0.25,
    tags: ['Entry', 'Secured'],
    colorFrom: 'from-blue-300',
    colorTo: 'to-blue-500'
  },

  // --- TRAVEL & MILES ---
  {
    id: 'sbi-miles-elite',
    issuer: 'SBI',
    name: 'SBI Card MILES ELITE',
    baseRewardRate: 2.0,
    tags: ['Travel', 'Miles'],
    colorFrom: 'from-[#003366]',
    colorTo: 'to-[#002244]'
  },
  {
    id: 'sbi-club-vistara',
    issuer: 'SBI',
    name: 'Club Vistara SBI Card',
    baseRewardRate: 1.5,
    tags: ['Travel', 'Vistara'],
    colorFrom: 'from-purple-800',
    colorTo: 'to-indigo-900'
  },
  {
    id: 'sbi-air-india-signature',
    issuer: 'SBI',
    name: 'Air India SBI Signature',
    baseRewardRate: 2.0,
    tags: ['Travel', 'Air India'],
    colorFrom: 'from-red-700',
    colorTo: 'to-red-900'
  },
  {
    id: 'sbi-indigo',
    issuer: 'SBI',
    name: 'IndiGo SBI Card',
    baseRewardRate: 1.5,
    tags: ['Travel', 'Co-brand'],
    colorFrom: 'from-blue-700',
    colorTo: 'to-blue-900'
  },

  // --- SHOPPING CO-BRAND (TATA, FLIPKART, RELIANCE, LANDMARK, TITAN) ---
  {
    id: 'sbi-flipkart',
    issuer: 'SBI',
    name: 'Flipkart SBI Card',
    baseRewardRate: 1.0,
    tags: ['Shopping', 'Cashback', 'Flipkart'],
    colorFrom: 'from-[#2874F0]',
    colorTo: 'to-[#1A4B9C]'
  },
  {
    id: 'sbi-tata-select',
    issuer: 'SBI',
    name: 'Tata Card SELECT',
    baseRewardRate: 1.0,
    tags: ['Shopping', 'Tata', 'Lifestyle'],
    colorFrom: 'from-blue-800',
    colorTo: 'to-gray-900'
  },
  {
    id: 'sbi-tata',
    issuer: 'SBI',
    name: 'Tata Card',
    baseRewardRate: 0.5,
    tags: ['Shopping', 'Tata'],
    colorFrom: 'from-blue-600',
    colorTo: 'to-blue-800'
  },
  {
    id: 'sbi-reliance-prime',
    issuer: 'SBI',
    name: 'Reliance SBI Card PRIME',
    baseRewardRate: 1.5,
    tags: ['Shopping', 'Reliance'],
    colorFrom: 'from-[#00572C]',
    colorTo: 'to-[#D4AF37]'
  },
  {
    id: 'sbi-reliance',
    issuer: 'SBI',
    name: 'Reliance SBI Card',
    baseRewardRate: 1.0,
    tags: ['Shopping', 'Reliance'],
    colorFrom: 'from-[#00572C]',
    colorTo: 'to-[#004225]'
  },
  {
    id: 'sbi-landmark-select',
    issuer: 'SBI',
    name: 'Landmark Rewards SELECT',
    baseRewardRate: 1.5,
    tags: ['Shopping', 'Lifestyle'],
    colorFrom: 'from-gray-800',
    colorTo: 'to-gray-900'
  },
  {
    id: 'sbi-landmark-prime',
    issuer: 'SBI',
    name: 'Landmark Rewards PRIME',
    baseRewardRate: 1.25,
    tags: ['Shopping', 'Lifestyle'],
    colorFrom: 'from-gray-700',
    colorTo: 'to-gray-800'
  },
  {
    id: 'sbi-landmark',
    issuer: 'SBI',
    name: 'Landmark Rewards',
    baseRewardRate: 1.0,
    tags: ['Shopping', 'Lifestyle'],
    colorFrom: 'from-gray-600',
    colorTo: 'to-gray-800'
  },
  {
    id: 'sbi-titan',
    issuer: 'SBI',
    name: 'Titan SBI Card',
    baseRewardRate: 1.5,
    tags: ['Shopping', 'Watches'],
    colorFrom: 'from-[#333333]',
    colorTo: 'to-[#000000]'
  },

  // --- FUEL & UTILITY & OTHERS ---
  {
    id: 'sbi-bpcl-octane',
    issuer: 'SBI',
    name: 'BPCL SBI Card OCTANE',
    baseRewardRate: 6.25,
    tags: ['Fuel', 'Rewards'],
    colorFrom: 'from-[#006C35]',
    colorTo: 'to-[#004B23]'
  },
  {
    id: 'sbi-bpcl',
    issuer: 'SBI',
    name: 'BPCL SBI Card',
    baseRewardRate: 3.25,
    tags: ['Fuel', 'Entry'],
    colorFrom: 'from-[#006C35]',
    colorTo: 'to-[#2C9F45]'
  },
  {
    id: 'sbi-ola',
    issuer: 'SBI',
    name: 'OLA Money SBI Card',
    baseRewardRate: 1.0,
    tags: ['Travel', 'Cabs'],
    colorFrom: 'from-[#CDDC39]',
    colorTo: 'to-[#AFB42B]'
  },
  {
    id: 'sbi-paytm-select',
    issuer: 'SBI',
    name: 'Paytm SBI Card SELECT',
    baseRewardRate: 1.0,
    tags: ['Online', 'Paytm'],
    colorFrom: 'from-[#002E6E]',
    colorTo: 'to-[#00B9F1]'
  },
  {
    id: 'sbi-paytm',
    issuer: 'SBI',
    name: 'Paytm SBI Card',
    baseRewardRate: 0.5,
    tags: ['Online', 'Paytm'],
    colorFrom: 'from-[#002E6E]',
    colorTo: 'to-[#00B9F1]'
  },
  {
    id: 'sbi-phonepe-select',
    issuer: 'SBI',
    name: 'PhonePe SBI Card SELECT',
    baseRewardRate: 1.0,
    tags: ['UPI', 'Digital', 'Black'],
    colorFrom: 'from-black',
    colorTo: 'to-gray-800'
  },
  {
    id: 'sbi-phonepe-purple',
    issuer: 'SBI',
    name: 'PhonePe SBI Card',
    baseRewardRate: 0.5,
    tags: ['UPI', 'Digital'],
    colorFrom: 'from-[#5f259f]',
    colorTo: 'to-[#481c7a]'
  },
  {
    id: 'sbi-doctor',
    issuer: 'SBI',
    name: 'Doctor\'s SBI Card',
    baseRewardRate: 1.0,
    tags: ['Professional', 'Medical'],
    colorFrom: 'from-cyan-700',
    colorTo: 'to-blue-800'
  },
  {
    id: 'sbi-apollo-select',
    issuer: 'SBI',
    name: 'Apollo SBI Card SELECT',
    baseRewardRate: 1.5,
    tags: ['Health', 'Pharmacy'],
    colorFrom: 'from-orange-500',
    colorTo: 'to-white'
  },
  {
    id: 'sbi-apollo',
    issuer: 'SBI',
    name: 'Apollo SBI Card',
    baseRewardRate: 1.0,
    tags: ['Health', 'Pharmacy'],
    colorFrom: 'from-orange-400',
    colorTo: 'to-gray-100'
  },

  // ==========================
  // ICICI BANK (Comprehensive List)
  // ==========================
  
  // PREMIUM CARDS
  { 
    id: 'icici-emeralde-private', 
    issuer: 'ICICI', 
    name: 'ICICI Emeralde Private Metal', 
    baseRewardRate: 2.5, 
    tags: ['Luxury', 'Travel', 'Metal'], 
    colorFrom: 'from-[#0B4D3B]', 
    colorTo: 'to-[#052920]' 
  },
  { 
    id: 'icici-times-black', 
    issuer: 'ICICI', 
    name: 'ICICI Times Black', 
    baseRewardRate: 1.0, 
    tags: ['Entertainment', 'Dining'], 
    colorFrom: 'from-[#1A1A1A]', 
    colorTo: 'to-black' 
  },
  { 
    id: 'icici-emeralde', 
    issuer: 'ICICI', 
    name: 'ICICI Emeralde', 
    baseRewardRate: 2.0, 
    tags: ['Premium', 'Lifestyle'], 
    colorFrom: 'from-[#50C878]', 
    colorTo: 'to-[#2E8B57]',
    imageUrl: 'https://www.icicibank.com/content/dam/icicibank/india/managed-assets/images/credit-card/emeralde-credit-card-new.png' 
  },

  // LIFESTYLE CARDS
  { 
    id: 'icici-sapphiro', 
    issuer: 'ICICI', 
    name: 'ICICI Sapphiro', 
    baseRewardRate: 1.0, 
    tags: ['Lifestyle', 'Golf'], 
    colorFrom: 'from-[#0F52BA]', 
    colorTo: 'to-[#002366]' 
  },
  { 
    id: 'icici-rubyx', 
    issuer: 'ICICI', 
    name: 'ICICI Rubyx', 
    baseRewardRate: 0.75, 
    tags: ['Lifestyle', 'Movies'], 
    colorFrom: 'from-[#E0115F]', 
    colorTo: 'to-[#900C3F]' 
  },
  { 
    id: 'icici-coral', 
    issuer: 'ICICI', 
    name: 'ICICI Coral', 
    baseRewardRate: 0.5, 
    tags: ['Entry', 'Movies'], 
    colorFrom: 'from-[#FF7F50]', 
    colorTo: 'to-[#FF4500]' 
  },
  { 
    id: 'icici-platinum-chip', 
    issuer: 'ICICI', 
    name: 'ICICI Platinum Chip', 
    baseRewardRate: 0.5, 
    tags: ['Entry', 'Rewards'], 
    colorFrom: 'from-[#E5E4E2]', 
    colorTo: 'to-[#B0B0B0]' 
  },

  // TRAVEL CARDS
  { 
    id: 'icici-adani-signature', 
    issuer: 'ICICI', 
    name: 'ICICI Adani One Signature', 
    baseRewardRate: 1.5, 
    tags: ['Travel', 'Airport'], 
    colorFrom: 'from-gray-900', 
    colorTo: 'to-[#F5821F]' 
  },
  { 
    id: 'icici-adani-platinum', 
    issuer: 'ICICI', 
    name: 'ICICI Adani One Platinum', 
    baseRewardRate: 1.0, 
    tags: ['Travel', 'Entry'], 
    colorFrom: 'from-gray-300', 
    colorTo: 'to-gray-500]' 
  },
  { 
    id: 'icici-mmt', 
    issuer: 'ICICI', 
    name: 'ICICI MakeMyTrip Credit Card', 
    baseRewardRate: 0.5, 
    tags: ['Travel', 'Co-brand'], 
    colorFrom: 'from-orange-500', 
    colorTo: 'to-orange-600]' 
  },
  { 
    id: 'icici-mmt-signature', 
    issuer: 'ICICI', 
    name: 'ICICI MakeMyTrip Signature', 
    baseRewardRate: 1.25, 
    tags: ['Travel', 'Co-brand'], 
    colorFrom: 'from-[#003366]', 
    colorTo: 'to-black' 
  },
  { 
    id: 'icici-mmt-platinum', 
    issuer: 'ICICI', 
    name: 'ICICI MakeMyTrip Platinum', 
    baseRewardRate: 0.75, 
    tags: ['Travel', 'Co-brand'], 
    colorFrom: 'from-gray-300', 
    colorTo: 'to-gray-500' 
  },
  { 
    id: 'icici-emirates-emeralde', 
    issuer: 'ICICI', 
    name: 'ICICI Emirates Emeralde', 
    baseRewardRate: 2.5, 
    tags: ['Travel', 'Miles'], 
    colorFrom: 'from-[#50C878]', 
    colorTo: 'to-[#003366]' 
  },
  { 
    id: 'icici-emirates-sapphiro', 
    issuer: 'ICICI', 
    name: 'ICICI Emirates Sapphiro', 
    baseRewardRate: 1.5, 
    tags: ['Travel', 'Miles'], 
    colorFrom: 'from-[#0F52BA]', 
    colorTo: 'to-[#002366]' 
  },
  { 
    id: 'icici-emirates-rubyx', 
    issuer: 'ICICI', 
    name: 'ICICI Emirates Skywards Rubyx', 
    baseRewardRate: 1.0, 
    tags: ['Travel', 'Miles'], 
    colorFrom: 'from-[#E0115F]', 
    colorTo: 'to-[#900C3F]' 
  },

  // FUEL CARDS
  { 
    id: 'icici-hpcl-super-saver', 
    issuer: 'ICICI', 
    name: 'ICICI HPCL Super Saver', 
    baseRewardRate: 5.0, 
    tags: ['Fuel', 'Cashback'], 
    colorFrom: 'from-[#E31837]', 
    colorTo: 'to-[#8B0000]' 
  },
  { 
    id: 'icici-hpcl-coral', 
    issuer: 'ICICI', 
    name: 'ICICI HPCL Coral', 
    baseRewardRate: 2.5, 
    tags: ['Fuel', 'Entry'], 
    colorFrom: 'from-[#FF7F50]', 
    colorTo: 'to-[#E31837]' 
  },

  // E-COMMERCE CARDS
  { 
    id: 'icici-amazon', 
    issuer: 'ICICI', 
    name: 'Amazon Pay ICICI', 
    baseRewardRate: 1.0, 
    tags: ['Shopping', 'Cashback', 'LTF'], 
    colorFrom: 'from-[#F5821F]', 
    colorTo: 'to-[#146EB4]', 
    imageUrl: 'https://www.icicibank.com/content/dam/icicibank/india/managed-assets/images/credit-card/amazon-pay-credit-card.png' 
  },

  // CUSTOM CARDS
  { 
    id: 'icici-expression', 
    issuer: 'ICICI', 
    name: 'ICICI Expression', 
    baseRewardRate: 0.5, 
    tags: ['Custom', 'Personal'], 
    colorFrom: 'from-indigo-500', 
    colorTo: 'to-purple-600' 
  },

  // SPORTS CARDS
  { 
    id: 'icici-manu-signature', 
    issuer: 'ICICI', 
    name: 'ICICI Manchester United Signature', 
    baseRewardRate: 1.0, 
    tags: ['Sports', 'Football'], 
    colorFrom: 'from-[#DA291C]', 
    colorTo: 'to-[#8B0000]' 
  },
  { 
    id: 'icici-manu-platinum', 
    issuer: 'ICICI', 
    name: 'ICICI Manchester United Platinum', 
    baseRewardRate: 0.5, 
    tags: ['Sports', 'Entry'], 
    colorFrom: 'from-gray-300', 
    colorTo: 'to-[#DA291C]' 
  },
  { 
    id: 'icici-csk', 
    issuer: 'ICICI', 
    name: 'ICICI Chennai Super Kings', 
    baseRewardRate: 1.0, 
    tags: ['Sports', 'Cricket'], 
    colorFrom: 'from-[#FFE400]', 
    colorTo: 'to-[#F5821F]' 
  },

  // DEFENSE CARDS
  { 
    id: 'icici-parakram-select', 
    issuer: 'ICICI', 
    name: 'ICICI Parakram Select', 
    baseRewardRate: 1.0, 
    tags: ['Defense', 'Special'], 
    colorFrom: 'from-[#4B5320]', 
    colorTo: 'to-[#2F3510]' 
  },
  { 
    id: 'icici-parakram', 
    issuer: 'ICICI', 
    name: 'ICICI Parakram', 
    baseRewardRate: 0.5, 
    tags: ['Defense', 'Special'], 
    colorFrom: 'from-[#556B2F]', 
    colorTo: 'to-[#4B5320]' 
  },

  // DIGITAL/COMMERCIAL CARDS
  { 
    id: 'icici-rupay', 
    issuer: 'ICICI', 
    name: 'ICICI RuPay Credit Card', 
    baseRewardRate: 0.5, 
    tags: ['UPI', 'Digital'], 
    colorFrom: 'from-[#F5821F]', 
    colorTo: 'to-[#E65100]' 
  },
  { 
    id: 'icici-business', 
    issuer: 'ICICI', 
    name: 'ICICI Business Credit Card', 
    baseRewardRate: 1.0, 
    tags: ['Business', 'Commercial'], 
    colorFrom: 'from-[#003366]', 
    colorTo: 'to-[#002366]' 
  },

  // ==========================
  // AXIS BANK
  // ==========================
  { 
    id: 'axis-privilege', 
    issuer: 'Axis', 
    name: 'Axis Bank Privilege', 
    baseRewardRate: 1.0, 
    tags: ['Lifestyle', 'Rewards'], 
    colorFrom: 'from-rose-800', 
    colorTo: 'to-rose-950'
  },
  { 
    id: 'axis-flipkart', 
    issuer: 'Axis', 
    name: 'Flipkart Axis Bank', 
    baseRewardRate: 1.5, 
    tags: ['Shopping', 'Cashback'], 
    colorFrom: 'from-blue-500', 
    colorTo: 'to-blue-700' 
  },
  { 
    id: 'axis-neo', 
    issuer: 'Axis', 
    name: 'Axis Bank Neo', 
    baseRewardRate: 0.5, 
    tags: ['Shopping', 'Entry'], 
    colorFrom: 'from-emerald-500', 
    colorTo: 'to-teal-700'
  },
  { 
    id: 'axis-indianoil', 
    issuer: 'Axis', 
    name: 'IndianOil Axis Bank', 
    baseRewardRate: 1.0, 
    tags: ['Fuel', 'Rewards'], 
    colorFrom: 'from-green-600', 
    colorTo: 'to-orange-500'
  },
  { 
    id: 'axis-myzone', 
    issuer: 'Axis', 
    name: 'Axis Bank My Zone', 
    baseRewardRate: 0.5, 
    tags: ['Movies', 'Dining'], 
    colorFrom: 'from-red-500', 
    colorTo: 'to-pink-600'
  },
  { 
    id: 'axis-ace', 
    issuer: 'Axis', 
    name: 'Axis Bank Ace', 
    baseRewardRate: 2.0, 
    tags: ['Utility', 'Cashback'], 
    colorFrom: 'from-gray-600', 
    colorTo: 'to-gray-900',
    imageUrl: 'https://www.axisbank.com/images/default-source/revamp-new/credit-cards/desktop/ace-credit-card.png'
  },
  { 
    id: 'axis-magnus', 
    issuer: 'Axis', 
    name: 'Axis Magnus', 
    baseRewardRate: 1.2, 
    tags: ['Travel', 'High Spends'], 
    colorFrom: 'from-red-700', 
    colorTo: 'to-red-900',
    imageUrl: 'https://www.axisbank.com/images/default-source/revamp-new/credit-cards/desktop/magnus-credit-card.png'
  },
  { 
    id: 'axis-atlas', 
    issuer: 'Axis', 
    name: 'Axis Atlas', 
    baseRewardRate: 2.0, 
    tags: ['Travel', 'Miles'], 
    colorFrom: 'from-gray-700', 
    colorTo: 'to-black',
    imageUrl: 'https://www.axisbank.com/images/default-source/revamp-new/credit-cards/desktop/atlas-credit-card.png' 
  },
  { 
    id: 'axis-vistara-infinite', 
    issuer: 'Axis', 
    name: 'Axis Vistara Infinite', 
    baseRewardRate: 3.0, 
    tags: ['Travel', 'Vistara'], 
    colorFrom: 'from-purple-700', 
    colorTo: 'to-indigo-800',
    imageUrl: 'https://www.axisbank.com/images/default-source/revamp-new/credit-cards/desktop/axis-bank-club-vistara-infinite-credit-card.png'
  },

  // ==========================
  // HSBC
  // ==========================
  { 
    id: 'hsbc-taj', 
    issuer: 'HSBC', 
    name: 'HSBC Taj Credit Card', 
    baseRewardRate: 1.5, 
    tags: ['Luxury', 'Hotels'], 
    colorFrom: 'from-gray-800', 
    colorTo: 'to-black'
  },
  { 
    id: 'hsbc-travelone', 
    issuer: 'HSBC', 
    name: 'HSBC TravelOne', 
    baseRewardRate: 1.0, 
    tags: ['Travel', 'Global'], 
    colorFrom: 'from-gray-700', 
    colorTo: 'to-gray-900'
  },
  { 
    id: 'hsbc-live-plus', 
    issuer: 'HSBC', 
    name: 'HSBC Live+ Credit Card', 
    baseRewardRate: 1.5, 
    tags: ['Dining', 'Lifestyle'], 
    colorFrom: 'from-red-700', 
    colorTo: 'to-red-900'
  },
  { 
    id: 'hsbc-premier', 
    issuer: 'HSBC', 
    name: 'HSBC Premier Mastercard', 
    baseRewardRate: 1.0, 
    tags: ['Premium', 'Global'], 
    colorFrom: 'from-gray-900', 
    colorTo: 'to-black'
  },
  { 
    id: 'hsbc-platinum', 
    issuer: 'HSBC', 
    name: 'HSBC Visa Platinum', 
    baseRewardRate: 0.5, 
    tags: ['Entry', 'Rewards'], 
    colorFrom: 'from-gray-300', 
    colorTo: 'to-gray-500'
  },
  { 
    id: 'hsbc-rupay-plat', 
    issuer: 'HSBC', 
    name: 'HSBC RuPay Platinum', 
    baseRewardRate: 0.5, 
    tags: ['UPI', 'Rewards'], 
    colorFrom: 'from-red-600', 
    colorTo: 'to-red-800'
  },
  { 
    id: 'hsbc-cashback', 
    issuer: 'HSBC', 
    name: 'HSBC Cashback Card', 
    baseRewardRate: 1.5, 
    tags: ['Cashback', 'Dining'], 
    colorFrom: 'from-red-600', 
    colorTo: 'to-red-800' 
  },

  // ==========================
  // AMERICAN EXPRESS
  // ==========================
  { 
    id: 'amex-smartearn', 
    issuer: 'AMEX', 
    name: 'American Express SmartEarn', 
    baseRewardRate: 0.5, 
    tags: ['Entry', 'Shopping'], 
    colorFrom: 'from-blue-400', 
    colorTo: 'to-blue-600' 
  },
  { 
    id: 'amex-mrcc', 
    issuer: 'AMEX', 
    name: 'Amex Membership Rewards', 
    baseRewardRate: 1.0, 
    tags: ['Rewards', 'Milestones'], 
    colorFrom: 'from-blue-800', 
    colorTo: 'to-blue-900',
    imageUrl: 'https://icm.aexp-static.com/Internet/internationalcardshop/en_in/images/cards/Membership_Rewards_Credit_Card.png'
  },
  { 
    id: 'amex-reserve', 
    issuer: 'AMEX', 
    name: 'Amex Platinum Reserve', 
    baseRewardRate: 1.0, 
    tags: ['Premium', 'Lifestyle'], 
    colorFrom: 'from-gray-200', 
    colorTo: 'to-gray-400'
  },
  { 
    id: 'amex-plat-travel', 
    issuer: 'AMEX', 
    name: 'Amex Platinum Travel', 
    baseRewardRate: 1.0, 
    tags: ['Travel', 'Milestones'], 
    colorFrom: 'from-gray-300', 
    colorTo: 'to-gray-500',
    imageUrl: 'https://icm.aexp-static.com/Internet/internationalcardshop/en_in/images/cards/Platinum_Travel_Credit_Card.png'
  },
  { 
    id: 'amex-plat-charge', 
    issuer: 'AMEX', 
    name: 'Amex Platinum Charge', 
    baseRewardRate: 1.25, 
    tags: ['Luxury', 'Lifestyle'], 
    colorFrom: 'from-gray-200', 
    colorTo: 'to-gray-400',
    imageUrl: 'https://icm.aexp-static.com/Internet/internationalcardshop/en_in/images/cards/Platinum_Card.png'
  },
  { 
    id: 'amex-gold-charge', 
    issuer: 'AMEX', 
    name: 'Amex Gold Charge', 
    baseRewardRate: 1.0, 
    tags: ['Rewards', 'Dining'], 
    colorFrom: 'from-yellow-300', 
    colorTo: 'to-yellow-500',
    imageUrl: 'https://icm.aexp-static.com/Internet/internationalcardshop/en_in/images/cards/Gold_Card.png'
  },

  // ==========================
  // KOTAK MAHINDRA BANK
  // ==========================
  { 
    id: 'kotak-league', 
    issuer: 'Kotak', 
    name: 'Kotak League Credit Card', 
    baseRewardRate: 1.0, 
    tags: ['Rewards', 'Milestones'], 
    colorFrom: 'from-gray-900', 
    colorTo: 'to-black' 
  },
  { 
    id: 'kotak-cashback', 
    issuer: 'Kotak', 
    name: 'Kotak Cashback+ Credit Card', 
    baseRewardRate: 1.5, 
    tags: ['Cashback', 'Shopping'], 
    colorFrom: 'from-blue-600', 
    colorTo: 'to-indigo-700'
  },
  { 
    id: 'kotak-air', 
    issuer: 'Kotak', 
    name: 'Kotak Air+ Credit Card', 
    baseRewardRate: 2.0, 
    tags: ['Travel', 'Miles'], 
    colorFrom: 'from-sky-700', 
    colorTo: 'to-sky-900'
  },
  { 
    id: 'kotak-indianoil', 
    issuer: 'Kotak', 
    name: 'Kotak IndianOil Credit Card', 
    baseRewardRate: 1.0, 
    tags: ['Fuel', 'Rewards'], 
    colorFrom: 'from-orange-500', 
    colorTo: 'to-green-600'
  },
  { 
    id: 'kotak-pvr', 
    issuer: 'Kotak', 
    name: 'Kotak PVR INOX Credit Card', 
    baseRewardRate: 1.5, 
    tags: ['Movies', 'Entertainment'], 
    colorFrom: 'from-gray-900', 
    colorTo: 'to-gray-800'
  },
  { 
    id: 'kotak-zen', 
    issuer: 'Kotak', 
    name: 'Kotak Zen Credit Card', 
    baseRewardRate: 1.0, 
    tags: ['Lifestyle', 'Travel'], 
    colorFrom: 'from-amber-800', 
    colorTo: 'to-orange-900'
  },
  { 
    id: 'kotak-white', 
    issuer: 'Kotak', 
    name: 'Kotak White Credit Card', 
    baseRewardRate: 2.0, 
    tags: ['Premium', 'Luxury'], 
    colorFrom: 'from-gray-100', 
    colorTo: 'to-gray-300'
  },
  { 
    id: 'kotak-biz', 
    issuer: 'Kotak', 
    name: 'Kotak BIZ Credit Card', 
    baseRewardRate: 1.0, 
    tags: ['Business', 'Rewards'], 
    colorFrom: 'from-red-700', 
    colorTo: 'to-red-900'
  },
  { 
    id: 'kotak-indigo-xl', 
    issuer: 'Kotak', 
    name: 'Kotak IndiGo XL Credit Card', 
    baseRewardRate: 2.0, 
    tags: ['Travel', 'Co-brand'], 
    colorFrom: 'from-slate-700', 
    colorTo: 'to-slate-800'
  },
  { 
    id: 'kotak-indigo', 
    issuer: 'Kotak', 
    name: 'Kotak IndiGo Credit Card', 
    baseRewardRate: 1.5, 
    tags: ['Travel', 'Co-brand'], 
    colorFrom: 'from-blue-600', 
    colorTo: 'to-blue-800'
  },

  // ==========================
  // AU SMALL FINANCE BANK
  // ==========================
  { 
    id: 'au-zenith-plus', 
    issuer: 'AU', 
    name: 'AU Zenith+ Credit Card', 
    baseRewardRate: 1.5, 
    tags: ['Premium', 'Metal'], 
    colorFrom: 'from-teal-800', 
    colorTo: 'to-teal-950'
  },
  { 
    id: 'au-traverse', 
    issuer: 'AU', 
    name: 'AU Traverse Credit Card', 
    baseRewardRate: 1.25, 
    tags: ['Travel', 'NRI'], 
    colorFrom: 'from-blue-900', 
    colorTo: 'to-indigo-950'
  },
  { 
    id: 'au-lit', 
    issuer: 'AU', 
    name: 'AU LIT Credit Card', 
    baseRewardRate: 1.0, 
    tags: ['Customizable', 'LTF'], 
    colorFrom: 'from-purple-500', 
    colorTo: 'to-pink-500' 
  },

  // ==========================
  // IDFC FIRST BANK
  // ==========================
  { 
    id: 'idfc-hello-cashback', 
    issuer: 'IDFC', 
    name: 'IDFC Hello Cashback', 
    baseRewardRate: 1.0, 
    tags: ['Cashback', 'Shopping'], 
    colorFrom: 'from-pink-500', 
    colorTo: 'to-yellow-500'
  },
  { 
    id: 'idfc-diamond', 
    issuer: 'IDFC', 
    name: 'IDFC Diamond Reserve', 
    baseRewardRate: 1.5, 
    tags: ['Premium', 'Rewards'], 
    colorFrom: 'from-slate-800', 
    colorTo: 'to-black'
  },
  { 
    id: 'idfc-wow-black', 
    issuer: 'IDFC', 
    name: 'IDFC FIRST WOW! Black', 
    baseRewardRate: 1.0, 
    tags: ['Zero Forex', 'Travel'], 
    colorFrom: 'from-gray-900', 
    colorTo: 'to-black'
  },
  { 
    id: 'idfc-gaj', 
    issuer: 'IDFC', 
    name: 'IDFC Gaj Credit Card', 
    baseRewardRate: 2.0, 
    tags: ['Invite Only', 'Metal'], 
    colorFrom: 'from-gray-700', 
    colorTo: 'to-gray-900'
  },
  { 
    id: 'idfc-indigo', 
    issuer: 'IDFC', 
    name: 'IDFC IndiGo FIRST', 
    baseRewardRate: 1.5, 
    tags: ['Travel', 'Co-brand'], 
    colorFrom: 'from-blue-600', 
    colorTo: 'to-blue-800'
  },
  { 
    id: 'idfc-ashva', 
    issuer: 'IDFC', 
    name: 'IDFC Ashva Metal Card', 
    baseRewardRate: 1.5, 
    tags: ['Premium', 'Metal'], 
    colorFrom: 'from-gray-600', 
    colorTo: 'to-gray-800'
  },
  { 
    id: 'idfc-mayura', 
    issuer: 'IDFC', 
    name: 'IDFC Mayura Metal Card', 
    baseRewardRate: 2.0, 
    tags: ['Premium', 'Metal', 'Zero Forex'], 
    colorFrom: 'from-teal-800', 
    colorTo: 'to-black'
  },
  { 
    id: 'idfc-earn', 
    issuer: 'IDFC', 
    name: 'IDFC FIRST EA₹N', 
    baseRewardRate: 1.0, 
    tags: ['Cashback', 'Virtual'], 
    colorFrom: 'from-green-600', 
    colorTo: 'to-emerald-800'
  },
  { 
    id: 'idfc-millennia', 
    issuer: 'IDFC', 
    name: 'IDFC FIRST Millennia', 
    baseRewardRate: 0.75, 
    tags: ['Entry', 'LTF'], 
    colorFrom: 'from-gray-400', 
    colorTo: 'to-gray-600'
  },
  { 
    id: 'idfc-swyp', 
    issuer: 'IDFC', 
    name: 'IDFC FIRST SWYP', 
    baseRewardRate: 0.5, 
    tags: ['Entry', 'GenZ'], 
    colorFrom: 'from-purple-600', 
    colorTo: 'to-pink-600'
  },
  { 
    id: 'idfc-classic', 
    issuer: 'IDFC', 
    name: 'IDFC FIRST Classic', 
    baseRewardRate: 0.5, 
    tags: ['Entry', 'LTF'], 
    colorFrom: 'from-gray-300', 
    colorTo: 'to-gray-500'
  },
  { 
    id: 'idfc-power', 
    issuer: 'IDFC', 
    name: 'IDFC FIRST Power', 
    baseRewardRate: 1.0, 
    tags: ['Fuel', 'Utility'], 
    colorFrom: 'from-red-600', 
    colorTo: 'to-red-800'
  },
  { 
    id: 'idfc-lic', 
    issuer: 'IDFC', 
    name: 'IDFC LIC Credit Card', 
    baseRewardRate: 0.75, 
    tags: ['Insurance', 'Co-brand'], 
    colorFrom: 'from-yellow-400', 
    colorTo: 'to-blue-600'
  },
  { 
    id: 'idfc-select', 
    issuer: 'IDFC', 
    name: 'IDFC FIRST Select', 
    baseRewardRate: 1.0, 
    tags: ['Lifestyle', 'LTF'], 
    colorFrom: 'from-purple-600', 
    colorTo: 'to-indigo-800'
  },
  { 
    id: 'idfc-wealth', 
    issuer: 'IDFC', 
    name: 'IDFC FIRST Wealth', 
    baseRewardRate: 1.5, 
    tags: ['Premium', 'LTF'], 
    colorFrom: 'from-purple-800', 
    colorTo: 'to-black'
  },
  { 
    id: 'idfc-wow-fd', 
    issuer: 'IDFC', 
    name: 'IDFC FIRST WOW FD', 
    baseRewardRate: 1.0, 
    tags: ['Secured', 'Entry'], 
    colorFrom: 'from-blue-500', 
    colorTo: 'to-purple-600'
  },
  { 
    id: 'idfc-private', 
    issuer: 'IDFC', 
    name: 'IDFC FIRST Private', 
    baseRewardRate: 2.5, 
    tags: ['Invite Only', 'Luxury'], 
    colorFrom: 'from-gray-800', 
    colorTo: 'to-black'
  },

  // ==========================
  // STANDARD CHARTERED
  // ==========================
  { 
    id: 'sc-rewards', 
    issuer: 'SC', 
    name: 'SC Rewards Credit Card', 
    baseRewardRate: 1.0, 
    tags: ['Rewards', 'Shopping'], 
    colorFrom: 'from-blue-800', 
    colorTo: 'to-blue-950'
  },
  { 
    id: 'sc-easemytrip', 
    issuer: 'SC', 
    name: 'SC EaseMyTrip Card', 
    baseRewardRate: 1.0, 
    tags: ['Travel', 'Co-brand'], 
    colorFrom: 'from-sky-400', 
    colorTo: 'to-blue-600'
  },
  { 
    id: 'sc-smart', 
    issuer: 'SC', 
    name: 'SC Smart Credit Card', 
    baseRewardRate: 2.0, 
    tags: ['Online', 'Cashback'], 
    colorFrom: 'from-emerald-600', 
    colorTo: 'to-emerald-800'
  },
  { 
    id: 'sc-ultimate', 
    issuer: 'SC', 
    name: 'SC Ultimate Credit Card', 
    baseRewardRate: 3.3, 
    tags: ['Premium', 'All Rounder'], 
    colorFrom: 'from-gray-800', 
    colorTo: 'to-black',
    imageUrl: 'https://www.sc.com/in/mas/credit-cards/ultimate-card/images/ultimate-card-card-face.png' 
  },
  { 
    id: 'sc-platinum', 
    issuer: 'SC', 
    name: 'SC Platinum Rewards', 
    baseRewardRate: 1.0, 
    tags: ['Dining', 'Fuel'], 
    colorFrom: 'from-gray-400', 
    colorTo: 'to-gray-600'
  },
  { 
    id: 'sc-titanium', 
    issuer: 'SC', 
    name: 'SC Super Value Titanium', 
    baseRewardRate: 5.0, 
    tags: ['Fuel', 'Utilities'], 
    colorFrom: 'from-gray-300', 
    colorTo: 'to-gray-500'
  },
  { 
    id: 'sc-manhattan', 
    issuer: 'SC', 
    name: 'SC Manhattan Credit Card', 
    baseRewardRate: 5.0, 
    tags: ['Grocery', 'Shopping'], 
    colorFrom: 'from-slate-700', 
    colorTo: 'to-slate-900'
  },
  { 
    id: 'sc-priority', 
    issuer: 'SC', 
    name: 'SC Priority Visa Infinite', 
    baseRewardRate: 2.0, 
    tags: ['Premium', 'Banking'], 
    colorFrom: 'from-black', 
    colorTo: 'to-gray-900'
  },
  { 
    id: 'sc-digismart', 
    issuer: 'SC', 
    name: 'SC DigiSmart Credit Card', 
    baseRewardRate: 1.0, 
    tags: ['Online', 'Shopping'], 
    colorFrom: 'from-blue-600', 
    colorTo: 'to-cyan-600' 
  },

  // ==========================
  // RBL BANK
  // ==========================
  { 
    id: 'rbl-platinum-maxima', 
    issuer: 'RBL', 
    name: 'RBL Platinum Maxima Plus', 
    baseRewardRate: 1.0, 
    tags: ['Rewards', 'Lifestyle'], 
    colorFrom: 'from-blue-800', 
    colorTo: 'to-purple-900'
  },
  { 
    id: 'rbl-icon', 
    issuer: 'RBL', 
    name: 'RBL Icon Credit Card', 
    baseRewardRate: 1.25, 
    tags: ['Premium', 'Experiences'], 
    colorFrom: 'from-black', 
    colorTo: 'to-gray-800'
  },
];

export const CATEGORIES = [
  Category.Shopping,
  Category.Travel,
  Category.Dining,
  Category.Movies,
  Category.Fuel,
  Category.Utilities,
  Category.Grocery,
  Category.Other
];

export const POPULAR_MERCHANTS = [
  'Amazon', 'Flipkart', 'Myntra', 'Swiggy', 'Zomato', 'BookMyShow', 
  'MakeMyTrip', 'Uber', 'Ola', 'BigBasket', 'Blinkit', 'JioMart', 'Air India',
  'Tata Neu', 'Cleartrip', 'Agoda', 'Netflix', 'Spotify'
];

export const INITIAL_WALLET_IDS = ['hdfc-diners-black', 'icici-amazon', 'axis-magnus', 'sbi-cashback'];

export const BANK_NAMES: Record<CardIssuer, string> = {
  'HDFC': 'HDFC Bank',
  'ICICI': 'ICICI Bank',
  'Axis': 'Axis Bank',
  'SBI': 'SBI Bank',
  'AMEX': 'American Express',
  'Citi': 'Citibank',
  'SC': 'Standard Chartered',
  'IDFC': 'IDFC First Bank',
  'Kotak': 'Kotak Mahindra Bank',
  'AU': 'AU Small Finance Bank',
  'RBL': 'RBL Bank',
  'HSBC': 'HSBC'
};