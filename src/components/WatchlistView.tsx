import React, { useState } from 'react';
import { MarketAsset } from '../types';
import { Sparkline } from './Sparkline';
import { Star, Trash2, Search, TrendingUp, TrendingDown, Plus, ExternalLink } from 'lucide-react';

interface WatchlistViewProps {
  assets: MarketAsset[];
  watchlistIds: string[];
  onToggleWatchlist: (assetId: string) => void;
  onSelectAsset: (asset: MarketAsset) => void;
  onOpenSearch: () => void;
}

export const WatchlistView: React.FC<WatchlistViewProps> = ({
  assets,
  watchlistIds,
  onToggleWatchlist,
  onSelectAsset,
  onOpenSearch,
}) => {
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const watchlistedAssets = assets.filter((a) => watchlistIds.includes(a.id));
  const filteredAssets = filterCategory === 'all'
    ? watchlistedAssets
    : watchlistedAssets.filter((a) => a.category === filterCategory);

  const totalGainers = watchlistedAssets.filter((a) => a.changePercent > 0).length;
  const totalLosers = watchlistedAssets.filter((a) => a.changePercent < 0).length;

  return (
    <div id="watchlist-view-container" className="flex flex-col gap-6 pt-2 pb-16">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-['Hanken_Grotesk'] text-3xl font-bold text-white flex items-center gap-2">
            <Star className="w-7 h-7 text-[#2962ff] fill-[#2962ff]" />
            My Watchlist
          </h1>
          <p className="text-xs text-[#B2B5BE] mt-1">
            Tracking {watchlistedAssets.length} custom instruments in real-time
          </p>
        </div>

        <button
          id="btn-add-watchlist-asset"
          onClick={onOpenSearch}
          className="bg-[#2962ff] hover:bg-[#1b4ed8] text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 w-fit shadow-md transition-all active:scale-95"
        >
          <Plus className="w-4 h-4" />
          Add Symbol
        </button>
      </div>

      {/* Mini Stats Summary Card */}
      {watchlistedAssets.length > 0 && (
        <div className="grid grid-cols-3 gap-3 bg-[#1E222D] border border-[#363A45] rounded-xl p-3.5">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-bold text-[#B2B5BE]">Total Saved</span>
            <span className="font-mono text-lg font-bold text-white">{watchlistedAssets.length}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-bold text-[#089981]">Gainers</span>
            <span className="font-mono text-lg font-bold text-[#089981]">+{totalGainers}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-bold text-[#F23645]">Decliners</span>
            <span className="font-mono text-lg font-bold text-[#F23645]">-{totalLosers}</span>
          </div>
        </div>
      )}

      {/* Filter Chips */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
        {['all', 'indices', 'stocks', 'crypto', 'futures', 'forex', 'bonds'].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilterCategory(cat)}
            className={`px-3 py-1 rounded-full text-xs font-bold capitalize transition-colors ${
              filterCategory === cat
                ? 'bg-[#2962ff] text-white'
                : 'bg-[#1E222D] text-[#B2B5BE] hover:text-white border border-[#363A45]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Watchlist Items */}
      {filteredAssets.length === 0 ? (
        <div className="bg-[#1E222D] border border-[#363A45] rounded-2xl p-12 text-center flex flex-col items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-[#131722] border border-[#363A45] flex items-center justify-center text-[#B2B5BE]">
            <Star className="w-7 h-7" />
          </div>
          <div>
            <h3 className="font-['Hanken_Grotesk'] text-lg font-bold text-white">
              {watchlistedAssets.length === 0 ? 'Your watchlist is empty' : 'No items match this category'}
            </h3>
            <p className="text-xs text-[#B2B5BE] max-w-xs mt-1">
              {watchlistedAssets.length === 0
                ? 'Star any index, stock, crypto, or forex pair to monitor prices here.'
                : 'Try selecting a different filter category or add more symbols.'}
            </p>
          </div>
          <button
            onClick={onOpenSearch}
            className="mt-2 bg-[#2962ff] hover:bg-[#1b4ed8] text-white text-xs font-bold px-4 py-2 rounded-xl transition-all"
          >
            Explore Markets
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-2.5">
          {filteredAssets.map((asset) => {
            const isPositive = asset.changePercent >= 0;

            return (
              <div
                key={asset.id}
                id={`watchlist-card-${asset.id}`}
                onClick={() => onSelectAsset(asset)}
                className="bg-[#1E222D] hover:bg-[#232734] border border-[#363A45] rounded-xl p-4 flex items-center justify-between gap-4 cursor-pointer transition-all shadow-sm group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`w-9 h-9 rounded-full ${
                      asset.badge.bgClass || 'bg-[#2A2E39]'
                    } flex items-center justify-center text-xs font-bold text-white flex-shrink-0`}
                  >
                    {asset.badge.text || asset.symbol.slice(0, 3)}
                  </div>
                  <div className="truncate">
                    <div className="flex items-center gap-2">
                      <span className="font-['Inter'] font-bold text-white text-base group-hover:text-[#b6c4ff] transition-colors">
                        {asset.symbol}
                      </span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#131722] text-[#B2B5BE] border border-[#363A45] uppercase">
                        {asset.category}
                      </span>
                    </div>
                    <div className="text-xs text-[#B2B5BE] truncate">{asset.name}</div>
                  </div>
                </div>

                {/* Sparkline & Price */}
                <div className="flex items-center gap-4 flex-shrink-0">
                  <div className="hidden sm:block w-24 h-8">
                    <Sparkline data={asset.sparkline} isPositive={isPositive} width={96} height={32} />
                  </div>

                  <div className="text-right font-mono">
                    <div className="text-base font-bold text-white">
                      ${asset.price.toLocaleString(undefined, {
                        minimumFractionDigits: asset.price < 5 ? 4 : 2,
                        maximumFractionDigits: asset.price < 5 ? 4 : 2,
                      })}
                    </div>
                    <div
                      className={`text-xs font-semibold flex items-center justify-end gap-0.5 ${
                        isPositive ? 'text-[#089981]' : 'text-[#F23645]'
                      }`}
                    >
                      {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                      <span>{isPositive ? '+' : ''}{asset.changePercent.toFixed(2)}%</span>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleWatchlist(asset.id);
                    }}
                    className="p-2 text-[#B2B5BE] hover:text-[#F23645] hover:bg-[#F23645]/10 rounded-lg transition-colors"
                    title="Remove from Watchlist"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
