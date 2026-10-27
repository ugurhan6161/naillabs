import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { User, Package, MapPin, Sparkles, CheckCircle2, ChevronRight, RefreshCw } from 'lucide-react';

export const AccountPage: React.FC = () => {
  const { user, updateUser, orders, toggleTrainerStatus, navigateTo, addToCart, showToast } =
    useApp();

  const [activeTab, setActiveTab] = useState<'orders' | 'profile' | 'addresses'>('orders');

  const [name, setName] = useState(user?.fullName || 'Selin Karaca');
  const [email, setEmail] = useState(user?.email || 'selin.karaca@nailacademy.ist');
  const [phone, setPhone] = useState(user?.phone || '0532 555 19 84');

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser({ fullName: name, email, phone });
    showToast('Profil başarıyla güncellendi.');
  };

  const handleReorder = (orderId: string) => {
    const ord = orders.find((o) => o.id === orderId);
    if (ord) {
      ord.items.forEach((item) => {
        addToCart(item.product, item.quantity, item.selectedForm, item.selectedGrit);
      });
      navigateTo('/sepet');
    }
  };

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-8">
      {/* User Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#dbcec2] shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-black text-white flex items-center justify-center font-bold text-xl border-2 border-[#a9876d]">
            {user?.fullName
              .split(' ')
              .map((n) => n[0])
              .join('')
              .toUpperCase()}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-black">{user?.fullName}</h1>
              {user?.isTrainer && (
                <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#fdd5b8] text-[#765841] font-bold">
                  Onaylı Eğitmen
                </span>
              )}
            </div>
            <p className="text-xs text-[#7e7576] mt-0.5">{user?.email}</p>
            {user?.academyName && (
              <p className="text-xs text-[#765841] font-medium mt-0.5">{user?.academyName}</p>
            )}
          </div>
        </div>

        <button
          onClick={toggleTrainerStatus}
          className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
            user?.isTrainer
              ? 'bg-[#a9876d] text-white shadow-xs'
              : 'bg-[#faf2ed] border border-[#dbcec2] text-[#765841] hover:bg-[#f4ece7]'
          }`}
        >
          {user?.isTrainer ? 'Eğitmen Modu: Aktif (%15)' : 'Eğitmen Modunu Aç'}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-[#dbcec2] pb-1">
        <button
          onClick={() => setActiveTab('orders')}
          className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
            activeTab === 'orders' ? 'bg-black text-white' : 'text-[#4c4546] hover:bg-[#f4ece7]'
          }`}
        >
          Siparişlerim ({orders.length})
        </button>
        <button
          onClick={() => setActiveTab('profile')}
          className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
            activeTab === 'profile' ? 'bg-black text-white' : 'text-[#4c4546] hover:bg-[#f4ece7]'
          }`}
        >
          Profil Bilgilerim
        </button>
        <button
          onClick={() => setActiveTab('addresses')}
          className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
            activeTab === 'addresses' ? 'bg-black text-white' : 'text-[#4c4546] hover:bg-[#f4ece7]'
          }`}
        >
          Kayıtlı Adresler
        </button>
      </div>

      {/* Tab Content: Orders */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          {orders.map((ord) => (
            <div
              key={ord.id}
              className="p-6 rounded-2xl bg-white border border-[#dbcec2] shadow-xs space-y-4"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-[#f4ece7] pb-3 text-xs">
                <div>
                  <span className="text-[#7e7576]">Sipariş Kodu:</span>{' '}
                  <strong className="text-black font-mono">{ord.id}</strong> •{' '}
                  <span className="text-[#7e7576]">{ord.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      ord.status === 'teslim_edildi'
                        ? 'bg-emerald-100 text-emerald-800'
                        : ord.status === 'kargolandi'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {ord.status === 'teslim_edildi'
                      ? 'Teslim Edildi'
                      : ord.status === 'kargolandi'
                      ? 'Kargoya Verildi'
                      : 'Hazırlanıyor'}
                  </span>
                  <span className="font-bold text-black text-sm">
                    ₺{ord.total.toLocaleString('tr-TR')}
                  </span>
                </div>
              </div>

              {/* Items */}
              <div className="space-y-2">
                {ord.items.map((it, idx) => (
                  <div key={idx} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      <img
                        src={it.product.thumbnail}
                        alt={it.product.title}
                        className="w-10 h-10 rounded-lg object-cover bg-[#f4ece7]"
                      />
                      <div>
                        <span className="font-semibold text-black">{it.product.title}</span>
                        <p className="text-[10px] text-[#7e7576]">
                          {it.quantity} Adet {it.selectedForm ? `• ${it.selectedForm}` : ''}
                        </p>
                      </div>
                    </div>
                    <span className="font-bold text-black">
                      ₺{(it.product.price * it.quantity).toLocaleString('tr-TR')}
                    </span>
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="flex justify-between items-center pt-3 border-t border-[#f4ece7]">
                <button
                  onClick={() => navigateTo('/siparis-takip', ord.id)}
                  className="text-xs font-semibold text-[#765841] hover:text-black flex items-center gap-1"
                >
                  <span>Kargo Detayını Gör</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => handleReorder(ord.id)}
                  className="px-4 py-1.5 rounded-full bg-[#f4ece7] text-black text-xs font-semibold hover:bg-[#eee7e2] transition-colors flex items-center gap-1"
                >
                  <RefreshCw className="w-3 h-3 text-[#765841]" />
                  <span>Yeniden Sipariş Ver</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab Content: Profile */}
      {activeTab === 'profile' && (
        <form
          onSubmit={handleSaveProfile}
          className="p-6 sm:p-8 rounded-3xl bg-white border border-[#dbcec2] shadow-xs space-y-4 max-w-xl"
        >
          <div>
            <label className="text-xs font-semibold text-[#765841] block mb-1">Ad Soyad</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-[#dbcec2] text-xs focus:outline-none focus:border-black"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-[#765841] block mb-1">E-Posta</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-[#dbcec2] text-xs focus:outline-none focus:border-black"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-[#765841] block mb-1">Telefon</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-[#dbcec2] text-xs focus:outline-none focus:border-black"
            />
          </div>

          <button
            type="submit"
            className="px-6 py-2.5 rounded-full bg-black text-white text-xs font-bold uppercase tracking-wider hover:bg-[#222]"
          >
            Bilgileri Kaydet
          </button>
        </form>
      )}

      {/* Tab Content: Addresses */}
      {activeTab === 'addresses' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-6 rounded-2xl bg-white border border-[#dbcec2] shadow-xs space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold uppercase text-[#765841]">Akademi / Salon</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-semibold">
                Varsayılan
              </span>
            </div>
            <h4 className="text-sm font-semibold text-black">Teşvikiye Stüdyo</h4>
            <p className="text-xs text-[#4c4546] leading-relaxed">
              Teşvikiye Mah. Valikonağı Cad. No: 42/B
              <br />
              Şişli, İstanbul
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
