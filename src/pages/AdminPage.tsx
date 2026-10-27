import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Product } from '../types';
import {
  DollarSign,
  Package,
  ShoppingCart,
  Users,
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  AlertTriangle,
  X,
} from 'lucide-react';

export const AdminPage: React.FC = () => {
  const {
    products,
    orders,
    updateOrderStatus,
    updateProductStock,
    updateProductPrice,
    addProduct,
    showToast,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'orders'>('overview');
  const [newProductModal, setNewProductModal] = useState(false);

  // New product form
  const [newTitle, setNewTitle] = useState('');
  const [newSubtitle, setNewSubtitle] = useState('');
  const [newPrice, setNewPrice] = useState('750');
  const [newCategory, setNewCategory] = useState<'kits' | 'bits' | 'forms' | 'accessories'>('bits');
  const [newStock, setNewStock] = useState('25');

  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const totalOrdersCount = orders.length;
  const activeProductsCount = products.filter((p) => p.inStock).length;

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const id = `prod-${Date.now()}`;
    const slug = newTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    const created: Product = {
      id,
      slug,
      title: newTitle,
      subtitle: newSubtitle || 'Klinik kalitede profesyonel donanım',
      price: parseFloat(newPrice) || 500,
      category: newCategory,
      badge: 'Yeni Eklenen',
      rating: 5.0,
      reviewsCount: 1,
      inStock: true,
      stockCount: parseInt(newStock) || 20,
      description: newSubtitle || 'NAILAB atölye standartlarında üretilmiş ekipman.',
      features: ['Klinik seviye dayanıklılık', 'Otoklavlanabilir malzeme', 'Ergonomik kullanım'],
      specs: {
        material: 'Cerrahi Standart Malzeme',
        scale: 'Standart',
        compatibility: 'Tüm sistemler',
        autoclave: '134°C dayanımlı',
        boxContent: '1 Adet Orijinal Ekipman',
      },
      images: [
        'https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=800&q=80',
      ],
      thumbnail:
        'https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=800&q=80',
    };

    addProduct(created);
    setNewProductModal(false);
    setNewTitle('');
    setNewSubtitle('');
  };

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      {/* Admin Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#dbcec2] pb-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#765841]">
            Yönetim Konsolu
          </span>
          <h1 className="text-3xl font-semibold text-black">NAILAB Admin Dashboard</h1>
          <p className="text-xs text-[#7e7576] mt-0.5">
            Sipariş yönetimi, stok takibi ve katalog güncelleme paneli.
          </p>
        </div>

        <button
          onClick={() => setNewProductModal(true)}
          className="px-5 py-2.5 rounded-full bg-black text-white text-xs font-bold uppercase tracking-wider hover:bg-[#222] transition-colors flex items-center gap-2 shadow-xs"
        >
          <Plus className="w-4 h-4 text-[#a9876d]" />
          <span>Yeni Ürün Ekle</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-[#dbcec2] pb-1">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
            activeTab === 'overview' ? 'bg-black text-white' : 'text-[#4c4546] hover:bg-[#f4ece7]'
          }`}
        >
          Genel Bakış & Metrikler
        </button>
        <button
          onClick={() => setActiveTab('orders')}
          className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
            activeTab === 'orders' ? 'bg-black text-white' : 'text-[#4c4546] hover:bg-[#f4ece7]'
          }`}
        >
          Siparişler ({orders.length})
        </button>
        <button
          onClick={() => setActiveTab('products')}
          className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
            activeTab === 'products' ? 'bg-black text-white' : 'text-[#4c4546] hover:bg-[#f4ece7]'
          }`}
        >
          Ürünler & Stok ({products.length})
        </button>
      </div>

      {/* OVERVIEW TAB */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          {/* Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-[#dbcec2] shadow-xs space-y-2">
              <div className="flex justify-between items-center text-[#7e7576]">
                <span className="text-xs font-bold uppercase tracking-wider">Toplam Gelir</span>
                <DollarSign className="w-4 h-4 text-[#765841]" />
              </div>
              <h3 className="text-2xl font-bold text-black">
                ₺{totalRevenue.toLocaleString('tr-TR')}
              </h3>
              <p className="text-[11px] text-emerald-700 font-semibold">Tüm onaylanan siparişler</p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#dbcec2] shadow-xs space-y-2">
              <div className="flex justify-between items-center text-[#7e7576]">
                <span className="text-xs font-bold uppercase tracking-wider">İşlem Gören Sipariş</span>
                <ShoppingCart className="w-4 h-4 text-[#765841]" />
              </div>
              <h3 className="text-2xl font-bold text-black">{totalOrdersCount}</h3>
              <p className="text-[11px] text-[#765841]">
                {orders.filter((o) => o.status === 'hazirlaniyor').length} adet paketleniyor
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#dbcec2] shadow-xs space-y-2">
              <div className="flex justify-between items-center text-[#7e7576]">
                <span className="text-xs font-bold uppercase tracking-wider">Aktif Stoklu Ürün</span>
                <Package className="w-4 h-4 text-[#765841]" />
              </div>
              <h3 className="text-2xl font-bold text-black">{activeProductsCount}</h3>
              <p className="text-[11px] text-emerald-700 font-semibold">Katalog yayında</p>
            </div>
          </div>

          {/* Recent Orders Preview */}
          <div className="p-6 rounded-3xl bg-white border border-[#dbcec2] shadow-xs space-y-4">
            <h3 className="text-base font-semibold text-black">Son Alınan Siparişler</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#f4ece7] text-[#765841] font-semibold uppercase text-[10px]">
                    <th className="pb-3">Sipariş ID</th>
                    <th className="pb-3">Müşteri</th>
                    <th className="pb-3">Tarih</th>
                    <th className="pb-3">Tutar</th>
                    <th className="pb-3">Durum</th>
                    <th className="pb-3 text-right">İşlem</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#f4ece7]">
                  {orders.map((ord) => (
                    <tr key={ord.id} className="hover:bg-[#fff8f4]">
                      <td className="py-3 font-mono font-bold">{ord.id}</td>
                      <td className="py-3">
                        <span className="font-semibold block">{ord.customer.fullName}</span>
                        <span className="text-[#7e7576] text-[10px]">{ord.customer.city}</span>
                      </td>
                      <td className="py-3 text-[#7e7576]">{ord.date}</td>
                      <td className="py-3 font-bold">₺{ord.total.toLocaleString('tr-TR')}</td>
                      <td className="py-3">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            ord.status === 'teslim_edildi'
                              ? 'bg-emerald-100 text-emerald-800'
                              : ord.status === 'kargolandi'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {ord.status}
                        </span>
                      </td>
                      <td className="py-3 text-right">
                        <select
                          value={ord.status}
                          onChange={(e) => updateOrderStatus(ord.id, e.target.value as any)}
                          className="bg-white border border-[#dbcec2] rounded-md px-2 py-1 text-[11px]"
                        >
                          <option value="hazirlaniyor">Hazırlanıyor</option>
                          <option value="kargolandi">Kargolandı</option>
                          <option value="teslim_edildi">Teslim Edildi</option>
                          <option value="iptal">İptal</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ORDERS TAB */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          {orders.map((ord) => (
            <div
              key={ord.id}
              className="p-6 rounded-2xl bg-white border border-[#dbcec2] shadow-xs space-y-4"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-[#f4ece7] pb-3 text-xs">
                <div>
                  <span className="font-mono font-bold text-sm text-black">{ord.id}</span> •{' '}
                  <span className="text-[#7e7576]">{ord.date}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-bold text-black text-sm">
                    ₺{ord.total.toLocaleString('tr-TR')}
                  </span>
                  <select
                    value={ord.status}
                    onChange={(e) => updateOrderStatus(ord.id, e.target.value as any)}
                    className="bg-[#faf2ed] border border-[#dbcec2] rounded-full px-3 py-1 font-semibold text-xs"
                  >
                    <option value="hazirlaniyor">Durum: Hazırlanıyor</option>
                    <option value="kargolandi">Durum: Kargolandı</option>
                    <option value="teslim_edildi">Durum: Teslim Edildi</option>
                    <option value="iptal">Durum: İptal</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <p className="font-semibold text-black">Müşteri Detayları:</p>
                  <p className="text-[#4c4546]">
                    {ord.customer.fullName} ({ord.customer.phone})
                    <br />
                    {ord.customer.email}
                    <br />
                    {ord.customer.address}, {ord.customer.district} / {ord.customer.city}
                    {ord.customer.isCorporate && (
                      <span className="block text-[11px] text-[#765841] font-semibold mt-1">
                        Kurumsal Fatura: {ord.customer.companyName} (VKN: {ord.customer.taxNumber})
                      </span>
                    )}
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-black">Paket:</p>
                  <ul className="space-y-1 text-[#4c4546]">
                    {ord.items.map((it, idx) => (
                      <li key={idx}>
                        • {it.quantity}x {it.product.title} (₺{it.product.price * it.quantity})
                      </li>
                    ))}
                  </ul>
                  <p className="text-[11px] text-[#7e7576] mt-2">
                    Kargo: {ord.shippingCarrier} • Takip: {ord.trackingNumber}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* PRODUCTS TAB */}
      {activeTab === 'products' && (
        <div className="p-6 rounded-3xl bg-white border border-[#dbcec2] shadow-xs space-y-4">
          <div className="flex justify-between items-center pb-2">
            <h3 className="text-base font-semibold text-black">Mevcut Ürün Kataloğu ve Stoklar</h3>
            <span className="text-xs text-[#765841] font-semibold">
              Değişiklikler anında canlı mağazaya yansır
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#f4ece7] text-[#765841] font-semibold uppercase text-[10px]">
                  <th className="pb-3">Görsel</th>
                  <th className="pb-3">Ürün Başlığı</th>
                  <th className="pb-3">Kategori</th>
                  <th className="pb-3">Fiyat (TL)</th>
                  <th className="pb-3">Stok Adedi</th>
                  <th className="pb-3">Durum</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f4ece7]">
                {products.map((p) => (
                  <tr key={p.id} className="hover:bg-[#fff8f4]">
                    <td className="py-3">
                      <img
                        src={p.thumbnail}
                        alt={p.title}
                        className="w-10 h-10 rounded-lg object-cover bg-[#f4ece7]"
                      />
                    </td>
                    <td className="py-3">
                      <span className="font-semibold text-black block">{p.title}</span>
                      <span className="text-[10px] text-[#7e7576]">{p.subtitle}</span>
                    </td>
                    <td className="py-3 uppercase text-[10px] font-semibold text-[#765841]">
                      {p.category}
                    </td>
                    <td className="py-3">
                      <input
                        type="number"
                        value={p.price}
                        onChange={(e) => updateProductPrice(p.id, parseFloat(e.target.value) || 0)}
                        className="w-20 px-2 py-1 rounded border border-[#dbcec2] text-xs font-bold"
                      />
                    </td>
                    <td className="py-3">
                      <input
                        type="number"
                        value={p.stockCount}
                        onChange={(e) => updateProductStock(p.id, parseInt(e.target.value) || 0)}
                        className="w-16 px-2 py-1 rounded border border-[#dbcec2] text-xs font-semibold"
                      />
                    </td>
                    <td className="py-3">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          p.inStock
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {p.inStock ? 'Yayında' : 'Tükendi'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* New Product Modal */}
      {newProductModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-[#dbcec2]">
            <div className="flex justify-between items-center border-b border-[#f4ece7] pb-3">
              <h3 className="text-lg font-bold text-black">Yeni Ekipman / Ürün Ekle</h3>
              <button onClick={() => setNewProductModal(false)} className="text-[#7e7576] hover:text-black">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateProduct} className="space-y-4 text-xs">
              <div>
                <label className="font-semibold text-[#765841] block mb-1">Ürün Başlığı *</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Örn: NAILAB 3'lü Titanyum Freze Ucu"
                  className="w-full px-3 py-2 rounded-xl border border-[#dbcec2] text-xs"
                />
              </div>

              <div>
                <label className="font-semibold text-[#765841] block mb-1">Alt Açıklama</label>
                <input
                  type="text"
                  value={newSubtitle}
                  onChange={(e) => setNewSubtitle(e.target.value)}
                  placeholder="Örn: Rus manikürü hassas açma başlığı"
                  className="w-full px-3 py-2 rounded-xl border border-[#dbcec2] text-xs"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="font-semibold text-[#765841] block mb-1">Fiyat (TL) *</label>
                  <input
                    type="number"
                    required
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[#dbcec2] text-xs font-bold"
                  />
                </div>
                <div>
                  <label className="font-semibold text-[#765841] block mb-1">Kategori</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-[#dbcec2] text-xs"
                  >
                    <option value="kits">Kitler</option>
                    <option value="bits">Frezeler</option>
                    <option value="forms">Formlar</option>
                    <option value="accessories">Aksesuar</option>
                  </select>
                </div>
                <div>
                  <label className="font-semibold text-[#765841] block mb-1">Stok Adedi</label>
                  <input
                    type="number"
                    required
                    value={newStock}
                    onChange={(e) => setNewStock(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[#dbcec2] text-xs"
                  />
                </div>
              </div>

              <div className="pt-4 flex gap-2">
                <button
                  type="button"
                  onClick={() => setNewProductModal(false)}
                  className="flex-1 py-2.5 rounded-full border border-[#dbcec2] text-black font-semibold"
                >
                  Vazgeç
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-full bg-black text-white font-semibold hover:bg-[#222]"
                >
                  Ürünü Kaydet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
