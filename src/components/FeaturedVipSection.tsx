import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { Course } from '../types';
import { CourseCard } from './CourseCard';

interface FeaturedVipSectionProps {
  vipCourses: Course[];
  onSelectCourse: (course: Course) => void;
  favorites: string[];
  onToggleFavorite: (course: Course) => void;
  compareList: Course[];
  onToggleCompare: (course: Course) => void;
  onOpenNewAd: () => void;
}

export const FeaturedVipSection: React.FC<FeaturedVipSectionProps> = ({
  vipCourses,
  onSelectCourse,
  favorites,
  onToggleFavorite,
  compareList,
  onToggleCompare,
  onOpenNewAd,
}) => {
  if (vipCourses.length === 0) return null;

  return (
    <section className="py-12 bg-[#F1F4FF]/60 border-y border-[#E6EAF0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#315EFB] uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5 text-[#315EFB]" />
              <span>Seçilmiş Təkliflər</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#182230] tracking-tight">
              VIP və Premium Kurs Elanları
            </h2>
            <p className="text-sm text-[#667085] mt-1 max-w-2xl">
              Aparıcı tədris mərkəzləri və peşəkar təlimçilərin ən çox tələb olunan proqramları.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenNewAd}
              className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-[#315EFB]/30 text-[#315EFB] hover:bg-[#315EFB] hover:text-white transition-colors cursor-pointer"
            >
              VIP Elan Yerləşdir
            </button>
          </div>
        </div>

        {/* VIP Course Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {vipCourses.slice(0, 4).map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              onSelectCourse={onSelectCourse}
              isFavorite={favorites.includes(course.id)}
              onToggleFavorite={onToggleFavorite}
              isCompared={compareList.some((c) => c.id === course.id)}
              onToggleCompare={onToggleCompare}
            />
          ))}
        </div>

      </div>
    </section>
  );
};
