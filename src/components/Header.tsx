import React, { useState } from 'react';
import { 
  PlusCircle, 
  Heart, 
  Scale, 
  Menu, 
  X, 
  GraduationCap, 
  Search, 
  Globe,
  PhoneCall,
  Sparkles
} from 'lucide-react';

interface HeaderProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  favoritesCount: number;
  compareCount: number;
  onOpenFavorites: () => void;
  onOpenCompare: () => void;
  onOpenNewAd: () => void;
  onSelectCategory?: (slug: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  setCurrentTab,
  favoritesCount,
  compareCount,
  onOpenFavorites,
  onOpenCompare,
  onOpenNewAd,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState<'AZ' | 'EN' | 'RU'>('AZ');
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Əsas səhifə' },
    { id: 'courses', label: 'Bütün kurslar' },
    { id: 'online', label: 'Online kurslar' },
    { id: 'vip', label: 'VIP Elanlar' },
    { id: 'blog', label: 'Məqalələr' },
    { id: 'contact', label: 'Əlaqə' },
  ];

  const handleNavClick = (id: string) => {
    setCurrentTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E6EAF0] transition-shadow">
      {/* Top micro bar for trust and quick support */}
      <div className="bg-[#182230] text-slate-300 text-xs py-1.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-slate-300">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#12A875]" />
              Azərbaycanın Təhsil və Kurs Marketplace Portalı
            </span>
            <span className="hidden sm:inline text-slate-500">·</span>
            <span className="hidden sm:inline text-slate-400">1,450+ Aktiv Kurs və Təlim Elanları</span>
          </div>

          <div className="flex items-center gap-4">
            <a 
              href="tel:+994125550000" 
              className="hidden md:flex items-center gap-1 text-slate-300 hover:text-white transition-colors"
            >
              <PhoneCall className="w-3 h-3 text-[#315EFB]" />
              <span>Dəstək: (012) 555-00-00</span>
            </a>
            
            {/* Language Switcher */}
            <div className="relative">
              <button 
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-1 text-slate-300 hover:text-white transition-colors font-medium px-1.5 py-0.5 rounded cursor-pointer"
                aria-label="Dili dəyiş"
              >
                <Globe className="w-3 h-3 text-slate-400" />
                <span>{currentLang}</span>
              </button>
              {langDropdownOpen && (
                <div className="absolute right-0 mt-1 w-20 bg-white text-slate-800 rounded-lg shadow-lg border border-[#E6EAF0] py-1 z-50 text-xs">
                  {(['AZ', 'EN', 'RU'] as const).map((lang) => (
                    <button
                      key={lang}
                      onClick={() => {
                        setCurrentLang(lang);
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 hover:bg-slate-50 transition-colors ${
                        currentLang === lang ? 'font-semibold text-[#315EFB]' : ''
                      }`}
                    >
                      {lang === 'AZ' ? 'Azərbaycan' : lang === 'EN' ? 'English' : 'Русский'}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between gap-6">
        {/* Zone 1: Brand Wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <button 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 text-left group cursor-pointer focus:outline-none"
          >
            <div className="w-10 h-10 rounded-xl bg-[#315EFB] flex items-center justify-center text-white shadow-sm shadow-[#315EFB]/20 group-hover:bg-[#284fd6] transition-colors">
              <GraduationCap className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <span className="text-2xl font-bold tracking-tight text-[#182230] leading-none block">
                KURS<span className="text-[#315EFB]">.AZ</span>
              </span>
              <span className="text-[11px] font-medium text-[#667085] tracking-wide block uppercase mt-0.5">
                Təhsil Kataloqu
              </span>
            </div>
          </button>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 text-[14.5px] font-medium text-[#182230]">
          {navLinks.map((link) => {
            const isActive = currentTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`py-1 relative transition-colors cursor-pointer whitespace-nowrap ${
                  isActive 
                    ? 'text-[#315EFB] font-semibold' 
                    : 'text-[#475467] hover:text-[#182230]'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#315EFB] rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Actions & CTAs */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          {/* Favorites Button */}
          <button
            onClick={onOpenFavorites}
            className="relative p-2.5 rounded-xl border border-[#E6EAF0] text-[#475467] hover:text-[#182230] hover:bg-[#F7F8FC] hover:border-slate-300 transition-colors cursor-pointer"
            title="Sevimlilər"
            aria-label="Sevimlilər siyahısı"
          >
            <Heart className={`w-4.5 h-4.5 ${favoritesCount > 0 ? 'fill-rose-500 text-rose-500' : ''}`} />
            {favoritesCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-rose-500 text-white text-[11px] font-bold rounded-full flex items-center justify-center">
                {favoritesCount}
              </span>
            )}
          </button>

          {/* Compare Button */}
          <button
            onClick={onOpenCompare}
            className="relative p-2.5 rounded-xl border border-[#E6EAF0] text-[#475467] hover:text-[#182230] hover:bg-[#F7F8FC] hover:border-slate-300 transition-colors cursor-pointer"
            title="Müqayisə et"
            aria-label="Kursları müqayisə et"
          >
            <Scale className={`w-4.5 h-4.5 ${compareCount > 0 ? 'text-[#315EFB]' : ''}`} />
            {compareCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-[#315EFB] text-white text-[11px] font-bold rounded-full flex items-center justify-center">
                {compareCount}
              </span>
            )}
          </button>

          {/* Primary Action Button: "Elan yerləşdir" */}
          <button
            onClick={onOpenNewAd}
            className="flex items-center gap-2 px-4.5 py-2.5 bg-[#315EFB] hover:bg-[#254edb] active:scale-[0.98] text-white font-semibold text-sm rounded-xl shadow-sm shadow-[#315EFB]/25 transition-all cursor-pointer whitespace-nowrap"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Elan yerləşdir</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-[#475467] hover:text-[#182230] hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Menyu aç/bağla"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-[#E6EAF0] px-4 py-4 space-y-2 shadow-lg animate-in slide-in-from-top duration-200">
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-[#E6EAF0]">
            <button
              onClick={() => {
                onOpenFavorites();
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-slate-50 text-xs font-semibold text-[#182230]"
            >
              <Heart className="w-4 h-4 text-rose-500" />
              <span>Sevimlilər ({favoritesCount})</span>
            </button>
            <button
              onClick={() => {
                onOpenCompare();
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-slate-50 text-xs font-semibold text-[#182230]"
            >
              <Scale className="w-4 h-4 text-[#315EFB]" />
              <span>Müqayisə ({compareCount})</span>
            </button>
          </div>

          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                  currentTab === link.id
                    ? 'bg-[#F1F4FF] text-[#315EFB] font-semibold'
                    : 'text-[#475467] hover:bg-slate-50 hover:text-[#182230]'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-2">
            <button
              onClick={() => {
                onOpenNewAd();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-3 bg-[#315EFB] text-white font-semibold text-sm rounded-xl shadow-sm"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Elan yerləşdir (Pulsuz / VIP)</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
