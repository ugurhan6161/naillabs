import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  CreditCard,
  Building2,
  Truck,
  ShieldCheck,
  Lock,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';

export const CheckoutPage: React.FC = () => {
  const { cart, cartSubtotal, cartDiscount, cartShipping, cartTotal, createOrder, navigateTo } =
    useApp();

  const [paymentMethod, setPaymentMethod] = useState<'card' | 'transfer'>('card');
  const [carrier, setCarrier] = useState('Yurtiçi Kargo (Express)');

  // Form states
  const [fullName, setFullName] = useState('Selin Karaca');
  const [email, setEmail] = useState('selin.karaca@nailacademy.ist');
  const [phone, setPhone] = useState('0532 555 19 84');
  const [city, setCity] = useState('İstanbul');
  const [district, setDistrict] = useState('Şişli');
  const [address, setAddress] = useState('Teşvikiye Mah. Valikonağı Cad. No: 42/B');
  const [isCorporate, setIsCorporate] = useState(false);
  const [companyName, setCompanyName] = useState('Atelier Nail Institute Ltd.');
  const [taxNumber, setTaxNumber] = useState('1948572019');

  // Card fields
  const [cardNumber, setCardNumber] = useState('5428 •••• •••• 9104');
  const [cardHolder, setCardHolder] = useState('SELİN KARACA');
  const [cardExpiry, setCardExpiry] = useState('08/28');
  const [cardCvv, setCardCvv] = useState('421');

  const [isSubmitting, setIsSubmitting] = useState(false);

  if (cart.length === 0) {
    return (
      <div className="py-20 text-center">
        <p className="text-sm text-[#7e7576]">Sepetiniz boş. Lütfen önce ürün ekleyin.</p>
        <button
          onClick={() => navigateTo('/magaza')}
          className="mt-4 px-6 py-2.5 rounded-full bg-black text-white text-xs font-semibold"
        >
          Mağazaya Git
        </button>
      </div>
    );
  }

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const order = createOrder(
        {
          fullName,
          email,
          phone,
          city,
          district,
          address,
          isCorporate,
          companyName: isCorporate ? companyName : undefined,
          taxNumber: isCorporate ? taxNumber : undefined,
        },
        paymentMethod,
        carrier
      );
      setIsSubmitting(false);
      navigateTo('/siparis-tamamlandi', order.id);
    }, 800);
  };

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-8">
      {/* Title */}
      <div className="border-b border-[#dbcec2] pb-4">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#765841]">
          <Lock className="w-4 h-4 text-[#a9876d]" />
          <span>256-Bit SSL Güvenli Tek Sayfa Ödeme</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-semibold text-black mt-1">
          Sipariş ve Teslimat Bilgileri
        </h1>
      </div>

      <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Form: Customer & Shipping & Payment */}
        <div className="lg:col-span-2 space-y-6">
          {/* Section 1: Customer Contact */}
          <div className="p-6 rounded-2xl bg-white border border-[#dbcec2] shadow-xs space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-black flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-black text-white text-xs flex items-center justify-center font-bold">
                1
              </span>
              İletişim ve Teslimat Bilgileri
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-[#765841] block mb-1">
                  Ad Soyad *
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#dbcec2] text-xs focus:outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#765841] block mb-1">
                  Telefon (Kargo SMS için) *
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#dbcec2] text-xs focus:outline-none focus:border-black"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-[#765841] block mb-1">
                  E-Posta Adresi (Fatura ve Takip Kodu) *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#dbcec2] text-xs focus:outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#765841] block mb-1">İl *</label>
                <input
                  type="text"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#dbcec2] text-xs focus:outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#765841] block mb-1">İlçe *</label>
                <input
                  type="text"
                  required
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#dbcec2] text-xs focus:outline-none focus:border-black"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-[#765841] block mb-1">
                  Açık Teslimat Adresi *
                </label>
                <textarea
                  required
                  rows={2}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#dbcec2] text-xs focus:outline-none focus:border-black"
                />
              </div>
            </div>

            {/* Corporate Invoice Option */}
            <div className="pt-2 border-t border-[#f4ece7]">
              <label className="inline-flex items-center gap-2 cursor-pointer text-xs font-medium text-black">
                <input
                  type="checkbox"
                  checked={isCorporate}
                  onChange={(e) => setIsCorporate(e.target.checked)}
                  className="rounded border-[#dbcec2] text-black focus:ring-black"
                />
                <span>Kurumsal Fatura / Akademi Şirket Adına Düzenlensin</span>
              </label>

              {isCorporate && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3 p-4 bg-[#faf2ed] rounded-xl border border-[#dbcec2]">
                  <div>
                    <label className="text-[11px] font-semibold text-[#765841] block mb-1">
                      Şirket / Akademi Unvanı
                    </label>
                    <input
                      type="text"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-white border border-[#dbcec2] text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-[#765841] block mb-1">
                      Vergi No / TC No
                    </label>
                    <input
                      type="text"
                      value={taxNumber}
                      onChange={(e) => setTaxNumber(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-white border border-[#dbcec2] text-xs"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Section 2: Carrier Choice */}
          <div className="p-6 rounded-2xl bg-white border border-[#dbcec2] shadow-xs space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-black flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-black text-white text-xs flex items-center justify-center font-bold">
                2
              </span>
              Kargo Seçeneği
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { name: 'Yurtiçi Kargo (Express)', sub: '1-2 İş Günü Sigortalı Teslimat' },
                { name: 'MNG Kargo', sub: 'Standart Şube / Adres Teslim' },
                { name: 'Aynı Gün Moto Kurye (İstanbul)', sub: 'Saat 15:00 Öncesi Adrese Teslim' },
              ].map((c) => (
                <label
                  key={c.name}
                  onClick={() => setCarrier(c.name)}
                  className={`p-3.5 rounded-xl border cursor-pointer flex items-start gap-3 transition-all ${
                    carrier === c.name
                      ? 'border-black bg-[#faf2ed] ring-1 ring-black'
                      : 'border-[#dbcec2] hover:bg-[#fff8f4]'
                  }`}
                >
                  <input
                    type="radio"
                    name="carrier"
                    checked={carrier === c.name}
                    onChange={() => setCarrier(c.name)}
                    className="mt-0.5 text-black"
                  />
                  <div>
                    <span className="text-xs font-semibold text-black block">{c.name}</span>
                    <span className="text-[11px] text-[#7e7576]">{c.sub}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Section 3: Payment Method */}
          <div className="p-6 rounded-2xl bg-white border border-[#dbcec2] shadow-xs space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-black flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-black text-white text-xs flex items-center justify-center font-bold">
                3
              </span>
              Ödeme Yöntemi
            </h3>

            <div className="flex gap-2 border-b border-[#f4ece7] pb-3">
              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`flex-1 py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                  paymentMethod === 'card'
                    ? 'bg-black text-white'
                    : 'bg-[#f4ece7] text-[#4c4546] hover:bg-[#eee7e2]'
                }`}
              >
                <CreditCard className="w-4 h-4" />
                <span>Kredi / Banka Kartı</span>
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod('transfer')}
                className={`flex-1 py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                  paymentMethod === 'transfer'
                    ? 'bg-black text-white'
                    : 'bg-[#f4ece7] text-[#4c4546] hover:bg-[#eee7e2]'
                }`}
              >
                <Building2 className="w-4 h-4" />
                <span>Havale / EFT</span>
              </button>
            </div>

            {paymentMethod === 'card' ? (
              <div className="space-y-4 pt-2">
                {/* Visual Card Mock */}
                <div className="w-full max-w-sm mx-auto h-40 rounded-2xl bg-gradient-to-tr from-[#1b1b1b] via-[#33302d] to-[#765841] text-white p-5 flex flex-col justify-between shadow-xl border border-[#a9876d]/40">
                  <div className="flex justify-between items-center">
                    <span className="text-xs tracking-widest text-[#cfc4c5]">NAILAB SECURE</span>
                    <span className="text-sm font-bold italic tracking-wider">Mastercard</span>
                  </div>
                  <div className="text-base font-mono tracking-widest text-center">
                    {cardNumber || '•••• •••• •••• ••••'}
                  </div>
                  <div className="flex justify-between text-[10px] text-[#cfc4c5]">
                    <div>
                      <span className="block opacity-70 uppercase text-[8px]">Kart Sahibi</span>
                      <span className="font-semibold text-white uppercase">
                        {cardHolder || 'AD SOYAD'}
                      </span>
                    </div>
                    <div>
                      <span className="block opacity-70 uppercase text-[8px]">Son Kullanma</span>
                      <span className="font-semibold text-white">{cardExpiry || 'AA/YY'}</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="text-xs font-semibold text-[#765841] block mb-1">
                      Kart Numarası
                    </label>
                    <input
                      type="text"
                      required
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      placeholder="5428 0000 0000 0000"
                      className="w-full px-4 py-2.5 rounded-xl border border-[#dbcec2] text-xs font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-[#765841] block mb-1">
                      Kart Üzerindeki İsim
                    </label>
                    <input
                      type="text"
                      required
                      value={cardHolder}
                      onChange={(e) => setCardHolder(e.target.value)}
                      placeholder="AD SOYAD"
                      className="w-full px-4 py-2.5 rounded-xl border border-[#dbcec2] text-xs uppercase"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-xs font-semibold text-[#765841] block mb-1">
                        Ay / Yıl
                      </label>
                      <input
                        type="text"
                        required
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        placeholder="MM/YY"
                        className="w-full px-3 py-2.5 rounded-xl border border-[#dbcec2] text-xs text-center"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-[#765841] block mb-1">
                        CVV
                      </label>
                      <input
                        type="password"
                        required
                        maxLength={4}
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                        placeholder="•••"
                        className="w-full px-3 py-2.5 rounded-xl border border-[#dbcec2] text-xs text-center"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-[#faf2ed] border border-[#dbcec2] text-xs space-y-2">
                <p className="font-semibold text-black">NAILAB Resmi Şirket Banka Hesabı:</p>
                <div className="p-3 bg-white rounded-lg border border-[#dbcec2] space-y-1 font-mono text-[11px]">
                  <div>
                    <strong className="text-black">Banka:</strong> Garanti BBVA - Nişantaşı Şubesi
                  </div>
                  <div>
                    <strong className="text-black">Alıcı:</strong> NAILAB Kozmetik ve Eğitim Donanımları A.Ş.
                  </div>
                  <div>
                    <strong className="text-black">IBAN:</strong> TR48 0006 2000 0001 2948 5720 19
                  </div>
                </div>
                <p className="text-[11px] text-[#765841]">
                  * Sipariş numaranızı açıklama kısmına yazınız. Dekont onayından sonra siparişiniz
                  aynı gün kargoya teslim edilecektir.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Right Summary Box */}
        <div className="space-y-4">
          <div className="p-6 rounded-2xl bg-white border border-[#dbcec2] shadow-xs space-y-4 sticky top-24">
            <h3 className="text-base font-semibold text-black border-b border-[#f4ece7] pb-3">
              Sipariş İnceleme ({cart.reduce((s, i) => s + i.quantity, 0)} Ürün)
            </h3>

            {/* Micro items list */}
            <div className="space-y-3 max-h-56 overflow-y-auto no-scrollbar pr-1">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-3 text-xs">
                  <img
                    src={item.product.thumbnail}
                    alt={item.product.title}
                    className="w-12 h-12 rounded-lg object-cover bg-[#f4ece7] shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h5 className="font-semibold text-black truncate">{item.product.title}</h5>
                    <p className="text-[10px] text-[#765841]">
                      {item.quantity} Adet {item.selectedForm ? `• ${item.selectedForm}` : ''}
                    </p>
                    <span className="font-bold text-black block mt-0.5">
                      ₺{(item.product.price * item.quantity).toLocaleString('tr-TR')}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-[#f4ece7] space-y-2 text-xs">
              <div className="flex justify-between text-[#7e7576]">
                <span>Ara Toplam</span>
                <span>₺{cartSubtotal.toLocaleString('tr-TR')}</span>
              </div>
              {cartDiscount > 0 && (
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>İndirim Tutarı</span>
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
                <span>Toplam Ödeme</span>
                <span>₺{cartTotal.toLocaleString('tr-TR')}</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 rounded-full bg-black text-white text-xs font-bold uppercase tracking-wider hover:bg-[#222] transition-transform active:scale-95 shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Sipariş Oluşturuluyor...</span>
              ) : (
                <>
                  <span>Siparişi Onayla ve Bitir</span>
                  <ArrowRight className="w-4 h-4 text-[#a9876d]" />
                </>
              )}
            </button>

            <div className="text-[11px] text-[#7e7576] space-y-1 pt-1 text-center">
              <p>✓ Cayma hakkı ve 14 gün ücretsiz değişim</p>
              <p>✓ Orijinal patentli NAILAB™ garanti sertifikası</p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
