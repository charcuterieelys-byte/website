export type Language = 'es' | 'en';

export type CategoryId = 'all' | 'tablas' | 'cajas' | 'individuales' | 'eventos';

export interface SizeOption {
  id: string;
  label: {
    es: string;
    en: string;
  };
  servings: {
    es: string;
    en: string;
  };
  price: number;
}

export interface CatalogItem {
  id: string;
  category: Exclude<CategoryId, 'all'>;
  featured?: boolean;
  badge?: {
    es: string;
    en: string;
  };
  name: {
    es: string;
    en: string;
  };
  shortDescription: {
    es: string;
    en: string;
  };
  fullDescription: {
    es: string;
    en: string;
  };
  ingredients: {
    es: string[];
    en: string[];
  };
  pairingNote: {
    es: string;
    en: string;
  };
  image: string;
  secondaryImage?: string;
  sizes: SizeOption[];
  isCustomQuote?: boolean;
}

export interface CartItem {
  productId: string;
  sizeId: string;
  quantity: number;
  notes?: string;
}

export interface GalleryPhoto {
  id: string;
  src: string;
  category: 'tablas' | 'cajas' | 'eventos' | 'detalles';
  title: {
    es: string;
    en: string;
  };
  caption: {
    es: string;
    en: string;
  };
}
