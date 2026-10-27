import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, PackageCheck, Printer, ArrowRight, Truck } from 'lucide-react';

export const OrderSuccessPage: React.FC = () => {
  const { lastPlacedOrder, orders, routeParam, navigateTo } = useApp();

  const order =
    (routeParam && orders.find((o) => o.id === routeParam)) ||
    lastPlacedOrder ||
    orders[0];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto space-y-8">
      {/* Success Badge */}
      <div className="text-center space-y-3">
        <div className="w-18 h-18 rounded-full bg-[#faf2ed] text-emerald-700 flex items-center justify-center mx-auto border-2 border-emerald-600 shadow-md">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#765841]">
          Siparişiniz Başarıyla Alındı
        </span>
        <h1 className="text-3xl sm:text-4xl font-normal text-black tracking-tight">
          Teşekkür Ederiz, {order?.customer.fullName}!
        </h1>
        <p className="text-xs sm:text-sm text-[#4c4546] max-w-md mx-auto">
          Sipariş detaylarınız ve e-faturanız <strong>{order?.customer.email}</strong> adresine
          iletilmiştir.
        </p>
      </div>

      {/* Order Info Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#dbcec2] shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-[#f4ece7] pb-4">
          <div>
            <span className="text-[11px] text-[#7e7576] block">Sipariş Referans Numarası</span>
            <span className="text-lg font-bold font-mono text-black">{order?.id}</span>
          </div>
          <div className="sm:text-right">
            <span className="text-[11px] text-[#7e7576] block">Sipariş Tarihi</span>
            <span className="text-xs font-semibold text-black">{order?.date}</span>
          </div>
        </div>

        {/* Stepper Status */}
        <div className="p-4 rounded-2xl bg-[#faf2ed] border border-[#dbcec2] space-y-3">
          <div className="flex justify-between items-center text-xs">
            <span className="font-bold text-[#60432e] flex items-center gap-1.5">
              <PackageCheck className="w-4 h-4 text-[#a9876d]" />
              Sipariş Durumu: {order?.status === 'hazirlaniyor' ? 'Hazırlanıyor' : 'Kargoya Verildi'}
            </span>
            <span className="text-[11px] text-[#765841] font-semibold">
              Tahmini Teslimat: 1-2 İş Günü
            </span>
          </div>
          <div className="w-full bg-[#dbcec2] h-2 rounded-full overflow-hidden">
            <div className="bg-[#765841] h-full rounded-full w-1/3" />
          </div>
        </div>

        {/* Products */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#765841]">
            Satın Alınan Ekipmanlar
          </h4>
          <div className="space-y-3 divide-y divide-[#f4ece7]">
            {order?.items.map((item, idx) => (
              <div key={idx} className="pt-3 first:pt-0 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <img
                    src={item.product.thumbnail}
                    alt={item.product.title}
                    className="w-12 h-12 rounded-xl object-cover bg-[#f4ece7] shrink-0"
                  />
                  <div>
                    <h5 className="text-xs font-semibold text-black">{item.product.title}</h5>
                    <p className="text-[10px] text-[#765841]">
                      {item.quantity} Adet {item.selectedForm ? `• ${item.selectedForm}` : ''}
                    </p>
                  </div>
                </div>
                <span className="text-xs font-bold text-black">
                  ₺{(item.product.price * item.quantity).toLocaleString('tr-TR')}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Delivery Address & Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#f4ece7] text-xs">
          <div>
            <h5 className="font-semibold text-black mb-1">Teslimat Adresi</h5>
            <p className="text-[#4c4546] leading-relaxed">
              {order?.customer.fullName}
              <br />
              {order?.customer.address}
              <br />
              {order?.customer.district} / {order?.customer.city}
              <br />
              Tel: {order?.customer.phone}
            </p>
          </div>
          <div>
            <h5 className="font-semibold text-black mb-1">Ödeme Özeti</h5>
            <div className="space-y-1 text-[#7e7576]">
              <div className="flex justify-between">
                <span>Ara Toplam</span>
                <span>₺{order?.subtotal.toLocaleString('tr-TR')}</span>
              </div>
              {(order?.discount ?? 0) > 0 && (
                <div className="flex justify-between text-emerald-700">
                  <span>İndirim</span>
                  <span>-₺{order?.discount.toLocaleString('tr-TR')}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Kargo Bedeli</span>
                <span>
                  {order?.shippingFee === 0 ? 'ÜCRETSİZ' : `₺${order?.shippingFee}`}
                </span>
              </div>
              <div className="flex justify-between text-sm font-bold text-black pt-1 border-t border-[#eee7e2]">
                <span>Toplam Tutar</span>
                <span>₺{order?.total.toLocaleString('tr-TR')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-[#f4ece7]">
          <button
            onClick={() => navigateTo('/siparis-takip', order?.id)}
            className="flex-1 py-3 px-6 rounded-full bg-black text-white text-xs font-bold uppercase tracking-wider hover:bg-[#222] transition-colors flex items-center justify-center gap-2"
          >
            <Truck className="w-4 h-4 text-[#a9876d]" />
            <span>Kargoyu Takip Et</span>
          </button>
          <button
            onClick={handlePrint}
            className="py-3 px-6 rounded-full border border-[#dbcec2] text-xs font-semibold text-black hover:bg-[#f4ece7] transition-colors flex items-center justify-center gap-2"
          >
            <Printer className="w-4 h-4 text-[#765841]" />
            <span>Yazdır / İndir</span>
          </button>
          <button
            onClick={() => navigateTo('/magaza')}
            className="py-3 px-6 rounded-full bg-[#f4ece7] text-xs font-semibold text-black hover:bg-[#eee7e2] transition-colors"
          >
            Alışverişe Devam
          </button>
        </div>
      </div>
    </div>
  );
};
