import { MarketAsset, NewsItem, MarketStatus, EconomicEvent, CandleData, OrderBookEntry } from '../types';

export const US_FLAG_URL = "https://lh3.googleusercontent.com/aida-public/AB6AXuBUxIavamj3de2hZHDmfEhvnf9RYDh7dNAiWmPD_4fz5rKsSNgXvl5A0TzWNwLGyKa3Xg7Q11XOI5U5anrmTQYtMih2tc_u4ETCJcwoSP0CCSRf25IlR3QcOIc2JVGnsCvLXLDeVHy4Z7UwFm0UV94Nm4p0YiGo2D0zd769MC_FcxypPEOZnp1Rb63kyFWFQ__P4U8vTNbklhINozeblOB54n9VMITrZ1x8OapCxQgDAMx36ciMNHPk";

export const INITIAL_ASSETS: MarketAsset[] = [
  // Major Indices (Featured in top grid)
  {
    id: 'sp500',
    symbol: 'S&P 500',
    name: 'S&P 500 Index',
    category: 'indices',
    region: 'Americas',
    price: 5983.25,
    change: 32.40,
    changePercent: 0.54,
    currency: 'USD',
    sparkline: [5940, 5952, 5948, 5965, 5960, 5978, 5983.25],
    high24h: 5994.10,
    low24h: 5938.20,
    openPrice: 5950.85,
    volume: '2.84B',
    marketCap: '$45.8T',
    marketCapRaw: 45800,
    peRatio: 26.4,
    beta: 1.0,
    rsi14: 64.2,
    analystRating: 'Buy',
    targetPrice: 6200.00,
    week52High: 6025.50,
    week52Low: 4953.56,
    badge: {
      text: '500',
      bgClass: 'bg-[#F23645]',
      textClass: 'text-white'
    },
    description: 'The Standard and Poor\'s 500 is a stock market index tracking the stock performance of 500 of the largest companies listed on stock exchanges in the United States.',
    sector: 'Broad Market Index',
    isFeatured: true
  },
  {
    id: 'nasdaq100',
    symbol: 'Nasdaq 100',
    name: 'Nasdaq 100 Index',
    category: 'indices',
    region: 'Americas',
    price: 21184.60,
    change: 184.20,
    changePercent: 0.88,
    currency: 'USD',
    sparkline: [20950, 21020, 21080, 21040, 21120, 21160, 21184.60],
    high24h: 21240.00,
    low24h: 20920.50,
    openPrice: 21000.40,
    volume: '4.12B',
    marketCap: '$24.2T',
    marketCapRaw: 24200,
    peRatio: 31.8,
    beta: 1.22,
    rsi14: 68.5,
    analystRating: 'Strong Buy',
    targetPrice: 22500.00,
    week52High: 21350.25,
    week52Low: 16973.94,
    badge: {
      text: '100',
      bgClass: 'bg-[#004ee8]',
      textClass: 'text-white'
    },
    description: 'The Nasdaq-100 is a stock market index made up of 101 equity securities issued by 100 of the largest non-financial companies listed on the Nasdaq stock market.',
    sector: 'Technology & Growth Index',
    isFeatured: true
  },

  // World Indices
  {
    id: 'ni225',
    symbol: 'NI225',
    name: 'Japan 225 Index',
    category: 'indices',
    region: 'Asia-Pacific',
    price: 38780.14,
    change: -142.30,
    changePercent: -0.37,
    currency: 'JPY',
    sparkline: [38980, 38920, 38850, 38890, 38810, 38760, 38780.14],
    high24h: 39120.00,
    low24h: 38650.00,
    openPrice: 38922.44,
    volume: '1.45B',
    marketCap: '¥850T',
    marketCapRaw: 5600,
    peRatio: 16.8,
    beta: 0.85,
    rsi14: 48.3,
    analystRating: 'Hold',
    targetPrice: 40500.00,
    week52High: 42426.77,
    week52Low: 31458.42,
    badge: {
      text: '225',
      bgClass: 'bg-[#004ee8]',
      textClass: 'text-white'
    },
    description: 'The Nikkei 225 is a price-weighted index composed of Japan\'s top 225 blue-chip companies traded on the Tokyo Stock Exchange.',
    sector: 'Asian Equities Index',
    isFeatured: true
  },
  {
    id: 'ukx',
    symbol: 'UKX',
    name: 'FTSE 100',
    category: 'indices',
    region: 'Europe',
    price: 8324.80,
    change: 18.90,
    changePercent: 0.23,
    currency: 'GBP',
    sparkline: [8295, 8310, 8305, 8318, 8322, 8320, 8324.80],
    high24h: 8345.50,
    low24h: 8288.10,
    openPrice: 8305.90,
    volume: '890M',
    marketCap: '£2.1T',
    marketCapRaw: 2650,
    peRatio: 13.4,
    beta: 0.72,
    rsi14: 53.1,
    analystRating: 'Buy',
    targetPrice: 8650.00,
    week52High: 8487.62,
    week52Low: 7384.14,
    badge: {
      text: '100',
      bgClass: 'bg-[#434656]',
      textClass: 'text-white'
    },
    description: 'The FTSE 100 Index is a share index of the 100 companies listed on the London Stock Exchange with the highest market capitalization.',
    sector: 'European Equities Index',
    isFeatured: true
  },
  {
    id: 'dax',
    symbol: 'DAX',
    name: 'German DAX 40',
    category: 'indices',
    region: 'Europe',
    price: 19456.20,
    change: 98.40,
    changePercent: 0.51,
    currency: 'EUR',
    sparkline: [19320, 19370, 19390, 19410, 19440, 19456.20],
    high24h: 19490.00,
    low24h: 19310.00,
    openPrice: 19357.80,
    volume: '620M',
    marketCap: '€1.8T',
    marketCapRaw: 1950,
    peRatio: 14.9,
    rsi14: 59.4,
    analystRating: 'Buy',
    targetPrice: 20200.00,
    week52High: 19674.68,
    week52Low: 14630.21,
    badge: {
      text: '40',
      bgClass: 'bg-[#da2237]',
      textClass: 'text-white'
    },
    description: 'The DAX is a blue chip stock market index consisting of the 40 major German companies trading on the Frankfurt Stock Exchange.',
    sector: 'European Equities Index'
  },
  {
    id: 'hsi',
    symbol: 'HSI',
    name: 'Hang Seng Index',
    category: 'indices',
    region: 'Asia-Pacific',
    price: 20435.50,
    change: 320.10,
    changePercent: 1.59,
    currency: 'HKD',
    sparkline: [20100, 20180, 20250, 20380, 20410, 20435.50],
    high24h: 20510.00,
    low24h: 20080.00,
    openPrice: 20115.40,
    volume: '1.92B',
    marketCap: 'HK$32T',
    marketCapRaw: 4100,
    peRatio: 9.8,
    rsi14: 62.1,
    analystRating: 'Buy',
    targetPrice: 22000.00,
    week52High: 23241.74,
    week52Low: 14794.16,
    badge: {
      text: 'HSI',
      bgClass: 'bg-[#20a28a]',
      textClass: 'text-white'
    },
    description: 'The Hang Seng Index is a freefloat-adjusted market-capitalization-weighted stock-market index in Hong Kong.',
    sector: 'Asian Equities Index'
  },

  // US Stocks
  {
    id: 'nvda',
    symbol: 'NVIDIA',
    name: 'NVIDIA Corporation',
    category: 'stocks',
    region: 'Americas',
    price: 142.85,
    change: 4.65,
    changePercent: 3.36,
    currency: 'USD',
    sparkline: [137.5, 138.9, 139.4, 141.2, 140.8, 142.85],
    high24h: 144.20,
    low24h: 137.10,
    openPrice: 138.20,
    volume: '64.8M',
    marketCap: '$3.52T',
    marketCapRaw: 3520,
    peRatio: 58.4,
    dividendYield: '0.03%',
    beta: 1.68,
    rsi14: 72.4,
    analystRating: 'Strong Buy',
    targetPrice: 175.00,
    week52High: 149.77,
    week52Low: 45.41,
    badge: {
      bgClass: 'bg-[#14532d]',
      customColor: '#166534'
    },
    description: 'NVIDIA Corporation designs graphics processing units for gaming and professional markets, as well as system on a chip units for the mobile computing and automotive market, leading the AI compute revolution.',
    sector: 'Semiconductors & AI Hardware',
    isFeatured: true
  },
  {
    id: 'aapl',
    symbol: 'Apple',
    name: 'Apple Inc.',
    category: 'stocks',
    region: 'Americas',
    price: 234.90,
    change: -1.15,
    changePercent: -0.49,
    currency: 'USD',
    sparkline: [236.4, 235.8, 236.1, 234.9, 235.2, 234.90],
    high24h: 237.25,
    low24h: 233.80,
    openPrice: 236.05,
    volume: '48.2M',
    marketCap: '$3.58T',
    marketCapRaw: 3580,
    peRatio: 36.1,
    dividendYield: '0.43%',
    beta: 0.94,
    rsi14: 51.8,
    analystRating: 'Buy',
    targetPrice: 260.00,
    week52High: 237.49,
    week52Low: 164.08,
    badge: {
      bgClass: 'bg-black',
      customColor: '#000000'
    },
    description: 'Apple Inc. designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories, and sells a variety of related services.',
    sector: 'Consumer Electronics & Services',
    isFeatured: true
  },
  {
    id: 'msft',
    symbol: 'Microsoft',
    name: 'Microsoft Corporation',
    category: 'stocks',
    region: 'Americas',
    price: 428.50,
    change: 3.20,
    changePercent: 0.75,
    currency: 'USD',
    sparkline: [424.0, 425.2, 427.0, 426.5, 428.50],
    high24h: 430.10,
    low24h: 423.80,
    openPrice: 425.30,
    volume: '18.9M',
    marketCap: '$3.18T',
    marketCapRaw: 3180,
    peRatio: 34.2,
    dividendYield: '0.78%',
    beta: 1.15,
    rsi14: 58.6,
    analystRating: 'Strong Buy',
    targetPrice: 490.00,
    week52High: 468.35,
    week52Low: 366.50,
    badge: {
      bgClass: 'bg-[#00a4ef]',
      text: 'MSFT'
    },
    description: 'Microsoft develops and supports software, services, devices and cloud solutions including Azure, Windows, Office 365, and AI integrations.',
    sector: 'Cloud & Enterprise Software'
  },
  {
    id: 'tsla',
    symbol: 'Tesla',
    name: 'Tesla, Inc.',
    category: 'stocks',
    region: 'Americas',
    price: 342.10,
    change: 14.80,
    changePercent: 4.52,
    currency: 'USD',
    sparkline: [325.0, 331.0, 336.5, 338.0, 342.10],
    high24h: 348.00,
    low24h: 324.50,
    openPrice: 327.30,
    volume: '92.4M',
    marketCap: '$1.09T',
    marketCapRaw: 1090,
    peRatio: 112.5,
    dividendYield: 'N/A',
    beta: 2.31,
    rsi14: 76.8,
    analystRating: 'Buy',
    targetPrice: 380.00,
    week52High: 358.64,
    week52Low: 138.80,
    badge: {
      bgClass: 'bg-[#e82127]',
      text: 'TSLA'
    },
    description: 'Tesla designs, develops, manufactures, sells, and leases electric vehicles, energy generation and storage systems, and offers services related to its products.',
    sector: 'Automotive & Clean Energy'
  },
  {
    id: 'googl',
    symbol: 'Alphabet',
    name: 'Alphabet Inc. (Google)',
    category: 'stocks',
    region: 'Americas',
    price: 182.40,
    change: 1.85,
    changePercent: 1.02,
    currency: 'USD',
    sparkline: [179.8, 180.5, 181.2, 181.8, 182.40],
    high24h: 183.50,
    low24h: 179.20,
    openPrice: 180.55,
    volume: '22.1M',
    marketCap: '$2.24T',
    marketCapRaw: 2240,
    peRatio: 23.8,
    dividendYield: '0.44%',
    beta: 1.08,
    rsi14: 61.2,
    analystRating: 'Strong Buy',
    targetPrice: 205.00,
    week52High: 193.31,
    week52Low: 129.40,
    badge: {
      bgClass: 'bg-[#ea4335]',
      text: 'GOOG'
    },
    description: 'Alphabet is a global tech giant operating Google Search, YouTube, Android, Google Cloud, and developing advanced AI systems like Gemini.',
    sector: 'Internet Content & Information'
  },

  // Crypto Assets
  {
    id: 'btc',
    symbol: 'BTC/USD',
    name: 'Bitcoin',
    category: 'crypto',
    region: 'Global',
    price: 96420.00,
    change: 2150.00,
    changePercent: 2.28,
    currency: 'USD',
    sparkline: [93800, 94200, 95100, 94800, 95900, 96420.00],
    high24h: 97850.00,
    low24h: 93400.00,
    openPrice: 94270.00,
    volume: '$48.5B',
    marketCap: '$1.91T',
    marketCapRaw: 1910,
    rsi14: 70.5,
    analystRating: 'Strong Buy',
    targetPrice: 120000.00,
    week52High: 104500.00,
    week52Low: 49000.00,
    badge: {
      text: '₿',
      bgClass: 'bg-[#f7931a]',
      textClass: 'text-white'
    },
    description: 'Bitcoin is the first decentralized digital cryptocurrency enabling instant peer-to-peer payments across borders without intermediaries.',
    sector: 'Digital Store of Value'
  },
  {
    id: 'eth',
    symbol: 'ETH/USD',
    name: 'Ethereum',
    category: 'crypto',
    region: 'Global',
    price: 2745.80,
    change: 62.40,
    changePercent: 2.33,
    currency: 'USD',
    sparkline: [2660, 2685, 2720, 2710, 2735, 2745.80],
    high24h: 2780.00,
    low24h: 2650.00,
    openPrice: 2683.40,
    volume: '$22.8B',
    marketCap: '$330.4B',
    marketCapRaw: 330,
    rsi14: 63.8,
    analystRating: 'Buy',
    targetPrice: 3500.00,
    week52High: 4093.00,
    week52Low: 2110.00,
    badge: {
      text: 'Ξ',
      bgClass: 'bg-[#627eea]',
      textClass: 'text-white'
    },
    description: 'Ethereum is a decentralized open-source blockchain featuring smart contract functionality and underpinning the DeFi and NFT ecosystems.',
    sector: 'Smart Contract Platform'
  },
  {
    id: 'sol',
    symbol: 'SOL/USD',
    name: 'Solana',
    category: 'crypto',
    region: 'Global',
    price: 198.40,
    change: 11.20,
    changePercent: 5.98,
    currency: 'USD',
    sparkline: [184, 188, 192, 190, 196, 198.40],
    high24h: 202.50,
    low24h: 182.00,
    openPrice: 187.20,
    volume: '$7.4B',
    marketCap: '$94.2B',
    marketCapRaw: 94,
    rsi14: 74.2,
    analystRating: 'Strong Buy',
    targetPrice: 260.00,
    week52High: 260.06,
    week52Low: 110.00,
    badge: {
      text: 'SOL',
      bgClass: 'bg-[#14f195]',
      textClass: 'text-black'
    },
    description: 'Solana is a high-performance blockchain supporting builders with high transaction throughput and low fees.',
    sector: 'Layer 1 Blockchain'
  },

  // Futures
  {
    id: 'cl1',
    symbol: 'Crude Oil',
    name: 'Crude Oil WTI Futures',
    category: 'futures',
    region: 'Americas',
    price: 71.45,
    change: -0.85,
    changePercent: -1.18,
    currency: 'USD',
    sparkline: [72.8, 72.4, 72.1, 71.9, 71.45],
    high24h: 73.10,
    low24h: 70.90,
    openPrice: 72.30,
    volume: '340K',
    week52High: 87.67,
    week52Low: 65.27,
    rsi14: 43.1,
    badge: {
      text: 'CL',
      bgClass: 'bg-[#854d0e]',
      textClass: 'text-white'
    },
    description: 'West Texas Intermediate crude oil futures contract, the global benchmark for petroleum prices.',
    sector: 'Energy Commodities'
  },
  {
    id: 'gc1',
    symbol: 'Gold',
    name: 'Gold Futures (100oz)',
    category: 'futures',
    region: 'Global',
    price: 2914.30,
    change: 18.50,
    changePercent: 0.64,
    currency: 'USD',
    sparkline: [2890, 2898, 2905, 2908, 2914.30],
    high24h: 2925.00,
    low24h: 2888.00,
    openPrice: 2895.80,
    volume: '210K',
    week52High: 2942.50,
    week52Low: 1984.20,
    rsi14: 67.2,
    badge: {
      text: 'GC',
      bgClass: 'bg-[#ca8a04]',
      textClass: 'text-white'
    },
    description: 'Gold futures traded on COMEX, serving as the world\'s primary safe haven commodity and store of value.',
    sector: 'Precious Metals'
  },

  // Forex
  {
    id: 'eurusd',
    symbol: 'EUR/USD',
    name: 'Euro / US Dollar',
    category: 'forex',
    region: 'Global',
    price: 1.0482,
    change: 0.0028,
    changePercent: 0.27,
    currency: 'USD',
    sparkline: [1.0450, 1.0462, 1.0475, 1.0470, 1.0482],
    high24h: 1.0512,
    low24h: 1.0440,
    openPrice: 1.0454,
    volume: '$480B',
    week52High: 1.1214,
    week52Low: 1.0332,
    badge: {
      text: '€/$',
      bgClass: 'bg-[#1d4ed8]',
      textClass: 'text-white'
    },
    description: 'The most traded currency pair globally, measuring the value of one Euro expressed in US Dollars.',
    sector: 'Major Forex Pair'
  },
  {
    id: 'usdjpy',
    symbol: 'USD/JPY',
    name: 'US Dollar / Japanese Yen',
    category: 'forex',
    region: 'Asia-Pacific',
    price: 154.22,
    change: -0.48,
    changePercent: -0.31,
    currency: 'JPY',
    sparkline: [154.80, 154.65, 154.40, 154.50, 154.22],
    high24h: 155.10,
    low24h: 153.90,
    openPrice: 154.70,
    volume: '$310B',
    week52High: 161.95,
    week52Low: 139.58,
    badge: {
      text: '$/¥',
      bgClass: 'bg-[#b91c1c]',
      textClass: 'text-white'
    },
    description: 'The US Dollar to Japanese Yen exchange rate pair, representing cross-Pacific trade liquidity and interest rate differentials.',
    sector: 'Major Forex Pair'
  },

  // Bonds
  {
    id: 'us10y',
    symbol: 'US 10Y',
    name: 'US 10-Year Treasury Yield',
    category: 'bonds',
    region: 'Americas',
    price: 4.542,
    change: 0.038,
    changePercent: 0.84,
    currency: '%',
    sparkline: [4.495, 4.510, 4.525, 4.530, 4.542],
    high24h: 4.568,
    low24h: 4.488,
    openPrice: 4.504,
    volume: 'Benchmark',
    week52High: 4.997,
    week52Low: 3.602,
    badge: {
      text: '10Y',
      bgClass: 'bg-[#475569]',
      textClass: 'text-white'
    },
    description: 'The yield on the 10-year US Treasury note serves as the global benchmark rate for mortgage rates, debt instruments, and equity valuation models.',
    sector: 'Government Sovereign Debt'
  },
  {
    id: 'us2y',
    symbol: 'US 2Y',
    name: 'US 2-Year Treasury Yield',
    category: 'bonds',
    region: 'Americas',
    price: 4.286,
    change: -0.015,
    changePercent: -0.35,
    currency: '%',
    sparkline: [4.305, 4.298, 4.290, 4.295, 4.286],
    high24h: 4.320,
    low24h: 4.275,
    openPrice: 4.301,
    volume: 'Benchmark',
    week52High: 5.084,
    week52Low: 3.524,
    badge: {
      text: '2Y',
      bgClass: 'bg-[#334155]',
      textClass: 'text-white'
    },
    description: 'The 2-year US Treasury yield tracks market expectations of upcoming Federal Reserve monetary policy interest rate adjustments.',
    sector: 'Short-Term Sovereign Debt'
  }
];

