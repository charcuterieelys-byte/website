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
      className="relative z-10 py-24 sm:py-32 lg:py-40 px-6 sm:px-10 lg:px-16"
    >
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Floating Transparent Sculpture */}
          <div className="lg:col-span-6 experience-reveal relative flex flex-col items-center justify-center">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute w-[80%] h-[80%] rounded-full blur-[80px] opacity-80"
              style={{
                background:
                  'radial-gradient(circle, rgba(250, 245, 232, 0.85) 0%, rgba(244, 230, 192, 0.4) 52%, transparent 76%)',
              }}
            />
            <img
              src={showcaseProduct.posterSrc}
              alt={showcaseProduct.name[lang]}
              loading="lazy"
              className="w-full max-w-[660px] h-auto object-contain floating-product-shadow scale-105"
            />
          </div>

          {/* Right Editorial Brand Narrative */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-7">
            <div className="experience-reveal flex items-center gap-3">
              <span className="text-xs font-semibold tracking-[0.28em] uppercase text-[#841F17]">
                {story.eyebrow}
              </span>
              <span className="w-8 h-px bg-[#841F17]/45" />
            </div>

            <h2 className="experience-reveal font-serif font-normal text-4xl sm:text-5xl xl:text-6xl text-[#841F17] tracking-[-0.02em] leading-[1.04]">
              {story.title}
            </h2>

            <p className="experience-reveal font-serif italic text-xl sm:text-2xl text-[#63150F] font-normal leading-relaxed">
              {story.lead}
            </p>

            <div className="experience-reveal space-y-4 text-base text-[#4A120E]/90 font-normal leading-relaxed">
              <p>{story.paragraph1}</p>
              <p>{story.paragraph2}</p>
            </div>

            {/* Founder Atelier Attribution */}
            <div className="experience-reveal pt-2 flex items-center gap-4">
              <img
                src={BRAND_CONFIG.logoIsotipo}
                alt=""
                aria-hidden="true"
                className="w-8 h-8 object-contain"
              />
              <div>
                <p className="font-serif italic text-lg text-[#841F17]">
                  {BRAND_CONFIG.founderName}
                </p>
                <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-[#5A120D]/75">
                  {lang === 'en'
                    ? `FOUNDER · ${BRAND_CONFIG.city}`
                    : `FUNDADORA · ${BRAND_CONFIG.city}`}
                </p>
              </div>
            </div>

            {/* Three Editorial Pillars */}
            <div className="experience-reveal pt-6 border-t border-[#841F17]/20 grid grid-cols-1 sm:grid-cols-3 gap-6">
              {story.pillars.map((pillar) => (
                <div key={pillar.label} className="space-y-2">
                  <p className="text-xs tracking-[0.2em] uppercase text-[#841F17] font-bold num">
                    {pillar.label}
                  </p>
                  <p className="text-sm text-[#4A120E]/85 font-normal leading-relaxed">
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
