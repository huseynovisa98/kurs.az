export type CourseFormat = 'online' | 'inperson' | 'hybrid';

export interface Course {
  id: string;
  title: string;
  slug: string;
  category: string;
  categorySlug: string;
  subcategory: string;
  price: number; // in AZN
  priceType: 'aylıq' | 'ümumi' | 'dərs başı' | 'razılaşma';
  isVip: boolean;
  isPremium?: boolean;
  format: CourseFormat;
  city: string;
  metro?: string;
  providerName: string;
  providerLogo?: string;
  phone: string;
  whatsapp: string;
  address: string;
  shortDescription: string;
  fullDescription: string;
  outline: string[];
  duration: string; // e.g. "3 ay", "6 ay", "48 akademik saat"
  schedule: string; // e.g. "Həftədə 3 dəfə, 1.5 saat"
  certificateProvided: boolean;
  level: 'Sıfırdan' | 'Orta' | 'İrəli səviyyə' | 'Bütün səviyyələr';
  image: string;
  viewsCount: number;
  createdAt: string;
  instructorName?: string;
  instructorRole?: string;
  freeTrial: boolean;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  description: string;
  count: number;
  iconName: string;
  subcategories: string[];
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string[];
  readTime: string;
  date: string;
  author: string;
  category: string;
  image: string;
}

export interface FilterState {
  searchQuery: string;
  categorySlug: string;
  format: 'all' | 'online' | 'inperson' | 'hybrid';
  minPrice: number | null;
  maxPrice: number | null;
  metro: string;
  city: string;
  sortBy: 'newest' | 'price_asc' | 'price_desc' | 'popular';
  onlyVip: boolean;
}
