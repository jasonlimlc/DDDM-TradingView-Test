import React from 'react';
import { MarketAsset } from '../types';
import { Sparkline } from './Sparkline';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface IndicesGridProps {
  assets: MarketAsset[];
  onSelectAsset: (asset: MarketAsset) => void;
  isMockScreenshotMode: boolean;
}

export const IndicesGrid: React.FC<IndicesGridProps> = ({
  assets,
  onSelectAsset,
  isMockScreenshotMode,
}) => {
  // S&P 500 and Nasdaq 100
  const sp500 = assets.find((a) => a.id === 'sp500') || assets[0];
  const nasdaq = assets.find((a) => a.id === 'nasdaq100') || assets[1];

  const featuredList = [sp500, nasdaq].filter(Boolean);

  return (
    <section id="section-major-indices" className="flex flex-col gap-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {featuredList.map((asset) => {
          const isPositive = asset.changePercent >= 0;

          return (
            <div
              key={asset.id}
              id={`card-${asset.id}`}
              onClick={() => onSelectAsset(asset)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSelectAsset(asset);
                }
              }}
              className="bg-[#1E222D] hover:bg-[#232734] border border-[#363A45] hover:border-[#434656] rounded-lg p-4 flex flex-col gap-3 cursor-pointer transition-all duration-150 shadow-sm group text-left relative overflow-hidden"
            >
              {/* Header with circular badge & symbol */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-6 h-6 rounded-full ${
                      asset.id === 'sp500' ? 'bg-[#F23645]' : 'bg-[#004ee8]'
                    } flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0 shadow-sm`}
                  >
                    {asset.badge.text || (asset.id === 'sp500' ? '500' : '100')}
                  </div>
                  <span className="font-['Inter'] text-sm md:text-base text-[#dfe2f2] font-bold group-hover:text-white transition-colors">
                    {asset.symbol}
                  </span>
                </div>

                {!isMockScreenshotMode && (
                  <div
                    className={`flex items-center gap-0.5 text-xs font-mono font-bold px-1.5 py-0.5 rounded ${
                      isPositive ? 'text-[#089981] bg-[#089981]/10' : 'text-[#F23645] bg-[#F23645]/10'
                    }`}
                  >
                    {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    <span>{isPositive ? '+' : ''}{asset.changePercent.toFixed(2)}%</span>
                  </div>
                )}
              </div>

              {/* Body */}
              {isMockScreenshotMode ? (
                <div className="h-16 flex items-center justify-center text-[#B2B5BE] font-['Inter'] text-xs font-medium tracking-wide">
                  No data here yet
                </div>
              ) : (
                <div className="flex items-end justify-between pt-1">
                  <div>
                    <div className="font-mono text-xl md:text-2xl font-bold text-white">
                      {asset.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                    <div className="text-xs text-[#B2B5BE] font-mono">
                      {isPositive ? '+' : ''}{asset.change.toFixed(2)} {asset.currency}
                    </div>
                  </div>
                  <div className="w-28 h-10 flex items-center justify-end">
                    <Sparkline data={asset.sparkline} isPositive={isPositive} width={110} height={38} />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
