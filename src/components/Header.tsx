import React from 'react';
import { Menu as MenuIcon, Search, Radio } from 'lucide-react';

interface HeaderProps {
  onOpenMenu: () => void;
  onOpenSearch: () => void;
  onOpenGetStarted: () => void;
  onSelectMarketsTab: () => void;
  liveUpdatesEnabled: boolean;
  onToggleLiveUpdates: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenMenu,
  onOpenSearch,
  onOpenGetStarted,
  onSelectMarketsTab,
  liveUpdatesEnabled,
  onToggleLiveUpdates,
}) => {
  return (
    <header
      id="top-app-bar"
      className="flex justify-between items-center w-full px-4 md:px-8 h-16 bg-[#0f131e] border-b border-[#434656]/50 sticky top-0 z-40 backdrop-blur-md"
    >
      <div className="flex items-center gap-4">
        <button
          id="btn-hamburger-menu"
          onClick={onOpenMenu}
          aria-label="Open Menu"
          className="p-1 rounded-lg text-[#b6c4ff] hover:bg-[#1b1f2b] transition-colors focus:outline-none focus:ring-2 focus:ring-[#2962ff]"
        >
          <MenuIcon className="w-6 h-6" />
        </button>
        <button
          id="btn-nav-title"
          onClick={onSelectMarketsTab}
          className="flex items-center gap-2 group text-left focus:outline-none"
        >
          <span className="font-['Hanken_Grotesk'] text-2xl font-bold text-[#dfe2f2] group-hover:text-white transition-colors">
            Markets
          </span>
          <span className="hidden sm:inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-medium bg-[#1E222D] border border-[#363A45] text-[#b6c4ff]">
            <span className={`w-1.5 h-1.5 rounded-full ${liveUpdatesEnabled ? 'bg-[#089981] animate-ping' : 'bg-[#B2B5BE]'}`} />
            {liveUpdatesEnabled ? 'Live Feed' : 'Paused'}
          </span>
        </button>
      </div>

      <div className="flex items-center gap-3">
        <button
          id="btn-toggle-live-feed"
          onClick={onToggleLiveUpdates}
          title={liveUpdatesEnabled ? 'Pause Live Ticker' : 'Resume Live Ticker'}
          className={`p-2 rounded-lg text-[#c3c5d8] hover:text-white hover:bg-[#1E222D] transition-colors hidden xs:flex items-center gap-1 text-xs`}
        >
          <Radio className={`w-4 h-4 ${liveUpdatesEnabled ? 'text-[#089981]' : 'text-[#B2B5BE]'}`} />
          <span className="hidden md:inline font-mono">{liveUpdatesEnabled ? 'LIVE' : 'IDLE'}</span>
        </button>

        <button
          id="btn-header-search"
          onClick={onOpenSearch}
          aria-label="Search Markets"
          className="p-2 rounded-lg text-[#c3c5d8] hover:text-white hover:bg-[#1E222D] transition-colors focus:outline-none"
        >
          <Search className="w-5 h-5" />
        </button>

        <button
          id="btn-header-get-started"
          onClick={onOpenGetStarted}
          className="bg-[#2962ff] hover:bg-[#1b4ed8] active:scale-95 text-white px-4 py-1.5 rounded text-sm font-bold shadow-sm transition-all duration-150 whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-[#2962ff]/50"
        >
          Get started
        </button>
      </div>
    </header>
  );
};
