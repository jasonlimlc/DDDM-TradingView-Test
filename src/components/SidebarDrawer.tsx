import React from 'react';
import {
  X,
  TrendingUp,
  TrendingDown,
  BarChart3,
  Star,
  Newspaper,
  Globe,
  DollarSign,
  Radio,
  Eye,
  Zap,
} from 'lucide-react';
import { MainNavTab } from './BottomNav';
import { MarketRegion } from '../types';

interface SidebarDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: MainNavTab;
  onSelectTab: (tab: MainNavTab) => void;
  onSelectRegion: (region: MarketRegion) => void;
  liveUpdatesEnabled: boolean;
  onToggleLiveUpdates: () => void;
  isMockScreenshotMode: boolean;
  onToggleMockScreenshotMode: () => void;
  onOpenGetStarted: () => void;
}

export const SidebarDrawer: React.FC<SidebarDrawerProps> = ({
  isOpen,
  onClose,
  activeTab,
  onSelectTab,
  onSelectRegion,
  liveUpdatesEnabled,
  onToggleLiveUpdates,
  isMockScreenshotMode,
  onToggleMockScreenshotMode,
  onOpenGetStarted,
}) => {
  if (!isOpen) return null;

  const navigateTo = (tab: MainNavTab) => {
    onSelectTab(tab);
    onClose();
  };

  return (
    <div
      id="sidebar-drawer-overlay"
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex transition-opacity"
      onClick={onClose}
    >
      <div
        id="sidebar-drawer-container"
        className="w-80 max-w-[85vw] bg-[#131722] border-r border-[#363A45] h-full flex flex-col justify-between shadow-2xl p-5 overflow-y-auto animate-in slide-in-from-left duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between border-b border-[#363A45]/60 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#2962ff] flex items-center justify-center text-white font-bold font-mono">
                M
              </div>
              <div>
                <span className="font-['Hanken_Grotesk'] text-xl font-bold text-white">
                  Markets
                </span>
                <div className="text-[10px] text-[#B2B5BE] font-mono">Terminal v2.5</div>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-[#B2B5BE] hover:text-white hover:bg-[#1E222D]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Paper Portfolio Card */}
          <div className="bg-[#1E222D] border border-[#363A45] rounded-xl p-3.5 flex flex-col gap-2">
            <div className="flex items-center justify-between text-xs text-[#B2B5BE]">
              <span>Paper Portfolio</span>
              <span className="text-[#089981] font-mono font-bold">+2.4% Today</span>
            </div>
            <div className="font-mono text-xl font-bold text-white">$102,450.00</div>
            <button
              onClick={() => {
                onOpenGetStarted();
                onClose();
              }}
              className="mt-1 bg-[#2962ff]/20 hover:bg-[#2962ff]/30 text-[#b6c4ff] text-xs font-bold py-1.5 rounded-lg text-center border border-[#2962ff]/40 transition-colors"
            >
              Manage Virtual Capital
            </button>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col gap-1">
            <div className="text-[10px] font-bold uppercase tracking-wider text-[#B2B5BE] px-3 py-1">
              Main Hubs
            </div>

            <button
              onClick={() => navigateTo('markets')}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors text-left ${
                activeTab === 'markets'
                  ? 'bg-[#2962ff] text-white'
                  : 'text-[#dfe2f2] hover:bg-[#1E222D] hover:text-white'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>Markets Overview</span>
            </button>

            <button
              onClick={() => navigateTo('watchlist')}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors text-left ${
                activeTab === 'watchlist'
                  ? 'bg-[#2962ff] text-white'
                  : 'text-[#dfe2f2] hover:bg-[#1E222D] hover:text-white'
              }`}
            >
              <Star className="w-4 h-4" />
              <span>Saved Watchlist</span>
            </button>

            <button
              onClick={() => navigateTo('news')}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors text-left ${
                activeTab === 'news'
                  ? 'bg-[#2962ff] text-white'
                  : 'text-[#dfe2f2] hover:bg-[#1E222D] hover:text-white'
              }`}
            >
              <Newspaper className="w-4 h-4" />
              <span>Financial News</span>
            </button>

            <button
              onClick={() => navigateTo('menu')}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors text-left ${
                activeTab === 'menu'
                  ? 'bg-[#2962ff] text-white'
                  : 'text-[#dfe2f2] hover:bg-[#1E222D] hover:text-white'
              }`}
            >
              <Globe className="w-4 h-4" />
              <span>Market Sessions & Calendar</span>
            </button>
          </div>

          {/* Region Shortcuts */}
          <div className="flex flex-col gap-1 pt-2 border-t border-[#363A45]/50">
            <div className="text-[10px] font-bold uppercase tracking-wider text-[#B2B5BE] px-3 py-1">
              Quick Region Scope
            </div>
            {[
              { id: 'Americas', label: 'Americas & US' },
              { id: 'Europe', label: 'Europe & UK' },
              { id: 'Asia-Pacific', label: 'Asia-Pacific' },
              { id: 'Global', label: '24/7 Digital & Crypto' },
            ].map((reg) => (
              <button
                key={reg.id}
                onClick={() => {
                  onSelectRegion(reg.id as MarketRegion);
                  navigateTo('markets');
                }}
                className="px-3 py-1.5 rounded-lg text-xs text-[#B2B5BE] hover:text-white hover:bg-[#1E222D] text-left transition-colors"
              >
                • {reg.label}
              </button>
            ))}
          </div>
        </div>

        {/* Bottom Drawer Controls */}
        <div className="pt-4 border-t border-[#363A45]/60 flex flex-col gap-2 text-xs">
          <div className="flex items-center justify-between text-[#B2B5BE]">
            <span className="flex items-center gap-1.5">
              <Radio className={`w-3.5 h-3.5 ${liveUpdatesEnabled ? 'text-[#089981]' : 'text-gray-500'}`} />
              Live Telemetry
            </span>
            <button
              onClick={onToggleLiveUpdates}
              className="text-[#b6c4ff] font-bold hover:underline"
            >
              {liveUpdatesEnabled ? 'Pause' : 'Resume'}
            </button>
          </div>

          <div className="flex items-center justify-between text-[#B2B5BE]">
            <span className="flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5" />
              Screenshot Mode
            </span>
            <button
              onClick={onToggleMockScreenshotMode}
              className="text-[#b6c4ff] font-bold hover:underline"
            >
              {isMockScreenshotMode ? 'Turn Off' : 'Turn On'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
