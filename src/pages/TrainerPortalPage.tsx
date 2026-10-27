import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Award, CheckCircle2, Download, FileText, Sparkles, Building, Users, Shield } from 'lucide-react';

export const TrainerPortalPage: React.FC = () => {
  const { user, updateUser, showToast, navigateTo } = useApp();

  const [academyName, setAcademyName] = useState(user?.academyName || 'Atelier Nail Institute');
  const [certNo, setCertNo] = useState(user?.certificateNo || 'TR-NAIL-2024-89');
  const [city, setCity] = useState('İstanbul');
  const [capacity, setCapacity] = useState('15-30 Öğrenci/Ay');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleVerifyTrainer = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser({
      isTrainer: true,
      academyName,
      certificateNo: certNo,
      discountRate: 0.15,
    });
    setIsSubmitted(true);
    showToast('Tebrikler! Eğitmen ve akademi profiliniz doğrulandı. %15 VIP indirim aktif.');
  };

  const handleDownloadCurriculum = () => {
    showToast('12 Saatlik Klinik Manikür Müfredatı ve Ders Kılavuzu (PDF) indirildi.');
  };

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-12">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-black text-white p-8 sm:p-12 border border-[#a9876d]/40 shadow-xl">
        <div className="absolute -top-12 -right-12 w-80 h-80 rounded-full bg-[#765841]/30 blur-3xl pointer-events-none" />

        <div className="max-w-2xl space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#fdd5b8]/20 text-[#fdd5b8] text-xs font-semibold uppercase tracking-widest border border-[#a9876d]/40">
            <Sparkles className="w-3.5 h-3.5" />
            Akademi & Eğitmen Portalı
          </div>
          <h1 className="text-3xl sm:text-5xl font-normal tracking-tight text-white leading-tight">
            Geleceğin Usta Maniküristlerini Birlikte Yetiştirelim.
          </h1>
          <p className="text-xs sm:text-sm text-[#cfc4c5] leading-relaxed">
            Sertifikalı tırnak eğitmenleri, salon sahipleri ve güzellik akademileri için özel
            fiyatlandırma, müfredat araçları ve patentli eğitim kitleri.
          </p>
        </div>
      </div>

      {/* 3 Academy Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-white border border-[#dbcec2] shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-full bg-[#f4ece7] text-[#765841] flex items-center justify-center">
            <Award className="w-6 h-6 text-[#a9876d]" />
          </div>
          <h3 className="text-base font-semibold text-black">%15 Daimi Eğitmen İndirimi</h3>
          <p className="text-xs text-[#4c4546] leading-relaxed">
            Doğrulanmış eğitmen profilinizle yapacağınız tüm tekli ve parça siparişlerinizde anında
            sepet avantajı.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-[#dbcec2] shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-full bg-[#f4ece7] text-[#765841] flex items-center justify-center">
            <Building className="w-6 h-6 text-[#a9876d]" />
          </div>
          <h3 className="text-base font-semibold text-black">Toplu Sınıf Siparişi Avantajı</h3>
          <p className="text-xs text-[#4c4546] leading-relaxed">
            10 ve üzeri öğrenci kiti alımlarında %25 akademi iskontosu ve eğitmen masası için ücretsiz
            manyetik stand hediyesi.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-[#dbcec2] shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-full bg-[#f4ece7] text-[#765841] flex items-center justify-center">
            <FileText className="w-6 h-6 text-[#a9876d]" />
          </div>
          <h3 className="text-base font-semibold text-black">Ücretsiz Eğitim Müfredatı</h3>
          <p className="text-xs text-[#4c4546] leading-relaxed">
            Rus manikürü, kombi teknik ve şablonlu protez tırnak derslerinde kullanabileceğiniz 12
            saatlik ders planı şablonu.
          </p>
        </div>
      </div>

      {/* Verification Form and Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Left: Form */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#dbcec2] shadow-sm space-y-6">
          <div className="border-b border-[#f4ece7] pb-4">
            <h2 className="text-xl font-semibold text-black">
              Eğitmen Doğrulama ve Akademi Kaydı
            </h2>
            <p className="text-xs text-[#7e7576] mt-1">
              Bilgilerinizi girerek saniyeler içinde onaylı eğitmen statüsünü aktifleştirin.
            </p>
          </div>

          <form onSubmit={handleVerifyTrainer} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-[#765841] block mb-1">
                Akademi / Salon Unvanı *
              </label>
              <input
                type="text"
                required
                value={academyName}
                onChange={(e) => setAcademyName(e.target.value)}
                placeholder="Örn: Atelier Nail Institute"
                className="w-full px-4 py-2.5 rounded-xl border border-[#dbcec2] text-xs focus:outline-none focus:border-black"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-[#765841] block mb-1">
                Usta Eğitmen Sertifika / Belge No *
              </label>
              <input
                type="text"
                required
                value={certNo}
                onChange={(e) => setCertNo(e.target.value)}
                placeholder="Örn: TR-NAIL-2024-89 veya MEB Ustalık Belgesi"
                className="w-full px-4 py-2.5 rounded-xl border border-[#dbcec2] text-xs focus:outline-none focus:border-black"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-[#765841] block mb-1">Şehir</label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#dbcec2] text-xs"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-[#765841] block mb-1">
                  Aylık Öğrenci Kapasitesi
                </label>
                <input
                  type="text"
                  value={capacity}
                  onChange={(e) => setCapacity(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#dbcec2] text-xs"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-full bg-black text-white text-xs font-bold uppercase tracking-wider hover:bg-[#222] transition-colors shadow-md flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4 text-[#a9876d]" />
              <span>Eğitmen Statüsünü Doğrula (%15 İndirimi Aç)</span>
            </button>
          </form>

          {user?.isTrainer && (
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs space-y-1">
              <div className="flex items-center gap-2 font-bold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Onaylı Eğitmen Statüsü Aktif!</span>
              </div>
              <p className="text-[11px] text-emerald-700">
                Alışveriş sepetinize %15 indirim otomatik yansıtılmaktadır.
              </p>
            </div>
          )}
        </div>

        {/* Right: Downloadable Curriculum */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#faf2ed] border border-[#dbcec2] shadow-sm space-y-6">
          <div className="border-b border-[#dbcec2] pb-4">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#765841]">
              Eğitmen Materyali
            </span>
            <h2 className="text-xl font-semibold text-black mt-0.5">
              Standart Manikür Müfredat Kılavuzu
            </h2>
            <p className="text-xs text-[#4c4546] mt-1">
              Eğitimlerinizde doğrudan kullanabileceğiniz hazır pedagojik ders akışı.
            </p>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-xl bg-white border border-[#dbcec2] flex items-center justify-between">
              <div>
                <span className="font-bold text-black block">Modül 1: Kütikül Anatomisi</span>
                <span className="text-[#7e7576] text-[11px]">2.5x parmakta alev freze açısı ve devir kontrolü</span>
              </div>
              <span className="text-[10px] font-semibold bg-[#f4ece7] px-2 py-0.5 rounded-full text-[#765841]">
                3 Saat
              </span>
            </div>

            <div className="p-3 rounded-xl bg-white border border-[#dbcec2] flex items-center justify-between">
              <div>
                <span className="font-bold text-black block">Modül 2: 4 Tırnak Formu & Törpü</span>
                <span className="text-[#7e7576] text-[11px]">Kare, badem, kemerli formlarda simetri tekniği</span>
              </div>
              <span className="text-[10px] font-semibold bg-[#f4ece7] px-2 py-0.5 rounded-full text-[#765841]">
                4 Saat
              </span>
            </div>

            <div className="p-3 rounded-xl bg-white border border-[#dbcec2] flex items-center justify-between">
              <div>
                <span className="font-bold text-black block">Modül 3: Klinik Hijyen & Otoklav</span>
                <span className="text-[#7e7576] text-[11px]">134°C otoklav protokolleri ve forseps dezenfeksiyonu</span>
              </div>
              <span className="text-[10px] font-semibold bg-[#f4ece7] px-2 py-0.5 rounded-full text-[#765841]">
                2 Saat
              </span>
            </div>
          </div>

          <button
            onClick={handleDownloadCurriculum}
            className="w-full py-3.5 rounded-full bg-white border border-black text-black text-xs font-bold uppercase tracking-wider hover:bg-[#f4ece7] transition-colors flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4 text-[#765841]" />
            <span>Müfredat Kılavuzunu İndir (PDF - 4.2 MB)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
