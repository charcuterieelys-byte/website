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

  // Bento Grid span pattern (works across 2-col mobile and 4-col desktop)
  const getBentoSpanClass = (idx: number) => {
    const pattern = idx % 6;
    if (pattern === 0) return 'col-span-2 row-span-2'; // Featured large hero square
    if (pattern === 2) return 'col-span-1 row-span-2'; // Tall vertical tile
    if (pattern === 4) return 'col-span-2 row-span-1'; // Wide panoramic tile
    if (pattern === 5) return 'col-span-2 lg:col-span-2 row-span-1'; // Wide closing tile
    return 'col-span-1 row-span-1'; // Standard compact Bento cell
  };

  return (
    <section
      id="gallery"
      aria-label={lang === 'en' ? 'Photo Gallery' : 'Galería de Fotos'}
      className="relative z-10 py-16 sm:py-28 px-4 sm:px-10 lg:px-16 bg-[#F6EFE0]/85 border-y border-[#841F17]/15 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]"
    >
      <div className="max-w-[1440px] mx-auto">
        {/* Centered Editorial Header with Burgundy Rose Isotipo */}
        <div className="text-center max-w-2xl mx-auto pb-8 sm:pb-10 space-y-3">
          <img
            src="./brand/isotipo-rosa-burgundy.svg"
            alt=""
            aria-hidden="true"
            className="w-8 h-8 mx-auto object-contain opacity-90"
          />
          <p className="text-[11px] font-semibold tracking-[0.28em] uppercase text-[#841F17]/85">
            {lang === 'en'
              ? 'ATELIER PORTFOLIO · REAL CREATIONS'
              : 'NUESTRAS CREACIONES · HECHO EN CASA'}
          </p>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-[#841F17] leading-[1.06]">
            {lang === 'en' ? (
              <>
                Crafted for the eye,{' '}
                <span className="italic font-normal text-[#63150F]">
                  meant for the table.
                </span>
              </>
            ) : (
              <>
                El arte de compartir,{' '}
                <span className="italic font-normal text-[#63150F]">
                  en cada detalle.
                </span>
              </>
            )}
          </h2>
          <p className="text-xs sm:text-base text-[#4A120E]/85 leading-relaxed pt-0.5">
            {lang === 'en'
              ? 'Real boards, celebration brunch boxes, two-tier baskets and bespoke grazing tables prepared fresh to order in Louisville, Kentucky.'
              : 'Tablas reales, desayunos personalizados, cestas de dos niveles y mesas de eventos preparadas frescas bajo pedido en Louisville, Kentucky.'}
          </p>
        </div>

        {/* Category Filter Pills — Compact Warm Tactile Buttons */}
        <div
          role="group"
          aria-label={
            lang === 'en' ? 'Filter gallery by category' : 'Filtrar galería por categoría'
          }
          className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 pb-8 sm:pb-12"
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
                aria-pressed={isSelected}
                onClick={() => {
                  setActiveCategory(cat);
                  setLightboxIndex(null);
                }}
                className={`px-3.5 sm:px-5 py-2 rounded-[3px] text-[10px] sm:text-[11px] font-semibold tracking-[0.18em] uppercase transition-all duration-300 border ${
                  isSelected
                    ? 'bg-[#841F17] text-[#FAF5E8] border-[#841F17] shadow-sm'
                    : 'bg-[#FAF6EC] text-[#5A120D]/85 border-[#841F17]/20 hover:border-[#841F17]/60 hover:bg-white'
                }`}
              >
                {CATEGORY_LABELS[cat][lang]}
              </button>
            );
          })}
        </div>

        {/* True Bento Mosaic Grid (2-col on mobile, 4-col on desktop) */}
        {filteredItems.length === 0 ? (
          <div className="py-12 text-center text-[#5A120D]/75 text-sm">
            {lang === 'en'
              ? 'No photos in this category yet.'
              : 'Aún no hay fotos en esta categoría.'}
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 auto-rows-[155px] sm:auto-rows-[210px] lg:auto-rows-[235px] gap-2.5 sm:gap-4 grid-flow-dense">
            {filteredItems.map((item, idx) => {
              const spanClass = getBentoSpanClass(idx);
              const isFeatured = idx % 6 === 0;
              return (
                <article
                  key={item.id}
                  className={`group relative bg-[#FCF9F2] p-1.5 sm:p-2 rounded-[6px] border border-[#841F17]/15 hover:border-[#841F17]/45 transition-all duration-500 shadow-[0_8px_24px_rgba(74,18,14,0.06)] hover:shadow-[0_14px_34px_rgba(74,18,14,0.14)] overflow-hidden ${spanClass}`}
                >
                  {/* Full-Bleed Bento Cell Button */}
                  <button
                    type="button"
                    onClick={() => setLightboxIndex(idx)}
                    aria-label={`${
                      lang === 'en' ? 'Open full photo:' : 'Ampliar foto:'
                    } ${item.title[lang] || item.title.es}`}
                    className="relative w-full h-full overflow-hidden rounded-[4px] bg-[#E7D095]/35 cursor-pointer text-left block"
                  >
                    <img
                      src={item.imageSrc}
                      alt={item.title[lang] || item.title.es}
                      loading="lazy"
                      className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                    />

                    {/* Warm Editorial Gradient Scrim */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#240604]/85 via-[#240604]/15 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Top-Right Expand Pill */}
                    <span
                      aria-hidden="true"
                      className="absolute top-2.5 right-2.5 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#FAF6EC]/90 text-[#841F17] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                    </span>

                    {/* Bottom Bento Caption Overlay */}
                    <div className="absolute inset-x-0 bottom-0 p-2.5 sm:p-4 flex items-end justify-between gap-2">
                      <div className="min-w-0">
                        <span className="hidden sm:inline-block text-[9px] font-bold tracking-[0.2em] uppercase text-[#E7D095]/90 mb-0.5">
                          {CATEGORY_LABELS[item.category]?.[lang] ||
                            CATEGORY_LABELS.boards[lang]}
                        </span>
                        <h3
                          className={`font-serif text-[#FAF5E8] leading-tight truncate drop-shadow ${
                            isFeatured
                              ? 'text-base sm:text-2xl'
                              : 'text-xs sm:text-lg'
                          }`}
                        >
                          {item.title[lang] || item.title.es}
                        </h3>
                      </div>
                    </div>
                  </button>

                  {/* Quick Order Action Pill in Bottom-Right Corner */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onInquireItem(item.title[lang] || item.title.es);
                    }}
                    className="absolute bottom-3.5 right-3.5 sm:bottom-5 sm:right-5 z-10 px-2.5 py-1 rounded-[3px] bg-[#FAF6EC]/95 hover:bg-[#841F17] text-[#841F17] hover:text-[#FAF5E8] text-[9px] sm:text-[10px] font-bold tracking-[0.14em] uppercase transition-colors shadow-sm"
                  >
                    {lang === 'en' ? 'Order →' : 'Cotizar →'}
                  </button>
                </article>
              );
            })}
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
