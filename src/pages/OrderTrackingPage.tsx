import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Order } from '../types';
import { Search, Package, Truck, CheckCircle2, Clock, AlertCircle } from 'lucide-react';

export const OrderTrackingPage: React.FC = () => {
  const { orders, routeParam } = useApp();
  const [searchInput, setSearchInput] = useState(routeParam || 'NLB-84920');
  const [searchedOrder, setSearchedOrder] = useState<Order | null>(() => {
    return (
      (routeParam && orders.find((o) => o.id.toLowerCase() === routeParam.toLowerCase())) ||
      orders[0] ||
      null
    );
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = searchInput.trim().toUpperCase();
    const found = orders.find(
      (o) =>
        o.id.toUpperCase() === clean ||
        o.customer.phone.includes(clean) ||
        o.customer.email.toLowerCase() === searchInput.trim().toLowerCase()
    );
    setSearchedOrder(found || null);
  };

  const steps = [
    { key: 'alindi', label: 'Sipariş Alındı', icon: CheckCircle2 },
    { key: 'hazirlaniyor', label: 'Hazırlanıyor', icon: Clock },
    { key: 'kargolandi', label: 'Kargoya Verildi', icon: Truck },
    { key: 'teslim_edildi', label: 'Teslim Edildi', icon: Package },
  ];

  const getStepStatus = (stepIndex: number, currentStatus?: string) => {
    const statusMap: Record<string, number> = {
      alindi: 0,
      hazirlaniyor: 1,
      kargolandi: 2,
      teslim_edildi: 3,
    };
    const currentIndex = statusMap[currentStatus || 'hazirlaniyor'] ?? 1;
    if (stepIndex < currentIndex) return 'completed';
    if (stepIndex === currentIndex) return 'current';
    return 'pending';
  };

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8">
      {/* Title */}
      <div className="text-center space-y-2">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#765841]">
          Canlı Kargo Takibi
        </span>
        <h1 className="text-3xl sm:text-4xl font-normal text-black tracking-tight">
          Sipariş ve Teslimat Takibi
        </h1>
        <p className="text-xs sm:text-sm text-[#4c4546] max-w-md mx-auto">
          Sipariş referans kodunuz (örn. NLB-84920) veya telefon numaranız ile anlık kargo
          hareketlerini sorgulayabilirsiniz.
        </p>
      </div>

      {/* Search Input Box */}
      <form
        onSubmit={handleSearch}
        className="max-w-xl mx-auto flex items-center gap-2 p-1.5 rounded-full bg-white border border-[#dbcec2] shadow-sm"
      >
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-[#7e7576]" />
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Sipariş No (örn: NLB-84920)"
            className="w-full pl-11 pr-4 py-2.5 rounded-full text-xs sm:text-sm text-black focus:outline-none uppercase"
          />
        </div>
        <button
          type="submit"
          className="px-6 py-2.5 rounded-full bg-black text-white text-xs font-bold uppercase tracking-wider hover:bg-[#222] transition-colors"
        >
          Sorgula
        </button>
      </form>

      {/* Search Result */}
      {searchedOrder ? (
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#dbcec2] shadow-sm space-y-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-[#f4ece7] pb-4">
            <div>
              <span className="text-[11px] text-[#7e7576]">Sipariş Referansı</span>
              <h2 className="text-xl font-bold font-mono text-black">{searchedOrder.id}</h2>
            </div>
            <div className="sm:text-right">
              <span className="text-[11px] text-[#7e7576] block">Taşıyıcı ve Takip Kodu</span>
              <span className="text-xs font-semibold text-[#765841]">
                {searchedOrder.shippingCarrier} • {searchedOrder.trackingNumber}
              </span>
            </div>
          </div>

          {/* Stepper */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 relative">
            {steps.map((st, idx) => {
              const status = getStepStatus(idx, searchedOrder.status);
              const Icon = st.icon;
              return (
                <div
                  key={st.key}
                  className={`p-4 rounded-2xl flex flex-col items-center text-center transition-all ${
                    status === 'completed'
                      ? 'bg-emerald-50 border border-emerald-200 text-emerald-800'
                      : status === 'current'
                      ? 'bg-[#faf2ed] border-2 border-[#a9876d] text-black shadow-xs'
                      : 'bg-[#f4ece7] opacity-50 text-[#7e7576]'
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                      status === 'completed'
                        ? 'bg-emerald-600 text-white'
                        : status === 'current'
                        ? 'bg-black text-white'
                        : 'bg-[#dbcec2] text-white'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold">{st.label}</span>
                  <span className="text-[10px] mt-0.5">
                    {status === 'completed' ? 'Tamamlandı' : status === 'current' ? 'İşleniyor' : 'Bekleniyor'}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Shipment details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-[#f4ece7] text-xs">
            <div>
              <h4 className="font-semibold text-black mb-1">Teslimat Bilgisi</h4>
              <p className="text-[#4c4546] leading-relaxed">
                <strong>Alıcı:</strong> {searchedOrder.customer.fullName}
                <br />
                <strong>Adres:</strong> {searchedOrder.customer.address},{' '}
                {searchedOrder.customer.district} / {searchedOrder.customer.city}
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-black mb-1">Paket İçeriği</h4>
              <ul className="space-y-1 text-[#4c4546]">
                {searchedOrder.items.map((it, idx) => (
                  <li key={idx} className="flex justify-between">
                    <span>
                      {it.quantity}x {it.product.title}
                    </span>
                    <span className="font-semibold">
                      ₺{(it.product.price * it.quantity).toLocaleString('tr-TR')}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <div className="py-12 text-center bg-white rounded-3xl border border-[#dbcec2] p-6 space-y-3">
          <AlertCircle className="w-10 h-10 text-[#ba1a1a] mx-auto" />
          <h3 className="text-base font-semibold text-black">Sipariş Bulunamadı</h3>
          <p className="text-xs text-[#7e7576] max-w-sm mx-auto">
            Girdiğiniz sipariş kodunu kontrol edip tekrar deneyebilirsiniz. Örnek: NLB-84920
          </p>
        </div>
      )}
    </div>
  );
};
