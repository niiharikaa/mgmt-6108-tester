import React, { useState } from 'react';
import { StoreLocation, GeniusBooking } from '../types/store';

interface StoreDetailModalProps {
  store: StoreLocation;
  allStores: StoreLocation[];
  onClose: () => void;
  onBookGenius: (booking: GeniusBooking) => void;
}

export const StoreDetailModal: React.FC<StoreDetailModalProps> = ({
  store,
  allStores,
  onClose,
  onBookGenius,
}) => {
  const [activeTab, setActiveTab] = useState<'info' | 'book'>('info');
  const [selectedCategory, setSelectedCategory] = useState<string>('iPhone');
  const [selectedDate, setSelectedDate] = useState<string>('Today, 12 Oct');
  const [selectedTime, setSelectedTime] = useState<string>('2:30 PM');
  const [bookingSuccess, setBookingSuccess] = useState<boolean>(false);

  const categories = ['iPhone', 'Mac', 'Apple Watch', 'iPad', 'AirPods', 'Accessories'];
  const dates = ['Today, 12 Oct', 'Tomorrow, 13 Oct', 'Tuesday, 14 Oct'];
  const timeSlots = ['11:00 AM', '1:15 PM', '2:30 PM', '4:00 PM', '5:45 PM', '7:15 PM'];

  const handleConfirmBooking = () => {
    const newBooking: GeniusBooking = {
      id: `GB-${Date.now()}`,
      storeId: store.id,
      storeName: store.name,
      productCategory: selectedCategory,
      date: selectedDate,
      timeSlot: selectedTime,
      customerName: 'Niharika',
      contactEmail: 'niharika.admits@gmail.com',
    };
    onBookGenius(newBooking);
    setBookingSuccess(true);
    setTimeout(() => {
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in-50">
      <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto no-scrollbar shadow-2xl border border-black/10 flex flex-col">
        {/* Header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-black/[0.05] flex items-center justify-between z-10">
          <div>
            <span className="text-[11px] font-bold text-[#0071E3] uppercase tracking-wider">
              Apple Singapore Retail
            </span>
            <h3 className="text-xl font-bold text-[#1D1D1F] leading-tight">
              {store.name}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#F5F5F7] hover:bg-neutral-200 text-[#1D1D1F] flex items-center justify-center cursor-pointer transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Tab switch */}
        <div className="px-6 pt-3">
          <div className="flex bg-[#F5F5F7] p-1 rounded-xl">
            <button
              onClick={() => setActiveTab('info')}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                activeTab === 'info'
                  ? 'bg-white text-[#1D1D1F] shadow-xs'
                  : 'text-[#6E6E73] hover:text-[#1D1D1F]'
              }`}
            >
              Store Information &amp; Hours
            </button>
            <button
              onClick={() => setActiveTab('book')}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                activeTab === 'book'
                  ? 'bg-white text-[#1D1D1F] shadow-xs'
                  : 'text-[#6E6E73] hover:text-[#1D1D1F]'
              }`}
            >
              Book Genius Bar
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="p-6 space-y-5">
          {activeTab === 'info' ? (
            <>
              {/* Store Hero Banner */}
              <div className="w-full h-44 rounded-2xl overflow-hidden bg-neutral-900 relative">
                <img
                  src={store.image}
                  alt={store.name}
                  className="w-full h-full object-cover filter brightness-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <span className="absolute bottom-3 left-3 text-white text-xs font-semibold px-2 py-1 bg-black/50 backdrop-blur-md rounded-md">
                  {store.statusText}
                </span>
              </div>

              <div>
                <p className="text-xs text-[#6E6E73] leading-relaxed">
                  {store.description}
                </p>
              </div>

              <div className="bg-[#F5F5F7] p-4 rounded-xl space-y-2 text-xs">
                <div className="flex items-start gap-2 text-neutral-800">
                  <span className="material-symbols-outlined text-[#0071E3] text-[18px] shrink-0 mt-0.5">
                    location_on
                  </span>
                  <div>
                    <span className="font-semibold block">{store.address}</span>
                    <span className="text-neutral-500">{store.postal}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-neutral-800 pt-1">
                  <span className="material-symbols-outlined text-[#0071E3] text-[18px] shrink-0">
                    schedule
                  </span>
                  <span>{store.hours}</span>
                </div>
                <div className="flex items-center gap-2 text-neutral-800 pt-1">
                  <span className="material-symbols-outlined text-[#0071E3] text-[18px] shrink-0">
                    call
                  </span>
                  <a href={`tel:${store.phone}`} className="text-[#0071E3] font-medium hover:underline">
                    {store.phone}
                  </a>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-[#1D1D1F] uppercase tracking-wider mb-2">
                  Store Services &amp; Highlights
                </h4>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {store.features.map((feat, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-lg border border-black/[0.06] bg-white flex items-center gap-2"
                    >
                      <span className="material-symbols-outlined text-[#0071E3] text-[16px]">
                        check_circle
                      </span>
                      <span className="text-neutral-700">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setActiveTab('book')}
                  className="w-full py-2.5 bg-[#0071E3] hover:bg-[#0077ED] text-white text-xs font-semibold rounded-full shadow-md active:scale-95 transition-transform cursor-pointer"
                >
                  Reserve a Specialist or Genius Bar Appointment
                </button>
              </div>
            </>
          ) : (
            <div className="space-y-4">
              {bookingSuccess ? (
                <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-3 animate-in zoom-in-95">
                  <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto">
                    <span className="material-symbols-outlined text-[28px]">check</span>
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-emerald-950">Reservation Confirmed!</h4>
                    <p className="text-xs text-emerald-800 mt-1">
                      {selectedCategory} Genius Bar support reserved at {store.name} for {selectedDate} at {selectedTime}.
                    </p>
                  </div>
                </div>
              ) : (
                <>
                  <div>
                    <label className="text-xs font-bold text-[#1D1D1F] block mb-1.5">
                      1. Select Device for Diagnostics
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {categories.map((cat) => (
                        <button
                          key={cat}
                          onClick={() => setSelectedCategory(cat)}
                          className={`p-2 rounded-xl border text-center text-xs font-semibold cursor-pointer transition-all ${
                            selectedCategory === cat
                              ? 'border-[#0071E3] bg-blue-50/50 text-[#0071E3] ring-1 ring-[#0071E3]'
                              : 'border-black/10 hover:border-black/20 text-[#1D1D1F]'
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#1D1D1F] block mb-1.5">
                      2. Select Date
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {dates.map((d) => (
                        <button
                          key={d}
                          onClick={() => setSelectedDate(d)}
                          className={`p-2 rounded-xl border text-center text-xs font-semibold cursor-pointer transition-all ${
                            selectedDate === d
                              ? 'border-[#0071E3] bg-blue-50/50 text-[#0071E3] ring-1 ring-[#0071E3]'
                              : 'border-black/10 hover:border-black/20 text-[#1D1D1F]'
                          }`}
                        >
                          {d}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#1D1D1F] block mb-1.5">
                      3. Available Time Slots (SGT)
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {timeSlots.map((ts) => (
                        <button
                          key={ts}
                          onClick={() => setSelectedTime(ts)}
                          className={`p-2 rounded-xl border text-center text-xs font-semibold cursor-pointer transition-all ${
                            selectedTime === ts
                              ? 'border-[#0071E3] bg-blue-50/50 text-[#0071E3] ring-1 ring-[#0071E3]'
                              : 'border-black/10 hover:border-black/20 text-[#1D1D1F]'
                          }`}
                        >
                          {ts}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3">
                    <button
                      onClick={handleConfirmBooking}
                      className="w-full py-2.5 bg-[#0071E3] hover:bg-[#0077ED] text-white text-xs font-semibold rounded-full shadow-md active:scale-95 transition-transform cursor-pointer"
                    >
                      Confirm Reservation at {store.name}
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
