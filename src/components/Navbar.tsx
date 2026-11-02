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
    { href: '#inicio', label: lang === 'es' ? 'Bienvenida' : 'Welcome' },
    { href: '#historia', label: lang === 'es' ? 'Mi historia' : 'My story' },
    { href: '#catalogo', label: lang === 'es' ? 'Catálogo' : 'Catalog' },
    { href: '#eventos', label: lang === 'es' ? 'Mesas y eventos' : 'Events' },
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
    <header className="sticky top-0 z-40 w-full bg-cream-50/95 backdrop-blur-md border-b border-gold-300/45 transition-colors">
      <div className="bg-noir-900 text-cream-100 text-xs py-2 px-4 sm:px-8 border-b border-gold-400/20">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 text-gold-200">
            <MapPin className="w-3.5 h-3.5 text-gold-300 shrink-0" />
            <span className="font-medium">
              {lang === 'es'
                ? 'Louisville, Kentucky: Tablas y mesas de charcutería artesanal'
                : 'Louisville, Kentucky: Artisanal charcuterie boards and grazing tables'}
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-6">
            <a
              href={BRAND_CONFIG.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-cream-200 hover:text-gold-200 transition-colors"
            >
              <Instagram className="w-3.5 h-3.5 text-gold-300" />
              <span>{BRAND_CONFIG.instagramHandle}</span>
            </a>
            <a
              href={whatsappDirectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-cream-200 hover:text-gold-200 transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5 text-gold-300" />
              <span>WhatsApp directo</span>
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <a href="#inicio" className="flex items-center gap-3.5 group">
          <img
            src="brand/isotipo-rosa-rojo.svg"
            alt="Ely’s Charcuterie Rose Emblem"
            className="h-11 w-11 object-contain"
          />
          <div className="flex flex-col">
            <span className="font-serif text-2xl sm:text-3xl font-semibold text-noir-900 leading-none">
              Ely’s Charcuterie
            </span>
            <span className="text-xs text-noir-600 mt-1">
              Elianne Lafuente, Louisville, KY
            </span>
          </div>
        </a>

        <nav className="hidden lg:flex items-center gap-7">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-noir-700 hover:text-gold-600 transition-colors py-1"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2.5 sm:gap-3.5">
          <button
            onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gold-300/60 bg-cream-100/80 text-noir-800 hover:border-gold-500 text-xs font-medium transition-colors"
            title={lang === 'es' ? 'Switch to English' : 'Cambiar a Español'}
          >
            <Globe className="w-3.5 h-3.5 text-gold-500" />
            <span className="font-semibold">{lang === 'es' ? 'Español' : 'English'}</span>
          </button>

          <button
            onClick={onOpenCart}
            className="relative inline-flex items-center gap-2 px-3.5 py-2 rounded-full border border-gold-400/60 bg-cream-100 hover:bg-gold-100/60 text-noir-900 transition-colors"
            aria-label={lang === 'es' ? 'Ver mi pedido' : 'View my order'}
          >
            <ShoppingBag className="w-4 h-4 text-gold-600" />
            <span className="hidden sm:inline text-xs font-semibold">
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
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-noir-900 hover:bg-noir-800 text-gold-200 border border-gold-400/40 text-xs font-semibold transition-colors"
          >
            {lang === 'es' ? 'Cotizar evento' : 'Book an event'}
          </a>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-noir-800 hover:bg-cream-200/60 transition-colors"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden bg-cream-50 border-b border-gold-300/40 px-6 py-6 space-y-4">
          <div className="flex flex-col space-y-3">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-serif font-medium text-noir-900 hover:text-gold-600 py-1.5 border-b border-gold-200/40 transition-colors"
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
              className="flex items-center justify-center gap-2 w-full py-3 rounded-full bg-noir-900 text-gold-200 text-xs font-semibold transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-gold-300" />
              <span>{lang === 'es' ? 'Pedir por WhatsApp' : 'Order via WhatsApp'}</span>
            </a>
            <a
              href={BRAND_CONFIG.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 rounded-full border border-gold-400 bg-cream-100 text-noir-900 text-xs font-semibold transition-colors"
            >
              <Instagram className="w-4 h-4 text-gold-600" />
              <span>Instagram {BRAND_CONFIG.instagramHandle}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
