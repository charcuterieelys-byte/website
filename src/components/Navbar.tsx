import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Language } from '../types/catalog';
import { BRAND_CONFIG } from '../data/catalog';

interface NavbarProps {
  lang: Language;
  onToggleLang: () => void;
  onOpenOrderModal: (productName?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  lang,
  onToggleLang,
  onOpenOrderModal,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [showNavLogo, setShowNavLogo] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      setShowNavLogo(window.scrollY > 180);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navItems = [
    {
      href: '#collection',
      label: lang === 'en' ? 'COLLECTION' : 'COLECCIÓN',
    },
    {
      href: '#occasions',
      label: lang === 'en' ? 'OCCASIONS' : 'OCASIONES',
    },
    {
      href: '#about',
      label: lang === 'en' ? 'ABOUT' : 'HISTORIA',
    },
    {
      href: '#contact',
      label: lang === 'en' ? 'CONTACT' : 'CONTACTO',
    },
  ];

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#E7D095]/85 backdrop-blur-md border-b border-[#841F17]/15 py-3'
          : 'bg-transparent py-4 sm:py-6'
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 flex items-center justify-between">
        {/* Official Elys Brand Sheet Logo on the left — emerges smoothly as the grand Hero logo recedes */}
        <a
          href="#top"
          className={`inline-flex items-center gap-3 focus:outline-none group transition-all duration-500 ${
            showNavLogo
              ? 'opacity-100 translate-y-0 pointer-events-auto'
              : 'opacity-0 -translate-y-2 pointer-events-none'
          }`}
          aria-label={BRAND_CONFIG.businessName}
        >
          <img
            src={BRAND_CONFIG.logoVertical}
            alt={BRAND_CONFIG.businessName}
            className="h-13 sm:h-15 w-auto object-contain transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </a>

        {/* Minimal Desktop Navigation */}
        <nav
          aria-label="Primary Navigation"
          className="hidden md:flex items-center gap-9 lg:gap-12"
        >
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-[11px] font-semibold tracking-[0.26em] uppercase text-[#5A120D]/80 hover:text-[#841F17] transition-colors duration-300"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Discreet Right Actions: Language Switch + ORDER Button */}
        <div className="flex items-center gap-4 sm:gap-6">
          <button
            type="button"
            onClick={onToggleLang}
            className="text-[11px] font-semibold tracking-[0.22em] uppercase text-[#841F17]/75 hover:text-[#841F17] transition-colors px-2 py-1"
            aria-label="Switch language"
          >
            {lang === 'en' ? 'ES' : 'EN'}
          </button>

          <button
            type="button"
            onClick={() => onOpenOrderModal()}
            className="inline-flex items-center justify-center px-5 sm:px-6 py-2.5 text-[11px] font-semibold tracking-[0.24em] uppercase text-[#FAF5E8] bg-[#841F17] hover:bg-[#68160F] border border-[#841F17] transition-all duration-300 shadow-sm"
          >
            {lang === 'en' ? 'ORDER' : 'ORDENAR'}
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="md:hidden p-2 text-[#841F17] hover:text-[#5A120D] transition-colors"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Minimal Mobile Overlay Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#E7D095]/95 backdrop-blur-xl border-b border-[#841F17]/20 px-6 py-8">
          <nav className="flex flex-col gap-5">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs font-semibold tracking-[0.26em] uppercase text-[#841F17] hover:text-[#5A120D] py-1 transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};
