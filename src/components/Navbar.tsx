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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
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
          ? 'bg-[#17181A]/75 backdrop-blur-md border-b border-[#F3EBDD]/[0.06] py-3.5'
          : 'bg-transparent py-5 sm:py-7'
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 flex items-center justify-between">
        {/* Original Elys Logo on the left — completely unchanged */}
        <a
          href="#top"
          className="inline-flex items-center focus:outline-none group"
          aria-label={BRAND_CONFIG.businessName}
        >
          <img
            src={BRAND_CONFIG.logoHorizontal}
            alt={BRAND_CONFIG.businessName}
            className="h-11 sm:h-14 w-auto object-contain transition-transform duration-500 group-hover:scale-[1.02]"
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
              className="text-[11px] font-medium tracking-[0.26em] uppercase text-[#F3EBDD]/75 hover:text-[#C9A96E] transition-colors duration-300"
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
            className="text-[11px] tracking-[0.22em] uppercase text-[#F3EBDD]/60 hover:text-[#F3EBDD] transition-colors px-2 py-1"
            aria-label="Switch language"
          >
            {lang === 'en' ? 'ES' : 'EN'}
          </button>

          <button
            type="button"
            onClick={() => onOpenOrderModal()}
            className="inline-flex items-center justify-center px-5 sm:px-6 py-2.5 text-[11px] font-medium tracking-[0.24em] uppercase text-[#F3EBDD] border border-[#C9A96E]/55 hover:border-[#C9A96E] hover:bg-[#C9A96E]/10 transition-all duration-300"
          >
            {lang === 'en' ? 'ORDER' : 'ORDENAR'}
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="md:hidden p-2 text-[#F3EBDD]/80 hover:text-[#C9A96E] transition-colors"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Minimal Mobile Overlay Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#17181A]/95 backdrop-blur-xl border-b border-[#F3EBDD]/10 px-6 py-8">
          <nav className="flex flex-col gap-5">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs tracking-[0.26em] uppercase text-[#F3EBDD]/85 hover:text-[#C9A96E] py-1 transition-colors"
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
