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
 * - During each product's dwell window [i, i + 0.74], scrolling directly rotates
 *   the product in 3D from 0% to 100% of its turntable video frames.
 * - During [i + 0.74, i + 1.0], the current product exits in 3D space while the
 *   next product enters.
 */
export const ImmersiveCollection: React.FC<ImmersiveCollectionProps> = ({
  lang,
  onOrderProduct,
}) => {
  const wrapperRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<ScrollTrigger | null>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const rotationProgressRef = useRef<number[]>(PRODUCTS.map(() => 0));
  const rotationBarRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const totalProducts = PRODUCTS.length; // 7
  const ROTATION_WINDOW = 0.74; // First 74% of each product segment rotates the 3D video; remaining 26% transitions to next product

  useEffect(() => {
    if (!wrapperRef.current) return;

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
            y: 110,
            z: -200,
            scale: 0.78,
            rotationX: 12,
            rotationY: idx % 2 === 0 ? -10 : 10,
            rotationZ: idx % 2 === 0 ? -3 : 3,
            opacity: 0,
          });
          gsap.set(`.product-info-${idx}`, { y: 40, opacity: 0 });
          gsap.set(`.product-shadow-${idx}`, { scale: 0.45, opacity: 0 });
        }
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          pin: true,
          start: 'top top',
          // Generous scroll distance so each product rotates smoothly in 3D before transitioning
          end: () => `+=${window.innerHeight * (totalProducts * 1.45)}`,
          scrub: 0.5,
          anticipatePin: 1,
          onUpdate: (self) => {
            const totalDur = tl.duration() || 1;
            const currentTime = self.progress * totalDur;

            // Active index switches at transition midpoint (i + 0.87)
            const idx = Math.min(
              totalProducts - 1,
              Math.max(0, Math.floor(currentTime + 0.13))
            );
            setActiveIndex((prev) => (prev !== idx ? idx : prev));

            // Update per-product 3D rotation progress [0..1] based on scroll position
            for (let k = 0; k < totalProducts; k++) {
              const localT = currentTime - k;
              const rotP = Math.min(1, Math.max(0, localT / ROTATION_WINDOW));
              rotationProgressRef.current[k] = rotP;
            }

            // Update visual 360° rotation scrub bar in DOM without React re-render
            if (rotationBarRef.current) {
              const activeRot = rotationProgressRef.current[idx] ?? 0;
              rotationBarRef.current.style.transform = `scaleX(${activeRot})`;
            }
          },
        },
      });

      timelineRef.current = tl;
      triggerRef.current = tl.scrollTrigger || null;

      // Build reusable choreographed segments for all 7 products
      for (let i = 0; i < totalProducts; i++) {
        const segStart = i; // Each product step = 1.0 timeline unit
        tl.addLabel(`product-${i}`, segStart);

        // During [segStart, segStart + ROTATION_WINDOW], the product stays centered
        // while its video frames rotate in 3D via rotationProgressRef
        tl.to(
          `.product-visual-${i}`,
          {
            y: -6,
            scale: 1.02,
            duration: ROTATION_WINDOW,
            ease: 'sine.inOut',
          },
          segStart
        );

        // Coordinated transition from Product i -> Product i + 1 [i + 0.74, i + 1.0]
        if (i < totalProducts - 1) {
          const next = i + 1;
          const exitStart = segStart + ROTATION_WINDOW;
          const exitDur = 0.14;
          const enterStart = segStart + ROTATION_WINDOW + 0.1;
          const enterDur = 0.16;

          // 1. Current product exits smoothly in 3D space after finishing its 3D rotation
          tl.to(
            `.product-visual-${i}`,
            {
              y: -115,
              z: -180,
              scale: 0.82,
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
                y: 115,
                z: -200,
                scale: 0.78,
                rotationX: 12,
                rotationY: next % 2 === 0 ? -10 : 10,
                rotationZ: next % 2 === 0 ? -3 : 3,
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
              { y: 38, opacity: 0 },
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
    const targetTime = targetIdx + 0.05;
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
      {/* Top Studio Section & 3D Rotation Progress Bar */}
      <div className="pointer-events-none absolute top-24 left-6 sm:left-10 lg:left-16 z-30 hidden sm:flex items-center gap-4 text-[10px] font-semibold tracking-[0.28em] uppercase text-[#5A120D]/65">
        <span>{lang === 'en' ? 'CURATED COLLECTION' : 'COLECCIÓN CURADA'}</span>
        <span className="num text-[#841F17]">
          {PRODUCTS[activeIndex]?.id} / 0{totalProducts}
        </span>
        <div className="w-20 h-[2px] bg-[#841F17]/20 overflow-hidden">
          <div
            ref={rotationBarRef}
            className="w-full h-full bg-[#841F17] origin-left"
            style={{ transform: 'scaleX(0)' }}
          />
        </div>
        <span className="text-[9px] tracking-[0.24em] text-[#841F17]/85">
          {lang === 'en' ? '3D ROTATION' : 'GIRO 3D'}
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
            rotationProgressRef={rotationProgressRef}
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
                className={`h-[1.5px] transition-all duration-300 ${
                  isCurrent
                    ? 'w-6 bg-[#841F17]'
                    : 'w-2.5 bg-[#841F17]/30 group-hover:w-4 group-hover:bg-[#841F17]/75'
                }`}
              />
              <span
                className={`num text-[11px] tracking-[0.2em] transition-colors duration-300 ${
                  isCurrent
                    ? 'text-[#841F17] font-bold'
                    : 'text-[#841F17]/45 group-hover:text-[#841F17]'
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
