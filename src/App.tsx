import React, { useState } from 'react';
import { ActiveTab, BagItem, GeniusBooking, Product, RegionCurrency, StoreLocation, TVShow } from './types/store';
import { PRODUCTS, TV_SHOWS, STORES_SG, REGIONS } from './data/storeData';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { StoreScreen } from './components/StoreScreen';
import { ExploreScreen } from './components/ExploreScreen';
import { AppleTVScreen } from './components/AppleTVScreen';
import { BagAndYouScreen } from './components/BagAndYouScreen';
import { ProductConfigModal } from './components/ProductConfigModal';
import { ProductDetailModal } from './components/ProductDetailModal';
import { StoreDetailModal } from './components/StoreDetailModal';
import { StreamingModal } from './components/StreamingModal';
import { SearchModal } from './components/SearchModal';
import { RegionModal } from './components/RegionModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('store');
  const [currentRegion, setCurrentRegion] = useState<RegionCurrency>(REGIONS[0]);

  // Initial shopping bag with 1 hot item for quick interaction
  const [bagItems, setBagItems] = useState<BagItem[]>([
    {
      id: 'bag-initial-airpods',
      productId: 'airpods-5',
      name: 'AirPods 5 with Active Noise Cancellation',
      selectedColor: 'Gloss White',
      selectedStorage: 'With Active Noise Cancellation & MagSafe',
      priceSGD: 329,
      quantity: 1,
      image: PRODUCTS.find((p) => p.id === 'airpods-5')?.image || '',
    },
  ]);

  // Initial Genius Bar appointment
  const [bookings, setBookings] = useState<GeniusBooking[]>([
    {
      id: 'gb-initial-1',
      storeId: 'mbs',
      storeName: 'Apple Marina Bay Sands',
      productCategory: 'iPhone',
      date: 'Tomorrow, 13 Oct',
      timeSlot: '3:00 PM',
      customerName: 'Niharika',
      contactEmail: 'niharika.admits@gmail.com',
    },
  ]);

  // Modal states
  const [configProductId, setConfigProductId] = useState<string | null>(null);
  const [detailProductId, setDetailProductId] = useState<string | null>(null);
  const [selectedStore, setSelectedStore] = useState<StoreLocation | null>(null);
  const [streamingShow, setStreamingShow] = useState<TVShow | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isRegionOpen, setIsRegionOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleTabChange = (tab: ActiveTab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddToBag = (
    product: Product,
    color?: string,
    storage?: string,
    priceSGD?: number
  ) => {
    const finalPrice = priceSGD !== undefined ? priceSGD : product.basePriceSGD;
    const existingIndex = bagItems.findIndex(
      (item) =>
        item.productId === product.id &&
        item.selectedColor === color &&
        item.selectedStorage === storage
    );

    if (existingIndex > -1) {
      setBagItems((prev) => {
        const next = [...prev];
        next[existingIndex].quantity += 1;
        return next;
      });
    } else {
      const newItem: BagItem = {
        id: `bag-${Date.now()}`,
        productId: product.id,
        name: product.name,
        selectedColor: color,
        selectedStorage: storage,
        priceSGD: finalPrice,
        quantity: 1,
        image: product.image,
      };
      setBagItems((prev) => [newItem, ...prev]);
    }

    showToast(`Added ${product.name} to Bag`);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setBagItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter((item): item is BagItem => item !== null)
    );
  };

  const handleRemoveItem = (id: string) => {
    setBagItems((prev) => prev.filter((item) => item.id !== id));
    showToast('Item removed from Bag');
  };

  const handleClearBag = () => {
    setBagItems([]);
  };

  const handleBookGenius = (booking: GeniusBooking) => {
    setBookings((prev) => [booking, ...prev]);
    showToast(`Genius Bar appointment reserved at ${booking.storeName}`);
  };

  const handleCancelBooking = (bookingId: string) => {
    setBookings((prev) => prev.filter((b) => b.id !== bookingId));
    showToast('Reservation cancelled');
  };

  const configProduct = PRODUCTS.find((p) => p.id === configProductId);
  const detailProduct = PRODUCTS.find((p) => p.id === detailProductId);
  const totalBagCount = bagItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="bg-[#faf8fe] font-['Inter',-apple-system,sans-serif] text-[#1a1b1f] flex flex-col min-h-screen">
      {/* Fixed Header */}
      <Header
        activeTab={activeTab}
        bagCount={totalBagCount}
        onOpenBag={() => handleTabChange('bag-account')}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenProfile={() => handleTabChange('bag-account')}
        onLogoClick={() => handleTabChange('store')}
      />

      {/* Main Content Area */}
      <main className="flex flex-col relative w-full pt-16 pb-20 min-h-screen">
        {activeTab === 'store' && (
          <StoreScreen
            products={PRODUCTS}
            tvShows={TV_SHOWS}
            stores={STORES_SG}
            currentRegion={currentRegion}
            onOpenProductConfig={(id) => setConfigProductId(id)}
            onOpenProductDetail={(id) => setDetailProductId(id)}
            onOpenStoreDetail={(store) => setSelectedStore(store)}
            onOpenStreaming={(show) => setStreamingShow(show)}
            onOpenRegionModal={() => setIsRegionOpen(true)}
            onOpenGeniusBooking={(storeId) => {
              const targetStore = STORES_SG.find((s) => s.id === storeId) || STORES_SG[0];
              setSelectedStore(targetStore);
            }}
          />
        )}

        {activeTab === 'explore' && (
          <ExploreScreen
            products={PRODUCTS}
            currentRegion={currentRegion}
            onOpenProductConfig={(id) => setConfigProductId(id)}
            onOpenProductDetail={(id) => setDetailProductId(id)}
          />
        )}

        {activeTab === 'apple-tv' && (
          <AppleTVScreen
            tvShows={TV_SHOWS}
            onOpenStreaming={(show) => setStreamingShow(show)}
          />
        )}

        {activeTab === 'bag-account' && (
          <BagAndYouScreen
            bagItems={bagItems}
            stores={STORES_SG}
            currentRegion={currentRegion}
            bookings={bookings}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onClearBag={handleClearBag}
            onOpenGeniusBooking={() => setSelectedStore(STORES_SG[0])}
            onCancelBooking={handleCancelBooking}
            onNavigateToStore={() => handleTabChange('store')}
          />
        )}
      </main>

      {/* Fixed Bottom Navigation */}
      <BottomNav
        activeTab={activeTab}
        onTabChange={handleTabChange}
        bagCount={totalBagCount}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 bg-[#1D1D1F]/90 text-white backdrop-blur-md px-4 py-2 rounded-full text-xs font-semibold shadow-xl flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2">
          <span className="material-symbols-outlined text-[16px] text-emerald-400">check_circle</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Product Buy / Configurator Modal */}
      {configProduct && (
        <ProductConfigModal
          product={configProduct}
          currentRegion={currentRegion}
          onClose={() => setConfigProductId(null)}
          onAddToBag={handleAddToBag}
        />
      )}

      {/* Product Learn More / Specs Modal */}
      {detailProduct && (
        <ProductDetailModal
          product={detailProduct}
          currentRegion={currentRegion}
          onClose={() => setDetailProductId(null)}
          onOpenConfig={() => {
            const id = detailProduct.id;
            setDetailProductId(null);
            setConfigProductId(id);
          }}
        />
      )}

      {/* Store Location & Genius Bar Booking Modal */}
      {selectedStore && (
        <StoreDetailModal
          store={selectedStore}
          allStores={STORES_SG}
          onClose={() => setSelectedStore(null)}
          onBookGenius={handleBookGenius}
        />
      )}

      {/* Apple TV+ Streaming Video Modal */}
      {streamingShow && (
        <StreamingModal
          show={streamingShow}
          onClose={() => setStreamingShow(null)}
        />
      )}

      {/* Search Modal */}
      {isSearchOpen && (
        <SearchModal
          products={PRODUCTS}
          tvShows={TV_SHOWS}
          onClose={() => setIsSearchOpen(false)}
          onSelectProduct={(id) => setConfigProductId(id)}
          onSelectShow={(show) => setStreamingShow(show)}
        />
      )}

      {/* Region & Currency Selector Modal */}
      {isRegionOpen && (
        <RegionModal
          currentRegion={currentRegion}
          onSelectRegion={(reg) => setCurrentRegion(reg)}
          onClose={() => setIsRegionOpen(false)}
        />
      )}
    </div>
  );
}
