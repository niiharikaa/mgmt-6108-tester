import React from 'react';
import { ActiveTab } from '../types/store';

interface HeaderProps {
  activeTab: ActiveTab;
  bagCount: number;
  onOpenBag: () => void;
  onOpenSearch: () => void;
  onOpenProfile: () => void;
  onLogoClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  bagCount,
  onOpenBag,
  onOpenSearch,
  onOpenProfile,
  onLogoClick,
}) => {
  const getTitle = () => {
    switch (activeTab) {
      case 'store':
        return 'Store';
      case 'explore':
        return 'Explore';
      case 'apple-tv':
        return 'Apple TV+';
      case 'bag-account':
        return 'Bag & You';
      default:
        return 'Store';
    }
  };

  return (
    <header className="fixed top-0 w-full z-50 pt-safe bg-[#ffffff]/80 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-b border-black/[0.04]">
      {/* Top Delivery & Pickup Ribbon */}
      <div className="bg-[#f5f5f7]/90 px-4 py-1 flex items-center justify-center gap-1.5 border-b border-black/[0.03]">
        <span className="material-symbols-outlined text-[#0071e3] text-[14px]">local_shipping</span>
        <span className="text-[11px] leading-[15px] text-[#6e6e73] font-normal tracking-[0.004em] text-center">
          Apple Store Pickup &amp; Free Delivery across Singapore
        </span>
      </div>

      {/* Primary Navigation Row */}
      <div className="h-16 px-4 flex items-center justify-between max-w-5xl mx-auto">
        <button
          onClick={onLogoClick}
          className="flex items-center gap-2 text-left cursor-pointer group focus:outline-none"
          title="Apple Singapore Store Home"
        >
          <span className="material-symbols-outlined text-[#1a1b1f] text-[24px] select-none group-hover:text-[#0071e3] transition-colors">
            app_badging
          </span>
          <h1 className="text-[17px] leading-tight font-semibold text-[#1d1d1f] tracking-tight">
            {getTitle()}
          </h1>
        </button>

        <div className="flex items-center gap-1">
          {/* Search Button */}
          <button
            onClick={onOpenSearch}
            aria-label="Search Apple Products"
            className="w-11 h-11 flex items-center justify-center text-[#414753] hover:text-[#1a1b1f] hover:bg-black/[0.03] rounded-full transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">search</span>
          </button>

          {/* Shopping Bag Button */}
          <button
            onClick={onOpenBag}
            aria-label="Shopping Bag"
            className="w-11 h-11 flex items-center justify-center text-[#414753] hover:text-[#1a1b1f] hover:bg-black/[0.03] rounded-full transition-colors relative cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
            {bagCount > 0 && (
              <span className="absolute top-2 right-2 min-w-[16px] h-4 bg-[#0071e3] text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1 shadow-xs animate-in zoom-in-50">
                {bagCount}
              </span>
            )}
          </button>

          {/* Profile Button */}
          <button
            onClick={onOpenProfile}
            aria-label="Account and Profile"
            className="w-8 h-8 rounded-full bg-[#0071e3] hover:bg-[#005bb5] flex items-center justify-center ml-1 text-white shadow-xs cursor-pointer transition-transform active:scale-95"
          >
            <span className="material-symbols-outlined text-white text-[18px]">person</span>
          </button>
        </div>
      </div>
    </header>
  );
};
