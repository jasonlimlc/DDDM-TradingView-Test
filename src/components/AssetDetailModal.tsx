import React, { useState, useMemo } from 'react';
import { MarketAsset, ChartTimeframe, CandleData } from '../types';
import { generateCandles } from '../data/marketData';
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
  Share2,
} from 'lucide-react';

interface AssetDetailModalProps {
  asset: MarketAsset | null;
  onClose: () => void;
  isWatchlisted: boolean;
  onToggleWatchlist: (assetId: string) => void;
}

export const AssetDetailModal: React.FC<AssetDetailModalProps> = ({
  asset,
  onClose,
  isWatchlisted,
  onToggleWatchlist,
}) => {
  const [timeframe, setTimeframe] = useState<ChartTimeframe>('1D');
  const [chartType, setChartType] = useState<'line' | 'candles'>('line');
  const [hoveredCandle, setHoveredCandle] = useState<CandleData | null>(null);
  const [alertSet, setAlertSet] = useState(false);
  const [alertTargetPrice, setAlertTargetPrice] = useState<string>('');
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [tradeActionFeedback, setTradeActionFeedback] = useState<string | null>(null);

  if (!asset) return null;

  const isPositive = asset.changePercent >= 0;
  const candles = useMemo(() => {
    return generateCandles(asset.price, timeframe, 32);
  }, [asset.id, asset.price, timeframe]);

  const activeDisplayCandle = hoveredCandle || candles[candles.length - 1] || {
    time: 'Live',
    timestamp: Date.now(),
    open: asset.openPrice,
    high: asset.high24h,
    low: asset.low24h,
    close: asset.price,
    volume: 12000,
  };

  const minPrice = Math.min(...candles.map((c) => c.low));
  const maxPrice = Math.max(...candles.map((c) => c.high));
  const priceRange = maxPrice - minPrice || 1;

  const maxVolume = Math.max(...candles.map((c) => c.volume)) || 1;

  const timeframes: ChartTimeframe[] = ['1D', '5D', '1M', '6M', '1Y', 'ALL'];

  const handleSimulateTrade = (type: 'BUY' | 'SELL') => {
    setTradeActionFeedback(`Simulated ${type} order executed for ${asset.symbol} at $${asset.price.toFixed(2)}`);
    setTimeout(() => setTradeActionFeedback(null), 3500);
  };

  return (
    <div
      id="asset-detail-modal-overlay"
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        id="asset-detail-modal-content"
        className="bg-[#131722] border border-[#363A45] rounded-2xl w-full max-w-3xl max-h-[92vh] overflow-y-auto flex flex-col shadow-2xl animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-4 sm:p-6 border-b border-[#363A45] flex items-start justify-between gap-4 sticky top-0 bg-[#131722]/95 backdrop-blur z-20">
          <div className="flex items-center gap-3.5">
            <div
              className={`w-10 h-10 rounded-full ${
                asset.badge.bgClass || 'bg-[#2A2E39]'
              } flex items-center justify-center text-sm font-bold text-white flex-shrink-0 shadow`}
            >
              {asset.badge.text || asset.symbol.slice(0, 3)}
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-['Hanken_Grotesk'] text-xl sm:text-2xl font-bold text-white">
                  {asset.symbol}
                </h1>
                <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider bg-[#1E222D] text-[#B2B5BE] border border-[#363A45]">
                  {asset.category}
                </span>
                <span className="text-xs text-[#B2B5BE] hidden sm:inline font-mono">
                  • {asset.region}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#B2B5BE]">{asset.name}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="btn-modal-watchlist-toggle"
              onClick={() => onToggleWatchlist(asset.id)}
              className={`p-2 rounded-lg border transition-all ${
                isWatchlisted
                  ? 'bg-[#2962ff]/20 text-[#2962ff] border-[#2962ff]'
                  : 'bg-[#1E222D] text-[#B2B5BE] border-[#363A45] hover:text-white'
              }`}
              title={isWatchlisted ? 'Remove from Watchlist' : 'Add to Watchlist'}
            >
              <Star className={`w-5 h-5 ${isWatchlisted ? 'fill-[#2962ff]' : ''}`} />
            </button>

            <button
              id="btn-modal-alert"
              onClick={() => setShowAlertModal(true)}
              className="p-2 rounded-lg bg-[#1E222D] text-[#B2B5BE] border border-[#363A45] hover:text-white transition-all"
              title="Set Price Alert"
            >
              <Bell className="w-5 h-5" />
            </button>

            <button
              id="btn-modal-close"
              onClick={onClose}
              className="p-2 rounded-lg bg-[#1E222D] text-[#B2B5BE] border border-[#363A45] hover:text-white transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Feedback banner */}
        {tradeActionFeedback && (
          <div className="bg-[#089981]/20 border-b border-[#089981]/40 px-4 py-2 text-xs font-mono text-[#089981] flex items-center gap-2">
            <Check className="w-4 h-4" />
            <span>{tradeActionFeedback}</span>
          </div>
        )}

        {/* Price & Status Bar */}
        <div className="p-4 sm:p-6 pb-2 flex flex-wrap items-baseline justify-between gap-4">
          <div>
            <div className="font-mono text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              {asset.currency === 'USD' && '$'}
              {asset.price.toLocaleString(undefined, {
                minimumFractionDigits: asset.price < 5 ? 4 : 2,
                maximumFractionDigits: asset.price < 5 ? 4 : 2,
              })}
              {asset.currency !== 'USD' && ` ${asset.currency}`}
            </div>
            <div
              className={`flex items-center gap-2 text-sm sm:text-base font-mono font-bold mt-1 ${
                isPositive ? 'text-[#089981]' : 'text-[#F23645]'
              }`}
            >
              {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
              <span>{isPositive ? '+' : ''}{asset.change.toFixed(2)}</span>
              <span>({isPositive ? '+' : ''}{asset.changePercent.toFixed(2)}%)</span>
              <span className="text-xs font-normal text-[#B2B5BE]">Today</span>
            </div>
          </div>

          {/* O/H/L/C Telemetry */}
          <div className="bg-[#1E222D] border border-[#363A45] rounded-xl px-4 py-2 flex items-center gap-4 text-xs font-mono">
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
          </div>
        </div>

        {/* Timeframe & Chart Style Toolbar */}
        <div className="px-4 sm:px-6 flex items-center justify-between border-b border-[#363A45]/60 pb-3">
          <div className="flex items-center gap-1 bg-[#1E222D] p-1 rounded-lg border border-[#363A45]">
            {timeframes.map((tf) => (
              <button
                key={tf}
                id={`btn-tf-${tf}`}
                onClick={() => setTimeframe(tf)}
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

          <div className="flex items-center gap-1 bg-[#1E222D] p-1 rounded-lg border border-[#363A45]">
            <button
              id="btn-chart-line"
              onClick={() => setChartType('line')}
              className={`p-1.5 rounded transition-colors ${
                chartType === 'line' ? 'bg-[#2A2E39] text-[#2962ff]' : 'text-[#B2B5BE] hover:text-white'
              }`}
              title="Line Chart"
            >
              <Activity className="w-4 h-4" />
            </button>
            <button
              id="btn-chart-candles"
              onClick={() => setChartType('candles')}
              className={`p-1.5 rounded transition-colors ${
                chartType === 'candles' ? 'bg-[#2A2E39] text-[#2962ff]' : 'text-[#B2B5BE] hover:text-white'
              }`}
              title="Candlestick Chart"
            >
              <BarChart2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Interactive Chart Canvas */}
        <div className="p-4 sm:p-6 flex flex-col gap-2">
          <div className="relative w-full h-64 sm:h-72 bg-[#131722] rounded-xl border border-[#363A45]/80 p-2 overflow-hidden">
            {/* Background Grid Lines */}
            <div className="absolute inset-0 grid grid-rows-4 grid-cols-6 pointer-events-none opacity-10">
              {Array.from({ length: 24 }).map((_, i) => (
                <div key={i} className="border border-white/20" />
              ))}
            </div>

            {/* Price Labels on Right Axis */}
            <div className="absolute right-2 top-2 bottom-8 flex flex-col justify-between text-[10px] font-mono text-[#B2B5BE] pointer-events-none z-10">
              <span>{maxPrice.toFixed(2)}</span>
              <span>{((maxPrice + minPrice) / 2).toFixed(2)}</span>
              <span>{minPrice.toFixed(2)}</span>
            </div>

            {/* SVG Chart Rendering */}
            <svg
              className="w-full h-full overflow-visible"
              viewBox="0 0 600 240"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="0%"
                    stopColor={isPositive ? '#089981' : '#F23645'}
                    stopOpacity="0.35"
                  />
                  <stop
                    offset="100%"
                    stopColor={isPositive ? '#089981' : '#F23645'}
                    stopOpacity="0.0"
                  />
                </linearGradient>
              </defs>

              {/* Volume Bars at bottom */}
              {candles.map((c, i) => {
                const x = (i / (candles.length - 1)) * 540 + 10;
                const volHeight = (c.volume / maxVolume) * 45;
                const volY = 220 - volHeight;
                const isBull = c.close >= c.open;
                return (
                  <rect
                    key={`vol-${i}`}
                    x={x - 3}
                    y={volY}
                    width={6}
                    height={volHeight}
                    fill={isBull ? '#089981' : '#F23645'}
                    opacity={0.3}
                  />
                );
              })}

              {/* Line Mode */}
              {chartType === 'line' && (
                <>
                  {/* Gradient Area */}
                  <path
                    d={`M 10,${
                      200 - ((candles[0].close - minPrice) / priceRange) * 170
                    } ${candles
                      .map((c, i) => {
                        const x = (i / (candles.length - 1)) * 540 + 10;
                        const y = 200 - ((c.close - minPrice) / priceRange) * 170;
                        return `L ${x.toFixed(1)},${y.toFixed(1)}`;
                      })
                      .join(' ')} L 550,220 L 10,220 Z`}
                    fill="url(#areaGradient)"
                  />

                  {/* Stroke Line */}
                  <path
                    d={`M 10,${
                      200 - ((candles[0].close - minPrice) / priceRange) * 170
                    } ${candles
                      .map((c, i) => {
                        const x = (i / (candles.length - 1)) * 540 + 10;
                        const y = 200 - ((c.close - minPrice) / priceRange) * 170;
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
              {chartType === 'candles' &&
                candles.map((c, i) => {
                  const x = (i / (candles.length - 1)) * 540 + 10;
                  const highY = 200 - ((c.high - minPrice) / priceRange) * 170;
                  const lowY = 200 - ((c.low - minPrice) / priceRange) * 170;
                  const openY = 200 - ((c.open - minPrice) / priceRange) * 170;
                  const closeY = 200 - ((c.close - minPrice) / priceRange) * 170;

                  const candleTop = Math.min(openY, closeY);
                  const candleHeight = Math.max(Math.abs(closeY - openY), 2);
                  const isBull = c.close >= c.open;
                  const color = isBull ? '#089981' : '#F23645';

                  return (
                    <g key={`candle-${i}`}>
                      {/* Wick */}
                      <line
                        x1={x}
                        y1={highY}
                        x2={x}
                        y2={lowY}
                        stroke={color}
                        strokeWidth="1.5"
                      />
                      {/* Body */}
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

              {/* Interactive Hover Vertical Line */}
              {hoveredCandle && (
                <line
                  x1={
                    (candles.findIndex((c) => c.timestamp === hoveredCandle.timestamp) /
                      (candles.length - 1)) *
                      540 +
                    10
                  }
                  y1={10}
                  x2={
                    (candles.findIndex((c) => c.timestamp === hoveredCandle.timestamp) /
                      (candles.length - 1)) *
                      540 +
                    10
                  }
                  y2={220}
                  stroke="#b6c4ff"
                  strokeWidth="1"
                  strokeDasharray="3 3"
                />
              )}
            </svg>

            {/* Hover Trigger Overlay Bars */}
            <div className="absolute inset-0 flex">
              {candles.map((c, i) => (
                <div
                  key={`hover-col-${i}`}
                  className="flex-1 h-full cursor-crosshair hover:bg-white/[0.03] transition-colors"
                  onMouseEnter={() => setHoveredCandle(c)}
                  onMouseLeave={() => setHoveredCandle(null)}
                />
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center text-[11px] font-mono text-[#B2B5BE] px-2">
            <span>{candles[0]?.time}</span>
            <span>{candles[Math.floor(candles.length / 2)]?.time}</span>
            <span>{candles[candles.length - 1]?.time} (Now)</span>
          </div>
        </div>

        {/* Key Statistics Grid */}
        <div className="p-4 sm:p-6 bg-[#0f131e] border-t border-[#363A45] flex flex-col gap-5">
          <h3 className="font-['Hanken_Grotesk'] text-lg font-bold text-white flex items-center gap-2">
            <Sliders className="w-4 h-4 text-[#2962ff]" />
            Key Statistics & Market Profile
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-[#1E222D] p-3 rounded-lg border border-[#363A45]">
              <div className="text-[11px] text-[#B2B5BE] uppercase font-semibold">24h High</div>
              <div className="text-sm sm:text-base font-mono font-bold text-[#089981]">
                ${asset.high24h.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </div>
            </div>

            <div className="bg-[#1E222D] p-3 rounded-lg border border-[#363A45]">
              <div className="text-[11px] text-[#B2B5BE] uppercase font-semibold">24h Low</div>
              <div className="text-sm sm:text-base font-mono font-bold text-[#F23645]">
                ${asset.low24h.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </div>
            </div>

            <div className="bg-[#1E222D] p-3 rounded-lg border border-[#363A45]">
              <div className="text-[11px] text-[#B2B5BE] uppercase font-semibold">24h Volume</div>
              <div className="text-sm sm:text-base font-mono font-bold text-white">
                {asset.volume}
              </div>
            </div>

            <div className="bg-[#1E222D] p-3 rounded-lg border border-[#363A45]">
              <div className="text-[11px] text-[#B2B5BE] uppercase font-semibold">Market Cap</div>
              <div className="text-sm sm:text-base font-mono font-bold text-white">
                {asset.marketCap || 'N/A'}
              </div>
            </div>
          </div>

          {/* 52-Week Range Bar */}
          {asset.week52High && asset.week52Low && (
            <div className="bg-[#1E222D] p-3.5 rounded-lg border border-[#363A45] flex flex-col gap-2">
              <div className="flex justify-between text-xs text-[#B2B5BE] font-mono">
                <span>52W Low: ${asset.week52Low.toFixed(2)}</span>
                <span className="text-white font-bold">52-Week Range</span>
                <span>52W High: ${asset.week52High.toFixed(2)}</span>
              </div>
              <div className="w-full bg-[#131722] h-2 rounded-full overflow-hidden relative">
                <div
                  className="bg-gradient-to-r from-[#2962ff] to-[#089981] h-full rounded-full"
                  style={{
                    width: `${Math.min(
                      Math.max(
                        ((asset.price - asset.week52Low) /
                          (asset.week52High - asset.week52Low)) *
                          100,
                        5
                      ),
                      100
                    )}%`,
                  }}
                />
              </div>
            </div>
          )}

          {/* Description */}
          <div className="text-xs text-[#B2B5BE] leading-relaxed border-t border-[#363A45]/50 pt-3">
            <span className="font-bold text-[#dfe2f2]">About {asset.name}: </span>
            {asset.description}
          </div>

          {/* Order / Simulation Actions */}
          <div className="flex items-center gap-3 pt-2">
            <button
              id="btn-trade-buy"
              onClick={() => handleSimulateTrade('BUY')}
              className="flex-1 bg-[#089981] hover:bg-[#089981]/90 active:scale-95 text-white font-bold py-2.5 rounded-lg text-sm transition-all shadow-md"
            >
              Simulate Buy / Long
            </button>
            <button
              id="btn-trade-sell"
              onClick={() => handleSimulateTrade('SELL')}
              className="flex-1 bg-[#F23645] hover:bg-[#F23645]/90 active:scale-95 text-white font-bold py-2.5 rounded-lg text-sm transition-all shadow-md"
            >
              Simulate Sell / Short
            </button>
          </div>
        </div>

        {/* Price Alert Sub-Modal */}
        {showAlertModal && (
          <div className="fixed inset-0 z-60 bg-black/70 flex items-center justify-center p-4">
            <div className="bg-[#1E222D] border border-[#363A45] rounded-xl p-5 max-w-sm w-full flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-white flex items-center gap-2">
                  <Bell className="w-4 h-4 text-[#2962ff]" />
                  Set Price Alert for {asset.symbol}
                </h4>
                <button
                  onClick={() => setShowAlertModal(false)}
                  className="text-[#B2B5BE] hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="text-xs text-[#B2B5BE]">
                Receive instant browser notification when price crosses your trigger:
              </div>

              <div>
                <label className="text-[11px] font-semibold text-[#B2B5BE] block mb-1">
                  Trigger Target Price ({asset.currency})
                </label>
                <input
                  type="number"
                  placeholder={asset.price.toString()}
                  value={alertTargetPrice}
                  onChange={(e) => setAlertTargetPrice(e.target.value)}
                  className="w-full bg-[#131722] border border-[#363A45] rounded-lg px-3 py-2 text-white font-mono text-sm focus:outline-none focus:border-[#2962ff]"
                />
              </div>

              <button
                onClick={() => {
                  setAlertSet(true);
                  setShowAlertModal(false);
                  setTradeActionFeedback(`Price alert active for ${asset.symbol} at target level`);
                  setTimeout(() => setTradeActionFeedback(null), 3000);
                }}
                className="w-full bg-[#2962ff] hover:bg-[#1b4ed8] text-white font-bold py-2 rounded-lg text-xs"
              >
                Create Alert
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
