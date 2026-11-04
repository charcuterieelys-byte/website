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
 * SECTION 9 — MADE FOR GATHERING
 * Editorial presentation of the occasions Elys serves inside the same
 * continuous Warm Cream-Gold & Burgundy studio environment, pairing large
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

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.gathering-reveal',
        { y: 36, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.08,
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

  const currentItem = OCCASIONS_DATA[activeOccasion] || OCCASIONS_DATA[0];

  return (
    <section
      id="occasions"
      ref={sectionRef}
      className="relative z-10 py-28 sm:py-36 lg:py-44 px-6 sm:px-10 lg:px-16"
    >
      <div className="max-w-[1440px] mx-auto">
        {/* Editorial Header */}
        <div className="gathering-reveal max-w-2xl mb-16 sm:mb-24 space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-[10px] sm:text-[11px] font-semibold tracking-[0.3em] uppercase text-[#841F17]">
              {lang === 'en' ? 'OCCASIONS' : 'OCASIONES'}
            </span>
            <span className="w-8 h-px bg-[#841F17]/45" />
          </div>
          <h2 className="font-serif font-normal text-4xl sm:text-6xl text-[#841F17] tracking-[-0.02em] leading-[1.03]">
            {lang === 'en' ? 'Made for gathering.' : 'Creado para reunir.'}
          </h2>
          <p className="text-sm sm:text-base text-[#4A120E]/85 font-normal leading-relaxed">
            {lang === 'en'
              ? 'From intimate toasts for two to abundant grazing tables for life’s milestone celebrations.'
              : 'Desde brindis íntimos para dos hasta mesas abundantes para las celebraciones más memorables.'}
          </p>
        </div>

        {/* Two-Column Studio Composition: Interactive Editorial Index + Real Photography Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: Interactive Editorial Occasion List */}
          <div className="lg:col-span-7 divide-y divide-[#841F17]/15 border-t border-b border-[#841F17]/20">
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
                    <div className="flex items-baseline gap-5 sm:gap-7">
                      <span
                        className={`num text-xs font-semibold tracking-[0.24em] transition-colors duration-300 ${
                          isSelected
                            ? 'text-[#841F17]'
                            : 'text-[#841F17]/40 group-hover:text-[#841F17]/80'
                        }`}
                      >
                        {item.index}
                      </span>
                      <h3
                        className={`font-serif font-normal text-2xl sm:text-4xl transition-all duration-300 ${
                          isSelected
                            ? 'text-[#841F17] translate-x-1'
                            : 'text-[#5A120D]/60 group-hover:text-[#841F17]'
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
                      className={`text-[10px] font-semibold tracking-[0.24em] uppercase transition-all duration-300 ${
                        isSelected
                          ? 'opacity-100 text-[#841F17] hover:underline'
                          : 'opacity-0 group-hover:opacity-100 text-[#841F17]/80'
                      }`}
                    >
                      {lang === 'en' ? 'INQUIRE →' : 'CONSULTAR →'}
                    </button>
                  </div>

                  <div
                    className={`overflow-hidden transition-all duration-500 ${
                      isSelected ? 'max-h-24 opacity-100 mt-2.5' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <p className="pl-10 sm:pl-12 text-xs sm:text-sm text-[#4A120E]/80 font-normal max-w-xl">
                      {item.subtitle[lang]}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: Selected Real Photograph Floating in the Cream-Gold Studio */}
          <div className="lg:col-span-5 relative flex flex-col items-center justify-center">
            <div className="relative w-full max-w-[460px] aspect-[4/5] overflow-hidden border border-[#841F17]/20 floating-product-shadow">
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
              {/* Subtle warm inner frame */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0"
                style={{
                  boxShadow: 'inset 0 0 40px rgba(84, 24, 16, 0.22)',
                }}
              />
            </div>

            <div className="mt-5 w-full max-w-[460px] flex items-center justify-between text-[10px] font-semibold tracking-[0.24em] uppercase text-[#5A120D]/75">
              <span>{currentItem.title[lang]}</span>
              <span className="num text-[#841F17]">
                {currentItem.index} / 0{OCCASIONS_DATA.length}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
