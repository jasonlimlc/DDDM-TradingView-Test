import React, { useState } from 'react';
import { MarketAsset } from '../types';
import { US_FLAG_URL } from '../data/marketData';
import { ChevronRight, TrendingUp, TrendingDown } from 'lucide-react';
import { Sparkline } from './Sparkline';

interface USStocksSectionProps {
  assets: MarketAsset[];
  onSelectAsset: (asset: MarketAsset) => void;
  isMockScreenshotMode: boolean;
}

export const USStocksSection: React.FC<USStocksSectionProps> = ({
  assets,
  onSelectAsset,
  isMockScreenshotMode,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // US stocks in dataset
  const nvda = assets.find((a) => a.id === 'nvda');
  const aapl = assets.find((a) => a.id === 'aapl');
  const msft = assets.find((a) => a.id === 'msft');
  const tsla = assets.find((a) => a.id === 'tsla');
  const googl = assets.find((a) => a.id === 'googl');

  const baseItems = [nvda, aapl].filter(Boolean) as MarketAsset[];
  const allUsItems = [nvda, aapl, msft, tsla, googl].filter(Boolean) as MarketAsset[];
  const displayedItems = isExpanded ? allUsItems : baseItems;

  return (
    <section id="section-us-stocks" className="flex flex-col gap-4">
      {/* Section Header with US Flag */}
      <button
        id="btn-us-stocks-header"
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-2 font-['Hanken_Grotesk'] text-2xl font-bold text-[#dfe2f2] hover:text-white transition-colors group text-left w-fit focus:outline-none"
      >
        <div className="w-6 h-6 rounded-full overflow-hidden flex-shrink-0 ring-1 ring-[#363A45]">
          <img
            src={US_FLAG_URL}
            alt="US Flag"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <span>US stocks</span>
        <ChevronRight
          className={`w-6 h-6 text-[#dfe2f2] group-hover:text-white transition-transform duration-200 ${
            isExpanded ? 'rotate-90 text-[#2962ff]' : ''
          }`}
        />
        {allUsItems.length > 2 && (
          <span className="text-xs text-[#B2B5BE] font-normal ml-2 font-['Inter']">
            ({isExpanded ? 'Show less' : `+${allUsItems.length - 2} more`})
          </span>
        )}
      </button>

      {/* Grid of US Stocks */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {displayedItems.map((item) => {
          const isPositive = item.changePercent >= 0;

          return (
            <div
              key={item.id}
              id={`card-stock-${item.id}`}
              onClick={() => onSelectAsset(item)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSelectAsset(item);
                }
              }}
              className="bg-[#1E222D] hover:bg-[#232734] border border-[#363A45] hover:border-[#434656] rounded-lg p-4 flex flex-col justify-between cursor-pointer transition-all duration-150 shadow-sm group text-left min-h-[64px]"
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2.5 overflow-hidden">
                  {/* Badge Circle */}
                  <div
                    className={`w-6 h-6 rounded-full ${
                      item.badge.bgClass || (item.id === 'nvda' ? 'bg-[#14532d]' : 'bg-black')
                    } flex-shrink-0 ring-1 ring-[#363A45]/80 flex items-center justify-center`}
                  >
                    {item.badge.text && (
                      <span className="text-[9px] font-bold text-white uppercase">{item.badge.text}</span>
                    )}
                  </div>

                  <span className="font-['Inter'] text-sm md:text-base text-[#dfe2f2] font-bold truncate group-hover:text-white transition-colors">
                    {item.symbol}
                  </span>
                </div>

                {!isMockScreenshotMode && (
                  <div className="text-right flex-shrink-0">
                    <div className="font-mono text-sm font-bold text-white">
                      ${item.price.toFixed(2)}
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
                <div className="pt-2 mt-2 border-t border-[#363A45]/40 flex items-center justify-between text-xs text-[#B2B5BE]">
                  <span className="truncate max-w-[130px]">{item.sector || item.name}</span>
                  <div className="w-20 h-5">
                    <Sparkline data={item.sparkline} isPositive={isPositive} width={80} height={20} strokeWidth={1.5} />
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
