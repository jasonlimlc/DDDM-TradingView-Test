/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import {
  MarketAsset,
  MarketCategory,
  MarketRegion,
} from './types';
import { INITIAL_ASSETS } from './data/marketData';
import { Header } from './components/Header';
import { MarketsHeader } from './components/MarketsHeader';
import { CategoryTabs } from './components/CategoryTabs';
import { IndicesGrid } from './components/IndicesGrid';
import { WorldIndicesSection } from './components/WorldIndicesSection';
import { USStocksSection } from './components/USStocksSection';
import { CategoryAssetsSection } from './components/CategoryAssetsSection';
import { AssetDetailModal } from './components/AssetDetailModal';
import { SearchModal } from './components/SearchModal';
import { GetStartedModal } from './components/GetStartedModal';
import { WatchlistView } from './components/WatchlistView';
import { NewsView } from './components/NewsView';
import { MenuView } from './components/MenuView';
import { SidebarDrawer } from './components/SidebarDrawer';
import { BottomNav, MainNavTab } from './components/BottomNav';

export default function App() {
  // Navigation & Category states
  const [activeNavTab, setActiveNavTab] = useState<MainNavTab>('markets');
  const [selectedCategory, setSelectedCategory] = useState<MarketCategory>('indices');
  const [selectedRegion, setSelectedRegion] = useState<MarketRegion>('All');

  // Interactive toggle: exact screenshot replica mode vs live interactive mode
  const [isMockScreenshotMode, setIsMockScreenshotMode] = useState<boolean>(true);
  const [liveUpdatesEnabled, setLiveUpdatesEnabled] = useState<boolean>(true);

  // Asset Dataset & Watchlist
  const [assets, setAssets] = useState<MarketAsset[]>(INITIAL_ASSETS);
  const [watchlist, setWatchlist] = useState<string[]>(['sp500', 'nvda', 'aapl', 'btc']);

  // Modals & Drawers
  const [selectedAsset, setSelectedAsset] = useState<MarketAsset | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isGetStartedOpen, setIsGetStartedOpen] = useState<boolean>(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  // Real-time live price tick simulation
  useEffect(() => {
    if (!liveUpdatesEnabled) return;

    const interval = setInterval(() => {
      setAssets((prevAssets) =>
        prevAssets.map((asset) => {
          // 40% chance of an asset updating each cycle for realistic market rhythm
          if (Math.random() > 0.4) return asset;

          const percentDelta = (Math.random() - 0.49) * 0.4;
          const priceChange = asset.price * (percentDelta / 100);
          const newPrice = Math.max(asset.price + priceChange, 0.001);
          const newChange = asset.change + priceChange;
          const newChangePercent = asset.changePercent + percentDelta;

          const updatedSparkline = [...asset.sparkline.slice(1), newPrice];

          return {
            ...asset,
            price: Number(newPrice.toFixed(asset.price < 5 ? 4 : 2)),
            change: Number(newChange.toFixed(asset.price < 5 ? 4 : 2)),
            changePercent: Number(newChangePercent.toFixed(2)),
            high24h: Math.max(asset.high24h, newPrice),
            low24h: Math.min(asset.low24h, newPrice),
            sparkline: updatedSparkline,
          };
        })
      );
    }, 2800);

    return () => clearInterval(interval);
  }, [liveUpdatesEnabled]);

  // Keep selectedAsset synced if price updates
  useEffect(() => {
    if (selectedAsset) {
      const updated = assets.find((a) => a.id === selectedAsset.id);
      if (updated) {
        setSelectedAsset(updated);
      }
    }
  }, [assets]);

  // Watchlist toggle handler
  const handleToggleWatchlist = useCallback((assetId: string) => {
    setWatchlist((prev) =>
      prev.includes(assetId) ? prev.filter((id) => id !== assetId) : [...prev, assetId]
    );
  }, []);

  // Handler to open asset modal by symbol
  const handleSelectAssetBySymbol = useCallback(
    (symbol: string) => {
      const found = assets.find(
        (a) =>
          a.symbol.toLowerCase() === symbol.toLowerCase() ||
          a.name.toLowerCase().includes(symbol.toLowerCase())
      );
      if (found) {
        setSelectedAsset(found);
      }
    },
    [assets]
  );

  // Region filtering
  const filteredAssets = selectedRegion === 'All'
    ? assets
    : assets.filter((a) => a.region === selectedRegion || a.region === 'Global');

  return (
    <div className="min-h-screen bg-[#0f131e] text-[#dfe2f2] flex flex-col font-['Inter'] selection:bg-[#2962ff] selection:text-white pb-20 md:pb-6">
      {/* Top Header */}
      <Header
        onOpenMenu={() => setIsDrawerOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenGetStarted={() => setIsGetStartedOpen(true)}
        onSelectMarketsTab={() => {
          setActiveNavTab('markets');
          setSelectedCategory('indices');
        }}
        liveUpdatesEnabled={liveUpdatesEnabled}
        onToggleLiveUpdates={() => setLiveUpdatesEnabled(!liveUpdatesEnabled)}
      />

      {/* Main Content Area */}
      <main className="w-full max-w-5xl mx-auto px-4 md:px-8 pt-4 flex-1 flex flex-col gap-6">
        {activeNavTab === 'markets' && (
          <>
            {/* Header Title with Dropdown */}
            <MarketsHeader
              selectedRegion={selectedRegion}
              onSelectRegion={(reg) => setSelectedRegion(reg)}
              isMockScreenshotMode={isMockScreenshotMode}
              onToggleMockScreenshotMode={() => setIsMockScreenshotMode(!isMockScreenshotMode)}
            />

            {/* Navigation Tabs (Indices, Stocks, Crypto, Futures, Forex, Bonds) */}
            <CategoryTabs
              selectedCategory={selectedCategory}
              onSelectCategory={(cat) => setSelectedCategory(cat)}
            />

            {/* If 'indices' tab is selected -> show the exact 3 sections from the screenshot */}
            {selectedCategory === 'indices' && (
              <div className="flex flex-col gap-8">
                {/* Section 1: Indices Grid (S&P 500, Nasdaq 100) */}
                <IndicesGrid
                  assets={filteredAssets}
                  onSelectAsset={(asset) => setSelectedAsset(asset)}
                  isMockScreenshotMode={isMockScreenshotMode}
                />

                {/* Section 2: World Indices (NI225, UKX, etc.) */}
                <WorldIndicesSection
                  assets={filteredAssets}
                  onSelectAsset={(asset) => setSelectedAsset(asset)}
                  isMockScreenshotMode={isMockScreenshotMode}
                />

                {/* Section 3: US Stocks (NVIDIA, Apple, etc.) */}
                <USStocksSection
                  assets={filteredAssets}
                  onSelectAsset={(asset) => setSelectedAsset(asset)}
                  isMockScreenshotMode={isMockScreenshotMode}
                />
              </div>
            )}

            {/* If any other category is selected (Stocks, Crypto, Futures, Forex, Bonds) */}
            {selectedCategory !== 'indices' && (
              <CategoryAssetsSection
                category={selectedCategory}
                assets={filteredAssets}
                onSelectAsset={(asset) => setSelectedAsset(asset)}
                watchlist={watchlist}
                onToggleWatchlist={handleToggleWatchlist}
              />
            )}
          </>
        )}

        {/* Watchlist View */}
        {activeNavTab === 'watchlist' && (
          <WatchlistView
            assets={assets}
            watchlistIds={watchlist}
            onToggleWatchlist={handleToggleWatchlist}
            onSelectAsset={(asset) => setSelectedAsset(asset)}
            onOpenSearch={() => setIsSearchOpen(true)}
          />
        )}

        {/* News View */}
        {activeNavTab === 'news' && (
          <NewsView
            assets={assets}
            onSelectAssetBySymbol={handleSelectAssetBySymbol}
          />
        )}

        {/* Menu View */}
        {activeNavTab === 'menu' && (
          <MenuView
            liveUpdatesEnabled={liveUpdatesEnabled}
            onToggleLiveUpdates={() => setLiveUpdatesEnabled(!liveUpdatesEnabled)}
            isMockScreenshotMode={isMockScreenshotMode}
            onToggleMockScreenshotMode={() => setIsMockScreenshotMode(!isMockScreenshotMode)}
          />
        )}
      </main>

      {/* Slide-out Sidebar Drawer */}
      <SidebarDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        activeTab={activeNavTab}
        onSelectTab={(tab) => setActiveNavTab(tab)}
        onSelectRegion={(reg) => setSelectedRegion(reg)}
        liveUpdatesEnabled={liveUpdatesEnabled}
        onToggleLiveUpdates={() => setLiveUpdatesEnabled(!liveUpdatesEnabled)}
        isMockScreenshotMode={isMockScreenshotMode}
        onToggleMockScreenshotMode={() => setIsMockScreenshotMode(!isMockScreenshotMode)}
        onOpenGetStarted={() => setIsGetStartedOpen(true)}
      />

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        assets={assets}
        onSelectAsset={(asset) => setSelectedAsset(asset)}
        watchlist={watchlist}
        onToggleWatchlist={handleToggleWatchlist}
      />

      {/* Get Started Onboarding Modal */}
      <GetStartedModal
        isOpen={isGetStartedOpen}
        onClose={() => setIsGetStartedOpen(false)}
        onCompleteOnboarding={(accountName, selectedMarkets) => {
          setIsMockScreenshotMode(false);
          setActiveNavTab('markets');
        }}
      />

      {/* Detailed Asset Chart & Statistics Modal */}
      <AssetDetailModal
        asset={selectedAsset}
        onClose={() => setSelectedAsset(null)}
        isWatchlisted={selectedAsset ? watchlist.includes(selectedAsset.id) : false}
        onToggleWatchlist={handleToggleWatchlist}
      />

      {/* Bottom Navigation Bar */}
      <BottomNav
        activeTab={activeNavTab}
        onSelectTab={(tab) => setActiveNavTab(tab)}
        watchlistCount={watchlist.length}
      />
    </div>
  );
}
