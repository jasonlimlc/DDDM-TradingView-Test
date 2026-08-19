import React, { useState } from 'react';
import { MarketAsset, Position } from '../types';
import { Sparkline } from './Sparkline';
import { sounds } from '../utils/audio';
import {
  Star,
  Plus,
  Trash2,
  TrendingUp,
  TrendingDown,
  Briefcase,
  DollarSign,
  ArrowUpRight,
  ShieldCheck,
} from 'lucide-react';

interface WatchlistViewProps {
  assets: MarketAsset[];
  watchlistIds: string[];
  positions?: Position[];
  onToggleWatchlist: (assetId: string) => void;
  onSelectAsset: (asset: MarketAsset) => void;
  onOpenSearch: () => void;
  onClosePosition?: (positionId: string) => void;
}

export const WatchlistView: React.FC<WatchlistViewProps> = ({
  assets,
  watchlistIds,
  positions = [],
  onToggleWatchlist,
  onSelectAsset,
  onOpenSearch,
  onClosePosition,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'watchlist' | 'positions'>('watchlist');

  const watchlistedAssets = assets.filter((a) => watchlistIds.includes(a.id));

  // Compute portfolio metrics
  const defaultPositions: Position[] = positions.length > 0 ? positions : [
    {
      id: 'pos-1',
      assetId: 'nvda',
      symbol: 'NVIDIA',
      name: 'NVIDIA Corporation',
      type: 'BUY',
      entryPrice: 135.20,
      currentPrice: 142.85,
      shares: 50,
      totalInvested: 6760.00,
      unrealizedPnL: 382.50,
      unrealizedPnLPercent: 5.65,
      openDate: 'Today 09:35',
    },
    {
      id: 'pos-2',
      assetId: 'btc',
      symbol: 'BTC/USD',
      name: 'Bitcoin',
      type: 'BUY',
      entryPrice: 94500.00,
      currentPrice: 96420.00,
      shares: 0.15,
      totalInvested: 14175.00,
      unrealizedPnL: 288.00,
      unrealizedPnLPercent: 2.03,
      openDate: 'Today 10:12',
    }
  ];

  const totalPositionsValue = defaultPositions.reduce(
    (acc, p) => acc + (p.currentPrice * p.shares),
    0
  );
  const totalUnrealizedPnL = defaultPositions.reduce(
    (acc, p) => acc + ((p.currentPrice - p.entryPrice) * p.shares),
    0
  );
  const cashBalance = 100000 - defaultPositions.reduce((acc, p) => acc + p.totalInvested, 0);
  const netAccountValue = cashBalance + totalPositionsValue;

  return (
    <div id="pro-watchlist-view" className="flex flex-col gap-6 animate-in fade-in duration-200">
      {/* Portfolio Pro Card */}
      <div className="bg-gradient-to-r from-[#171b26] to-[#1E222D] border border-[#363A45] rounded-2xl p-5 sm:p-6 shadow-xl flex flex-col gap-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#2962ff]/20 border border-[#2962ff]/40 flex items-center justify-center text-[#2962ff]">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-[#B2B5BE] uppercase font-mono font-bold">
                Virtual Paper Portfolio
              </div>
              <div className="font-mono text-2xl sm:text-3xl font-black text-white">
                ${netAccountValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <div className="bg-[#131722] border border-[#363A45] px-3.5 py-2 rounded-xl">
              <div className="text-[#B2B5BE] text-[10px] uppercase">Unrealized P&L</div>
              <div className="text-[#089981] font-bold text-sm">
                +${totalUnrealizedPnL.toFixed(2)} (+{((totalUnrealizedPnL / 100000) * 100).toFixed(2)}%)
              </div>
            </div>

            <div className="bg-[#131722] border border-[#363A45] px-3.5 py-2 rounded-xl">
              <div className="text-[#B2B5BE] text-[10px] uppercase">Cash Available</div>
              <div className="text-white font-bold text-sm">
                ${cashBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </div>
            </div>
          </div>
        </div>

        {/* View Switcher: Watchlist vs Active Positions */}
        <div className="flex items-center gap-2 border-t border-[#363A45]/60 pt-4">
          <button
            onClick={() => {
              sounds.playTick();
              setActiveSubTab('watchlist');
            }}
            className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'watchlist'
                ? 'bg-[#2962ff] text-white shadow-md'
                : 'text-[#B2B5BE] hover:text-white bg-[#131722]'
            }`}
          >
            Tracked Watchlist ({watchlistedAssets.length})
          </button>

          <button
            onClick={() => {
              sounds.playTick();
              setActiveSubTab('positions');
            }}
            className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'positions'
                ? 'bg-[#2962ff] text-white shadow-md'
                : 'text-[#B2B5BE] hover:text-white bg-[#131722]'
            }`}
          >
            Open Positions ({defaultPositions.length})
          </button>
        </div>
      </div>

      {/* Watchlist Tab Content */}
      {activeSubTab === 'watchlist' && (
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="font-['Hanken_Grotesk'] text-xl font-bold text-white flex items-center gap-2">
              <Star className="w-5 h-5 text-[#2962ff] fill-[#2962ff]" />
              Live Watchlist
            </h2>
            <button
              onClick={() => {
                sounds.playTick();
                onOpenSearch();
              }}
              className="bg-[#2962ff]/20 hover:bg-[#2962ff]/30 text-[#b6c4ff] border border-[#2962ff]/40 text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Symbol
            </button>
          </div>

          {watchlistedAssets.length === 0 ? (
            <div className="bg-[#131722] border border-[#363A45] rounded-2xl p-8 text-center flex flex-col items-center gap-3">
              <Star className="w-10 h-10 text-[#B2B5BE]/40" />
              <div className="text-white font-bold text-base">Your Watchlist is Empty</div>
              <p className="text-xs text-[#B2B5BE] max-w-sm">
                Click the star icon next to any index, equity, or crypto asset to monitor quotes in real-time.
              </p>
              <button
                onClick={onOpenSearch}
                className="mt-2 bg-[#2962ff] text-white text-xs font-bold px-4 py-2 rounded-xl"
              >
                Browse All Instruments
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {watchlistedAssets.map((asset) => {
                const isPositive = asset.changePercent >= 0;

                return (
                  <div
                    key={`wl-${asset.id}`}
                    className="bg-[#131722] border border-[#363A45] hover:border-[#2962ff]/50 rounded-xl p-4 flex items-center justify-between gap-4 transition-all duration-150 group"
                  >
                    <div
                      onClick={() => {
                        sounds.playTick();
                        onSelectAsset(asset);
                      }}
                      className="flex items-center gap-3 flex-1 cursor-pointer"
                    >
                      <div
                        className={`w-9 h-9 rounded-full ${
                          asset.badge.bgClass || 'bg-[#2A2E39]'
                        } flex items-center justify-center text-xs font-bold text-white flex-shrink-0`}
                      >
                        {asset.badge.text || asset.symbol.slice(0, 3)}
                      </div>
                      <div>
                        <div className="text-white font-bold text-sm group-hover:text-[#b6c4ff] transition-colors">
                          {asset.symbol}
                        </div>
                        <div className="text-xs text-[#B2B5BE] truncate max-w-[120px] sm:max-w-[180px]">
                          {asset.name}
                        </div>
                      </div>
                    </div>

                    <div
                      onClick={() => {
                        sounds.playTick();
                        onSelectAsset(asset);
                      }}
                      className="hidden sm:block w-24 h-8 cursor-pointer"
                    >
                      <Sparkline
                        data={asset.sparkline}
                        isPositive={isPositive}
                        width={96}
                        height={32}
                      />
                    </div>

                    <div className="flex items-center gap-3">
                      <div
                        onClick={() => {
                          sounds.playTick();
                          onSelectAsset(asset);
                        }}
                        className="text-right font-mono cursor-pointer"
                      >
                        <div className="text-white font-bold text-sm">
                          ${asset.price.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                          })}
                        </div>
                        <div
                          className={`text-xs font-bold ${
                            isPositive ? 'text-[#089981]' : 'text-[#F23645]'
                          }`}
                        >
                          {isPositive ? '+' : ''}{asset.changePercent.toFixed(2)}%
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          sounds.playTick();
                          onToggleWatchlist(asset.id);
                        }}
                        className="p-1.5 rounded-lg text-[#B2B5BE] hover:text-[#F23645] hover:bg-[#1E222D] transition-colors"
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
      )}

      {/* Positions Tab Content */}
      {activeSubTab === 'positions' && (
        <div className="flex flex-col gap-4">
          <h2 className="font-['Hanken_Grotesk'] text-xl font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#089981]" />
            Active Market Positions
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full bg-[#131722] border border-[#363A45] rounded-2xl overflow-hidden text-left font-mono text-xs">
              <thead className="bg-[#1E222D] text-[#B2B5BE] uppercase text-[10px] border-b border-[#363A45]">
                <tr>
                  <th className="py-3 px-4">Instrument</th>
                  <th className="py-3 px-4">Side</th>
                  <th className="py-3 px-4">Shares / Units</th>
                  <th className="py-3 px-4">Entry Price</th>
                  <th className="py-3 px-4">Current Price</th>
                  <th className="py-3 px-4">Unrealized P&L</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#363A45]/40 text-white">
                {defaultPositions.map((pos) => {
                  const pnl = (pos.currentPrice - pos.entryPrice) * pos.shares;
                  const pnlPercent = ((pos.currentPrice - pos.entryPrice) / pos.entryPrice) * 100;
                  const isPos = pnl >= 0;

                  return (
                    <tr key={pos.id} className="hover:bg-[#1E222D]/60 transition-colors">
                      <td className="py-3.5 px-4 font-bold flex items-center gap-2">
                        <span>{pos.symbol}</span>
                        <span className="text-[10px] text-[#B2B5BE] font-normal">{pos.name}</span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            pos.type === 'BUY'
                              ? 'bg-[#089981]/20 text-[#089981]'
                              : 'bg-[#F23645]/20 text-[#F23645]'
                          }`}
                        >
                          {pos.type}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">{pos.shares}</td>
                      <td className="py-3.5 px-4">${pos.entryPrice.toFixed(2)}</td>
                      <td className="py-3.5 px-4 font-bold">${pos.currentPrice.toFixed(2)}</td>
                      <td className={`py-3.5 px-4 font-bold ${isPos ? 'text-[#089981]' : 'text-[#F23645]'}`}>
                        {isPos ? '+' : ''}${pnl.toFixed(2)} ({isPos ? '+' : ''}{pnlPercent.toFixed(2)}%)
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
