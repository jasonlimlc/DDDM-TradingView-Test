import React from 'react';
import { MarketAsset, MarketCategory } from '../types';
import { Sparkline } from './Sparkline';
import { TrendingUp, TrendingDown, Star } from 'lucide-react';

interface CategoryAssetsSectionProps {
  category: MarketCategory;
  assets: MarketAsset[];
  onSelectAsset: (asset: MarketAsset) => void;
  watchlist: string[];
  onToggleWatchlist: (assetId: string) => void;
}

export const CategoryAssetsSection: React.FC<CategoryAssetsSectionProps> = ({
  category,
  assets,
  onSelectAsset,
  watchlist,
  onToggleWatchlist,
}) => {
  const categoryAssets = assets.filter((a) => a.category === category);

  const getCategoryTitle = () => {
    switch (category) {
      case 'indices':
        return 'All Global Indices';
      case 'stocks':
        return 'Equities & Stocks';
      case 'crypto':
        return 'Digital Currencies & Tokens';
      case 'futures':
        return 'Commodity & Index Futures';
      case 'forex':
        return 'Foreign Exchange Pairs';
      case 'bonds':
        return 'Sovereign Debt & Yields';
      default:
        return 'Market Assets';
    }
  };

  return (
    <div id={`category-view-${category}`} className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="font-['Hanken_Grotesk'] text-2xl font-bold text-[#dfe2f2]">
          {getCategoryTitle()}
        </h2>
        <span className="text-xs text-[#B2B5BE] font-mono">
          {categoryAssets.length} Instruments
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categoryAssets.map((item) => {
          const isPositive = item.changePercent >= 0;
          const isSaved = watchlist.includes(item.id);

          return (
            <div
              key={item.id}
              id={`cat-card-${item.id}`}
              onClick={() => onSelectAsset(item)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSelectAsset(item);
                }
              }}
              className="bg-[#1E222D] hover:bg-[#232734] border border-[#363A45] hover:border-[#434656] rounded-lg p-4 flex flex-col justify-between gap-3 cursor-pointer transition-all shadow-sm group text-left"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-full ${
                      item.badge.bgClass || 'bg-[#2A2E39]'
                    } flex items-center justify-center text-xs font-bold text-white flex-shrink-0`}
                  >
                    {item.badge.text || item.symbol.slice(0, 3)}
                  </div>
                  <div>
                    <div className="font-['Inter'] text-base font-bold text-[#dfe2f2] group-hover:text-white transition-colors">
                      {item.symbol}
                    </div>
                    <div className="text-xs text-[#B2B5BE] truncate max-w-[140px]">
                      {item.name}
                    </div>
                  </div>
                </div>

                <button
                  id={`btn-fav-${item.id}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleWatchlist(item.id);
                  }}
                  className={`p-1.5 rounded-md transition-colors ${
                    isSaved
                      ? 'text-[#2962ff] bg-[#2962ff]/10 hover:bg-[#2962ff]/20'
                      : 'text-[#B2B5BE] hover:text-white hover:bg-[#2A2E39]'
                  }`}
                  title={isSaved ? 'Remove from Watchlist' : 'Add to Watchlist'}
                >
                  <Star className={`w-4 h-4 ${isSaved ? 'fill-[#2962ff]' : ''}`} />
                </button>
              </div>

              <div className="flex items-end justify-between pt-1">
                <div>
                  <div className="font-mono text-xl font-bold text-white">
                    {item.currency === 'USD' && '$'}
                    {item.price.toLocaleString(undefined, {
                      minimumFractionDigits: item.price < 5 ? 4 : 2,
                      maximumFractionDigits: item.price < 5 ? 4 : 2,
                    })}
                    {item.currency !== 'USD' && ` ${item.currency}`}
                  </div>
                  <div
                    className={`text-xs font-mono font-medium flex items-center gap-1 ${
                      isPositive ? 'text-[#089981]' : 'text-[#F23645]'
                    }`}
                  >
                    {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    <span>{isPositive ? '+' : ''}{item.changePercent.toFixed(2)}%</span>
                    <span className="text-[#B2B5BE] font-normal ml-1">
                      ({isPositive ? '+' : ''}{item.change.toFixed(2)})
                    </span>
                  </div>
                </div>

                <div className="w-24 h-9">
                  <Sparkline data={item.sparkline} isPositive={isPositive} width={96} height={36} />
                </div>
              </div>

              <div className="pt-2 border-t border-[#363A45]/40 flex items-center justify-between text-[11px] text-[#B2B5BE]">
                <span>24h Vol: {item.volume}</span>
                <span>{item.sector || item.region}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
