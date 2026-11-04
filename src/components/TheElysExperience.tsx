import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Language } from '../types/catalog';
import { EXPERIENCE_STORY, PRODUCTS } from '../data/catalog';

gsap.registerPlugin(ScrollTrigger);

interface TheElysExperienceProps {
  lang: Language;
}

/**
 * SECTION 9 — THE ELYS EXPERIENCE
 * A short, human, warm, and sophisticated brand story integrated seamlessly
 * into the dark studio environment.
 */
export const TheElysExperience: React.FC<TheElysExperienceProps> = ({ lang }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const story = EXPERIENCE_STORY[lang];
  // Use 04 Double Basket transparent poster as a floating sculptural accent
  const showcaseProduct = PRODUCTS[3];

  useEffect(() => {
    if (!sectionRef.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.experience-reveal',
        { y: 36, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.05,
          stagger: 0.12,
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

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative z-10 py-28 sm:py-36 lg:py-44 px-6 sm:px-10 lg:px-16"
    >
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Floating Transparent Sculpture */}
          <div className="lg:col-span-6 experience-reveal relative flex flex-col items-center justify-center">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute w-[75%] h-[75%] rounded-full blur-[95px] opacity-40"
              style={{
                background:
                  'radial-gradient(circle, rgba(201, 169, 110, 0.14) 0%, transparent 72%)',
              }}
            />
            <img
              src={showcaseProduct.posterSrc}
              alt={showcaseProduct.name[lang]}
              loading="lazy"
              className="w-full max-w-[680px] h-auto object-contain floating-product-shadow scale-105"
            />
          </div>

          {/* Right Editorial Brand Narrative */}
          <div className="lg:col-span-6 space-y-7">
            <div className="experience-reveal flex items-center gap-3">
              <span className="text-[10px] sm:text-[11px] font-medium tracking-[0.3em] uppercase text-[#C9A96E]">
                {story.eyebrow}
              </span>
              <span className="w-8 h-px bg-[#C9A96E]/40" />
            </div>

            <h2 className="experience-reveal font-serif font-light text-4xl sm:text-5xl xl:text-6xl text-[#F3EBDD] tracking-[-0.02em] leading-[1.04]">
              {story.title}
            </h2>

            <p className="experience-reveal font-serif italic text-xl sm:text-2xl text-[#C9A96E]/90 font-light leading-relaxed">
              {story.lead}
            </p>

            <div className="experience-reveal space-y-4 text-sm sm:text-[15px] text-[#F3EBDD]/75 font-light leading-relaxed">
              <p>{story.paragraph1}</p>
              <p>{story.paragraph2}</p>
            </div>

            {/* Three Editorial Pillars */}
            <div className="experience-reveal pt-6 border-t border-[#F3EBDD]/10 grid grid-cols-1 sm:grid-cols-3 gap-6">
              {story.pillars.map((pillar) => (
                <div key={pillar.label} className="space-y-2">
                  <p className="text-[10px] tracking-[0.24em] uppercase text-[#C9A96E] font-medium num">
                    {pillar.label}
                  </p>
                  <p className="text-xs text-[#F3EBDD]/65 font-light leading-relaxed">
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
