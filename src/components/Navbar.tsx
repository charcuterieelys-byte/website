import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X, Instagram, MessageCircle, Globe, ArrowUpRight } from 'lucide-react';
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
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 48);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navItems = [
    { href: '#inicio', label: lang === 'es' ? 'Inicio' : 'Welcome' },
    { href: '#historia', label: lang === 'es' ? 'El Atelier' : 'The Atelier' },
    { href: '#catalogo', label: lang === 'es' ? 'Colección' : 'Collection' },
    { href: '#eventos', label: lang === 'es' ? 'Eventos' : 'Events' },
    { href: '#galeria', label: lang === 'es' ? 'Galería' : 'Gallery' },
    { href: '#como-ordenar', label: lang === 'es' ? 'Proceso' : 'Process' },
  ];

  const whatsappDirectUrl = `https://wa.me/${BRAND_CONFIG.whatsappNumber}?text=${encodeURIComponent(
    lang === 'es'
      ? 'Hola Elianne, visité la web de Ely’s Charcuterie en Louisville y me gustaría recibir información sobre tus tablas y servicios.'
      : 'Hi Elianne! I visited Ely’s Charcuterie website in Louisville and would love information about your boards and event services.'
  )}`;

  return (
    <header className="fixed top-4 sm:top-6 inset-x-0 z-50 px-3 sm:px-6 lg:px-10 pointer-events-none">
      <div
        className={`max-w-7xl mx-auto pointer-events-auto rounded-full px-4 sm:px-7 h-16 sm:h-[74px] flex items-center justify-between gap-3 transition-all duration-500 ${
          scrolled
            ? 'liquid-glass-light text-noir-900'
            : 'liquid-glass-dark text-cream-50'
        }`}
      >
        <a href="#inicio" className="flex items-center gap-3 shrink-0 group">
          <div
            className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center transition-transform duration-500 group-hover:scale-105 ${
              scrolled
                ? 'bg-noir-900/5 border border-gold-400/40'
                : 'bg-cream-50/10 border border-gold-300/30'
            }`}
          >
            <img
              src={scrolled ? 'brand/isotipo-rosa-rojo.svg' : 'brand/isotipo-rosa-dorado.svg'}
              alt="Ely’s Charcuterie Rose Emblem"
              className="h-6 w-6 sm:h-7 sm:w-7 object-contain"
            />
          </div>
          <div className="flex flex-col">
            <span
              className={`font-serif text-xl sm:text-2xl font-semibold tracking-tight leading-none whitespace-nowrap ${
                scrolled ? 'text-noir-900' : 'text-cream-50'
              }`}
            >
              Ely’s Charcuterie
            </span>
            <span
              className={`hidden sm:block text-[11px] tracking-wide mt-1 whitespace-nowrap ${
                scrolled ? 'text-noir-600' : 'text-gold-200/85'
              }`}
            >
              Elianne Lafuente · Louisville, KY
            </span>
          </div>
        </a>

        <nav className="hidden xl:flex items-center gap-7">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`relative text-sm font-medium transition-colors py-1 whitespace-nowrap after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1.5px] after:origin-right after:scale-x-0 hover:after:origin-left hover:after:scale-x-100 after:transition-transform after:duration-300 ${
                scrolled
                  ? 'text-noir-700 hover:text-noir-950 after:bg-gold-500'
                  : 'text-cream-100/85 hover:text-gold-200 after:bg-gold-300'
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          <button
            onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
            className={`inline-flex items-center gap-1.5 h-10 px-3.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap shrink-0 ${
              scrolled
                ? 'border border-gold-500/40 bg-cream-100/80 text-noir-900 hover:border-noir-900'
                : 'border border-gold-300/25 bg-cream-50/10 text-cream-50 hover:bg-cream-50/20'
            }`}
            title={lang === 'es' ? 'Switch to English' : 'Cambiar a Español'}
          >
            <Globe className="w-3.5 h-3.5 text-gold-400 shrink-0" />
            <span>{lang === 'es' ? 'ES' : 'EN'}</span>
          </button>

          <button
            onClick={onOpenCart}
            className={`relative inline-flex items-center gap-2 h-10 px-4 rounded-full text-xs font-semibold transition-all whitespace-nowrap shrink-0 ${
              scrolled
                ? 'border border-gold-500/40 bg-cream-100/90 hover:bg-gold-100/70 text-noir-900'
                : 'border border-gold-300/30 bg-cream-50/10 hover:bg-cream-50/20 text-cream-50'
            }`}
            aria-label={lang === 'es' ? 'Ver mi pedido' : 'View my order'}
          >
            <ShoppingBag className="w-4 h-4 text-gold-400 shrink-0" />
            <span className="hidden sm:inline whitespace-nowrap">
              {lang === 'es' ? 'Mi pedido' : 'Order bag'}
            </span>
            {cartCount > 0 && (
              <span className="inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 text-[11px] font-bold rounded-full bg-gold-400 text-noir-950 num">
                {cartCount}
              </span>
            )}
          </button>

          <a
            href="#cotizar"
            className={`hidden md:inline-flex items-center gap-1.5 h-10 px-5 rounded-full text-xs font-semibold transition-all duration-300 whitespace-nowrap shrink-0 ${
              scrolled
                ? 'bg-noir-900 hover:bg-noir-800 text-gold-200 shadow-sm'
                : 'bg-gradient-to-r from-gold-200 via-gold-300 to-gold-200 text-noir-950 hover:brightness-105 shadow-gold-glow'
            }`}
          >
            <span>{lang === 'es' ? 'Cotizar evento' : 'Inquire'}</span>
            <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
          </a>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`xl:hidden inline-flex items-center justify-center w-10 h-10 rounded-full transition-colors shrink-0 ${
              scrolled
                ? 'border border-gold-400/50 text-noir-900 hover:bg-cream-200/60'
                : 'border border-gold-300/30 text-cream-50 hover:bg-cream-50/15'
            }`}
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="xl:hidden mt-3 max-w-xl mx-auto pointer-events-auto rounded-3xl liquid-glass-dark text-cream-50 p-6 space-y-5 animate-fadeIn">
          <div className="flex flex-col space-y-1">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-xl font-serif font-medium text-cream-50 hover:text-gold-300 py-2.5 border-b border-gold-300/15 transition-colors flex items-center justify-between"
              >
                <span>{item.label}</span>
                <ArrowUpRight className="w-4 h-4 text-gold-300/70" />
              </a>
            ))}
          </div>

          <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <a
              href={whatsappDirectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 h-12 px-5 rounded-full bg-gradient-to-r from-gold-200 to-gold-300 text-noir-950 text-xs font-bold transition-all whitespace-nowrap"
            >
              <MessageCircle className="w-4 h-4 shrink-0" />
              <span>{lang === 'es' ? 'Pedir por WhatsApp' : 'Order via WhatsApp'}</span>
            </a>
            <a
              href={BRAND_CONFIG.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 h-12 px-5 rounded-full border border-gold-300/35 bg-cream-50/10 text-cream-50 text-xs font-semibold transition-all whitespace-nowrap"
            >
              <Instagram className="w-4 h-4 text-gold-300 shrink-0" />
              <span>{BRAND_CONFIG.instagramHandle}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
