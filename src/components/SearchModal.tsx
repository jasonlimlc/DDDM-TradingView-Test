import React, { useState, useEffect, useRef } from 'react';
import { MarketAsset } from '../types';
import { Search, X, TrendingUp, TrendingDown, Star, Sparkles } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  assets: MarketAsset[];
  onSelectAsset: (asset: MarketAsset) => void;
  watchlist: string[];
  onToggleWatchlist: (assetId: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  assets,
  onSelectAsset,
  watchlist,
  onToggleWatchlist,
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const filteredAssets = query.trim()
    ? assets.filter(
        (a) =>
          a.symbol.toLowerCase().includes(query.toLowerCase()) ||
          a.name.toLowerCase().includes(query.toLowerCase()) ||
          a.category.toLowerCase().includes(query.toLowerCase()) ||
          (a.sector && a.sector.toLowerCase().includes(query.toLowerCase()))
      )
    : assets.slice(0, 8); // Popular suggestions

  return (
    <div
      id="search-modal-backdrop"
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-start justify-center p-3 sm:p-6 pt-16 sm:pt-20"
      onClick={onClose}
    >
      <div
        id="search-modal-box"
        className="bg-[#1E222D] border border-[#363A45] rounded-2xl w-full max-w-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Bar Input */}
        <div className="p-4 border-b border-[#363A45] flex items-center gap-3">
          <Search className="w-5 h-5 text-[#2962ff]" />
          <input
            ref={inputRef}
            id="input-market-search"
            type="text"
            placeholder="Search symbols, indices, crypto, forex, companies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-white placeholder-[#B2B5BE] text-base focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-[#B2B5BE] hover:text-white p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Quick Filter Tags */}
        <div className="px-4 py-2 bg-[#131722] border-b border-[#363A45]/50 flex items-center gap-2 overflow-x-auto no-scrollbar text-xs">
          <span className="text-[#B2B5BE] font-semibold whitespace-nowrap">Filter:</span>
          {['All', 'Indices', 'Stocks', 'Crypto', 'Futures', 'Forex'].map((tag) => (
            <button
              key={tag}
              onClick={() => setQuery(tag === 'All' ? '' : tag.toLowerCase())}
              className="px-2.5 py-1 rounded-full bg-[#1E222D] hover:bg-[#2A2E39] text-[#dfe2f2] border border-[#363A45] whitespace-nowrap transition-colors"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Search Results */}
        <div className="max-h-96 overflow-y-auto p-2">
          <div className="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#B2B5BE]">
            {query.trim() ? `Search Results (${filteredAssets.length})` : 'Popular & Trending Instruments'}
          </div>

          {filteredAssets.length === 0 ? (
            <div className="py-12 text-center text-[#B2B5BE] flex flex-col items-center gap-2">
              <Search className="w-8 h-8 opacity-40" />
              <p className="text-sm">No instruments matching "{query}"</p>
            </div>
          ) : (
            <div className="flex flex-col gap-1">
              {filteredAssets.map((asset) => {
                const isPositive = asset.changePercent >= 0;
                const isSaved = watchlist.includes(asset.id);

                return (
                  <div
                    key={asset.id}
                    id={`search-item-${asset.id}`}
                    onClick={() => {
                      onSelectAsset(asset);
                      onClose();
                    }}
                    role="button"
                    tabIndex={0}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-[#2A2E39] cursor-pointer transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-7 h-7 rounded-full ${
                          asset.badge.bgClass || 'bg-[#313441]'
                        } flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0`}
                      >
                        {asset.badge.text || asset.symbol.slice(0, 3)}
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-['Inter'] font-bold text-white text-sm group-hover:text-[#b6c4ff] transition-colors">
                            {asset.symbol}
                          </span>
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#131722] text-[#B2B5BE] border border-[#363A45] uppercase">
                            {asset.category}
                          </span>
                        </div>
                        <div className="text-xs text-[#B2B5BE] truncate max-w-[200px] sm:max-w-xs">
                          {asset.name}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="text-right font-mono">
                        <div className="text-sm font-bold text-white">
                          ${asset.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                        </div>
                        <div
                          className={`text-xs font-semibold flex items-center justify-end gap-0.5 ${
                            isPositive ? 'text-[#089981]' : 'text-[#F23645]'
                          }`}
                        >
                          {isPositive ? '+' : ''}{asset.changePercent.toFixed(2)}%
                        </div>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleWatchlist(asset.id);
                        }}
                        className={`p-1.5 rounded-lg border transition-colors ${
                          isSaved
                            ? 'bg-[#2962ff]/20 text-[#2962ff] border-[#2962ff]'
                            : 'bg-[#131722] text-[#B2B5BE] border-[#363A45] hover:text-white'
                        }`}
                      >
                        <Star className={`w-4 h-4 ${isSaved ? 'fill-[#2962ff]' : ''}`} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-[#131722] border-t border-[#363A45] flex items-center justify-between text-xs text-[#B2B5BE]">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#2962ff]" />
            <span>Instant global real-time pricing</span>
          </div>
          <span className="font-mono text-[10px]">ESC to dismiss</span>
        </div>
      </div>
    </div>
  );
};
