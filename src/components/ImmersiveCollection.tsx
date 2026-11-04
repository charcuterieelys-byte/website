import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Language, Product } from '../types/catalog';
import { PRODUCTS } from '../data/catalog';
import { ProductStageItem } from './ProductStageItem';

gsap.registerPlugin(ScrollTrigger);

interface ImmersiveCollectionProps {
  lang: Language;
  onOrderProduct: (product: Product) => void;
}

/**
 * SECTION 4, 5, 6, 7 & 11 — THE MAIN EXPERIENCE: IMMERSIVE PRODUCT COLLECTION
 * - Single pinned 3D studio viewport controlled by GSAP ScrollTrigger.
 * - Coordinates 7 products (01–07) through reusable timeline choreography.
 * - Right-side vertical progress indicator (01–07) with click-to-navigate.
 */
export const ImmersiveCollection: React.FC<ImmersiveCollectionProps> = ({
  lang,
  onOrderProduct,
}) => {
  const wrapperRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<ScrollTrigger | null>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const totalProducts = PRODUCTS.length; // 7

  useEffect(() => {
    if (!wrapperRef.current) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    const ctx = gsap.context(() => {
      // Initialize all stages: Product 01 visible at start, 02–07 waiting in 3D space
      PRODUCTS.forEach((_, idx) => {
        if (idx === 0) {
          gsap.set(`.product-stage-${idx}`, { autoAlpha: 1 });
          gsap.set(`.product-visual-${idx}`, {
            y: 0,
            z: 0,
            scale: 1,
            rotationX: 0,
            rotationY: 0,
            rotationZ: 0,
            opacity: 1,
          });
          gsap.set(`.product-info-${idx}`, { y: 0, opacity: 1 });
          gsap.set(`.product-shadow-${idx}`, { scale: 1, opacity: 0.85 });
        } else {
          gsap.set(`.product-stage-${idx}`, { autoAlpha: 0 });
          gsap.set(`.product-visual-${idx}`, {
            y: 120,
            z: -220,
            scale: 0.76,
            rotationX: 14,
            rotationY: idx % 2 === 0 ? -12 : 12,
            rotationZ: idx % 2 === 0 ? -4 : 4,
            opacity: 0,
          });
          gsap.set(`.product-info-${idx}`, { y: 44, opacity: 0 });
          gsap.set(`.product-shadow-${idx}`, { scale: 0.45, opacity: 0 });
        }
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          pin: true,
          start: 'top top',
          end: () => `+=${window.innerHeight * (totalProducts * 1.1)}`,
          scrub: prefersReducedMotion ? false : 0.85,
          anticipatePin: 1,
          onUpdate: (self) => {
            const totalDur = tl.duration() || 1;
            const currentTime = self.progress * totalDur;
            // Each product i is centered around [i, i + 0.62], transition midpoint at i + 0.80
            const idx = Math.min(
              totalProducts - 1,
              Math.max(0, Math.floor(currentTime + 0.2))
            );
            setActiveIndex((prev) => (prev !== idx ? idx : prev));
          },
        },
      });

      timelineRef.current = tl;
      triggerRef.current = tl.scrollTrigger || null;

      // Build reusable choreographed segments for all 7 products
      for (let i = 0; i < totalProducts; i++) {
        const segStart = i; // Each product step = 1.0 timeline unit
        tl.addLabel(`product-${i}`, segStart);

        // Subtle 3D dimensional float while Product i is at center stage [i, i + 0.6]
        tl.to(
          `.product-visual-${i}`,
          {
            y: -10,
            rotationY: i % 2 === 0 ? 4 : -4,
            scale: 1.03,
            duration: 0.6,
            ease: 'sine.inOut',
          },
          segStart
        );

        // Coordinated transition from Product i -> Product i + 1 [i + 0.6, i + 1.0]
        if (i < totalProducts - 1) {
          const next = i + 1;
          const exitStart = segStart + 0.6;
          const exitDur = 0.22;
          const enterStart = segStart + 0.78;
          const enterDur = 0.22;

          // 1. Current product exits smoothly in 3D space
          tl.to(
            `.product-visual-${i}`,
            {
              y: -120,
              z: -180,
              scale: 0.8,
              rotationX: -12,
              rotationZ: i % 2 === 0 ? 3 : -3,
              opacity: 0,
              duration: exitDur,
              ease: 'power2.in',
            },
            exitStart
          )
            .to(
              `.product-shadow-${i}`,
              {
                scale: 0.45,
                opacity: 0,
                duration: exitDur,
                ease: 'power2.in',
              },
              exitStart
            )
            .to(
              `.product-info-${i}`,
              {
                y: -36,
                opacity: 0,
                duration: exitDur * 0.9,
                ease: 'power2.in',
              },
              exitStart
            )
            .set(`.product-stage-${i}`, { autoAlpha: 0 }, exitStart + exitDur);

          // 2. Next product enters smoothly into the center of the studio
          tl.set(`.product-stage-${next}`, { autoAlpha: 1 }, enterStart)
            .fromTo(
              `.product-visual-${next}`,
              {
                y: 120,
                z: -220,
                scale: 0.76,
                rotationX: 14,
                rotationY: next % 2 === 0 ? -12 : 12,
                rotationZ: next % 2 === 0 ? -4 : 4,
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
                duration: enterDur,
                ease: 'power2.out',
              },
              enterStart
            )
            .fromTo(
              `.product-shadow-${next}`,
              { scale: 0.45, opacity: 0 },
              {
                scale: 1,
                opacity: 0.85,
                duration: enterDur,
                ease: 'power2.out',
              },
              enterStart
            )
            .fromTo(
              `.product-info-${next}`,
              { y: 40, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: enterDur,
                ease: 'power2.out',
              },
              enterStart + 0.02
            );
        }
      }
    }, wrapperRef);

    return () => ctx.revert();
  }, [totalProducts]);

  // Smoothly navigate to a specific product index (01–07) when clicked
  const scrollToProduct = useCallback((targetIdx: number) => {
    const st = triggerRef.current;
    const tl = timelineRef.current;
    if (!st || !tl) return;
    // Target the middle of product segment (targetIdx + 0.25)
    const targetTime = targetIdx + 0.25;
    const progress = Math.min(1, Math.max(0, targetTime / tl.duration()));
    const targetScrollY = st.start + (st.end - st.start) * progress;
    window.scrollTo({
      top: targetScrollY,
      behavior: 'smooth',
    });
  }, []);

  return (
    <section
      id="collection"
      ref={wrapperRef}
      aria-label={lang === 'en' ? 'The Collection' : 'La Colección'}
      className="relative z-10 w-full h-[100dvh] overflow-hidden studio-perspective"
    >
      {/* Subtle Top Studio Section Marker */}
      <div className="pointer-events-none absolute top-24 left-6 sm:left-10 lg:left-16 z-30 hidden sm:flex items-center gap-3 text-[10px] tracking-[0.28em] uppercase text-[#F3EBDD]/35">
        <span>{lang === 'en' ? 'CURATED COLLECTION' : 'COLECCIÓN CURADA'}</span>
        <span className="w-6 h-px bg-[#F3EBDD]/20" />
        <span className="num text-[#C9A96E]/80">
          {PRODUCTS[activeIndex]?.id} / 0{totalProducts}
        </span>
      </div>

      {/* All 7 Floating Product Stages inside the single pinned 3D viewport */}
      <div className="relative w-full h-full">
        {PRODUCTS.map((product, index) => (
          <ProductStageItem
            key={product.id}
            product={product}
            index={index}
            activeIndex={activeIndex}
            lang={lang}
            onOrderProduct={onOrderProduct}
          />
        ))}
      </div>

      {/* SECTION 7 — MINIMAL VERTICAL PROGRESS INDICATOR ON THE RIGHT (01–07) */}
      <nav
        aria-label={
          lang === 'en' ? 'Product collection index' : 'Índice de productos'
        }
        className="absolute right-4 sm:right-6 lg:right-10 top-1/2 -translate-y-1/2 z-40 flex flex-col items-end gap-3"
      >
        {PRODUCTS.map((item, idx) => {
          const isCurrent = idx === activeIndex;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => scrollToProduct(idx)}
              aria-label={`Jump to ${item.name[lang]}`}
              aria-current={isCurrent ? 'step' : undefined}
              className="group flex items-center gap-2.5 py-0.5 focus:outline-none"
            >
              <span
                className={`h-px transition-all duration-300 ${
                  isCurrent
                    ? 'w-5 bg-[#C9A96E]'
                    : 'w-2 bg-[#F3EBDD]/20 group-hover:w-3.5 group-hover:bg-[#F3EBDD]/60'
                }`}
              />
              <span
                className={`num text-[11px] tracking-[0.2em] transition-colors duration-300 ${
                  isCurrent
                    ? 'text-[#C9A96E] font-semibold'
                    : 'text-[#F3EBDD]/35 group-hover:text-[#F3EBDD]/85'
                }`}
              >
                {item.id}
              </span>
            </button>
          );
        })}
      </nav>
    </section>
  );
};
