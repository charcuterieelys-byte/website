import React, { useState, useEffect, useMemo } from 'react';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { GalleryCategory, GalleryItem, Language } from '../types/catalog';

interface GallerySectionProps {
  lang: Language;
  items: GalleryItem[];
  onInquireItem: (itemTitle: string) => void;
}

const CATEGORY_LABELS: Record<
  'all' | GalleryCategory,
  Record<Language, string>
> = {
  all: { es: 'TODAS', en: 'ALL' },
  boards: { es: 'TABLAS', en: 'BOARDS' },
  boxes: { es: 'CAJAS Y BRUNCH', en: 'BOXES & BRUNCH' },
  events: { es: 'EVENTOS Y MESAS', en: 'EVENTS & GRAZING' },
  cups: { es: 'VASOS Y DETALLES', en: 'CUPS & DETAILS' },
};

export const GallerySection: React.FC<GallerySectionProps> = ({
  lang,
  items,
  onInquireItem,
}) => {
  const [activeCategory, setActiveCategory] = useState<'all' | GalleryCategory>(
    'all'
  );
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredItems = useMemo(() => {
    if (activeCategory === 'all') return items;
    return items.filter((item) => item.category === activeCategory);
  }, [items, activeCategory]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLightboxIndex(null);
      } else if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) =>
          prev === null ? null : (prev + 1) % filteredItems.length
        );
      } else if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) =>
          prev === null
            ? null
            : (prev - 1 + filteredItems.length) % filteredItems.length
        );
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, filteredItems.length]);

  const currentLightboxItem =
    lightboxIndex !== null ? filteredItems[lightboxIndex] : null;

  return (
    <section
      id="gallery"
      aria-label={lang === 'en' ? 'Photo Gallery' : 'Galería de Fotos'}
      className="relative z-10 py-24 sm:py-32 px-6 sm:px-10 lg:px-16 border-t border-[#841F17]/15"
    >
      <div className="max-w-[1440px] mx-auto">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-12 sm:pb-16 border-b border-[#841F17]/20">
          <div className="space-y-4 max-w-2xl">
            <p className="text-[11px] font-semibold tracking-[0.28em] uppercase text-[#841F17]">
              {lang === 'en'
                ? 'VISUAL ATELIER · PORTFOLIO'
                : 'GALERÍA · NUESTRAS CREACIONES'}
            </p>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-[#841F17] leading-[1.06]">
              {lang === 'en'
                ? 'Crafted for the eye and the table.'
                : 'El arte de compartir, en cada detalle.'}
            </h2>
          </div>

          <p className="text-sm sm:text-base text-[#4A120E]/85 max-w-md leading-relaxed">
            {lang === 'en'
              ? 'Explore real boards, celebration brunch boxes, two-tier baskets and bespoke grazing tables created fresh to order in Louisville, Kentucky.'
              : 'Explora nuestras tablas artesanales, desayunos personalizados, cestas de dos niveles y mesas de eventos elaboradas frescas bajo pedido en Louisville, Kentucky.'}
          </p>
        </div>

        {/* Category Filter Pills */}
        <div
          role="tablist"
          aria-label={
            lang === 'en' ? 'Filter gallery by category' : 'Filtrar galería por categoría'
          }
          className="flex flex-wrap items-center gap-2.5 sm:gap-3 pt-8 pb-10 sm:pb-12"
        >
          {(
            ['all', 'boards', 'boxes', 'events', 'cups'] as Array<
              'all' | GalleryCategory
            >
          ).map((cat) => {
            const isSelected = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => {
                  setActiveCategory(cat);
                  setLightboxIndex(null);
                }}
                className={`px-4 sm:px-5 py-2.5 text-[11px] font-semibold tracking-[0.22em] uppercase transition-all duration-300 border ${
                  isSelected
                    ? 'bg-[#841F17] text-[#FAF5E8] border-[#841F17] shadow-sm'
                    : 'bg-[#FAF5E8]/55 text-[#5A120D]/85 border-[#841F17]/25 hover:border-[#841F17] hover:bg-[#FAF5E8]/90'
                }`}
              >
                {CATEGORY_LABELS[cat][lang]}
              </button>
            );
          })}
        </div>

        {/* Gallery Grid */}
        {filteredItems.length === 0 ? (
          <div className="py-16 text-center text-[#5A120D]/75 text-sm">
            {lang === 'en'
              ? 'No photos in this category yet.'
              : 'Aún no hay fotos en esta categoría.'}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 sm:gap-9">
            {filteredItems.map((item, idx) => (
              <article
                key={item.id}
                className="group bg-[#FAF5E8]/65 border border-[#841F17]/20 hover:border-[#841F17]/50 transition-all duration-500 flex flex-col overflow-hidden shadow-sm hover:shadow-md"
              >
                {/* Image Container */}
                <div
                  onClick={() => setLightboxIndex(idx)}
                  className="relative aspect-[4/3] w-full overflow-hidden bg-[#E2C684]/40 cursor-pointer"
                >
                  <img
                    src={item.imageSrc}
                    alt={item.title[lang] || item.title.es}
                    loading="lazy"
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#3B0A07]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4">
                    <span className="text-[10px] font-semibold tracking-[0.24em] uppercase text-[#FAF5E8] bg-[#841F17]/90 px-3 py-1">
                      {CATEGORY_LABELS[item.category]?.[lang] ||
                        CATEGORY_LABELS.boards[lang]}
                    </span>
                    <span
                      aria-hidden="true"
                      className="w-9 h-9 rounded-full bg-[#FAF5E8]/95 text-[#841F17] flex items-center justify-center shadow"
                    >
                      <Maximize2 className="w-4 h-4" />
                    </span>
                  </div>
                </div>

                {/* Editorial Caption & Action */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between gap-4">
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-semibold tracking-[0.24em] uppercase text-[#841F17]/80">
                        {CATEGORY_LABELS[item.category]?.[lang] ||
                          CATEGORY_LABELS.boards[lang]}
                      </span>
                      <span className="num text-[11px] text-[#841F17]/60 font-semibold">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                    </div>
                    <h3 className="font-serif text-2xl text-[#841F17] leading-snug">
                      {item.title[lang] || item.title.es}
                    </h3>
                    {(item.subtitle?.[lang] || item.subtitle?.es) && (
                      <p className="text-xs sm:text-sm text-[#4A120E]/85 leading-relaxed line-clamp-2">
                        {item.subtitle?.[lang] || item.subtitle?.es}
                      </p>
                    )}
                  </div>

                  <div className="pt-2 border-t border-[#841F17]/12 flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => setLightboxIndex(idx)}
                      className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#5A120D]/80 hover:text-[#841F17] transition-colors"
                    >
                      {lang === 'en' ? 'VIEW FULL PHOTO' : 'VER FOTO'}
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        onInquireItem(item.title[lang] || item.title.es)
                      }
                      className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#841F17] hover:text-[#5A120D] transition-colors"
                    >
                      {lang === 'en' ? 'ORDER SIMILAR →' : 'PEDIR SIMILAR →'}
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {/* Fullscreen Lightbox Modal */}
      {currentLightboxItem && lightboxIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={currentLightboxItem.title[lang] || currentLightboxItem.title.es}
          className="fixed inset-0 z-50 bg-[#260705]/92 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
          onClick={() => setLightboxIndex(null)}
        >
          <div
            className="relative max-w-5xl w-full bg-[#FAF5E8] border border-[#841F17]/40 shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image Column */}
            <div className="lg:col-span-8 relative bg-[#1A0503] flex items-center justify-center min-h-[300px] sm:min-h-[460px] max-h-[75vh]">
              <img
                src={currentLightboxItem.imageSrc}
                alt={
                  currentLightboxItem.title[lang] ||
                  currentLightboxItem.title.es
                }
                className="max-h-[75vh] w-auto max-w-full object-contain"
              />

              {filteredItems.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() =>
                      setLightboxIndex(
                        (lightboxIndex - 1 + filteredItems.length) %
                          filteredItems.length
                      )
                    }
                    aria-label={lang === 'en' ? 'Previous photo' : 'Foto anterior'}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#FAF5E8]/90 hover:bg-[#FAF5E8] text-[#841F17] flex items-center justify-center shadow-md transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setLightboxIndex((lightboxIndex + 1) % filteredItems.length)
                    }
                    aria-label={lang === 'en' ? 'Next photo' : 'Siguiente foto'}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#FAF5E8]/90 hover:bg-[#FAF5E8] text-[#841F17] flex items-center justify-center shadow-md transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>

            {/* Details Column */}
            <div className="lg:col-span-4 p-6 sm:p-8 flex flex-col justify-between gap-6 bg-[#FAF5E8]">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-semibold tracking-[0.26em] uppercase text-[#841F17]">
                    {CATEGORY_LABELS[currentLightboxItem.category]?.[lang] ||
                      CATEGORY_LABELS.boards[lang]}
                  </span>
                  <button
                    type="button"
                    onClick={() => setLightboxIndex(null)}
                    aria-label={lang === 'en' ? 'Close' : 'Cerrar'}
                    className="p-1.5 text-[#841F17]/75 hover:text-[#841F17] transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <h3 className="font-serif text-3xl text-[#841F17] leading-tight">
                  {currentLightboxItem.title[lang] ||
                    currentLightboxItem.title.es}
                </h3>

                {(currentLightboxItem.subtitle?.[lang] ||
                  currentLightboxItem.subtitle?.es) && (
                  <p className="text-sm text-[#4A120E]/90 leading-relaxed">
                    {currentLightboxItem.subtitle?.[lang] ||
                      currentLightboxItem.subtitle?.es}
                  </p>
                )}
              </div>

              <div className="space-y-3 pt-4 border-t border-[#841F17]/20">
                <p className="num text-xs text-[#841F17]/70 tracking-[0.2em] uppercase">
                  {String(lightboxIndex + 1).padStart(2, '0')} /{' '}
                  {String(filteredItems.length).padStart(2, '0')}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    const title =
                      currentLightboxItem.title[lang] ||
                      currentLightboxItem.title.es;
                    setLightboxIndex(null);
                    onInquireItem(title);
                  }}
                  className="w-full py-3.5 px-5 bg-[#841F17] hover:bg-[#63150F] text-[#FAF5E8] text-xs font-semibold tracking-[0.22em] uppercase transition-colors"
                >
                  {lang === 'en'
                    ? 'ORDER OR QUOTE THIS STYLE'
                    : 'COTIZAR O PEDIR ESTE ESTILO'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
