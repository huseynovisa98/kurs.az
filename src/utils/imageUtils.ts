import heroImg from '../assets/images/hero_education_baku_1792232038435.jpg';
import courseItImg from '../assets/images/course_it_coding_1792232038730.jpg';
import courseLangImg from '../assets/images/course_foreign_languages_1792232039448.jpg';
import courseBusinessImg from '../assets/images/course_business_accounting_1792232039485.jpg';

export const ASSET_HERO_IMAGE = heroImg;
export const ASSET_IT_IMAGE = courseItImg;
export const ASSET_LANG_IMAGE = courseLangImg;
export const ASSET_BUSINESS_IMAGE = courseBusinessImg;

/**
 * Returns a guaranteed valid image URL for any course or category
 */
export function getSafeImageUrl(image?: string, categorySlugOrName?: string): string {
  // If image is already a resolved data URL or valid blob/http
  if (image && (image.startsWith('data:') || image.startsWith('blob:') || image.startsWith('http://') || image.startsWith('https://'))) {
    return image;
  }

  // If image matches known local paths, return the bundled asset
  if (image) {
    if (image.includes('course_it_coding')) return ASSET_IT_IMAGE;
    if (image.includes('course_foreign_languages')) return ASSET_LANG_IMAGE;
    if (image.includes('course_business_accounting')) return ASSET_BUSINESS_IMAGE;
    if (image.includes('hero_education_baku')) return ASSET_HERO_IMAGE;
    // If it's a public /images path
    if (image.startsWith('/images/')) return image;
  }

  // Fallback by category
  const cat = (categorySlugOrName || '').toLowerCase();
  if (cat.includes('it') || cat.includes('proqram') || cat.includes('kod')) {
    return ASSET_IT_IMAGE;
  }
  if (cat.includes('dil') || cat.includes('ingilis') || cat.includes('rus') || cat.includes('alman')) {
    return ASSET_LANG_IMAGE;
  }
  if (cat.includes('biznes') || cat.includes('muhasibat') || cat.includes('komp')) {
    return ASSET_BUSINESS_IMAGE;
  }
  return ASSET_HERO_IMAGE;
}
