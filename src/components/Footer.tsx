import React from 'react';
import { Instagram, MessageCircle, MapPin, Heart } from 'lucide-react';
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
      <footer className="bg-noir-950 text-cream-100 border-t border-gold-400/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-gold-400/20">
            <div className="md:col-span-5 space-y-4">
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
              <div className="flex items-center gap-2 text-xs text-gold-200 pt-1">
                <MapPin className="w-4 h-4 text-gold-300" />
                <span>Louisville, Kentucky</span>
              </div>
            </div>

            <div className="md:col-span-3 space-y-3">
              <h4 className="font-serif text-xl text-gold-200 font-semibold">
                {lang === 'es' ? 'Navegación' : 'Explore'}
              </h4>
              <ul className="space-y-2.5 text-sm text-cream-200/80">
                <li>
                  <a href="#inicio" className="hover:text-gold-200 transition-colors">
                    {lang === 'es' ? 'Bienvenida' : 'Welcome'}
                  </a>
                </li>
                <li>
                  <a href="#historia" className="hover:text-gold-200 transition-colors">
                    {lang === 'es' ? 'Sobre mí (Elianne Lafuente)' : 'My story (Elianne Lafuente)'}
                  </a>
                </li>
                <li>
                  <a href="#catalogo" className="hover:text-gold-200 transition-colors">
                    {lang === 'es' ? 'Catálogo de tablas' : 'Boards catalog'}
                  </a>
                </li>
                <li>
                  <a href="#eventos" className="hover:text-gold-200 transition-colors">
                    {lang === 'es' ? 'Mesas y carrito para eventos' : 'Events & mobile cart'}
                  </a>
                </li>
                <li>
                  <a href="#galeria" className="hover:text-gold-200 transition-colors">
                    {lang === 'es' ? 'Galería de trabajos' : 'Work gallery'}
                  </a>
                </li>
                <li>
                  <a href="#como-ordenar" className="hover:text-gold-200 transition-colors">
                    {lang === 'es' ? 'Cómo ordenar' : 'How to order'}
                  </a>
                </li>
              </ul>
            </div>

            <div className="md:col-span-4 space-y-4">
              <h4 className="font-serif text-xl text-gold-200 font-semibold">
                {lang === 'es' ? 'Contacto directo' : 'Direct contact'}
              </h4>
              <p className="text-sm text-cream-200/80">
                {lang === 'es'
                  ? 'Haz tu pedido o solicita una cotización para tu próximo evento en Louisville:'
                  : 'Place your order or request a quote for your upcoming event in Louisville:'}
              </p>

              <div className="flex flex-col sm:flex-row gap-3 pt-1">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-gold-200 hover:bg-gold-300 text-noir-950 text-xs font-bold transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp</span>
                </a>

                <a
                  href={BRAND_CONFIG.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full border border-gold-300/50 hover:border-gold-200 text-gold-200 text-xs font-semibold transition-colors"
                >
                  <Instagram className="w-4 h-4" />
                  <span>Instagram</span>
                </a>
              </div>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-cream-200/60">
            <p>
              © {new Date().getFullYear()} {BRAND_CONFIG.businessName},{' '}
              {BRAND_CONFIG.founderName}. Louisville, Kentucky.
            </p>
            <p className="flex items-center gap-1.5">
              <span>
                {lang === 'es'
                  ? 'Hecho con ilusión y cariño en cada detalle'
                  : 'Crafted with warmth and care in every detail'}
              </span>
              <Heart className="w-3.5 h-3.5 text-crimson-700 fill-crimson-700" />
            </p>
          </div>
        </div>
      </footer>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar por WhatsApp"
        className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2.5 px-4 py-3.5 rounded-full bg-noir-900 hover:bg-noir-800 text-gold-200 border border-gold-400/60 shadow-luxury transition-colors"
      >
        <MessageCircle className="w-5 h-5 text-gold-300" />
        <span className="text-xs font-semibold hidden sm:inline">
          WhatsApp
        </span>
      </a>
    </>
  );
};
