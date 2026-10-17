import React, { useState } from 'react';
import { 
  MapPin, 
  Clock, 
  Award, 
  Heart, 
  Scale, 
  MessageCircle, 
  ArrowUpRight, 
  Check, 
  Sparkles,
  Phone,
  Laptop
} from 'lucide-react';
import { Course } from '../types';
import { getSafeImageUrl } from '../utils/imageUtils';

interface CourseCardProps {
  course: Course;
  onSelectCourse: (course: Course) => void;
  isFavorite: boolean;
  onToggleFavorite: (course: Course) => void;
  isCompared: boolean;
  onToggleCompare: (course: Course) => void;
}

export const CourseCard: React.FC<CourseCardProps> = ({
  course,
  onSelectCourse,
  isFavorite,
  onToggleFavorite,
  isCompared,
  onToggleCompare,
}) => {
  const [imageError, setImageError] = useState(false);

  const getFormatLabel = (fmt: string) => {
    switch (fmt) {
      case 'online':
        return 'Online';
      case 'inperson':
        return 'Əyani';
      case 'hybrid':
        return 'Hibrid';
      default:
        return 'Kurs';
    }
  };

  const getPriceLabel = () => {
    if (course.price === 0) return 'Ödənişsiz';
    return (
      <span className="font-bold text-[#182230] text-lg tabular-nums">
        {course.price} <span className="text-sm font-semibold text-[#315EFB]">₼</span>
        <span className="text-xs font-normal text-[#667085] ml-1">/ {course.priceType}</span>
      </span>
    );
  };

  const handleWhatsAppClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const text = encodeURIComponent(
      `Salam! KURS.AZ saytında gördüyüm "${course.title}" kursu ilə maraqlanıram. Ətraflı məlumat ala bilərəm?`
    );
    window.open(`https://wa.me/${course.whatsapp}?text=${text}`, '_blank');
  };

  const handlePhoneClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.location.href = `tel:${course.phone.replace(/\s+/g, '')}`;
  };

  return (
    <div
      onClick={() => onSelectCourse(course)}
      className={`group relative flex flex-col bg-white rounded-2xl border transition-all duration-200 hover:shadow-md cursor-pointer overflow-hidden ${
        course.isVip 
          ? 'border-[#315EFB]/35 bg-[#FAFBFD] shadow-xs' 
          : 'border-[#E6EAF0] hover:border-slate-300'
      }`}
    >
      {/* Top Image & Visual Slot */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
        {!imageError ? (
          <img
            src={getSafeImageUrl(course.image, course.category)}
            alt={course.title}
            onError={() => setImageError(true)}
            referrerPolicy="no-referrer"
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 text-slate-500 p-4 text-center">
            <Laptop className="w-8 h-8 text-[#315EFB] mb-2 opacity-60" />
            <span className="text-xs font-semibold text-slate-700">{course.category}</span>
            <span className="text-[11px] text-slate-500 line-clamp-1">{course.providerName}</span>
          </div>
        )}

        {/* VIP Marker: discreet, unboxed badge in corner */}
        {course.isVip && (
          <div className="absolute top-3 left-3 bg-[#315EFB] text-white text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-md shadow-sm flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            <span>VIP ELAN</span>
          </div>
        )}

        {/* Quick action buttons on image */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5">
          {/* Favorite Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(course);
            }}
            className={`p-2 rounded-xl backdrop-blur-md transition-all ${
              isFavorite 
                ? 'bg-white text-rose-500 shadow-sm' 
                : 'bg-white/80 hover:bg-white text-slate-600 hover:text-rose-500'
            }`}
            title={isFavorite ? 'Sevimlilərdən sil' : 'Sevimlilərə əlavə et'}
            aria-label="Sevimlilərə əlavə et"
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-rose-500' : ''}`} />
          </button>

          {/* Compare Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleCompare(course);
            }}
            className={`p-2 rounded-xl backdrop-blur-md transition-all ${
              isCompared 
                ? 'bg-[#315EFB] text-white shadow-sm' 
                : 'bg-white/80 hover:bg-white text-slate-600 hover:text-[#315EFB]'
            }`}
            title={isCompared ? 'Müqayisədən çıxar' : 'Müqayisəyə əlavə et'}
            aria-label="Kursu müqayisə et"
          >
            <Scale className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
        <div className="space-y-2">
          
          {/* Unboxed Metadata with Typographic Separator (Zero-Pill Rule) */}
          <div className="flex items-center gap-1.5 text-xs text-[#667085] line-clamp-1">
            <span className="font-medium text-[#315EFB]">{course.category}</span>
            <span aria-hidden="true">·</span>
            <span>{getFormatLabel(course.format)}</span>
            {course.metro && (
              <>
                <span aria-hidden="true">·</span>
                <span className="truncate">{course.metro} m.</span>
              </>
            )}
          </div>

          {/* Course Title */}
          <h3 className="font-bold text-[#182230] text-base leading-snug line-clamp-2 group-hover:text-[#315EFB] transition-colors">
            {course.title}
          </h3>

          {/* Short Description */}
          <p className="text-xs text-[#667085] line-clamp-2 leading-relaxed">
            {course.shortDescription}
          </p>

          {/* Provider / Center Info */}
          <div className="pt-1 flex items-center justify-between text-xs text-[#475467]">
            <div className="flex items-center gap-1.5 truncate">
              <span className="font-medium text-[#182230] truncate">{course.providerName}</span>
            </div>
            {course.certificateProvided && (
              <span className="text-[11px] text-[#12A875] font-medium flex items-center gap-1 shrink-0">
                <Check className="w-3 h-3 stroke-[2.5]" />
                Sertifikatlı
              </span>
            )}
          </div>
        </div>

        {/* Card Footer: Price & Direct Contact */}
        <div className="pt-3 border-t border-[#E6EAF0] flex items-center justify-between gap-2">
          {/* Price display */}
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-semibold text-[#667085]">Qiymət</span>
            <div>{getPriceLabel()}</div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1.5">
            {/* Direct WhatsApp Call */}
            <button
              type="button"
              onClick={handleWhatsAppClick}
              className="p-2 rounded-lg bg-[#12A875]/10 hover:bg-[#12A875]/20 text-[#12A875] transition-colors"
              title="WhatsApp ilə əlaqə saxla"
              aria-label="WhatsApp"
            >
              <MessageCircle className="w-4 h-4" />
            </button>

            {/* Direct Phone Call */}
            <button
              type="button"
              onClick={handlePhoneClick}
              className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-[#182230] transition-colors"
              title="Zəng et"
              aria-label="Zəng"
            >
              <Phone className="w-4 h-4" />
            </button>

            {/* View Details */}
            <div className="flex items-center gap-1 text-xs font-semibold text-[#315EFB] group-hover:translate-x-0.5 transition-transform pl-1">
              <span>Ətraflı</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
