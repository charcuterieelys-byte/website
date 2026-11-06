import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Language } from '../types/catalog';
import { BRAND_CONFIG, EXPERIENCE_STORY, PRODUCTS } from '../data/catalog';

gsap.registerPlugin(ScrollTrigger);

interface TheElysExperienceProps {
  lang: Language;
}

/**
 * SECTION 8 — THE ELYS EXPERIENCE
 * A short, human, warm, and sophisticated brand story integrated seamlessly
 * into the Warm Ivory & Cream-Gold studio environment.
 */
export const TheElysExperience: React.FC<TheElysExperienceProps> = ({ lang }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const story = EXPERIENCE_STORY[lang];
  // Use 04 Double Basket transparent poster as a floating sculptural centerpiece
  const showcaseProduct = PRODUCTS[3];

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.experience-reveal',
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.95,
          stagger: 0.1,
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
      id="about"
      ref={sectionRef}
      className="relative z-10 py-28 sm:py-36 lg:py-44 px-6 sm:px-10 lg:px-16 bg-[#4A100B] text-[#FAF5E8] border-y border-[#E7D095]/20 overflow-hidden"
      style={{
        backgroundImage:
          'radial-gradient(ellipse 75% 65% at 28% 50%, rgba(132, 31, 23, 0.55) 0%, rgba(74, 16, 11, 0.95) 60%, #360A06 100%)',
      }}
    >
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Floating Transparent Sculpture Illuminated by Warm Candlelight */}
          <div className="lg:col-span-6 experience-reveal relative flex flex-col items-center justify-center">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute w-[82%] h-[82%] rounded-full blur-[90px] opacity-85"
              style={{
                background:
                  'radial-gradient(circle, rgba(238, 218, 166, 0.36) 0%, rgba(231, 208, 149, 0.14) 52%, transparent 76%)',
              }}
            />
            <img
              src={showcaseProduct.posterSrc}
              alt={showcaseProduct.name[lang]}
              loading="lazy"
              className="w-full max-w-[660px] h-auto object-contain floating-product-shadow scale-105"
            />
          </div>

          {/* Right Editorial Brand Narrative in Warm Marfil & Champagne Gold */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-7">
            <div className="experience-reveal flex items-center gap-2.5">
              <span aria-hidden="true" className="text-[#E7D095] text-xs">
                ✦
              </span>
              <span className="text-xs font-semibold tracking-[0.28em] uppercase text-[#E7D095]">
                {story.eyebrow}
              </span>
            </div>

            <h2 className="experience-reveal font-serif font-normal text-4xl sm:text-5xl xl:text-6xl text-[#FAF5E8] tracking-[-0.02em] leading-[1.04]">
              {story.title}
            </h2>

            <p className="experience-reveal font-serif italic text-xl sm:text-2xl text-[#E7D095] font-normal leading-relaxed">
              “{story.lead}”
            </p>

            <div className="experience-reveal space-y-4 text-base text-[#FAF5E8]/85 font-normal leading-relaxed">
              <p>{story.paragraph1}</p>
              <p>{story.paragraph2}</p>
            </div>

            {/* Founder Atelier Attribution + Handwritten Script Signature */}
            <div className="experience-reveal pt-3 flex flex-wrap items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[#FAF5E8]/10 border border-[#E7D095]/30 flex items-center justify-center p-2">
                  <img
                    src="./brand/isotipo-rosa-watermark.svg"
                    alt=""
                    aria-hidden="true"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <p className="font-serif italic text-xl text-[#FAF5E8]">
                    {BRAND_CONFIG.founderName}
                  </p>
                  <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-[#E7D095]/80">
                    {lang === 'en'
                      ? `FOUNDER · ${BRAND_CONFIG.city}`
                      : `FUNDADORA · ${BRAND_CONFIG.city}`}
                  </p>
                </div>
              </div>

              {/* Handwritten Calligraphic Signature */}
              <svg
                aria-hidden="true"
                viewBox="0 0 240 60"
                className="w-36 sm:w-44 h-12 text-[#E7D095]/85 fill-none stroke-current"
              >
                <path
                  d="M16 42 C28 16, 48 14, 40 30 C32 42, 18 46, 36 46 C54 46, 68 20, 62 14 C56 10, 50 36, 64 42 C74 46, 84 30, 88 38 C92 44, 102 32, 110 38 C118 44, 128 28, 136 38 C146 46, 162 18, 156 14 C148 10, 142 46, 168 42 C186 38, 206 32, 224 28"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M44 50 Q125 44 208 47"
                  strokeWidth="0.9"
                  strokeLinecap="round"
                  opacity="0.65"
                />
              </svg>
            </div>

            {/* Three Warm Artisanal Pillars (Ornamental instead of 01/02/03) */}
            <div className="experience-reveal pt-6 border-t border-[#E7D095]/20 grid grid-cols-1 sm:grid-cols-3 gap-6">
              {story.pillars.map((pillar) => (
                <div key={pillar.label} className="space-y-1.5">
                  <p className="font-serif italic text-lg text-[#E7D095]">
                    ✦ {pillar.label.replace(/^[0-9]+\s*·\s*/, '')}
                  </p>
                  <p className="text-sm text-[#FAF5E8]/80 font-normal leading-relaxed">
                    {pillar.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
