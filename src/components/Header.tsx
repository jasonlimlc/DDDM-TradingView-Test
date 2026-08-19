import React, { useState } from 'react';
import { Menu, Search, Volume2, VolumeX, Activity, Sparkles, Layers } from 'lucide-react';
import { sounds } from '../utils/audio';

interface HeaderProps {
  onOpenMenu: () => void;
  onOpenSearch: () => void;
  onOpenGetStarted: () => void;
  onSelectMarketsTab?: () => void;
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
  const [isMuted, setIsMuted] = useState(false);

  const toggleMute = () => {
    const next = !isMuted;
    setIsMuted(next);
    sounds.enabled = !next;
    if (!next) sounds.playTick();
  };

  return (
    <header
      id="app-header"
      className="w-full bg-[#131722] border-b border-[#363A45] px-4 md:px-8 py-3 flex items-center justify-between sticky top-0 z-40 shadow-md backdrop-blur-md"
    >
      {/* Left Section: Menu icon + Title */}
      <div className="flex items-center gap-3">
        <button
          id="btn-header-menu"
          onClick={() => {
            sounds.playTick();
            onOpenMenu();
          }}
          className="p-2 rounded-lg text-[#B2B5BE] hover:text-white hover:bg-[#1E222D] transition-colors focus:outline-none focus:ring-1 focus:ring-[#2962ff]"
          aria-label="Open Navigation Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <button
          id="btn-header-title-home"
          onClick={() => {
            sounds.playTick();
            onSelectMarketsTab?.();
          }}
          className="flex items-center gap-2 group text-left focus:outline-none"
        >
          <h1 className="font-['Hanken_Grotesk'] text-2xl font-bold text-white tracking-tight group-hover:text-[#b6c4ff] transition-colors">
            Markets
          </h1>
          <span className="hidden sm:inline-block px-1.5 py-0.5 rounded text-[10px] uppercase font-mono font-bold bg-[#2962ff]/20 text-[#b6c4ff] border border-[#2962ff]/30">
            PRO
          </span>
        </button>
      </div>

      {/* Middle telemetry indicator (Desktop) */}
      <div className="hidden lg:flex items-center gap-3 font-mono text-xs text-[#B2B5BE] bg-[#1E222D]/80 border border-[#363A45] px-3 py-1 rounded-full">
        <div className="flex items-center gap-1.5">
          <span className={`w-2 h-2 rounded-full ${liveUpdatesEnabled ? 'bg-[#089981] animate-pulse' : 'bg-amber-500'}`} />
          <span className="text-white font-bold">{liveUpdatesEnabled ? 'STREAMING' : 'PAUSED'}</span>
        </div>
        <span>•</span>
        <span>Latency: <span className="text-[#089981]">11ms</span></span>
        <span>•</span>
        <span>NYSE/NASDAQ: <span className="text-[#089981] font-bold">OPEN</span></span>
      </div>

      {/* Right Section: Sound toggle, Live Stream toggle, Search, Get Started */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Synthetic Sound Feedback Toggle */}
        <button
          id="btn-sound-toggle"
          onClick={toggleMute}
          className="p-2 rounded-lg text-[#B2B5BE] hover:text-white hover:bg-[#1E222D] transition-colors"
          title={isMuted ? 'Unmute Terminal Audio' : 'Mute Terminal Audio'}
        >
          {isMuted ? <VolumeX className="w-4 h-4 text-[#F23645]" /> : <Volume2 className="w-4 h-4 text-[#089981]" />}
        </button>

        {/* Live Market Pulse toggle button */}
        <button
          id="btn-live-pulse-toggle"
          onClick={() => {
            sounds.playTick();
            onToggleLiveUpdates();
          }}
          className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-mono font-bold border transition-colors ${
            liveUpdatesEnabled
              ? 'bg-[#089981]/15 text-[#089981] border-[#089981]/30 hover:bg-[#089981]/25'
              : 'bg-[#1E222D] text-[#B2B5BE] border-[#363A45] hover:text-white'
          }`}
          title="Toggle real-time streaming market ticks"
        >
          <Activity className="w-3.5 h-3.5" />
          <span>{liveUpdatesEnabled ? 'Live 2.8s' : 'Paused'}</span>
        </button>

        {/* Search button */}
        <button
          id="btn-header-search"
          onClick={() => {
            sounds.playTick();
            onOpenSearch();
          }}
          className="p-2 rounded-lg text-[#B2B5BE] hover:text-white hover:bg-[#1E222D] transition-colors focus:outline-none focus:ring-1 focus:ring-[#2962ff]"
          aria-label="Search Markets"
        >
          <Search className="w-5 h-5" />
        </button>

        {/* Get started button */}
        <button
          id="btn-header-get-started"
          onClick={() => {
            sounds.playTick();
            onOpenGetStarted();
          }}
          className="bg-[#2962ff] hover:bg-[#1e54e4] active:scale-95 text-white font-['Inter'] font-semibold text-xs sm:text-sm px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-all duration-150 shadow-md flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-[#2962ff]/50 cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Get started</span>
        </button>
      </div>
    </header>
  );
};
