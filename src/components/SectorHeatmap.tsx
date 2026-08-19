import React from 'react';
import { MarketAsset } from '../types';
import { LayoutGrid, TrendingUp, TrendingDown } from 'lucide-react';
import { sounds } from '../utils/audio';

interface SectorHeatmapProps {
  assets: MarketAsset[];
  onSelectAsset: (asset: MarketAsset) => void;
}

export const SectorHeatmap: React.FC<SectorHeatmapProps> = ({
  assets,
  onSelectAsset,
}) => {
  // Sort equities and crypto by market cap weight
  const heatmapAssets = assets
    .filter((a) => a.category === 'stocks' || a.category === 'crypto' || a.id === 'sp500' || a.id === 'nasdaq100')
    .sort((a, b) => (b.marketCapRaw || 100) - (a.marketCapRaw || 100))
    .slice(0, 10);

  const getHeatmapColor = (changePercent: number) => {
    if (changePercent >= 3.0) return 'bg-[#089981] text-white border-[#089981]';
    if (changePercent > 1.0) return 'bg-[#089981]/80 text-white border-[#089981]/90';
    if (changePercent > 0.0) return 'bg-[#089981]/40 text-emerald-200 border-[#089981]/50';
    if (changePercent === 0.0) return 'bg-[#2A2E39] text-[#dfe2f2] border-[#363A45]';
    if (changePercent > -1.0) return 'bg-[#F23645]/40 text-rose-200 border-[#F23645]/50';
    if (changePercent > -3.0) return 'bg-[#F23645]/80 text-white border-[#F23645]/90';
    return 'bg-[#F23645] text-white border-[#F23645]';
  };

  return (
    <section id="pro-sector-heatmap-section" className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h2 className="font-['Hanken_Grotesk'] text-xl font-bold text-white flex items-center gap-2">
          <LayoutGrid className="w-5 h-5 text-[#2962ff]" />
          Market Cap Treemap Heatmap
        </h2>
        <span className="text-xs text-[#B2B5BE] font-mono">Weighted by Market Cap</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-2.5">
        {heatmapAssets.map((asset) => {
          const isPositive = asset.changePercent >= 0;
          const colorClasses = getHeatmapColor(asset.changePercent);

          return (
            <button
              key={`heatmap-${asset.id}`}
              id={`heatmap-tile-${asset.id}`}
              onClick={() => {
                sounds.playTick();
                onSelectAsset(asset);
              }}
              className={`p-3.5 rounded-xl border flex flex-col justify-between text-left transition-all hover:scale-[1.02] hover:shadow-lg focus:outline-none cursor-pointer ${colorClasses}`}
            >
              <div className="flex items-center justify-between w-full">
                <span className="font-bold text-sm sm:text-base font-['Inter'] tracking-tight">
                  {asset.symbol}
                </span>
                <span className="text-[10px] uppercase font-mono opacity-80">
                  {asset.marketCap || asset.category}
                </span>
              </div>

              <div className="mt-3 flex items-end justify-between w-full font-mono">
                <span className="text-xs opacity-90">
                  ${asset.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </span>
                <span className="font-bold text-xs flex items-center gap-0.5">
                  {isPositive ? '+' : ''}{asset.changePercent.toFixed(2)}%
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
};
