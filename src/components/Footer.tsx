import React from 'react';
import { GraduationCap, Phone, Mail, MapPin, Heart } from 'lucide-react';
import { CATEGORIES } from '../data/mockData';

interface FooterProps {
  onSelectCategory: (slug: string) => void;
  onNavigateTab: (tab: string) => void;
  onOpenNewAd: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCategory,
  onNavigateTab,
  onOpenNewAd,
}) => {
  return (
    <footer className="bg-[#182230] text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand & Summary */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#315EFB] flex items-center justify-center text-white">
                <GraduationCap className="w-5 h-5 stroke-[2.2]" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                KURS<span className="text-[#315EFB]">.AZ</span>
              </span>
            </div>
            
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Azərbaycanın aparıcı kurs və təhsil elanları marketplace platforması. Məqsədimiz tələbələrlə ən yaxşı tədris mərkəzləri və repetitorları etibarlı şəkildə birləşdirməkdir.
            </p>

            <div className="space-y-1.5 text-xs text-slate-400 pt-2">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#315EFB]" />
                <span>Dəstək: (012) 555-00-00 / (050) 200-11-22</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#315EFB]" />
                <span>info@kurs.az / reklam@kurs.az</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#315EFB]" />
                <span>Bakı, Nizami küç. 142, AF Business House</span>
              </div>
            </div>
          </div>

          {/* Popular Categories Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Populyar Kurslar
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              {CATEGORIES.slice(0, 6).map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => onSelectCategory(cat.slug)}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    {cat.name} ({cat.count})
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Bölmələr
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => onNavigateTab('courses')} className="hover:text-white transition-colors">
                  Bütün Kurslar
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('online')} className="hover:text-white transition-colors">
                  Online Kurslar
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('vip')} className="hover:text-white transition-colors">
                  VIP Elanlar
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('blog')} className="hover:text-white transition-colors">
                  Təhsil Bloqu
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('contact')} className="hover:text-white transition-colors">
                  Əlaqə & Reklam
                </button>
              </li>
            </ul>
          </div>

          {/* Action Box: Elan yerləşdir */}
          <div className="lg:col-span-3 space-y-4 bg-slate-800/40 p-5 rounded-2xl border border-slate-700/60">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Tədris Mərkəzləri Üçün
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Kurslarınızı portalda yerləşdirin və hər gün minlərlə potensial tələbəyə çatın.
            </p>
            <button
              onClick={onOpenNewAd}
              className="w-full py-2.5 px-4 bg-[#315EFB] hover:bg-[#254edb] text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer text-center block"
            >
              + Elan yerləşdir (Pulsuz / VIP)
            </button>
          </div>

        </div>

        {/* Bottom Strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} KURS.AZ. Bütün hüquqlar qorunur.
          </div>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-400 cursor-pointer">İstifadəçi Qaydaları</span>
            <span className="hover:text-slate-400 cursor-pointer">Məxfilik Siyasəti</span>
            <span className="hover:text-slate-400 cursor-pointer">VIP Xidmətlər</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
