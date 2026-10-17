import React, { useState } from 'react';
import { Search, MapPin, Layers, ArrowRight, CheckCircle2, ShieldCheck, Users, Sparkles } from 'lucide-react';
import { CATEGORIES, CITIES, HERO_IMAGE } from '../data/mockData';

interface HeroProps {
  onSearch: (query: string, categorySlug: string, format: string, city: string) => void;
  onSelectCategory: (slug: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onSearch, onSelectCategory }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedFormat, setSelectedFormat] = useState('all');
  const [imageError, setImageError] = useState(false);

  const popularQueries = [
    { label: 'İngilis dili', cat: 'xarici-diller', term: 'İngilis' },
    { label: 'Frontend & React', cat: 'it-ve-proqramlasdirma', term: 'Frontend' },
    { label: '1C Mühasibatlıq', cat: 'komputer-kurslari', term: '1C' },
    { label: 'Dövlət qulluğu', cat: 'imtahana-hazirliq', term: 'Dövlət Qulluğu' },
    { label: 'UI/UX Dizayn', cat: 'dizayn-ve-memarliq', term: 'UI/UX' },
    { label: 'Sürücülük', cat: 'suruculuk-kurslari', term: 'Sürücülük' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery, selectedCategory, selectedFormat, selectedCity);
  };

  const handleQuickTagClick = (term: string, catSlug: string) => {
    setSearchQuery(term);
    setSelectedCategory(catSlug);
    onSearch(term, catSlug, 'all', '');
  };

  return (
    <section className="relative pt-6 pb-12 sm:pt-10 sm:pb-16 bg-[#F7F8FC] border-b border-[#E6EAF0] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Headline, Search, Value Propositions */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Trust badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-[#E6EAF0] rounded-full text-xs font-semibold text-[#315EFB] shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-[#12A875]" />
              <span>Azərbaycanın ən geniş təhsil və kurs kəşf bazarı</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-3">
              <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-[#182230] leading-[1.15] tracking-tight">
                Özünə uyğun kursu <br className="hidden sm:inline" />
                <span className="text-[#315EFB]">asanlıqla tap.</span>
              </h1>
              <p className="text-base sm:text-lg text-[#667085] max-w-xl leading-relaxed">
                Müxtəlif sahələr üzrə kursları araşdır, qiymətləri müqayisə et və növbəti inkişaf addımını seç.
              </p>
            </div>

            {/* Unified Search Box */}
            <div className="bg-white p-3 sm:p-4 rounded-2xl border border-[#E6EAF0] shadow-sm">
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-2.5">
                  
                  {/* Search Query Input */}
                  <div className="sm:col-span-6 relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#667085]">
                      <Search className="w-4.5 h-4.5 text-slate-400" />
                    </div>
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Kurs adı və ya açar söz (məs: IELTS, Python)..."
                      className="w-full pl-10 pr-3 py-3 text-sm rounded-xl border border-[#E6EAF0] bg-slate-50/50 hover:bg-white focus:bg-white focus:border-[#315EFB] focus:ring-2 focus:ring-[#315EFB]/10 outline-none transition-all placeholder:text-slate-400"
                    />
                  </div>

                  {/* Category Dropdown */}
                  <div className="sm:col-span-3 relative">
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full py-3 px-3 text-sm rounded-xl border border-[#E6EAF0] bg-slate-50/50 hover:bg-white focus:bg-white focus:border-[#315EFB] focus:ring-2 focus:ring-[#315EFB]/10 outline-none transition-all text-[#182230] cursor-pointer"
                    >
                      <option value="">Bütün kateqoriyalar</option>
                      {CATEGORIES.map((cat) => (
                        <option key={cat.id} value={cat.slug}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Format / City Dropdown */}
                  <div className="sm:col-span-3 relative">
                    <select
                      value={selectedFormat}
                      onChange={(e) => setSelectedFormat(e.target.value)}
                      className="w-full py-3 px-3 text-sm rounded-xl border border-[#E6EAF0] bg-slate-50/50 hover:bg-white focus:bg-white focus:border-[#315EFB] focus:ring-2 focus:ring-[#315EFB]/10 outline-none transition-all text-[#182230] cursor-pointer"
                    >
                      <option value="all">Bütün formatlar</option>
                      <option value="online">Yalnız Onlayn</option>
                      <option value="inperson">Yalnız Əyani (Bakı)</option>
                      <option value="hybrid">Hibrid (Onlayn + Əyani)</option>
                    </select>
                  </div>
                </div>

                {/* Submit Row & Clear */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-1">
                  <div className="flex items-center gap-2 text-xs text-[#667085]">
                    <ShieldCheck className="w-4 h-4 text-[#12A875]" />
                    <span>Real qiymətlər və birbaşa tədris mərkəzi əlaqələri</span>
                  </div>

                  <button
                    type="submit"
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-[#315EFB] hover:bg-[#254edb] active:scale-[0.99] text-white font-semibold text-sm rounded-xl shadow-sm transition-all cursor-pointer"
                  >
                    <Search className="w-4 h-4" />
                    <span>Kursları axtar</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Popular Search Tags */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="font-semibold text-[#182230]">Populyar axtarışlar:</span>
              {popularQueries.map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => handleQuickTagClick(item.term, item.cat)}
                  className="px-2.5 py-1 rounded-lg bg-white border border-[#E6EAF0] text-[#475467] hover:text-[#315EFB] hover:border-[#315EFB]/40 hover:bg-blue-50/40 transition-colors cursor-pointer"
                >
                  {item.label}
                </button>
              ))}
            </div>

          </div>

          {/* Right Column: Hero Visual Asset & Key Metrics Strip */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-[#E6EAF0] shadow-md bg-white aspect-[4/3] sm:aspect-[16/11]">
              {!imageError ? (
                <img
                  src={HERO_IMAGE}
                  alt="Azərbaycan tələbələri tədris mərkəzində"
                  className="w-full h-full object-cover"
                  loading="eager"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-slate-100 p-8 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-[#315EFB]/10 text-[#315EFB] flex items-center justify-center mb-3">
                    <Sparkles className="w-8 h-8" />
                  </div>
                  <h3 className="font-extrabold text-lg text-[#182230]">Azərbaycanın Kurs Bazarı</h3>
                  <p className="text-xs text-[#667085] mt-1">1,450+ təsdiqlənmiş tədris elanları və kurslar</p>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[#182230]/75 via-transparent to-transparent pointer-events-none" />

              {/* Floating Verified Badge */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-3.5 rounded-xl border border-white/60 shadow-lg flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-[#182230] flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#12A875]" />
                    <span>100% Yoxlanılmış Elanlar</span>
                  </div>
                  <p className="text-[11px] text-[#667085] mt-0.5">
                    Hər gün yenilənən dərslər və tədris qrafikləri
                  </p>
                </div>
                <div className="text-right pl-3 border-l border-slate-200">
                  <div className="text-sm font-extrabold text-[#315EFB] tabular-nums">
                    1,450+
                  </div>
                  <div className="text-[10px] text-[#667085]">Aktiv Kurs</div>
                </div>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-3 mt-4">
              <div className="bg-white p-3 rounded-xl border border-[#E6EAF0] text-center shadow-2xs">
                <div className="text-lg font-bold text-[#182230] tabular-nums">180+</div>
                <div className="text-[11px] text-[#667085]">Tədris Mərkəzi</div>
              </div>
              <div className="bg-white p-3 rounded-xl border border-[#E6EAF0] text-center shadow-2xs">
                <div className="text-lg font-bold text-[#315EFB] tabular-nums">10+</div>
                <div className="text-[11px] text-[#667085]">Əsas Kateqoriya</div>
              </div>
              <div className="bg-white p-3 rounded-xl border border-[#E6EAF0] text-center shadow-2xs">
                <div className="text-lg font-bold text-[#12A875] tabular-nums">0 ₼</div>
                <div className="text-[11px] text-[#667085]">Pulsuz Qeydiyyat</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
