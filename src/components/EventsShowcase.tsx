import React from 'react';
import { Sparkles, CheckCircle2, ArrowRight, CalendarHeart } from 'lucide-react';
import { Language } from '../types/catalog';

interface EventsShowcaseProps {
  lang: Language;
}

export const EventsShowcase: React.FC<EventsShowcaseProps> = ({ lang }) => {
  const highlights =
    lang === 'es'
      ? [
          'Mesas de Charcutería (Grazing Tables) a varios niveles con lino crema, velas y detalles florales.',
          'Carrito Móvil de Charcutería (Mobile Grazing Bar) para bodas, bridal showers y eventos privados.',
          'Vasos y conos individuales (Grazing Cups) personalizados para recepciones y eventos corporativos.',
          'Montaje completo en tu locación dentro de Louisville, Kentucky y áreas cercanas.',
        ]
      : [
          'Multi-tiered Grazing Tables styled with cream linens, taper candles, and floral accents.',
          'Mobile Charcuterie Cart (Grazing Bar) for weddings, bridal showers, and private celebrations.',
          'Custom Individual Grazing Cups & Cones for cocktail hours and corporate events.',
          'Full on-site styling at your venue in Louisville, Kentucky and surrounding areas.',
        ];

  return (
    <section
      id="eventos"
      className="py-20 lg:py-28 bg-noir-900 text-cream-50 relative overflow-hidden"
    >
      {/* Subtle Gold Glow */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-64 bg-gold-400/10 blur-3xl rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-noir-800 border border-gold-400/35 text-gold-200 text-xs uppercase tracking-[0.18em] font-medium">
              <Sparkles className="w-3.5 h-3.5 text-gold-300" />
              <span>
                {lang === 'es'
                  ? 'Eventos & Celebraciones • Louisville, KY'
                  : 'Events & Celebrations • Louisville, KY'}
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl font-semibold text-cream-50 leading-tight">
              {lang === 'es' ? (
                <>
                  Mesas de Charcutería &{' '}
                  <span className="italic font-normal text-gold-200">
                    Carrito Móvil
                  </span>{' '}
                  para tus momentos más especiales
                </>
              ) : (
                <>
                  Bespoke Grazing Tables &{' '}
                  <span className="italic font-normal text-gold-200">
                    Mobile Cart
                  </span>{' '}
                  for your most special moments
                </>
              )}
            </h2>

            <p className="text-cream-200/85 text-base sm:text-lg leading-relaxed">
              {lang === 'es'
                ? 'Desde celebraciones íntimas en casa hasta bodas y eventos corporativos en Louisville. Creamos una experiencia visual y gastronómica cálida que invita a tus invitados a acercarse, conversar y disfrutar.'
                : 'From intimate home gatherings to weddings and corporate events across Louisville. We craft a warm visual and culinary experience that invites your guests to gather, mingle, and savor.'}
            </p>

            <ul className="space-y-3.5 pt-2">
              {highlights.map((item, index) => (
                <li key={index} className="flex items-start gap-3 text-sm sm:text-base text-cream-100">
                  <CheckCircle2 className="w-5 h-5 text-gold-300 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="pt-4 flex flex-wrap gap-4">
              <a
                href="#cotizar"
                className="inline-flex items-center gap-2.5 px-7 py-4 rounded-full bg-gold-200 hover:bg-gold-300 text-noir-900 text-xs sm:text-sm uppercase tracking-[0.15em] font-bold transition-all shadow-gold-glow"
              >
                <CalendarHeart className="w-4 h-4" />
                <span>
                  {lang === 'es'
                    ? 'Solicitar Cotización de Evento'
                    : 'Request an Event Quote'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right Dual Photo Composition */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-3 bg-noir-800/90 p-3 rounded-3xl border border-gold-400/30">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden">
                <img
                  src="images/mesa_evento_grazing.jpg"
                  alt="Mesa de Charcutería para Bodas y Eventos en Louisville"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="px-2 pb-1">
                <p className="text-[11px] uppercase tracking-[0.18em] text-gold-300 font-semibold">
                  Grazing Tables
                </p>
                <p className="font-serif text-xl text-cream-50">
                  {lang === 'es'
                    ? 'Mesas Escenográficas a Medida'
                    : 'Multi-Tiered Event Tables'}
                </p>
              </div>
            </div>

            <div className="space-y-3 bg-noir-800/90 p-3 rounded-3xl border border-gold-400/30 sm:mt-8">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden">
                <img
                  src="images/8_carrito_cocteles_y_charcuteria.jpg"
                  alt="Carrito Móvil de Charcutería Ely's Charcuterie"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="px-2 pb-1">
                <p className="text-[11px] uppercase tracking-[0.18em] text-gold-300 font-semibold">
                  Mobile Grazing Bar
                </p>
                <p className="font-serif text-xl text-cream-50">
                  {lang === 'es'
                    ? 'Carrito Móvil para Celebraciones'
                    : 'Interactive Charcuterie Cart'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
