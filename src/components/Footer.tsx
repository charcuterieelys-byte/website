import React from 'react';
import { Language } from '../types/catalog';
import { BRAND_CONFIG } from '../data/catalog';

interface FooterProps {
  lang: Language;
  onOpenOrderModal: () => void;
}

/**
 * SECTION 9 — MINIMAL CHARCOAL STUDIO FOOTER
 * Includes:
 * - Original unaltered Elys logo
 * - Navigation
 * - Contact information
 * - Social media links
 * - Ordering information
 * - Copyright
 */
export const Footer: React.FC<FooterProps> = ({ lang, onOpenOrderModal }) => {
  return (
    <footer className="relative z-10 border-t border-[#F3EBDD]/10 pt-20 pb-14 px-6 sm:px-10 lg:px-16">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-[#F3EBDD]/10">
          {/* Original Elys Logo & Studio Identity */}
          <div className="md:col-span-5 space-y-5">
            <img
              src={BRAND_CONFIG.logoHorizontal}
              alt={BRAND_CONFIG.businessName}
              className="h-20 w-auto object-contain"
            />
            <p className="text-xs sm:text-sm text-[#F3EBDD]/65 font-light max-w-sm leading-relaxed">
              {lang === 'en'
                ? 'Beautifully curated charcuterie boards, two-tier baskets, individual cups and celebration boxes crafted in Louisville, Kentucky.'
                : 'Tablas de charcutería, cestas de dos niveles, vasos individuales y cajas de celebración creadas en Louisville, Kentucky.'}
            </p>
            <p className="text-[11px] tracking-[0.24em] uppercase text-[#C9A96E]/85">
              {BRAND_CONFIG.city}
            </p>
          </div>

          {/* Navigation */}
          <div className="md:col-span-3 space-y-4">
            <p className="text-[10px] tracking-[0.28em] uppercase text-[#C9A96E]">
              {lang === 'en' ? 'NAVIGATION' : 'NAVEGACIÓN'}
            </p>
            <ul className="space-y-3 text-xs tracking-[0.2em] uppercase text-[#F3EBDD]/70">
              <li>
                <a
                  href="#collection"
                  className="hover:text-[#C9A96E] transition-colors"
                >
                  {lang === 'en' ? 'Collection' : 'Colección'}
                </a>
              </li>
              <li>
                <a
                  href="#occasions"
                  className="hover:text-[#C9A96E] transition-colors"
                >
                  {lang === 'en' ? 'Occasions' : 'Ocasiones'}
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="hover:text-[#C9A96E] transition-colors"
                >
                  {lang === 'en' ? 'About' : 'Historia'}
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="hover:text-[#C9A96E] transition-colors"
                >
                  {lang === 'en' ? 'Contact' : 'Contacto'}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact, Social & Ordering Information */}
          <div className="md:col-span-4 space-y-4">
            <p className="text-[10px] tracking-[0.28em] uppercase text-[#C9A96E]">
              {lang === 'en' ? 'ORDERING & CONTACT' : 'PEDIDOS Y CONTACTO'}
            </p>
            <p className="text-xs sm:text-sm text-[#F3EBDD]/65 font-light leading-relaxed">
              {lang === 'en'
                ? 'All creations are prepared fresh to order. Advance reservation is recommended for boards, boxes and private events.'
                : 'Todas las creaciones se preparan frescas bajo pedido. Se recomienda reservar con anticipación para tablas, cajas y eventos.'}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-6 text-[11px] tracking-[0.22em] uppercase">
              <button
                type="button"
                onClick={onOpenOrderModal}
                className="text-[#C9A96E] hover:text-[#F3EBDD] transition-colors"
              >
                {lang === 'en' ? 'REQUEST AN ORDER →' : 'SOLICITAR PEDIDO →'}
              </button>
              <a
                href={`https://wa.me/${BRAND_CONFIG.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#F3EBDD]/75 hover:text-[#C9A96E] transition-colors"
              >
                WHATSAPP
              </a>
              <a
                href={BRAND_CONFIG.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#F3EBDD]/75 hover:text-[#C9A96E] transition-colors"
              >
                INSTAGRAM
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] tracking-[0.18em] uppercase text-[#F3EBDD]/40">
          <p>
            © {new Date().getFullYear()} {BRAND_CONFIG.businessName}. ALL RIGHTS
            RESERVED.
          </p>
          <p>
            {BRAND_CONFIG.founderName} · {BRAND_CONFIG.city}
          </p>
        </div>
      </div>
    </footer>
  );
};
