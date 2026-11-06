export type Language = 'en' | 'es';

export interface Product {
  id: string; // "01" - "08"
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
  stripePaymentLink?: string; // Official Stripe Checkout Payment Link
  isCustomQuote?: boolean; // True if item requires custom quote before payment
}

export interface OccasionItem {
  id: string;
  index: string;
  title: Record<Language, string>;
  subtitle: Record<Language, string>;
  imageSrc: string;
}

export type GalleryCategory = 'boards' | 'boxes' | 'events' | 'cups';

export interface GalleryItem {
  id: string;
  title: Record<Language, string>;
  subtitle?: Record<Language, string>;
  category: GalleryCategory;
  imageSrc: string;
  featured?: boolean;
}

export interface BrandConfigData {
  businessName: string;
  founderName: string;
  city: string;
  whatsappNumber: string;
  whatsappDisplay: string;
  instagramHandle: string;
  instagramUrl: string;
  email: string;
  senderEmail: string;
  stripeCustomQuoteLink: string;
  logoHorizontal: string;
  logoVertical: string;
  logoIsotipo: string;
}

export interface CmsState {
  version: number;
  updatedAt: string;
  products: Product[];
  gallery: GalleryItem[];
  brandConfig: BrandConfigData;
}
