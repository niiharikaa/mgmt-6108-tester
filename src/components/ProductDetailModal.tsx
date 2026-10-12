import React from 'react';
import { Product, RegionCurrency } from '../types/store';

interface ProductDetailModalProps {
  product: Product;
  currentRegion: RegionCurrency;
  onClose: () => void;
  onOpenConfig: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  currentRegion,
  onClose,
  onOpenConfig,
}) => {
  const formatPrice = (sgd: number) => {
    const val = Math.round(sgd * currentRegion.rateFromSGD);
    return `${currentRegion.symbol}${val.toLocaleString()}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in-50">
      <div className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto no-scrollbar shadow-2xl border border-black/10 flex flex-col">
        {/* Sticky Header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-black/[0.05] flex items-center justify-between z-10">
          <div>
            <span className="text-[11px] font-bold text-[#0071E3] uppercase tracking-wider">
              {product.kicker || 'Overview'}
            </span>
            <h3 className="text-xl font-bold text-[#1D1D1F] leading-tight">
              {product.name}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#F5F5F7] hover:bg-neutral-200 text-[#1D1D1F] flex items-center justify-center cursor-pointer transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Main Visual */}
          <div className="w-full h-64 bg-[#F5F5F7] rounded-2xl p-4 flex items-center justify-center relative overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="max-h-full max-w-full object-contain drop-shadow-lg"
            />
          </div>

          <div>
            <h4 className="text-lg font-bold text-[#1D1D1F]">{product.tagline}</h4>
            <p className="text-sm text-[#6E6E73] mt-2 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Key Specifications Grid */}
          <div>
            <h5 className="text-xs font-bold text-[#1D1D1F] uppercase tracking-wider mb-3">
              Technical Specifications
            </h5>
            <div className="bg-[#F5F5F7] rounded-2xl p-4 divide-y divide-black/[0.05] space-y-2.5">
              {product.specs.map((sp, idx) => (
                <div key={idx} className="flex flex-col sm:flex-row sm:justify-between pt-2.5 first:pt-0 gap-1 text-xs">
                  <span className="font-semibold text-neutral-800">{sp.label}</span>
                  <span className="text-neutral-600 sm:text-right max-w-sm">{sp.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Environmental Stewardship */}
          <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 flex items-start gap-3">
            <span className="material-symbols-outlined text-emerald-600 text-[22px] shrink-0">
              eco
            </span>
            <div className="text-xs">
              <span className="font-bold text-emerald-900 block">Apple 2030 Carbon Neutral Commitment</span>
              <p className="text-emerald-700 mt-0.5">
                Constructed using 100% recycled cobalt in the battery, recycled gold in circuit plating, and packaged in 100% fiber-based materials across Singapore.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="sticky bottom-0 bg-white/95 backdrop-blur-md px-6 py-4 border-t border-black/[0.05] flex items-center justify-between z-10">
          <div>
            <span className="text-[10px] text-[#6E6E73] uppercase tracking-wider block">Pricing in Singapore</span>
            <span className="text-lg font-bold text-[#1D1D1F]">
              From {formatPrice(product.basePriceSGD)}
            </span>
          </div>
          <button
            onClick={() => {
              onClose();
              onOpenConfig();
            }}
            className="px-6 py-2.5 bg-[#0071E3] hover:bg-[#0077ED] text-white text-xs font-semibold rounded-full shadow-md active:scale-95 transition-all cursor-pointer"
          >
            Buy {product.name}
          </button>
        </div>
      </div>
    </div>
  );
};
