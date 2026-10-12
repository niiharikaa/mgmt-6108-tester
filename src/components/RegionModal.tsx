import React from 'react';
import { RegionCurrency } from '../types/store';
import { REGIONS } from '../data/storeData';

interface RegionModalProps {
  currentRegion: RegionCurrency;
  onSelectRegion: (region: RegionCurrency) => void;
  onClose: () => void;
}

export const RegionModal: React.FC<RegionModalProps> = ({
  currentRegion,
  onSelectRegion,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in-50">
      <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-black/10 space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-black/[0.05]">
          <div>
            <h3 className="text-base font-bold text-[#1D1D1F]">Choose your region</h3>
            <p className="text-[11px] text-[#6E6E73]">
              Select currency &amp; localized pricing
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#F5F5F7] hover:bg-neutral-200 text-[#1D1D1F] flex items-center justify-center cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <div className="space-y-1.5 max-h-72 overflow-y-auto no-scrollbar">
          {REGIONS.map((r) => {
            const isSelected = r.code === currentRegion.code;
            return (
              <button
                key={r.code}
                onClick={() => {
                  onSelectRegion(r);
                  onClose();
                }}
                className={`w-full p-3 rounded-xl flex items-center justify-between text-left cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-blue-50/60 text-[#0071E3] font-semibold border border-[#0071E3]'
                    : 'hover:bg-[#F5F5F7] text-[#1D1D1F]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-sm font-bold text-neutral-400 font-mono w-6">
                    {r.code}
                  </span>
                  <div>
                    <span className="text-xs font-semibold block">{r.name}</span>
                    <span className="text-[10px] text-neutral-500">
                      Currency: {r.symbol}
                    </span>
                  </div>
                </div>
                {isSelected && (
                  <span className="material-symbols-outlined text-[#0071E3] text-[20px]">
                    check
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <div className="pt-2 text-[11px] text-neutral-400 text-center">
          Singapore Standard Time (SGT) is the primary store fulfillment zone.
        </div>
      </div>
    </div>
  );
};
