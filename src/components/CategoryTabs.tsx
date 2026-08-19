import React from 'react';
import { MarketCategory } from '../types';

interface CategoryTabsProps {
  selectedCategory: MarketCategory;
  onSelectCategory: (category: MarketCategory) => void;
}

export const CategoryTabs: React.FC<CategoryTabsProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  const tabs: { id: MarketCategory; label: string }[] = [
    { id: 'indices', label: 'Indices' },
    { id: 'stocks', label: 'Stocks' },
    { id: 'crypto', label: 'Crypto' },
    { id: 'futures', label: 'Futures' },
    { id: 'forex', label: 'Forex' },
    { id: 'bonds', label: 'Bonds' },
  ];

  return (
    <nav id="category-tabs-nav" className="w-full overflow-x-auto no-scrollbar py-1">
      <ul className="flex items-center gap-1.5 border border-[#434656]/60 rounded-full p-1 bg-[#1E222D] inline-flex min-w-max">
        {tabs.map((tab) => {
          const isActive = selectedCategory === tab.id;
          return (
            <li key={tab.id}>
              <button
                id={`tab-${tab.id}`}
                onClick={() => onSelectCategory(tab.id)}
                className={`px-4 py-1.5 rounded-full font-['Inter'] text-[11px] uppercase tracking-wider font-bold whitespace-nowrap transition-all duration-150 focus:outline-none ${
                  isActive
                    ? 'bg-[#2A2E39] text-[#dfe2f2] shadow-sm ring-1 ring-[#363A45]'
                    : 'text-[#c3c5d8] hover:text-[#dfe2f2] hover:bg-[#2A2E39]/60'
                }`}
              >
                {tab.label}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
