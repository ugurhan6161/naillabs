import React from 'react';
import { useApp } from '../context/AppContext';
import { X, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

export const MiniCartDrawer: React.FC = () => {
  const {
    cart,
    isMiniCartOpen,
    setIsMiniCartOpen,
    removeFromCart,
    updateCartQuantity,
    cartSubtotal,
    cartDiscount,
    cartShipping,
    cartTotal,
    navigateTo,
    user,
  } = useApp();

  if (!isMiniCartOpen) return null;

  const freeShippingThreshold = 1000;
  const progressPercent = Math.min(100, (cartSubtotal / freeShippingThreshold) * 100);
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
        onClick={() => setIsMiniCartOpen(false)}
      />

      {/* Drawer content */}
      <div className="relative w-full max-w-md bg-[#fff8f4] h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-4 md:p-6 border-b border-[#dbcec2] flex items-center justify-between bg-[#fff8f4]">
          <div className="flex items-center gap-2">
            <span className="font-semibold tracking-wider text-base uppercase text-[#1e1b18]">
              Alışveriş Sepeti
            </span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-[#fdd5b8] text-[#765841] font-medium">
              {cart.reduce((n, i) => n + i.quantity, 0)} Ürün
            </span>
          </div>
          <button
            onClick={() => setIsMiniCartOpen(false)}
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#eee7e2] text-[#1e1b18] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Tracker */}
        <div className="px-6 py-3 bg-[#f4ece7] border-b border-[#dbcec2]">
          <div className="flex justify-between items-center text-xs mb-1.5 font-medium">
            <span className="text-[#60432e] flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-[#a9876d]" />
              {remainingForFreeShipping === 0 ? (
                <span className="text-emerald-700 font-semibold">Tebrikler! Ücretsiz kargo kazandınız.</span>
              ) : (
                <>
                  Ücretsiz kargoya <strong className="text-black font-semibold">₺{remainingForFreeShipping.toLocaleString('tr-TR')}</strong> kaldı
                </>
              )}
            </span>
            <span className="text-[#765841] font-semibold">{Math.round(progressPercent)}%</span>
          </div>
          <div className="w-full bg-[#dbcec2] h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-[#765841] h-full rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-[#7e7576]">
              <div className="w-16 h-16 rounded-full bg-[#f4ece7] flex items-center justify-center mb-3 text-[#a9876d]">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <p className="text-base font-medium text-[#1e1b18]">Sepetiniz boş</p>
              <p className="text-xs mt-1 text-[#7e7576]">
                Eğitim kitlerimizi ve elmas freze başlıklarımızı inceleyebilirsiniz.
              </p>
              <button
                onClick={() => {
                  setIsMiniCartOpen(false);
                  navigateTo('/magaza');
                }}
                className="mt-5 px-6 py-2.5 rounded-full bg-black text-white text-xs tracking-wider uppercase font-semibold hover:bg-[#222] transition-colors"
              >
                Mağazayı Gez
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="flex gap-3 p-3 rounded-xl bg-white border border-[#dbcec2] shadow-xs"
              >
                <img
                  src={item.product.thumbnail}
                  alt={item.product.title}
                  className="w-20 h-20 rounded-lg object-cover bg-[#f4ece7] shrink-0"
                />
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start gap-1">
                      <h4 className="text-sm font-semibold text-[#1e1b18] truncate">
                        {item.product.title}
                      </h4>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-[#7e7576] hover:text-[#ba1a1a] p-0.5"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    {item.selectedForm && (
                      <p className="text-[11px] text-[#765841] truncate mt-0.5">
                        Form: {item.selectedForm}
                      </p>
                    )}
                    {item.selectedGrit && (
                      <p className="text-[11px] text-[#7e7576] truncate">
                        Grit: {item.selectedGrit}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#f4ece7]">
                    <div className="flex items-center rounded-full bg-[#f4ece7] p-0.5">
                      <button
                        onClick={() => updateCartQuantity(item.id, -1)}
                        className="w-6 h-6 rounded-full flex items-center justify-center text-xs hover:bg-white transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-7 text-center text-xs font-semibold">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateCartQuantity(item.id, 1)}
                        className="w-6 h-6 rounded-full flex items-center justify-center text-xs hover:bg-white transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <span className="text-sm font-semibold text-[#1e1b18]">
                      ₺{(item.product.price * item.quantity).toLocaleString('tr-TR')}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Summary */}
        {cart.length > 0 && (
          <div className="p-4 md:p-6 bg-white border-t border-[#dbcec2] space-y-3">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-[#7e7576]">
                <span>Ara Toplam</span>
                <span>₺{cartSubtotal.toLocaleString('tr-TR')}</span>
              </div>
              {cartDiscount > 0 && (
                <div className="flex justify-between text-emerald-700 font-medium">
                  <span>
                    İndirim {user?.isTrainer ? '(Onaylı Eğitmen %15)' : ''}
                  </span>
                  <span>-₺{cartDiscount.toLocaleString('tr-TR')}</span>
                </div>
              )}
              <div className="flex justify-between text-[#7e7576]">
                <span>Kargo</span>
                <span>
                  {cartShipping === 0 ? (
                    <span className="text-emerald-700 font-semibold">ÜCRETSİZ</span>
                  ) : (
                    `₺${cartShipping}`
                  )}
                </span>
              </div>
              <div className="flex justify-between text-base font-bold text-[#1e1b18] pt-2 border-t border-[#eee7e2]">
                <span>Genel Toplam</span>
                <span>₺{cartTotal.toLocaleString('tr-TR')}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                onClick={() => {
                  setIsMiniCartOpen(false);
                  navigateTo('/sepet');
                }}
                className="w-full py-3 px-4 rounded-full border border-black text-black font-semibold text-xs tracking-wider uppercase hover:bg-[#f4ece7] transition-colors"
              >
                Sepete Git
              </button>
              <button
                onClick={() => {
                  setIsMiniCartOpen(false);
                  navigateTo('/odeme');
                }}
                className="w-full py-3 px-4 rounded-full bg-black text-white font-semibold text-xs tracking-wider uppercase hover:bg-[#222] transition-colors flex items-center justify-center gap-1 shadow-md"
              >
                <span>Ödemeye Geç</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
