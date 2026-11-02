import React from 'react';
import { MessageCircle, Instagram, MapPin } from 'lucide-react';
import { Language } from '../types/catalog';
import { BRAND_CONFIG } from '../data/catalog';

interface HeroProps {
  lang: Language;
}

export const Hero: React.FC<HeroProps> = ({ lang }) => {
  const whatsappUrl = `https://wa.me/${BRAND_CONFIG.whatsappNumber}?text=${encodeURIComponent(
    lang === 'es'
      ? 'Hola Elianne, me encantaría hacer un pedido o cotizar un evento con Ely’s Charcuterie en Louisville.'
      : 'Hi Elianne! I would love to place an order or get an event quote with Ely’s Charcuterie in Louisville.'
  )}`;

  return (
    <section
      id="inicio"
      className="relative bg-cream-50 pt-8 pb-16 lg:pt-12 lg:pb-24 border-b border-gold-300/45"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          <div className="lg:col-span-5 space-y-6 text-left">
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-semibold text-noir-900 leading-[1.05]">
              {lang === 'es'
                ? 'Tablas de charcutería hechas a mano.'
                : 'Handcrafted charcuterie boards in Louisville.'}
            </h1>

            <p className="text-base sm:text-lg text-noir-700 leading-relaxed max-w-md">
              {lang === 'es'
                ? 'Creadas por Elianne Lafuente en Louisville, Kentucky, para compartir, disfrutar y reunir a las personas alrededor de una mesa.'
                : 'Created by Elianne Lafuente in Louisville, Kentucky, to invite people to share, savor, and gather around the table.'}
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              <a
                href="#catalogo"
                className="inline-flex items-center justify-center px-7 py-3.5 rounded-full bg-noir-900 hover:bg-noir-800 text-gold-200 border border-gold-400/50 text-sm font-semibold transition-colors"
              >
                {lang === 'es' ? 'Descubrir el catálogo' : 'Explore the catalog'}
              </a>

              <a
                href="#cotizar"
                className="inline-flex items-center justify-center px-7 py-3.5 rounded-full bg-cream-100 hover:bg-gold-200/40 text-noir-900 border border-gold-400/70 text-sm font-semibold transition-colors"
              >
                {lang === 'es' ? 'Cotizar un evento' : 'Request event quote'}
              </a>
            </div>

            <div className="pt-5 border-t border-gold-300/50 flex flex-wrap items-center gap-6 text-sm text-noir-700">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-semibold text-noir-900 hover:text-gold-600 transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-gold-600" />
                <span>WhatsApp</span>
              </a>
              <a
                href={BRAND_CONFIG.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-semibold text-noir-900 hover:text-gold-600 transition-colors"
              >
                <Instagram className="w-4 h-4 text-gold-600" />
                <span>{BRAND_CONFIG.instagramHandle}</span>
              </a>
              <span className="inline-flex items-center gap-1.5 text-noir-600">
                <MapPin className="w-4 h-4 text-gold-500" />
                <span>Louisville, KY</span>
              </span>
            </div>
          </div>

          <div className="lg:col-span-7">
            <figure className="rounded-2xl p-3 bg-cream-100 border border-gold-400/55 shadow-soft">
              <div className="rounded-xl overflow-hidden aspect-[16/10] bg-cream-200">
                <img
                  src="images/hero_grazing_table.jpg"
                  alt="Tabla de charcutería artesanal Ely’s Charcuterie en Louisville"
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <figcaption className="pt-3 px-1 flex items-center justify-between text-xs text-noir-600">
                <span>
                  {lang === 'es'
                    ? 'Tabla Rosa de Autor con queso Brie, miel en panal, higos frescos y Manchego'
                    : 'Signature Rose Board with Brie, raw honeycomb, fresh figs, and aged Manchego'}
                </span>
                <span className="font-medium text-noir-800">Louisville, KY</span>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
};
