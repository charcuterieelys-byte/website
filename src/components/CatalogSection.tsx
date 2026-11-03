import React, { useState } from 'react';
import {
  ShoppingBag,
  MessageCircle,
  Eye,
  X,
  Check,
  Wine,
  Users,
} from 'lucide-react';
import { CatalogItem, CategoryId, Language } from '../types/catalog';
import { BRAND_CONFIG, CATEGORIES, CATALOG_ITEMS } from '../data/catalog';

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

  const filteredItems =
    activeCategory === 'all'
      ? CATALOG_ITEMS
      : CATALOG_ITEMS.filter((item) => item.category === activeCategory);

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
    <section id="catalogo" className="py-20 lg:py-28 bg-cream-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-4 mb-10">
          <h2 className="font-serif text-4xl sm:text-5xl font-semibold text-noir-900 max-w-none">
            {lang === 'es'
              ? 'Catálogo de tablas, cajas y experiencias'
              : 'Catalog of boards, gift boxes, and event experiences'}
          </h2>
          <p className="text-noir-700 text-base sm:text-lg leading-relaxed">
            {lang === 'es'
              ? 'Selecciona el formato y tamaño ideal para tu reunión o regalo en Louisville. Puedes agregar varias opciones a tu pedido o escribirnos directamente por WhatsApp.'
              : 'Choose the ideal style and size for your gathering or gift in Louisville. Add multiple items to your order bag or message us directly on WhatsApp.'}
          </p>
        </div>

        <div
          role="tablist"
          aria-label={lang === 'es' ? 'Categorías del catálogo' : 'Catalog categories'}
          className="flex items-center justify-start gap-2.5 overflow-x-auto pb-4 mb-10 border-b border-gold-300/50"
        >
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveCategory(cat.id)}
                className={`shrink-0 h-11 px-5 rounded-full text-sm font-semibold transition-colors border whitespace-nowrap ${
                  isActive
                    ? 'bg-noir-900 text-gold-200 border-noir-900'
                    : 'bg-cream-100 text-noir-700 border-gold-400/60 hover:border-gold-600 hover:bg-cream-200/60'
                }`}
              >
                {cat.label[lang]}
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {filteredItems.map((item) => {
            const currentSizeId = selectedSizes[item.id] || item.sizes[0].id;
            const currentSize =
              item.sizes.find((s) => s.id === currentSizeId) || item.sizes[0];
            const isAdded = addedFeedback === item.id;

            return (
              <article
                key={item.id}
                className="bg-cream-100/70 rounded-2xl border border-gold-400/55 overflow-hidden shadow-soft flex flex-col transition-colors hover:border-gold-600 p-3 sm:p-4"
              >
                <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-cream-200">
                  <img
                    src={item.image}
                    alt={item.name[lang]}
                    decoding="async"
                    className="w-full h-full object-cover object-center"
                  />

                  <button
                    type="button"
                    onClick={() => setDetailModalItem(item)}
                    className="absolute bottom-3.5 right-3.5 inline-flex items-center gap-2 h-11 px-4 rounded-full bg-cream-50/95 hover:bg-cream-50 text-noir-900 border border-gold-400/60 text-xs font-semibold shadow-sm transition-colors whitespace-nowrap"
                  >
                    <Eye className="w-4 h-4 text-gold-600 shrink-0" />
                    <span>{lang === 'es' ? 'Ver ingredientes' : 'View details'}</span>
                  </button>
                </div>

                <div className="pt-5 px-2 pb-2 flex-1 flex flex-col justify-between space-y-5">
                  <div className="space-y-2.5">
                    <div className="flex items-baseline justify-between gap-4">
                      <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-noir-900 leading-snug max-w-none">
                        {item.name[lang]}
                      </h3>
                      <span className="font-serif text-2xl sm:text-3xl font-bold text-noir-900 shrink-0 num">
                        ${currentSize.price}
                      </span>
                    </div>

                    <p className="text-sm sm:text-base text-noir-700 leading-relaxed">
                      {item.shortDescription[lang]}
                    </p>
                  </div>

                  <div className="space-y-4 pt-4 border-t border-gold-300/50">
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between gap-2 text-xs text-noir-700">
                        <span className="font-semibold text-noir-900">
                          {lang === 'es' ? 'Formato y porciones:' : 'Format & servings:'}
                        </span>
                        <span className="inline-flex items-center gap-1.5 text-noir-700 font-normal">
                          <Users className="w-3.5 h-3.5 text-gold-600 shrink-0" />
                          <span>{currentSize.servings[lang]}</span>
                        </span>
                      </div>

                      <div
                        role="tablist"
                        aria-label={lang === 'es' ? 'Tamaños disponibles' : 'Available sizes'}
                        className="flex flex-wrap gap-2"
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
                              className={`inline-flex items-center gap-2 h-10 px-4 rounded-full text-xs transition-colors border whitespace-nowrap ${
                                active
                                  ? 'bg-noir-900 border-noir-900 text-gold-200 font-semibold'
                                  : 'bg-cream-50 border-gold-400/70 text-noir-800 hover:border-noir-900 font-normal'
                              }`}
                            >
                              <span>{size.label[lang]}</span>
                              <span className="num font-semibold">${size.price}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      <button
                        type="button"
                        onClick={() => handleAdd(item)}
                        className={`inline-flex items-center justify-center gap-2 h-12 px-5 rounded-full text-xs font-semibold transition-colors border whitespace-nowrap ${
                          isAdded
                            ? 'bg-gold-500 text-cream-50 border-gold-500'
                            : 'bg-noir-900 hover:bg-noir-800 text-gold-200 border-noir-900'
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <Check className="w-4 h-4 shrink-0" />
                            <span>{lang === 'es' ? 'Agregado al pedido' : 'Added to bag'}</span>
                          </>
                        ) : (
                          <>
                            <ShoppingBag className="w-4 h-4 text-gold-300 shrink-0" />
                            <span>{lang === 'es' ? 'Agregar al pedido' : 'Add to bag'}</span>
                          </>
                        )}
                      </button>

                      <a
                        href={getDirectWhatsAppLink(item)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 h-12 px-5 rounded-full bg-cream-50 hover:bg-gold-200/40 text-noir-900 border border-gold-500/80 text-xs font-semibold transition-colors whitespace-nowrap"
                      >
                        <MessageCircle className="w-4 h-4 text-gold-600 shrink-0" />
                        <span>{lang === 'es' ? 'Pedir por WhatsApp' : 'Order via WhatsApp'}</span>
                      </a>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {detailModalItem && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-noir-950/70 backdrop-blur-sm"
          onClick={() => setDetailModalItem(null)}
        >
          <div
            className="bg-cream-50 border border-gold-400/60 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-luxury"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[16/10] bg-cream-200">
              <img
                src={detailModalItem.image}
                alt={detailModalItem.name[lang]}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setDetailModalItem(null)}
                className="absolute top-4 right-4 w-11 h-11 rounded-full bg-noir-900/85 text-cream-50 flex items-center justify-center hover:bg-noir-900 transition-colors"
                aria-label="Cerrar"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 sm:p-8 space-y-6">
              <div>
                <h3 className="font-serif text-3xl font-semibold text-noir-900 max-w-none">
                  {detailModalItem.name[lang]}
                </h3>
                <p className="text-noir-700 text-sm sm:text-base leading-relaxed mt-2">
                  {detailModalItem.fullDescription[lang]}
                </p>
              </div>

              <div className="bg-cream-100/80 p-5 rounded-xl border border-gold-300/50 space-y-3">
                <h4 className="font-serif text-xl font-semibold text-noir-900">
                  {lang === 'es' ? 'Ingredientes y detalles incluidos' : 'Included ingredients and details'}
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

              <div className="flex items-start gap-3 p-5 rounded-xl bg-cream-200/50 border border-gold-300/40">
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
