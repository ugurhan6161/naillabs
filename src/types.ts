export type ProductCategory = 'all' | 'kits' | 'bits' | 'forms' | 'accessories';

export interface Product {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  price: number;
  originalPrice?: number;
  category: 'kits' | 'bits' | 'forms' | 'accessories';
  badge?: string;
  rating: number;
  reviewsCount: number;
  inStock: boolean;
  stockCount: number;
  description: string;
  features: string[];
  formsAvailable?: string[];
  gritOptions?: string[];
  specs: {
    material: string;
    scale: string;
    compatibility: string;
    autoclave: string;
    boxContent: string;
  };
  images: string[];
  thumbnail: string;
}

export interface CartItem {
  id: string; // unique item id = `${productId}-${form}-${grit}`
  product: Product;
  quantity: number;
  selectedForm?: string;
  selectedGrit?: string;
}

export interface OrderCustomer {
  fullName: string;
  email: string;
  phone: string;
  city: string;
  district: string;
  address: string;
  isCorporate: boolean;
  companyName?: string;
  taxNumber?: string;
}

export interface Order {
  id: string;
  date: string;
  customer: OrderCustomer;
  items: CartItem[];
  shippingCarrier: string;
  paymentMethod: 'card' | 'transfer';
  subtotal: number;
  discount: number;
  shippingFee: number;
  total: number;
  status: 'hazirlaniyor' | 'kargolandi' | 'teslim_edildi' | 'iptal';
  trackingNumber: string;
}

export interface User {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  isTrainer: boolean;
  academyName?: string;
  certificateNo?: string;
  discountRate: number; // e.g. 0.15 for 15%
}
