export type MarketCategory = 'indices' | 'stocks' | 'crypto' | 'futures' | 'forex' | 'bonds';

export type MarketRegion = 'All' | 'Americas' | 'Europe' | 'Asia-Pacific' | 'Global';

export type ChartTimeframe = '1D' | '5D' | '1M' | '6M' | '1Y' | 'ALL';

export interface CandleData {
  time: string;
  timestamp: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface MarketAsset {
  id: string;
  symbol: string;
  name: string;
  category: MarketCategory;
  region: MarketRegion;
  price: number;
  change: number;
  changePercent: number;
  currency: string;
  sparkline: number[];
  high24h: number;
  low24h: number;
  openPrice: number;
  volume: string;
  marketCap?: string;
  peRatio?: number;
  dividendYield?: string;
  week52High?: number;
  week52Low?: number;
  badge: {
    text?: string;
    bgClass?: string;
    textClass?: string;
    customColor?: string;
    flagUrl?: string;
  };
  description: string;
  sector?: string;
  isFeatured?: boolean;
}

export interface NewsItem {
  id: string;
  title: string;
  source: string;
  timeAgo: string;
  category: string;
  sentiment: 'bullish' | 'bearish' | 'neutral';
  relatedSymbols: string[];
  summary: string;
  url?: string;
  readTime: string;
}

export interface MarketStatus {
  market: string;
  exchange: string;
  city: string;
  country: string;
  flag: string;
  status: 'open' | 'closed' | 'pre-market' | 'after-hours' | '24/7';
  localTime: string;
  tradingHours: string;
}

export interface EconomicEvent {
  id: string;
  time: string;
  currency: string;
  event: string;
  impact: 'high' | 'medium' | 'low';
  actual?: string;
  forecast?: string;
  previous: string;
}
