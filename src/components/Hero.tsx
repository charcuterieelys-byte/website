import React from 'react';
import { ArrowRight, Sparkles, MessageCircle, Instagram, MapPin } from 'lucide-react';
import { Language } from '../types/catalog';
import { BRAND_CONFIG } from '../data/catalog';

interface HeroProps {
  lang: Language;
}

export const Hero: React.FC<HeroProps> = ({ lang }) => {
  const whatsappUrl = `https://wa.me/${BRAND_CONFIG.whatsappNumber}?text=${encodeURIComponent(
    lang === 'es'
      ? "Hola Elianne, me encantaría hacer un pedido o cotizar un evento con Ely's Charcuterie en Louisville."
      : "Hi Elianne! I would love to place an order or get an event quote with Ely's Charcuterie in Louisville."
  )}`;

  return (
    <section
      id="inicio"
      className="relative overflow-hidden bg-gradient-to-b from-cream-100/80 via-cream-50 to-cream-50 pt-10 pb-20 lg:pt-16 lg:pb-28"
    >
      {/* Subtle Decorative Gold Orbs & Lines */}
      <div className="pointer-events-none absolute -top-24 -left-24 w-96 h-96 rounded-full bg-gold-200/25 blur-3xl" />
      <div className="pointer-events-none absolute top-1/3 -right-24 w-96 h-96 rounded-full bg-gold-300/15 blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* Left Column: Editorial Welcome Copy */}
          <div className="lg:col-span-6 space-y-7 text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cream-200/80 border border-gold-400/40 text-noir-800 text-xs uppercase tracking-[0.18em] font-medium">
              <Sparkles className="w-3.5 h-3.5 text-gold-500" />
              <span>
                {lang === 'es'
                  ? 'Bienvenidos a Ely’s Charcuterie • Louisville, KY'
                  : 'Welcome to Ely’s Charcuterie • Louisville, KY'}
              </span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-semibold text-noir-900 leading-[1.08] tracking-tight">
              {lang === 'es' ? (
                <>
                  El arte de transformar pequeños detalles en{' '}
                  <span className="italic font-normal text-gold-600">
                    momentos especiales
                  </span>
                  .
                </>
              ) : (
                <>
                  The art of turning small details into{' '}
                  <span className="italic font-normal text-gold-600">
                    special moments
                  </span>
                  .
                </>
              )}
            </h1>

            <p className="text-base sm:text-lg text-noir-700 leading-relaxed max-w-xl font-normal">
              {lang === 'es'
                ? 'Tablas artesanales, cajas de regalo y mesas de charcutería creadas con dedicación por Elianne Lafuente en Louisville, Kentucky. Diseñadas para invitar a compartir, disfrutar y reunir a las personas alrededor de una mesa.'
                : 'Artisanal charcuterie boards, luxury gift boxes, and bespoke grazing tables handcrafted with care by Elianne Lafuente in Louisville, Kentucky. Designed to invite people to share, savor, and gather around the table.'}
            </p>

            {/* Primary & Secondary Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-1">
              <a
                href="#catalogo"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-full bg-noir-900 hover:bg-noir-800 text-gold-200 border border-gold-400/50 text-xs sm:text-sm uppercase tracking-[0.15em] font-semibold transition-all shadow-luxury hover:shadow-gold-glow group"
              >
                <span>
                  {lang === 'es' ? 'Descubrir el Catálogo' : 'Explore the Catalog'}
                </span>
                <ArrowRight className="w-4 h-4 text-gold-300 transition-transform group-hover:translate-x-1" />
              </a>

              <a
                href="#cotizar"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-cream-100 hover:bg-gold-200/40 text-noir-900 border border-gold-400/70 text-xs sm:text-sm uppercase tracking-[0.15em] font-semibold transition-all"
              >
                <span>
                  {lang === 'es' ? 'Cotizar un Evento' : 'Request Event Quote'}
                </span>
              </a>
            </div>

            {/* Direct Contact Strip: WhatsApp & Instagram */}
            <div className="pt-4 border-t border-gold-300/45 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-noir-700">
              <span className="uppercase tracking-[0.16em] text-noir-500 font-semibold">
                {lang === 'es' ? 'Contacto Directo:' : 'Direct Contact:'}
              </span>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-semibold text-noir-900 hover:text-gold-600 transition-colors"
              >
                <span className="w-7 h-7 rounded-full bg-noir-900 text-gold-200 flex items-center justify-center">
                  <MessageCircle className="w-3.5 h-3.5" />
                </span>
                <span>WhatsApp</span>
              </a>
              <a
                href={BRAND_CONFIG.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-semibold text-noir-900 hover:text-gold-600 transition-colors"
              >
                <span className="w-7 h-7 rounded-full border border-gold-400 bg-cream-100 text-noir-900 flex items-center justify-center">
                  <Instagram className="w-3.5 h-3.5 text-gold-600" />
                </span>
                <span>{BRAND_CONFIG.instagramHandle}</span>
              </a>
              <span className="inline-flex items-center gap-1.5 text-noir-600">
                <MapPin className="w-3.5 h-3.5 text-gold-500" />
                <span>Louisville, KY</span>
              </span>
            </div>
          </div>

          {/* Right Column: Large Editorial Photography Showcase */}
          <div className="lg:col-span-6 relative">
            {/* Golden Frame Border */}
            <div className="relative rounded-3xl p-2.5 sm:p-3.5 bg-cream-100 border border-gold-400/50 shadow-luxury">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] sm:aspect-[16/11]">
                <img
                  src="images/hero_grazing_table.jpg"
                  alt="Tabla de Charcutería Artesanal Ely's Charcuterie Louisville"
                  className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-noir-950/45 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 flex items-end justify-between text-cream-50">
                  <div>
                    <span className="inline-block text-[10px] uppercase tracking-[0.22em] text-gold-200 bg-noir-900/80 backdrop-blur-sm px-3 py-1 rounded-full border border-gold-300/30 mb-1.5">
                      {lang === 'es' ? 'Hecho a Mano en Louisville' : 'Handcrafted in Louisville'}
                    </span>
                    <p className="font-serif text-xl sm:text-2xl italic">
                      {lang === 'es'
                        ? '“Pétalo a pétalo, el cariño en cada detalle”'
                        : '“Petal by petal, love in every detail”'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Secondary Card: Gift Box Preview */}
            <div className="hidden sm:flex items-center gap-4 absolute -bottom-7 -left-6 bg-cream-50/95 backdrop-blur-md p-3.5 rounded-2xl border border-gold-400/50 shadow-luxury max-w-xs">
              <img
                src="images/1_caja_gourmet_unboxing.jpg"
                alt="Caja Gourmet Ely's Charcuterie"
                className="w-16 h-16 rounded-xl object-cover shrink-0 border border-gold-300/40"
              />
              <div>
                <p className="text-[11px] uppercase tracking-[0.16em] text-gold-600 font-semibold">
                  {lang === 'es' ? 'Tablas • Cajas • Eventos' : 'Boards • Boxes • Events'}
                </p>
                <p className="font-serif text-base font-semibold text-noir-900 leading-snug">
                  {lang === 'es'
                    ? 'Propuestas para compartir y celebrar'
                    : 'Crafted to share and celebrate'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
