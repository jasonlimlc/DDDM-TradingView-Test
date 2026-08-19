import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, Zap, TrendingUp, Sparkles } from 'lucide-react';

interface GetStartedModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCompleteOnboarding: (accountName: string, selectedMarkets: string[]) => void;
}

export const GetStartedModal: React.FC<GetStartedModalProps> = ({
  isOpen,
  onClose,
  onCompleteOnboarding,
}) => {
  const [accountName, setAccountName] = useState('Active Trader');
  const [selectedMarkets, setSelectedMarkets] = useState<string[]>([
    'US Equities',
    'Major Indices',
    'Crypto',
  ]);
  const [isCompleted, setIsCompleted] = useState(false);

  if (!isOpen) return null;

  const marketOptions = [
    'Major Indices (S&P, Nasdaq)',
    'US Equities (NVIDIA, Apple)',
    'Crypto (Bitcoin, Ethereum)',
    'Global Commodities (Gold, Oil)',
    'Forex & Currencies',
    'Sovereign Bond Yields',
  ];

  const toggleMarket = (market: string) => {
    if (selectedMarkets.includes(market)) {
      setSelectedMarkets(selectedMarkets.filter((m) => m !== market));
    } else {
      setSelectedMarkets([...selectedMarkets, market]);
    }
  };

  const handleFinish = () => {
    setIsCompleted(true);
    setTimeout(() => {
      onCompleteOnboarding(accountName, selectedMarkets);
      onClose();
      setIsCompleted(false);
    }, 1200);
  };

  return (
    <div
      id="get-started-modal-overlay"
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        id="get-started-modal-box"
        className="bg-[#1E222D] border border-[#363A45] rounded-2xl w-full max-w-lg shadow-2xl p-6 relative animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-2 text-[#B2B5BE] hover:text-white rounded-lg hover:bg-[#2A2E39]"
        >
          <X className="w-5 h-5" />
        </button>

        {isCompleted ? (
          <div className="py-12 flex flex-col items-center justify-center text-center gap-4">
            <div className="w-16 h-16 rounded-full bg-[#089981]/20 border border-[#089981] flex items-center justify-center text-[#089981] animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="font-['Hanken_Grotesk'] text-2xl font-bold text-white">
              Welcome to Markets Overview!
            </h3>
            <p className="text-sm text-[#B2B5BE] max-w-xs">
              Your $100,000 virtual paper portfolio and curated feeds are activated.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-[#2962ff]/10 text-[#2962ff] border border-[#2962ff]/30 mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                Free Pro Access
              </div>
              <h2 className="font-['Hanken_Grotesk'] text-2xl font-bold text-white">
                Get started with Markets
              </h2>
              <p className="text-sm text-[#B2B5BE] mt-1">
                Track global indices, explore live real-time quotes, and simulate paper trading with zero risk.
              </p>
            </div>

            {/* Account Profile */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[#B2B5BE]">
                Trader Profile Name
              </label>
              <input
                type="text"
                value={accountName}
                onChange={(e) => setAccountName(e.target.value)}
                className="w-full bg-[#131722] border border-[#363A45] rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#2962ff]"
              />
            </div>

            {/* Preferred Markets */}
            <div className="flex flex-col gap-2.5">
              <label className="text-xs font-bold uppercase tracking-wider text-[#B2B5BE]">
                Select Primary Focus Markets
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {marketOptions.map((opt) => {
                  const isChecked = selectedMarkets.includes(opt);
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => toggleMarket(opt)}
                      className={`p-2.5 rounded-xl text-left text-xs font-medium border flex items-center justify-between transition-colors ${
                        isChecked
                          ? 'bg-[#2962ff]/15 border-[#2962ff] text-white'
                          : 'bg-[#131722] border-[#363A45] text-[#B2B5BE] hover:border-[#434656]'
                      }`}
                    >
                      <span className="truncate">{opt}</span>
                      {isChecked && <CheckCircle2 className="w-4 h-4 text-[#2962ff] flex-shrink-0 ml-1" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Virtual Capital Perk */}
            <div className="bg-[#131722] border border-[#363A45] rounded-xl p-3.5 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#089981]/20 border border-[#089981]/40 flex items-center justify-center text-[#089981] flex-shrink-0">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-white">Included Demo Paper Portfolio</div>
                <div className="text-xs text-[#B2B5BE]">$100,000.00 virtual capital to test strategies</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl border border-[#363A45] text-[#B2B5BE] hover:text-white text-sm font-semibold transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                id="btn-confirm-get-started"
                onClick={handleFinish}
                className="flex-1 bg-[#2962ff] hover:bg-[#1b4ed8] active:scale-95 text-white font-bold py-2.5 rounded-xl text-sm transition-all shadow-lg flex items-center justify-center gap-2"
              >
                <Zap className="w-4 h-4" />
                Launch Dashboard
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