export const NEWS_ITEMS: NewsItem[] = [
  {
    id: 'news-1',
    title: 'NVIDIA Unveils Next-Gen AI Silicon Architecture with 3x Efficiency Gains',
    source: 'Bloomberg Markets',
    timeAgo: '12m ago',
    category: 'Tech & AI',
    sentiment: 'bullish',
    relatedSymbols: ['NVDA', 'Nasdaq 100', 'MSFT'],
    summary: 'The chipmaker announced landmark developments in datacenter accelerated computing, exceeding analyst forecasts on hyperscaler order volume.',
    readTime: '3 min',
    impactScore: 9
  },
  {
    id: 'news-2',
    title: 'Federal Reserve Minutes Signal Cautious Rate Trajectory Amid Resilient Labor Data',
    source: 'Financial Times',
    timeAgo: '35m ago',
    category: 'Macro Economy',
    sentiment: 'neutral',
    relatedSymbols: ['S&P 500', 'US 10Y', 'EUR/USD'],
    summary: 'Policymakers noted inflation progress while emphasizing commitment to quantitative equilibrium before initiating further benchmark easing.',
    readTime: '4 min',
    impactScore: 8
  },
  {
    id: 'news-3',
    title: 'Bitcoin Consolidates Near Record Heights as Institutional ETF Inflows Surge',
    source: 'CoinDesk',
    timeAgo: '1h ago',
    category: 'Crypto',
    sentiment: 'bullish',
    relatedSymbols: ['BTC/USD', 'ETH/USD', 'SOL/USD'],
    summary: 'Spot digital asset ETFs recorded over $1.2B in net weekly creations as sovereign wealth and asset managers broaden portfolio allocations.',
    readTime: '2 min',
    impactScore: 9
  },
  {
    id: 'news-4',
    title: 'European Central Bank Holds Stance; DAX & FTSE 100 Reach New Monthly Pivots',
    source: 'Reuters',
    timeAgo: '2h ago',
    category: 'Global Markets',
    sentiment: 'bullish',
    relatedSymbols: ['DAX', 'UKX', 'NI225'],
    summary: 'Eurozone equities found renewed momentum following stabilization in energy export figures and stronger manufacturing outlooks.',
    readTime: '3 min',
    impactScore: 7
  },
  {
    id: 'news-5',
    title: 'Crude Oil Pressured by Rising US Inventory Buffers and Refining Output',
    source: 'Wall Street Journal',
    timeAgo: '3h ago',
    category: 'Commodities',
    sentiment: 'bearish',
    relatedSymbols: ['Crude Oil', 'Gold'],
    summary: 'WTI futures eased under $72 per barrel after EIA weekly petroleum status report revealed larger than anticipated commercial stockpiles.',
    readTime: '3 min',
    impactScore: 6
  }
];

