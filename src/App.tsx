import React from 'react';
import { useApp } from './context/AppContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { MiniCartDrawer } from './components/MiniCartDrawer';
import { Toast } from './components/Toast';

import { HomePage } from './pages/HomePage';
import { StorePage } from './pages/StorePage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderSuccessPage } from './pages/OrderSuccessPage';
import { OrderTrackingPage } from './pages/OrderTrackingPage';
import { TrainerPortalPage } from './pages/TrainerPortalPage';
import { AccountPage } from './pages/AccountPage';
import { AdminPage } from './pages/AdminPage';
import { ContentPage } from './pages/ContentPage';

export const App: React.FC = () => {
  const { currentRoute } = useApp();

  const renderCurrentPage = () => {
    switch (currentRoute) {
      case '/':
        return <HomePage />;
      case '/magaza':
        return <StorePage />;
      case '/urun':
        return <ProductDetailPage />;
      case '/sepet':
        return <CartPage />;
      case '/odeme':
        return <CheckoutPage />;
      case '/siparis-tamamlandi':
        return <OrderSuccessPage />;
      case '/siparis-takip':
        return <OrderTrackingPage />;
      case '/egitmen-portali':
        return <TrainerPortalPage />;
      case '/hesabim':
        return <AccountPage />;
      case '/admin':
        return <AdminPage />;
      case '/iletisim-sss':
        return <ContentPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fff8f4] text-[#1e1b18] font-['Outfit']">
      <Header />
      <main className="flex-1 w-full pb-16">{renderCurrentPage()}</main>
      <Footer />
      <MiniCartDrawer />
      <Toast />
    </div>
  );
};

export default App;
