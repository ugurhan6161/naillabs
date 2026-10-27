import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { ProductCategory, Product } from '../types';
import { Search, X, Check, Star, ArrowRight, Sparkles, Filter, SlidersHorizontal } from 'lucide-react';

export const StorePage: React.FC = () => {
  const { products, addToCart, navigateTo, user } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'popular'>('featured');

  const categories: { key: ProductCategory; label: string }[] = [
    { key: 'all', label: 'Tümü' },
    { key: 'kits', label: 'Eğitim Kitleri' },
    { key: 'bits', label: 'Freze Uçları' },
    { key: 'forms', label: 'Yedek Tırnak Formları' },
    { key: 'accessories', label: 'Aksesuarlar & Stantlar' },
  ];

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
        const matchesSearch =
          p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'popular') return b.reviewsCount - a.reviewsCount;
        return 0; // featured default
      });
  }, [products, selectedCategory, searchQuery, sortBy]);

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 border-b border-[#dbcec2] pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-[#765841] mb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#a9876d]"></span>
            <span>Katalog & Koleksiyon</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-normal text-black tracking-tight">
            Mağaza & Eğitim Ekipmanları
          </h1>
          <p className="text-sm text-[#4c4546] mt-1 max-w-xl">
            Sertifikalı akademiler ve usta manikür uzmanları için geliştirilmiş klinik donanım.
          </p>
        </div>

        <div className="text-xs text-[#765841] font-semibold bg-[#f4ece7] px-3.5 py-1.5 rounded-full border border-[#dbcec2]">
          {filteredProducts.length} Materyal Listelendi
        </div>
      </div>

      {/* Trainer Advantage Callout Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#fdd5b8]/50 via-[#faf2ed] to-[#f4ece7] border border-[#a9876d]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#765841] text-white flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5 text-[#fdd5b8]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#60432e]">
                Eğitmen Ayrıcalığı
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-white text-[#765841] font-bold">
                %15 İNDİRİM
              </span>
            </div>
            <p className="text-xs text-[#4c4546] mt-0.5">
              {user?.isTrainer
                ? 'Hesabınız onaylı eğitmen statüsündedir. Sepetinizde otomatik %15 indirim geçerlidir.'
                : 'Akademi eğitmenleri için özel sepet avantajları. Eğitmen modunu üst bardan anında açabilirsiniz.'}
            </p>
          </div>
        </div>
        <button
          onClick={() => navigateTo('/egitmen-portali')}
          className="text-xs font-semibold px-4 py-2 rounded-full bg-black text-white hover:bg-[#222] transition-colors shrink-0"
        >
          Akademi Portalı
        </button>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#7e7576]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Ürün adı, grit derecesi veya yedek parça ara..."
            className="w-full pl-10 pr-9 py-2.5 rounded-full bg-white border border-[#dbcec2] text-xs sm:text-sm focus:outline-none focus:border-black transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7e7576] hover:text-black"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Sorting Dropdown */}
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-[#765841]" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="text-xs bg-white border border-[#dbcec2] rounded-full px-4 py-2 text-[#1e1b18] focus:outline-none focus:border-black font-medium"
          >
            <option value="featured">Sıralama: Önerilen</option>
            <option value="popular">En Çok İncelenenler</option>
            <option value="price-asc">Fiyat: Düşükten Yükseğe</option>
            <option value="price-desc">Fiyat: Yüksekten Düşüğe</option>
          </select>
        </div>
      </div>

      {/* Category Filter Chips */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setSelectedCategory(cat.key)}
            className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCategory === cat.key
                ? 'bg-black text-white shadow-xs'
                : 'bg-white border border-[#dbcec2] text-[#4c4546] hover:bg-[#f4ece7]'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="py-16 text-center bg-white rounded-2xl border border-[#dbcec2]">
          <p className="text-base font-medium text-black">Aramanızla eşleşen ürün bulunamadı.</p>
          <p className="text-xs text-[#7e7576] mt-1">Lütfen farklı anahtar kelimeler deneyin.</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
            }}
            className="mt-4 px-5 py-2 rounded-full bg-black text-white text-xs font-semibold"
          >
            Filtreleri Temizle
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="rounded-2xl bg-white border border-[#dbcec2] overflow-hidden flex flex-col hover:border-[#a9876d] hover:shadow-md transition-all group"
            >
              {/* Product Image Stage */}
              <div
                onClick={() => navigateTo('/urun', product.slug)}
                className="h-64 bg-[#f4ece7] relative overflow-hidden cursor-pointer"
              >
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {product.badge && (
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/85 text-white text-[10px] font-bold uppercase tracking-wider">
                    {product.badge}
                  </span>
                )}
                {product.originalPrice && (
                  <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-[#ba1a1a] text-white text-[10px] font-bold">
                    %{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)} İndirim
                  </span>
                )}
              </div>

              {/* Product Info */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-[#765841] mb-1">
                    <Star className="w-3.5 h-3.5 fill-[#a9876d] text-[#a9876d]" />
                    <span className="font-bold">{product.rating}</span>
                    <span className="text-[#7e7576]">({product.reviewsCount} Değerlendirme)</span>
                  </div>

                  <h3
                    onClick={() => navigateTo('/urun', product.slug)}
                    className="text-base font-semibold text-black hover:text-[#765841] transition-colors cursor-pointer"
                  >
                    {product.title}
                  </h3>
                  <p className="text-xs text-[#7e7576] mt-1 line-clamp-2">
                    {product.subtitle}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#f4ece7] flex items-center justify-between">
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-lg font-bold text-black">
                        ₺{product.price.toLocaleString('tr-TR')}
                      </span>
                      {product.originalPrice && (
                        <span className="text-xs text-[#7e7576] line-through">
                          ₺{product.originalPrice.toLocaleString('tr-TR')}
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-emerald-700 font-semibold block">
                      Stokta Var ({product.stockCount} Adet)
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => navigateTo('/urun', product.slug)}
                      className="px-3 py-2 rounded-full border border-[#dbcec2] text-xs font-semibold text-black hover:bg-[#f4ece7] transition-colors"
                    >
                      Detay
                    </button>
                    <button
                      onClick={() => addToCart(product)}
                      className="px-4 py-2 rounded-full bg-black text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#222] transition-transform active:scale-95 shadow-xs"
                    >
                      Ekle
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
