import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { PopularCategories } from './components/PopularCategories';
import { FeaturedVipSection } from './components/FeaturedVipSection';
import { CourseCatalog } from './components/CourseCatalog';
import { CourseDetailModal } from './components/CourseDetailModal';
import { AdSubmissionModal } from './components/AdSubmissionModal';
import { CompareModal } from './components/CompareModal';
import { FavoritesModal } from './components/FavoritesModal';
import { EducationalArticles } from './components/EducationalArticles';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

import { 
  INITIAL_COURSES, 
  CATEGORIES as INITIAL_CATEGORIES, 
  ARTICLES 
} from './data/mockData';
import { Course, Category, FilterState } from './types';

export default function App() {
  // Navigation State
  const [currentTab, setCurrentTab] = useState<string>('home');

  // Courses & Categories State
  const [courses, setCourses] = useState<Course[]>(() => {
    const saved = localStorage.getItem('kursaz_courses');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_COURSES;
      }
    }
    return INITIAL_COURSES;
  });

  const [categories, setCategories] = useState<Category[]>(INITIAL_CATEGORIES);

  // Favorites State
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('kursaz_favorites');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return ['c-101', 'c-102'];
      }
    }
    return ['c-101', 'c-102'];
  });

  // Compare List State (max 3)
  const [compareList, setCompareList] = useState<Course[]>([]);

  // Modals State
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isAdModalOpen, setIsAdModalOpen] = useState(false);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  const [isFavoritesModalOpen, setIsFavoritesModalOpen] = useState(false);

  // Filter State
  const [filterState, setFilterState] = useState<FilterState>({
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

  // Save courses to localStorage when updated
  useEffect(() => {
    localStorage.setItem('kursaz_courses', JSON.stringify(courses));
  }, [courses]);

  // Save favorites to localStorage
  useEffect(() => {
    localStorage.setItem('kursaz_favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Handle Tab Switch Actions
  const handleTabChange = (tab: string) => {
    setCurrentTab(tab);
    if (tab === 'online') {
      setFilterState((prev) => ({ ...prev, format: 'online', onlyVip: false }));
    } else if (tab === 'vip') {
      setFilterState((prev) => ({ ...prev, onlyVip: true, format: 'all' }));
    } else if (tab === 'courses') {
      setFilterState((prev) => ({ ...prev, format: 'all', onlyVip: false }));
    }
  };

  // Toggle Favorite
  const handleToggleFavorite = (course: Course) => {
    setFavorites((prev) => {
      if (prev.includes(course.id)) {
        return prev.filter((id) => id !== course.id);
      } else {
        return [...prev, course.id];
      }
    });
  };

  // Toggle Compare
  const handleToggleCompare = (course: Course) => {
    setCompareList((prev) => {
      const exists = prev.some((c) => c.id === course.id);
      if (exists) {
        return prev.filter((c) => c.id !== course.id);
      } else {
        if (prev.length >= 3) {
          alert('Eyni anda ən çox 3 kursu müqayisə edə bilərsiniz.');
          return prev;
        }
        return [...prev, course];
      }
    });
  };

  // Search from Hero
  const handleHeroSearch = (query: string, categorySlug: string, format: string, city: string) => {
    setFilterState((prev) => ({
      ...prev,
      searchQuery: query,
      categorySlug: categorySlug,
      format: format as any,
      city: city || 'Bütün şəhərlər',
      onlyVip: false,
    }));
    setCurrentTab('courses');
    const catalogEl = document.getElementById('kurslar-catalog');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Select Category from Bento or Footer
  const handleSelectCategory = (categorySlug: string) => {
    setFilterState((prev) => ({
      ...prev,
      categorySlug,
      onlyVip: false,
    }));
    setCurrentTab('courses');
    const catalogEl = document.getElementById('kurslar-catalog');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Course Created via Ad Submission
  const handleCourseCreated = (newCourse: Course) => {
    setCourses((prev) => [newCourse, ...prev]);
    // Update category count
    setCategories((prev) =>
      prev.map((c) =>
        c.slug === newCourse.categorySlug
          ? { ...c, count: c.count + 1 }
          : c
      )
    );
  };

  // Filtered VIP courses for featured banner
  const vipCourses = courses.filter((c) => c.isVip);

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F8FC] text-[#182230]">
      {/* Top Header */}
      <Header
        currentTab={currentTab}
        setCurrentTab={handleTabChange}
        favoritesCount={favorites.length}
        compareCount={compareList.length}
        onOpenFavorites={() => setIsFavoritesModalOpen(true)}
        onOpenCompare={() => setIsCompareModalOpen(true)}
        onOpenNewAd={() => setIsAdModalOpen(true)}
        onSelectCategory={handleSelectCategory}
      />

      {/* Main Page Views */}
      <main className="flex-1">
        {currentTab === 'home' && (
          <>
            {/* 1. Hero with Unified Search Bar */}
            <Hero
              onSearch={handleHeroSearch}
              onSelectCategory={handleSelectCategory}
            />

            {/* 2. Popular Categories Bento Section */}
            <PopularCategories
              categories={categories}
              selectedCategory={filterState.categorySlug}
              onSelectCategory={handleSelectCategory}
            />

            {/* 3. Featured & VIP Listings Section */}
            <FeaturedVipSection
              vipCourses={vipCourses}
              onSelectCourse={(c) => setSelectedCourse(c)}
              favorites={favorites}
              onToggleFavorite={handleToggleFavorite}
              compareList={compareList}
              onToggleCompare={handleToggleCompare}
              onOpenNewAd={() => setIsAdModalOpen(true)}
            />

            {/* 4. Full Course Catalog with Sticky Filter Engine */}
            <CourseCatalog
              courses={courses}
              categories={categories}
              filterState={filterState}
              setFilterState={setFilterState}
              onSelectCourse={(c) => setSelectedCourse(c)}
              favorites={favorites}
              onToggleFavorite={handleToggleFavorite}
              compareList={compareList}
              onToggleCompare={handleToggleCompare}
            />

            {/* 5. Educational Guides & Articles */}
            <EducationalArticles articles={ARTICLES} />

            {/* 6. Contact & Support Section */}
            <ContactSection />
          </>
        )}

        {currentTab === 'courses' && (
          <div className="pt-6">
            <CourseCatalog
              courses={courses}
              categories={categories}
              filterState={filterState}
              setFilterState={setFilterState}
              onSelectCourse={(c) => setSelectedCourse(c)}
              favorites={favorites}
              onToggleFavorite={handleToggleFavorite}
              compareList={compareList}
              onToggleCompare={handleToggleCompare}
              title="KURS.AZ Kataloqu"
              subtitle="Bakı və bölgələr üzrə bütün təsdiqlənmiş kurs və təlim elanları."
            />
          </div>
        )}

        {currentTab === 'online' && (
          <div className="pt-6">
            <CourseCatalog
              courses={courses.filter((c) => c.format === 'online' || c.format === 'hybrid')}
              categories={categories}
              filterState={filterState}
              setFilterState={setFilterState}
              onSelectCourse={(c) => setSelectedCourse(c)}
              favorites={favorites}
              onToggleFavorite={handleToggleFavorite}
              compareList={compareList}
              onToggleCompare={handleToggleCompare}
              title="Online Kurslar və Məsafədən Təhsil"
              subtitle="Evdən çıxmadan Zoom, Google Meet və interaktiv platformalarda canlı tədris."
            />
          </div>
        )}

        {currentTab === 'vip' && (
          <div className="pt-6">
            <CourseCatalog
              courses={vipCourses}
              categories={categories}
              filterState={filterState}
              setFilterState={setFilterState}
              onSelectCourse={(c) => setSelectedCourse(c)}
              favorites={favorites}
              onToggleFavorite={handleToggleFavorite}
              compareList={compareList}
              onToggleCompare={handleToggleCompare}
              title="VIP və Premium Elanlar"
              subtitle="Platformanın ən yüksək reytinqli və rəsmi yoxlanılmış təhsil mərkəzləri."
            />
          </div>
        )}

        {currentTab === 'blog' && (
          <div className="pt-6">
            <EducationalArticles articles={ARTICLES} />
          </div>
        )}

        {currentTab === 'contact' && (
          <div className="pt-6">
            <ContactSection />
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer
        onSelectCategory={handleSelectCategory}
        onNavigateTab={handleTabChange}
        onOpenNewAd={() => setIsAdModalOpen(true)}
      />

      {/* Modals */}
      {selectedCourse && (
        <CourseDetailModal
          course={selectedCourse}
          onClose={() => setSelectedCourse(null)}
          isFavorite={favorites.includes(selectedCourse.id)}
          onToggleFavorite={handleToggleFavorite}
          isCompared={compareList.some((c) => c.id === selectedCourse.id)}
          onToggleCompare={handleToggleCompare}
        />
      )}

      {isAdModalOpen && (
        <AdSubmissionModal
          isOpen={isAdModalOpen}
          onClose={() => setIsAdModalOpen(false)}
          categories={categories}
          onCourseCreated={handleCourseCreated}
        />
      )}

      {isCompareModalOpen && (
        <CompareModal
          isOpen={isCompareModalOpen}
          onClose={() => setIsCompareModalOpen(false)}
          compareList={compareList}
          onRemoveFromCompare={(id) => setCompareList((prev) => prev.filter((c) => c.id !== id))}
          onClearCompare={() => setCompareList([])}
          onSelectCourse={(c) => setSelectedCourse(c)}
        />
      )}

      {isFavoritesModalOpen && (
        <FavoritesModal
          isOpen={isFavoritesModalOpen}
          onClose={() => setIsFavoritesModalOpen(false)}
          favorites={favorites}
          allCourses={courses}
          onRemoveFavorite={handleToggleFavorite}
          onSelectCourse={(c) => setSelectedCourse(c)}
        />
      )}
    </div>
  );
}
