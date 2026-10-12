import React from 'react';
import { ActiveTab } from '../types/store';

interface BottomNavProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  bagCount: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onTabChange,
  bagCount,
}) => {
  const tabs: { id: ActiveTab; label: string; icon: string; badge?: number }[] = [
    { id: 'store', label: 'Store', icon: 'storefront' },
    { id: 'explore', label: 'Explore', icon: 'devices' },
    { id: 'apple-tv', label: 'Apple TV+', icon: 'live_tv' },
    { id: 'bag-account', label: 'Bag & You', icon: 'local_mall', badge: bagCount },
  ];

  return (
    <nav
      className="fixed bottom-0 w-full z-50 pb-safe bg-[#ffffff]/90 backdrop-blur-xl border-t border-black/[0.06] shadow-[0_-1px_12px_rgba(0,0,0,0.04)]"
      aria-label="Bottom Navigation"
    >
      <div className="flex justify-around items-center h-16 max-w-lg mx-auto px-2">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center justify-center min-w-[64px] h-12 transition-all gap-0.5 relative cursor-pointer select-none ${
                isActive
                  ? 'text-[#0071e3] font-semibold scale-105'
                  : 'text-[#414753] hover:text-[#1a1b1f]'
              }`}
            >
              <div className="relative">
                <span
                  className="material-symbols-outlined text-[22px]"
                  style={isActive ? { fontVariationSettings: "'FILL' 1" } : undefined}
                >
                  {tab.icon}
                </span>
                {Boolean(tab.badge && tab.badge > 0) && (
                  <span className="absolute -top-1 -right-2 bg-[#0071e3] text-white text-[9px] font-bold rounded-full h-3.5 min-w-[14px] px-1 flex items-center justify-center">
                    {tab.badge}
                  </span>
                )}
              </div>
              <span className="text-[11px] leading-[15px] tracking-[0.004em]">
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
