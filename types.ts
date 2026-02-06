export type CardIssuer = 'HDFC' | 'ICICI' | 'Axis' | 'SBI' | 'AMEX' | 'Citi' | 'SC' | 'IDFC' | 'Kotak' | 'AU' | 'RBL' | 'HSBC';
export type CardNetwork = 'Visa' | 'MasterCard' | 'Rupay' | 'Amex' | 'Diners';

export interface CardDefinition {
  id: string;
  issuer: CardIssuer;
  name: string;
  baseRewardRate: number; // Percentage
  tags: string[];
  colorFrom: string;
  colorTo: string;
  imageUrl?: string;
  network?: CardNetwork;
}

export interface SavedCard {
  id: string;
  customImageUrl?: string;
  addedAt: number;
}

export interface User {
  email: string;
  name?: string;
  wallet: SavedCard[];
  authProvider: 'email' | 'google';
  profilePicture?: string;
}

export interface Recommendation {
  cardId: string;
  cardName: string;
  issuer: CardIssuer;
  effectiveRate: number; // Percentage
  projectedSavings: number; // In Rupees
  rewardType: 'Cashback' | 'Points' | 'Miles';
  pointsEarned: number;
  reason: string; // "5% on Amazon"
  redemptionTip: string; // "Transfer to Airmiles"
  rank: number;
}

export interface UserQuery {
  category: string;
  merchant: string;
  amount: number;
}

export enum Category {
  Shopping = 'Shopping',
  Travel = 'Travel',
  Dining = 'Dining',
  Movies = 'Movies',
  Fuel = 'Fuel',
  Utilities = 'Utilities',
  Grocery = 'Grocery',
  Other = 'Other'
}