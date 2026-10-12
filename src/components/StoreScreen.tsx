import React from 'react';
import { Product, StoreLocation, TVShow, RegionCurrency } from '../types/store';
import { HOTLINKED_IMAGES } from '../data/storeData';

interface StoreScreenProps {
  products: Product[];
  tvShows: TVShow[];
  stores: StoreLocation[];
  currentRegion: RegionCurrency;
  onOpenProductConfig: (productId: string) => void;
  onOpenProductDetail: (productId: string) => void;
  onOpenStoreDetail: (store: StoreLocation) => void;
  onOpenStreaming: (show: TVShow) => void;
  onOpenRegionModal: () => void;
  onOpenGeniusBooking: (storeId?: string) => void;
}

export const StoreScreen: React.FC<StoreScreenProps> = ({
  products,
  tvShows,
  stores,
  currentRegion,
  onOpenProductConfig,
  onOpenProductDetail,
  onOpenStoreDetail,
  onOpenStreaming,
  onOpenRegionModal,
  onOpenGeniusBooking,
}) => {
  const getProduct = (id: string) => products.find((p) => p.id === id);

  const iphone18Pro = getProduct('iphone-18-pro');
  const iphoneDuo = getProduct('iphone-duo');
  const watchSeries12 = getProduct('watch-series-12');
  const watchUltra4 = getProduct('watch-ultra-4');
  const macMini = getProduct('mac-mini');
  const macbookAir = getProduct('macbook-air');
  const ipadAir = getProduct('ipad-air');
  const airpods5 = getProduct('airpods-5');
  const macStudio = getProduct('mac-studio');

  const scrollToLocations = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById('locations');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col w-full">
      {/* SG Local Fulfillment Awareness Banner */}
      <section className="w-full bg-[#F5F5F7] px-4 py-2 border-b border-black/[0.04]">
        <div className="max-w-md mx-auto flex items-center justify-between gap-3 bg-[#FFFFFF] p-2 rounded-xl shadow-xs border border-black/[0.04]">
          <div className="w-8 h-8 rounded-full bg-[#001D3D] flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[#abc7ff] text-[18px]">storefront</span>
          </div>
          <div className="flex flex-col min-w-0 flex-1">
            <p className="text-[13px] leading-[18px] text-[#1D1D1F] font-semibold truncate">
              Apple Pickup in Singapore
            </p>
            <p className="text-[11px] leading-[15px] text-[#6E6E73] truncate">
              Marina Bay Sands • Orchard Road • Jewel Changi
            </p>
          </div>
          <button
            onClick={scrollToLocations}
            className="shrink-0 text-[14px] leading-[18px] text-[#0071E3] font-medium pl-1 hover:underline cursor-pointer"
          >
            Details
          </button>
        </div>
      </section>

      {/* Pro Tier Hero: iPhone 18 Pro */}
      <section className="w-full bg-[#000000] text-[#F5F5F7] pt-10 pb-16 px-4 flex flex-col items-center text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-neutral-800/20 via-transparent to-transparent pointer-events-none" />
        
        <span className="text-[12px] leading-4 text-[#abc7ff] uppercase tracking-widest font-semibold mb-1">
          Titanium Redefined
        </span>
        <h2 className="text-[36px] sm:text-[48px] leading-[40px] sm:leading-[52px] text-[#F5F5F7] font-bold tracking-tight">
          iPhone 18 Pro
        </h2>
        <p className="text-[17px] leading-[22px] text-[#86868B] mt-1 font-normal">
          Pro further.
        </p>

        {/* CTA Button Pair */}
        <div className="flex items-center gap-3 mt-5 mb-8 z-10">
          <button
            onClick={() => onOpenProductDetail('iphone-18-pro')}
            className="bg-[#0071E3] hover:bg-[#0077ED] text-white text-[14px] leading-[18px] px-5 py-2 rounded-full font-medium active:scale-95 transition-all shadow-md cursor-pointer"
          >
            Learn more
          </button>
          <button
            onClick={() => onOpenProductConfig('iphone-18-pro')}
            className="bg-transparent hover:bg-white/10 text-[#0071e3] border border-[#424245] text-[14px] leading-[18px] px-5 py-2 rounded-full font-medium active:scale-95 transition-all cursor-pointer"
          >
            Buy
          </button>
        </div>

        {/* Realistic Cinematic Product Visual */}
        <div className="w-full max-w-xs relative flex items-center justify-center mt-2 group">
          <div className="w-72 h-80 relative rounded-2xl overflow-hidden shadow-2xl flex items-center justify-center bg-gradient-to-b from-stone-900 via-neutral-950 to-black border border-white/5 transition-transform duration-500 group-hover:scale-[1.02]">
            <img
              className="w-full h-full object-contain drop-shadow-2xl"
              data-alt={iphone18Pro?.altText || 'iPhone 18 Pro'}
              src={HOTLINKED_IMAGES.iphone18Pro}
              alt="iPhone 18 Pro Titanium"
              loading="eager"
            />
          </div>
          <div className="absolute -bottom-6 w-56 h-6 bg-[#abc7ff]/10 blur-xl rounded-full" />
        </div>
      </section>

      {/* Consumer Showcase: iPhone Duo */}
      <section className="w-full bg-[#FFFFFF] text-[#1D1D1F] pt-10 pb-16 px-4 flex flex-col items-center text-center border-t border-black/[0.04]">
        <span className="text-[12px] leading-4 text-[#0071E3] font-semibold tracking-wide mb-1">
          The New Dual-Display Era
        </span>
        <h2 className="text-[36px] sm:text-[48px] leading-[40px] sm:leading-[52px] text-[#1D1D1F] font-bold tracking-tight">
          iPhone Duo
        </h2>
        <p className="text-[17px] leading-[22px] text-[#6E6E73] mt-1 font-normal">
          Hello, hello.
        </p>

        {/* SGT Local Launch Pill */}
        <div className="mt-3 bg-[#F5F5F7] px-4 py-1.5 rounded-full border border-black/[0.04]">
          <p className="text-[11px] leading-[15px] text-[#6E6E73] font-medium">
            Pre-order starting at 8pm SGT on 16 October • Available 23 October
          </p>
        </div>

        {/* CTA Button Pair */}
        <div className="flex items-center gap-3 mt-5 mb-8">
          <button
            onClick={() => onOpenProductDetail('iphone-duo')}
            className="bg-[#0071E3] hover:bg-[#0077ED] text-white text-[14px] leading-[18px] px-5 py-2 rounded-full font-medium active:scale-95 transition-all shadow-sm cursor-pointer"
          >
            Learn more
          </button>
          <button
            onClick={() => onOpenProductConfig('iphone-duo')}
            className="bg-[#F5F5F7] hover:bg-[#eaeaea] text-[#0071E3] border border-[#0071E3] text-[14px] leading-[18px] px-5 py-2 rounded-full font-medium active:scale-95 transition-all cursor-pointer"
          >
            View pricing
          </button>
        </div>

        {/* Product Framing Visual */}
        <div className="w-full max-w-sm flex items-center justify-center relative">
          <div className="w-full h-72 rounded-2xl overflow-hidden flex items-center justify-center bg-[#F5F5F7]/80 border border-black/[0.04] transition-transform duration-500 hover:scale-[1.01]">
            <img
              className="w-full h-full object-cover object-center"
              data-alt={iphoneDuo?.altText || 'iPhone Duo'}
              src={HOTLINKED_IMAGES.iphoneDuo}
              alt="iPhone Duo dual display foldable"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* Wearables Section (Dark Elegance Bento) */}
      <section className="w-full bg-[#000000] px-4 py-10 flex flex-col gap-5">
        {/* Apple Watch Series 12 */}
        <div className="w-full max-w-md mx-auto bg-neutral-950 rounded-2xl p-5 flex flex-col items-center text-center relative overflow-hidden shadow-xl border border-white/5">
          <div className="flex items-center gap-1.5 text-[#F5F5F7] mb-1">
            <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              watch
            </span>
            <span className="text-[19px] font-semibold tracking-tight">WATCH</span>
            <span className="text-[11px] uppercase tracking-widest text-[#abc7ff] font-bold ml-1">Series 12</span>
          </div>
          <p className="text-[15px] leading-[22px] text-[#86868B] max-w-xs mt-1">
            The most accurate heart rate sensing in a wearable.*
          </p>
          <div className="flex items-center gap-3 my-5">
            <button
              onClick={() => onOpenProductDetail('watch-series-12')}
              className="bg-[#0071E3] hover:bg-[#0077ED] text-white text-[14px] px-4 py-1.5 rounded-full font-medium cursor-pointer transition-all active:scale-95"
            >
              Learn more
            </button>
            <button
              onClick={() => onOpenProductConfig('watch-series-12')}
              className="bg-neutral-900 hover:bg-neutral-800 text-[#0071e3] border border-[#424245] text-[14px] px-4 py-1.5 rounded-full font-medium cursor-pointer transition-all active:scale-95"
            >
              Buy
            </button>
          </div>
          {/* Sensor Telemetry Visual Card */}
          <div className="w-full h-56 rounded-xl bg-gradient-to-t from-black to-neutral-900 flex items-center justify-center overflow-hidden relative">
            <img
              className="w-full h-full object-cover"
              data-alt={watchSeries12?.altText || 'Apple Watch Series 12'}
              src={HOTLINKED_IMAGES.watchSeries12}
              alt="Apple Watch Series 12 Optical Sensors"
              loading="lazy"
            />
          </div>
        </div>

        {/* Apple Watch Ultra 4 */}
        <div className="w-full max-w-md mx-auto bg-neutral-950 rounded-2xl p-5 flex flex-col items-center text-center relative overflow-hidden shadow-xl border border-white/5">
          <div className="flex items-center gap-1.5 text-[#F5F5F7] mb-1">
            <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              watch
            </span>
            <span className="text-[19px] font-semibold tracking-tight">WATCH</span>
            <span className="text-[11px] uppercase tracking-widest text-amber-500 font-bold ml-1">ULTRA 4</span>
          </div>
          <p className="text-[15px] leading-[22px] text-[#86868B] max-w-xs mt-1">
            A battery you can’t outrun.
          </p>
          <div className="flex items-center gap-3 my-5">
            <button
              onClick={() => onOpenProductDetail('watch-ultra-4')}
              className="bg-[#0071E3] hover:bg-[#0077ED] text-white text-[14px] px-4 py-1.5 rounded-full font-medium cursor-pointer transition-all active:scale-95"
            >
              Learn more
            </button>
            <button
              onClick={() => onOpenProductConfig('watch-ultra-4')}
              className="bg-neutral-900 hover:bg-neutral-800 text-[#0071e3] border border-[#424245] text-[14px] px-4 py-1.5 rounded-full font-medium cursor-pointer transition-all active:scale-95"
            >
              Buy
            </button>
          </div>
          <div className="w-full h-56 rounded-xl bg-gradient-to-t from-black to-neutral-900 flex items-center justify-center overflow-hidden relative">
            <img
              className="w-full h-full object-cover"
              data-alt={watchUltra4?.altText || 'Apple Watch Ultra 4'}
              src={HOTLINKED_IMAGES.watchUltra4}
              alt="Apple Watch Ultra 4 Titanium"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* Silicon Power Bento: Mac mini & MacBook Air & iPad Air */}
      <section className="w-full bg-[#F5F5F7] px-4 py-10 flex flex-col gap-5">
        <div className="flex flex-col items-center text-center mb-1">
          <span className="text-[12px] text-[#0071E3] font-semibold tracking-wide">Apple Silicon</span>
          <h3 className="text-[28px] sm:text-[34px] leading-tight text-[#1D1D1F] font-bold">Unrivaled Power.</h3>
        </div>

        {/* Mac mini */}
        <div className="w-full max-w-md mx-auto bg-[#FFFFFF] rounded-2xl p-5 flex flex-col items-center text-center shadow-xs border border-black/[0.04]">
          <h4 className="text-[24px] font-semibold text-[#1D1D1F]">Mac mini</h4>
          <p className="text-[15px] text-[#6E6E73] mt-1">Now with M6 and M5 Pro.</p>
          <div className="flex items-center gap-3 my-4">
            <button
              onClick={() => onOpenProductDetail('mac-mini')}
              className="bg-[#0071E3] hover:bg-[#0077ED] text-white text-[14px] px-4 py-1.5 rounded-full font-medium cursor-pointer transition-all active:scale-95"
            >
              Learn more
            </button>
            <button
              onClick={() => onOpenProductConfig('mac-mini')}
              className="bg-[#F5F5F7] hover:bg-[#eaeaea] text-[#0071E3] border border-[#0071E3] text-[14px] px-4 py-1.5 rounded-full font-medium cursor-pointer transition-all active:scale-95"
            >
              Buy
            </button>
          </div>
          <div className="w-full h-52 rounded-xl overflow-hidden bg-[#F5F5F7]/50 flex items-center justify-center">
            <img
              className="w-full h-full object-cover object-top"
              data-alt={macMini?.altText || 'Mac mini'}
              src={HOTLINKED_IMAGES.macMini}
              alt="Mac mini on hand"
              loading="lazy"
            />
          </div>
        </div>

        {/* MacBook Air */}
        <div className="w-full max-w-md mx-auto bg-gradient-to-b from-sky-50 via-sky-100/40 to-[#FFFFFF] rounded-2xl p-5 flex flex-col items-center text-center shadow-xs border border-black/[0.04]">
          <h4 className="text-[24px] font-semibold text-[#1D1D1F]">MacBook Air</h4>
          <p className="text-[15px] text-[#6E6E73] mt-1">Now supercharged by M5.</p>
          <div className="flex items-center gap-3 my-4">
            <button
              onClick={() => onOpenProductDetail('macbook-air')}
              className="bg-[#0071E3] hover:bg-[#0077ED] text-white text-[14px] px-4 py-1.5 rounded-full font-medium cursor-pointer transition-all active:scale-95"
            >
              Learn more
            </button>
            <button
              onClick={() => onOpenProductConfig('macbook-air')}
              className="bg-white hover:bg-slate-50 text-[#0071E3] border border-[#0071E3] text-[14px] px-4 py-1.5 rounded-full font-medium shadow-xs cursor-pointer transition-all active:scale-95"
            >
              Buy
            </button>
          </div>
          <div className="w-full h-52 rounded-xl overflow-hidden flex items-center justify-center">
            <img
              className="w-full h-full object-contain"
              data-alt={macbookAir?.altText || 'MacBook Air'}
              src={HOTLINKED_IMAGES.macbookAir}
              alt="MacBook Air sky blue floating"
              loading="lazy"
            />
          </div>
        </div>

        {/* iPad Air */}
        <div className="w-full max-w-md mx-auto bg-gradient-to-b from-blue-50/50 via-slate-50 to-[#FFFFFF] rounded-2xl p-5 flex flex-col items-center text-center shadow-xs border border-black/[0.04]">
          <div className="flex items-center gap-1">
            <span className="text-[24px] font-semibold text-[#1D1D1F]">iPad</span>
            <span className="text-[24px] font-light italic text-sky-600">air</span>
          </div>
          <p className="text-[15px] text-[#6E6E73] mt-1">Now supercharged by M4.</p>
          <div className="flex items-center gap-3 my-4">
            <button
              onClick={() => onOpenProductDetail('ipad-air')}
              className="bg-[#0071E3] hover:bg-[#0077ED] text-white text-[14px] px-4 py-1.5 rounded-full font-medium cursor-pointer transition-all active:scale-95"
            >
              Learn more
            </button>
            <button
              onClick={() => onOpenProductConfig('ipad-air')}
              className="bg-[#F5F5F7] hover:bg-[#eaeaea] text-[#0071E3] border border-[#0071E3] text-[14px] px-4 py-1.5 rounded-full font-medium cursor-pointer transition-all active:scale-95"
            >
              Buy
            </button>
          </div>
          <div className="w-full h-52 rounded-xl overflow-hidden flex items-center justify-center">
            <img
              className="w-full h-full object-contain"
              data-alt={ipadAir?.altText || 'iPad Air'}
              src={HOTLINKED_IMAGES.ipadAir}
              alt="iPad Air blue finish"
              loading="lazy"
            />
          </div>
        </div>

        {/* AirPods 5 (Dark Spotlight) */}
        <div className="w-full max-w-md mx-auto bg-[#000000] rounded-2xl p-5 flex flex-col items-center text-center text-[#F5F5F7] shadow-xl border border-white/5">
          <h4 className="text-[24px] font-semibold text-[#F5F5F7]">AirPods 5</h4>
          <p className="text-[15px] text-[#86868B] mt-1">Discover the magic of Active Noise Cancellation.</p>
          <div className="flex items-center gap-3 my-4">
            <button
              onClick={() => onOpenProductDetail('airpods-5')}
              className="bg-[#0071E3] hover:bg-[#0077ED] text-white text-[14px] px-4 py-1.5 rounded-full font-medium cursor-pointer transition-all active:scale-95"
            >
              Learn more
            </button>
            <button
              onClick={() => onOpenProductConfig('airpods-5')}
              className="bg-neutral-900 hover:bg-neutral-800 text-[#0071e3] border border-[#424245] text-[14px] px-4 py-1.5 rounded-full font-medium cursor-pointer transition-all active:scale-95"
            >
              Buy
            </button>
          </div>
          <div className="w-full h-56 rounded-xl overflow-hidden relative">
            <img
              className="w-full h-full object-cover"
              data-alt={airpods5?.altText || 'AirPods 5'}
              src={HOTLINKED_IMAGES.airpods5}
              alt="AirPods 5 with Active Noise Cancellation"
              loading="lazy"
            />
          </div>
        </div>

        {/* Mac Studio */}
        <div className="w-full max-w-md mx-auto bg-[#FFFFFF] rounded-2xl p-5 flex flex-col items-center text-center shadow-xs border border-black/[0.04]">
          <h4 className="text-[24px] font-semibold text-[#1D1D1F]">Mac Studio</h4>
          <p className="text-[15px] text-[#6E6E73] mt-1">Now with M5 Max and M5 Ultra.</p>
          <div className="flex items-center gap-3 my-4">
            <button
              onClick={() => onOpenProductDetail('mac-studio')}
              className="bg-[#0071E3] hover:bg-[#0077ED] text-white text-[14px] px-4 py-1.5 rounded-full font-medium cursor-pointer transition-all active:scale-95"
            >
              Learn more
            </button>
            <button
              onClick={() => onOpenProductConfig('mac-studio')}
              className="bg-[#F5F5F7] hover:bg-[#eaeaea] text-[#0071E3] border border-[#0071E3] text-[14px] px-4 py-1.5 rounded-full font-medium cursor-pointer transition-all active:scale-95"
            >
              Buy
            </button>
          </div>
          <div className="w-full h-44 rounded-xl overflow-hidden bg-[#F5F5F7]/30 flex items-center justify-center p-3">
            <img
              className="w-full h-full object-contain"
              data-alt={macStudio?.altText || 'Mac Studio'}
              src={HOTLINKED_IMAGES.macStudio}
              alt="Mac Studio desktop"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* Apple TV+ Entertainment Horizontal Rail */}
      <section className="w-full bg-[#000000] py-10 text-[#F5F5F7]">
        <div className="max-w-5xl mx-auto px-4 flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#F5F5F7] text-[24px]">live_tv</span>
            <h3 className="text-[20px] font-semibold text-[#F5F5F7]">Apple TV+</h3>
          </div>
          <span className="text-[11px] leading-[15px] text-[#86868B]">Stream on all devices</span>
        </div>

        {/* Stream Cards Horizontal Carousel */}
        <div className="flex gap-4 overflow-x-auto px-4 no-scrollbar pb-2 snap-x max-w-5xl mx-auto">
          {tvShows.map((show) => (
            <div
              key={show.id}
              className="shrink-0 w-64 h-96 rounded-2xl relative overflow-hidden bg-neutral-900 snap-center flex flex-col justify-end p-4 border border-white/10 group cursor-pointer"
              onClick={() => onOpenStreaming(show)}
            >
              <img
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                data-alt={show.altText}
                src={show.image}
                alt={show.title}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none" />
              <div className="relative z-10 flex flex-col">
                <span className="text-[11px] uppercase tracking-wider text-[#abc7ff] font-bold">
                  {show.genre}
                </span>
                <h4 className="text-[18px] leading-snug font-bold text-white mt-0.5">
                  {show.title}
                </h4>
                <p className="text-[11px] leading-[15px] text-neutral-300 mt-1 mb-3">
                  {show.tagline}
                </p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenStreaming(show);
                  }}
                  className="w-full py-2 bg-[#FFFFFF] hover:bg-neutral-100 text-[#000000] text-[14px] font-semibold rounded-full flex items-center justify-center gap-1 active:scale-95 transition-transform shadow-md cursor-pointer"
                >
                  <span
                    className="material-symbols-outlined text-[16px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    play_arrow
                  </span>
                  Stream now
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Regional Experience Card */}
      <section className="w-full bg-neutral-900 text-neutral-100 p-4 flex items-center justify-between text-left border-y border-neutral-800">
        <div className="flex flex-col">
          <p className="text-[13px] leading-[18px] font-semibold text-neutral-200">
            Browsing Apple {currentRegion.name}
          </p>
          <p className="text-[11px] leading-[15px] text-neutral-400">
            {currentRegion.code === 'SG' ? 'SGD pricing inclusive of 9% GST' : `${currentRegion.symbol} converted live pricing`}
          </p>
        </div>
        <button
          onClick={onOpenRegionModal}
          className="bg-neutral-800 hover:bg-neutral-700 text-neutral-200 px-3 py-1.5 rounded-full flex items-center gap-1 text-xs cursor-pointer transition-colors"
        >
          <span>{currentRegion.name.split(' ')[0]}</span>
          <span className="material-symbols-outlined text-[14px]">expand_more</span>
        </button>
      </section>

      {/* Singapore Store Locations & Genius Support */}
      <section className="w-full bg-[#F5F5F7] px-4 py-10 text-[#1D1D1F]" id="locations">
        <div className="max-w-md mx-auto">
          <div className="flex items-center gap-2 mb-4">
            <span className="material-symbols-outlined text-[#0071E3] text-[22px]">location_on</span>
            <h3 className="text-[19px] font-semibold">Apple Stores in Singapore</h3>
          </div>

          {/* Store Accordion List */}
          <div className="space-y-3">
            {stores.map((store) => (
              <button
                key={store.id}
                onClick={() => onOpenStoreDetail(store)}
                className="w-full bg-[#FFFFFF] hover:bg-neutral-50/80 p-3.5 rounded-xl flex items-center justify-between shadow-xs border border-black/[0.04] text-left cursor-pointer transition-all active:scale-[0.99]"
              >
                <div className="flex flex-col">
                  <span className="text-[15px] font-semibold text-[#1D1D1F]">{store.name}</span>
                  <span className="text-[11px] text-[#6E6E73] mt-0.5">
                    {store.address} • {store.statusText}
                  </span>
                </div>
                <span className="material-symbols-outlined text-[#414753] text-[20px]">chevron_right</span>
              </button>
            ))}
          </div>

          {/* Specialist / Phone Assistance Ribbon */}
          <div className="mt-5 bg-[#FFFFFF] p-3.5 rounded-xl flex items-center gap-3 shadow-xs border border-black/[0.04]">
            <div className="w-10 h-10 rounded-full bg-[#d7e2ff] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[#0071E3] text-[22px]">support_agent</span>
            </div>
            <div className="flex flex-col flex-1">
              <p className="text-[13px] font-semibold text-[#1D1D1F]">Need expert shopping guidance?</p>
              <p className="text-[11px] text-[#6E6E73] mt-0.5">
                Call{' '}
                <a className="text-[#0071E3] font-medium hover:underline" href="tel:18006927753">
                  1800-692-7753
                </a>{' '}
                or{' '}
                <button
                  onClick={() => onOpenGeniusBooking()}
                  className="text-[#0071E3] font-medium hover:underline cursor-pointer"
                >
                  book a Genius Bar slot
                </button>
                .
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Legal & Apple Corporate Footer Hierarchy */}
      <footer className="w-full bg-[#F5F5F7] px-4 pt-6 pb-12 text-[#6E6E73] flex flex-col gap-4 border-t border-black/[0.05]">
        <div className="max-w-md mx-auto w-full space-y-4">
          {/* Legal Footnotes */}
          <div className="space-y-1.5 text-[11px] leading-[15px]">
            <p>* Heart rate accuracy study conducted by Apple in July–August 2026 with commercially available best-selling wearables. See apple.com/sg/HRAccuracy.</p>
            <p>Apple TV+ subscription required. Content subject to regional licensing availability.</p>
            <p>All prices in Singapore Dollars (SGD) and include 9% Goods and Services Tax (GST).</p>
          </div>

          {/* Interactive Navigation Directory Details */}
          <div className="space-y-1 pt-2 text-[#1D1D1F] text-xs font-medium">
            <details className="group bg-[#FFFFFF] rounded-lg p-2.5 shadow-xs border border-black/[0.03]">
              <summary className="flex items-center justify-between list-none cursor-pointer select-none">
                <span>Shop and Learn</span>
                <span className="material-symbols-outlined text-[16px] text-[#6E6E73] transition-transform group-open:rotate-180">
                  expand_more
                </span>
              </summary>
              <div className="pt-2 flex flex-col gap-1.5 text-[#6E6E73] font-normal pl-1">
                <button onClick={() => onOpenProductDetail('mac-mini')} className="text-left hover:text-[#0071E3] cursor-pointer">Mac mini &amp; Studio</button>
                <button onClick={() => onOpenProductDetail('macbook-air')} className="text-left hover:text-[#0071E3] cursor-pointer">MacBook Air M5</button>
                <button onClick={() => onOpenProductDetail('ipad-air')} className="text-left hover:text-[#0071E3] cursor-pointer">iPad Air M4</button>
                <button onClick={() => onOpenProductDetail('iphone-18-pro')} className="text-left hover:text-[#0071E3] cursor-pointer">iPhone 18 Pro &amp; Duo</button>
                <button onClick={() => onOpenProductDetail('watch-series-12')} className="text-left hover:text-[#0071E3] cursor-pointer">Apple Watch Series 12 &amp; Ultra 4</button>
                <button onClick={() => onOpenProductDetail('airpods-5')} className="text-left hover:text-[#0071E3] cursor-pointer">AirPods 5 Active Noise Cancellation</button>
              </div>
            </details>

            <details className="group bg-[#FFFFFF] rounded-lg p-2.5 shadow-xs border border-black/[0.03]">
              <summary className="flex items-center justify-between list-none cursor-pointer select-none">
                <span>Apple Store Services</span>
                <span className="material-symbols-outlined text-[16px] text-[#6E6E73] transition-transform group-open:rotate-180">
                  expand_more
                </span>
              </summary>
              <div className="pt-2 flex flex-col gap-1.5 text-[#6E6E73] font-normal pl-1">
                <button onClick={scrollToLocations} className="text-left hover:text-[#0071E3] cursor-pointer">Find an Apple Store in Singapore</button>
                <button onClick={() => onOpenGeniusBooking()} className="text-left hover:text-[#0071E3] cursor-pointer">Genius Bar Appointments</button>
                <a href="#locations" className="text-left hover:text-[#0071E3]">Today at Apple Singapore</a>
                <span className="text-left">Apple Trade In Singapore (up to S$1,120)</span>
                <span className="text-left">Order Status &amp; Pickup Tracking</span>
              </div>
            </details>

            <details className="group bg-[#FFFFFF] rounded-lg p-2.5 shadow-xs border border-black/[0.03]">
              <summary className="flex items-center justify-between list-none cursor-pointer select-none">
                <span>Entertainment &amp; Services</span>
                <span className="material-symbols-outlined text-[16px] text-[#6E6E73] transition-transform group-open:rotate-180">
                  expand_more
                </span>
              </summary>
              <div className="pt-2 flex flex-col gap-1.5 text-[#6E6E73] font-normal pl-1">
                <button onClick={() => onOpenStreaming(tvShows[0])} className="text-left hover:text-[#0071E3] cursor-pointer">Apple TV+ (Stream Now)</button>
                <span className="text-left">Apple Music Spatial Audio</span>
                <span className="text-left">Apple Arcade with 200+ Games</span>
                <span className="text-left">Apple Fitness+ Guided Workouts</span>
                <span className="text-left">Apple Podcasts</span>
              </div>
            </details>
          </div>

          {/* Corporate Copyright & Regional Disclaimers */}
          <div className="pt-3 flex flex-col gap-1 text-[11px] font-normal text-[#6E6E73]">
            <div className="flex flex-wrap gap-x-4 gap-y-1">
              <span className="hover:underline cursor-pointer">Privacy Policy</span>
              <span className="hover:underline cursor-pointer">Terms of Use</span>
              <span className="hover:underline cursor-pointer">Sales Policy</span>
              <span className="hover:underline cursor-pointer">Legal</span>
              <span className="hover:underline cursor-pointer">Site Map</span>
            </div>
            <p className="mt-1">Copyright © 2026 Apple Inc. All rights reserved.</p>
            <p className="font-medium text-[#1D1D1F]">Singapore</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