export const MARKET_STATUSES: MarketStatus[] = [
  {
    market: 'New York (NYSE / NASDAQ)',
    exchange: 'NYSE',
    city: 'New York',
    country: 'United States',
    flag: '🇺🇸',
    status: 'open',
    localTime: '09:40 AM EST',
    tradingHours: '09:30 - 16:00 EST',
    volatilityIndex: 'VIX: 13.84 (-0.42)'
  },
  {
    market: 'London Stock Exchange',
    exchange: 'LSE',
    city: 'London',
    country: 'United Kingdom',
    flag: '🇬🇧',
    status: 'open',
    localTime: '14:40 GMT',
    tradingHours: '08:00 - 16:30 GMT',
    volatilityIndex: 'VFTSE: 12.10'
  },
  {
    market: 'Tokyo Stock Exchange',
    exchange: 'TSE',
    city: 'Tokyo',
    country: 'Japan',
    flag: '🇯🇵',
    status: 'closed',
    localTime: '23:40 JST',
    tradingHours: '09:00 - 15:30 JST',
    volatilityIndex: 'JNIV: 18.20'
  },
  {
    market: 'Hong Kong Exchanges',
    exchange: 'HKEX',
    city: 'Hong Kong',
    country: 'Hong Kong',
    flag: '🇭🇰',
    status: 'closed',
    localTime: '22:40 HKT',
    tradingHours: '09:30 - 16:00 HKT',
    volatilityIndex: 'VHSI: 22.40'
  },
  {
    market: 'Global Crypto & FX',
    exchange: '24/7 Decentralized',
    city: 'Global',
    country: 'Global',
    flag: '🌐',
    status: '24/7',
    localTime: 'Live Realtime',
    tradingHours: '24 Hours / 7 Days',
    volatilityIndex: 'BVOL: 52.1%'
  }
];

