import React, { useState } from 'react';
import { NewsItem, MarketAsset } from '../types';
import { NEWS_ITEMS } from '../data/marketData';
import { Newspaper, Clock, TrendingUp, TrendingDown, Tag, ArrowUpRight } from 'lucide-react';

interface NewsViewProps {
  assets: MarketAsset[];
  onSelectAssetBySymbol: (symbol: string) => void;
}

export const NewsView: React.FC<NewsViewProps> = ({
  assets,
  onSelectAssetBySymbol,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedSentiment, setSelectedSentiment] = useState<string>('All');

  const categories = ['All', 'Tech & AI', 'Macro Economy', 'Crypto', 'Global Markets', 'Commodities'];

  const filteredNews = NEWS_ITEMS.filter((item) => {
    const matchCat = selectedCategory === 'All' || item.category === selectedCategory;
    const matchSent = selectedSentiment === 'All' || item.sentiment === selectedSentiment.toLowerCase();
    return matchCat && matchSent;
  });

  return (
    <div id="news-view-container" className="flex flex-col gap-6 pt-2 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="font-['Hanken_Grotesk'] text-3xl font-bold text-white flex items-center gap-2">
            <Newspaper className="w-7 h-7 text-[#2962ff]" />
            Market News & Intelligence
          </h1>
          <p className="text-xs text-[#B2B5BE] mt-1">
            Curated macroeconomic developments, earnings commentary, and market signals
          </p>
        </div>

        {/* Sentiment Filter */}
        <div className="flex items-center gap-1 bg-[#1E222D] p-1 rounded-xl border border-[#363A45] w-fit">
          {['All', 'Bullish', 'Bearish'].map((sentiment) => (
            <button
              key={sentiment}
              onClick={() => setSelectedSentiment(sentiment)}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${
                selectedSentiment === sentiment
                  ? 'bg-[#2962ff] text-white'
                  : 'text-[#B2B5BE] hover:text-white'
              }`}
            >
              {sentiment}
            </button>
          ))}
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-colors ${
              selectedCategory === cat
                ? 'bg-[#2A2E39] text-[#b6c4ff] border border-[#2962ff]'
                : 'bg-[#1E222D] text-[#B2B5BE] hover:text-white border border-[#363A45]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* News Feed List */}
      <div className="flex flex-col gap-4">
        {filteredNews.map((news) => {
          const isBull = news.sentiment === 'bullish';
          const isBear = news.sentiment === 'bearish';

          return (
            <article
              key={news.id}
              id={`news-card-${news.id}`}
              className="bg-[#1E222D] hover:bg-[#232734] border border-[#363A45] rounded-2xl p-5 flex flex-col gap-3 transition-all shadow-sm"
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 text-xs">
                  <span className="font-bold text-[#b6c4ff]">{news.source}</span>
                  <span className="text-[#B2B5BE]">•</span>
                  <span className="text-[#B2B5BE] flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {news.timeAgo}
                  </span>
                  <span className="text-[#B2B5BE] hidden sm:inline">• {news.readTime} read</span>
                </div>

                <div
                  className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 ${
                    isBull
                      ? 'bg-[#089981]/15 text-[#089981] border border-[#089981]/30'
                      : isBear
                      ? 'bg-[#F23645]/15 text-[#F23645] border border-[#F23645]/30'
                      : 'bg-[#313441] text-[#B2B5BE]'
                  }`}
                >
                  {isBull && <TrendingUp className="w-3 h-3" />}
                  {isBear && <TrendingDown className="w-3 h-3" />}
                  {news.sentiment}
                </div>
              </div>

              <h2 className="font-['Hanken_Grotesk'] text-lg font-bold text-white leading-snug">
                {news.title}
              </h2>

              <p className="text-xs sm:text-sm text-[#B2B5BE] leading-relaxed">
                {news.summary}
              </p>

              {/* Related Ticker Tags */}
              <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#363A45]/50">
                <span className="text-[11px] text-[#B2B5BE] flex items-center gap-1">
                  <Tag className="w-3 h-3" /> Related:
                </span>
                {news.relatedSymbols.map((sym) => (
                  <button
                    key={sym}
                    onClick={() => onSelectAssetBySymbol(sym)}
                    className="px-2.5 py-1 rounded-md bg-[#131722] hover:bg-[#2962ff] text-[#dfe2f2] hover:text-white border border-[#363A45] text-xs font-mono font-bold flex items-center gap-1 transition-colors"
                  >
                    <span>{sym}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-60" />
                  </button>
                ))}
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};
