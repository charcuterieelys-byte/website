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
    { id: 'all', label: { es: 'Todos los trabajos', en: 'All works' } },
    { id: 'tablas', label: { es: 'Tablas', en: 'Boards' } },
    { id: 'cajas', label: { es: 'Cajas y vasos', en: 'Boxes & cups' } },
    { id: 'eventos', label: { es: 'Mesas y carrito', en: 'Tables & cart' } },
    { id: 'detalles', label: { es: 'Detalles de marca', en: 'Brand details' } },
  ];

  const displayedPhotos =
    filter === 'all'
      ? GALLERY_PHOTOS
      : GALLERY_PHOTOS.filter((p) => p.category === filter);

  return (
    <section id="galeria" className="py-20 lg:py-28 bg-cream-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="space-y-3 max-w-2xl">
            <h2 className="font-serif text-3xl sm:text-5xl font-semibold text-noir-900">
              {lang === 'es' ? 'Galería de nuestros trabajos' : 'Gallery of our work'}
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
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-gold-400/70 bg-cream-100 hover:bg-gold-200/40 text-noir-900 text-xs font-semibold transition-colors self-start md:self-auto"
          >
            <Instagram className="w-4 h-4 text-gold-600" />
            <span>
              {lang === 'es'
                ? `Ver más en ${BRAND_CONFIG.instagramHandle}`
                : `Follow ${BRAND_CONFIG.instagramHandle}`}
            </span>
          </a>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 border-b border-gold-300/50">
          {filterButtons.map((btn) => (
            <button
              key={btn.id}
              onClick={() => setFilter(btn.id)}
              className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors border ${
                filter === btn.id
                  ? 'bg-noir-900 text-gold-200 border-noir-900'
                  : 'bg-cream-100 text-noir-700 border-gold-300/60 hover:border-gold-500'
              }`}
            >
              {btn.label[lang]}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
          {displayedPhotos.map((photo) => (
            <figure
              key={photo.id}
              onClick={() => setLightboxPhoto(photo)}
              className="group cursor-pointer rounded-2xl overflow-hidden bg-cream-100 border border-gold-300/60 shadow-soft hover:border-gold-500 transition-colors p-3"
            >
              <div className="relative aspect-[16/11] overflow-hidden rounded-xl bg-cream-200">
                <img
                  src={photo.src}
                  alt={photo.title[lang]}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3.5 right-3.5 w-9 h-9 rounded-full bg-cream-50/90 text-noir-900 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm">
                  <Maximize2 className="w-4 h-4 text-gold-600" />
                </div>
              </div>
              <figcaption className="pt-3.5 px-1">
                <h3 className="font-serif text-2xl font-semibold text-noir-900">
                  {photo.title[lang]}
                </h3>
                <p className="text-xs sm:text-sm text-noir-600 mt-1">
                  {photo.caption[lang]}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      {lightboxPhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-noir-950/85 backdrop-blur-md"
          onClick={() => setLightboxPhoto(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-cream-50 rounded-2xl overflow-hidden border border-gold-400/50 shadow-luxury"
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
