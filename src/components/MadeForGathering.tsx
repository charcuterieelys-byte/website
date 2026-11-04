import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Language } from '../types/catalog';
import { OCCASIONS_DATA } from '../data/catalog';

gsap.registerPlugin(ScrollTrigger);

interface MadeForGatheringProps {
  lang: Language;
  onSelectOccasion: (occasionTitle: string) => void;
}

/**
 * SECTION 8 — MADE FOR GATHERING
 * Editorial presentation of the occasions Elys serves inside the same
 * continuous Warm Ivory & Cream-Gold studio environment, pairing large
 * interactive typography with Elianne's real photography.
 */
export const MadeForGathering: React.FC<MadeForGatheringProps> = ({
  lang,
  onSelectOccasion,
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeOccasion, setActiveOccasion] = useState(0);

  useEffect(() => {
    if (!sectionRef.current) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.gathering-reveal',
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.07,
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

  const currentItem = OCCASIONS_DATA[activeOccasion] || OCCASIONS_DATA[0];

  return (
    <section
      id="occasions"
      ref={sectionRef}
      className="relative z-10 py-24 sm:py-32 lg:py-40 px-6 sm:px-10 lg:px-16"
    >
      <div className="max-w-[1440px] mx-auto">
        {/* Editorial Header */}
        <div className="gathering-reveal max-w-2xl mb-14 sm:mb-20 space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold tracking-[0.28em] uppercase text-[#841F17]">
              {lang === 'en' ? 'OCCASIONS' : 'OCASIONES'}
            </span>
            <span className="w-8 h-px bg-[#841F17]/45" />
          </div>
          <h2 className="font-serif font-normal text-4xl sm:text-6xl text-[#841F17] tracking-[-0.02em] leading-[1.03]">
            {lang === 'en' ? 'Made for gathering.' : 'Creado para reunir.'}
          </h2>
          <p className="text-base sm:text-lg text-[#4A120E]/90 font-normal leading-relaxed">
            {lang === 'en'
              ? 'From intimate toasts for two to abundant grazing tables for life’s milestone celebrations.'
              : 'Desde brindis íntimos para dos hasta mesas abundantes para las celebraciones más memorables.'}
          </p>
        </div>

        {/* Two-Column Studio Composition: Interactive Editorial Index + Real Photography Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left: Interactive Editorial Occasion List */}
          <div className="lg:col-span-7 divide-y divide-[#841F17]/15 border-t border-b border-[#841F17]/25">
            {OCCASIONS_DATA.map((item, idx) => {
              const isSelected = idx === activeOccasion;
              return (
                <div
                  key={item.id}
                  onMouseEnter={() => setActiveOccasion(idx)}
                  onFocus={() => setActiveOccasion(idx)}
                  onClick={() => setActiveOccasion(idx)}
                  className="gathering-reveal group py-5 sm:py-6 cursor-pointer transition-colors"
                >
                  <div className="flex items-baseline justify-between gap-4">
                    <div className="flex items-baseline gap-4 sm:gap-7">
                      <span
                        className={`num text-xs font-semibold tracking-[0.22em] transition-colors duration-300 ${
                          isSelected
                            ? 'text-[#841F17]'
                            : 'text-[#841F17]/45 group-hover:text-[#841F17]/80'
                        }`}
                      >
                        {item.index}
                      </span>
                      <h3
                        className={`font-serif font-normal text-2xl sm:text-4xl transition-all duration-300 ${
                          isSelected
                            ? 'text-[#841F17] translate-x-1'
                            : 'text-[#5A120D]/70 group-hover:text-[#841F17]'
                        }`}
                      >
                        {item.title[lang]}
                      </h3>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectOccasion(item.title[lang]);
                      }}
                      className={`shrink-0 text-xs font-semibold tracking-[0.2em] uppercase transition-all duration-300 py-1 px-2 ${
                        isSelected
                          ? 'opacity-100 text-[#841F17] underline underline-offset-4'
                          : 'opacity-70 sm:opacity-0 group-hover:opacity-100 text-[#841F17]/85'
                      }`}
                    >
                      {lang === 'en' ? 'INQUIRE →' : 'CONSULTAR →'}
                    </button>
                  </div>

                  <div
                    className={`overflow-hidden transition-all duration-500 ${
                      isSelected ? 'max-h-28 opacity-100 mt-3' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <p className="pl-9 sm:pl-12 text-sm sm:text-base text-[#4A120E]/85 font-normal max-w-xl leading-relaxed">
                      {item.subtitle[lang]}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: Selected Real Photograph Framed in Warm Marfil */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 relative flex flex-col items-center justify-center">
            <div className="w-full max-w-[460px] bg-[#FAF5E8]/65 p-3.5 sm:p-4 border border-[#841F17]/20 shadow-[0_24px_48px_rgba(84,24,16,0.14)]">
              <div className="relative w-full aspect-[4/5] overflow-hidden bg-[#E7D095]">
                {OCCASIONS_DATA.map((item, idx) => (
                  <img
                    key={item.id}
                    src={item.imageSrc}
                    alt={item.title[lang]}
                    loading="lazy"
                    className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out ${
                      idx === activeOccasion
                        ? 'opacity-100 scale-100'
                        : 'opacity-0 scale-105 pointer-events-none'
                    }`}
                  />
                ))}
              </div>

              <div className="pt-4 pb-1 px-1 flex items-center justify-between gap-4">
                <div>
                  <p className="text-[10px] font-semibold tracking-[0.24em] uppercase text-[#841F17]/75 num">
                    {currentItem.index} / 0{OCCASIONS_DATA.length}
                  </p>
                  <p className="font-serif text-xl text-[#841F17] mt-0.5">
                    {currentItem.title[lang]}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => onSelectOccasion(currentItem.title[lang])}
                  className="px-4 py-2.5 bg-[#841F17] hover:bg-[#63150F] text-[#FAF5E8] text-[10px] font-semibold tracking-[0.22em] uppercase transition-colors"
                >
                  {lang === 'en' ? 'PLAN THIS EVENT' : 'COTIZAR EVENTO'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
