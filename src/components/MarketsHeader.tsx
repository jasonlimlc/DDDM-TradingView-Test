import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Globe, Sparkles, LayoutGrid, Eye } from 'lucide-react';
import { MarketRegion } from '../types';

interface MarketsHeaderProps {
  selectedRegion: MarketRegion;
  onSelectRegion: (region: MarketRegion) => void;
  isMockScreenshotMode: boolean;
  onToggleMockScreenshotMode: () => void;
}

export const MarketsHeader: React.FC<MarketsHeaderProps> = ({
  selectedRegion,
  onSelectRegion,
  isMockScreenshotMode,
  onToggleMockScreenshotMode,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const regions: { id: MarketRegion; label: string; desc: string }[] = [
    { id: 'All', label: 'Markets, everywhere', desc: 'Global multi-asset overview' },
    { id: 'Americas', label: 'Markets, Americas', desc: 'US, Canada, LatAm exchanges' },
    { id: 'Europe', label: 'Markets, Europe', desc: 'UK, EU, Nordic indices & equities' },
    { id: 'Asia-Pacific', label: 'Markets, Asia-Pacific', desc: 'Japan, HK, China, India' },
    { id: 'Global', label: 'Markets, 24/7 Digital', desc: 'Crypto, Forex & Global Futures' },
  ];

  const currentLabel = regions.find((r) => r.id === selectedRegion)?.label || 'Markets, everywhere';

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div id="markets-header-section" className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
      <div className="relative" ref={dropdownRef}>
        <button
          id="btn-markets-everywhere-dropdown"
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex items-center gap-2 font-['Hanken_Grotesk'] text-3xl md:text-4xl font-bold text-[#dfe2f2] hover:text-white transition-colors group text-left"
        >
          <span>{currentLabel}</span>
          <ChevronDown
            className={`w-7 h-7 text-[#dfe2f2] group-hover:text-white transition-transform duration-200 ${
              dropdownOpen ? 'rotate-180' : ''
            }`}
          />
        </button>

        {dropdownOpen && (
          <div
            id="region-dropdown-menu"
            className="absolute left-0 top-full mt-2 w-72 bg-[#1E222D] border border-[#363A45] rounded-xl shadow-2xl z-50 p-2 overflow-hidden backdrop-blur-xl animate-in fade-in zoom-in-95 duration-150"
          >
            <div className="px-3 py-2 text-[11px] font-semibold uppercase tracking-wider text-[#B2B5BE] border-b border-[#363A45]/50">
              Filter by Region & Scope
            </div>
            <div className="py-1 flex flex-col gap-1">
              {regions.map((region) => (
                <button
                  key={region.id}
                  id={`region-opt-${region.id}`}
                  onClick={() => {
                    onSelectRegion(region.id);
                    setDropdownOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium flex items-center justify-between transition-colors ${
                    selectedRegion === region.id
                      ? 'bg-[#2962ff] text-white'
                      : 'text-[#dfe2f2] hover:bg-[#2A2E39] hover:text-white'
                  }`}
                >
                  <div>
                    <div className="font-bold">{region.label}</div>
                    <div
                      className={`text-xs ${
                        selectedRegion === region.id ? 'text-white/80' : 'text-[#B2B5BE]'
                      }`}
                    >
                      {region.desc}
                    </div>
                  </div>
                  {selectedRegion === region.id && <Sparkles className="w-4 h-4 text-white" />}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Quick Mode Switcher: Screenshot view vs Live dynamic view */}
      <div className="flex items-center gap-2 self-start sm:self-auto">
        <button
          id="btn-toggle-screenshot-mock-view"
          onClick={onToggleMockScreenshotMode}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
            isMockScreenshotMode
              ? 'bg-[#2A2E39] text-[#b6c4ff] border-[#2962ff]'
              : 'bg-[#1E222D] text-[#B2B5BE] border-[#363A45] hover:text-white'
          }`}
          title="Toggle between minimal screenshot view and live chart telemetry"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>{isMockScreenshotMode ? 'Screenshot State' : 'Live Interactive'}</span>
        </button>
      </div>
    </div>
  );
};
