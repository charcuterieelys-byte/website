import React, { useEffect, useRef } from 'react';
import { CheckCircle2, CalendarHeart, Sparkles, ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Language } from '../types/catalog';

gsap.registerPlugin(ScrollTrigger);

interface EventsShowcaseProps {
  lang: Language;
}

export const EventsShowcase: React.FC<EventsShowcaseProps> = ({ lang }) => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.events-reveal',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.14,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 76%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const highlights =
    lang === 'es'
      ? [
          'Mesas escenográficas (Grazing Tables) a varios niveles con lino crema, candelabros en bronce y flores.',
          'Carrito móvil (Mobile Grazing Bar) para recepciones de boda, bridal showers y eventos privados.',
          'Vasos y conos individuales (Grazing Cups) personalizados para cócteles e inauguraciones.',
          'Transporte en unidad propia refrigerada y montaje completo en Louisville y alrededores.',
        ]
      : [
          'Multi-tiered Grazing Tables styled with cream linens, brass taper candles, and florals.',
          'Mobile Charcuterie Cart (Grazing Bar) for wedding cocktail hours, bridal showers, and private soirées.',
          'Custom Individual Grazing Cups and Cones for cocktail receptions and corporate mixers.',
          'Dedicated catering van transport and full on-site styling across Greater Louisville.',
        ];

  return (
    <section
      ref={sectionRef}
      id="eventos"
      className="relative py-24 lg:py-36 bg-noir-950 text-cream-50 overflow-hidden"
    >
      {/* Ambient golden spotlight */}
      <div
        className="pointer-events-none absolute -top-48 left-1/3 w-[44rem] h-[44rem] rounded-full opacity-20 blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(197,155,78,0.55) 0%, rgba(13,10,11,0) 70%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 items-center">
          {/* Left Column: Architectural Copy & Highlights */}
          <div className="lg:col-span-5 space-y-7">
            <div className="events-reveal inline-flex items-center gap-2 px-4 py-1.5 rounded-full liquid-glass-pill text-gold-200 text-xs font-medium">
              <Sparkles className="w-3.5 h-3.5 text-gold-300" />
              <span>
                {lang === 'es'
                  ? 'Experiencias & Catering · Louisville, KY'
                  : 'Bespoke Event Styling · Louisville, KY'}
              </span>
            </div>

            <h2 className="events-reveal font-serif text-4xl sm:text-5xl lg:text-6xl font-semibold text-cream-50 leading-[1.02] max-w-none">
              {lang === 'es' ? (
                <>
                  Mesas escenográficas &{' '}
                  <span className="italic font-normal text-gold-200">
                    carrito móvil.
                  </span>
                </>
              ) : (
                <>
                  Bespoke grazing tables &{' '}
                  <span className="italic font-normal text-gold-200">
                    mobile cart.
                  </span>
                </>
              )}
            </h2>

            <p className="events-reveal text-cream-100/80 text-base sm:text-lg leading-relaxed">
              {lang === 'es'
                ? 'Desde celebraciones íntimas en casa hasta bodas y eventos corporativos en Louisville. Diseñamos una puesta en escena gastronómica que convierte la mesa en el corazón de la celebración.'
                : 'From intimate home gatherings to weddings and corporate galas in Louisville. We design a culinary centerpiece that turns the table into the heart of your celebration.'}
            </p>

            <ul className="events-reveal space-y-3.5 pt-2">
              {highlights.map((item, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 text-sm sm:text-base text-cream-100/90"
                >
                  <CheckCircle2 className="w-5 h-5 text-gold-300 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="events-reveal pt-4 flex flex-wrap items-center gap-4">
              <a
                href="#cotizar"
                className="group inline-flex items-center justify-center gap-3 h-14 px-8 rounded-full bg-gradient-to-r from-gold-200 via-gold-300 to-gold-200 text-noir-950 text-sm font-bold shadow-gold-glow hover:brightness-105 transition-all whitespace-nowrap"
              >
                <CalendarHeart className="w-4 h-4 shrink-0" />
                <span>
                  {lang === 'es'
                    ? 'Solicitar cotización de evento'
                    : 'Request an event quote'}
                </span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>

          {/* Right Column: Asymmetric 3-Photo Bento Showcase */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-12 gap-5 events-reveal">
            {/* Large Primary Feature: Grazing Table */}
            <figure className="sm:col-span-7 relative rounded-[28px] overflow-hidden aspect-[4/5] group bg-noir-900 shadow-luxury">
              <img
                src="images/mesa_evento_grazing.jpg"
                alt="Mesa de charcutería para bodas y eventos en Louisville"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(to top, rgba(13,10,11,0.9) 0%, rgba(13,10,11,0.1) 55%, rgba(13,10,11,0.2) 100%)',
                }}
              />
              <figcaption className="absolute bottom-5 inset-x-5 p-4 rounded-2xl liquid-glass-dark">
                <span className="text-[11px] font-semibold text-gold-300 block">
                  {lang === 'es' ? '25 a 150+ invitados' : '25 to 150+ guests'}
                </span>
                <p className="font-serif text-2xl font-semibold text-cream-50 mt-0.5">
                  {lang === 'es'
                    ? 'Mesas Escenográficas a Medida'
                    : 'Multi-Tiered Grazing Tables'}
                </p>
              </figcaption>
            </figure>

            {/* Right Stack: Mobile Cart + Catering Van */}
            <div className="sm:col-span-5 flex flex-col gap-5">
              <figure className="relative rounded-[28px] overflow-hidden aspect-[4/4] group bg-noir-900 shadow-luxury flex-1">
                <img
                  src="images/8_carrito_cocteles_y_charcuteria.jpg"
                  alt="Carrito móvil de charcutería Ely’s Charcuterie"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      'linear-gradient(to top, rgba(13,10,11,0.88) 0%, rgba(13,10,11,0.08) 60%)',
                  }}
                />
                <figcaption className="absolute bottom-4 inset-x-4">
                  <span className="text-[11px] font-semibold text-gold-300 block">
                    {lang === 'es' ? 'Barra Interactiva' : 'Interactive Bar'}
                  </span>
                  <p className="font-serif text-xl font-semibold text-cream-50">
                    {lang === 'es' ? 'Mobile Grazing Cart' : 'Mobile Grazing Cart'}
                  </p>
                </figcaption>
              </figure>

              <figure className="relative rounded-[28px] overflow-hidden aspect-[16/11] group bg-noir-900 shadow-luxury">
                <img
                  src="images/13_vehiculo_catering_van_horizontal.jpg"
                  alt="Vehículo de catering Ely’s Charcuterie en Louisville"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      'linear-gradient(to top, rgba(13,10,11,0.88) 0%, rgba(13,10,11,0.08) 60%)',
                  }}
                />
                <figcaption className="absolute bottom-4 inset-x-4">
                  <span className="text-[11px] font-semibold text-gold-300 block">
                    {lang === 'es' ? 'Servicio a Domicilio' : 'On-Site Delivery'}
                  </span>
                  <p className="font-serif text-lg font-semibold text-cream-50">
                    {lang === 'es'
                      ? 'Catering en todo Louisville'
                      : 'Greater Louisville Catering'}
                  </p>
                </figcaption>
              </figure>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
