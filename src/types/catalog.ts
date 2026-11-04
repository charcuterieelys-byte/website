export type Language = 'en' | 'es';

export interface Product {
  id: string; // "01" - "07"
  slug: string;
  indexLabel: Record<Language, string>; // e.g., "01 / THE COLLECTION"
  shortTitle: Record<Language, string>; // e.g., "SMALL"
  name: Record<Language, string>; // e.g., "Small Charcuterie Board"
  description: Record<Language, string>;
  dimensions: Record<Language, string>;
  servings: Record<Language, string>;
  price: Record<Language, string>; // Editable field — defaults to "$ PRICE" until confirmed
  details?: Record<Language, string[]>;
  videoSrc: string; // Primary WebM with alpha transparency
  videoFallbackMp4: string; // Studio-matched MP4 fallback
  posterSrc: string; // Transparent WebP poster
  realPhotoSrc: string; // Original supplied photograph
  category: string;
  orderUrl: string;
  ctaLabel: Record<Language, string>;
  layoutAlign: 'left' | 'right'; // Editorial text placement (left or right of floating product)
  visualScale: number; // Intentional scaling so smaller items balance with larger boards
}

export interface OccasionItem {
  id: string;
  index: string;
  title: Record<Language, string>;
  subtitle: Record<Language, string>;
  imageSrc: string;
}
