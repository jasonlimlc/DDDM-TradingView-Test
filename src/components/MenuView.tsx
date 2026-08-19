import React, { useState } from 'react';
import { MARKET_STATUSES, ECONOMIC_EVENTS } from '../data/marketData';
import {
  Globe,
  Calendar,
  DollarSign,
  Clock,
  Shield,
  Zap,
  RotateCcw,
  Sliders,
  CheckCircle2,
} from 'lucide-react';

interface MenuViewProps {
  liveUpdatesEnabled: boolean;
  onToggleLiveUpdates: () => void;
  isMockScreenshotMode: boolean;
  onToggleMockScreenshotMode: () => void;
}

export const MenuView: React.FC<MenuViewProps> = ({
  liveUpdatesEnabled,
  onToggleLiveUpdates,
  isMockScreenshotMode,
  onToggleMockScreenshotMode,
}) => {
  // Currency Converter State
  const [convAmount, setConvAmount] = useState<number>(1000);
  const [fromCurr, setFromCurr] = useState<string>('USD');
  const [toCurr, setToCurr] = useState<string>('EUR');

  const rates: { [key: string]: number } = {
    USD: 1.0,
    EUR: 0.954,
    GBP: 0.793,
    JPY: 154.22,
    CAD: 1.412,
    AUD: 1.558,
  };

  const convertedResult = (convAmount / (rates[fromCurr] || 1)) * (rates[toCurr] || 1);

  return (
    <div id="menu-view-container" className="flex flex-col gap-6 pt-2 pb-16">
      {/* Header */}
      <div>
        <h1 className="font-['Hanken_Grotesk'] text-3xl font-bold text-white flex items-center gap-2">
          <Globe className="w-7 h-7 text-[#2962ff]" />
          Terminal Hub & Tools
        </h1>
        <p className="text-xs text-[#B2B5BE] mt-1">
          Global exchange session statuses, macroeconomic events, and financial utilities
        </p>
      </div>

      {/* Market Hours & Global Exchanges */}
      <section className="flex flex-col gap-3">
        <h2 className="font-['Hanken_Grotesk'] text-lg font-bold text-white flex items-center gap-2">
          <Clock className="w-4 h-4 text-[#2962ff]" />
          Global Exchange Trading Sessions
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {MARKET_STATUSES.map((status) => {
            const isOpen = status.status === 'open' || status.status === '24/7';

            return (
              <div
                key={status.exchange}
                className="bg-[#1E222D] border border-[#363A45] rounded-xl p-3.5 flex flex-col justify-between gap-2.5"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{status.flag}</span>
                    <div>
                      <div className="font-bold text-white text-sm">{status.city}</div>
                      <div className="text-[11px] text-[#B2B5BE]">{status.exchange}</div>
                    </div>
                  </div>

                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      isOpen
                        ? 'bg-[#089981]/20 text-[#089981] border border-[#089981]/40'
                        : 'bg-[#313441] text-[#B2B5BE]'
                    }`}
                  >
                    {status.status}
                  </span>
                </div>

                <div className="text-xs font-mono text-[#B2B5BE] pt-2 border-t border-[#363A45]/40 flex justify-between">
                  <span>Hours: {status.tradingHours}</span>
                  <span className="text-white font-semibold">{status.localTime}</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Currency Converter */}
      <section className="bg-[#1E222D] border border-[#363A45] rounded-2xl p-5 flex flex-col gap-4">
        <h2 className="font-['Hanken_Grotesk'] text-lg font-bold text-white flex items-center gap-2">
          <DollarSign className="w-4 h-4 text-[#2962ff]" />
          Instant Currency Exchange Calculator
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-end">
          <div>
            <label className="text-xs font-bold uppercase text-[#B2B5BE] block mb-1">
              Amount
            </label>
            <input
              type="number"
              value={convAmount}
              onChange={(e) => setConvAmount(Number(e.target.value) || 0)}
              className="w-full bg-[#131722] border border-[#363A45] rounded-xl px-3 py-2 text-white font-mono text-base focus:outline-none focus:border-[#2962ff]"
            />
          </div>

          <div>
            <label className="text-xs font-bold uppercase text-[#B2B5BE] block mb-1">
              From Currency
            </label>
            <select
              value={fromCurr}
              onChange={(e) => setFromCurr(e.target.value)}
              className="w-full bg-[#131722] border border-[#363A45] rounded-xl px-3 py-2 text-white font-mono text-sm focus:outline-none focus:border-[#2962ff]"
            >
              {Object.keys(rates).map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-bold uppercase text-[#B2B5BE] block mb-1">
              To Currency
            </label>
            <select
              value={toCurr}
              onChange={(e) => setToCurr(e.target.value)}
              className="w-full bg-[#131722] border border-[#363A45] rounded-xl px-3 py-2 text-white font-mono text-sm focus:outline-none focus:border-[#2962ff]"
            >
              {Object.keys(rates).map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="bg-[#131722] border border-[#363A45]/80 rounded-xl p-3 flex items-center justify-between font-mono">
          <span className="text-xs text-[#B2B5BE]">Converted Equivalent:</span>
          <span className="text-lg font-bold text-[#089981]">
            {convertedResult.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}{' '}
            {toCurr}
          </span>
        </div>
      </section>

      {/* Economic Calendar */}
      <section className="flex flex-col gap-3">
        <h2 className="font-['Hanken_Grotesk'] text-lg font-bold text-white flex items-center gap-2">
          <Calendar className="w-4 h-4 text-[#2962ff]" />
          Economic Calendar (Today)
        </h2>

        <div className="flex flex-col gap-2">
          {ECONOMIC_EVENTS.map((event) => (
            <div
              key={event.id}
              className="bg-[#1E222D] border border-[#363A45] rounded-xl p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
            >
              <div className="flex items-center gap-3">
                <span className="font-mono font-bold text-[#b6c4ff] w-16">{event.time}</span>
                <span className="px-1.5 py-0.5 rounded bg-[#131722] border border-[#363A45] font-bold text-white">
                  {event.currency}
                </span>
                <span className="font-bold text-white">{event.event}</span>
              </div>

              <div className="flex items-center gap-4 text-mono self-end sm:self-auto text-[#B2B5BE]">
                {event.actual && (
                  <div>
                    <span>Act: </span>
                    <span className="text-[#089981] font-bold">{event.actual}</span>
                  </div>
                )}
                {event.forecast && (
                  <div>
                    <span>Fcst: </span>
                    <span className="text-white">{event.forecast}</span>
                  </div>
                )}
                <div>
                  <span>Prev: </span>
                  <span>{event.previous}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Display & App Settings */}
      <section className="bg-[#1E222D] border border-[#363A45] rounded-2xl p-5 flex flex-col gap-4">
        <h2 className="font-['Hanken_Grotesk'] text-lg font-bold text-white flex items-center gap-2">
          <Sliders className="w-4 h-4 text-[#2962ff]" />
          Application & Display Preferences
        </h2>

        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between p-3 rounded-xl bg-[#131722] border border-[#363A45]">
            <div>
              <div className="font-bold text-white text-sm">Real-time Telemetry Feed</div>
              <div className="text-xs text-[#B2B5BE]">Simulate live websocket price ticks every 2.5 seconds</div>
            </div>
            <button
              onClick={onToggleLiveUpdates}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold font-mono transition-colors ${
                liveUpdatesEnabled ? 'bg-[#089981] text-white' : 'bg-[#313441] text-[#B2B5BE]'
              }`}
            >
              {liveUpdatesEnabled ? 'ENABLED' : 'PAUSED'}
            </button>
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-[#131722] border border-[#363A45]">
            <div>
              <div className="font-bold text-white text-sm">Screenshot Exact Replica Mode</div>
              <div className="text-xs text-[#B2B5BE]">
                Displays "No data here yet" on S&P 500 and Nasdaq cards matching the original screenshot
              </div>
            </div>
            <button
              onClick={onToggleMockScreenshotMode}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold font-mono transition-colors ${
                isMockScreenshotMode ? 'bg-[#2962ff] text-white' : 'bg-[#313441] text-[#B2B5BE]'
              }`}
            >
              {isMockScreenshotMode ? 'ACTIVE' : 'OFF'}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
