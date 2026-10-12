import React, { useState } from 'react';
import { Product, TVShow } from '../types/store';

interface SearchModalProps {
  products: Product[];
  tvShows: TVShow[];
  onClose: () => void;
  onSelectProduct: (productId: string) => void;
  onSelectShow: (show: TVShow) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  products,
  tvShows,
  onClose,
  onSelectProduct,
  onSelectShow,
}) => {
  const [query, setQuery] = useState('');

  const filteredProducts = query.trim()
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.tagline.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const filteredShows = query.trim()
    ? tvShows.filter(
        (s) =>
          s.title.toLowerCase().includes(query.toLowerCase()) ||
          s.genre.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const quickPicks = ['iPhone 18 Pro', 'iPhone Duo', 'M6 Mac mini', 'AirPods 5', 'Watch Ultra 4', 'Slow Horses'];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-16 bg-black/60 backdrop-blur-md animate-in fade-in-50">
      <div className="bg-white rounded-3xl max-w-lg w-full max-h-[80vh] overflow-hidden shadow-2xl border border-black/10 flex flex-col">
        {/* Search Input bar */}
        <div className="p-4 border-b border-black/[0.05] flex items-center gap-3">
          <span className="material-symbols-outlined text-neutral-400 text-[22px]">search</span>
          <input
            type="text"
            placeholder="Search Apple hardware, specs, or Apple TV+..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="flex-1 text-sm bg-transparent outline-none text-[#1D1D1F] placeholder:text-neutral-400 font-medium"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-neutral-400 hover:text-neutral-600 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">cancel</span>
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs font-semibold text-[#0071E3] hover:underline cursor-pointer ml-1"
          >
            Cancel
          </button>
        </div>

        {/* Results area */}
        <div className="p-4 overflow-y-auto no-scrollbar flex-1 space-y-4">
          {!query.trim() ? (
            <div>
              <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider block mb-2">
                Quick Suggestions
              </span>
              <div className="flex flex-wrap gap-1.5">
                {quickPicks.map((pick) => (
                  <button
                    key={pick}
                    onClick={() => setQuery(pick)}
                    className="px-3 py-1.5 bg-[#F5F5F7] hover:bg-neutral-200 text-[#1D1D1F] rounded-full text-xs font-medium cursor-pointer transition-colors"
                  >
                    {pick}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <>
              {filteredProducts.length === 0 && filteredShows.length === 0 && (
                <div className="text-center py-8 text-neutral-400 text-xs">
                  No matching Apple devices or streaming titles found for "{query}".
                </div>
              )}

              {filteredProducts.length > 0 && (
                <div className="space-y-2">
                  <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider block">
                    Products ({filteredProducts.length})
                  </span>
                  <div className="space-y-1">
                    {filteredProducts.map((p) => (
                      <button
                        key={p.id}
                        onClick={() => {
                          onSelectProduct(p.id);
                          onClose();
                        }}
                        className="w-full p-2.5 rounded-xl hover:bg-[#F5F5F7] flex items-center gap-3 text-left transition-colors cursor-pointer"
                      >
                        <div className="w-10 h-10 bg-[#F5F5F7] rounded-lg p-1 shrink-0 flex items-center justify-center">
                          <img src={p.image} alt={p.name} className="w-full h-full object-contain" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-bold text-[#1D1D1F] truncate">{p.name}</h4>
                          <p className="text-[11px] text-[#6E6E73] truncate">{p.tagline}</p>
                        </div>
                        <span className="text-xs font-semibold text-[#0071E3] shrink-0">
                          S${p.basePriceSGD.toLocaleString()}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {filteredShows.length > 0 && (
                <div className="space-y-2 pt-2 border-t border-black/[0.05]">
                  <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider block">
                    Apple TV+ Originals ({filteredShows.length})
                  </span>
                  <div className="space-y-1">
                    {filteredShows.map((s) => (
                      <button
                        key={s.id}
                        onClick={() => {
                          onSelectShow(s);
                          onClose();
                        }}
                        className="w-full p-2.5 rounded-xl hover:bg-[#F5F5F7] flex items-center gap-3 text-left transition-colors cursor-pointer"
                      >
                        <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0">
                          <img src={s.image} alt={s.title} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-bold text-[#1D1D1F] truncate">{s.title}</h4>
                          <p className="text-[11px] text-[#6E6E73] truncate">{s.genre} • {s.tagline}</p>
                        </div>
                        <span className="text-[11px] font-bold text-emerald-600 shrink-0">
                          Stream Now
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
