import React from 'react';
import { BarChart3, Star, Newspaper, MoreHorizontal } from 'lucide-react';

export type MainNavTab = 'markets' | 'watchlist' | 'news' | 'menu';

interface BottomNavProps {
  activeTab: MainNavTab;
  onSelectTab: (tab: MainNavTab) => void;
  watchlistCount: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onSelectTab,
  watchlistCount,
}) => {
  const tabs: { id: MainNavTab; label: string; icon: React.ReactNode; badge?: number }[] = [
    {
      id: 'markets',
      label: 'Markets',
      icon: <BarChart3 className="w-5 h-5" />,
    },
    {
      id: 'watchlist',
      label: 'Watchlist',
      icon: <Star className="w-5 h-5" />,
      badge: watchlistCount > 0 ? watchlistCount : undefined,
    },
    {
      id: 'news',
      label: 'News',
      icon: <Newspaper className="w-5 h-5" />,
    },
    {
      id: 'menu',
      label: 'Menu',
      icon: <MoreHorizontal className="w-5 h-5" />,
    },
  ];

  return (
    <nav
      id="bottom-nav-bar"
      className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center h-14 bg-[#1b1f2b] border-t border-[#434656]/50 shadow-lg backdrop-blur-md"
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            id={`nav-tab-${tab.id}`}
            onClick={() => onSelectTab(tab.id)}
            className={`flex flex-col items-center justify-center w-full h-full relative transition-all duration-150 focus:outline-none ${
              isActive
                ? 'text-[#b6c4ff] font-bold'
                : 'text-[#c3c5d8] hover:text-[#dfe2f2]'
            }`}
          >
            <div className="relative">
              {tab.icon}
              {tab.badge !== undefined && (
                <span className="absolute -top-1 -right-2 bg-[#2962ff] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center ring-2 ring-[#1b1f2b]">
                  {tab.badge}
                </span>
              )}
            </div>
            <span className="font-['Inter'] text-[11px] tracking-wider uppercase font-bold mt-1">
              {tab.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};
