import React, { useEffect, useRef } from 'react';
import { MessageCircle, Instagram, MapPin, ArrowUpRight, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Language } from '../types/catalog';
import { BRAND_CONFIG } from '../data/catalog';

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  lang: Language;
}

export const Hero: React.FC<HeroProps> = ({ lang }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const bgImageRef = useRef<HTMLImageElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const floatingCardRef = useRef<HTMLDivElement>(null);

  const whatsappUrl = `https://wa.me/${BRAND_CONFIG.whatsappNumber}?text=${encodeURIComponent(
    lang === 'es'
      ? 'Hola Elianne, me encantaría hacer un pedido o cotizar un evento con Ely’s Charcuterie en Louisville.'
      : 'Hi Elianne! I would love to place an order or get an event quote with Ely’s Charcuterie in Louisville.'
  )}`;

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance choreography
      gsap.fromTo(
        '.hero-reveal',
        { y: 36, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.15,
          stagger: 0.14,
          ease: 'power3.out',
          delay: 0.1,
        }
      );

      if (floatingCardRef.current) {
        gsap.fromTo(
          floatingCardRef.current,
          { y: 40, opacity: 0, scale: 0.96 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1.25,
            ease: 'power3.out',
            delay: 0.45,
          }
        );
      }

      // Subtle scrubbed parallax on the background photography
      if (bgImageRef.current && sectionRef.current) {
        gsap.fromTo(
          bgImageRef.current,
          { scale: 1.08, yPercent: 0 },
          {
            scale: 1.0,
            yPercent: 8,
            ease: 'none',
            force3D: true,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top top',
              end: 'bottom top',
              scrub: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="inicio"
      className="relative min-h-[100dvh] w-full overflow-hidden bg-noir-950 text-cream-50 flex flex-col justify-end pt-32 pb-12 sm:pb-16 lg:pb-20"
    >
      {/* Full-bleed atmospheric photography with multi-layered cinematic lighting */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          ref={bgImageRef}
          src="images/hero_grazing_table.jpg"
          alt="Tabla Rosa de Autor de Ely’s Charcuterie en Louisville"
          decoding="async"
          className="w-full h-full object-cover object-center will-change-transform"
        />
        {/* Cinematic directional vignette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(105deg, rgba(13,10,11,0.92) 0%, rgba(13,10,11,0.72) 44%, rgba(13,10,11,0.28) 78%, rgba(13,10,11,0.52) 100%)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to top, rgba(13,10,11,0.96) 0%, rgba(13,10,11,0.35) 38%, rgba(13,10,11,0.45) 100%)',
          }}
        />
      </div>

      {/* Main architectural stage */}
      <div
        ref={contentRef}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 w-full"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-end">
          {/* Left Column: Monumental Editorial Statement */}
          <div className="lg:col-span-7 space-y-7">
            <div className="hero-reveal inline-flex items-center gap-2.5 px-4 py-2 rounded-full liquid-glass-pill text-gold-200 text-xs font-medium tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-gold-300 shrink-0" />
              <span>
                {lang === 'es'
                  ? 'Atelier de Charcutería Artesanal · Louisville, Kentucky'
                  : 'Artisanal Charcuterie Atelier · Louisville, Kentucky'}
              </span>
            </div>

            <h1 className="hero-reveal font-serif text-5xl sm:text-6xl lg:text-[4.65rem] font-semibold text-cream-50 leading-[0.98] tracking-[-0.02em] max-w-none">
              {lang === 'es' ? (
                <>
                  El arte de reunir{' '}
                  <span className="italic font-normal text-gold-200">
                    alrededor de una mesa.
                  </span>
                </>
              ) : (
                <>
                  The art of gathering{' '}
                  <span className="italic font-normal text-gold-200">
                    around the table.
                  </span>
                </>
              )}
            </h1>

            <p className="hero-reveal text-base sm:text-lg lg:text-xl text-cream-100/85 leading-relaxed max-w-xl font-normal">
              {lang === 'es'
                ? 'Tablas de autor, cajas de regalo y mesas escenográficas creadas a mano por Elianne Lafuente para transformar los pequeños detalles en celebraciones inolvidables.'
                : 'Signature boards, luxury keepsake boxes, and bespoke grazing tables handcrafted by Elianne Lafuente to turn small details into unforgettable celebrations.'}
            </p>

            <div className="hero-reveal flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <a
                href="#catalogo"
                className="group inline-flex items-center justify-center gap-3 h-14 px-8 rounded-full bg-gradient-to-r from-gold-200 via-gold-300 to-gold-200 text-noir-950 text-sm font-bold tracking-wide shadow-gold-glow hover:brightness-105 transition-all duration-300 whitespace-nowrap"
              >
                <span>
                  {lang === 'es' ? 'Explorar la Colección' : 'Explore Collection'}
                </span>
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              <a
                href="#cotizar"
                className="inline-flex items-center justify-center gap-2.5 h-14 px-8 rounded-full liquid-glass-pill hover:bg-cream-50/15 text-cream-50 text-sm font-semibold transition-all duration-300 whitespace-nowrap"
              >
                <span>
                  {lang === 'es' ? 'Cotizar Mesa o Evento' : 'Request Event Quote'}
                </span>
              </a>
            </div>

            {/* Direct Atelier Bar */}
            <div className="hero-reveal pt-6 border-t border-gold-300/20 flex flex-wrap items-center gap-6 text-xs sm:text-sm text-cream-200/85">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-semibold text-gold-200 hover:text-cream-50 transition-colors whitespace-nowrap"
              >
                <MessageCircle className="w-4 h-4 text-gold-300 shrink-0" />
                <span>WhatsApp Concierge</span>
              </a>
              <a
                href={BRAND_CONFIG.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-semibold text-cream-100 hover:text-gold-200 transition-colors whitespace-nowrap"
              >
                <Instagram className="w-4 h-4 text-gold-300 shrink-0" />
                <span>{BRAND_CONFIG.instagramHandle}</span>
              </a>
              <span className="inline-flex items-center gap-1.5 text-cream-200/75 whitespace-nowrap">
                <MapPin className="w-4 h-4 text-gold-400 shrink-0" />
                <span>Louisville, KY & Surrounding Areas</span>
              </span>
            </div>
          </div>

          {/* Right Column: Floating Liquid Glass Signature Showcase Card */}
          <div className="lg:col-span-5 flex lg:justify-end">
            <div
              ref={floatingCardRef}
              className="w-full max-w-md rounded-3xl liquid-glass-dark p-5 sm:p-6 space-y-5"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img
                    src="images/7_tabla_madera_grabada.jpg"
                    alt="Detalle de tabla de nogal grabada Ely’s"
                    className="w-14 h-14 rounded-2xl object-cover border border-gold-300/35 shrink-0"
                  />
                  <div>
                    <span className="text-[11px] font-semibold text-gold-300 tracking-wide block">
                      {lang === 'es' ? 'Pieza Insignia de la Casa' : 'House Signature Piece'}
                    </span>
                    <h2 className="font-serif text-2xl font-semibold text-cream-50 leading-tight">
                      {lang === 'es' ? 'Tabla Rosa de Autor' : 'Signature Rose Board'}
                    </h2>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-[11px] text-cream-200/70 block">
                    {lang === 'es' ? 'Desde' : 'From'}
                  </span>
                  <span className="font-serif text-3xl font-bold text-gold-200 num">
                    $95
                  </span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-cream-100/80 leading-relaxed">
                {lang === 'es'
                  ? 'Rosas de Prosciutto di Parma y Salami hechas pétalo a pétalo, rueda de Brie con panal de miel natural, higos frescos y Manchego sobre madera de nogal.'
                  : 'Hand-folded Prosciutto di Parma and Salami roses, double-cream Brie with raw honeycomb, fresh mission figs, and aged Manchego on walnut wood.'}
              </p>

              <div className="pt-3 border-t border-gold-300/20 flex items-center justify-between gap-4 text-xs">
                <span className="text-cream-200/75">
                  {lang === 'es'
                    ? '3 tamaños · 4 a 16 invitados'
                    : '3 sizes · Serves 4 to 16'}
                </span>
                <a
                  href="#catalogo"
                  className="inline-flex items-center gap-1.5 font-semibold text-gold-200 hover:text-cream-50 transition-colors whitespace-nowrap"
                >
                  <span>{lang === 'es' ? 'Personalizar pedido' : 'Customize order'}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
