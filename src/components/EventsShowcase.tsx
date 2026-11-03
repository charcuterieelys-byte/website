import React from 'react';
import { CheckCircle2, CalendarHeart } from 'lucide-react';
import { Language } from '../types/catalog';

interface EventsShowcaseProps {
  lang: Language;
}

export const EventsShowcase: React.FC<EventsShowcaseProps> = ({ lang }) => {
  const highlights =
    lang === 'es'
      ? [
          'Mesas de charcutería (Grazing Tables) a varios niveles con lino crema, velas y detalles florales.',
          'Carrito móvil de charcutería (Mobile Grazing Bar) para bodas, bridal showers y eventos privados.',
          'Vasos y conos individuales (Grazing Cups) personalizados para recepciones y eventos corporativos.',
          'Montaje completo en tu locación dentro de Louisville, Kentucky y áreas cercanas.',
        ]
      : [
          'Multi-tiered Grazing Tables styled with cream linens, taper candles, and floral accents.',
          'Mobile Charcuterie Cart (Grazing Bar) for weddings, bridal showers, and private celebrations.',
          'Custom Individual Grazing Cups and Cones for cocktail hours and corporate events.',
          'Full on-site styling at your venue in Louisville, Kentucky and surrounding areas.',
        ];

  return (
    <section
      id="eventos"
      className="py-20 lg:py-28 bg-noir-900 text-cream-50 border-y border-gold-400/30"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <h2 className="font-serif text-4xl sm:text-5xl font-semibold text-cream-50 leading-tight max-w-none">
              {lang === 'es'
                ? 'Mesas de charcutería y carrito móvil para tus celebraciones'
                : 'Bespoke grazing tables and mobile cart for your celebrations'}
            </h2>

            <p className="text-cream-200/90 text-base sm:text-lg leading-relaxed">
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
                className="inline-flex items-center justify-center gap-2.5 h-12 px-7 rounded-full bg-gold-200 hover:bg-gold-300 text-noir-900 text-sm font-bold transition-colors whitespace-nowrap"
              >
                <CalendarHeart className="w-4 h-4 shrink-0" />
                <span>
                  {lang === 'es'
                    ? 'Solicitar cotización de evento'
                    : 'Request an event quote'}
                </span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <figure className="space-y-3.5 bg-noir-800/90 p-4 rounded-2xl border border-gold-400/30">
              <div className="aspect-[4/5] rounded-xl overflow-hidden">
                <img
                  src="images/mesa_evento_grazing.jpg"
                  alt="Mesa de charcutería para bodas y eventos en Louisville"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
              </div>
              <figcaption className="px-2 pb-1">
                <p className="font-serif text-xl font-semibold text-cream-50">
                  {lang === 'es'
                    ? 'Mesas escenográficas a medida'
                    : 'Multi-tiered event tables'}
                </p>
                <p className="text-xs text-gold-200 mt-1">
                  {lang === 'es' ? 'Desde 25 hasta 150 invitados' : 'From 25 to 150 guests'}
                </p>
              </figcaption>
            </figure>

            <figure className="space-y-3.5 bg-noir-800/90 p-4 rounded-2xl border border-gold-400/30 sm:mt-8">
              <div className="aspect-[4/5] rounded-xl overflow-hidden">
                <img
                  src="images/8_carrito_cocteles_y_charcuteria.jpg"
                  alt="Carrito móvil de charcutería Ely’s Charcuterie"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
              </div>
              <figcaption className="px-2 pb-1">
                <p className="font-serif text-xl font-semibold text-cream-50">
                  {lang === 'es'
                    ? 'Carrito móvil para celebraciones'
                    : 'Interactive charcuterie cart'}
                </p>
                <p className="text-xs text-gold-200 mt-1">
                  {lang === 'es' ? 'Servicio de 2 a 3 horas en Louisville' : '2 to 3 hour service in Louisville'}
                </p>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
};
