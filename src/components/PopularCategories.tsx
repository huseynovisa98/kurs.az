import React from 'react';
import { 
  Code, 
  Globe, 
  Laptop, 
  GraduationCap, 
  Briefcase, 
  Palette, 
  Wrench, 
  HeartPulse, 
  Music, 
  Car,
  ArrowRight
} from 'lucide-react';
import { Category } from '../types';

interface PopularCategoriesProps {
  categories: Category[];
  selectedCategory: string;
  onSelectCategory: (categorySlug: string) => void;
}

export const PopularCategories: React.FC<PopularCategoriesProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
}) => {
  const getIcon = (iconName: string) => {
    const props = { className: 'w-5 h-5 text-[#315EFB] group-hover:scale-110 transition-transform' };
    switch (iconName) {
      case 'Code': return <Code {...props} />;
      case 'Globe': return <Globe {...props} />;
      case 'Laptop': return <Laptop {...props} />;
      case 'GraduationCap': return <GraduationCap {...props} />;
      case 'Briefcase': return <Briefcase {...props} />;
      case 'Palette': return <Palette {...props} />;
      case 'Wrench': return <Wrench {...props} />;
      case 'HeartPulse': return <HeartPulse {...props} />;
      case 'Music': return <Music {...props} />;
      case 'Car': return <Car {...props} />;
      default: return <GraduationCap {...props} />;
    }
  };

  return (
    <section className="py-12 bg-[#F7F8FC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-bold text-[#315EFB] uppercase tracking-wider mb-1">
              İxtisaslaşmış Sahələr
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#182230] tracking-tight">
              Populyar Kurs Kateqoriyaları
            </h2>
            <p className="text-sm text-[#667085] mt-1 max-w-2xl">
              İT və xarici dillərdən dövlət qulluğu və biznesə qədər bütün istiqamətlər üzrə ən son elanlar.
            </p>
          </div>

          <button
            onClick={() => onSelectCategory('')}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#315EFB] hover:text-[#254edb] transition-colors cursor-pointer group shrink-0"
          >
            <span>Bütün kateqoriyalara bax</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Categories Grid (Clean 2-to-5 column responsive grid) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-4">
          {categories.map((category) => {
            const isSelected = selectedCategory === category.slug;
            return (
              <button
                key={category.id}
                onClick={() => onSelectCategory(isSelected ? '' : category.slug)}
                className={`group text-left p-4 rounded-xl border transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-white border-[#315EFB] ring-2 ring-[#315EFB]/15 shadow-sm'
                    : 'bg-white border-[#E6EAF0] hover:border-slate-300 hover:shadow-xs'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                    isSelected ? 'bg-[#F1F4FF]' : 'bg-[#F7F8FC] group-hover:bg-[#F1F4FF]'
                  }`}>
                    {getIcon(category.iconName)}
                  </div>
                  <span className="text-[11px] font-semibold text-[#667085] tabular-nums">
                    {category.count} kurs
                  </span>
                </div>

                <div>
                  <h3 className="font-bold text-[#182230] text-sm leading-snug group-hover:text-[#315EFB] transition-colors line-clamp-1">
                    {category.name}
                  </h3>
                  <p className="text-[11px] text-[#667085] line-clamp-1 mt-0.5">
                    {category.subcategories.slice(0, 2).join(', ')}...
                  </p>
                </div>
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
};
