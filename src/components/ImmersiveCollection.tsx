import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Language, Product } from '../types/catalog';
import { PRODUCTS } from '../data/catalog';
import { ProductStageItem } from './ProductStageItem';

gsap.registerPlugin(ScrollTrigger);

interface ImmersiveCollectionProps {
  lang: Language;
  products?: Product[];
  onOrderProduct: (product: Product) => void;
}

/**
 * SECTION 5 & 6 — THE MAIN EXPERIENCE: IMMERSIVE PRODUCT COLLECTION (01–07)
 * - Single pinned studio viewport controlled by GSAP ScrollTrigger.
 * - During each product's dwell window [i, i + 0.72], scrolling smoothly rotates
 *   the product in 3D from 0% to 100% of its turntable video frames.
 * - During [i + 0.72, i + 0.85], the current product exits cleanly without distortion.
 * - During [i + 0.85, i + 1.00], the next product enters smoothly with zero overlap.
 */
export const ImmersiveCollection: React.FC<ImmersiveCollectionProps> = ({
  lang,
  products = PRODUCTS,
  onOrderProduct,
}) => {
  const wrapperRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<ScrollTrigger | null>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const rotationProgressRef = useRef<number[]>(products.map(() => 0));
  const rotationBarRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const totalProducts = products.length;
  const ROTATION_WINDOW = 0.72; // First 72% rotates the 3D turntable; remaining 28% executes a clean non-overlapping transition

  useEffect(() => {
    if (!wrapperRef.current) return;

    const ctx = gsap.context(() => {
      // Initialize all stages: Product 01 visible at start, 02–07 waiting cleanly in the studio
      products.forEach((_, idx) => {
        if (idx === 0) {
          gsap.set(`.product-stage-${idx}`, { autoAlpha: 1 });
          gsap.set(`.product-visual-${idx}`, {
            y: 0,
            scale: 1,
            opacity: 1,
          });
          gsap.set(`.product-info-${idx}`, { y: 0, opacity: 1 });
          gsap.set(`.product-shadow-${idx}`, { scale: 1, opacity: 0.82 });
        } else {
          gsap.set(`.product-stage-${idx}`, { autoAlpha: 0 });
          gsap.set(`.product-visual-${idx}`, {
            y: 44,
            scale: 0.92,
            opacity: 0,
          });
          gsap.set(`.product-info-${idx}`, { y: 28, opacity: 0 });
          gsap.set(`.product-shadow-${idx}`, { scale: 0.65, opacity: 0 });
        }
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          pin: true,
          start: 'top top',
          end: () => `+=${window.innerHeight * (totalProducts * 1.38)}`,
          scrub: 0.45,
          anticipatePin: 1,
          onUpdate: (self) => {
            const totalDur = tl.duration() || 1;
            const currentTime = self.progress * totalDur;

            // Switch active index cleanly at the exact non-overlapping handoff point (i + 0.85)
            const idx = Math.min(
              totalProducts - 1,
              Math.max(0, Math.floor(currentTime + 0.15))
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

      // Build distortion-free, non-overlapping choreographed segments for all 7 products
      for (let i = 0; i < totalProducts; i++) {
        const segStart = i; // Each product step = 1.0 timeline unit
        tl.addLabel(`product-${i}`, segStart);

        // Subtle, poised breathing lift while the product rotates 360° in [segStart, segStart + ROTATION_WINDOW]
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

        // Sequential non-overlapping transition from Product i -> Product i + 1
        if (i < totalProducts - 1) {
          const next = i + 1;
          const exitStart = segStart + ROTATION_WINDOW; // i + 0.72
          const exitDur = 0.13; // ends at i + 0.85
          const enterStart = exitStart + exitDur; // starts at i + 0.85 (zero overlap!)
          const enterDur = 0.15; // ends at i + 1.00

          // 1. Current product exits smoothly upward and fades completely by i + 0.85
          tl.to(
            `.product-visual-${i}`,
            {
              y: -44,
              scale: 0.94,
              opacity: 0,
              duration: exitDur,
              ease: 'power2.in',
            },
            exitStart
          )
            .to(
              `.product-shadow-${i}`,
              {
                scale: 0.65,
                opacity: 0,
                duration: exitDur,
                ease: 'power2.in',
              },
              exitStart
            )
            .to(
              `.product-info-${i}`,
              {
                y: -24,
                opacity: 0,
                duration: exitDur,
                ease: 'power2.in',
              },
              exitStart
            )
            .set(`.product-stage-${i}`, { autoAlpha: 0 }, enterStart);

          // 2. Next product enters cleanly into the center of the studio [i + 0.85 -> i + 1.00]
          tl.set(`.product-stage-${next}`, { autoAlpha: 1 }, enterStart)
            .fromTo(
              `.product-visual-${next}`,
              {
                y: 44,
                scale: 0.92,
                opacity: 0,
              },
              {
                y: 0,
                scale: 1,
                opacity: 1,
                duration: enterDur,
                ease: 'power2.out',
              },
              enterStart
            )
            .fromTo(
              `.product-shadow-${next}`,
              { scale: 0.65, opacity: 0 },
              {
                scale: 1,
                opacity: 0.82,
                duration: enterDur,
                ease: 'power2.out',
              },
              enterStart
            )
            .fromTo(
              `.product-info-${next}`,
              { y: 28, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: enterDur,
                ease: 'power2.out',
              },
              enterStart
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
    const targetTime = targetIdx + 0.04;
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
      className="relative z-10 w-full h-[100dvh] overflow-hidden"
    >
      {/* Top Studio Section Header & 3D Rotation Progress Bar */}
      <div className="pointer-events-none absolute top-20 sm:top-24 left-6 sm:left-10 lg:left-16 z-30 flex items-center gap-3 sm:gap-4 text-[10px] sm:text-[11px] font-semibold tracking-[0.26em] uppercase text-[#5A120D]/75">
        <span>{lang === 'en' ? 'CURATED COLLECTION' : 'COLECCIÓN CURADA'}</span>
        <span className="num text-[#841F17] font-bold">
          {products[activeIndex]?.id} / {String(totalProducts).padStart(2, '0')}
        </span>
        <div className="w-16 sm:w-24 h-[2px] bg-[#841F17]/20 overflow-hidden">
          <div
            ref={rotationBarRef}
            className="w-full h-full bg-[#841F17] origin-left"
            style={{ transform: 'scaleX(0)' }}
          />
        </div>
        <span className="hidden sm:inline text-[10px] tracking-[0.22em] text-[#841F17]/85">
          {lang === 'en' ? '360° VIEW' : 'GIRO 360°'}
        </span>
      </div>

      {/* All Floating Product Stages inside the single pinned viewport */}
      <div className="relative w-full h-full">
        {products.map((product, index) => (
          <ProductStageItem
            key={`${product.slug}-${index}`}
            product={product}
            index={index}
            activeIndex={activeIndex}
            lang={lang}
            rotationProgressRef={rotationProgressRef}
            onOrderProduct={onOrderProduct}
          />
        ))}
      </div>

      {/* MINIMAL VERTICAL PROGRESS INDICATOR ON THE RIGHT */}
      <nav
        aria-label={
          lang === 'en' ? 'Product collection index' : 'Índice de productos'
        }
        className="absolute right-3 sm:right-6 lg:right-10 top-1/2 -translate-y-1/2 z-40 flex flex-col items-end gap-2.5 sm:gap-3"
      >
        {products.map((item, idx) => {
          const isCurrent = idx === activeIndex;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => scrollToProduct(idx)}
              aria-label={`Jump to ${item.name[lang]}`}
              aria-current={isCurrent ? 'step' : undefined}
              className="group flex items-center gap-2 sm:gap-2.5 py-0.5 focus:outline-none"
            >
              <span
                className={`h-[1.5px] transition-all duration-300 ${
                  isCurrent
                    ? 'w-5 sm:w-6 bg-[#841F17]'
                    : 'w-2 sm:w-2.5 bg-[#841F17]/30 group-hover:w-4 group-hover:bg-[#841F17]/75'
                }`}
              />
              <span
                className={`num text-[11px] tracking-[0.18em] transition-colors duration-300 ${
                  isCurrent
                    ? 'text-[#841F17] font-bold'
                    : 'text-[#841F17]/50 group-hover:text-[#841F17]'
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
