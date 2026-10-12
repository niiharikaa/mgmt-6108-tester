export type ActiveTab = 'store' | 'explore' | 'apple-tv' | 'bag-account';

export interface ProductColor {
  name: string;
  hex: string;
  image?: string;
}

export interface StorageOption {
  size: string;
  extraPrice: number;
}

export interface Product {
  id: string;
  name: string;
  kicker?: string;
  tagline: string;
  badge?: string;
  category: 'iphone' | 'mac' | 'watch' | 'ipad' | 'airpods';
  theme: 'pro-dark' | 'consumer-light';
  basePriceSGD: number;
  image: string;
  altText: string;
  colors?: ProductColor[];
  storages?: StorageOption[];
  specs: { label: string; value: string }[];
  description: string;
  launchInfo?: string;
  featured?: boolean;
}

export interface TVShow {
  id: string;
  title: string;
  genre: string;
  tagline: string;
  synopsis: string;
  rating: string;
  duration: string;
  image: string;
  altText: string;
  videoUrl?: string;
  cast: string[];
  featured?: boolean;
}

export interface StoreLocation {
  id: string;
  name: string;
  address: string;
  postal: string;
  hours: string;
  statusText: string;
  phone: string;
  description: string;
  features: string[];
  image: string;
}

export interface BagItem {
  id: string;
  productId: string;
  name: string;
  selectedColor?: string;
  selectedStorage?: string;
  priceSGD: number;
  quantity: number;
  image: string;
}

export interface GeniusBooking {
  id: string;
  storeId: string;
  storeName: string;
  productCategory: string;
  date: string;
  timeSlot: string;
  customerName: string;
  contactEmail: string;
}

export interface RegionCurrency {
  code: string;
  name: string;
  symbol: string;
  rateFromSGD: number;
}
