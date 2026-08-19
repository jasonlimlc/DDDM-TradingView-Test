import React from 'react';
import { MarketAsset } from '../types';
import { Gauge, ShieldAlert, Activity, BarChart2 } from 'lucide-react';

interface MarketBreadthBarProps {
  assets: MarketAsset[];
}

export const MarketBreadthBar: React.FC<MarketBreadthBarProps> = ({ assets }) => {
  const gainers = assets.filter((a) => a.changePercent > 0).length;
  const losers = assets.filter((a) => a.changePercent < 0).length;
  const total = assets.length || 1;
  const advancerPercent = Math.round((gainers / total) * 100);

  return (
    <div
      id="pro-market-breadth-bar"
      className="bg-[#171b26] border border-[#363A45]/80 rounded-xl p-3 flex flex-wrap items-center justify-between gap-4 text-xs font-mono"
    >
      {/* Fear & Greed Indicator */}
      <div className="flex items-center gap-2.5">
        <div className="w-7 h-7 rounded-lg bg-[#089981]/20 border border-[#089981]/40 flex items-center justify-center text-[#089981]">
          <Gauge className="w-4 h-4" />
        </div>
        <div>
          <div className="text-[10px] uppercase font-bold text-[#B2B5BE]">Sentiment Index</div>
          <div className="text-white font-bold flex items-center gap-1.5">
            <span className="text-[#089981]">74</span>
            <span className="text-[11px] font-sans font-medium text-[#089981]">Greed</span>
          </div>
        </div>
      </div>

      {/* Market Breadth Advance/Decline Ratio */}
      <div className="flex items-center gap-3 flex-1 min-w-[200px] max-w-sm">
        <div className="w-full flex flex-col gap-1">
          <div className="flex justify-between text-[10px] text-[#B2B5BE] font-bold">
            <span className="text-[#089981]">Advancing: {gainers} ({advancerPercent}%)</span>
            <span className="text-[#F23645]">Declining: {losers}</span>
          </div>
          <div className="w-full bg-[#F23645] h-1.5 rounded-full overflow-hidden flex">
            <div
              className="bg-[#089981] h-full transition-all duration-500"
              style={{ width: `${advancerPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* VIX Volatility Index */}
      <div className="flex items-center gap-4 text-[11px]">
        <div className="flex items-center gap-1.5">
          <Activity className="w-3.5 h-3.5 text-[#b6c4ff]" />
          <span className="text-[#B2B5BE]">VIX Volatility:</span>
          <span className="text-white font-bold">13.84</span>
          <span className="text-[#089981] text-[10px]">(-2.8%)</span>
        </div>

        <div className="hidden sm:flex items-center gap-1.5">
          <BarChart2 className="w-3.5 h-3.5 text-[#2962ff]" />
          <span className="text-[#B2B5BE]">24h Total Vol:</span>
          <span className="text-white font-bold">$148.2B</span>
        </div>
      </div>
    </div>
  );
};