export const ECONOMIC_EVENTS: EconomicEvent[] = [
  {
    id: 'eco-1',
    time: '08:30 EST',
    currency: 'USD',
    event: 'Core CPI (MoM) (Jan)',
    impact: 'high',
    actual: '0.3%',
    forecast: '0.3%',
    previous: '0.3%'
  },
  {
    id: 'eco-2',
    time: '10:00 EST',
    currency: 'USD',
    event: 'ISM Manufacturing PMI',
    impact: 'high',
    actual: '49.3',
    forecast: '49.0',
    previous: '48.4'
  },
  {
    id: 'eco-3',
    time: '14:00 EST',
    currency: 'USD',
    event: 'FOMC Meeting Minutes',
    impact: 'high',
    previous: '5.25%'
  },
  {
    id: 'eco-4',
    time: '23:50 JST',
    currency: 'JPY',
    event: 'Bank of Japan Core CPI (YoY)',
    impact: 'medium',
    forecast: '2.4%',
    previous: '2.5%'
  }
];

// Helper to generate realistic Level 2 Order Book entries
export function generateOrderBook(currentPrice: number): { bids: OrderBookEntry[]; asks: OrderBookEntry[] } {
  const bids: OrderBookEntry[] = [];
  const asks: OrderBookEntry[] = [];
  const spread = currentPrice * 0.0004;

  let cumBidTotal = 0;
  for (let i = 1; i <= 6; i++) {
    const price = currentPrice - spread * i;
    const size = Math.floor(Math.random() * 450) + 50;
    cumBidTotal += size;
    bids.push({
      price: Number(price.toFixed(currentPrice < 5 ? 4 : 2)),
      size,
      total: cumBidTotal
    });
  }

  let cumAskTotal = 0;
  for (let i = 1; i <= 6; i++) {
    const price = currentPrice + spread * i;
    const size = Math.floor(Math.random() * 450) + 50;
    cumAskTotal += size;
    asks.push({
      price: Number(price.toFixed(currentPrice < 5 ? 4 : 2)),
      size,
      total: cumAskTotal
    });
  }

  return { bids, asks };
}

