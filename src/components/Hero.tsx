import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Language } from '../types/catalog';
import { BRAND_CONFIG, HERO_CONTENT, PRODUCTS } from '../data/catalog';

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  lang: Language;
  onOpenOrderModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ lang, onOpenOrderModal }) => {
  const heroRef = useRef<HTMLElement>(null);
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
      // Physical, dimensional 3D entrance of the featured product and editorial text
      const entranceTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      entranceTl
        .fromTo(
          productWrapRef.current,
          {
            y: 95,
            z: -160,
            scale: 0.78,
            rotationX: 16,
            rotationY: -14,
            rotationZ: -4,
            opacity: 0,
          },
          {
            y: 0,
            z: 0,
            scale: 1,
            rotationX: 0,
            rotationY: 0,
            rotationZ: 0,
            opacity: 1,
            duration: 1.6,
            ease: 'expo.out',
          },
          0.1
        )
        .fromTo(
          shadowRef.current,
          { scale: 0.55, opacity: 0 },
          { scale: 1, opacity: 0.75, duration: 1.6, ease: 'expo.out' },
          0.15
        )
        .fromTo(
          '.hero-editorial-item',
          { y: 34, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.1,
            stagger: 0.1,
            ease: 'power3.out',
          },
          0.3
        );

      // Pinned Hero stage where scrolling first rotates the 3D board, then transitions to Collection
      ScrollTrigger.create({
        trigger: heroRef.current,
        start: 'top top',
        end: '+=95%',
        pin: true,
        scrub: 0.5,
        onUpdate: (self) => {
          // Scrub the 3D video rotation from 0% to 100% as the user scrolls through the Hero
          targetProgressRef.current = self.progress;
        },
      });

      gsap.to(productWrapRef.current, {
        y: -45,
        scale: 1.05,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: '+=95%',
          scrub: true,
        },
      });

      gsap.to(textWrapRef.current, {
        y: -40,
        opacity: 0.2,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: '45% top',
          end: '+=50%',
          scrub: true,
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="top"
      ref={heroRef}
      className="relative z-10 h-[100dvh] w-full flex flex-col justify-between pt-28 pb-10 sm:pt-32 sm:pb-14 overflow-hidden studio-perspective"
    >
      <div className="max-w-[1440px] w-full mx-auto px-6 sm:px-10 lg:px-16 my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
          {/* Left Editorial Composition */}
          <div
            ref={textWrapRef}
            className="lg:col-span-5 space-y-7 text-center lg:text-left order-2 lg:order-1"
          >
            {/* Editorial Eyebrow */}
            <div className="hero-editorial-item flex items-center justify-center lg:justify-start gap-3">
              <span className="w-8 h-px bg-[#C9A96E]/55" />
              <span className="text-[10px] sm:text-[11px] tracking-[0.3em] uppercase text-[#C9A96E]/90 font-medium">
                {content.eyebrow}
              </span>
            </div>

            {/* Large Editorial Headline */}
            <h1 className="hero-editorial-item font-serif font-light text-4xl sm:text-6xl xl:text-[4.4rem] text-[#F3EBDD] leading-[1.03] tracking-[-0.02em]">
              {content.headline}
            </h1>

            {/* Supporting Text */}
            <p className="hero-editorial-item text-sm sm:text-base text-[#F3EBDD]/75 font-light leading-relaxed max-w-md mx-auto lg:mx-0">
              {content.supportingText}
            </p>

            {/* Primary & Secondary CTAs */}
            <div className="hero-editorial-item pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <a
                href="#collection"
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-[#C9A96E] hover:bg-[#d6b77d] text-[#17181A] text-[11px] font-semibold tracking-[0.24em] uppercase transition-all duration-300"
              >
                {content.primaryCta}
              </a>

              <button
                type="button"
                onClick={onOpenOrderModal}
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 border border-[#F3EBDD]/25 hover:border-[#C9A96E] text-[#F3EBDD] hover:text-[#C9A96E] text-[11px] font-medium tracking-[0.24em] uppercase transition-all duration-300"
              >
                {content.secondaryCta}
              </button>
            </div>
          </div>

          {/* Right Floating 3D Charcuterie Sculpture (Scroll-Controlled 3D Rotation) */}
          <div className="lg:col-span-7 relative flex flex-col items-center justify-center order-1 lg:order-2">
            {/* Soft Studio Atmospheric Backlight behind the floating board */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute w-[78%] h-[78%] rounded-full blur-[90px] opacity-45"
              style={{
                background:
                  'radial-gradient(circle, rgba(201, 169, 110, 0.14) 0%, rgba(243, 235, 221, 0.05) 45%, transparent 72%)',
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
              className="w-[62%] h-8 -mt-4 rounded-full blur-2xl pointer-events-none"
              style={{
                background:
                  'radial-gradient(ellipse at center, rgba(10, 11, 13, 0.92) 0%, rgba(10, 11, 13, 0.45) 55%, transparent 80%)',
              }}
            />
          </div>
        </div>
      </div>

      {/* Minimal Scroll Invitation */}
      <div className="max-w-[1440px] w-full mx-auto px-6 sm:px-10 lg:px-16 flex items-center justify-between text-[10px] tracking-[0.28em] uppercase text-[#F3EBDD]/45">
        <span>{content.scrollHint}</span>
        <div className="flex items-center gap-3">
          <span className="num text-[#C9A96E]">360° SCROLL MOTION</span>
          <span className="w-10 h-px bg-[#C9A96E]/40" />
        </div>
      </div>
    </section>
  );
};
