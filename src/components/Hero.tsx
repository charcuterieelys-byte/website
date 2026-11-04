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
  const logoOvertureRef = useRef<HTMLDivElement>(null);
  const logoLockupWrapRef = useRef<HTMLDivElement>(null);
  const frameBorderRef = useRef<HTMLDivElement>(null);
  const watermarkWrapRef = useRef<HTMLDivElement>(null);
  const logoMetaRef = useRef<HTMLDivElement>(null);
  const mainStageRef = useRef<HTMLDivElement>(null);
  const productWrapRef = useRef<HTMLDivElement>(null);
  const shadowRef = useRef<HTMLDivElement>(null);
  const textWrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const targetProgressRef = useRef<number>(0);
  const smoothProgressRef = useRef<number>(0);
  const [useMp4Fallback, setUseMp4Fallback] = useState(false);

  const content = HERO_CONTENT[lang];
  // Featured hero floating sculpture: 03 Rectangular Charcuterie Board
  const featuredProduct = PRODUCTS[2];

  // Scroll-scrubbed 3D video rotation loop (60fps Lerp Engine)
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;

    vid.muted = true;
    vid.defaultMuted = true;
    vid.playsInline = true;
    vid.pause();

    let rafId: number;
    const tick = () => {
      const target = targetProgressRef.current;
      const current = smoothProgressRef.current;
      const next = current + (target - current) * 0.18;
      smoothProgressRef.current = next;

      if (vid.readyState >= 2 && vid.duration && Number.isFinite(vid.duration)) {
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
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  useEffect(() => {
    if (!heroRef.current) return;

    const ctx = gsap.context(() => {
      // =====================================================================
      // 1. EXACT BRAND REVEAL REEL FINALE CHOREOGRAPHY (ACT 4 LOCKUP BLOOM)
      //    - Oversized watermark rose rotates & scales in (-20deg -> 6deg)
      //    - Delicate cream frame border expands smoothly
      //    - 11 Burgundy Rose petals (.fin-petal-path) spiral & unfold with elastic back.out(1.45)
      //    - 11 Arched "CHARCUTERIE" letters (.fin-arch-letter) fan in along the top arc
      //    - 5 "Ely's" letters (.fin-elys-letter) rise into place with back.out(1.4)
      //    - Whole lockup breathes subtly (scale: 0.97 -> 1.015)
      // =====================================================================
      const introTl = gsap.timeline();

      introTl
        .fromTo(
          watermarkWrapRef.current,
          { rotation: -20, scale: 0.9, opacity: 0 },
          {
            rotation: 6,
            scale: 1,
            opacity: 0.52,
            duration: 2.8,
            ease: 'sine.out',
          },
          0.05
        )
        .fromTo(
          frameBorderRef.current,
          { scale: 0.94, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.75,
            ease: 'power2.out',
          },
          0.15
        )
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
            duration: 0.78,
            stagger: 0.045,
            ease: 'back.out(1.45)',
          },
          0.12
        )
        .fromTo(
          '.fin-arch-letter',
          {
            y: 220,
            opacity: 0,
            scale: 0.5,
            transformOrigin: '50% 50%',
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.52,
            stagger: 0.04,
            ease: 'back.out(1.5)',
          },
          0.56
        )
        .fromTo(
          '.fin-elys-letter',
          {
            y: 340,
            opacity: 0,
            scale: 0.65,
            transformOrigin: '50% 50%',
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.56,
            stagger: 0.075,
            ease: 'back.out(1.4)',
          },
          0.66
        )
        .fromTo(
          logoLockupWrapRef.current,
          { scale: 0.97 },
          {
            scale: 1.015,
            duration: 2.2,
            ease: 'sine.out',
          },
          0.75
        )
        .fromTo(
          logoMetaRef.current,
          { y: 18, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: 'power3.out',
          },
          1.05
        );

      // Set initial hidden state for Act II (Editorial + 3D Floating Board)
      gsap.set(mainStageRef.current, { autoAlpha: 0 });
      gsap.set(productWrapRef.current, {
        y: 85,
        z: -150,
        scale: 0.8,
        rotationX: 15,
        rotationY: -12,
        rotationZ: -3,
      });
      gsap.set(shadowRef.current, { scale: 0.55, opacity: 0 });
      gsap.set('.hero-editorial-item', { y: 32, opacity: 0 });

      // =====================================================================
      // 2. TWO-ACT PINNED SCROLL CHOREOGRAPHY:
      //    Act I (0.00 -> 0.32): Grand Animated SVG Logo scales forward & dissolves
      //    Act II (0.18 -> 1.00): Editorial Headline + 3D Board enter & rotate 360° with scroll
      // =====================================================================
      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: '+=155%',
          pin: true,
          scrub: 0.55,
          onUpdate: (self) => {
            // Scrub 3D board rotation once Act II begins (from 24% to 100% of Hero scroll)
            const rotP = Math.max(0, Math.min(1, (self.progress - 0.24) / 0.76));
            targetProgressRef.current = rotP;
          },
        },
      });

      // Act I: Grand Logo Overture zooms gently toward viewer and dissolves
      masterTl
        .to(
          logoOvertureRef.current,
          {
            scale: 1.24,
            y: -48,
            autoAlpha: 0,
            duration: 0.32,
            ease: 'power2.inOut',
          },
          0
        )
        // Act II: Reveal Main Hero Stage container
        .to(
          mainStageRef.current,
          {
            autoAlpha: 1,
            duration: 0.22,
            ease: 'power2.out',
          },
          0.18
        )
        // Dimensional 3D entrance of the floating charcuterie board
        .to(
          productWrapRef.current,
          {
            y: 0,
            z: 0,
            scale: 1,
            rotationX: 0,
            rotationY: 0,
            rotationZ: 0,
            duration: 0.34,
            ease: 'power3.out',
          },
          0.18
        )
        .to(
          shadowRef.current,
          {
            scale: 1,
            opacity: 0.78,
            duration: 0.34,
            ease: 'power3.out',
          },
          0.2
        )
        .to(
          '.hero-editorial-item',
          {
            y: 0,
            opacity: 1,
            stagger: 0.035,
            duration: 0.26,
            ease: 'power3.out',
          },
          0.22
        )
        // Subtle parallax lift during the final 3D rotation hold (0.55 -> 1.00)
        .to(
          productWrapRef.current,
          {
            y: -28,
            scale: 1.05,
            duration: 0.45,
            ease: 'none',
          },
          0.55
        )
        .to(
          textWrapRef.current,
          {
            y: -24,
            opacity: 0.35,
            duration: 0.35,
            ease: 'none',
          },
          0.65
        );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="top"
      ref={heroRef}
      className="relative z-10 h-[100dvh] w-full flex flex-col justify-between pt-24 pb-10 sm:pt-28 sm:pb-12 overflow-hidden studio-perspective"
    >
      {/* =====================================================================
          ACT I — GRAND BRAND OVERTURE (ANIMATED SVG FROM BRAND REVEAL REEL FINALE)
          Plays the exact petal-by-petal + letter-by-letter animation on load,
          then scales & dissolves into Act II as the user scrolls
      ===================================================================== */}
      <div
        ref={logoOvertureRef}
        className="absolute inset-0 z-20 flex flex-col items-center justify-center px-6 pointer-events-none select-none will-change-transform"
      >
        {/* Finale Center Radial Spotlight (#finale-bg-glow) */}
        <div
          aria-hidden="true"
          className="absolute w-[380px] h-[380px] sm:w-[580px] sm:h-[580px] lg:w-[680px] lg:h-[680px] rounded-full pointer-events-none"
          style={{
            background:
              'radial-gradient(circle, rgba(255, 250, 238, 0.52) 0%, rgba(229, 206, 154, 0) 70%)',
          }}
        />

        {/* Animated Oversized Rose Watermark on the Right (#finale-watermark-wrap) */}
        <img
          ref={watermarkWrapRef}
          src="./brand/isotipo-rosa-watermark.svg"
          alt=""
          aria-hidden="true"
          className="absolute -right-[22vw] sm:-right-[12vw] lg:-right-[8vw] bottom-[6vh] sm:bottom-[4vh] w-[82vw] sm:w-[56vw] max-w-[780px] h-auto object-contain opacity-50 pointer-events-none will-change-transform"
        />

        {/* Delicate Cream Architectural Frame Border (#finale-frame-border) */}
        <div
          ref={frameBorderRef}
          aria-hidden="true"
          className="absolute inset-4 sm:inset-7 lg:inset-9 rounded-[24px] sm:rounded-[28px] border-[1.5px] sm:border-2 border-[#FAF5EA]/55 pointer-events-none"
        />

        {/* Animated Inline SVG Vertical Lockup (#finale-lockup-wrap) */}
        <div
          ref={logoLockupWrapRef}
          className="relative z-10 w-[235px] sm:w-[315px] lg:w-[365px] aspect-[660/857] flex items-center justify-center drop-shadow-[0_18px_36px_rgba(96,26,18,0.13)] will-change-transform"
        >
          <AnimatedVerticalLogo className="w-full h-full" />
        </div>

        {/* Editorial Atelier Signature & Scroll Prompt Below Grand Animated Logo */}
        <div
          ref={logoMetaRef}
          className="relative z-10 mt-6 sm:mt-8 flex flex-col items-center gap-2.5 text-center"
        >
          <div className="flex items-center gap-3.5">
            <span className="w-8 sm:w-12 h-px bg-[#841F17]/40" />
            <span className="text-[10px] sm:text-[11px] font-semibold tracking-[0.34em] uppercase text-[#841F17]">
              {content.eyebrow}
            </span>
            <span className="w-8 sm:w-12 h-px bg-[#841F17]/40" />
          </div>
          <p className="font-serif italic text-base sm:text-xl text-[#63150F]/90">
            {content.headline}
          </p>
        </div>
      </div>

      {/* =====================================================================
          ACT II — HERO EDITORIAL & 3D FLOATING CHARCUTERIE SCULPTURE
          Emerges physically as the Grand Logo opens on scroll
      ===================================================================== */}
      <div
        ref={mainStageRef}
        className="relative z-10 max-w-[1440px] w-full mx-auto px-6 sm:px-10 lg:px-16 my-auto"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
          {/* Left Editorial Composition */}
          <div
            ref={textWrapRef}
            className="lg:col-span-5 space-y-6 sm:space-y-7 text-center lg:text-left order-2 lg:order-1"
          >
            {/* Editorial Eyebrow with Burgundy Rose Accent */}
            <div className="hero-editorial-item flex items-center justify-center lg:justify-start gap-3">
              <span className="w-8 h-px bg-[#841F17]/55" />
              <span className="text-[10px] sm:text-[11px] tracking-[0.3em] uppercase text-[#841F17] font-semibold">
                {content.eyebrow}
              </span>
            </div>

            {/* Large Editorial Headline in Signature Burgundy Red */}
            <h1 className="hero-editorial-item font-serif font-normal text-4xl sm:text-6xl xl:text-[4.4rem] text-[#841F17] leading-[1.02] tracking-[-0.02em]">
              {content.headline}
            </h1>

            {/* Supporting Text */}
            <p className="hero-editorial-item text-sm sm:text-base text-[#4A120E]/85 font-normal leading-relaxed max-w-md mx-auto lg:mx-0">
              {content.supportingText}
            </p>

            {/* Primary & Secondary CTAs */}
            <div className="hero-editorial-item pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <a
                href="#collection"
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-[#841F17] hover:bg-[#68160F] text-[#FAF5E8] text-[11px] font-semibold tracking-[0.24em] uppercase transition-all duration-300 shadow-sm"
              >
                {content.primaryCta}
              </a>

              <button
                type="button"
                onClick={onOpenOrderModal}
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 border border-[#841F17]/55 hover:border-[#841F17] bg-[#FAF5E8]/35 hover:bg-[#841F17] text-[#841F17] hover:text-[#FAF5E8] text-[11px] font-semibold tracking-[0.24em] uppercase transition-all duration-300"
              >
                {content.secondaryCta}
              </button>
            </div>
          </div>

          {/* Right Floating 3D Charcuterie Sculpture (Scroll-Controlled 3D Rotation) */}
          <div className="lg:col-span-7 relative flex flex-col items-center justify-center order-1 lg:order-2">
            {/* Soft Warm Ivory Studio Backlight behind the floating board */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute w-[78%] h-[78%] rounded-full blur-[85px] opacity-75"
              style={{
                background:
                  'radial-gradient(circle, rgba(250, 245, 232, 0.75) 0%, rgba(240, 224, 178, 0.35) 48%, transparent 74%)',
              }}
            />

            {/* Floating 3D Product Video — Scrubbed by Scroll */}
            <div
              ref={productWrapRef}
              className="relative w-full max-w-[780px] aspect-[16/9] flex items-center justify-center will-change-transform"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <video
                ref={videoRef}
                muted
                playsInline
                preload="auto"
                onLoadedData={(e) => {
                  const v = e.currentTarget;
                  v.pause();
                  v.currentTime = 0.01;
                }}
                className={`w-full h-full object-contain pointer-events-none select-none floating-product-shadow scale-[1.08] sm:scale-[1.14] ${
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
              className="w-[60%] h-7 -mt-3 rounded-full blur-2xl pointer-events-none"
              style={{
                background:
                  'radial-gradient(ellipse at center, rgba(96, 26, 18, 0.34) 0%, rgba(96, 26, 18, 0.14) 55%, transparent 80%)',
              }}
            />
          </div>
        </div>
      </div>

      {/* Minimal Scroll Invitation */}
      <div className="relative z-30 max-w-[1440px] w-full mx-auto px-6 sm:px-10 lg:px-16 flex items-center justify-between text-[10px] font-semibold tracking-[0.28em] uppercase text-[#841F17]/75">
        <span>{content.scrollHint}</span>
        <div className="flex items-center gap-3">
          <span className="num text-[#841F17]">360° SCROLL MOTION</span>
          <span className="w-10 h-px bg-[#841F17]/45" />
        </div>
      </div>
    </section>
  );
};
