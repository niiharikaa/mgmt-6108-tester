import React, { useState, useEffect } from 'react';
import { TVShow } from '../types/store';

interface StreamingModalProps {
  show: TVShow;
  onClose: () => void;
}

export const StreamingModal: React.FC<StreamingModalProps> = ({
  show,
  onClose,
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(14);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [showCaptions, setShowCaptions] = useState<boolean>(true);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      timer = setInterval(() => {
        setProgress((prev) => (prev >= 100 ? 0 : prev + 0.5));
      }, 500);
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  const formatTime = (pct: number) => {
    const totalSec = 118 * 60; // 118 mins
    const currentSec = Math.floor((pct / 100) * totalSec);
    const m = Math.floor(currentSec / 60);
    const s = currentSec % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl p-0 sm:p-4 animate-in fade-in-50">
      <div className="relative w-full max-w-4xl h-full sm:h-auto sm:max-h-[90vh] bg-black sm:rounded-3xl overflow-hidden flex flex-col justify-between shadow-2xl border border-white/10">
        {/* Backdrop Visual */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <img
            src={show.image}
            alt={show.title}
            className={`w-full h-full object-cover transition-transform duration-700 ${
              isPlaying ? 'scale-105 filter brightness-90' : 'scale-100 filter brightness-50'
            }`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/60 pointer-events-none" />
        </div>

        {/* Top bar */}
        <div className="relative z-20 flex items-center justify-between p-6">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-white text-[24px]">live_tv</span>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#abc7ff]">
                Apple TV+ Streaming
              </span>
              <h3 className="text-lg font-bold text-white leading-tight">{show.title}</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center cursor-pointer transition-colors backdrop-blur-md"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Center Play indicator overlay when paused */}
        {!isPlaying && (
          <div className="relative z-20 self-center my-auto flex flex-col items-center">
            <button
              onClick={() => setIsPlaying(true)}
              className="w-20 h-20 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/30 text-white flex items-center justify-center transition-transform active:scale-90 cursor-pointer shadow-2xl"
            >
              <span className="material-symbols-outlined text-[44px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                play_arrow
              </span>
            </button>
            <span className="text-xs text-white/80 mt-2 font-medium">Click to resume</span>
          </div>
        )}

        {/* Simulated Subtitles */}
        {showCaptions && isPlaying && (
          <div className="relative z-20 self-center text-center px-4 py-1.5 bg-black/75 backdrop-blur-md rounded-lg max-w-md mx-auto text-xs text-yellow-100 font-medium">
            "{show.tagline}"
          </div>
        )}

        {/* Bottom Player Controls */}
        <div className="relative z-20 p-6 bg-gradient-to-t from-black via-black/80 to-transparent space-y-4">
          {/* Progress Slider */}
          <div className="space-y-1">
            <div
              className="w-full h-1.5 bg-white/20 hover:h-2 rounded-full cursor-pointer relative overflow-hidden transition-all"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const pos = (e.clientX - rect.left) / rect.width;
                setProgress(Math.max(0, Math.min(100, pos * 100)));
              }}
            >
              <div
                className="h-full bg-[#0071E3] rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex justify-between text-[11px] text-neutral-400 font-mono">
              <span>{formatTime(progress)}</span>
              <span>{show.duration}</span>
            </div>
          </div>

          {/* Control Buttons */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Skip -10s */}
              <button
                onClick={() => setProgress((p) => Math.max(0, p - 3))}
                className="text-white/80 hover:text-white transition-colors cursor-pointer"
                title="Rewind 10 seconds"
              >
                <span className="material-symbols-outlined text-[22px]">replay_10</span>
              </button>

              {/* Play / Pause */}
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:bg-neutral-200 transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  {isPlaying ? 'pause' : 'play_arrow'}
                </span>
              </button>

              {/* Skip +10s */}
              <button
                onClick={() => setProgress((p) => Math.min(100, p + 3))}
                className="text-white/80 hover:text-white transition-colors cursor-pointer"
                title="Forward 10 seconds"
              >
                <span className="material-symbols-outlined text-[22px]">forward_10</span>
              </button>

              {/* Volume */}
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="text-white/80 hover:text-white transition-colors cursor-pointer ml-1"
              >
                <span className="material-symbols-outlined text-[20px]">
                  {isMuted ? 'volume_off' : 'volume_up'}
                </span>
              </button>
            </div>

            {/* Right badges & toggles */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowCaptions(!showCaptions)}
                className={`text-xs px-2 py-0.5 rounded border transition-colors cursor-pointer ${
                  showCaptions
                    ? 'border-[#0071E3] text-[#abc7ff] bg-blue-500/20'
                    : 'border-white/20 text-neutral-400'
                }`}
              >
                CC
              </button>
              <span className="text-[11px] text-neutral-400 hidden sm:inline-flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">spatial_audio</span>
                Spatial Audio · 4K
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
