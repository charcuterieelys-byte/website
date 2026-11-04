import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Language } from '../types/catalog';
import { HERO_CONTENT, PRODUCTS } from '../data/catalog';
import { AnimatedVerticalLogo } from './AnimatedVerticalLogo';

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  lang: Language;
  onOpenOrderModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ lang, onOpenOrderModal }) => {
  const heroRef = useRef<HTMLElement>(null);
  const logoWrapRef = useRef<HTMLDivElement>(null);
  const editorialBlockRef = useRef<HTMLDivElement>(null);
  const productStageRef = useRef<HTMLDivElement>(null);
  const productWrapRef = useRef<HTMLDivElement>(null);
  const shadowRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const targetProgressRef = useRef<number>(0);
  const smoothProgressRef = useRef<number>(0);
  const [useMp4Fallback, setUseMp4Fallback] = useState(false);

  const content = HERO_CONTENT[lang];
  // Featured hero floating sculpture: 03 Rectangular Charcuterie Board
  const featuredProduct = PRODUCTS[2];

  // Scroll-scrubbed 3D video rotation loop (60fps Lerp Engine, respects prefers-reduced-motion)
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;

    vid.muted = true;
    vid.defaultMuted = true;
    vid.playsInline = true;
    vid.pause();

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReducedMotion) return;

    let rafId: number;
    let isVisible = true;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (!isVisible && !vid.paused) {
          vid.pause();
        }
      },
      { threshold: 0.05 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    const tick = () => {
      if (isVisible) {
        const target = targetProgressRef.current;
        const current = smoothProgressRef.current;
        const next = current + (target - current) * 0.18;
        smoothProgressRef.current = next;

        if (
          vid.readyState >= 2 &&
          vid.duration &&
          Number.isFinite(vid.duration)
        ) {
          const desiredTime = Math.min(
            vid.duration - 0.04,
            Math.max(0, next * vid.duration)
          );
          if (!vid.seeking && Math.abs(vid.currentTime - desiredTime) > 0.015) {
            try {
              vid.currentTime = desiredTime;
            } catch {
              // Ignore transient seek errors before buffer ready
            }
          }
        }
      }
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(rafId);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!heroRef.current) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set(
          [
            '.fin-petal-path',
            '.fin-arch-letter',
            '.fin-elys-letter',
            editorialBlockRef.current,
            productWrapRef.current,
            shadowRef.current,
          ],
          { clearProps: 'all', opacity: 1 }
        );
        return;
      }

      // 1. Intentional, Cohesive Entrance Animation on Load:
      //    - Original Elys Vertical SVG Emblem unfolds petal-by-petal & letter-by-letter
      //    - Editorial block (headline, supporting text, CTAs) glides in smoothly as a complete unit
      //    - Featured 3D Charcuterie Board enters with dimensional poise
      const introTl = gsap.timeline();

      introTl
        .fromTo(
          '.fin-petal-path',
          {
            scale: 0.25,
            rotation: -95,
            opacity: 0,
            transformOrigin: '50% 50%',
          },
          {
            scale: 1,
            rotation: 0,
            opacity: 1,
            duration: 0.75,
            stagger: 0.042,
            ease: 'back.out(1.45)',
          },
          0.08
        )
        .fromTo(
          '.fin-arch-letter',
          {
            y: 200,
            opacity: 0,
            scale: 0.55,
            transformOrigin: '50% 50%',
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.48,
            stagger: 0.035,
            ease: 'back.out(1.45)',
          },
          0.48
        )
        .fromTo(
          '.fin-elys-letter',
          {
            y: 300,
            opacity: 0,
            scale: 0.68,
            transformOrigin: '50% 50%',
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.52,
            stagger: 0.065,
            ease: 'back.out(1.35)',
          },
          0.56
        )
        // Smooth, complete entrance of Headline + Supporting Text + CTA (no fragmented text splitting)
        .fromTo(
          editorialBlockRef.current,
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.95,
            ease: 'power3.out',
          },
          0.42
        )
        // Dimensional entrance of the floating charcuterie board
        .fromTo(
          productWrapRef.current,
          { y: 36, scale: 0.92, opacity: 0 },
          {
            y: 0,
            scale: 1,
            opacity: 1,
            duration: 1.15,
            ease: 'power3.out',
          },
          0.25
        )
        .fromTo(
          shadowRef.current,
          { scale: 0.7, opacity: 0 },
          {
            scale: 1,
            opacity: 0.8,
            duration: 1.15,
            ease: 'power3.out',
          },
          0.3
        );

      // 2. Pinned Hero Scroll Experience:
      //    Scrolling rotates the featured 3D charcuterie board smoothly through 360°
      //    and transitions cleanly into the 01–07 Product Collection.
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: '+=115%',
          pin: true,
          scrub: 0.45,
          onUpdate: (self) => {
            targetProgressRef.current = self.progress;
          },
        },
      });

      scrollTl
        // Gentle dimensional poise while rotating (0.00 -> 0.80)
        .to(
          productWrapRef.current,
          {
            y: -12,
            scale: 1.04,
            duration: 0.8,
            ease: 'sine.inOut',
          },
          0
        )
        // Clean, unified transition into the Product Collection during the final 20% (0.80 -> 1.00)
        .to(
          [logoWrapRef.current, editorialBlockRef.current],
          {
            y: -28,
            opacity: 0,
            duration: 0.2,
            ease: 'power2.inOut',
          },
          0.8
        )
        .to(
          productStageRef.current,
          {
            y: -36,
            scale: 0.95,
            opacity: 0,
            duration: 0.2,
            ease: 'power2.inOut',
          },
          0.8
        );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="top"
      ref={heroRef}
      className="relative z-10 min-h-[100dvh] w-full flex flex-col justify-between pt-20 pb-8 sm:pt-24 sm:pb-10 lg:pt-28 lg:pb-12 overflow-hidden"
    >
      {/* Subtle Architectural Frame Inside Hero Studio */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-4 sm:inset-6 lg:inset-8 rounded-[24px] border border-[#FAF5E8]/45"
      />

      {/* Main Hero Composition */}
      <div className="relative z-10 max-w-[1440px] w-full mx-auto px-6 sm:px-10 lg:px-16 my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Column: Prominent Animated Original Logo + Dominant Editorial Headline + CTAs */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left order-2 lg:order-1">
            {/* Original Untouched Elys Vertical Emblem (Animated SVG Paths from Official Logo) */}
            <div
              ref={logoWrapRef}
              className="w-[118px] sm:w-[148px] lg:w-[168px] aspect-[660/857] mb-5 sm:mb-7 flex items-center justify-center drop-shadow-[0_14px_28px_rgba(96,26,18,0.12)] will-change-transform"
            >
              <AnimatedVerticalLogo className="w-full h-full" />
            </div>

            {/* Cohesive Editorial Hierarchy: Eyebrow, Dominant Headline, Supporting Text & CTAs */}
            <div
              ref={editorialBlockRef}
              className="space-y-4 sm:space-y-5 max-w-xl"
            >
              <div className="flex items-center justify-center lg:justify-start gap-3">
                <span className="w-8 h-px bg-[#841F17]/50" />
                <span className="text-[11px] sm:text-xs tracking-[0.28em] uppercase text-[#841F17] font-semibold">
                  {content.eyebrow}
                </span>
              </div>

              {/* Visually Dominant Editorial Headline */}
              <h1 className="font-serif font-normal text-4xl sm:text-5xl lg:text-[3.65rem] xl:text-[4.25rem] text-[#841F17] leading-[1.03] tracking-[-0.02em]">
                {content.headline}
              </h1>

              {/* Readable Editorial Supporting Copy */}
              <p className="text-base sm:text-lg text-[#4A120E]/90 font-normal leading-relaxed max-w-md mx-auto lg:mx-0">
                {content.supportingText}
              </p>

              {/* Primary & Secondary CTAs */}
              <div className="pt-2 sm:pt-3 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 sm:gap-4">
                <a
                  href="#collection"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-[#841F17] hover:bg-[#68160F] text-[#FAF5E8] text-xs font-semibold tracking-[0.22em] uppercase transition-all duration-300 shadow-sm"
                >
                  {content.primaryCta}
                </a>

                <button
                  type="button"
                  onClick={onOpenOrderModal}
                  className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-4 border border-[#841F17]/55 hover:border-[#841F17] bg-[#FAF5E8]/55 hover:bg-[#841F17] text-[#841F17] hover:text-[#FAF5E8] text-xs font-semibold tracking-[0.22em] uppercase transition-all duration-300"
                >
                  {content.secondaryCta}
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Floating 3D Featured Charcuterie Sculpture */}
          <div
            ref={productStageRef}
            className="lg:col-span-7 relative flex flex-col items-center justify-center order-1 lg:order-2"
          >
            {/* Warm Marfil Studio Key-Light Behind the Floating Board */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute w-[82%] h-[82%] rounded-full blur-[80px] opacity-85"
              style={{
                background:
                  'radial-gradient(circle, rgba(250, 245, 232, 0.88) 0%, rgba(244, 230, 192, 0.45) 52%, transparent 76%)',
              }}
            />

            {/* Floating 3D Product Video with Poster Fallback */}
            <div
              ref={productWrapRef}
              className="relative w-full max-w-[780px] aspect-[16/10] flex items-center justify-center will-change-transform"
            >
              <video
                ref={videoRef}
                muted
                playsInline
                preload="auto"
                poster={featuredProduct.posterSrc}
                onLoadedData={(e) => {
                  const v = e.currentTarget;
                  v.pause();
                  v.currentTime = 0.01;
                }}
                className={`w-full h-full object-contain pointer-events-none select-none floating-product-shadow scale-[1.06] sm:scale-[1.12] ${
                  useMp4Fallback ? 'video-feather-mask' : ''
                }`}
              >
                <source src={featuredProduct.videoSrc} type="video/webm" />
                <source
                  src={featuredProduct.videoFallbackMp4}
                  type="video/mp4"
                  onError={() => setUseMp4Fallback(true)}
                />
              </video>
            </div>

            {/* Grounded 3D Studio Floor Shadow */}
            <div
              ref={shadowRef}
              aria-hidden="true"
              className="w-[58%] h-6 sm:h-7 -mt-2 rounded-full blur-2xl pointer-events-none"
              style={{
                background:
                  'radial-gradient(ellipse at center, rgba(96, 26, 18, 0.30) 0%, rgba(96, 26, 18, 0.12) 55%, transparent 80%)',
              }}
            />
          </div>
        </div>
      </div>

      {/* Minimal Scroll Invitation */}
      <div className="relative z-30 max-w-[1440px] w-full mx-auto px-6 sm:px-10 lg:px-16 flex items-center justify-between text-[11px] font-semibold tracking-[0.24em] uppercase text-[#841F17]/80">
        <span>{content.scrollHint}</span>
        <div className="flex items-center gap-3">
          <span className="num text-[#841F17]">01 — 07 COLLECTION</span>
          <span className="w-10 h-px bg-[#841F17]/45" />
        </div>
      </div>
    </section>
  );
};
