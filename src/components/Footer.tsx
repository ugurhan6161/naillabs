import React from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, Award, Flame, Truck, Phone, Mail, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigateTo } = useApp();

  return (
    <footer className="bg-[#1b1b1b] text-[#eee7e2] pt-14 pb-12 border-t border-[#4c4546]">
      {/* Trust Badges Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 border-b border-[#33302d]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#2c1605] flex items-center justify-center shrink-0 border border-[#a9876d]/30">
              <ShieldCheck className="w-5 h-5 text-[#fdd5b8]" />
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-white">
                Patentli Form
              </h4>
              <p className="text-[11px] text-[#cfc4c5]">2.5x Büyütülmüş Anatomi</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#2c1605] flex items-center justify-center shrink-0 border border-[#a9876d]/30">
              <Flame className="w-5 h-5 text-[#fdd5b8]" />
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-white">
                134°C Otoklav
              </h4>
              <p className="text-[11px] text-[#cfc4c5]">Klinik Sterilizasyon</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#2c1605] flex items-center justify-center shrink-0 border border-[#a9876d]/30">
              <Award className="w-5 h-5 text-[#fdd5b8]" />
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-white">
                Akademi Onaylı
              </h4>
              <p className="text-[11px] text-[#cfc4c5]">Eğitmen Tercihi</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#2c1605] flex items-center justify-center shrink-0 border border-[#a9876d]/30">
              <Truck className="w-5 h-5 text-[#fdd5b8]" />
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-white">
                Sigortalı Kargo
              </h4>
              <p className="text-[11px] text-[#cfc4c5]">Aynı Gün Hızlı Sevk</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Brand info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-black border border-[#a9876d] flex items-center justify-center">
                <span className="text-white text-xs font-bold">NL</span>
              </div>
              <span className="text-lg font-bold tracking-[0.2em] text-white">NAILAB™</span>
            </div>
            <p className="text-xs text-[#cfc4c5] leading-relaxed max-w-sm">
              Özellikle manikür eğitmenleri ve tırnak akademileri için geliştirilmiş patentli
              büyük parmak eğitim kiti ve cerrahi hassasiyette freze ekipmanları.
            </p>
            <div className="space-y-2 text-xs text-[#cfc4c5] pt-2">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#a9876d] shrink-0" />
                <span>Teşvikiye Mah. Abdi İpekçi Cad. No: 48, Nişantaşı / İstanbul</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#a9876d] shrink-0" />
                <span>0850 304 62 45 / 0532 555 19 84</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#a9876d] shrink-0" />
                <span>atelier@nailab.ist</span>
              </div>
            </div>
          </div>

          {/* Column 1: Ürünler */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-widest text-white mb-3">
              Koleksiyon
            </h5>
            <ul className="space-y-2 text-xs text-[#cfc4c5]">
              <li>
                <button
                  onClick={() => navigateTo('/magaza')}
                  className="hover:text-white transition-colors"
                >
                  Eğitim Kitleri
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('/magaza')}
                  className="hover:text-white transition-colors"
                >
                  Elmas Freze Uçları
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('/magaza')}
                  className="hover:text-white transition-colors"
                >
                  Yedek Tırnak Formları
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('/magaza')}
                  className="hover:text-white transition-colors"
                >
                  Manyetik Stantlar
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: Eğitmen & Akademi */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-widest text-white mb-3">
              Akademi
            </h5>
            <ul className="space-y-2 text-xs text-[#cfc4c5]">
              <li>
                <button
                  onClick={() => navigateTo('/egitmen-portali')}
                  className="hover:text-white transition-colors text-[#fdd5b8]"
                >
                  Eğitmen Portalı & Giriş
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('/egitmen-portali')}
                  className="hover:text-white transition-colors"
                >
                  Toplu Sınıf Alımları
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('/egitmen-portali')}
                  className="hover:text-white transition-colors"
                >
                  Müfredat & Video Kılavuz
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('/admin')}
                  className="hover:text-white transition-colors"
                >
                  Yönetici Konsolu
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Destek */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-widest text-white mb-3">
              Yardım & Takip
            </h5>
            <ul className="space-y-2 text-xs text-[#cfc4c5]">
              <li>
                <button
                  onClick={() => navigateTo('/siparis-takip')}
                  className="hover:text-white transition-colors"
                >
                  Sipariş Takibi
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('/hesabim')}
                  className="hover:text-white transition-colors"
                >
                  Hesabım & Siparişlerim
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('/iletisim-sss')}
                  className="hover:text-white transition-colors"
                >
                  Sıkça Sorulan Sorular
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('/iletisim-sss')}
                  className="hover:text-white transition-colors"
                >
                  Sterilizasyon Rehberi
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom copyright */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-[#33302d] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#7e7576]">
        <p>© 2026 NAILAB™ Clinical Atelier. Tüm hakları saklıdır. Patent Koruma No: TR-2024/09812.</p>
        <div className="flex items-center gap-4">
          <span>Gizlilik Sözleşmesi</span>
          <span>•</span>
          <span>Mesafeli Satış Sözleşmesi</span>
          <span>•</span>
          <span>KVKK Aydınlatma Metni</span>
        </div>
      </div>
    </footer>
  );
};
