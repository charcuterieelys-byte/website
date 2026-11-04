import React, { useEffect, useRef } from 'react';
import { MapPin, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Language } from '../types/catalog';
import { FOUNDER_STORY } from '../data/catalog';

gsap.registerPlugin(ScrollTrigger);

interface AboutElianneProps {
  lang: Language;
}

export const AboutElianne: React.FC<AboutElianneProps> = ({ lang }) => {
  const copy = FOUNDER_STORY[lang];
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.about-reveal',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
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
      ref={sectionRef}
      id="historia"
      className="relative py-24 lg:py-36 bg-cream-50 overflow-hidden"
    >
      {/* Subtle radial warm glow */}
      <div
        className="pointer-events-none absolute -top-40 right-0 w-[38rem] h-[38rem] rounded-full opacity-40 blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(243,209,141,0.45) 0%, rgba(253,251,247,0) 70%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-20 items-center">
          {/* Left Column: Sculptural Overlapping Portrait & Walnut Detail */}
          <div className="lg:col-span-5 relative about-reveal">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="rounded-[32px] overflow-hidden aspect-[4/5] shadow-luxury bg-cream-200">
                <img
                  src="images/elianne_story_atelier.jpg"
                  alt="Elianne Lafuente preparando una tabla en Ely’s Charcuterie"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
                />
              </div>

              {/* Floating Liquid Glass Location Pill */}
              <div className="absolute top-5 left-5 inline-flex items-center gap-2 px-4 py-2 rounded-full liquid-glass-dark text-cream-50 text-xs font-medium">
                <MapPin className="w-3.5 h-3.5 text-gold-300 shrink-0" />
                <span>Louisville, Kentucky</span>
              </div>

              {/* Overlapping Secondary Craftsmanship Miniature */}
              <div className="hidden sm:flex items-center gap-4 p-4 rounded-2xl liquid-glass-light absolute -bottom-8 -right-6 max-w-[270px]">
                <img
                  src="images/7_tabla_madera_grabada.jpg"
                  alt="Sello grabado en madera de nogal Ely’s"
                  className="w-16 h-16 rounded-xl object-cover shrink-0 border border-gold-400/40"
                />
                <div>
                  <p className="font-serif text-lg font-semibold text-noir-900 leading-tight">
                    {lang === 'es' ? 'Sello de Autor' : 'Artisan Seal'}
                  </p>
                  <p className="text-xs text-noir-600 mt-0.5 leading-snug">
                    {lang === 'es'
                      ? 'Cada tabla lleva nuestra rosa grabada y selección fresca del día.'
                      : 'Every board carries our engraved rose and fresh daily selection.'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Story & Pull-Quote */}
          <div className="lg:col-span-7 space-y-8">
            <div className="about-reveal inline-flex items-center gap-2 text-xs font-semibold text-gold-600 tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-gold-500" />
              <span>{copy.eyebrow}</span>
            </div>

            <h2 className="about-reveal font-serif text-4xl sm:text-5xl lg:text-6xl font-semibold text-noir-900 leading-[1.04] max-w-none">
              {copy.title}
            </h2>

            <blockquote className="about-reveal relative pl-6 sm:pl-8 py-2 border-l-2 border-gold-400">
              <p className="font-serif italic text-2xl sm:text-3xl text-noir-800 leading-snug">
                {copy.quote}
              </p>
            </blockquote>

            <div className="about-reveal grid grid-cols-1 sm:grid-cols-2 gap-6 text-noir-700 text-base leading-relaxed pt-2">
              <p>{copy.paragraph1}</p>
              <p>{copy.paragraph2}</p>
            </div>

            <div className="about-reveal pt-8 flex items-center justify-between flex-wrap gap-6 border-t border-gold-300/50">
              <div>
                <p className="font-serif text-3xl font-semibold text-noir-900">
                  Elianne Lafuente
                </p>
                <p className="text-xs sm:text-sm text-noir-600 mt-1">
                  {copy.locationTag}
                </p>
              </div>
              <img
                src="brand/logo-horizontal-rojo.svg"
                alt="Ely’s Charcuterie Firma"
                className="h-11 w-auto object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
