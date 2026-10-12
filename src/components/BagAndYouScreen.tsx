import React, { useState } from 'react';
import { BagItem, GeniusBooking, RegionCurrency, StoreLocation } from '../types/store';

interface BagAndYouScreenProps {
  bagItems: BagItem[];
  stores: StoreLocation[];
  currentRegion: RegionCurrency;
  bookings: GeniusBooking[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearBag: () => void;
  onOpenGeniusBooking: (storeId?: string) => void;
  onCancelBooking: (bookingId: string) => void;
  onNavigateToStore: () => void;
}

export const BagAndYouScreen: React.FC<BagAndYouScreenProps> = ({
  bagItems,
  stores,
  currentRegion,
  bookings,
  onUpdateQuantity,
  onRemoveItem,
  onClearBag,
  onOpenGeniusBooking,
  onCancelBooking,
  onNavigateToStore,
}) => {
  const [activeSection, setActiveSection] = useState<'bag' | 'you'>('bag');
  const [fulfillmentType, setFulfillmentType] = useState<'pickup' | 'delivery'>('pickup');
  const [selectedPickupStore, setSelectedPickupStore] = useState<string>('mbs');
  const [isCheckingOut, setIsCheckingOut] = useState<boolean>(false);
  const [orderConfirmed, setOrderConfirmed] = useState<boolean>(false);
  const [orderId, setOrderId] = useState<string>('');

  const subtotalSGD = bagItems.reduce(
    (sum, item) => sum + item.priceSGD * item.quantity,
    0
  );
  const gstSGD = Math.round(subtotalSGD * 0.09);
  const totalSGD = subtotalSGD;

  const formatPrice = (valSGD: number) => {
    const val = Math.round(valSGD * currentRegion.rateFromSGD);
    return `${currentRegion.symbol}${val.toLocaleString()}`;
  };

  const handleCheckout = (method: 'applepay' | 'card') => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setOrderId(`SG-${Math.floor(100000 + Math.random() * 900000)}`);
      setOrderConfirmed(true);
      onClearBag();
    }, 1200);
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#F5F5F7] pb-16">
      {/* Top Segmented Header */}
      <div className="bg-white border-b border-black/[0.04] pt-4 pb-3 px-4">
        <div className="max-w-md mx-auto">
          <div className="flex bg-[#F5F5F7] p-1 rounded-xl">
            <button
              onClick={() => setActiveSection('bag')}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                activeSection === 'bag'
                  ? 'bg-white text-[#1D1D1F] shadow-xs'
                  : 'text-[#6E6E73] hover:text-[#1D1D1F]'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">shopping_bag</span>
              <span>Bag ({bagItems.reduce((acc, i) => acc + i.quantity, 0)})</span>
            </button>
            <button
              onClick={() => setActiveSection('you')}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                activeSection === 'you'
                  ? 'bg-white text-[#1D1D1F] shadow-xs'
                  : 'text-[#6E6E73] hover:text-[#1D1D1F]'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">person</span>
              <span>You &amp; Passes</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto w-full px-4 py-6">
        {/* BAG TAB */}
        {activeSection === 'bag' && (
          <div>
            {orderConfirmed ? (
              <div className="bg-white rounded-2xl p-6 border border-black/[0.04] shadow-xs text-center space-y-4 animate-in fade-in-50">
                <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                  <span className="material-symbols-outlined text-[36px]">check_circle</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#1D1D1F]">Order Confirmed!</h3>
                  <p className="text-xs text-[#6E6E73] mt-1">
                    Your order <span className="font-semibold text-[#1D1D1F]">#{orderId}</span> is processing.
                  </p>
                </div>

                <div className="bg-[#F5F5F7] p-4 rounded-xl text-left text-xs space-y-2">
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Pickup Location:</span>
                    <span className="font-semibold text-neutral-800">
                      {stores.find((s) => s.id === selectedPickupStore)?.name || 'Apple Marina Bay Sands'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Ready Time:</span>
                    <span className="font-semibold text-emerald-600">Today in ~1 hour</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Contact Email:</span>
                    <span className="font-semibold text-neutral-800">niharika.admits@gmail.com</span>
                  </div>
                </div>

                <div className="flex flex-col gap-2 pt-2">
                  <button
                    onClick={() => {
                      setOrderConfirmed(false);
                      setActiveSection('you');
                    }}
                    className="w-full py-2.5 bg-[#0071E3] text-white text-xs font-semibold rounded-full hover:bg-[#0077ED] transition-colors cursor-pointer"
                  >
                    View Pickup Pass in You tab
                  </button>
                  <button
                    onClick={() => {
                      setOrderConfirmed(false);
                      onNavigateToStore();
                    }}
                    className="w-full py-2.5 bg-[#F5F5F7] text-[#1D1D1F] text-xs font-medium rounded-full hover:bg-neutral-200 transition-colors cursor-pointer"
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            ) : bagItems.length === 0 ? (
              <div className="bg-white rounded-2xl p-8 border border-black/[0.04] shadow-xs text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#F5F5F7] flex items-center justify-center mx-auto text-[#6E6E73]">
                  <span className="material-symbols-outlined text-[32px]">shopping_bag</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#1D1D1F]">Your Bag is empty.</h3>
                  <p className="text-xs text-[#6E6E73] mt-1 max-w-xs mx-auto">
                    Explore the latest iPhone 18 Pro, foldable iPhone Duo, and M6 Apple Silicon Macs.
                  </p>
                </div>
                <button
                  onClick={onNavigateToStore}
                  className="px-6 py-2.5 bg-[#0071E3] hover:bg-[#0077ED] text-white text-xs font-semibold rounded-full shadow-xs cursor-pointer active:scale-95 transition-transform"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Bag items list */}
                <div className="bg-white rounded-2xl p-4 border border-black/[0.04] shadow-xs divide-y divide-black/[0.04]">
                  {bagItems.map((item) => (
                    <div key={item.id} className="py-3.5 first:pt-0 last:pb-0 flex gap-3">
                      <div className="w-20 h-20 bg-[#F5F5F7] rounded-xl p-1 shrink-0 flex items-center justify-center">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="flex flex-col flex-1 min-w-0 justify-between">
                        <div>
                          <div className="flex items-start justify-between gap-1">
                            <h4 className="text-[14px] font-semibold text-[#1D1D1F] leading-tight">
                              {item.name}
                            </h4>
                            <span className="text-[14px] font-bold text-[#1D1D1F] tabular-nums shrink-0">
                              {formatPrice(item.priceSGD * item.quantity)}
                            </span>
                          </div>
                          {(item.selectedColor || item.selectedStorage) && (
                            <p className="text-[11px] text-[#6E6E73] mt-0.5">
                              {[item.selectedColor, item.selectedStorage].filter(Boolean).join(' • ')}
                            </p>
                          )}
                        </div>

                        {/* Quantity and Delete */}
                        <div className="flex items-center justify-between pt-2">
                          <div className="flex items-center border border-black/10 rounded-lg overflow-hidden bg-[#F5F5F7]">
                            <button
                              onClick={() => onUpdateQuantity(item.id, -1)}
                              className="w-7 h-7 flex items-center justify-center text-neutral-600 hover:bg-neutral-200 cursor-pointer"
                              title="Decrease"
                            >
                              -
                            </button>
                            <span className="w-8 text-center text-xs font-semibold tabular-nums">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(item.id, 1)}
                              className="w-7 h-7 flex items-center justify-center text-neutral-600 hover:bg-neutral-200 cursor-pointer"
                              title="Increase"
                            >
                              +
                            </button>
                          </div>
                          <button
                            onClick={() => onRemoveItem(item.id)}
                            className="text-[12px] text-rose-600 hover:underline cursor-pointer"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Fulfillment Selection */}
                <div className="bg-white rounded-2xl p-4 border border-black/[0.04] shadow-xs space-y-3">
                  <h4 className="text-xs font-bold text-[#1D1D1F] uppercase tracking-wider">
                    How would you like to receive your order?
                  </h4>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setFulfillmentType('pickup')}
                      className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                        fulfillmentType === 'pickup'
                          ? 'border-[#0071E3] bg-blue-50/40 text-[#1D1D1F]'
                          : 'border-black/10 text-neutral-600 hover:bg-neutral-50'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className="material-symbols-outlined text-[18px] text-[#0071E3]">
                          storefront
                        </span>
                        <span className="text-xs font-semibold">Store Pickup</span>
                      </div>
                      <p className="text-[10px] text-neutral-500">Ready in 1 hr • Free</p>
                    </button>

                    <button
                      onClick={() => setFulfillmentType('delivery')}
                      className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                        fulfillmentType === 'delivery'
                          ? 'border-[#0071E3] bg-blue-50/40 text-[#1D1D1F]'
                          : 'border-black/10 text-neutral-600 hover:bg-neutral-50'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className="material-symbols-outlined text-[18px] text-[#0071E3]">
                          local_shipping
                        </span>
                        <span className="text-xs font-semibold">Free Delivery</span>
                      </div>
                      <p className="text-[10px] text-neutral-500">Across Singapore • 1–2 Days</p>
                    </button>
                  </div>

                  {fulfillmentType === 'pickup' && (
                    <div className="pt-2">
                      <label className="text-[11px] font-medium text-neutral-600 block mb-1">
                        Select Singapore Pickup Store:
                      </label>
                      <select
                        value={selectedPickupStore}
                        onChange={(e) => setSelectedPickupStore(e.target.value)}
                        className="w-full p-2.5 text-xs bg-[#F5F5F7] border border-black/10 rounded-xl font-medium focus:outline-[#0071E3]"
                      >
                        {stores.map((s) => (
                          <option key={s.id} value={s.id}>
                            {s.name} ({s.statusText})
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>

                {/* Calculation Summary */}
                <div className="bg-white rounded-2xl p-4 border border-black/[0.04] shadow-xs space-y-2 text-xs">
                  <div className="flex justify-between text-neutral-600">
                    <span>Subtotal</span>
                    <span className="tabular-nums font-medium">{formatPrice(subtotalSGD)}</span>
                  </div>
                  <div className="flex justify-between text-neutral-600">
                    <span>Delivery / Pickup</span>
                    <span className="font-semibold text-emerald-600">FREE</span>
                  </div>
                  <div className="flex justify-between text-neutral-500 text-[11px]">
                    <span>Includes 9% GST</span>
                    <span className="tabular-nums">{formatPrice(gstSGD)}</span>
                  </div>
                  <div className="border-t border-black/[0.06] pt-2 flex justify-between text-sm font-bold text-[#1D1D1F]">
                    <span>Total Due</span>
                    <span className="tabular-nums text-[16px] text-[#0071E3]">{formatPrice(totalSGD)}</span>
                  </div>

                  {/* Payment Buttons */}
                  <div className="pt-3 space-y-2">
                    <button
                      disabled={isCheckingOut}
                      onClick={() => handleCheckout('applepay')}
                      className="w-full py-3 bg-black hover:bg-neutral-800 text-white font-semibold rounded-full flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-all cursor-pointer disabled:opacity-50"
                    >
                      <span className="material-symbols-outlined text-[18px]">credit_card</span>
                      {isCheckingOut ? 'Authorizing Payment...' : 'Check Out with Apple Pay'}
                    </button>
                    <button
                      disabled={isCheckingOut}
                      onClick={() => handleCheckout('card')}
                      className="w-full py-2.5 bg-[#0071E3] hover:bg-[#0077ED] text-white font-medium text-xs rounded-full flex items-center justify-center gap-1 active:scale-95 transition-all cursor-pointer disabled:opacity-50"
                    >
                      Continue with Credit / Debit Card
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* YOU & PASSES TAB */}
        {activeSection === 'you' && (
          <div className="space-y-4">
            {/* User Profile Card */}
            <div className="bg-white rounded-2xl p-5 border border-black/[0.04] shadow-xs flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-full bg-[#0071E3] flex items-center justify-center text-white text-lg font-bold shadow-xs">
                N
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-bold text-[#1D1D1F] truncate">Niharika</h3>
                <p className="text-xs text-[#6E6E73] truncate">niharika.admits@gmail.com</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-blue-50 text-[#0071E3]">
                    Apple ID Singapore
                  </span>
                  <span className="text-[10px] text-neutral-400">Singapore Resident</span>
                </div>
              </div>
            </div>

            {/* Apple Wallet Digital Pickup Pass */}
            <div className="bg-gradient-to-br from-neutral-900 to-black text-white rounded-2xl p-5 shadow-lg border border-neutral-800 relative overflow-hidden">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[#abc7ff] text-[20px]">
                    wallet
                  </span>
                  <span className="text-xs uppercase font-bold tracking-widest text-[#abc7ff]">
                    Apple Store Pickup Pass
                  </span>
                </div>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded font-semibold">
                  ACTIVE
                </span>
              </div>

              <div className="py-4 space-y-2">
                <p className="text-lg font-bold">Apple Marina Bay Sands</p>
                <p className="text-xs text-neutral-300">
                  Ready for Express Pickup at Bayfront Level B2-06
                </p>
                <div className="grid grid-cols-2 gap-2 pt-2 text-[11px]">
                  <div>
                    <span className="text-neutral-400 block text-[10px]">Pass Holder</span>
                    <span className="font-semibold">Niharika</span>
                  </div>
                  <div>
                    <span className="text-neutral-400 block text-[10px]">Reference</span>
                    <span className="font-mono font-semibold">#SG-9824-MBS</span>
                  </div>
                </div>
              </div>

              {/* Simulated Barcode */}
              <div className="bg-white p-3 rounded-xl flex flex-col items-center justify-center mt-1">
                <div className="h-10 w-full flex items-center justify-between gap-0.5 px-2">
                  {[4,2,6,1,3,5,2,4,7,1,3,6,2,4,1,5,3,2,6,4,2,3,5,1,4,6,2,5,3,1,4,2].map((w, idx) => (
                    <div
                      key={idx}
                      className="bg-black h-full rounded-[1px]"
                      style={{ width: `${w * 1.5}px` }}
                    />
                  ))}
                </div>
                <span className="text-[9px] font-mono text-black font-semibold mt-1 tracking-widest">
                  9824 0019 4432 8812
                </span>
              </div>
            </div>

            {/* Genius Bar Bookings */}
            <div className="bg-white rounded-2xl p-5 border border-black/[0.04] shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[#0071E3] text-[20px]">
                    support_agent
                  </span>
                  <h4 className="text-sm font-bold text-[#1D1D1F]">
                    Genius Bar Reservations ({bookings.length})
                  </h4>
                </div>
                <button
                  onClick={() => onOpenGeniusBooking()}
                  className="text-xs text-[#0071E3] font-semibold hover:underline cursor-pointer"
                >
                  + Book Slot
                </button>
              </div>

              {bookings.length === 0 ? (
                <p className="text-xs text-[#6E6E73] py-2">
                  No upcoming reservations. Need technical diagnostics or setup assistance?
                </p>
              ) : (
                <div className="space-y-2">
                  {bookings.map((b) => (
                    <div
                      key={b.id}
                      className="p-3 bg-[#F5F5F7] rounded-xl flex items-center justify-between text-xs"
                    >
                      <div>
                        <span className="font-bold text-[#1D1D1F] block">{b.storeName}</span>
                        <span className="text-[11px] text-[#6E6E73]">
                          {b.productCategory} • {b.date} at {b.timeSlot}
                        </span>
                      </div>
                      <button
                        onClick={() => onCancelBooking(b.id)}
                        className="text-[11px] text-rose-600 hover:underline cursor-pointer font-medium ml-2"
                      >
                        Cancel
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Saved Singapore Delivery Addresses */}
            <div className="bg-white rounded-2xl p-5 border border-black/[0.04] shadow-xs space-y-2 text-xs">
              <h4 className="text-sm font-bold text-[#1D1D1F]">Default Delivery Address</h4>
              <div className="p-3 bg-[#F5F5F7] rounded-xl flex items-start gap-2.5">
                <span className="material-symbols-outlined text-[#0071E3] text-[18px] shrink-0 mt-0.5">
                  home
                </span>
                <div>
                  <p className="font-semibold text-[#1D1D1F]">Primary Residence</p>
                  <p className="text-neutral-600">8 Marina Boulevard, Marina Bay Residences</p>
                  <p className="text-neutral-500">Singapore 018981</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
