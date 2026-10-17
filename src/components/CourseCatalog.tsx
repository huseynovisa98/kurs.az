import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  RotateCcw, 
  SlidersHorizontal, 
  LayoutGrid, 
  List, 
  ChevronDown,
  Sparkles,
  MapPin,
  X
} from 'lucide-react';
import { Course, Category, FilterState } from '../types';
import { CourseCard } from './CourseCard';
import { BAKU_METRO_STATIONS, CITIES } from '../data/mockData';

interface CourseCatalogProps {
  courses: Course[];
  categories: Category[];
  filterState: FilterState;
  setFilterState: React.Dispatch<React.SetStateAction<FilterState>>;
  onSelectCourse: (course: Course) => void;
  favorites: string[];
  onToggleFavorite: (course: Course) => void;
  compareList: Course[];
  onToggleCompare: (course: Course) => void;
  title?: string;
  subtitle?: string;
}

export const CourseCatalog: React.FC<CourseCatalogProps> = ({
  courses,
  categories,
  filterState,
  setFilterState,
  onSelectCourse,
  favorites,
  onToggleFavorite,
  compareList,
  onToggleCompare,
  title = "Bütün Kurs Elanları",
  subtitle = "Geniş filtr paneli ilə ehtiyacınıza və büdcənizə ən uyğun kursu seçin."
}) => {
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Filter & Sort Logic
  const filteredCourses = useMemo(() => {
    return courses.filter((c) => {
      // Search Query
      if (filterState.searchQuery.trim()) {
        const q = filterState.searchQuery.toLowerCase();
        const matchesTitle = c.title.toLowerCase().includes(q);
        const matchesCategory = c.category.toLowerCase().includes(q);
        const matchesSubcategory = c.subcategory.toLowerCase().includes(q);
        const matchesProvider = c.providerName.toLowerCase().includes(q);
        const matchesDescription = c.shortDescription.toLowerCase().includes(q);
        if (!matchesTitle && !matchesCategory && !matchesSubcategory && !matchesProvider && !matchesDescription) {
          return false;
        }
      }

      // Category
      if (filterState.categorySlug && filterState.categorySlug !== 'all') {
        if (c.categorySlug !== filterState.categorySlug) {
          return false;
        }
      }

      // Format
      if (filterState.format !== 'all') {
        if (c.format !== filterState.format) {
          return false;
        }
      }

      // Min Price
      if (filterState.minPrice !== null && filterState.minPrice > 0) {
        if (c.price < filterState.minPrice) {
          return false;
        }
      }

      // Max Price
      if (filterState.maxPrice !== null && filterState.maxPrice > 0) {
        if (c.price > filterState.maxPrice) {
          return false;
        }
      }

      // Metro
      if (filterState.metro && filterState.metro !== 'Bütün stansiyalar') {
        if (c.metro !== filterState.metro) {
          return false;
        }
      }

      // VIP only
      if (filterState.onlyVip) {
        if (!c.isVip) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (filterState.sortBy === 'price_asc') {
        return a.price - b.price;
      }
      if (filterState.sortBy === 'price_desc') {
        return b.price - a.price;
      }
      if (filterState.sortBy === 'popular') {
        return b.viewsCount - a.viewsCount;
      }
      // 'newest' default
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [courses, filterState]);

  const handleResetFilters = () => {
    setFilterState({
      searchQuery: '',
      categorySlug: '',
      format: 'all',
      minPrice: null,
      maxPrice: null,
      metro: 'Bütün stansiyalar',
      city: 'Bütün şəhərlər',
      sortBy: 'newest',
      onlyVip: false,
    });
  };

  const hasActiveFilters = 
    filterState.searchQuery.trim() !== '' ||
    filterState.categorySlug !== '' ||
    filterState.format !== 'all' ||
    filterState.minPrice !== null ||
    filterState.maxPrice !== null ||
    (filterState.metro !== '' && filterState.metro !== 'Bütün stansiyalar') ||
    filterState.onlyVip;

  return (
    <section id="kurslar-catalog" className="py-12 bg-[#F7F8FC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Top Title & Toolbar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#182230] tracking-tight">
              {title}
            </h2>
            <p className="text-sm text-[#667085] mt-1">
              {subtitle}
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* View Mode Toggle */}
            <div className="hidden sm:flex items-center bg-white p-1 rounded-xl border border-[#E6EAF0]">
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  viewMode === 'grid' 
                    ? 'bg-[#F1F4FF] text-[#315EFB]' 
                    : 'text-[#667085] hover:text-[#182230]'
                }`}
                title="Şəbəkə görünüşü"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  viewMode === 'list' 
                    ? 'bg-[#F1F4FF] text-[#315EFB]' 
                    : 'text-[#667085] hover:text-[#182230]'
                }`}
                title="Siyahı görünüşü"
              >
                <List className="w-4 h-4" />
              </button>
            </div>

            {/* Mobile filter toggle */}
            <button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="lg:hidden flex items-center gap-2 px-3.5 py-2 bg-white rounded-xl border border-[#E6EAF0] text-xs font-semibold text-[#182230]"
            >
              <SlidersHorizontal className="w-4 h-4 text-[#315EFB]" />
              <span>Filtrlər {hasActiveFilters && '(Aktiv)'}</span>
            </button>
          </div>
        </div>

        {/* Catalog Main Layout: Sticky Filters Left, Results Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Filters Sidebar (Desktop) */}
          <aside className={`lg:col-span-3 bg-white p-5 rounded-2xl border border-[#E6EAF0] shadow-2xs space-y-5 ${
            showMobileFilters ? 'block' : 'hidden lg:block'
          }`}>
            
            <div className="flex items-center justify-between pb-3 border-b border-[#E6EAF0]">
              <div className="flex items-center gap-2 font-bold text-sm text-[#182230]">
                <Filter className="w-4 h-4 text-[#315EFB]" />
                <span>Filtrləmə</span>
              </div>
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="flex items-center gap-1 text-xs text-[#315EFB] hover:text-[#254edb] font-medium cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Sıfırla</span>
                </button>
              )}
            </div>

            {/* Search Input Filter */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#182230]">Açar söz</label>
              <div className="relative">
                <input
                  type="text"
                  value={filterState.searchQuery}
                  onChange={(e) => setFilterState((prev) => ({ ...prev, searchQuery: e.target.value }))}
                  placeholder="Kurs və ya mərkəz adı..."
                  className="w-full pl-8 pr-3 py-2 text-xs rounded-xl border border-[#E6EAF0] bg-slate-50/50 hover:bg-white focus:bg-white focus:border-[#315EFB] outline-none"
                />
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
              </div>
            </div>

            {/* Category Filter */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#182230]">Kateqoriya</label>
              <select
                value={filterState.categorySlug}
                onChange={(e) => setFilterState((prev) => ({ ...prev, categorySlug: e.target.value }))}
                className="w-full p-2.5 text-xs rounded-xl border border-[#E6EAF0] bg-slate-50/50 text-[#182230] cursor-pointer outline-none focus:border-[#315EFB]"
              >
                <option value="">Bütün kateqoriyalar</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.slug}>
                    {cat.name} ({cat.count})
                  </option>
                ))}
              </select>
            </div>

            {/* Format Filter */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#182230]">Tədris Forması</label>
              <div className="grid grid-cols-2 gap-1.5 p-1 bg-slate-50 rounded-xl border border-[#E6EAF0]">
                {[
                  { id: 'all', label: 'Hamısı' },
                  { id: 'online', label: 'Online' },
                  { id: 'inperson', label: 'Əyani' },
                  { id: 'hybrid', label: 'Hibrid' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setFilterState((prev) => ({ ...prev, format: item.id as any }))}
                    className={`py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                      filterState.format === item.id
                        ? 'bg-white text-[#315EFB] shadow-2xs font-semibold'
                        : 'text-[#667085] hover:text-[#182230]'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range Filter */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-[#182230]">Aylıq Qiymət (₼ AZN)</label>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <input
                    type="number"
                    min="0"
                    placeholder="Min ₼"
                    value={filterState.minPrice ?? ''}
                    onChange={(e) => setFilterState((prev) => ({
                      ...prev,
                      minPrice: e.target.value ? Number(e.target.value) : null,
                    }))}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-[#E6EAF0] bg-slate-50/50 outline-none focus:border-[#315EFB]"
                  />
                </div>
                <div>
                  <input
                    type="number"
                    min="0"
                    placeholder="Maks ₼"
                    value={filterState.maxPrice ?? ''}
                    onChange={(e) => setFilterState((prev) => ({
                      ...prev,
                      maxPrice: e.target.value ? Number(e.target.value) : null,
                    }))}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-[#E6EAF0] bg-slate-50/50 outline-none focus:border-[#315EFB]"
                  />
                </div>
              </div>
            </div>

            {/* Metro Station Filter */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#182230]">Metro Stansiyası (Bakı)</label>
              <select
                value={filterState.metro}
                onChange={(e) => setFilterState((prev) => ({ ...prev, metro: e.target.value }))}
                className="w-full p-2.5 text-xs rounded-xl border border-[#E6EAF0] bg-slate-50/50 text-[#182230] cursor-pointer outline-none focus:border-[#315EFB]"
              >
                {BAKU_METRO_STATIONS.map((station) => (
                  <option key={station} value={station}>
                    {station}
                  </option>
                ))}
              </select>
            </div>

            {/* VIP Only Checkbox */}
            <div className="pt-2 border-t border-[#E6EAF0]">
              <label className="flex items-center gap-2.5 text-xs font-semibold text-[#182230] cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={filterState.onlyVip}
                  onChange={(e) => setFilterState((prev) => ({ ...prev, onlyVip: e.target.checked }))}
                  className="w-4 h-4 rounded text-[#315EFB] focus:ring-[#315EFB] border-slate-300"
                />
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#315EFB]" />
                  Yalnız VIP Elanları göstər
                </span>
              </label>
            </div>

            {/* Mobile close filters button */}
            {showMobileFilters && (
              <button
                type="button"
                onClick={() => setShowMobileFilters(false)}
                className="w-full py-2.5 bg-[#315EFB] text-white rounded-xl text-xs font-semibold"
              >
                Nəticələri göstər ({filteredCourses.length})
              </button>
            )}

          </aside>

          {/* Results Main Column */}
          <div className="lg:col-span-9 space-y-4">
            
            {/* Results Header: Count & Sorting */}
            <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-[#E6EAF0] shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="text-sm font-semibold text-[#182230]">
                <span>Tapıldı: </span>
                <span className="text-[#315EFB] font-bold tabular-nums">
                  {filteredCourses.length} kurs elanı
                </span>
                {filterState.categorySlug && (
                  <span className="text-xs text-[#667085] ml-2">
                    ({categories.find((c) => c.slug === filterState.categorySlug)?.name})
                  </span>
                )}
              </div>

              {/* Sort selector */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-[#667085] whitespace-nowrap">Sıralama:</span>
                <select
                  value={filterState.sortBy}
                  onChange={(e) => setFilterState((prev) => ({ ...prev, sortBy: e.target.value as any }))}
                  className="p-1.5 text-xs rounded-lg border border-[#E6EAF0] bg-slate-50 text-[#182230] font-medium outline-none cursor-pointer focus:border-[#315EFB]"
                >
                  <option value="newest">Ən yenilər</option>
                  <option value="price_asc">Qiymət: Ucuzdan bahaya</option>
                  <option value="price_desc">Qiymət: Bahadan ucuza</option>
                  <option value="popular">Ən çox baxılan</option>
                </select>
              </div>
            </div>

            {/* Course Cards Grid */}
            {filteredCourses.length > 0 ? (
              <div className={`grid gap-5 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3' 
                  : 'grid-cols-1'
              }`}>
                {filteredCourses.map((course) => (
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
            ) : (
              /* Empty State */
              <div className="bg-white rounded-2xl border border-[#E6EAF0] p-12 text-center space-y-4 shadow-2xs">
                <div className="w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
                  <Search className="w-7 h-7" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-[#182230]">
                    Axtarışa uyğun kurs tapılmadı
                  </h3>
                  <p className="text-xs text-[#667085] max-w-md mx-auto">
                    Seçilmiş filtrlər üzrə hazırda aktiv elan yoxdur. Zəhmət olmasa filtrləri dəyişin və ya axtarış sorğusunu genişləndirin.
                  </p>
                </div>
                <div>
                  <button
                    type="button"
                    onClick={handleResetFilters}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#F1F4FF] text-[#315EFB] font-semibold text-xs rounded-xl hover:bg-[#315EFB] hover:text-white transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Filtrləri sıfırla</span>
                  </button>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
