import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Star,
  ShieldCheck,
  Flame,
  Truck,
  Plus,
  Minus,
  Check,
  Sparkles,
  ArrowLeft,
  Share2,
} from 'lucide-react';

export const ProductDetailPage: React.FC = () => {
  const { products, routeParam, addToCart, navigateTo, showToast } = useApp();

  const product = products.find((p) => p.slug === routeParam) || products[0];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedForm, setSelectedForm] = useState(product.formsAvailable?.[0] || 'Standart');
  const [selectedGrit, setSelectedGrit] = useState(product.gritOptions?.[0] || 'Standart');
  const [quantity, setQuantity] = useState(1);

  const handleShare = () => {
    navigator.clipboard?.writeText?.(window.location.href);
    showToast('Ürün bağlantısı panoya kopyalandı.');
  };

  const handleDirectBuy = () => {
    addToCart(product, quantity, selectedForm, selectedGrit);
    navigateTo('/odeme');
  };

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      {/* Back button */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigateTo('/magaza')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#765841] hover:text-black transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Mağazaya Dön</span>
        </button>

        <button
          onClick={handleShare}
          className="inline-flex items-center gap-1.5 text-xs text-[#7e7576] hover:text-black transition-colors"
        >
          <Share2 className="w-4 h-4" />
          <span>Paylaş</span>
        </button>
      </div>

      {/* Main Product Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
        {/* Left Column: Image Gallery */}
        <div className="space-y-4">
          <div className="w-full aspect-square bg-[#f4ece7] rounded-3xl overflow-hidden border border-[#dbcec2] relative flex items-center justify-center p-4">
            <img
              src={product.images[activeImageIndex] || product.thumbnail}
              alt={product.title}
              className="w-full h-full object-cover rounded-2xl hover:scale-105 transition-transform duration-300"
            />
            {product.badge && (
              <span className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full bg-black/90 text-white text-[11px] font-bold uppercase tracking-wider">
                {product.badge}
              </span>
            )}
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-1">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                    activeImageIndex === idx ? 'border-black scale-95' : 'border-[#dbcec2] opacity-70'
                  }`}
                >
                  <img src={img} alt={`Görsel ${idx}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Product Config & Buy Box */}
        <div className="space-y-6">
          {/* Rating & Title */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="flex items-center gap-1 text-[#a9876d]">
                <Star className="w-4 h-4 fill-[#a9876d]" />
                <span className="text-xs font-bold text-black">{product.rating}</span>
              </div>
              <span className="text-xs text-[#7e7576]">({product.reviewsCount} Doğrulanmış Eğitmen Yorumu)</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-semibold text-black tracking-tight">
              {product.title}
            </h1>
            <p className="text-sm text-[#765841] font-medium mt-1">
              {product.subtitle}
            </p>
          </div>

          {/* Price */}
          <div className="p-4 rounded-2xl bg-[#faf2ed] border border-[#dbcec2] flex items-baseline justify-between">
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-black">
                ₺{product.price.toLocaleString('tr-TR')}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-[#7e7576] line-through">
                  ₺{product.originalPrice.toLocaleString('tr-TR')}
                </span>
              )}
            </div>
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              KDV Dahil
            </span>
          </div>

          {/* Description */}
          <p className="text-sm text-[#4c4546] leading-relaxed">
            {product.description}
          </p>

          {/* Form Selection Chips */}
          {product.formsAvailable && product.formsAvailable.length > 0 && (
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[#765841] block">
                Tırnak Formu Seçimi: <span className="text-black font-semibold">{selectedForm}</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {product.formsAvailable.map((form) => (
                  <button
                    key={form}
                    onClick={() => setSelectedForm(form)}
                    className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
                      selectedForm === form
                        ? 'bg-black text-white shadow-xs'
                        : 'bg-white border border-[#dbcec2] text-[#1e1b18] hover:bg-[#f4ece7]'
                    }`}
                  >
                    {form}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Grit Selection Chips */}
          {product.gritOptions && product.gritOptions.length > 0 && (
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[#765841] block">
                Yüzey / Grit Seçimi: <span className="text-black font-semibold">{selectedGrit}</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {product.gritOptions.map((grit) => (
                  <button
                    key={grit}
                    onClick={() => setSelectedGrit(grit)}
                    className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
                      selectedGrit === grit
                        ? 'bg-black text-white shadow-xs'
                        : 'bg-white border border-[#dbcec2] text-[#1e1b18] hover:bg-[#f4ece7]'
                    }`}
                  >
                    {grit}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity and Actions */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-4">
              <div className="flex items-center rounded-full bg-[#f4ece7] border border-[#dbcec2] p-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white text-black transition-colors"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-10 text-center text-sm font-bold text-black">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white text-black transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              <button
                onClick={() => addToCart(product, quantity, selectedForm, selectedGrit)}
                className="flex-1 h-12 rounded-full bg-black text-white text-xs font-bold uppercase tracking-wider hover:bg-[#222] transition-transform active:scale-95 shadow-md flex items-center justify-center gap-2"
              >
                <span>Sepete Ekle</span>
                <span className="text-[#a9876d] font-normal">•</span>
                <span>₺{(product.price * quantity).toLocaleString('tr-TR')}</span>
              </button>
            </div>

            <button
              onClick={handleDirectBuy}
              className="w-full h-12 rounded-full bg-[#fdd5b8] text-[#60432e] text-xs font-bold uppercase tracking-wider hover:bg-[#ffdcc3] transition-colors border border-[#a9876d]/30"
            >
              Hemen Satın Al (Tek Adımda Ödeme)
            </button>
          </div>

          {/* Trust points */}
          <div className="grid grid-cols-3 gap-2 pt-4 border-t border-[#dbcec2] text-center">
            <div className="p-3 rounded-xl bg-white border border-[#dbcec2]">
              <Flame className="w-4 h-4 text-[#a9876d] mx-auto mb-1" />
              <span className="text-[10px] font-bold text-black uppercase block">134°C Otoklav</span>
              <span className="text-[9px] text-[#7e7576]">Steril edilebilir</span>
            </div>
            <div className="p-3 rounded-xl bg-white border border-[#dbcec2]">
              <ShieldCheck className="w-4 h-4 text-[#a9876d] mx-auto mb-1" />
              <span className="text-[10px] font-bold text-black uppercase block">2 Yıl Garanti</span>
              <span className="text-[9px] text-[#7e7576]">Orijinal üretim</span>
            </div>
            <div className="p-3 rounded-xl bg-white border border-[#dbcec2]">
              <Truck className="w-4 h-4 text-[#a9876d] mx-auto mb-1" />
              <span className="text-[10px] font-bold text-black uppercase block">Hızlı Kargo</span>
              <span className="text-[9px] text-[#7e7576]">Aynı gün sevk</span>
            </div>
          </div>
        </div>
      </div>

      {/* Technical Specs Table */}
      <div className="pt-8 border-t border-[#dbcec2]">
        <h3 className="text-xl font-normal text-black mb-6">Klinik & Teknik Özellikler</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-white border border-[#dbcec2] flex justify-between">
            <span className="text-xs font-semibold text-[#765841]">Malzeme Yapısı</span>
            <span className="text-xs text-black text-right max-w-xs">{product.specs.material}</span>
          </div>
          <div className="p-4 rounded-xl bg-white border border-[#dbcec2] flex justify-between">
            <span className="text-xs font-semibold text-[#765841]">Ölçek & Oran</span>
            <span className="text-xs text-black text-right">{product.specs.scale}</span>
          </div>
          <div className="p-4 rounded-xl bg-white border border-[#dbcec2] flex justify-between">
            <span className="text-xs font-semibold text-[#765841]">Freze Uyumluluğu</span>
            <span className="text-xs text-black text-right">{product.specs.compatibility}</span>
          </div>
          <div className="p-4 rounded-xl bg-white border border-[#dbcec2] flex justify-between">
            <span className="text-xs font-semibold text-[#765841]">Sterilizasyon</span>
            <span className="text-xs text-black text-right">{product.specs.autoclave}</span>
          </div>
          <div className="p-4 rounded-xl bg-white border border-[#dbcec2] flex justify-between md:col-span-2">
            <span className="text-xs font-semibold text-[#765841]">Kutu İçeriği</span>
            <span className="text-xs text-black text-right">{product.specs.boxContent}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
