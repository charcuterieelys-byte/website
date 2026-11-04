import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Language } from '../types/catalog';
import { BRAND_CONFIG, PRODUCTS } from '../data/catalog';

gsap.registerPlugin(ScrollTrigger);

interface CustomOrdersSectionProps {
  lang: Language;
  onOpenOrderModal: () => void;
}

/**
 * SECTION 9 — CUSTOM ORDERS
 * Visually distinct invitation to create a personalized charcuterie experience.
 * Required CTA: "LET'S CREATE SOMETHING SPECIAL"
 */
export const CustomOrdersSection: React.FC<CustomOrdersSectionProps> = ({
  lang,
  onOpenOrderModal,
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const featuredCups = PRODUCTS[4]; // 05 Individual Charcuterie Cups

  useEffect(() => {
    if (!sectionRef.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.custom-order-reveal',
        { y: 36, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 78%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative z-10 py-28 sm:py-36 lg:py-44 px-6 sm:px-10 lg:px-16"
    >
      <div className="max-w-[1160px] mx-auto text-center space-y-8">
        {/* Floating Sculptural Preview Above Custom Order Invitation */}
        <div className="custom-order-reveal relative mx-auto w-full max-w-[440px] flex items-center justify-center">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute w-[70%] h-[70%] rounded-full blur-[80px] opacity-45"
            style={{
              background:
                'radial-gradient(circle, rgba(201, 169, 110, 0.16) 0%, transparent 72%)',
            }}
          />
          <img
            src={featuredCups.posterSrc}
            alt={featuredCups.name[lang]}
            loading="lazy"
            className="w-full h-auto object-contain floating-product-shadow"
          />
        </div>

        <div className="custom-order-reveal flex items-center justify-center gap-3">
          <span className="w-8 h-px bg-[#C9A96E]/40" />
          <span className="text-[10px] sm:text-[11px] font-medium tracking-[0.3em] uppercase text-[#C9A96E]">
            {lang === 'en' ? 'CUSTOM ORDERS & EVENTS' : 'PEDIDOS PERSONALIZADOS'}
          </span>
          <span className="w-8 h-px bg-[#C9A96E]/40" />
        </div>

        <h2 className="custom-order-reveal font-serif font-light text-4xl sm:text-6xl xl:text-[4.2rem] text-[#F3EBDD] tracking-[-0.02em] leading-[1.03] max-w-3xl mx-auto">
          {lang === 'en'
            ? 'Every celebration deserves its own signature table.'
            : 'Cada celebración merece una creación a su medida.'}
        </h2>

        <p className="custom-order-reveal text-sm sm:text-base text-[#F3EBDD]/70 font-light leading-relaxed max-w-xl mx-auto">
          {lang === 'en'
            ? 'Whether you are ordering a single board, curating gift boxes, or planning a custom grazing table in Louisville, we tailor every detail to your gathering.'
            : 'Ya sea que busques una tabla de autor, cajas de regalo o una mesa completa para tu evento en Louisville, diseñamos cada detalle para tu ocasión.'}
        </p>

        {/* Required CTA: "LET'S CREATE SOMETHING SPECIAL" */}
        <div className="custom-order-reveal pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            type="button"
            onClick={onOpenOrderModal}
            className="w-full sm:w-auto inline-flex items-center justify-center px-10 py-4 bg-[#C9A96E] hover:bg-[#d8b980] text-[#17181A] text-[11px] font-semibold tracking-[0.26em] uppercase transition-all duration-300"
          >
            {lang === 'en'
              ? "LET'S CREATE SOMETHING SPECIAL"
              : 'CREEMOS ALGO ESPECIAL'}
          </button>

          <a
            href={`https://wa.me/${BRAND_CONFIG.whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 border border-[#F3EBDD]/20 hover:border-[#C9A96E] text-[#F3EBDD]/85 hover:text-[#C9A96E] text-[11px] font-medium tracking-[0.24em] uppercase transition-all duration-300"
          >
            {lang === 'en' ? 'DIRECT WHATSAPP' : 'WHATSAPP DIRECTO'}
          </a>
        </div>
      </div>
    </section>
  );
};
