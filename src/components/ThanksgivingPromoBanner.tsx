import React, { useState, useEffect } from 'react';
import { X, Wine, Sparkles, Eye } from 'lucide-react';
import { Language } from '../types/catalog';

interface ThanksgivingPromoBannerProps {
  lang: Language;
  onSelectPromoOrder: (selectionLabel: string) => void;
}

const PROMO_DISMISSED_KEY = 'elys_thanksgiving_banner_seen_v1';

export const ThanksgivingPromoBanner: React.FC<
  ThanksgivingPromoBannerProps
> = ({ lang, onSelectPromoOrder }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [showFullPoster, setShowFullPoster] = useState(false);

  // Open automatically when entering the page (once per browser session)
  useEffect(() => {
    let timer: number | undefined;
    try {
      const alreadySeen = sessionStorage.getItem(PROMO_DISMISSED_KEY);
      if (!alreadySeen) {
        timer = window.setTimeout(() => {
          setModalOpen(true);
        }, 700);
      }
    } catch {
      timer = window.setTimeout(() => {
        setModalOpen(true);
      }, 700);
    }
    return () => {
      if (timer) window.clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (!modalOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleCloseModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [modalOpen]);

  const handleCloseModal = () => {
    setModalOpen(false);
    setShowFullPoster(false);
    try {
      sessionStorage.setItem(PROMO_DISMISSED_KEY, '1');
    } catch {
      // Ignore storage restrictions
    }
  };

  const handleReserveSize = (sizeInches: '16"' | '18"', price: string) => {
    handleCloseModal();
    const label =
      lang === 'en'
        ? `Thanksgiving Special — ${sizeInches} Board (${price}) + Complimentary Wine Bottle`
        : `Promoción Thanksgiving — Charola de ${sizeInches} (${price}) + Botella de Vino Incluida`;
    onSelectPromoOrder(label);
  };

  return (
    <>
      {/* Discreet Floating Seasonal Ribbon at Bottom-Left so visitors can reopen the promo anytime */}
      <div className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-40">
        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className="group flex items-center gap-2.5 px-4 py-2.5 rounded-[3px] bg-[#4A100B]/95 hover:bg-[#841F17] text-[#FAF5E8] border border-[#E7D095]/40 shadow-[0_12px_30px_rgba(42,8,6,0.35)] transition-all duration-300"
        >
          <Wine className="w-4 h-4 text-[#E7D095] shrink-0 transition-transform duration-300 group-hover:rotate-12" />
          <div className="text-left">
            <span className="block text-[9px] font-semibold tracking-[0.24em] uppercase text-[#E7D095]">
              {lang === 'en' ? 'THANKSGIVING SPECIAL' : 'OFERTA THANKSGIVING'}
            </span>
            <span className="block font-serif italic text-xs sm:text-sm text-[#FAF5E8] leading-tight">
              {lang === 'en'
                ? '16" & 18" Boards · Wine Included'
                : 'Charolas 16” y 18” · Vino Incluido'}
            </span>
          </div>
        </button>
      </div>

      {/* Entry Promotional Banner Modal */}
      {modalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="thanksgiving-promo-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#230604]/80 backdrop-blur-md p-4 sm:p-6 overflow-y-auto"
          onClick={handleCloseModal}
        >
          <div
            className="relative max-w-4xl w-full rounded-[4px] border border-[#841F17]/35 bg-[#FAF6EC] p-2 sm:p-3 shadow-[0_28px_80px_rgba(24,4,2,0.55)] my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Classic Double Filete Inner Frame */}
            <div className="relative rounded-[2px] border border-[#841F17]/20 overflow-hidden grid grid-cols-1 lg:grid-cols-12">
              {/* Close Button */}
              <button
                type="button"
                onClick={handleCloseModal}
                aria-label={lang === 'en' ? 'Close promotion' : 'Cerrar promoción'}
                className="absolute top-3 right-3 z-20 w-9 h-9 rounded-full bg-[#FAF6EC]/90 hover:bg-[#841F17] text-[#841F17] hover:text-[#FAF5E8] border border-[#841F17]/25 flex items-center justify-center transition-colors shadow-sm"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Left Column: Seasonal Photography / Poster Toggle */}
              <div className="lg:col-span-6 relative bg-[#3A0C08] flex flex-col justify-between min-h-[260px] sm:min-h-[380px] overflow-hidden">
                <img
                  src={
                    showFullPoster
                      ? './images/promo/thanksgiving-poster.webp'
                      : './images/promo/thanksgiving-boards-scene.webp'
                  }
                  alt={
                    lang === 'en'
                      ? "Ely's Charcuterie Thanksgiving Special — 16 and 18 inch boards with wine bottle included"
                      : "Promoción Thanksgiving Ely's Charcuterie — Charolas de 16 y 18 pulgadas con botella de vino incluida"
                  }
                  className={`w-full h-full ${
                    showFullPoster ? 'object-contain max-h-[75vh]' : 'object-cover'
                  } transition-all duration-500`}
                />

                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#240604]/85 via-[#240604]/35 to-transparent p-4 flex items-end justify-between gap-3">
                  <span className="font-serif italic text-xs sm:text-sm text-[#FAF5E8]/90">
                    {lang === 'en'
                      ? 'Louisville, Kentucky · Limited Holiday Availability'
                      : 'Louisville, Kentucky · Cupos Limitados por Temporada'}
                  </span>

                  <button
                    type="button"
                    onClick={() => setShowFullPoster((prev) => !prev)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[3px] bg-[#FAF6EC]/90 hover:bg-white text-[#841F17] text-[10px] font-semibold tracking-[0.16em] uppercase transition-colors shrink-0 shadow"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    {showFullPoster
                      ? lang === 'en'
                        ? 'Photo View'
                        : 'Ver Foto'
                      : lang === 'en'
                      ? 'Full Flyer'
                      : 'Ver Afiche'}
                  </button>
                </div>
              </div>

              {/* Right Column: Editorial Thanksgiving Offer */}
              <div className="lg:col-span-6 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-6 bg-[#FAF6EC]">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 text-[#841F17]">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span className="text-[10px] font-bold tracking-[0.26em] uppercase">
                      {lang === 'en'
                        ? 'LIMITED SEASONAL OFFER'
                        : 'PROMOCIÓN ESPECIAL DE TEMPORADA'}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <h2
                      id="thanksgiving-promo-title"
                      className="font-serif text-3xl sm:text-4xl text-[#841F17] leading-[1.05]"
                    >
                      {lang === 'en'
                        ? 'Thanksgiving to Share'
                        : 'Thanksgiving Para Compartir'}
                    </h2>
                    <p className="font-serif italic text-lg sm:text-xl text-[#63150F]">
                      {lang === 'en'
                        ? '“One more reason to be thankful”'
                        : '“Una razón más para agradecer”'}
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-[#4A120E]/90 leading-relaxed">
                    {lang === 'en'
                      ? 'Celebrate around the table with our abundant 16" Medium or 18" Large artisan charcuterie boards — crafted fresh with a complimentary bottle of wine included.'
                      : 'Celebra alrededor de la mesa con nuestras abundantes charolas artesanales de 16” o 18” — preparadas frescas bajo pedido y con una botella de vino incluida de cortesía.'}
                  </p>

                  {/* Highlighted Offer Spec Box */}
                  <div className="p-4 rounded-[3px] bg-[#E7D095]/40 border border-[#841F17]/25 space-y-2.5">
                    <div className="flex items-center gap-2 text-[#841F17] font-semibold text-xs tracking-[0.14em] uppercase">
                      <Wine className="w-4 h-4 shrink-0" />
                      <span>
                        {lang === 'en'
                          ? 'BOTTLE OF WINE INCLUDED'
                          : 'BOTELLA DE VINO INCLUIDA'}
                      </span>
                    </div>

                    <div className="space-y-1.5 pt-1 border-t border-[#841F17]/15 text-xs sm:text-sm text-[#4A120E]">
                      <div className="flex items-baseline justify-between">
                        <span className="font-medium">
                          {lang === 'en'
                            ? 'Medium Board · 16" (Serves 8–10)'
                            : 'Charola Mediana · 16” (8–10 personas)'}
                        </span>
                        <span className="font-serif text-lg font-semibold text-[#841F17] num">
                          $140
                        </span>
                      </div>
                      <div className="flex items-baseline justify-between">
                        <span className="font-medium">
                          {lang === 'en'
                            ? 'Large Board · 18" (Serves 12–15)'
                            : 'Charola Grande · 18” (12–15 personas)'}
                        </span>
                        <span className="font-serif text-lg font-semibold text-[#841F17] num">
                          $170
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action CTAs */}
                <div className="space-y-2.5 pt-2">
                  <button
                    type="button"
                    onClick={() => handleReserveSize('16"', '$140')}
                    className="w-full py-3.5 px-5 rounded-[3px] bg-[#841F17] hover:bg-[#63150F] text-[#FAF5E8] text-[11px] font-semibold tracking-[0.2em] uppercase transition-colors shadow-sm"
                  >
                    {lang === 'en'
                      ? 'RESERVE 16" BOARD + WINE ($140)'
                      : 'RESERVAR CHAROLA 16” + VINO ($140)'}
                  </button>

                  <button
                    type="button"
                    onClick={() => handleReserveSize('18"', '$170')}
                    className="w-full py-3.5 px-5 rounded-[3px] border border-[#841F17] bg-[#FAF5E8] hover:bg-[#841F17] text-[#841F17] hover:text-[#FAF5E8] text-[11px] font-semibold tracking-[0.2em] uppercase transition-colors"
                  >
                    {lang === 'en'
                      ? 'RESERVE 18" BOARD + WINE ($170)'
                      : 'RESERVAR CHAROLA 18” + VINO ($170)'}
                  </button>

                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="w-full py-1.5 text-[11px] font-semibold tracking-[0.18em] uppercase text-[#5A120D]/70 hover:text-[#841F17] transition-colors"
                  >
                    {lang === 'en'
                      ? 'Continue exploring the website →'
                      : 'Continuar explorando la página →'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
