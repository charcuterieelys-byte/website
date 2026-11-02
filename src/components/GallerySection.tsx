import React, { useState } from 'react';
import { Maximize2, X, Instagram } from 'lucide-react';
import { GalleryPhoto, Language } from '../types/catalog';
import { BRAND_CONFIG, GALLERY_PHOTOS } from '../data/catalog';

interface GallerySectionProps {
  lang: Language;
}

export const GallerySection: React.FC<GallerySectionProps> = ({ lang }) => {
  const [filter, setFilter] = useState<'all' | 'tablas' | 'cajas' | 'eventos' | 'detalles'>('all');
  const [lightboxPhoto, setLightboxPhoto] = useState<GalleryPhoto | null>(null);

  const filterButtons: { id: typeof filter; label: { es: string; en: string } }[] = [
    { id: 'all', label: { es: 'Todos los Trabajos', en: 'All Works' } },
    { id: 'tablas', label: { es: 'Tablas', en: 'Boards' } },
    { id: 'cajas', label: { es: 'Cajas & Vasos', en: 'Boxes & Cups' } },
    { id: 'eventos', label: { es: 'Mesas & Carrito', en: 'Tables & Cart' } },
    { id: 'detalles', label: { es: 'Detalles de Marca', en: 'Brand Details' } },
  ];

  const displayedPhotos =
    filter === 'all'
      ? GALLERY_PHOTOS
      : GALLERY_PHOTOS.filter((p) => p.category === filter);

  return (
    <section id="galeria" className="py-20 lg:py-28 bg-cream-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="space-y-3 max-w-2xl">
            <span className="text-xs uppercase tracking-[0.2em] text-gold-600 font-semibold">
              {lang === 'es' ? 'Inspiración & Detalles' : 'Inspiration & Craft'}
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-semibold text-noir-900">
              {lang === 'es' ? 'Galería de Nuestros Trabajos' : 'Gallery of Our Work'}
            </h2>
            <p className="text-noir-600 text-base sm:text-lg">
              {lang === 'es'
                ? 'Fotografías grandes de nuestras tablas, cajas de regalo, vasos individuales y montajes de eventos. Haz clic en cualquier imagen para ampliarla.'
                : 'Large photographs of our boards, gift boxes, individual cups, and event styling. Click any image to view full screen.'}
            </p>
          </div>

          <a
            href={BRAND_CONFIG.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-gold-400/70 bg-cream-100 hover:bg-gold-200/40 text-noir-900 text-xs uppercase tracking-[0.14em] font-semibold transition-all self-start md:self-auto"
          >
            <Instagram className="w-4 h-4 text-gold-600" />
            <span>
              {lang === 'es'
                ? `Ver más en ${BRAND_CONFIG.instagramHandle}`
                : `Follow ${BRAND_CONFIG.instagramHandle}`}
            </span>
          </a>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {filterButtons.map((btn) => (
            <button
              key={btn.id}
              onClick={() => setFilter(btn.id)}
              className={`shrink-0 px-4 py-2 rounded-full text-xs uppercase tracking-[0.14em] font-semibold transition-all border ${
                filter === btn.id
                  ? 'bg-noir-900 text-gold-200 border-noir-900'
                  : 'bg-cream-100 text-noir-700 border-gold-300/60 hover:border-gold-500'
              }`}
            >
              {btn.label[lang]}
            </button>
          ))}
        </div>

        {/* Large Minimalist Photo Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
          {displayedPhotos.map((photo) => (
            <div
              key={photo.id}
              onClick={() => setLightboxPhoto(photo)}
              className="group cursor-pointer rounded-3xl overflow-hidden bg-cream-100 border border-gold-300/55 shadow-soft hover:shadow-luxury transition-all"
            >
              <div className="relative aspect-[16/11] overflow-hidden bg-cream-200">
                <img
                  src={photo.src}
                  alt={photo.title[lang]}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-noir-950/65 via-transparent to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />

                <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-cream-50/90 text-noir-900 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md">
                  <Maximize2 className="w-4 h-4 text-gold-600" />
                </div>

                <div className="absolute bottom-5 left-5 right-5 text-cream-50">
                  <h3 className="font-serif text-2xl font-semibold">
                    {photo.title[lang]}
                  </h3>
                  <p className="text-xs sm:text-sm text-cream-200 mt-1 line-clamp-2">
                    {photo.caption[lang]}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxPhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-noir-950/85 backdrop-blur-md"
          onClick={() => setLightboxPhoto(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-cream-50 rounded-3xl overflow-hidden border border-gold-400/50 shadow-luxury"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setLightboxPhoto(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-noir-900/85 text-cream-50 flex items-center justify-center hover:bg-noir-900 transition-colors"
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
              <h3 className="font-serif text-2xl font-semibold text-noir-900">
                {lightboxPhoto.title[lang]}
              </h3>
              <p className="text-sm text-noir-600 mt-1">
                {lightboxPhoto.caption[lang]}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
