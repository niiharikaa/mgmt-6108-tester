import React, { useState } from 'react';
import { Product, RegionCurrency } from '../types/store';

interface ExploreScreenProps {
  products: Product[];
  currentRegion: RegionCurrency;
  onOpenProductConfig: (productId: string) => void;
  onOpenProductDetail: (productId: string) => void;
}

export const ExploreScreen: React.FC<ExploreScreenProps> = ({
  products,
  currentRegion,
  onOpenProductConfig,
  onOpenProductDetail,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [compareTab, setCompareTab] = useState<'iphone' | 'mac'>('iphone');

  const categories = [
    { id: 'all', label: 'All Products', icon: 'devices' },
    { id: 'iphone', label: 'iPhone', icon: 'smartphone' },
    { id: 'mac', label: 'Mac', icon: 'laptop_mac' },
    { id: 'watch', label: 'Watch', icon: 'watch' },
    { id: 'ipad', label: 'iPad', icon: 'tablet_mac' },
    { id: 'airpods', label: 'AirPods', icon: 'headphones' },
  ];

  const filteredProducts =
    activeCategory === 'all'
      ? products
      : products.filter((p) => p.category === activeCategory);

  const formatPrice = (sgd: number) => {
    const val = Math.round(sgd * currentRegion.rateFromSGD);
    return `${currentRegion.symbol}${val.toLocaleString()}`;
  };

  return (
    <div className="flex flex-col w-full pb-10">
      {/* Header Banner */}
      <div className="bg-[#FFFFFF] border-b border-black/[0.04] pt-4 pb-6 px-4">
        <div className="max-w-4xl mx-auto">
          <span className="text-[12px] font-semibold text-[#0071E3] tracking-wide uppercase">
            Explore All Hardware
          </span>
          <h2 className="text-[28px] sm:text-[36px] font-bold text-[#1D1D1F] tracking-tight mt-1">
            The future of Apple intelligence.
          </h2>
          <p className="text-[15px] text-[#6E6E73] mt-1 max-w-xl">
            Designed for performance, privacy, and precision craftsmanship. Fully supported across Singapore with AppleCare+ and local Genius Bar service.
          </p>

          {/* Category Filter Tabs */}
          <div className="flex gap-2 overflow-x-auto no-scrollbar pt-4 pb-1">
            {categories.map((cat) => {
              const isSelected = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#1D1D1F] text-white shadow-xs'
                      : 'bg-[#F5F5F7] text-[#6E6E73] hover:text-[#1D1D1F] hover:bg-neutral-200/60'
                  }`}
                >
                  <span className="material-symbols-outlined text-[16px]">{cat.icon}</span>
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Product Catalog Grid */}
      <div className="max-w-4xl mx-auto px-4 py-8 w-full">
        <div className="flex items-center justify-between mb-4">
          <p className="text-[13px] font-medium text-[#6E6E73]">
            Showing {filteredProducts.length} devices
          </p>
          <span className="text-[11px] text-[#0071E3] font-medium">
            GST included in SGD
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredProducts.map((product) => {
            const isDark = product.theme === 'pro-dark';
            return (
              <div
                key={product.id}
                className={`rounded-2xl p-5 flex flex-col justify-between transition-all duration-300 border ${
                  isDark
                    ? 'bg-neutral-950 text-white border-neutral-800 shadow-md'
                    : 'bg-white text-[#1D1D1F] border-black/[0.06] shadow-xs'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-[11px] font-bold uppercase tracking-wider ${
                        isDark ? 'text-[#abc7ff]' : 'text-[#0071E3]'
                      }`}
                    >
                      {product.kicker || product.category.toUpperCase()}
                    </span>
                    <span
                      className={`text-[13px] font-semibold tabular-nums ${
                        isDark ? 'text-neutral-200' : 'text-[#1D1D1F]'
                      }`}
                    >
                      From {formatPrice(product.basePriceSGD)}
                    </span>
                  </div>

                  <h3 className="text-[20px] font-bold mt-1 tracking-tight">
                    {product.name}
                  </h3>
                  <p
                    className={`text-[13px] mt-0.5 line-clamp-1 ${
                      isDark ? 'text-neutral-400' : 'text-[#6E6E73]'
                    }`}
                  >
                    {product.tagline}
                  </p>

                  {/* Image Slot */}
                  <div className="w-full h-44 rounded-xl my-4 overflow-hidden flex items-center justify-center p-2 bg-black/[0.02]">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-contain transition-transform duration-300 hover:scale-105"
                      loading="lazy"
                    />
                  </div>

                  {/* Quick specs pill row */}
                  <div className="space-y-1 my-3">
                    {product.specs.slice(0, 2).map((sp, idx) => (
                      <div
                        key={idx}
                        className={`text-[11px] flex items-center justify-between ${
                          isDark ? 'text-neutral-400' : 'text-[#6E6E73]'
                        }`}
                      >
                        <span className="font-medium">{sp.label}</span>
                        <span className="text-right truncate max-w-[200px]">
                          {sp.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 pt-3 border-t border-black/[0.06] dark:border-white/10">
                  <button
                    onClick={() => onOpenProductDetail(product.id)}
                    className={`flex-1 py-2 text-xs font-medium rounded-full cursor-pointer transition-all active:scale-95 ${
                      isDark
                        ? 'bg-neutral-900 hover:bg-neutral-800 text-neutral-200'
                        : 'bg-[#F5F5F7] hover:bg-neutral-200 text-[#1D1D1F]'
                    }`}
                  >
                    Specifications
                  </button>
                  <button
                    onClick={() => onOpenProductConfig(product.id)}
                    className="flex-1 py-2 text-xs font-semibold rounded-full bg-[#0071E3] hover:bg-[#0077ED] text-white cursor-pointer transition-all active:scale-95 shadow-xs"
                  >
                    Configure &amp; Buy
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Interactive Device Comparison Studio */}
      <div className="max-w-4xl mx-auto px-4 py-6 w-full">
        <div className="bg-white rounded-2xl p-6 border border-black/[0.06] shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <div>
              <span className="text-xs font-semibold text-[#0071E3] uppercase tracking-wide">
                Side-by-Side Analysis
              </span>
              <h3 className="text-[20px] font-bold text-[#1D1D1F]">
                Compare flagship innovations.
              </h3>
            </div>
            <div className="flex items-center gap-1 p-1 bg-[#F5F5F7] rounded-xl self-start sm:self-auto">
              <button
                onClick={() => setCompareTab('iphone')}
                className={`px-3 py-1 text-xs font-medium rounded-lg cursor-pointer transition-all ${
                  compareTab === 'iphone'
                    ? 'bg-white text-[#1D1D1F] shadow-xs'
                    : 'text-[#6E6E73] hover:text-[#1D1D1F]'
                }`}
              >
                iPhone 18 Pro vs Duo
              </button>
              <button
                onClick={() => setCompareTab('mac')}
                className={`px-3 py-1 text-xs font-medium rounded-lg cursor-pointer transition-all ${
                  compareTab === 'mac'
                    ? 'bg-white text-[#1D1D1F] shadow-xs'
                    : 'text-[#6E6E73] hover:text-[#1D1D1F]'
                }`}
              >
                Mac Silicon Matrix
              </button>
            </div>
          </div>

          {compareTab === 'iphone' ? (
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-[#F5F5F7]/80 flex flex-col text-center items-center">
                <span className="text-xs font-bold text-[#1D1D1F]">iPhone 18 Pro</span>
                <span className="text-[11px] text-[#6E6E73]">From S$1,699</span>
                <div className="w-24 h-24 my-2">
                  <img src={products[0]?.image} alt="iPhone 18 Pro" className="w-full h-full object-contain" />
                </div>
                <div className="text-left w-full space-y-2 mt-2 text-xs">
                  <div className="border-t border-black/5 pt-1">
                    <span className="text-neutral-500 block text-[10px]">Material</span>
                    <span className="font-semibold text-neutral-800">Titanium Body</span>
                  </div>
                  <div className="border-t border-black/5 pt-1">
                    <span className="text-neutral-500 block text-[10px]">Form Factor</span>
                    <span className="font-semibold text-neutral-800">Ultra-slim Monolithic</span>
                  </div>
                  <div className="border-t border-black/5 pt-1">
                    <span className="text-neutral-500 block text-[10px]">Optical Zoom</span>
                    <span className="font-semibold text-neutral-800">10x Periscope Quad-Lens</span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#F5F5F7]/80 flex flex-col text-center items-center">
                <span className="text-xs font-bold text-[#1D1D1F]">iPhone Duo</span>
                <span className="text-[11px] text-[#6E6E73]">From S$2,199</span>
                <div className="w-24 h-24 my-2">
                  <img src={products[1]?.image} alt="iPhone Duo" className="w-full h-full object-contain" />
                </div>
                <div className="text-left w-full space-y-2 mt-2 text-xs">
                  <div className="border-t border-black/5 pt-1">
                    <span className="text-neutral-500 block text-[10px]">Material</span>
                    <span className="font-semibold text-neutral-800">Liquidmetal Hinge</span>
                  </div>
                  <div className="border-t border-black/5 pt-1">
                    <span className="text-neutral-500 block text-[10px]">Form Factor</span>
                    <span className="font-semibold text-neutral-800">7.8″ Dual-Screen Foldable</span>
                  </div>
                  <div className="border-t border-black/5 pt-1">
                    <span className="text-neutral-500 block text-[10px]">Multitasking</span>
                    <span className="font-semibold text-neutral-800">Split-screen fluid iOS</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-black/[0.08] text-neutral-500">
                    <th className="py-2 pr-4 font-semibold">Silicon</th>
                    <th className="py-2 px-3 font-semibold">Device</th>
                    <th className="py-2 px-3 font-semibold">CPU / GPU</th>
                    <th className="py-2 pl-3 font-semibold">Best Suited For</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/[0.04]">
                  <tr>
                    <td className="py-2.5 pr-4 font-bold text-[#0071E3]">Apple M6</td>
                    <td className="py-2.5 px-3">Mac mini</td>
                    <td className="py-2.5 px-3">10-core CPU / 10-core GPU</td>
                    <td className="py-2.5 pl-3 text-neutral-600">Ultra-fast everyday desk computing</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 pr-4 font-bold text-[#0071E3]">Apple M5</td>
                    <td className="py-2.5 px-3">MacBook Air</td>
                    <td className="py-2.5 px-3">8-core CPU / 10-core GPU</td>
                    <td className="py-2.5 pl-3 text-neutral-600">Fanless mobility &amp; 18hr battery</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 pr-4 font-bold text-[#0071E3]">Apple M5 Max/Ultra</td>
                    <td className="py-2.5 px-3">Mac Studio</td>
                    <td className="py-2.5 px-3">Up to 32-core CPU / 80-core GPU</td>
                    <td className="py-2.5 pl-3 text-neutral-600">Local AI model training &amp; 8K ProRes</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 pr-4 font-bold text-[#0071E3]">Apple M4</td>
                    <td className="py-2.5 px-3">iPad Air</td>
                    <td className="py-2.5 px-3">9-core CPU / 10-core GPU</td>
                    <td className="py-2.5 pl-3 text-neutral-600">Digital illustration &amp; Pencil Pro</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Singapore Purchasing Advantages Banner */}
      <div className="max-w-4xl mx-auto px-4 py-4 w-full">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-4 bg-white rounded-xl border border-black/[0.04] shadow-xs flex flex-col">
            <span className="material-symbols-outlined text-[#0071E3] text-[24px] mb-1">
              currency_exchange
            </span>
            <span className="text-xs font-semibold text-[#1D1D1F]">Apple Trade In</span>
            <p className="text-[11px] text-[#6E6E73] mt-0.5">
              Get up to S$1,120 credit when trading in your eligible device at MBS, Orchard, or online.
            </p>
          </div>
          <div className="p-4 bg-white rounded-xl border border-black/[0.04] shadow-xs flex flex-col">
            <span className="material-symbols-outlined text-[#0071E3] text-[24px] mb-1">
              credit_card
            </span>
            <span className="text-xs font-semibold text-[#1D1D1F]">0% Interest Installments</span>
            <p className="text-[11px] text-[#6E6E73] mt-0.5">
              Available with DBS, POSB, OCBC, and UOB credit cards for up to 24 interest-free months.
            </p>
          </div>
          <div className="p-4 bg-white rounded-xl border border-black/[0.04] shadow-xs flex flex-col">
            <span className="material-symbols-outlined text-[#0071E3] text-[24px] mb-1">
              draw
            </span>
            <span className="text-xs font-semibold text-[#1D1D1F]">Free Engraving</span>
            <p className="text-[11px] text-[#6E6E73] mt-0.5">
              Personalize your AirPods or iPad with complimentary laser emoji and name engraving.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
