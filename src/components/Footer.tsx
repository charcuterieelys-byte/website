import React from 'react';
import { Instagram, MessageCircle, MapPin, Heart, ArrowUpRight } from 'lucide-react';
import { Language } from '../types/catalog';
import { BRAND_CONFIG } from '../data/catalog';

interface FooterProps {
  lang: Language;
}

export const Footer: React.FC<FooterProps> = ({ lang }) => {
  const whatsappUrl = `https://wa.me/${BRAND_CONFIG.whatsappNumber}?text=${encodeURIComponent(
    lang === 'es'
      ? 'Hola Elianne, visité la web de Ely’s Charcuterie en Louisville y me gustaría hacer un pedido.'
      : 'Hi Elianne! I visited Ely’s Charcuterie website in Louisville and would love to place an order.'
  )}`;

  return (
    <>
      <footer className="bg-noir-950 text-cream-100 border-t border-gold-300/20 relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-32 left-1/2 -translate-x-1/2 w-[700px] h-[260px] rounded-full bg-gold-400/5 blur-3xl"
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-gold-400/15">
            <div className="md:col-span-5 space-y-5">
              <div className="flex items-center gap-4">
                <img
                  src="brand/logo-horizontal-bicolor.svg"
                  alt="Ely’s Charcuterie"
                  className="h-14 w-auto object-contain"
                />
              </div>
              <p className="text-sm text-cream-200/80 max-w-sm leading-relaxed">
                {lang === 'es'
                  ? 'Creado por Elianne Lafuente en Louisville, Kentucky. Tablas y mesas de charcutería pensadas para transformar los pequeños detalles en momentos especiales alrededor de una mesa.'
                  : 'Created by Elianne Lafuente in Louisville, Kentucky. Artisanal charcuterie boards and grazing tables designed to turn small details into special moments around the table.'}
              </p>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-noir-900 border border-gold-300/25 text-xs text-gold-200 whitespace-nowrap">
                <MapPin className="w-3.5 h-3.5 text-gold-300 shrink-0" />
                <span>Louisville, Kentucky</span>
              </div>
            </div>

            <div className="md:col-span-3 space-y-4">
              <p className="text-[11px] uppercase tracking-[0.22em] text-gold-300 font-semibold whitespace-nowrap">
                {lang === 'es' ? 'Explorar' : 'Explore'}
              </p>
              <ul className="space-y-3 text-sm text-cream-200/80">
                <li>
                  <a href="#inicio" className="hover:text-gold-200 transition-colors whitespace-nowrap">
                    {lang === 'es' ? 'Bienvenida' : 'Welcome'}
                  </a>
                </li>
                <li>
                  <a href="#historia" className="hover:text-gold-200 transition-colors whitespace-nowrap">
                    {lang === 'es' ? 'Mi historia' : 'My story'}
                  </a>
                </li>
                <li>
                  <a href="#catalogo" className="hover:text-gold-200 transition-colors whitespace-nowrap">
                    {lang === 'es' ? 'Colección de tablas' : 'Boards collection'}
                  </a>
                </li>
                <li>
                  <a href="#eventos" className="hover:text-gold-200 transition-colors whitespace-nowrap">
                    {lang === 'es' ? 'Mesas para eventos' : 'Events & cart'}
                  </a>
                </li>
                <li>
                  <a href="#galeria" className="hover:text-gold-200 transition-colors whitespace-nowrap">
                    {lang === 'es' ? 'Galería editorial' : 'Editorial gallery'}
                  </a>
                </li>
                <li>
                  <a href="#como-ordenar" className="hover:text-gold-200 transition-colors whitespace-nowrap">
                    {lang === 'es' ? 'Cómo ordenar' : 'How to order'}
                  </a>
                </li>
              </ul>
            </div>

            <div className="md:col-span-4 space-y-4">
              <p className="text-[11px] uppercase tracking-[0.22em] text-gold-300 font-semibold whitespace-nowrap">
                {lang === 'es' ? 'Concierge directo' : 'Direct concierge'}
              </p>
              <p className="text-sm text-cream-200/80 leading-relaxed">
                {lang === 'es'
                  ? 'Haz tu pedido o solicita una cotización personalizada para tu próximo evento en Louisville:'
                  : 'Place your order or request a bespoke quote for your upcoming event in Louisville:'}
              </p>

              <div className="flex flex-wrap gap-3 pt-2">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 h-11 px-5 rounded-full bg-gold-200 hover:bg-gold-300 text-noir-950 text-xs font-bold transition-all duration-300 whitespace-nowrap"
                >
                  <MessageCircle className="w-4 h-4 shrink-0" />
                  <span>WhatsApp</span>
                  <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
                </a>

                <a
                  href={BRAND_CONFIG.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 h-11 px-5 rounded-full border border-gold-300/40 hover:border-gold-200 text-gold-200 text-xs font-semibold transition-all duration-300 whitespace-nowrap"
                >
                  <Instagram className="w-4 h-4 shrink-0" />
                  <span>Instagram</span>
                </a>
              </div>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-cream-200/60">
            <p>
              © {new Date().getFullYear()} {BRAND_CONFIG.businessName} ·{' '}
              {BRAND_CONFIG.founderName}. Louisville, Kentucky.
            </p>
            <p className="flex items-center gap-1.5">
              <span>
                {lang === 'es'
                  ? 'Hecho con ilusión y cariño en cada detalle'
                  : 'Crafted with warmth and care in every detail'}
              </span>
              <Heart className="w-3.5 h-3.5 text-crimson-700 fill-crimson-700 shrink-0" />
            </p>
          </div>
        </div>
      </footer>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar por WhatsApp"
        className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2.5 h-12 px-5 rounded-full liquid-glass-dark text-gold-200 hover:border-gold-300 transition-all duration-300 hover:-translate-y-0.5 whitespace-nowrap"
      >
        <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
        <MessageCircle className="w-4 h-4 text-gold-300 shrink-0" />
        <span className="text-xs font-semibold hidden sm:inline whitespace-nowrap">
          {lang === 'es' ? 'Concierge WhatsApp' : 'WhatsApp Concierge'}
        </span>
      </a>
    </>
  );
};
