import React, { useState } from 'react';
import { TVShow } from '../types/store';

interface AppleTVScreenProps {
  tvShows: TVShow[];
  onOpenStreaming: (show: TVShow) => void;
}

export const AppleTVScreen: React.FC<AppleTVScreenProps> = ({
  tvShows,
  onOpenStreaming,
}) => {
  const [selectedGenre, setSelectedGenre] = useState<string>('all');
  const [watchlist, setWatchlist] = useState<string[]>(['slow-horses']);

  const genres = ['all', 'Comedy', 'Thriller', 'Drama', 'Sci-Fi', 'Action'];

  const filteredShows =
    selectedGenre === 'all'
      ? tvShows
      : tvShows.filter((s) => s.genre.toLowerCase() === selectedGenre.toLowerCase());

  const toggleWatchlist = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setWatchlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const heroShow = tvShows[0];

  return (
    <div className="flex flex-col w-full bg-[#000000] text-white min-h-screen pb-16">
      {/* Cinematic Hero Spotlight */}
      {heroShow && (
        <div className="relative w-full h-[460px] sm:h-[520px] overflow-hidden flex flex-col justify-end p-6">
          <img
            src={heroShow.image}
            alt={heroShow.title}
            className="absolute inset-0 w-full h-full object-cover object-center filter brightness-75 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
          <div className="relative z-10 max-w-xl mx-auto w-full">
            <div className="flex items-center gap-2 mb-2">
              <span className="material-symbols-outlined text-white text-[20px]">live_tv</span>
              <span className="text-[12px] uppercase font-bold tracking-widest text-[#abc7ff]">
                Apple Original Film
              </span>
            </div>
            <h2 className="text-[32px] sm:text-[42px] font-bold leading-tight drop-shadow-md">
              {heroShow.title}
            </h2>
            <p className="text-[14px] text-neutral-300 line-clamp-2 mt-2 max-w-lg leading-relaxed">
              {heroShow.synopsis}
            </p>
            <div className="flex items-center gap-2 text-xs text-neutral-400 my-3">
              <span className="px-1.5 py-0.5 border border-white/20 rounded text-[10px]">{heroShow.rating}</span>
              <span>{heroShow.genre}</span>
              <span>•</span>
              <span>{heroShow.duration}</span>
            </div>
            <div className="flex items-center gap-3 pt-1">
              <button
                onClick={() => onOpenStreaming(heroShow)}
                className="px-6 py-2.5 bg-white hover:bg-neutral-200 text-black font-semibold text-sm rounded-full flex items-center gap-2 shadow-lg active:scale-95 transition-transform cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  play_arrow
                </span>
                Stream now
              </button>
              <button
                onClick={(e) => toggleWatchlist(heroShow.id, e)}
                className="px-4 py-2.5 bg-neutral-900/80 hover:bg-neutral-800 text-white font-medium text-sm rounded-full flex items-center gap-1.5 border border-white/20 backdrop-blur-sm cursor-pointer transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">
                  {watchlist.includes(heroShow.id) ? 'check' : 'add'}
                </span>
                {watchlist.includes(heroShow.id) ? 'In Up Next' : 'Add to Up Next'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3 Months Free Singapore Promotion Ribbon */}
      <div className="bg-neutral-900/90 border-y border-white/10 px-4 py-3">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#0071E3] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-white text-[18px]">celebration</span>
            </div>
            <div>
              <p className="text-xs font-semibold text-white">
                Get 3 months of Apple TV+ free
              </p>
              <p className="text-[11px] text-neutral-400">
                Included with any purchase of an eligible Apple device across Singapore stores.
              </p>
            </div>
          </div>
          <span className="text-[11px] text-[#abc7ff] font-medium self-start sm:self-auto">
            S$13.98/month thereafter. Cancel anytime.
          </span>
        </div>
      </div>

      {/* Genre Filters */}
      <div className="max-w-4xl mx-auto px-4 pt-6 pb-2 w-full">
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {genres.map((g) => (
            <button
              key={g}
              onClick={() => setSelectedGenre(g)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium capitalize whitespace-nowrap cursor-pointer transition-colors ${
                selectedGenre === g
                  ? 'bg-white text-black font-semibold'
                  : 'bg-neutral-900 text-neutral-400 hover:text-white border border-white/10'
              }`}
            >
              {g === 'all' ? 'All Originals' : g}
            </button>
          ))}
        </div>
      </div>

      {/* Catalog Grid */}
      <div className="max-w-4xl mx-auto px-4 py-6 w-full">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <span className="material-symbols-outlined text-[#abc7ff] text-[20px]">movie</span>
          <span>Featured Stream List</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredShows.map((show) => {
            const inWatchlist = watchlist.includes(show.id);
            return (
              <div
                key={show.id}
                onClick={() => onOpenStreaming(show)}
                className="bg-neutral-950 rounded-2xl overflow-hidden border border-white/10 flex flex-col group cursor-pointer hover:border-white/30 transition-all duration-300 shadow-xl"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={show.image}
                    alt={show.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent" />
                  <span className="absolute top-2.5 left-2.5 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-bold text-[#abc7ff] uppercase">
                    {show.genre}
                  </span>
                  <button
                    onClick={(e) => toggleWatchlist(show.id, e)}
                    className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/90 cursor-pointer"
                    title={inWatchlist ? 'Remove from Up Next' : 'Add to Up Next'}
                  >
                    <span className="material-symbols-outlined text-[16px]">
                      {inWatchlist ? 'check' : 'add'}
                    </span>
                  </button>
                </div>

                <div className="p-4 flex flex-col flex-1 justify-between">
                  <div>
                    <h4 className="text-base font-bold text-white group-hover:text-[#abc7ff] transition-colors">
                      {show.title}
                    </h4>
                    <p className="text-xs text-neutral-400 mt-1 line-clamp-2 leading-relaxed">
                      {show.synopsis}
                    </p>
                    <div className="flex items-center gap-2 text-[11px] text-neutral-500 mt-2">
                      <span>{show.duration}</span>
                      <span>•</span>
                      <span>Starring {show.cast[0]}</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                    <span className="text-[11px] text-neutral-400 flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">hd</span>
                      4K HDR · Spatial Audio
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenStreaming(show);
                      }}
                      className="px-3 py-1 bg-white hover:bg-neutral-200 text-black text-xs font-semibold rounded-full flex items-center gap-1 active:scale-95 transition-transform"
                    >
                      <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                        play_arrow
                      </span>
                      Play
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
