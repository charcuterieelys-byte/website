import React, { useState } from 'react';
import {
  ShoppingBag,
  MessageCircle,
  Eye,
  X,
  Check,
  Sparkles,
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
        ? `Hola Elianne ✨ Me gustaría ordenar o consultar disponibilidad para:\n\n• *${item.name.es}*\n• Tamaño: ${sizeObj.label.es} (${sizeObj.servings.es})\n• Precio ref.: $${sizeObj.price} USD\n\n¿Tendrás disponibilidad en Louisville para la fecha: ____?`
        : `Hi Elianne ✨ I would love to order or check availability for:\n\n• *${item.name.en}*\n• Size: ${sizeObj.label.en} (${sizeObj.servings.en})\n• Price ref.: $${sizeObj.price} USD\n\nDo you have availability in Louisville for date: ____?`;

    return `https://wa.me/${BRAND_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
  };

  return (
    <section id="catalogo" className="py-20 lg:py-28 bg-cream-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-gold-600 font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-gold-500" />
            <span>
              {lang === 'es'
                ? 'Catálogo de Propuestas • Louisville, KY'
                : 'Curated Offerings • Louisville, KY'}
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-semibold text-noir-900">
            {lang === 'es'
              ? 'Tablas, Cajas & Experiencias para Eventos'
              : 'Boards, Gift Boxes & Event Experiences'}
          </h2>
          <p className="text-noir-600 text-base sm:text-lg leading-relaxed">
            {lang === 'es'
              ? 'Selecciona el formato y tamaño ideal para tu reunión o regalo. Puedes agregar varias opciones a tu pedido o escribirnos directamente por WhatsApp.'
              : 'Choose the ideal style and size for your gathering or gift. Add multiple items to your order bag or message us directly on WhatsApp.'}
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center justify-start sm:justify-center gap-2.5 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`shrink-0 px-5 py-2.5 rounded-full text-xs uppercase tracking-[0.14em] font-semibold transition-all border ${
                  isActive
                    ? 'bg-noir-900 text-gold-200 border-noir-900 shadow-soft'
                    : 'bg-cream-100 text-noir-700 border-gold-300/60 hover:border-gold-500 hover:bg-cream-200/60'
                }`}
              >
                {cat.label[lang]}
              </button>
            );
          })}
        </div>

        {/* Catalog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => {
            const currentSizeId = selectedSizes[item.id] || item.sizes[0].id;
            const currentSize =
              item.sizes.find((s) => s.id === currentSizeId) || item.sizes[0];
            const isAdded = addedFeedback === item.id;

            return (
              <article
                key={item.id}
                className="group bg-cream-100/50 rounded-3xl border border-gold-300/55 overflow-hidden shadow-soft hover:shadow-luxury transition-all duration-300 flex flex-col"
              >
                {/* Large Product Photograph */}
                <div className="relative aspect-[4/3] overflow-hidden bg-cream-200">
                  <img
                    src={item.image}
                    alt={item.name[lang]}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-noir-950/40 via-transparent to-transparent" />

                  {/* Badge */}
                  {item.badge && (
                    <span className="absolute top-3.5 left-3.5 px-3.5 py-1 rounded-full bg-noir-900/90 backdrop-blur-sm text-gold-200 border border-gold-400/40 text-[11px] uppercase tracking-[0.14em] font-semibold">
                      {item.badge[lang]}
                    </span>
                  )}

                  {/* Quick Details Button */}
                  <button
                    onClick={() => setDetailModalItem(item)}
                    className="absolute bottom-3.5 right-3.5 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-cream-50/95 hover:bg-cream-50 text-noir-900 text-xs font-semibold shadow-md transition-transform hover:scale-105"
                  >
                    <Eye className="w-3.5 h-3.5 text-gold-600" />
                    <span>{lang === 'es' ? 'Ingredientes' : 'Details'}</span>
                  </button>
                </div>

                {/* Card Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                  <div className="space-y-2.5">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-serif text-2xl font-semibold text-noir-900 leading-snug">
                        {item.name[lang]}
                      </h3>
                    </div>

                    <p className="text-sm text-noir-600 leading-relaxed">
                      {item.shortDescription[lang]}
                    </p>
                  </div>

                  {/* Size Selector & Pricing */}
                  <div className="space-y-4 pt-2 border-t border-gold-300/40">
                    {item.sizes.length > 1 ? (
                      <div className="space-y-1.5">
                        <label className="block text-[11px] uppercase tracking-[0.15em] text-noir-500 font-semibold">
                          {lang === 'es' ? 'Elige el tamaño:' : 'Select size:'}
                        </label>
                        <div className="grid grid-cols-1 gap-1.5">
                          {item.sizes.map((size) => {
                            const active = size.id === currentSize.id;
                            return (
                              <button
                                key={size.id}
                                type="button"
                                onClick={() => handleSelectSize(item.id, size.id)}
                                className={`flex items-center justify-between px-3.5 py-2 rounded-xl text-xs transition-all border ${
                                  active
                                    ? 'bg-cream-50 border-gold-500 text-noir-900 font-semibold shadow-sm'
                                    : 'bg-cream-100/60 border-gold-300/40 text-noir-600 hover:border-gold-400'
                                }`}
                              >
                                <span className="truncate">
                                  {size.label[lang]} •{' '}
                                  <span className="text-noir-500 font-normal">
                                    {size.servings[lang]}
                                  </span>
                                </span>
                                <span className="font-serif text-base font-bold text-noir-900 ml-2">
                                  ${size.price}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between bg-cream-50 px-4 py-2.5 rounded-xl border border-gold-300/50">
                        <div className="flex items-center gap-2 text-xs text-noir-700">
                          <Users className="w-3.5 h-3.5 text-gold-600 shrink-0" />
                          <span>{currentSize.servings[lang]}</span>
                        </div>
                        <span className="font-serif text-xl font-bold text-noir-900">
                          ${currentSize.price}
                        </span>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="grid grid-cols-2 gap-2.5 pt-1">
                      <button
                        type="button"
                        onClick={() => handleAdd(item)}
                        className={`inline-flex items-center justify-center gap-1.5 py-3 px-3 rounded-full text-xs uppercase tracking-[0.12em] font-semibold transition-all border ${
                          isAdded
                            ? 'bg-gold-500 text-cream-50 border-gold-500'
                            : 'bg-noir-900 hover:bg-noir-800 text-gold-200 border-noir-900'
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>{lang === 'es' ? 'Agregado' : 'Added'}</span>
                          </>
                        ) : (
                          <>
                            <ShoppingBag className="w-3.5 h-3.5 text-gold-300" />
                            <span>{lang === 'es' ? 'Agregar' : 'Add to Bag'}</span>
                          </>
                        )}
                      </button>

                      <a
                        href={getDirectWhatsAppLink(item)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-1.5 py-3 px-3 rounded-full bg-cream-50 hover:bg-gold-200/40 text-noir-900 border border-gold-400/70 text-xs uppercase tracking-[0.12em] font-semibold transition-all"
                      >
                        <MessageCircle className="w-3.5 h-3.5 text-gold-600" />
                        <span>WhatsApp</span>
                      </a>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Product Detail Modal */}
      {detailModalItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-noir-950/70 backdrop-blur-sm animate-fadeIn"
          onClick={() => setDetailModalItem(null)}
        >
          <div
            className="bg-cream-50 border border-gold-400/60 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-luxury"
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
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-noir-900/85 text-cream-50 flex items-center justify-center hover:bg-noir-900 transition-colors"
                aria-label="Cerrar"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 sm:p-8 space-y-6">
              <div>
                {detailModalItem.badge && (
                  <span className="inline-block text-[11px] uppercase tracking-[0.18em] text-gold-600 font-semibold mb-1">
                    {detailModalItem.badge[lang]}
                  </span>
                )}
                <h3 className="font-serif text-3xl font-semibold text-noir-900">
                  {detailModalItem.name[lang]}
                </h3>
                <p className="text-noir-700 text-sm sm:text-base leading-relaxed mt-2">
                  {detailModalItem.fullDescription[lang]}
                </p>
              </div>

              {/* Ingredients List */}
              <div className="bg-cream-100/80 p-5 rounded-2xl border border-gold-300/50 space-y-3">
                <h4 className="font-serif text-xl font-semibold text-noir-900">
                  {lang === 'es' ? '¿Qué incluye esta propuesta?' : 'What’s Included'}
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

              {/* Pairing Note */}
              <div className="flex items-start gap-3 p-4 rounded-2xl bg-cream-200/50 border border-gold-300/40">
                <Wine className="w-5 h-5 text-gold-600 shrink-0 mt-0.5" />
                <p className="text-xs sm:text-sm text-noir-700">
                  <strong className="text-noir-900">
                    {lang === 'es' ? 'Nota de Maridaje: ' : 'Pairing Note: '}
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
                  className="flex-1 inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-noir-900 hover:bg-noir-800 text-gold-200 text-xs uppercase tracking-[0.15em] font-semibold transition-all"
                >
                  <ShoppingBag className="w-4 h-4 text-gold-300" />
                  <span>
                    {lang === 'es' ? 'Agregar a Mi Pedido' : 'Add to My Order'}
                  </span>
                </button>
                <a
                  href={getDirectWhatsAppLink(detailModalItem)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-full border border-gold-400 bg-cream-100 hover:bg-gold-200/40 text-noir-900 text-xs uppercase tracking-[0.15em] font-semibold transition-all"
                >
                  <MessageCircle className="w-4 h-4 text-gold-600" />
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
