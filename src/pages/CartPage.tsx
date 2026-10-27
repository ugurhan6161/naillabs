import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Trash2, Plus, Minus, ArrowRight, ArrowLeft, Tag, Sparkles, ShieldCheck } from 'lucide-react';

export const CartPage: React.FC = () => {
  const {
    cart,
    removeFromCart,
    updateCartQuantity,
    cartSubtotal,
    cartDiscount,
    cartShipping,
    cartTotal,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    navigateTo,
    user,
  } = useApp();

  const [couponInput, setCouponInput] = useState('');

  const freeShippingThreshold = 1000;
  const progressPercent = Math.min(100, (cartSubtotal / freeShippingThreshold) * 100);
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponInput.trim()) {
      applyCoupon(couponInput);
      setCouponInput('');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="py-20 px-4 max-w-xl mx-auto text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-[#f4ece7] text-[#a9876d] flex items-center justify-center mx-auto">
          <ShieldCheck className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-semibold text-black">Alışveriş Sepetiniz Boş</h1>
        <p className="text-sm text-[#7e7576]">
          Sepetinizde henüz bir eğitim ekipmanı bulunmamaktadır.
        </p>
        <button
          onClick={() => navigateTo('/magaza')}
          className="mt-4 px-8 py-3 rounded-full bg-black text-white text-xs font-bold uppercase tracking-wider hover:bg-[#222]"
        >
          Mağazaya Git
        </button>
      </div>
    );
  }

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#dbcec2] pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-black">Alışveriş Sepeti</h1>
          <p className="text-xs text-[#765841] mt-0.5">
            {cart.reduce((sum, item) => sum + item.quantity, 0)} Adet Ürün
          </p>
        </div>
        <button
          onClick={() => navigateTo('/magaza')}
          className="text-xs font-semibold text-[#765841] hover:text-black flex items-center gap-1"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Alışverişe Devam Et</span>
        </button>
      </div>

      {/* Free Shipping Tracker */}
      <div className="p-4 rounded-2xl bg-white border border-[#dbcec2] shadow-xs">
        <div className="flex justify-between items-center text-xs mb-2">
          <span className="font-semibold text-[#60432e] flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-[#a9876d]" />
            {remainingForFreeShipping === 0 ? (
              <span className="text-emerald-700">Ücretsiz sigortalı kargo kazandınız!</span>
            ) : (
              <>
                Ücretsiz kargoya <strong className="text-black">₺{remainingForFreeShipping.toLocaleString('tr-TR')}</strong> kaldı
              </>
            )}
          </span>
          <span className="font-bold text-[#765841]">{Math.round(progressPercent)}%</span>
        </div>
        <div className="w-full bg-[#f4ece7] h-2 rounded-full overflow-hidden">
          <div
            className="bg-[#765841] h-full rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left items table */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="p-4 sm:p-5 rounded-2xl bg-white border border-[#dbcec2] flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between shadow-xs"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.product.thumbnail}
                  alt={item.product.title}
                  className="w-20 h-20 rounded-xl object-cover bg-[#f4ece7] shrink-0"
                />
                <div>
                  <h3 className="text-sm font-semibold text-black">{item.product.title}</h3>
                  {item.selectedForm && (
                    <p className="text-xs text-[#765841] mt-0.5">Form: {item.selectedForm}</p>
                  )}
                  {item.selectedGrit && (
                    <p className="text-xs text-[#7e7576]">Grit: {item.selectedGrit}</p>
                  )}
                  <div className="text-xs font-bold text-black mt-1 sm:hidden">
                    ₺{(item.product.price * item.quantity).toLocaleString('tr-TR')}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between w-full sm:w-auto gap-6 pt-2 sm:pt-0 border-t sm:border-0 border-[#f4ece7]">
                {/* Quantity */}
                <div className="flex items-center rounded-full bg-[#f4ece7] p-1 border border-[#dbcec2]">
                  <button
                    onClick={() => updateCartQuantity(item.id, -1)}
                    className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-white text-black transition-colors"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-8 text-center text-xs font-bold text-black">{item.quantity}</span>
                  <button
                    onClick={() => updateCartQuantity(item.id, 1)}
                    className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-white text-black transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Subtotal */}
                <span className="hidden sm:inline-block text-base font-bold text-black w-24 text-right">
                  ₺{(item.product.price * item.quantity).toLocaleString('tr-TR')}
                </span>

                {/* Remove */}
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="p-2 text-[#7e7576] hover:text-[#ba1a1a] transition-colors"
                  title="Sil"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}

          {/* Coupon Code Input */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#dbcec2] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#765841]">
              <Tag className="w-4 h-4 text-[#a9876d]" />
              <span>İndirim Kuponu / Eğitmen Kodu</span>
            </div>

            {appliedCoupon ? (
              <div className="flex items-center gap-2">
                <span className="text-xs px-3 py-1.5 rounded-full bg-[#fdd5b8] text-[#765841] font-bold">
                  {appliedCoupon} Aktif
                </span>
                <button
                  onClick={removeCoupon}
                  className="text-xs text-[#ba1a1a] hover:underline"
                >
                  Kaldır
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplyCoupon} className="flex gap-2 w-full sm:w-auto">
                <input
                  type="text"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  placeholder="Kupon Kodu (Örn: EGITMEN15)"
                  className="px-4 py-2 rounded-full border border-[#dbcec2] text-xs focus:outline-none focus:border-black uppercase w-full sm:w-56"
                />
                <button
                  type="submit"
                  className="px-5 py-2 rounded-full bg-black text-white text-xs font-semibold hover:bg-[#222]"
                >
                  Uygula
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Right Summary Box */}
        <div className="space-y-4">
          <div className="p-6 rounded-2xl bg-white border border-[#dbcec2] space-y-4 shadow-xs">
            <h3 className="text-base font-semibold text-black border-b border-[#f4ece7] pb-3">
              Sipariş Özeti
            </h3>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-[#7e7576]">
                <span>Ürünler Toplamı</span>
                <span>₺{cartSubtotal.toLocaleString('tr-TR')}</span>
              </div>
              {cartDiscount > 0 && (
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>
                    İndirim {user?.isTrainer ? '(Onaylı Eğitmen %15)' : ''}
                  </span>
                  <span>-₺{cartDiscount.toLocaleString('tr-TR')}</span>
                </div>
              )}
              <div className="flex justify-between text-[#7e7576]">
                <span>Kargo Bedeli</span>
                <span>
                  {cartShipping === 0 ? (
                    <span className="text-emerald-700 font-semibold">ÜCRETSİZ</span>
                  ) : (
                    `₺${cartShipping}`
                  )}
                </span>
              </div>
              <div className="flex justify-between text-lg font-bold text-black pt-3 border-t border-[#f4ece7]">
                <span>Ödenecek Tutar</span>
                <span>₺{cartTotal.toLocaleString('tr-TR')}</span>
              </div>
            </div>

            <button
              onClick={() => navigateTo('/odeme')}
              className="w-full py-3.5 rounded-full bg-black text-white text-xs font-bold uppercase tracking-wider hover:bg-[#222] transition-colors flex items-center justify-center gap-2 shadow-md"
            >
              <span>Tek Adımda Ödemeye Geç</span>
              <ArrowRight className="w-4 h-4 text-[#a9876d]" />
            </button>

            <div className="text-[11px] text-[#7e7576] text-center pt-2">
              🔒 256-Bit SSL ile güvenli ödeme garantisi
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