// Generate realistic technical indicator-loaded candle bars
export function generateCandles(basePrice: number, timeframe: string, count: number = 42): CandleData[] {
  const candles: CandleData[] = [];
  let currentPrice = basePrice * 0.93;
  const now = Date.now();
  
  const stepMinutes = timeframe === '1D' ? 15 : timeframe === '5D' ? 60 : timeframe === '1M' ? 360 : timeframe === '6M' ? 1440 : 2880;

  for (let i = count; i >= 0; i--) {
    const timestamp = now - i * stepMinutes * 60 * 1000;
    const dateObj = new Date(timestamp);
    const timeStr = timeframe === '1D' 
      ? dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      : `${dateObj.getMonth() + 1}/${dateObj.getDate()}`;

    const delta = (Math.random() - 0.47) * (basePrice * 0.014);
    const open = currentPrice;
    const close = Math.max(open + delta, basePrice * 0.4);
    const high = Math.max(open, close) + Math.random() * (basePrice * 0.007);
    const low = Math.min(open, close) - Math.random() * (basePrice * 0.007);
    const volume = Math.floor(Math.random() * 60000) + 12000;

    candles.push({
      time: timeStr,
      timestamp,
      open: Number(open.toFixed(2)),
      high: Number(high.toFixed(2)),
      low: Number(low.toFixed(2)),
      close: Number(close.toFixed(2)),
      volume
    });

    currentPrice = close;
  }

  if (candles.length > 0) {
    candles[candles.length - 1].close = basePrice;
  }

  // Calculate EMA 20 & SMA 50
  let ema = candles[0].close;
  const k = 2 / (20 + 1);

  candles.forEach((c, idx) => {
    ema = c.close * k + ema * (1 - k);
    c.ema20 = Number(ema.toFixed(2));

    // SMA 50
    const startIdx = Math.max(0, idx - 14);
    const subset = candles.slice(startIdx, idx + 1);
    const sma = subset.reduce((acc, val) => acc + val.close, 0) / subset.length;
    c.sma50 = Number(sma.toFixed(2));

    // Simulated RSI between 30 and 78
    const rsiVal = 50 + Math.sin(idx * 0.4) * 18 + ((c.close - c.open) / c.open) * 80;
    c.rsi = Number(Math.min(Math.max(rsiVal, 22), 85).toFixed(1));
  });

  return candles;
}
