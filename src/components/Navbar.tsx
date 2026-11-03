import React, { useState } from 'react';
import { ShoppingBag, Menu, X, Instagram, MessageCircle, Globe, MapPin } from 'lucide-react';
import { Language } from '../types/catalog';
import { BRAND_CONFIG } from '../data/catalog';

interface NavbarProps {
  lang: Language;
  setLang: (lang: Language) => void;
  cartCount: number;
  onOpenCart: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  lang,
  setLang,
  cartCount,
  onOpenCart,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { href: '#inicio', label: lang === 'es' ? 'Inicio' : 'Welcome' },
    { href: '#historia', label: lang === 'es' ? 'Mi historia' : 'My story' },
    { href: '#catalogo', label: lang === 'es' ? 'Catálogo' : 'Catalog' },
    { href: '#eventos', label: lang === 'es' ? 'Eventos' : 'Events' },
    { href: '#galeria', label: lang === 'es' ? 'Galería' : 'Gallery' },
    { href: '#como-ordenar', label: lang === 'es' ? 'Cómo ordenar' : 'How to order' },
    { href: '#cotizar', label: lang === 'es' ? 'Cotizar' : 'Inquire' },
  ];

  const whatsappDirectUrl = `https://wa.me/${BRAND_CONFIG.whatsappNumber}?text=${encodeURIComponent(
    lang === 'es'
      ? 'Hola Elianne, visité la web de Ely’s Charcuterie en Louisville y me gustaría recibir información sobre tus tablas y servicios.'
      : 'Hi Elianne! I visited Ely’s Charcuterie website in Louisville and would love information about your boards and event services.'
  )}`;

  return (
    <header className="sticky top-0 z-40 w-full bg-cream-50/95 backdrop-blur-md border-b border-gold-400/40 transition-colors">
      <div className="bg-noir-900 text-cream-100 text-xs py-1.5 px-4 sm:px-8 border-b border-gold-400/20">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-gold-200 min-w-0">
            <MapPin className="w-3.5 h-3.5 text-gold-300 shrink-0" />
            <span className="truncate">
              {lang === 'es'
                ? 'Louisville, Kentucky · Tablas y mesas de charcutería artesanal por Elianne Lafuente'
                : 'Louisville, Kentucky · Artisanal charcuterie boards and grazing tables by Elianne Lafuente'}
            </span>
          </div>

          <div className="hidden md:flex items-center gap-6 shrink-0">
            <a
              href={BRAND_CONFIG.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-cream-100 hover:text-gold-200 transition-colors whitespace-nowrap"
            >
              <Instagram className="w-3.5 h-3.5 text-gold-300 shrink-0" />
              <span>{BRAND_CONFIG.instagramHandle}</span>
            </a>
            <a
              href={whatsappDirectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-cream-100 hover:text-gold-200 transition-colors whitespace-nowrap"
            >
              <MessageCircle className="w-3.5 h-3.5 text-gold-300 shrink-0" />
              <span>WhatsApp directo</span>
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-2 sm:gap-4">
        <a href="#inicio" className="flex items-center gap-2.5 sm:gap-3 shrink-0 group">
          <img
            src="brand/isotipo-rosa-rojo.svg"
            alt="Ely’s Charcuterie Rose Emblem"
            className="h-8 w-8 sm:h-10 sm:w-10 object-contain shrink-0"
          />
          <div className="flex flex-col">
            <span className="font-serif text-lg sm:text-2xl font-semibold text-noir-900 leading-none whitespace-nowrap">
              Ely’s Charcuterie
            </span>
            <span className="hidden sm:block text-xs text-noir-600 mt-1 whitespace-nowrap">
              Elianne Lafuente · Louisville, KY
            </span>
          </div>
        </a>

        <nav className="hidden xl:flex items-center gap-5 2xl:gap-7">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-normal text-noir-700 hover:text-noir-900 transition-colors py-1 whitespace-nowrap"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          <button
            onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
            className="inline-flex items-center gap-1 sm:gap-1.5 h-10 px-2.5 sm:px-3.5 rounded-full border border-gold-500/60 bg-cream-100 text-noir-900 hover:border-noir-900 text-xs font-semibold transition-colors whitespace-nowrap shrink-0"
            title={lang === 'es' ? 'Switch to English' : 'Cambiar a Español'}
          >
            <Globe className="w-3.5 h-3.5 text-gold-600 shrink-0" />
            <span>{lang === 'es' ? 'ES' : 'EN'}</span>
          </button>

          <button
            onClick={onOpenCart}
            className="relative inline-flex items-center gap-2 h-10 px-3 sm:px-4 rounded-full border border-gold-500/60 bg-cream-100 hover:bg-gold-100/60 text-noir-900 transition-colors whitespace-nowrap shrink-0"
            aria-label={lang === 'es' ? 'Ver mi pedido' : 'View my order'}
          >
            <ShoppingBag className="w-4 h-4 text-gold-600 shrink-0" />
            <span className="hidden sm:inline text-xs font-semibold whitespace-nowrap">
              {lang === 'es' ? 'Mi pedido' : 'My order'}
            </span>
            {cartCount > 0 && (
              <span className="inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 text-xs font-bold rounded-full bg-noir-900 text-gold-200 num">
                {cartCount}
              </span>
            )}
          </button>

          <a
            href="#cotizar"
            className="hidden md:inline-flex items-center justify-center h-10 px-5 rounded-full bg-noir-900 hover:bg-noir-800 text-gold-200 border border-gold-400/40 text-xs font-semibold transition-colors whitespace-nowrap shrink-0"
          >
            {lang === 'es' ? 'Cotizar evento' : 'Book an event'}
          </a>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden inline-flex items-center justify-center w-10 h-10 rounded-full border border-gold-400/50 text-noir-900 hover:bg-cream-200/60 transition-colors shrink-0"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="xl:hidden bg-cream-50 border-b border-gold-300/50 px-6 py-6 space-y-4">
          <div className="flex flex-col space-y-2">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-serif font-semibold text-noir-900 hover:text-gold-600 py-2 border-b border-gold-200/40 transition-colors whitespace-nowrap"
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <a
              href={whatsappDirectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full h-11 px-5 rounded-full bg-noir-900 text-gold-200 text-xs font-semibold transition-colors whitespace-nowrap"
            >
              <MessageCircle className="w-4 h-4 text-gold-300 shrink-0" />
              <span>{lang === 'es' ? 'Pedir por WhatsApp' : 'Order via WhatsApp'}</span>
            </a>
            <a
              href={BRAND_CONFIG.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full h-11 px-5 rounded-full border border-gold-500 bg-cream-100 text-noir-900 text-xs font-semibold transition-colors whitespace-nowrap"
            >
              <Instagram className="w-4 h-4 text-gold-600 shrink-0" />
              <span>Instagram {BRAND_CONFIG.instagramHandle}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
