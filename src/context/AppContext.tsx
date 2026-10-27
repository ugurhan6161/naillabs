import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, Order, User, OrderCustomer } from '../types';
import { INITIAL_PRODUCTS, INITIAL_ORDERS, INITIAL_USER } from '../data/mockData';

interface AppContextType {
  products: Product[];
  currentRoute: string;
  routeParam?: string;
  navigateTo: (route: string, param?: string) => void;
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, selectedForm?: string, selectedGrit?: string) => void;
  removeFromCart: (cartItemId: string) => void;
  updateCartQuantity: (cartItemId: string, delta: number) => void;
  clearCart: () => void;
  cartSubtotal: number;
  cartDiscount: number;
  cartShipping: number;
  cartTotal: number;
  appliedCoupon: string | null;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  isMiniCartOpen: boolean;
  setIsMiniCartOpen: (open: boolean) => void;
  user: User | null;
  toggleTrainerStatus: () => void;
  updateUser: (updated: Partial<User>) => void;
  orders: Order[];
  createOrder: (customer: OrderCustomer, paymentMethod: 'card' | 'transfer', carrier: string) => Order;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  lastPlacedOrder: Order | null;
  toastMessage: string | null;
  showToast: (msg: string) => void;
  updateProductStock: (productId: string, newStock: number) => void;
  addProduct: (product: Product) => void;
  updateProductPrice: (productId: string, newPrice: number) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('nailab_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('nailab_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('nailab_user');
    return saved ? JSON.parse(saved) : INITIAL_USER;
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('nailab_cart');
    if (saved) return JSON.parse(saved);
    // default seed cart with 1 flagship product
    return [
      {
        id: 'prod-01-kare',
        product: INITIAL_PRODUCTS[0],
        quantity: 1,
        selectedForm: 'Doğal Kare Form',
        selectedGrit: '180 Grit Mat Eğitim Formu',
      },
    ];
  });

  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [isMiniCartOpen, setIsMiniCartOpen] = useState<boolean>(false);
  const [lastPlacedOrder, setLastPlacedOrder] = useState<Order | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Simple Hash-based Routing
  const [currentRoute, setCurrentRoute] = useState<string>('/');
  const [routeParam, setRouteParam] = useState<string | undefined>(undefined);

  useEffect(() => {
    const parseHash = () => {
      const hash = window.location.hash.slice(1) || '/';
      const parts = hash.split('/').filter(Boolean);
      if (parts.length === 0) {
        setCurrentRoute('/');
        setRouteParam(undefined);
      } else if (parts[0] === 'urun' && parts[1]) {
        setCurrentRoute('/urun');
        setRouteParam(parts[1]);
      } else {
        setCurrentRoute('/' + parts[0]);
        setRouteParam(parts[1]);
      }
    };

    parseHash();
    window.addEventListener('hashchange', parseHash);
    return () => window.removeEventListener('hashchange', parseHash);
  }, []);

  const navigateTo = (route: string, param?: string) => {
    let target = route;
    if (param) {
      if (route.endsWith('/')) {
        target = `${route}${param}`;
      } else {
        target = `${route}/${param}`;
      }
    }
    window.location.hash = target.startsWith('/') ? target : `/${target}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    localStorage.setItem('nailab_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('nailab_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('nailab_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('nailab_cart', JSON.stringify(cart));
  }, [cart]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 3200);
  };

  const addToCart = (
    product: Product,
    quantity = 1,
    selectedForm = product.formsAvailable?.[0] || 'Standart',
    selectedGrit = product.gritOptions?.[0] || 'Standart'
  ) => {
    const cartItemId = `${product.id}-${selectedForm}-${selectedGrit}`;
    setCart((prev) => {
      const existing = prev.find((item) => item.id === cartItemId);
      if (existing) {
        return prev.map((item) =>
          item.id === cartItemId ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [
        ...prev,
        {
          id: cartItemId,
          product,
          quantity,
          selectedForm,
          selectedGrit,
        },
      ];
    });
    showToast(`"${product.title}" sepete eklendi.`);
    setIsMiniCartOpen(true);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
    showToast('Ürün sepetten kaldırıldı.');
  };

  const updateCartQuantity = (cartItemId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === cartItemId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  // Calculations
  const cartSubtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  // Discount calculation: trainer gets 15%, coupon code gets specific
  let discountRate = 0;
  if (user?.isTrainer) {
    discountRate = 0.15;
  } else if (appliedCoupon === 'EGITMEN15') {
    discountRate = 0.15;
  } else if (appliedCoupon === 'NAILAB10') {
    discountRate = 0.1;
  }

  const cartDiscount = Math.round(cartSubtotal * discountRate);
  const cartShipping = cartSubtotal > 1000 || cartSubtotal === 0 ? 0 : 59;
  const cartTotal = Math.max(0, cartSubtotal - cartDiscount + cartShipping);

  const applyCoupon = (code: string) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'EGITMEN15' || clean === 'NAILAB10') {
      setAppliedCoupon(clean);
      showToast(`Kupon kodu "${clean}" başarıyla uygulandı!`);
      return true;
    }
    showToast('Geçersiz kupon kodu. Deneyin: EGITMEN15 veya NAILAB10');
    return false;
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast('Kupon kaldırıldı.');
  };

  const toggleTrainerStatus = () => {
    setUser((prev) => {
      if (!prev) return null;
      const nextTrainer = !prev.isTrainer;
      showToast(
        nextTrainer
          ? 'Onaylı Tırnak Eğitmeni Modu Aktif (%15 VIP Sepet İndirimi Tanımlandı)'
          : 'Standart Müşteri Moduna Geçildi'
      );
      return {
        ...prev,
        isTrainer: nextTrainer,
        discountRate: nextTrainer ? 0.15 : 0,
      };
    });
  };

  const updateUser = (updated: Partial<User>) => {
    setUser((prev) => (prev ? { ...prev, ...updated } : null));
    showToast('Profil bilgileri güncellendi.');
  };

  const createOrder = (
    customer: OrderCustomer,
    paymentMethod: 'card' | 'transfer',
    carrier: string
  ): Order => {
    const randomSuffix = Math.floor(10000 + Math.random() * 90000);
    const orderId = `NLB-${randomSuffix}`;
    const dateStr = new Date().toISOString().replace('T', ' ').slice(0, 16);

    const newOrder: Order = {
      id: orderId,
      date: dateStr,
      customer,
      items: [...cart],
      shippingCarrier: carrier,
      paymentMethod,
      subtotal: cartSubtotal,
      discount: cartDiscount,
      shippingFee: cartShipping,
      total: cartTotal,
      status: 'hazirlaniyor',
      trackingNumber: `${carrier.substring(0, 2).toUpperCase()}-${Math.floor(10000000 + Math.random() * 90000000)}`,
    };

    setOrders((prev) => [newOrder, ...prev]);
    setLastPlacedOrder(newOrder);
    clearCart();
    setAppliedCoupon(null);
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders((prev) =>
      prev.map((ord) => (ord.id === orderId ? { ...ord, status } : ord))
    );
    showToast(`Sipariş durumu güncellendi: ${status}`);
  };

  const updateProductStock = (productId: string, newStock: number) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === productId ? { ...p, stockCount: newStock, inStock: newStock > 0 } : p
      )
    );
    showToast('Stok bilgisi güncellendi.');
  };

  const updateProductPrice = (productId: string, newPrice: number) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, price: newPrice } : p))
    );
    showToast('Fiyat güncellendi.');
  };

  const addProduct = (newProduct: Product) => {
    setProducts((prev) => [newProduct, ...prev]);
    showToast(`Yeni ürün "${newProduct.title}" eklendi.`);
  };

  return (
    <AppContext.Provider
      value={{
        products,
        currentRoute,
        routeParam,
        navigateTo,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartSubtotal,
        cartDiscount,
        cartShipping,
        cartTotal,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        isMiniCartOpen,
        setIsMiniCartOpen,
        user,
        toggleTrainerStatus,
        updateUser,
        orders,
        createOrder,
        updateOrderStatus,
        lastPlacedOrder,
        toastMessage,
        showToast,
        updateProductStock,
        addProduct,
        updateProductPrice,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
