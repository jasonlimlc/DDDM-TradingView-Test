import React, { useState, useMemo } from 'react';
import {
  MarketAsset,
  ChartTimeframe,
  ChartMode,
  TechnicalIndicator,
  CandleData,
  Position,
} from '../types';
import { generateCandles, generateOrderBook } from '../data/marketData';
import { sounds } from '../utils/audio';
import {
  X,
  Star,
  TrendingUp,
  TrendingDown,
  Activity,
  BarChart2,
  Sliders,
  Bell,
  Check,
  Zap,
  DollarSign,
  Layers,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react';

interface AssetDetailModalProps {
  asset: MarketAsset | null;
  onClose: () => void;
  isWatchlisted: boolean;
  onToggleWatchlist: (assetId: string) => void;
  onOpenPosition?: (position: Position) => void;
}

export const AssetDetailModal: React.FC<AssetDetailModalProps> = ({
  asset,
  onClose,
  isWatchlisted,
  onToggleWatchlist,
  onOpenPosition,
}) => {
  const [timeframe, setTimeframe] = useState<ChartTimeframe>('1D');
  const [chartMode, setChartMode] = useState<ChartMode>('candles');
  const [activeIndicators, setActiveIndicators] = useState<TechnicalIndicator[]>(['EMA20', 'RSI']);
  const [hoveredCandle, setHoveredCandle] = useState<CandleData | null>(null);

  // Trading Ticket State
  const [activeTab, setActiveTab] = useState<'chart' | 'orderbook' | 'trade'>('chart');
  const [orderType, setOrderType] = useState<'MARKET' | 'LIMIT'>('MARKET');
  const [orderSide, setOrderSide] = useState<'BUY' | 'SELL'>('BUY');
  const [sharesCount, setSharesCount] = useState<number>(10);
  const [limitPrice, setLimitPrice] = useState<string>('');
  const [tradeFeedback, setTradeFeedback] = useState<string | null>(null);

  // Price Alert state
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [alertTargetPrice, setAlertTargetPrice] = useState<string>('');

  if (!asset) return null;

  const isPositive = asset.changePercent >= 0;
  const candles = useMemo(() => {
    return generateCandles(asset.price, timeframe, 38);
  }, [asset.id, asset.price, timeframe]);

  const orderBook = useMemo(() => {
    return generateOrderBook(asset.price);
  }, [asset.id, asset.price]);

  const activeDisplayCandle = hoveredCandle || candles[candles.length - 1] || {
    time: 'Live',
    timestamp: Date.now(),
    open: asset.openPrice,
    high: asset.high24h,
    low: asset.low24h,
    close: asset.price,
    volume: 14000,
    ema20: asset.price * 0.99,
    sma50: asset.price * 0.98,
    rsi: 62.4,
  };

  const minPrice = Math.min(...candles.map((c) => c.low));
  const maxPrice = Math.max(...candles.map((c) => c.high));
  const priceRange = maxPrice - minPrice || 1;
  const maxVolume = Math.max(...candles.map((c) => c.volume)) || 1;

  const timeframes: ChartTimeframe[] = ['1D', '5D', '1M', '6M', '1Y', 'ALL'];

  const toggleIndicator = (ind: TechnicalIndicator) => {
    sounds.playTick();
    setActiveIndicators((prev) =>
      prev.includes(ind) ? prev.filter((i) => i !== ind) : [...prev, ind]
    );
  };

  const handleExecuteOrder = () => {
    sounds.playOrderExecuted();
    const executionPrice = orderType === 'LIMIT' && Number(limitPrice) ? Number(limitPrice) : asset.price;
    const totalInvested = executionPrice * sharesCount;

    if (onOpenPosition) {
      onOpenPosition({
        id: `pos-${Date.now()}`,
        assetId: asset.id,
        symbol: asset.symbol,
        name: asset.name,
        type: orderSide,
        entryPrice: executionPrice,
        currentPrice: asset.price,
        shares: sharesCount,
        totalInvested,
        unrealizedPnL: 0,
        unrealizedPnLPercent: 0,
        openDate: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      });
    }

    setTradeFeedback(`FILLED: ${orderSide} ${sharesCount} ${asset.symbol} @ $${executionPrice.toFixed(2)} ($${totalInvested.toLocaleString()})`);
    setTimeout(() => setTradeFeedback(null), 4000);
  };

  return (
    <div
      id="asset-detail-modal-overlay"
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        id="asset-detail-modal-content"
        className="bg-[#131722] border border-[#363A45] rounded-2xl w-full max-w-4xl max-h-[94vh] overflow-y-auto flex flex-col shadow-2xl animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Pro Modal Header */}
        <div className="p-4 sm:p-5 border-b border-[#363A45] flex items-center justify-between gap-4 sticky top-0 bg-[#131722]/95 backdrop-blur z-30">
          <div className="flex items-center gap-3">
            <div
              className={`w-9 h-9 rounded-full ${
                asset.badge.bgClass || 'bg-[#2A2E39]'
              } flex items-center justify-center text-xs font-bold text-white flex-shrink-0 shadow-md ring-1 ring-[#363A45]`}
            >
              {asset.badge.text || asset.symbol.slice(0, 3)}
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-['Hanken_Grotesk'] text-xl sm:text-2xl font-bold text-white tracking-tight">
                  {asset.symbol}
                </h1>
                <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider bg-[#1E222D] text-[#b6c4ff] border border-[#363A45]">
                  {asset.category}
                </span>
                <span className="hidden sm:inline text-xs text-[#B2B5BE] font-mono">
                  • {asset.sector || asset.region}
                </span>
              </div>
              <p className="text-xs text-[#B2B5BE] truncate max-w-xs sm:max-w-md">{asset.name}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* View Switcher inside modal: Chart / Orderbook / Trade */}
            <div className="hidden sm:flex items-center gap-1 bg-[#1E222D] p-1 rounded-xl border border-[#363A45]">
              {(['chart', 'orderbook', 'trade'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => {
                    sounds.playTick();
                    setActiveTab(tab);
                  }}
                  className={`px-3 py-1 rounded-lg text-xs font-bold capitalize transition-colors ${
                    activeTab === tab
                      ? 'bg-[#2962ff] text-white'
                      : 'text-[#B2B5BE] hover:text-white'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <button
              id="btn-modal-watchlist-toggle"
              onClick={() => {
                sounds.playTick();
                onToggleWatchlist(asset.id);
              }}
              className={`p-2 rounded-xl border transition-all ${
                isWatchlisted
                  ? 'bg-[#2962ff]/20 text-[#2962ff] border-[#2962ff]'
                  : 'bg-[#1E222D] text-[#B2B5BE] border-[#363A45] hover:text-white'
              }`}
              title={isWatchlisted ? 'Remove from Watchlist' : 'Add to Watchlist'}
            >
              <Star className={`w-4 h-4 ${isWatchlisted ? 'fill-[#2962ff]' : ''}`} />
            </button>

            <button
              id="btn-modal-alert"
              onClick={() => {
                sounds.playTick();
                setShowAlertModal(true);
              }}
              className="p-2 rounded-xl bg-[#1E222D] text-[#B2B5BE] border border-[#363A45] hover:text-white transition-all"
              title="Set Price Alert"
            >
              <Bell className="w-4 h-4" />
            </button>

            <button
              id="btn-modal-close"
              onClick={() => {
                sounds.playTick();
                onClose();
              }}
              className="p-2 rounded-xl bg-[#1E222D] text-[#B2B5BE] border border-[#363A45] hover:text-white transition-all"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Execution Feedback Notification */}
        {tradeFeedback && (
          <div className="bg-[#089981]/20 border-b border-[#089981]/40 px-4 py-2.5 text-xs font-mono text-[#089981] flex items-center justify-between animate-in fade-in">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4" />
              <span className="font-bold">{tradeFeedback}</span>
            </div>
            <span className="text-[10px] text-white/80">Simulated Account</span>
          </div>
        )}

        {/* Real-time Pro Price & HUD Bar */}
        <div className="p-4 sm:p-6 pb-2 flex flex-wrap items-baseline justify-between gap-4 border-b border-[#363A45]/40">
          <div>
            <div className="font-mono text-3xl sm:text-4xl font-black text-white tracking-tight flex items-center gap-2">
              <span>
                {asset.currency === 'USD' && '$'}
                {asset.price.toLocaleString(undefined, {
                  minimumFractionDigits: asset.price < 5 ? 4 : 2,
                  maximumFractionDigits: asset.price < 5 ? 4 : 2,
                })}
                {asset.currency !== 'USD' && ` ${asset.currency}`}
              </span>
              <span className="w-2 h-2 rounded-full bg-[#089981] animate-ping" />
            </div>
            <div
              className={`flex items-center gap-2 text-sm font-mono font-bold mt-1 ${
                isPositive ? 'text-[#089981]' : 'text-[#F23645]'
              }`}
            >
              {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
              <span>{isPositive ? '+' : ''}{asset.change.toFixed(2)}</span>
              <span>({isPositive ? '+' : ''}{asset.changePercent.toFixed(2)}%)</span>
              <span className="text-xs text-[#B2B5BE] font-normal">• 24h Real-Time Quote</span>
            </div>
          </div>

          {/* Pro OHLC + Indicators HUD */}
          <div className="bg-[#1E222D] border border-[#363A45] rounded-xl px-4 py-2 flex flex-wrap items-center gap-3 sm:gap-4 text-xs font-mono">
            <div>
              <span className="text-[#B2B5BE]">O: </span>
              <span className="text-white font-bold">{activeDisplayCandle.open.toFixed(2)}</span>
            </div>
            <div>
              <span className="text-[#B2B5BE]">H: </span>
              <span className="text-[#089981] font-bold">{activeDisplayCandle.high.toFixed(2)}</span>
            </div>
            <div>
              <span className="text-[#B2B5BE]">L: </span>
              <span className="text-[#F23645] font-bold">{activeDisplayCandle.low.toFixed(2)}</span>
            </div>
            <div>
              <span className="text-[#B2B5BE]">C: </span>
              <span className="text-white font-bold">{activeDisplayCandle.close.toFixed(2)}</span>
            </div>
            {activeDisplayCandle.ema20 && (
              <div className="hidden sm:block">
                <span className="text-[#f59e0b]">EMA20: </span>
                <span className="text-[#f59e0b] font-bold">{activeDisplayCandle.ema20.toFixed(2)}</span>
              </div>
            )}
            {activeDisplayCandle.rsi && (
              <div>
                <span className="text-[#a855f7]">RSI: </span>
                <span className="text-[#a855f7] font-bold">{activeDisplayCandle.rsi}</span>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Tab Switcher */}
        <div className="flex sm:hidden border-b border-[#363A45] px-4 pt-2">
          {(['chart', 'orderbook', 'trade'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 text-xs font-bold capitalize border-b-2 transition-colors ${
                activeTab === tab
                  ? 'border-[#2962ff] text-[#2962ff]'
                  : 'border-transparent text-[#B2B5BE]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Main Chart View */}
        {activeTab === 'chart' && (
          <div className="flex flex-col">
            {/* Toolbar: Timeframe + Indicators + Chart Mode */}
            <div className="px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-2 border-b border-[#363A45]/40 bg-[#0f131e]/60">
              {/* Timeframes */}
              <div className="flex items-center gap-1 bg-[#1E222D] p-1 rounded-lg border border-[#363A45]">
                {timeframes.map((tf) => (
                  <button
                    key={tf}
                    onClick={() => {
                      sounds.playTick();
                      setTimeframe(tf);
                    }}
                    className={`px-2.5 py-1 rounded text-xs font-bold font-mono transition-colors ${
                      timeframe === tf
                        ? 'bg-[#2962ff] text-white shadow-sm'
                        : 'text-[#B2B5BE] hover:text-white hover:bg-[#2A2E39]'
                    }`}
                  >
                    {tf}
                  </button>
                ))}
              </div>

              {/* Technical Indicator Badges */}
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
                {(['EMA20', 'SMA50', 'RSI'] as TechnicalIndicator[]).map((ind) => {
                  const isActive = activeIndicators.includes(ind);
                  return (
                    <button
                      key={ind}
                      onClick={() => toggleIndicator(ind)}
                      className={`px-2 py-1 rounded text-[11px] font-bold font-mono border transition-colors ${
                        isActive
                          ? ind === 'EMA20'
                            ? 'bg-[#f59e0b]/15 text-[#f59e0b] border-[#f59e0b]'
                            : ind === 'SMA50'
                            ? 'bg-[#3b82f6]/15 text-[#3b82f6] border-[#3b82f6]'
                            : 'bg-[#a855f7]/15 text-[#a855f7] border-[#a855f7]'
                          : 'bg-[#1E222D] text-[#B2B5BE] border-[#363A45] hover:text-white'
                      }`}
                    >
                      {ind}
                    </button>
                  );
                })}
              </div>

              {/* Chart Modes */}
              <div className="flex items-center gap-1 bg-[#1E222D] p-1 rounded-lg border border-[#363A45]">
                <button
                  onClick={() => {
                    sounds.playTick();
                    setChartMode('candles');
                  }}
                  className={`px-2 py-1 rounded text-xs font-bold ${
                    chartMode === 'candles' ? 'bg-[#2A2E39] text-[#2962ff]' : 'text-[#B2B5BE] hover:text-white'
                  }`}
                  title="Candlesticks"
                >
                  Candles
                </button>
                <button
                  onClick={() => {
                    sounds.playTick();
                    setChartMode('line');
                  }}
                  className={`px-2 py-1 rounded text-xs font-bold ${
                    chartMode === 'line' ? 'bg-[#2A2E39] text-[#2962ff]' : 'text-[#B2B5BE] hover:text-white'
                  }`}
                  title="Line"
                >
                  Line
                </button>
              </div>
            </div>

            {/* SVG Interactive Chart Stage */}
            <div className="p-4 sm:p-6 flex flex-col gap-2">
              <div className="relative w-full h-72 sm:h-80 bg-[#131722] rounded-xl border border-[#363A45] p-2 overflow-hidden select-none">
                {/* Horizontal Grid Lines */}
                <div className="absolute inset-0 flex flex-col justify-between p-4 pointer-events-none opacity-10">
                  <div className="border-b border-white w-full" />
                  <div className="border-b border-white w-full" />
                  <div className="border-b border-white w-full" />
                  <div className="border-b border-white w-full" />
                </div>

                {/* Right Axis Prices */}
                <div className="absolute right-2 top-2 bottom-8 flex flex-col justify-between text-[10px] font-mono text-[#B2B5BE] pointer-events-none z-10">
                  <span>{maxPrice.toFixed(2)}</span>
                  <span>{((maxPrice + minPrice) / 2).toFixed(2)}</span>
                  <span>{minPrice.toFixed(2)}</span>
                </div>

                {/* SVG Graphics */}
                <svg
                  className="w-full h-full overflow-visible"
                  viewBox="0 0 700 280"
                  preserveAspectRatio="none"
                >
                  <defs>
                    <linearGradient id="proAreaGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={isPositive ? '#089981' : '#F23645'} stopOpacity="0.35" />
                      <stop offset="100%" stopColor={isPositive ? '#089981' : '#F23645'} stopOpacity="0.0" />
                    </linearGradient>
                  </defs>

                  {/* Volume Bars */}
                  {candles.map((c, i) => {
                    const x = (i / (candles.length - 1)) * 640 + 10;
                    const volHeight = (c.volume / maxVolume) * 45;
                    const volY = 260 - volHeight;
                    const isBull = c.close >= c.open;
                    return (
                      <rect
                        key={`vol-${i}`}
                        x={x - 3.5}
                        y={volY}
                        width={7}
                        height={volHeight}
                        fill={isBull ? '#089981' : '#F23645'}
                        opacity={0.25}
                      />
                    );
                  })}

                  {/* EMA 20 Overlay Line (Gold) */}
                  {activeIndicators.includes('EMA20') && (
                    <path
                      d={`M 10,${240 - (((candles[0].ema20 || candles[0].close) - minPrice) / priceRange) * 210} ${candles
                        .map((c, i) => {
                          const x = (i / (candles.length - 1)) * 640 + 10;
                          const y = 240 - (((c.ema20 || c.close) - minPrice) / priceRange) * 210;
                          return `L ${x.toFixed(1)},${y.toFixed(1)}`;
                        })
                        .join(' ')}`}
                      fill="none"
                      stroke="#f59e0b"
                      strokeWidth="1.8"
                      strokeDasharray="4 2"
                    />
                  )}

                  {/* SMA 50 Overlay Line (Blue) */}
                  {activeIndicators.includes('SMA50') && (
                    <path
                      d={`M 10,${240 - (((candles[0].sma50 || candles[0].close) - minPrice) / priceRange) * 210} ${candles
                        .map((c, i) => {
                          const x = (i / (candles.length - 1)) * 640 + 10;
                          const y = 240 - (((c.sma50 || c.close) - minPrice) / priceRange) * 210;
                          return `L ${x.toFixed(1)},${y.toFixed(1)}`;
                        })
                        .join(' ')}`}
                      fill="none"
                      stroke="#3b82f6"
                      strokeWidth="1.8"
                    />
                  )}

                  {/* Line Mode */}
                  {chartMode === 'line' && (
                    <>
                      <path
                        d={`M 10,${
                          240 - ((candles[0].close - minPrice) / priceRange) * 210
                        } ${candles
                          .map((c, i) => {
                            const x = (i / (candles.length - 1)) * 640 + 10;
                            const y = 240 - ((c.close - minPrice) / priceRange) * 210;
                            return `L ${x.toFixed(1)},${y.toFixed(1)}`;
                          })
                          .join(' ')} L 650,260 L 10,260 Z`}
                        fill="url(#proAreaGrad)"
                      />
                      <path
                        d={`M 10,${
                          240 - ((candles[0].close - minPrice) / priceRange) * 210
                        } ${candles
                          .map((c, i) => {
                            const x = (i / (candles.length - 1)) * 640 + 10;
                            const y = 240 - ((c.close - minPrice) / priceRange) * 210;
                            return `L ${x.toFixed(1)},${y.toFixed(1)}`;
                          })
                          .join(' ')}`}
                        fill="none"
                        stroke={isPositive ? '#089981' : '#F23645'}
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </>
                  )}

                  {/* Candlestick Mode */}
                  {chartMode === 'candles' &&
                    candles.map((c, i) => {
                      const x = (i / (candles.length - 1)) * 640 + 10;
                      const highY = 240 - ((c.high - minPrice) / priceRange) * 210;
                      const lowY = 240 - ((c.low - minPrice) / priceRange) * 210;
                      const openY = 240 - ((c.open - minPrice) / priceRange) * 210;
                      const closeY = 240 - ((c.close - minPrice) / priceRange) * 210;

                      const candleTop = Math.min(openY, closeY);
                      const candleHeight = Math.max(Math.abs(closeY - openY), 2);
                      const isBull = c.close >= c.open;
                      const color = isBull ? '#089981' : '#F23645';

                      return (
                        <g key={`candle-${i}`}>
                          <line x1={x} y1={highY} x2={x} y2={lowY} stroke={color} strokeWidth="1.5" />
                          <rect
                            x={x - 4}
                            y={candleTop}
                            width={8}
                            height={candleHeight}
                            fill={color}
                            rx={1}
                          />
                        </g>
                      );
                    })}

                  {/* Hover Crosshair */}
                  {hoveredCandle && (
                    <line
                      x1={
                        (candles.findIndex((c) => c.timestamp === hoveredCandle.timestamp) /
                          (candles.length - 1)) *
                          640 +
                        10
                      }
                      y1={10}
                      x2={
                        (candles.findIndex((c) => c.timestamp === hoveredCandle.timestamp) /
                          (candles.length - 1)) *
                          640 +
                        10
                      }
                      y2={260}
                      stroke="#b6c4ff"
                      strokeWidth="1"
                      strokeDasharray="3 3"
                    />
                  )}
                </svg>

                {/* Hover Triggers */}
                <div className="absolute inset-0 flex">
                  {candles.map((c, i) => (
                    <div
                      key={`col-${i}`}
                      className="flex-1 h-full cursor-crosshair hover:bg-white/[0.03]"
                      onMouseEnter={() => setHoveredCandle(c)}
                      onMouseLeave={() => setHoveredCandle(null)}
                    />
                  ))}
                </div>
              </div>

              {/* RSI Oscillator Sub-Panel */}
              {activeIndicators.includes('RSI') && (
                <div className="bg-[#171b26] border border-[#363A45] rounded-xl p-2.5 flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <span className="text-[#a855f7] font-bold">RSI (14):</span>
                    <span className="text-white font-bold">{activeDisplayCandle.rsi || 58.4}</span>
                    <span className="text-[10px] text-[#B2B5BE]">
                      {Number(activeDisplayCandle.rsi) > 70
                        ? '(Overbought ⚠️)'
                        : Number(activeDisplayCandle.rsi) < 30
                        ? '(Oversold 🟢)'
                        : '(Neutral)'}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-[10px] text-[#B2B5BE]">
                    <span>Overbought: 70</span>
                    <span>Oversold: 30</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Level 2 Order Book View */}
        {activeTab === 'orderbook' && (
          <div className="p-4 sm:p-6 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h3 className="font-['Hanken_Grotesk'] text-lg font-bold text-white flex items-center gap-2">
                <Layers className="w-5 h-5 text-[#2962ff]" />
                Level 2 Order Book & Liquidity Depth
              </h3>
              <span className="text-xs font-mono text-[#089981]">Market Spread: $0.05</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
              {/* Bids (Buy Orders) */}
              <div className="bg-[#1E222D] border border-[#089981]/30 rounded-xl p-3 flex flex-col gap-1.5">
                <div className="flex justify-between text-[#089981] font-bold border-b border-[#363A45] pb-1">
                  <span>BID PRICE</span>
                  <span>SIZE</span>
                  <span>TOTAL</span>
                </div>
                {orderBook.bids.map((b, i) => (
                  <div key={i} className="flex justify-between text-white relative py-0.5">
                    <div
                      className="absolute right-0 top-0 bottom-0 bg-[#089981]/15 -z-0 rounded"
                      style={{ width: `${(b.total / 1800) * 100}%` }}
                    />
                    <span className="text-[#089981] font-bold z-10">${b.price.toFixed(2)}</span>
                    <span className="z-10">{b.size}</span>
                    <span className="text-[#B2B5BE] z-10">{b.total}</span>
                  </div>
                ))}
              </div>

              {/* Asks (Sell Orders) */}
              <div className="bg-[#1E222D] border border-[#F23645]/30 rounded-xl p-3 flex flex-col gap-1.5">
                <div className="flex justify-between text-[#F23645] font-bold border-b border-[#363A45] pb-1">
                  <span>ASK PRICE</span>
                  <span>SIZE</span>
                  <span>TOTAL</span>
                </div>
                {orderBook.asks.map((a, i) => (
                  <div key={i} className="flex justify-between text-white relative py-0.5">
                    <div
                      className="absolute right-0 top-0 bottom-0 bg-[#F23645]/15 -z-0 rounded"
                      style={{ width: `${(a.total / 1800) * 100}%` }}
                    />
                    <span className="text-[#F23645] font-bold z-10">${a.price.toFixed(2)}</span>
                    <span className="z-10">{a.size}</span>
                    <span className="text-[#B2B5BE] z-10">{a.total}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Pro Trade Ticket Tab */}
        {activeTab === 'trade' && (
          <div className="p-4 sm:p-6 flex flex-col gap-5">
            <h3 className="font-['Hanken_Grotesk'] text-lg font-bold text-white flex items-center gap-2">
              <Zap className="w-5 h-5 text-[#2962ff]" />
              Order Execution Ticket (Paper Simulator)
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Order Controls */}
              <div className="bg-[#1E222D] border border-[#363A45] rounded-xl p-4 flex flex-col gap-4">
                {/* Side: Buy / Sell */}
                <div className="flex gap-2">
                  <button
                    onClick={() => setOrderSide('BUY')}
                    className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
                      orderSide === 'BUY'
                        ? 'bg-[#089981] text-white shadow-md'
                        : 'bg-[#131722] text-[#B2B5BE]'
                    }`}
                  >
                    BUY / LONG
                  </button>
                  <button
                    onClick={() => setOrderSide('SELL')}
                    className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
                      orderSide === 'SELL'
                        ? 'bg-[#F23645] text-white shadow-md'
                        : 'bg-[#131722] text-[#B2B5BE]'
                    }`}
                  >
                    SELL / SHORT
                  </button>
                </div>

                {/* Order Type */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setOrderType('MARKET')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                      orderType === 'MARKET' ? 'bg-[#2962ff] text-white' : 'bg-[#131722] text-[#B2B5BE]'
                    }`}
                  >
                    Market Order
                  </button>
                  <button
                    onClick={() => setOrderType('LIMIT')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                      orderType === 'LIMIT' ? 'bg-[#2962ff] text-white' : 'bg-[#131722] text-[#B2B5BE]'
                    }`}
                  >
                    Limit Order
                  </button>
                </div>

                {/* Shares Count */}
                <div>
                  <label className="text-xs text-[#B2B5BE] font-bold block mb-1">
                    Units / Shares
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={sharesCount}
                    onChange={(e) => setSharesCount(Math.max(1, Number(e.target.value)))}
                    className="w-full bg-[#131722] border border-[#363A45] rounded-lg px-3 py-2 text-white font-mono text-sm"
                  />
                </div>

                {orderType === 'LIMIT' && (
                  <div>
                    <label className="text-xs text-[#B2B5BE] font-bold block mb-1">
                      Limit Price (${asset.currency})
                    </label>
                    <input
                      type="number"
                      placeholder={asset.price.toString()}
                      value={limitPrice}
                      onChange={(e) => setLimitPrice(e.target.value)}
                      className="w-full bg-[#131722] border border-[#363A45] rounded-lg px-3 py-2 text-white font-mono text-sm"
                    />
                  </div>
                )}
              </div>

              {/* Order Summary & Submit */}
              <div className="bg-[#1E222D] border border-[#363A45] rounded-xl p-4 flex flex-col justify-between gap-4 font-mono text-xs">
                <div className="flex flex-col gap-2">
                  <div className="text-[10px] uppercase font-bold text-[#B2B5BE] border-b border-[#363A45] pb-1">
                    Execution Estimate
                  </div>
                  <div className="flex justify-between text-white">
                    <span>Instrument:</span>
                    <span className="font-bold">{asset.symbol}</span>
                  </div>
                  <div className="flex justify-between text-white">
                    <span>Target Price:</span>
                    <span>${(orderType === 'LIMIT' && Number(limitPrice) ? Number(limitPrice) : asset.price).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-white">
                    <span>Est. Capital:</span>
                    <span className="text-lg font-bold text-[#089981]">
                      ${((orderType === 'LIMIT' && Number(limitPrice) ? Number(limitPrice) : asset.price) * sharesCount).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                  <div className="text-[11px] text-[#B2B5BE] pt-1">
                    Simulated Buying Power Available: <span className="text-white font-bold">$100,000.00</span>
                  </div>
                </div>

                <button
                  onClick={handleExecuteOrder}
                  className={`w-full py-3 rounded-xl text-sm font-bold text-white shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2 ${
                    orderSide === 'BUY' ? 'bg-[#089981] hover:bg-[#089981]/90' : 'bg-[#F23645] hover:bg-[#F23645]/90'
                  }`}
                >
                  <ShieldCheck className="w-4 h-4" />
                  Execute {orderSide} Order
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Key Statistics & Analyst Profile Footer */}
        <div className="p-4 sm:p-6 bg-[#0f131e] border-t border-[#363A45] flex flex-col gap-5">
          <h3 className="font-['Hanken_Grotesk'] text-lg font-bold text-white flex items-center gap-2">
            <Sliders className="w-4 h-4 text-[#2962ff]" />
            Key Statistics & Analyst Consensus
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
            <div className="bg-[#1E222D] p-3 rounded-xl border border-[#363A45]">
              <div className="text-[10px] text-[#B2B5BE] uppercase font-semibold">24h High</div>
              <div className="text-sm sm:text-base font-mono font-bold text-[#089981]">
                ${asset.high24h.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </div>
            </div>

            <div className="bg-[#1E222D] p-3 rounded-xl border border-[#363A45]">
              <div className="text-[10px] text-[#B2B5BE] uppercase font-semibold">24h Low</div>
              <div className="text-sm sm:text-base font-mono font-bold text-[#F23645]">
                ${asset.low24h.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </div>
            </div>

            <div className="bg-[#1E222D] p-3 rounded-xl border border-[#363A45]">
              <div className="text-[10px] text-[#B2B5BE] uppercase font-semibold">Analyst Rating</div>
              <div className="text-sm sm:text-base font-mono font-bold text-[#089981]">
                {asset.analystRating || 'Strong Buy'}
              </div>
            </div>

            <div className="bg-[#1E222D] p-3 rounded-xl border border-[#363A45]">
              <div className="text-[10px] text-[#B2B5BE] uppercase font-semibold">1Y Target Price</div>
              <div className="text-sm sm:text-base font-mono font-bold text-white">
                ${asset.targetPrice ? asset.targetPrice.toLocaleString() : 'N/A'}
              </div>
            </div>
          </div>

          {/* Quick Action Footer Buttons */}
          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={() => {
                setActiveTab('trade');
                setOrderSide('BUY');
              }}
              className="flex-1 bg-[#089981] hover:bg-[#089981]/90 active:scale-95 text-white font-bold py-2.5 rounded-xl text-sm transition-all shadow-md flex items-center justify-center gap-1.5"
            >
              <TrendingUp className="w-4 h-4" />
              Simulate Buy Order
            </button>
            <button
              onClick={() => {
                setActiveTab('trade');
                setOrderSide('SELL');
              }}
              className="flex-1 bg-[#F23645] hover:bg-[#F23645]/90 active:scale-95 text-white font-bold py-2.5 rounded-xl text-sm transition-all shadow-md flex items-center justify-center gap-1.5"
            >
              <TrendingDown className="w-4 h-4" />
              Simulate Sell Order
            </button>
          </div>
        </div>

        {/* Price Alert Sub-Modal */}
        {showAlertModal && (
          <div className="fixed inset-0 z-60 bg-black/75 flex items-center justify-center p-4">
            <div className="bg-[#1E222D] border border-[#363A45] rounded-2xl p-5 max-w-sm w-full flex flex-col gap-4 shadow-2xl">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-white flex items-center gap-2">
                  <Bell className="w-4 h-4 text-[#2962ff]" />
                  Price Alert for {asset.symbol}
                </h4>
                <button
                  onClick={() => setShowAlertModal(false)}
                  className="text-[#B2B5BE] hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="text-xs text-[#B2B5BE]">
                Instant sound alert and visual trigger when {asset.symbol} crosses your price:
              </div>

              <div>
                <label className="text-[11px] font-semibold text-[#B2B5BE] block mb-1">
                  Trigger Target ({asset.currency})
                </label>
                <input
                  type="number"
                  placeholder={asset.price.toString()}
                  value={alertTargetPrice}
                  onChange={(e) => setAlertTargetPrice(e.target.value)}
                  className="w-full bg-[#131722] border border-[#363A45] rounded-xl px-3 py-2 text-white font-mono text-sm focus:outline-none focus:border-[#2962ff]"
                />
              </div>

              <button
                onClick={() => {
                  sounds.playAlertPing();
                  setShowAlertModal(false);
                  setTradeFeedback(`Active alert created for ${asset.symbol}`);
                  setTimeout(() => setTradeFeedback(null), 3000);
                }}
                className="w-full bg-[#2962ff] hover:bg-[#1b4ed8] text-white font-bold py-2.5 rounded-xl text-xs shadow-md"
              >
                Set Trigger Alert
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
