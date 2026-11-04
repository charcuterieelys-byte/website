import React, { useState } from 'react';
import { Maximize2, X, Instagram, Sparkles, ArrowUpRight } from 'lucide-react';
import { GalleryPhoto, Language } from '../types/catalog';
import { BRAND_CONFIG, GALLERY_PHOTOS } from '../data/catalog';

interface GallerySectionProps {
  lang: Language;
}

export const GallerySection: React.FC<GallerySectionProps> = ({ lang }) => {
  const [filter, setFilter] = useState<'all' | 'tablas' | 'cajas' | 'eventos' | 'detalles'>('all');
  const [lightboxPhoto, setLightboxPhoto] = useState<GalleryPhoto | null>(null);

  const filterButtons: { id: typeof filter; label: { es: string; en: string } }[] = [
    { id: 'all', label: { es: 'Toda la Galería', en: 'All Works' } },
    { id: 'tablas', label: { es: 'Tablas', en: 'Boards' } },
    { id: 'cajas', label: { es: 'Cajas & Vasos', en: 'Boxes & Cups' } },
    { id: 'eventos', label: { es: 'Mesas & Carrito', en: 'Tables & Cart' } },
    { id: 'detalles', label: { es: 'Detalles', en: 'Brand Details' } },
  ];

  const displayedPhotos =
    filter === 'all'
      ? GALLERY_PHOTOS
      : GALLERY_PHOTOS.filter((p) => p.category === filter);

  // Asymmetric Bento spans for the 8 photos when viewing All Works
  const getGallerySpan = (idx: number) => {
    if (filter !== 'all') return 'md:col-span-6 aspect-[16/11]';
    const spans = [
      'md:col-span-7 aspect-[16/11]',
      'md:col-span-5 aspect-[4/3] md:aspect-auto',
      'md:col-span-4 aspect-[4/4]',
      'md:col-span-4 aspect-[4/4]',
      'md:col-span-4 aspect-[4/4]',
      'md:col-span-5 aspect-[4/3] md:aspect-auto',
      'md:col-span-7 aspect-[16/10]',
      'md:col-span-12 aspect-[21/9]',
    ];
    return spans[idx % spans.length];
  };

  return (
    <section id="galeria" className="py-24 lg:py-36 bg-cream-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-gold-600">
              <Sparkles className="w-3.5 h-3.5 text-gold-500" />
              <span>
                {lang === 'es'
                  ? 'Portafolio Visual · Hecho a Mano en Louisville'
                  : 'Visual Portfolio · Handcrafted in Louisville'}
              </span>
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-semibold text-noir-900 leading-[1.03] max-w-none">
              {lang === 'es' ? (
                <>
                  Galería de{' '}
                  <span className="italic font-normal text-gold-600">
                    nuestros trabajos
                  </span>
                </>
              ) : (
                <>
                  Gallery of{' '}
                  <span className="italic font-normal text-gold-600">
                    our work
                  </span>
                </>
              )}
            </h2>
          </div>

          <a
            href={BRAND_CONFIG.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 h-11 px-5 rounded-full liquid-glass-light hover:border-gold-600 text-noir-900 text-xs font-semibold transition-all self-start md:self-auto whitespace-nowrap"
          >
            <Instagram className="w-4 h-4 text-gold-600 shrink-0" />
            <span>{BRAND_CONFIG.instagramHandle}</span>
            <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
          </a>
        </div>

        {/* Filter Pills */}
        <div className="flex justify-start sm:justify-center mb-12 overflow-x-auto pb-2">
          <div
            role="tablist"
            aria-label={lang === 'es' ? 'Filtros de galería' : 'Gallery filters'}
            className="inline-flex items-center gap-1.5 p-1.5 rounded-full liquid-glass-light"
          >
            {filterButtons.map((btn) => (
              <button
                key={btn.id}
                role="tab"
                aria-selected={filter === btn.id}
                onClick={() => setFilter(btn.id)}
                className={`shrink-0 h-10 px-5 rounded-full text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                  filter === btn.id
                    ? 'bg-noir-900 text-gold-200 shadow-sm'
                    : 'text-noir-700 hover:text-noir-950'
                }`}
              >
                {btn.label[lang]}
              </button>
            ))}
          </div>
        </div>

        {/* Bento Exhibition Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 lg:gap-6">
          {displayedPhotos.map((photo, idx) => (
            <figure
              key={photo.id}
              onClick={() => setLightboxPhoto(photo)}
              className={`group relative cursor-pointer rounded-[28px] overflow-hidden bg-noir-900 shadow-luxury min-h-[280px] ${getGallerySpan(
                idx
              )}`}
            >
              <img
                src={photo.src}
                alt={photo.title[lang]}
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div
                className="absolute inset-0 transition-opacity duration-500 opacity-80 group-hover:opacity-95"
                style={{
                  background:
                    'linear-gradient(to top, rgba(13,10,11,0.88) 0%, rgba(13,10,11,0.12) 55%, rgba(13,10,11,0.18) 100%)',
                }}
              />

              <div className="absolute top-4 right-4 w-10 h-10 rounded-full liquid-glass-pill text-cream-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                <Maximize2 className="w-4 h-4 text-gold-300" />
              </div>

              <figcaption className="absolute bottom-5 inset-x-5 text-cream-50">
                <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-cream-50 leading-tight">
                  {photo.title[lang]}
                </h3>
                <p className="text-xs sm:text-sm text-cream-100/80 mt-1 line-clamp-2 max-w-xl">
                  {photo.caption[lang]}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      {lightboxPhoto && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-noir-950/85 backdrop-blur-md"
          onClick={() => setLightboxPhoto(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-cream-50 rounded-3xl overflow-hidden border border-gold-400/50 shadow-luxury"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setLightboxPhoto(null)}
              className="absolute top-4 right-4 z-10 w-11 h-11 rounded-full liquid-glass-dark text-cream-50 flex items-center justify-center hover:scale-105 transition-transform"
              aria-label="Cerrar imagen"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="max-h-[75vh] overflow-hidden bg-noir-950 flex items-center justify-center">
              <img
                src={lightboxPhoto.src}
                alt={lightboxPhoto.title[lang]}
                className="w-full max-h-[75vh] object-contain"
              />
            </div>
            <div className="p-6 bg-cream-50">
              <h3 className="font-serif text-2xl font-semibold text-noir-900 max-w-none">
                {lightboxPhoto.title[lang]}
              </h3>
              <p className="text-sm text-noir-700 mt-1">
                {lightboxPhoto.caption[lang]}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
