import React from 'react';
import { useApp } from '../context/AppContext';
import {
  ZoomIn,
  RefreshCw,
  Award,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Quote,
  Flame,
  ChevronRight,
  Shield,
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { products, addToCart, navigateTo } = useApp();
  const flagship = products[0];

  return (
    <div className="flex flex-col w-full">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28 px-4 sm:px-6 lg:px-8 border-b border-[#dbcec2]/50">
        {/* Ambient Halo */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-[#fdd5b8]/35 blur-3xl pointer-events-none -z-10" />

        <div className="max-w-5xl mx-auto flex flex-col items-center text-center">
          {/* Certification Tag */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#eee7e2] text-[#765841] text-xs font-semibold uppercase tracking-[0.16em] mb-6 shadow-xs border border-[#dbcec2]">
            <span className="w-2 h-2 rounded-full bg-[#a9876d] animate-pulse"></span>
            Özellikle Tırnak Eğitmenleri İçin Geliştirildi
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-normal text-black tracking-tight leading-[1.15] max-w-3xl mb-6">
            Hareketleri küçük parmakta değil,{' '}
            <span className="font-semibold underline decoration-[#a9876d] decoration-2 underline-offset-8">
              geniş ve net
            </span>{' '}
            gösterin.
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-[#4c4546] font-light max-w-2xl leading-relaxed mb-8">
            Temel manikür ve protez tırnak kurslarında eksik kalan klinik eğitim kiti.
            Sınıftaki her öğrencinin freze açısını en arka sıralardan dahi berrak görmesini sağlar.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-md mb-12">
            <button
              onClick={() => navigateTo('/urun', flagship.slug)}
              className="w-full sm:w-auto flex-1 h-12 px-8 rounded-full bg-black text-white text-xs tracking-wider uppercase font-semibold hover:bg-[#222] transition-transform active:scale-95 shadow-md flex items-center justify-center gap-2"
            >
              <span>Kit'i İncele</span>
              <ArrowRight className="w-4 h-4 text-[#a9876d]" />
            </button>
            <button
              onClick={() => {
                addToCart(flagship);
              }}
              className="w-full sm:w-auto flex-1 h-12 px-8 rounded-full bg-white border border-[#dbcec2] text-[#1e1b18] text-xs tracking-wider uppercase font-semibold hover:bg-[#eee7e2] transition-transform active:scale-95 shadow-xs flex items-center justify-center gap-2"
            >
              <span>Hemen Satın Al</span>
              <span className="text-[#765841] font-bold">₺{flagship.price.toLocaleString('tr-TR')}</span>
            </button>
          </div>

          {/* Signature Circular Metallic Product Frame */}
          <div className="relative w-72 h-72 sm:w-84 sm:h-84 mx-auto flex items-center justify-center">
            {/* Outer Pulsing Halo */}
            <div className="absolute inset-0 rounded-full bg-[#fdd5b8]/50 animate-ping opacity-20 pointer-events-none" />

            {/* Precision Rose Gold Collar */}
            <div className="absolute inset-0 rounded-full p-[3px] bg-gradient-to-tr from-[#765841] via-[#fdd5b8] to-[#a9876d] shadow-[0_12px_40px_rgba(118,88,65,0.18)]">
              <div className="w-full h-full rounded-full bg-white p-2 overflow-hidden flex items-center justify-center">
                <img
                  src={flagship.images[0]}
                  alt="NAILAB Anatomik Eğitim Kiti"
                  className="w-full h-full object-cover rounded-full hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>

            {/* Patent Floating Badge */}
            <div className="absolute -bottom-3 right-0 sm:right-4 px-3.5 py-1.5 rounded-full bg-white shadow-lg border border-[#dbcec2] flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#a9876d]" />
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#60432e]">
                Patentli Form (2.5x)
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 3 PEDAGOGICAL PILLARS (NEDEN NAILAB?) */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-[#faf2ed]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#765841] block mb-2">
              Pedagojik İnovasyon
            </span>
            <h2 className="text-2xl sm:text-4xl font-normal text-black tracking-tight mb-3">
              Neden NAILAB™?
            </h2>
            <p className="text-sm text-[#4c4546] leading-relaxed">
              Geleneksel eğitimlerde arkadaki öğrencilerin freze açısını kaçırması sorununa son veren
              klinik ölçekli ilk eğitim aracı.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="p-8 rounded-2xl bg-white border border-[#dbcec2] shadow-xs flex flex-col hover:border-[#a9876d] transition-colors">
              <div className="w-12 h-12 rounded-full bg-[#f4ece7] flex items-center justify-center text-[#765841] mb-5">
                <ZoomIn className="w-6 h-6 text-[#a9876d]" />
              </div>
              <h3 className="text-lg font-semibold text-black mb-2">
                Geniş ve Anatomik Gösterim
              </h3>
              <p className="text-sm text-[#4c4546] leading-relaxed">
                2.5 kat büyütülmüş formu sayesinde kütikül cebi derinliği ve forseps açısı sınıfta en
                arkadaki öğrenciye dahi mikroskobik netlikte aktarılır.
              </p>
            </div>

            {/* Card 2 */}
            <div className="p-8 rounded-2xl bg-white border border-[#dbcec2] shadow-xs flex flex-col hover:border-[#a9876d] transition-colors">
              <div className="w-12 h-12 rounded-full bg-[#f4ece7] flex items-center justify-center text-[#765841] mb-5">
                <RefreshCw className="w-6 h-6 text-[#a9876d]" />
              </div>
              <h3 className="text-lg font-semibold text-black mb-2">
                4 Değiştirilebilir Tırnak Formu
              </h3>
              <p className="text-sm text-[#4c4546] leading-relaxed">
                Kare, badem, kemerli ve oval tırnak yatakları tek kitte buluşur. Öğrenciler tek seansta
                farklı anatomik yapıları kavrayıp pratik eder.
              </p>
            </div>

            {/* Card 3 */}
            <div className="p-8 rounded-2xl bg-white border border-[#dbcec2] shadow-xs flex flex-col hover:border-[#a9876d] transition-colors">
              <div className="w-12 h-12 rounded-full bg-[#f4ece7] flex items-center justify-center text-[#765841] mb-5">
                <Award className="w-6 h-6 text-[#a9876d]" />
              </div>
              <h3 className="text-lg font-semibold text-black mb-2">
                Derse Sistematik Standart
              </h3>
              <p className="text-sm text-[#4c4546] leading-relaxed">
                Eğitmenlerin anlatım süresini kısaltır, öğrencilerin manikür hatalarını anında fark
                etmesini sağlayarak akademi başarı oranını katlar.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* MODULE SHOWCASE / KIT IÇERIĞI */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-[#fff8f4]">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-12">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#765841] block mb-2">
                Eksiksiz Donanım
              </span>
              <h2 className="text-2xl sm:text-4xl font-normal text-black tracking-tight">
                Kit İçeriği ve Modüler Mimari
              </h2>
            </div>
            <button
              onClick={() => navigateTo('/magaza')}
              className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#765841] hover:text-black transition-colors"
            >
              <span>Tüm Ekipmanları Gör</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Module 1 */}
            <div className="rounded-2xl bg-white border border-[#dbcec2] overflow-hidden flex flex-col">
              <div className="h-56 bg-[#f4ece7] relative overflow-hidden">
                <img
                  src={flagship.images[0]}
                  alt="Anatomik Büyütülmüş Parmak"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/90 backdrop-blur-xs text-[10px] font-bold uppercase tracking-wider text-[#60432e]">
                  Modül 01
                </span>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="text-base font-semibold text-black mb-1">
                    Anatomik Format Büyük Eğitim Parmağı
                  </h4>
                  <p className="text-xs text-[#4c4546] leading-relaxed">
                    Esnek kütikül cebi ve lateral katlantılara sahip medikal silikon form.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#eee7e2] flex items-center justify-between text-xs text-[#765841] font-medium">
                  <span>Shore 35A Medikal Silikon</span>
                  <CheckCircle2 className="w-4 h-4 text-[#a9876d]" />
                </div>
              </div>
            </div>

            {/* Module 2 */}
            <div className="rounded-2xl bg-white border border-[#dbcec2] overflow-hidden flex flex-col">
              <div className="h-56 bg-[#f4ece7] relative overflow-hidden">
                <img
                  src={products[1].images[0]}
                  alt="Değiştirilebilir Formlar"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/90 backdrop-blur-xs text-[10px] font-bold uppercase tracking-wider text-[#60432e]">
                  Modül 02
                </span>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="text-base font-semibold text-black mb-1">
                    4 Değiştirilebilir Tırnak Formu
                  </h4>
                  <p className="text-xs text-[#4c4546] leading-relaxed">
                    Manyetik yuvalı Kare, Badem, Kemerli ve Oval değiştirilebilir uçlar.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#eee7e2] flex items-center justify-between text-xs text-[#765841] font-medium">
                  <span>Manyetik Hızlı Kilit</span>
                  <CheckCircle2 className="w-4 h-4 text-[#a9876d]" />
                </div>
              </div>
            </div>

            {/* Module 3 */}
            <div className="rounded-2xl bg-white border border-[#dbcec2] overflow-hidden flex flex-col">
              <div className="h-56 bg-[#f4ece7] relative overflow-hidden">
                <img
                  src={products[3].images[0]}
                  alt="Ağır Masa Standı"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/90 backdrop-blur-xs text-[10px] font-bold uppercase tracking-wider text-[#60432e]">
                  Modül 03
                </span>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="text-base font-semibold text-black mb-1">
                    Manyetik Paslanmaz Stand
                  </h4>
                  <p className="text-xs text-[#4c4546] leading-relaxed">
                    650g ağırlığındaki saten çelik zemin ile titreşimsiz ders sunumu.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#eee7e2] flex items-center justify-between text-xs text-[#765841] font-medium">
                  <span>Anti-Refle Çelik</span>
                  <CheckCircle2 className="w-4 h-4 text-[#a9876d]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EDUCATOR TESTIMONIALS */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#faf2ed] border-t border-[#dbcec2]/50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#765841] block mb-1">
              Usta Eğitmen Deneyimleri
            </span>
            <h2 className="text-2xl sm:text-3xl font-normal text-black">
              Akademiler NAILAB™ ile Nasıl Eğitim Veriyor?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-8 rounded-2xl bg-white border border-[#dbcec2] shadow-xs relative">
              <Quote className="w-8 h-8 text-[#fdd5b8] absolute top-6 right-6" />
              <p className="text-sm text-[#4c4546] italic leading-relaxed mb-6">
                “15 kişilik sınıflarda Rus maniküründe alev frezenin 45 derecelik açısını göstermek
                hep zordu. NAILAB parmağıyla ilk derste tüm öğrenciler doğru açıyı anında kavradı.”
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#1b1b1b] text-white flex items-center justify-center font-bold text-xs">
                  SK
                </div>
                <div>
                  <h5 className="text-sm font-semibold text-black">Selin Karaca</h5>
                  <p className="text-xs text-[#7e7576]">Baş Eğitmen • Atelier Nail Institute</p>
                </div>
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-white border border-[#dbcec2] shadow-xs relative">
              <Quote className="w-8 h-8 text-[#fdd5b8] absolute top-6 right-6" />
              <p className="text-sm text-[#4c4546] italic leading-relaxed mb-6">
                “Tırnak formlarının manyetik olarak kolayca değişmesi ve 134°C’de otoklavlanabilmesi
                bize inanılmaz bir hijyen standardı sağladı. Her salona öneriyorum.”
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#765841] text-white flex items-center justify-center font-bold text-xs">
                  BÖ
                </div>
                <div>
                  <h5 className="text-sm font-semibold text-black">Beste Özmen</h5>
                  <p className="text-xs text-[#7e7576]">Akademi Direktörü • Pro Nail Clinic</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CALL TO ACTION BANNER */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-black text-white">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#a9876d]/30 text-[#fdd5b8] text-xs uppercase tracking-widest font-semibold border border-[#a9876d]/40">
            <Shield className="w-3.5 h-3.5" />
            Eğitmenler İçin Özel Avantaj
          </div>
          <h2 className="text-2xl sm:text-4xl font-normal tracking-tight">
            Akademinizin Eğitim Kalitesini Bir Üst Seviyeye Taşıyın
          </h2>
          <p className="text-sm sm:text-base text-[#cfc4c5] max-w-xl mx-auto leading-relaxed">
            Doğrulanmış eğitmen profilleri için %15 sepet indirimi, ücretsiz müfredat video seti ve
            aynı gün İstanbul içi kurye imkânı.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={() => {
                addToCart(flagship);
              }}
              className="w-full sm:w-auto h-12 px-8 rounded-full bg-white text-black font-semibold text-xs tracking-wider uppercase hover:bg-[#eee7e2] transition-colors shadow-lg"
            >
              Eğitim Kiti Satın Al (₺{flagship.price.toLocaleString('tr-TR')})
            </button>
            <button
              onClick={() => navigateTo('/egitmen-portali')}
              className="w-full sm:w-auto h-12 px-8 rounded-full border border-[#a9876d] text-[#fdd5b8] font-semibold text-xs tracking-wider uppercase hover:bg-white/10 transition-colors"
            >
              Eğitmen Başvurusu Yap
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
