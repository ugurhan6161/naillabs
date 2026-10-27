import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ShoppingBag, User as UserIcon, Search, Menu, X, Shield, Sparkles, LayoutDashboard } from 'lucide-react';

export const Header: React.FC = () => {
  const { currentRoute, navigateTo, cart, setIsMiniCartOpen, user, toggleTrainerStatus } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const navLinks = [
    { label: 'Vitrin', route: '/' },
    { label: 'Mağaza', route: '/magaza' },
    { label: 'Eğitmen Portalı', route: '/egitmen-portali' },
    { label: 'Sipariş Takip', route: '/siparis-takip' },
    { label: 'İletişim & SSS', route: '/iletisim-sss' },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigateTo('/magaza');
      setSearchOpen(false);
    }
  };

  return (
    <>
      {/* Top micro banner */}
      <div className="bg-[#1b1b1b] text-white text-[11px] py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-1">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#a9876d]"></span>
            <span>İstanbul içi aynı gün kurye • 1.000 TL üzeri ücretsiz kargo</span>
          </div>
          <div className="flex items-center gap-4 text-[#cfc4c5]">
            <button
              onClick={toggleTrainerStatus}
              className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold transition-all ${
                user?.isTrainer
                  ? 'bg-[#a9876d] text-white shadow-xs'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
              title="Eğitmen modu ile %15 sepet indirimini test edin"
            >
              <Sparkles className="w-3 h-3 text-[#fdd5b8]" />
              <span>{user?.isTrainer ? 'Eğitmen Modu: Aktif (%15)' : 'Eğitmen Modunu Aç'}</span>
            </button>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline">Eğitmen Destek: 0850 304 62 45</span>
          </div>
        </div>
      </div>

      {/* Main sticky header */}
      <header className="sticky top-0 z-40 bg-[#fff8f4]/90 backdrop-blur-md border-b border-[#dbcec2]/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
          {/* Mobile hamburger button */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-full hover:bg-[#f4ece7] text-[#1e1b18]"
              aria-label="Menü"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Logo */}
          <div
            onClick={() => navigateTo('/')}
            className="flex items-center gap-2.5 cursor-pointer select-none group"
          >
            <div className="w-9 h-9 rounded-full bg-black flex items-center justify-center p-[2px] border border-[#a9876d] shadow-xs group-hover:scale-105 transition-transform">
              <span className="text-white text-xs font-bold tracking-tighter">NL</span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-lg tracking-[0.2em] uppercase text-black leading-none font-['Outfit']">
                  NAILAB
                </span>
                <span className="text-[9px] px-1 py-0.2 rounded bg-[#fdd5b8] text-[#765841] font-semibold tracking-wider">
                  ATELIER
                </span>
              </div>
              <span className="text-[10px] uppercase tracking-widest text-[#765841] font-medium leading-none mt-1">
                Clinical Precision Education
              </span>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => {
              const isActive = currentRoute === link.route;
              return (
                <button
                  key={link.route}
                  onClick={() => navigateTo(link.route)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all ${
                    isActive
                      ? 'bg-black text-white shadow-xs'
                      : 'text-[#1e1b18] hover:bg-[#f4ece7] hover:text-black'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2">
            {/* Search trigger */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="w-10 h-10 rounded-full flex items-center justify-center text-[#1e1b18] hover:bg-[#f4ece7] transition-colors"
              aria-label="Arama"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Admin shortcut */}
            <button
              onClick={() => navigateTo('/admin')}
              className={`hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                currentRoute === '/admin'
                  ? 'bg-[#1b1b1b] text-white border-black'
                  : 'bg-white text-[#4c4546] border-[#dbcec2] hover:bg-[#f4ece7]'
              }`}
              title="Yönetim Paneli"
            >
              <LayoutDashboard className="w-3.5 h-3.5 text-[#a9876d]" />
              <span>Admin</span>
            </button>

            {/* User Account */}
            <button
              onClick={() => navigateTo('/hesabim')}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                currentRoute === '/hesabim'
                  ? 'bg-black text-white'
                  : 'text-[#1e1b18] hover:bg-[#f4ece7]'
              }`}
              aria-label="Hesabım"
            >
              <UserIcon className="w-4 h-4" />
            </button>

            {/* Cart trigger */}
            <button
              onClick={() => setIsMiniCartOpen(true)}
              className="relative w-10 h-10 rounded-full bg-black text-white flex items-center justify-center hover:bg-[#222] transition-colors shadow-xs"
              aria-label="Sepet"
            >
              <ShoppingBag className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-[#a9876d] text-white text-[10px] font-bold flex items-center justify-center border-2 border-[#fff8f4]">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Search Bar Overlay */}
        {searchOpen && (
          <div className="border-t border-[#dbcec2] bg-[#faf2ed] p-4 animate-in fade-in duration-200">
            <form
              onSubmit={handleSearchSubmit}
              className="max-w-2xl mx-auto flex items-center gap-2"
            >
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#7e7576]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Ürün adı, parmak kiti, freze ucu veya form ara..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-full bg-white border border-[#dbcec2] text-sm text-[#1e1b18] placeholder-[#7e7576] focus:outline-none focus:border-black"
                  autoFocus
                />
              </div>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-full bg-black text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#222]"
              >
                Ara
              </button>
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="p-2 text-[#7e7576] hover:text-black"
              >
                <X className="w-5 h-5" />
              </button>
            </form>
          </div>
        )}

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-[#dbcec2] bg-[#fff8f4] px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top-4 duration-200">
            {navLinks.map((link) => (
              <button
                key={link.route}
                onClick={() => {
                  navigateTo(link.route);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  currentRoute === link.route
                    ? 'bg-black text-white'
                    : 'text-[#1e1b18] hover:bg-[#f4ece7]'
                }`}
              >
                {link.label}
              </button>
            ))}
            <div className="pt-2 border-t border-[#eee7e2] flex items-center justify-between">
              <button
                onClick={() => {
                  navigateTo('/admin');
                  setMobileMenuOpen(false);
                }}
                className="inline-flex items-center gap-1.5 text-xs text-[#765841] font-semibold"
              >
                <Shield className="w-4 h-4" />
                <span>Admin Yönetim Paneli</span>
              </button>
              <button
                onClick={() => {
                  toggleTrainerStatus();
                  setMobileMenuOpen(false);
                }}
                className="text-xs px-3 py-1 rounded-full bg-[#fdd5b8] text-[#765841] font-semibold"
              >
                {user?.isTrainer ? 'Eğitmen: Açık' : 'Eğitmen Ol'}
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
