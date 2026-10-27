import React, { useState } from 'react';
import { FAQS } from '../data/mockData';
import { ChevronDown, MapPin, Phone, Mail, Clock, ShieldCheck, Flame, Send } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ContentPage: React.FC = () => {
  const { showToast } = useApp();
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    showToast('Mesajınız NAILAB Klinik Danışma ekibine iletildi. En kısa sürede dönüş yapılacaktır.');
    setContactName('');
    setContactEmail('');
    setContactMessage('');
  };

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-12">
      {/* Title */}
      <div className="text-center space-y-2">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#765841]">
          Bilgi & Destek Merkezi
        </span>
        <h1 className="text-3xl sm:text-4xl font-normal text-black tracking-tight">
          İletişim, SSS ve Klinik Rehber
        </h1>
        <p className="text-xs sm:text-sm text-[#4c4546] max-w-md mx-auto">
          Eğitmenlerimizin, öğrencilerimizin ve salonlarımızın en çok merak ettiği sorular ve
          sterilizasyon yönergeleri.
        </p>
      </div>

      {/* FAQs */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-black mb-4">Sıkça Sorulan Sorular</h2>
        <div className="space-y-3">
          {FAQS.map((faq, idx) => (
            <div
              key={idx}
              className="rounded-2xl bg-white border border-[#dbcec2] overflow-hidden transition-all shadow-xs"
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full p-5 text-left flex justify-between items-center gap-4 hover:bg-[#fff8f4]"
              >
                <span className="text-xs sm:text-sm font-semibold text-black">{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-[#765841] shrink-0 transition-transform ${
                    openFaq === idx ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openFaq === idx && (
                <div className="px-5 pb-5 pt-1 text-xs text-[#4c4546] leading-relaxed border-t border-[#f4ece7]">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Clinical Hygiene & Autoclave Guide */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#faf2ed] border border-[#dbcec2] shadow-xs space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#765841] text-white flex items-center justify-center shrink-0">
            <Flame className="w-5 h-5 text-[#fdd5b8]" />
          </div>
          <div>
            <h3 className="text-base font-bold text-black">134°C Otoklav & Dezenfeksiyon Protokolü</h3>
            <p className="text-xs text-[#765841]">Sınıf içi maksimum biyolojik güvenlik standartları</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-white border border-[#dbcec2]">
            <strong className="text-black block mb-1">1. Mekanik Temizlik</strong>
            <p className="text-[#4c4546] leading-relaxed">
              Kullanım sonrası parmak yüzeyindeki protez jel veya toz kalıntılarını alkolsüz solüsyon ile silin.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white border border-[#dbcec2]">
            <strong className="text-black block mb-1">2. Kimyasal Dezenfeksiyon</strong>
            <p className="text-[#4c4546] leading-relaxed">
              Dermatolojik testli Barbicide veya muadili antiseptik banyoda 10 dakika bekletin.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white border border-[#dbcec2]">
            <strong className="text-black block mb-1">3. Buharlı Otoklav</strong>
            <p className="text-[#4c4546] leading-relaxed">
              Gövdeyi metal manyetik standından ayırarak otoklav poşetinde 134°C’de 18 dakika steril edin.
            </p>
          </div>
        </div>
      </div>

      {/* Studio Location & Contact Form */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Contact Info */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#dbcec2] shadow-xs space-y-6">
          <div>
            <h3 className="text-lg font-bold text-black">NAILAB Clinical Atelier Stüdyo</h3>
            <p className="text-xs text-[#7e7576] mt-0.5">
              Ekipmanlarımızı bizzat test etmek ve eğitmen danışmanlarımızla görüşmek için randevu
              alabilirsiniz.
            </p>
          </div>

          <div className="space-y-4 text-xs text-[#4c4546]">
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-[#a9876d] shrink-0 mt-0.5" />
              <div>
                <strong className="text-black block">Adres:</strong>
                Teşvikiye Mah. Abdi İpekçi Cad. No: 48, Daire: 4, Nişantaşı / Şişli / İstanbul
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="w-4 h-4 text-[#a9876d] shrink-0 mt-0.5" />
              <div>
                <strong className="text-black block">Telefon & WhatsApp Danışma:</strong>
                0850 304 62 45 / +90 (532) 555 19 84
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="w-4 h-4 text-[#a9876d] shrink-0 mt-0.5" />
              <div>
                <strong className="text-black block">E-Posta:</strong>
                atelier@nailab.ist (Kurumsal & Bayilik: akademi@nailab.ist)
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="w-4 h-4 text-[#a9876d] shrink-0 mt-0.5" />
              <div>
                <strong className="text-black block">Çalışma Saatleri:</strong>
                Pazartesi - Cumartesi: 09:30 - 18:30
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <form
          onSubmit={handleContactSubmit}
          className="p-6 sm:p-8 rounded-3xl bg-white border border-[#dbcec2] shadow-xs space-y-4 text-xs"
        >
          <h3 className="text-lg font-bold text-black">Bize Mesaj Gönderin</h3>
          <div>
            <label className="font-semibold text-[#765841] block mb-1">Ad Soyad</label>
            <input
              type="text"
              required
              value={contactName}
              onChange={(e) => setContactName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-[#dbcec2] text-xs"
            />
          </div>

          <div>
            <label className="font-semibold text-[#765841] block mb-1">E-Posta</label>
            <input
              type="email"
              required
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-[#dbcec2] text-xs"
            />
          </div>

          <div>
            <label className="font-semibold text-[#765841] block mb-1">Mesajınız</label>
            <textarea
              required
              rows={4}
              value={contactMessage}
              onChange={(e) => setContactMessage(e.target.value)}
              placeholder="Toplu sipariş, eğitmen akreditasyonu veya ürün sorunuz..."
              className="w-full px-4 py-2.5 rounded-xl border border-[#dbcec2] text-xs"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-full bg-black text-white font-bold uppercase tracking-wider text-xs hover:bg-[#222] transition-colors flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4 text-[#a9876d]" />
            <span>Mesajı İlet</span>
          </button>
        </form>
      </div>
    </div>
  );
};
