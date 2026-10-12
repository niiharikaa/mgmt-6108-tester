import React, { useState } from 'react';
import { Product, RegionCurrency } from '../types/store';

interface ProductConfigModalProps {
  product: Product;
  currentRegion: RegionCurrency;
  onClose: () => void;
  onAddToBag: (product: Product, color?: string, storage?: string, priceSGD?: number) => void;
}

export const ProductConfigModal: React.FC<ProductConfigModalProps> = ({
  product,
  currentRegion,
  onClose,
  onAddToBag,
}) => {
  const [selectedColor, setSelectedColor] = useState<string>(
    product.colors?.[0]?.name || ''
  );
  const [selectedStorageIdx, setSelectedStorageIdx] = useState<number>(0);
  const [tradeInSelected, setTradeInSelected] = useState<boolean>(false);
  const [addedSuccess, setAddedSuccess] = useState<boolean>(false);

  const selectedStorage = product.storages?.[selectedStorageIdx];
  const extraPrice = selectedStorage?.extraPrice || 0;
  const tradeInDiscount = tradeInSelected ? 350 : 0;
  const finalPriceSGD = Math.max(0, product.basePriceSGD + extraPrice - tradeInDiscount);

  const formatPrice = (sgd: number) => {
    const val = Math.round(sgd * currentRegion.rateFromSGD);
    return `${currentRegion.symbol}${val.toLocaleString()}`;
  };

  const handleAdd = () => {
    onAddToBag(product, selectedColor, selectedStorage?.size, finalPriceSGD);
    setAddedSuccess(true);
    setTimeout(() => {
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in-50">
      <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto no-scrollbar shadow-2xl border border-black/10 flex flex-col">
        {/* Header bar */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-black/[0.05] flex items-center justify-between z-10">
          <div>
            <span className="text-[11px] font-bold text-[#0071E3] uppercase tracking-wider">
              {product.kicker || 'Configure'}
            </span>
            <h3 className="text-xl font-bold text-[#1D1D1F] leading-tight">
              Buy {product.name}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#F5F5F7] hover:bg-neutral-200 text-[#1D1D1F] flex items-center justify-center cursor-pointer transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Content body */}
        <div className="p-6 space-y-6">
          {/* Product visual showcase */}
          <div className="w-full h-52 bg-[#F5F5F7] rounded-2xl p-4 flex items-center justify-center relative overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="max-h-full max-w-full object-contain drop-shadow-md"
            />
            {selectedColor && (
              <span className="absolute bottom-2 left-3 text-[11px] font-medium text-[#6E6E73] bg-white/80 px-2 py-0.5 rounded-md backdrop-blur-xs">
                {selectedColor}
              </span>
            )}
          </div>

          {/* Color finishes selection */}
          {product.colors && product.colors.length > 0 && (
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#1D1D1F] block">
                Finish. <span className="font-normal text-[#6E6E73]">Pick your favorite color.</span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(c.name)}
                    className={`p-3 rounded-xl border flex items-center gap-2.5 text-left cursor-pointer transition-all ${
                      selectedColor === c.name
                        ? 'border-[#0071E3] bg-blue-50/30 ring-1 ring-[#0071E3]'
                        : 'border-black/10 hover:border-black/20'
                    }`}
                  >
                    <span
                      className="w-5 h-5 rounded-full border border-black/15 shadow-xs shrink-0"
                      style={{ backgroundColor: c.hex }}
                    />
                    <span className="text-xs font-semibold text-[#1D1D1F] truncate">
                      {c.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Storage / Configuration tiers */}
          {product.storages && product.storages.length > 0 && (
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#1D1D1F] block">
                Configuration. <span className="font-normal text-[#6E6E73]">Select capacity &amp; silicon.</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {product.storages.map((s, idx) => (
                  <button
                    key={s.size}
                    onClick={() => setSelectedStorageIdx(idx)}
                    className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                      selectedStorageIdx === idx
                        ? 'border-[#0071E3] bg-blue-50/30 ring-1 ring-[#0071E3]'
                        : 'border-black/10 hover:border-black/20'
                    }`}
                  >
                    <span className="text-xs font-bold text-[#1D1D1F] block">{s.size}</span>
                    <span className="text-[11px] text-[#6E6E73] tabular-nums">
                      {s.extraPrice === 0 ? 'Included' : `+${formatPrice(s.extraPrice)}`}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Apple Trade In Singapore Simulator */}
          <div className="p-3.5 bg-[#F5F5F7] rounded-xl border border-black/[0.04] space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[#0071E3] text-[18px]">
                  currency_exchange
                </span>
                <span className="text-xs font-bold text-[#1D1D1F]">
                  Apple Trade In Singapore
                </span>
              </div>
              <input
                type="checkbox"
                id="tradeInCheck"
                checked={tradeInSelected}
                onChange={(e) => setTradeInSelected(e.target.checked)}
                className="w-4 h-4 accent-[#0071E3] cursor-pointer"
              />
            </div>
            <p className="text-[11px] text-[#6E6E73]">
              Trade in your current device for instant credit towards this purchase (e.g. up to S$350 estimated).
            </p>
          </div>

          {/* Singapore Store Availability Check */}
          <div className="space-y-1 text-[11px] text-[#6E6E73] border-t border-black/[0.05] pt-3">
            <div className="flex items-center gap-1.5 text-emerald-700 font-medium">
              <span className="material-symbols-outlined text-[16px]">check_circle</span>
              <span>Available for Pickup today at Apple Marina Bay Sands &amp; Orchard Road</span>
            </div>
            <div className="flex items-center gap-1.5 text-neutral-600">
              <span className="material-symbols-outlined text-[16px]">local_shipping</span>
              <span>Free Express Delivery across Singapore (1–2 business days)</span>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="sticky bottom-0 bg-white/95 backdrop-blur-md px-6 py-4 border-t border-black/[0.05] flex items-center justify-between z-10">
          <div>
            <span className="text-[10px] text-[#6E6E73] uppercase tracking-wider block">Total Price (GST incl.)</span>
            <span className="text-lg font-bold text-[#1D1D1F] tabular-nums">
              {formatPrice(finalPriceSGD)}
            </span>
          </div>
          <button
            onClick={handleAdd}
            disabled={addedSuccess}
            className="px-6 py-2.5 bg-[#0071E3] hover:bg-[#0077ED] text-white text-xs font-semibold rounded-full shadow-md active:scale-95 transition-all cursor-pointer flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[16px]">
              {addedSuccess ? 'check' : 'add_shopping_cart'}
            </span>
            <span>{addedSuccess ? 'Added to Bag!' : 'Add to Bag'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
