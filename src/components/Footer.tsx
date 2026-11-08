import React from 'react';
import { Lock } from 'lucide-react';
import { BrandConfigData, Language, Product } from '../types/catalog';
import { BRAND_CONFIG, PRODUCTS } from '../data/catalog';

interface FooterProps {
  lang: Language;
  products?: Product[];
  brandConfig?: BrandConfigData;
  onOpenOrderModal: (selection?: string) => void;
  onOpenAdmin?: () => void;
}

/**
 * SECTION 8 — COMPLETE EDITORIAL STUDIO FOOTER
 * Includes:
 * - Official untouched Elys logo (vertical Cream/Burgundy emblem)
 * - Complete Collection quick-inquire index
 * - Studio navigation
 * - Contact, Social & Ordering Concierge information
 * - Copyright & Admin Panel entry
 */
export const Footer: React.FC<FooterProps> = ({
  lang,
  products = PRODUCTS,
  brandConfig = BRAND_CONFIG,
  onOpenOrderModal,
  onOpenAdmin,
}) => {
  return (
    <footer className="relative z-10 border-t border-[#841F17]/25 bg-[#E2C684]/45 pt-20 pb-14 px-6 sm:px-10 lg:px-16">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-[#841F17]/20">
          {/* Column 1: Official Untouched Elys Logo & Studio Identity */}
          <div className="md:col-span-4 space-y-5">
            <img
              src={BRAND_CONFIG.logoVertical}
              alt={BRAND_CONFIG.businessName}
              className="h-28 w-auto object-contain"
            />
            <p className="text-sm text-[#4A120E]/90 font-normal max-w-sm leading-relaxed">
              {lang === 'en'
                ? 'Beautifully curated charcuterie boards, two-tier baskets, individual cups and celebration boxes handcrafted in Louisville, Kentucky.'
                : 'Tablas de charcutería, cestas de dos niveles, vasos individuales y cajas de celebración elaboradas a mano en Louisville, Kentucky.'}
            </p>
            <p className="text-xs font-semibold tracking-[0.24em] uppercase text-[#841F17]">
              {BRAND_CONFIG.city}
            </p>
          </div>

          {/* Column 2: The 01–07 Collection Quick Index */}
          <div className="md:col-span-3 space-y-4">
            <p className="text-xs font-bold tracking-[0.24em] uppercase text-[#841F17]">
              {lang === 'en' ? 'THE COLLECTION' : 'LA COLECCIÓN'}
            </p>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[#4A120E]/85">
              {products.map((p) => (
                <li key={p.id}>
                  <button
                    type="button"
                    onClick={() => onOpenOrderModal(`${p.id} — ${p.name[lang]}`)}
                    className="group inline-flex items-baseline gap-2.5 text-left hover:text-[#841F17] transition-colors"
                  >
                    <span className="num text-[11px] font-semibold text-[#841F17]/75 group-hover:text-[#841F17]">
                      {p.id}
                    </span>
                    <span>{p.name[lang]}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Navigation */}
          <div className="md:col-span-2 space-y-4">
            <p className="text-xs font-bold tracking-[0.24em] uppercase text-[#841F17]">
              {lang === 'en' ? 'EXPLORE' : 'EXPLORAR'}
            </p>
            <ul className="space-y-3 text-xs font-semibold tracking-[0.18em] uppercase text-[#5A120D]/85">
              <li>
                <a
                  href="#top"
                  className="hover:text-[#841F17] transition-colors"
                >
                  {lang === 'en' ? 'Studio Home' : 'Inicio'}
                </a>
              </li>
              <li>
                <a
                  href="#collection"
                  className="hover:text-[#841F17] transition-colors"
                >
                  {lang === 'en' ? 'Collection' : 'Colección'}
                </a>
              </li>
              <li>
                <a
                  href="#pairing-guide"
                  className="hover:text-[#841F17] transition-colors"
                >
                  {lang === 'en' ? 'Pairing Guide' : 'Combinaciones'}
                </a>
              </li>
              <li>
                <a
                  href="#gallery"
                  className="hover:text-[#841F17] transition-colors"
                >
                  {lang === 'en' ? 'Gallery' : 'Galería'}
                </a>
              </li>
              <li>
                <a
                  href="#occasions"
                  className="hover:text-[#841F17] transition-colors"
                >
                  {lang === 'en' ? 'Occasions' : 'Ocasiones'}
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="hover:text-[#841F17] transition-colors"
                >
                  {lang === 'en' ? 'About' : 'Historia'}
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="hover:text-[#841F17] transition-colors"
                >
                  {lang === 'en' ? 'Custom Orders' : 'Pedidos'}
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact, Social & Ordering Concierge */}
          <div className="md:col-span-3 space-y-4">
            <p className="text-xs font-bold tracking-[0.24em] uppercase text-[#841F17]">
              {lang === 'en' ? 'ORDERING & CONTACT' : 'PEDIDOS Y CONTACTO'}
            </p>
            <p className="text-sm text-[#4A120E]/90 font-normal leading-relaxed">
              {lang === 'en'
                ? 'All creations are prepared fresh to order for pick-up in Louisville, KY. Delivery is available upon private request.'
                : 'Todas las creaciones se preparan frescas bajo pedido para recoger (pick-up) en Louisville, KY. Servicio de delivery disponible solicitándolo por privado.'}
            </p>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => onOpenOrderModal()}
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-[3px] bg-[#841F17] hover:bg-[#63150F] text-[#FAF5E8] text-xs font-semibold tracking-[0.22em] uppercase transition-colors shadow-sm"
              >
                {lang === 'en' ? 'REQUEST AN ORDER' : 'SOLICITAR PEDIDO'}
              </button>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-6 text-xs font-semibold tracking-[0.2em] uppercase">
              <a
                href={`https://wa.me/${brandConfig.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#5A120D]/85 hover:text-[#841F17] transition-colors"
              >
                WHATSAPP
              </a>
              <a
                href={brandConfig.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#5A120D]/85 hover:text-[#841F17] transition-colors"
              >
                INSTAGRAM
              </a>
            </div>
          </div>
        </div>

        {/* Copyright & Discreet Admin Button */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium tracking-[0.16em] uppercase text-[#5A120D]/75">
          <p>
            © {new Date().getFullYear()} {brandConfig.businessName}. ALL RIGHTS
            RESERVED.
          </p>
          <div className="flex items-center gap-6">
            <p>
              {brandConfig.founderName} · {brandConfig.city}
            </p>
            {onOpenAdmin && (
              <button
                type="button"
                onClick={onOpenAdmin}
                className="inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.18em] uppercase text-[#841F17]/65 hover:text-[#841F17] transition-colors"
              >
                <Lock className="w-3.5 h-3.5" />
                {lang === 'en' ? 'ADMIN' : 'PANEL ADMIN'}
              </button>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};
