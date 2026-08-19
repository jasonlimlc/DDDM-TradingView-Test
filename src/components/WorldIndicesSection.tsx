import React, { useState } from 'react';
import { MarketAsset } from '../types';
import { ChevronRight, TrendingUp, TrendingDown } from 'lucide-react';
import { Sparkline } from './Sparkline';

interface WorldIndicesSectionProps {
  assets: MarketAsset[];
  onSelectAsset: (asset: MarketAsset) => void;
  isMockScreenshotMode: boolean;
}

export const WorldIndicesSection: React.FC<WorldIndicesSectionProps> = ({
  assets,
  onSelectAsset,
  isMockScreenshotMode,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Default screenshot items: NI225, UKX
  const ni225 = assets.find((a) => a.id === 'ni225');
  const ukx = assets.find((a) => a.id === 'ukx');
  const dax = assets.find((a) => a.id === 'dax');
  const hsi = assets.find((a) => a.id === 'hsi');

  const baseItems = [ni225, ukx].filter(Boolean) as MarketAsset[];
  const allWorldItems = [ni225, ukx, dax, hsi].filter(Boolean) as MarketAsset[];
  const displayedItems = isExpanded ? allWorldItems : baseItems;

  return (
    <section id="section-world-indices" className="flex flex-col gap-4">
      {/* Section Header */}
      <button
        id="btn-world-indices-header"
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-1 font-['Hanken_Grotesk'] text-2xl font-bold text-[#dfe2f2] hover:text-white transition-colors group text-left w-fit focus:outline-none"
      >
        <span>World indices</span>
        <ChevronRight
          className={`w-6 h-6 text-[#dfe2f2] group-hover:text-white transition-transform duration-200 ${
            isExpanded ? 'rotate-90 text-[#2962ff]' : ''
          }`}
        />
        {allWorldItems.length > 2 && (
          <span className="text-xs text-[#B2B5BE] font-normal ml-2 font-['Inter']">
            ({isExpanded ? 'Show less' : `+${allWorldItems.length - 2} more`})
          </span>
        )}
      </button>

      {/* Grid of World Indices */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {displayedItems.map((item) => {
          const isPositive = item.changePercent >= 0;

          return (
            <div
              key={item.id}
              id={`card-world-${item.id}`}
              onClick={() => onSelectAsset(item)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSelectAsset(item);
                }
              }}
              className="bg-[#1E222D] hover:bg-[#232734] border border-[#363A45] hover:border-[#434656] rounded-lg p-4 flex flex-col gap-2 cursor-pointer transition-all duration-150 shadow-sm group text-left"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  {/* Badge */}
                  <div
                    className={`w-8 h-8 rounded-full ${
                      item.badge.bgClass || 'bg-[#434656]'
                    } flex items-center justify-center text-xs font-bold text-white flex-shrink-0 shadow-sm`}
                  >
                    {item.badge.text || item.symbol.slice(0, 3)}
                  </div>

                  {/* Symbol & Name */}
                  <div className="flex flex-col">
                    <span className="font-['Inter'] text-sm md:text-base text-[#dfe2f2] font-bold group-hover:text-white transition-colors">
                      {item.symbol}
                    </span>
                    <span className="font-['Inter'] text-xs text-[#B2B5BE]">
                      {item.name}
                    </span>
                  </div>
                </div>

                {!isMockScreenshotMode && (
                  <div className="text-right">
                    <div className="font-mono text-sm font-bold text-white">
                      {item.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </div>
                    <div
                      className={`text-xs font-mono font-medium flex items-center justify-end gap-0.5 ${
                        isPositive ? 'text-[#089981]' : 'text-[#F23645]'
                      }`}
                    >
                      {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                      <span>{isPositive ? '+' : ''}{item.changePercent.toFixed(2)}%</span>
                    </div>
                  </div>
                )}
              </div>

              {!isMockScreenshotMode && (
                <div className="pt-2 mt-1 border-t border-[#363A45]/40 flex items-center justify-between text-xs text-[#B2B5BE]">
                  <span>24h Vol: {item.volume}</span>
                  <div className="w-20 h-6">
                    <Sparkline data={item.sparkline} isPositive={isPositive} width={80} height={24} strokeWidth={1.5} />
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
