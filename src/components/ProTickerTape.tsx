import React from 'react';
import { MarketAsset } from '../types';
import { TrendingUp, TrendingDown, Flame } from 'lucide-react';
import { sounds } from '../utils/audio';

interface ProTickerTapeProps {
  assets: MarketAsset[];
  onSelectAsset: (asset: MarketAsset) => void;
}

export const ProTickerTape: React.FC<ProTickerTapeProps> = ({
  assets,
  onSelectAsset,
}) => {
  // Top movers & benchmark instruments
  const keySymbols = ['sp500', 'nasdaq100', 'btc', 'eth', 'nvda', 'aapl', 'gc1', 'cl1', 'us10y', 'eurusd'];
  const tickerAssets = keySymbols
    .map((id) => assets.find((a) => a.id === id))
    .filter(Boolean) as MarketAsset[];

  return (
    <div
      id="pro-ticker-tape-container"
      className="w-full bg-[#0a0e19] border-b border-[#363A45]/70 py-1 px-2 overflow-x-auto no-scrollbar flex items-center gap-4 text-xs font-mono select-none"
    >
      <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#2962ff]/15 border border-[#2962ff]/30 text-[#b6c4ff] font-bold text-[10px] uppercase flex-shrink-0">
        <Flame className="w-3 h-3 text-[#2962ff]" />
        <span>Ticker Tape</span>
      </div>

      <div className="flex items-center gap-5 flex-nowrap">
        {tickerAssets.map((asset) => {
          const isPositive = asset.changePercent >= 0;

          return (
            <button
              key={`tape-${asset.id}`}
              id={`ticker-tape-${asset.id}`}
              onClick={() => {
                sounds.playTick();
                onSelectAsset(asset);
              }}
              className="flex items-center gap-2 hover:bg-[#1E222D] px-2 py-0.5 rounded transition-colors whitespace-nowrap group text-left focus:outline-none"
            >
              <span className="text-white font-bold group-hover:text-[#b6c4ff] transition-colors">
                {asset.symbol}
              </span>
              <span className="text-[#dfe2f2]">
                {asset.currency === 'USD' && '$'}
                {asset.price.toLocaleString(undefined, {
                  minimumFractionDigits: asset.price < 5 ? 3 : 2,
                  maximumFractionDigits: asset.price < 5 ? 3 : 2,
                })}
              </span>
              <span
                className={`flex items-center text-[11px] font-bold px-1 rounded ${
                  isPositive
                    ? 'text-[#089981] bg-[#089981]/15'
                    : 'text-[#F23645] bg-[#F23645]/15'
                }`}
              >
                {isPositive ? '+' : ''}{asset.changePercent.toFixed(2)}%
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
