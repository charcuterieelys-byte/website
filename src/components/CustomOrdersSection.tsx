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
 * SECTION 8 — CUSTOM ORDERS
 * Visually distinct editorial invitation to create a personalized charcuterie experience.
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

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.custom-order-reveal',
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const steps =
    lang === 'en'
      ? [
          {
            num: 'I',
            title: 'Choose Your Presentation',
            text: 'Select a signature board, two-tier basket, cups, gift box, or custom grazing table.',
          },
          {
            num: 'II',
            title: 'Personalize Your Gathering',
            text: 'Share your date, guest count, dietary notes, or custom celebratory card message.',
          },
          {
            num: 'III',
            title: 'Pick-Up or Private Delivery',
            text: 'Handcrafted fresh to order in Louisville, KY. Ready for pick-up, with delivery available upon private request.',
          },
        ]
      : [
          {
            num: 'I',
            title: 'Elige Tu Presentación',
            text: 'Selecciona una tabla, doble cesta, vasos individuales, caja de regalo o mesa completa.',
          },
          {
            num: 'II',
            title: 'Personaliza Tu Evento',
            text: 'Indícanos tu fecha, número de invitados, preferencias o mensaje de dedicatoria.',
          },
          {
            num: 'III',
            title: 'Pick-Up o Delivery al Privado',
            text: 'Elaborado fresco bajo pedido en Louisville, KY. Listo para recoger (pick-up) o con opción de delivery solicitándolo por privado.',
          },
        ];

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative z-10 py-24 sm:py-32 lg:py-40 px-6 sm:px-10 lg:px-16"
    >
      {/* Tactile Printed Invitation Card with Classic Double Filete Frame */}
      <div className="max-w-[1240px] mx-auto rounded-[4px] border border-[#841F17]/30 bg-[#FAF6EC]/90 p-2 sm:p-3 shadow-[0_24px_60px_rgba(96,26,18,0.10)]">
        <div className="rounded-[2px] border border-[#841F17]/18 px-6 sm:px-12 lg:px-20 py-14 sm:py-20 text-center space-y-8">
          {/* Floating Sculptural Preview Above Custom Order Invitation */}
          <div className="custom-order-reveal relative mx-auto w-full max-w-[380px] sm:max-w-[440px] flex items-center justify-center">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute w-[76%] h-[76%] rounded-full blur-[70px] opacity-80"
              style={{
                background:
                  'radial-gradient(circle, rgba(250, 245, 232, 0.85) 0%, rgba(240, 224, 178, 0.4) 50%, transparent 74%)',
              }}
            />
            <img
              src={featuredCups.posterSrc}
              alt={featuredCups.name[lang]}
              loading="lazy"
              className="w-full h-auto object-contain floating-product-shadow"
            />
          </div>

          <p className="custom-order-reveal font-serif italic text-lg sm:text-xl text-[#841F17]">
            {lang === 'en'
              ? 'Bespoke Tables & Private Events'
              : 'Mesas a Medida y Eventos Privados'}
          </p>

          <h2 className="custom-order-reveal font-serif font-normal text-4xl sm:text-5xl xl:text-[4.1rem] text-[#841F17] tracking-[-0.02em] leading-[1.03] max-w-3xl mx-auto">
            {lang === 'en'
              ? 'Every celebration deserves its own signature table.'
              : 'Cada celebración merece una creación a su medida.'}
          </h2>

          <p className="custom-order-reveal text-base sm:text-lg text-[#4A120E]/90 font-normal leading-relaxed max-w-2xl mx-auto">
            {lang === 'en'
              ? 'Whether you are ordering a single board, curating gift boxes, or planning a custom grazing table in Louisville, we tailor every detail to your gathering.'
              : 'Ya sea que busques una tabla de autor, cajas de regalo o una mesa completa para tu evento en Louisville, diseñamos cada detalle para tu ocasión.'}
          </p>

          {/* Three-Step Bespoke Ordering Process with Classic Roman Numerals */}
          <div className="custom-order-reveal pt-4 pb-2 grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 text-left border-y border-[#841F17]/15 py-8 max-w-4xl mx-auto">
            {steps.map((step) => (
              <div key={step.num} className="space-y-2">
                <span className="font-serif italic text-base text-[#841F17] font-semibold">
                  {step.num}.
                </span>
                <h3 className="font-serif text-xl text-[#841F17] font-normal">
                  {step.title}
                </h3>
                <p className="text-sm text-[#4A120E]/85 leading-relaxed">
                  {step.text}
                </p>
              </div>
            ))}
          </div>

          {/* Required Primary CTA & Direct WhatsApp Concierge */}
          <div className="custom-order-reveal pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              type="button"
              onClick={onOpenOrderModal}
              className="w-full sm:w-auto inline-flex items-center justify-center px-10 py-4 rounded-[3px] bg-[#841F17] hover:bg-[#63150F] text-[#FAF5E8] text-xs font-semibold tracking-[0.24em] uppercase transition-all duration-300 shadow-sm"
            >
              {lang === 'en'
                ? "LET'S CREATE SOMETHING SPECIAL"
                : 'CREEMOS ALGO ESPECIAL'}
            </button>

            <a
              href={`https://wa.me/${BRAND_CONFIG.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-[3px] border border-[#841F17]/55 hover:border-[#841F17] bg-[#FAF5E8] hover:bg-[#841F17] text-[#841F17] hover:text-[#FAF5E8] text-xs font-semibold tracking-[0.22em] uppercase transition-all duration-300"
            >
              {lang === 'en' ? 'DIRECT WHATSAPP CONCIERGE' : 'WHATSAPP DIRECTO'}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
