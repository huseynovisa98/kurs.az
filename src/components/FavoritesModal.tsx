import React from 'react';
import { X, Heart, Trash2, ArrowRight, MessageCircle } from 'lucide-react';
import { Course } from '../types';

interface FavoritesModalProps {
  isOpen: boolean;
  onClose: () => void;
  favorites: string[];
  allCourses: Course[];
  onRemoveFavorite: (course: Course) => void;
  onSelectCourse: (course: Course) => void;
}

export const FavoritesModal: React.FC<FavoritesModalProps> = ({
  isOpen,
  onClose,
  favorites,
  allCourses,
  onRemoveFavorite,
  onSelectCourse,
}) => {
  if (!isOpen) return null;

  const favoriteCourses = allCourses.filter((c) => favorites.includes(c.id));

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="relative bg-white w-full max-w-2xl rounded-2xl sm:rounded-3xl shadow-2xl border border-[#E6EAF0] overflow-hidden my-auto max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E6EAF0] bg-slate-50">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
            <div>
              <h2 className="font-extrabold text-base text-[#182230]">
                Sevimli Kurslarım ({favoriteCourses.length})
              </h2>
              <span className="text-xs text-[#667085]">
                Daha sonra nəzərdən keçirmək üçün yadda saxladığınız elanlar
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-6 flex-1">
          {favoriteCourses.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <Heart className="w-12 h-12 text-slate-300 mx-auto" />
              <div className="text-sm font-bold text-[#182230]">
                Sevimlilər siyahınız boşdur
              </div>
              <p className="text-xs text-[#667085] max-w-sm mx-auto">
                Bəyəndiyiniz kursların kartındakı ürək ikonuna klikləyərək onları burada saxlaya bilərsiniz.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {favoriteCourses.map((course) => (
                <div
                  key={course.id}
                  className="flex items-center justify-between gap-4 p-3.5 rounded-xl border border-[#E6EAF0] hover:border-slate-300 transition-colors bg-white"
                >
                  <div 
                    onClick={() => {
                      onSelectCourse(course);
                      onClose();
                    }}
                    className="flex items-center gap-3 cursor-pointer flex-1 min-w-0"
                  >
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-14 h-14 rounded-lg object-cover shrink-0 bg-slate-100"
                    />
                    <div className="min-w-0">
                      <div className="text-xs text-[#667085]">{course.category}</div>
                      <h4 className="font-bold text-xs sm:text-sm text-[#182230] truncate hover:text-[#315EFB] transition-colors">
                        {course.title}
                      </h4>
                      <div className="text-xs font-bold text-[#315EFB] tabular-nums mt-0.5">
                        {course.price} ₼ <span className="text-[11px] font-normal text-[#667085]">/ {course.priceType}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => onRemoveFavorite(course)}
                      className="p-2 text-slate-400 hover:text-rose-500 rounded-lg hover:bg-rose-50 transition-colors"
                      title="Sevimlilərdən sil"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        onSelectCourse(course);
                        onClose();
                      }}
                      className="px-3 py-1.5 bg-[#315EFB] text-white text-xs font-semibold rounded-lg hover:bg-[#254edb] transition-colors"
                    >
                      Baxış
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
