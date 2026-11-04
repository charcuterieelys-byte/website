import React, { useState, useEffect, useRef } from 'react';
import {
  ShoppingBag,
  MessageCircle,
  Eye,
  X,
  Check,
  Wine,
  Users,
  Plus,
  Sparkles,
  ArrowUpRight,
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CatalogItem, CategoryId, Language } from '../types/catalog';
import { BRAND_CONFIG, CATEGORIES, CATALOG_ITEMS } from '../data/catalog';

gsap.registerPlugin(ScrollTrigger);

interface CatalogSectionProps {
  lang: Language;
  onAddToCart: (productId: string, sizeId: string) => void;
}

export const CatalogSection: React.FC<CatalogSectionProps> = ({
  lang,
  onAddToCart,
}) => {
  const [activeCategory, setActiveCategory] = useState<CategoryId>('all');
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    CATALOG_ITEMS.forEach((item) => {
      if (item.sizes.length > 0) {
        initial[item.id] = item.sizes[0].id;
      }
    });
    return initial;
  });
  const [detailModalItem, setDetailModalItem] = useState<CatalogItem | null>(null);
  const [addedFeedback, setAddedFeedback] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const filteredItems =
    activeCategory === 'all'
      ? CATALOG_ITEMS
      : CATALOG_ITEMS.filter((item) => item.category === activeCategory);

  useEffect(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll('.bento-card');
    gsap.fromTo(
      cards,
      { y: 32, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.75,
        stagger: 0.08,
        ease: 'power3.out',
        overwrite: 'auto',
      }
    );
  }, [activeCategory]);

  const handleSelectSize = (productId: string, sizeId: string) => {
    setSelectedSizes((prev) => ({ ...prev, [productId]: sizeId }));
  };

  const handleAdd = (item: CatalogItem) => {
    const sizeId = selectedSizes[item.id] || item.sizes[0].id;
    onAddToCart(item.id, sizeId);
    setAddedFeedback(item.id);
    setTimeout(() => {
      setAddedFeedback((prev) => (prev === item.id ? null : prev));
    }, 1800);
  };

  const getDirectWhatsAppLink = (item: CatalogItem) => {
    const sizeId = selectedSizes[item.id] || item.sizes[0].id;
    const sizeObj = item.sizes.find((s) => s.id === sizeId) || item.sizes[0];
    const message =
      lang === 'es'
        ? `Hola Elianne, me gustaría ordenar o consultar disponibilidad para:\n\n*${item.name.es}*\nTamaño: ${sizeObj.label.es} (${sizeObj.servings.es})\nPrecio ref.: $${sizeObj.price} USD\n\n¿Tendrás disponibilidad en Louisville para la fecha: ____?`
        : `Hi Elianne, I would love to order or check availability for:\n\n*${item.name.en}*\nSize: ${sizeObj.label.en} (${sizeObj.servings.en})\nPrice ref.: $${sizeObj.price} USD\n\nDo you have availability in Louisville for date: ____?`;

    return `https://wa.me/${BRAND_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
  };

  return (
    <section
      ref={sectionRef}
      id="catalogo"
      className="py-24 lg:py-36 bg-gradient-to-b from-cream-100/60 via-cream-50 to-cream-50 border-t border-gold-300/35"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        {/* Editorial Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-gold-600 tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-gold-500" />
              <span>
                {lang === 'es'
                  ? 'Curaduría Gastronómica · Louisville, KY'
                  : 'Curated Grazing Collection · Louisville, KY'}
              </span>
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-semibold text-noir-900 leading-[1.03] max-w-none">
              {lang === 'es' ? (
                <>
                  Colección de tablas,{' '}
                  <span className="italic font-normal text-gold-600">
                    cajas y experiencias
                  </span>
                </>
              ) : (
                <>
                  Collection of boards,{' '}
                  <span className="italic font-normal text-gold-600">
                    gift boxes & events
                  </span>
                </>
              )}
            </h2>
          </div>

          <p className="text-noir-600 text-sm sm:text-base max-w-md leading-relaxed">
            {lang === 'es'
              ? 'Pasa el cursor sobre cada creación para explorar sus detalles, elige el formato ideal y agrégalo a tu bolsa de pedido o consulta directo por WhatsApp.'
              : 'Hover over each creation to inspect details, choose your ideal size, and add to your order bag or inquire directly via WhatsApp.'}
          </p>
        </div>

        {/* Floating Liquid Glass Filter Capsule */}
        <div className="flex justify-start sm:justify-center mb-14 overflow-x-auto pb-2">
          <div
            role="tablist"
            aria-label={lang === 'es' ? 'Categorías del catálogo' : 'Catalog categories'}
            className="inline-flex items-center gap-1.5 p-1.5 rounded-full liquid-glass-light"
          >
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`shrink-0 h-11 px-5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 whitespace-nowrap ${
                    isActive
                      ? 'bg-noir-900 text-gold-200 shadow-sm'
                      : 'text-noir-700 hover:text-noir-950 hover:bg-cream-200/50'
                  }`}
                >
                  {cat.label[lang]}
                </button>
              );
            })}
          </div>
        </div>

        {/* Bento Boutique Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10"
        >
          {filteredItems.map((item, idx) => {
            const currentSizeId = selectedSizes[item.id] || item.sizes[0].id;
            const currentSize =
              item.sizes.find((s) => s.id === currentSizeId) || item.sizes[0];
            const isAdded = addedFeedback === item.id;

            // Asymmetric Bento spans when viewing Full Collection:
            // First item (Signature Rose Board) and 7th item (Grazing Table) span 7 columns, paired with 5-column cards
            const getBentoSpan = () => {
              if (activeCategory !== 'all') return 'lg:col-span-6';
              const pattern = [
                'lg:col-span-7',
                'lg:col-span-5',
                'lg:col-span-5',
                'lg:col-span-7',
                'lg:col-span-6',
                'lg:col-span-6',
                'lg:col-span-7',
                'lg:col-span-5',
              ];
              return pattern[idx % pattern.length];
            };

            return (
              <article
                key={item.id}
                className={`bento-card group flex flex-col justify-between ${getBentoSpan()}`}
              >
                {/* Frameless Sculptural Image Canvas */}
                <div>
                  <div className="relative aspect-[16/11] w-full rounded-[28px] overflow-hidden bg-noir-900 shadow-luxury">
                    {/* Primary Image */}
                    <img
                      src={item.image}
                      alt={item.name[lang]}
                      decoding="async"
                      className={`w-full h-full object-cover object-center transition-all duration-700 ease-out group-hover:scale-105 ${
                        item.secondaryImage ? 'group-hover:opacity-0' : ''
                      }`}
                    />
                    {/* Secondary Hover Image Crossfade */}
                    {item.secondaryImage && (
                      <img
                        src={item.secondaryImage}
                        alt={`${item.name[lang]} detalle`}
                        decoding="async"
                        className="absolute inset-0 w-full h-full object-cover object-center opacity-0 scale-105 transition-all duration-700 ease-out group-hover:opacity-100 group-hover:scale-100"
                      />
                    )}

                    {/* Subtle bottom gradient for floating glass controls */}
                    <div
                      className="pointer-events-none absolute inset-0"
                      style={{
                        background:
                          'linear-gradient(to top, rgba(13,10,11,0.78) 0%, rgba(13,10,11,0.12) 45%, rgba(13,10,11,0.25) 100%)',
                      }}
                    />

                    {/* Top Bar: Floating Badge & Quick-View Trigger */}
                    <div className="absolute top-4 inset-x-4 flex items-center justify-between gap-2">
                      {item.badge ? (
                        <span className="inline-flex items-center px-3.5 py-1.5 rounded-full liquid-glass-pill text-[11px] font-semibold text-gold-200 tracking-wide whitespace-nowrap">
                          {item.badge[lang]}
                        </span>
                      ) : (
                        <span />
                      )}

                      <button
                        type="button"
                        onClick={() => setDetailModalItem(item)}
                        className="inline-flex items-center gap-1.5 h-10 px-4 rounded-full liquid-glass-pill text-cream-50 hover:bg-cream-50 hover:text-noir-950 text-xs font-semibold transition-all duration-300 whitespace-nowrap"
                      >
                        <Eye className="w-3.5 h-3.5 text-gold-300 group-hover:text-gold-600 shrink-0" />
                        <span>{lang === 'es' ? 'Ingredientes' : 'Ingredients'}</span>
                      </button>
                    </div>

                    {/* Bottom Overlay: Interactive Liquid Glass Size Selector */}
                    <div className="absolute bottom-4 inset-x-4 flex flex-wrap items-center justify-between gap-2">
                      <div
                        role="tablist"
                        aria-label={lang === 'es' ? 'Tamaños disponibles' : 'Available sizes'}
                        className="inline-flex flex-wrap items-center gap-1.5 p-1 rounded-full liquid-glass-dark"
                      >
                        {item.sizes.map((size) => {
                          const active = size.id === currentSize.id;
                          return (
                            <button
                              key={size.id}
                              type="button"
                              role="tab"
                              aria-selected={active}
                              onClick={() => handleSelectSize(item.id, size.id)}
                              className={`inline-flex items-center gap-1.5 h-8 px-3.5 rounded-full text-xs transition-all duration-200 whitespace-nowrap ${
                                active
                                  ? 'bg-gradient-to-r from-gold-200 to-gold-300 text-noir-950 font-bold shadow-sm'
                                  : 'text-cream-100/85 hover:text-cream-50 font-medium'
                              }`}
                            >
                              <span>{size.label[lang]}</span>
                              <span className="num opacity-85">${size.price}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Editorial Typography Below Image (Frameless Boutique Style) */}
                  <div className="pt-5 px-1 space-y-2.5">
                    <div className="flex items-baseline justify-between gap-4">
                      <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-noir-900 leading-tight group-hover:text-gold-600 transition-colors">
                        {item.name[lang]}
                      </h3>
                      <div className="text-right shrink-0">
                        <span className="font-serif text-3xl font-bold text-noir-900 num">
                          ${currentSize.price}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-gold-600 font-semibold">
                      <Users className="w-3.5 h-3.5 shrink-0" />
                      <span>
                        {currentSize.label[lang]} · {currentSize.servings[lang]}
                      </span>
                    </div>

                    <p className="text-sm text-noir-600 leading-relaxed line-clamp-2">
                      {item.shortDescription[lang]}
                    </p>
                  </div>
                </div>

                {/* Tactile Action Row */}
                <div className="pt-5 px-1 mt-4 border-t border-gold-300/45 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => handleAdd(item)}
                    className={`inline-flex items-center justify-center gap-2 h-11 px-6 rounded-full text-xs font-semibold transition-all duration-300 whitespace-nowrap ${
                      isAdded
                        ? 'bg-gold-500 text-cream-50 shadow-gold-glow scale-[1.02]'
                        : 'bg-noir-900 hover:bg-noir-800 text-gold-200'
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-4 h-4 shrink-0" />
                        <span>{lang === 'es' ? 'Agregado a tu pedido' : 'Added to bag'}</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4 text-gold-300 shrink-0" />
                        <span>{lang === 'es' ? 'Agregar al pedido' : 'Add to order'}</span>
                      </>
                    )}
                  </button>

                  <a
                    href={getDirectWhatsAppLink(item)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 h-11 px-4 rounded-full text-xs font-semibold text-noir-800 hover:text-gold-600 hover:bg-cream-200/50 transition-colors whitespace-nowrap"
                  >
                    <MessageCircle className="w-4 h-4 text-gold-600 shrink-0" />
                    <span>{lang === 'es' ? 'Pedir por WhatsApp' : 'WhatsApp order'}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Luxury Detail Modal */}
      {detailModalItem && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-noir-950/75 backdrop-blur-md animate-fadeIn"
          onClick={() => setDetailModalItem(null)}
        >
          <div
            className="bg-cream-50 border border-gold-400/50 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-luxury"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[16/10] bg-noir-900">
              <img
                src={detailModalItem.image}
                alt={detailModalItem.name[lang]}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setDetailModalItem(null)}
                className="absolute top-4 right-4 w-11 h-11 rounded-full liquid-glass-dark text-cream-50 flex items-center justify-center hover:scale-105 transition-transform"
                aria-label="Cerrar"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 sm:p-8 space-y-6">
              <div>
                <h3 className="font-serif text-3xl sm:text-4xl font-semibold text-noir-900 max-w-none">
                  {detailModalItem.name[lang]}
                </h3>
                <p className="text-noir-700 text-sm sm:text-base leading-relaxed mt-2">
                  {detailModalItem.fullDescription[lang]}
                </p>
              </div>

              <div className="bg-cream-100/80 p-5 rounded-2xl border border-gold-300/50 space-y-3">
                <h4 className="font-serif text-xl font-semibold text-noir-900">
                  {lang === 'es'
                    ? 'Ingredientes y detalles incluidos'
                    : 'Included ingredients and details'}
                </h4>
                <ul className="space-y-2">
                  {detailModalItem.ingredients[lang].map((ing, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2.5 text-sm text-noir-700"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-gold-500 mt-2 shrink-0" />
                      <span>{ing}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-start gap-3 p-5 rounded-2xl bg-cream-200/50 border border-gold-300/40">
                <Wine className="w-5 h-5 text-gold-600 shrink-0 mt-0.5" />
                <p className="text-xs sm:text-sm text-noir-700">
                  <strong className="text-noir-900 font-semibold">
                    {lang === 'es' ? 'Maridaje sugerido: ' : 'Suggested pairing: '}
                  </strong>
                  {detailModalItem.pairingNote[lang]}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    handleAdd(detailModalItem);
                    setDetailModalItem(null);
                  }}
                  className="flex-1 inline-flex items-center justify-center gap-2 h-12 px-6 rounded-full bg-noir-900 hover:bg-noir-800 text-gold-200 text-xs font-semibold transition-colors whitespace-nowrap"
                >
                  <ShoppingBag className="w-4 h-4 text-gold-300 shrink-0" />
                  <span>
                    {lang === 'es' ? 'Agregar a mi pedido' : 'Add to my order'}
                  </span>
                </button>
                <a
                  href={getDirectWhatsAppLink(detailModalItem)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 h-12 px-6 rounded-full border border-gold-500 bg-cream-100 hover:bg-gold-200/40 text-noir-900 text-xs font-semibold transition-colors whitespace-nowrap"
                >
                  <MessageCircle className="w-4 h-4 text-gold-600 shrink-0" />
                  <span>
                    {lang === 'es'
                      ? 'Consultar por WhatsApp'
                      : 'Ask on WhatsApp'}
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
