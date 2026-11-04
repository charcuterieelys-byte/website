import React, { useEffect, useRef, useState } from 'react';
import { Language, Product } from '../types/catalog';

interface ProductStageItemProps {
  product: Product;
  index: number;
  activeIndex: number;
  lang: Language;
  rotationProgressRef: React.MutableRefObject<number[]>;
  onOrderProduct: (product: Product) => void;
}

export const ProductStageItem: React.FC<ProductStageItemProps> = ({
  product,
  index,
  activeIndex,
  lang,
  rotationProgressRef,
  onOrderProduct,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const smoothProgressRef = useRef<number>(0);
  const [videoFailed, setVideoFailed] = useState(false);

  const isActive = index === activeIndex;
  const isAdjacent = Math.abs(index - activeIndex) <= 1;

  // Initialize video for scroll-controlled 3D scrubbing
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid || videoFailed) return;

    vid.muted = true;
    vid.defaultMuted = true;
    vid.playsInline = true;
    vid.pause();
  }, [videoFailed]);

  // High-frequency 60fps requestAnimationFrame Lerp Scrubbing Engine
  // Scrubs video.currentTime directly according to scroll progress for this product
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid || videoFailed || (!isActive && !isAdjacent)) return;

    let rafId: number;
    const updateVideoFrame = () => {
      const targetP = rotationProgressRef.current[index] ?? 0;
      const currentP = smoothProgressRef.current;
      const nextP = currentP + (targetP - currentP) * 0.22;
      smoothProgressRef.current = nextP;

      if (vid.readyState >= 2 && vid.duration && Number.isFinite(vid.duration)) {
        const clampedP = Math.min(1, Math.max(0, nextP));
        const targetTime = clampedP * Math.max(0, vid.duration - 0.04);

        if (!vid.seeking && Math.abs(vid.currentTime - targetTime) > 0.012) {
          try {
            vid.currentTime = targetTime;
          } catch {
            // Ignore transient seek exception while buffering
          }
        }
      }

      rafId = requestAnimationFrame(updateVideoFrame);
    };

    rafId = requestAnimationFrame(updateVideoFrame);
    return () => cancelAnimationFrame(rafId);
  }, [index, isActive, isAdjacent, rotationProgressRef, videoFailed]);

  const isRightAlignedInfo = product.layoutAlign === 'right';

  return (
    <article
      data-product-stage={index}
      aria-hidden={!isActive}
      className={`product-stage-${index} absolute inset-0 w-full h-full flex items-center justify-center px-6 sm:px-10 lg:px-16 ${
        isActive ? 'pointer-events-auto z-20' : 'pointer-events-none z-10'
      }`}
      style={{ opacity: index === 0 ? 1 : 0 }}
    >
      <div className="max-w-[1440px] w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-10 items-center">
        {/* FLOATING 3D PRODUCT SCULPTURE (58-65% visual attention)
            Scroll directly controls the 3D rotation of the video frames */}
        <div
          className={`lg:col-span-7 relative flex flex-col items-center justify-center order-1 ${
            isRightAlignedInfo ? 'lg:order-1' : 'lg:order-2'
          }`}
        >
          {/* Soft warm ivory studio spotlight behind the floating sculpture */}
          <div
            aria-hidden="true"
            className={`product-glow-${index} pointer-events-none absolute w-[76%] h-[76%] rounded-full blur-[85px] opacity-75`}
            style={{
              background:
                'radial-gradient(circle, rgba(250, 245, 232, 0.72) 0%, rgba(240, 224, 178, 0.35) 48%, transparent 74%)',
            }}
          />

          {/* 3D Floating Video Element — NO container box, NO rectangular border */}
          <div
            className={`product-visual-${index} relative w-full max-w-[780px] aspect-[16/9] flex items-center justify-center will-change-transform`}
            style={{
              transformStyle: 'preserve-3d',
            }}
          >
            <div
              className="w-full h-full flex items-center justify-center"
              style={{ transform: `scale(${product.visualScale})` }}
            >
              {!videoFailed ? (
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
                  className="w-full h-full object-contain pointer-events-none select-none floating-product-shadow"
                >
                  <source src={product.videoSrc} type="video/webm" />
                  <source
                    src={product.videoFallbackMp4}
                    type="video/mp4"
                    onError={() => setVideoFailed(true)}
                  />
                </video>
              ) : (
                <img
                  src={product.posterSrc}
                  alt={product.name[lang]}
                  className="w-full h-full object-contain pointer-events-none select-none floating-product-shadow"
                />
              )}
            </div>
          </div>

          {/* Grounded Studio Floor Shadow */}
          <div
            aria-hidden="true"
            className={`product-shadow-${index} w-[56%] h-7 sm:h-8 -mt-3 sm:-mt-4 rounded-full blur-2xl pointer-events-none will-change-transform`}
            style={{
              background:
                'radial-gradient(ellipse at center, rgba(96, 26, 18, 0.34) 0%, rgba(96, 26, 18, 0.14) 55%, transparent 80%)',
            }}
          />
        </div>

        {/* EDITORIAL TYPOGRAPHY INTEGRATED INTO THE SCENE (NO CARDS / NO BOXES) */}
        <div
          className={`product-info-${index} lg:col-span-5 space-y-4 sm:space-y-6 text-center lg:text-left order-2 will-change-transform ${
            isRightAlignedInfo ? 'lg:order-2 lg:pl-6 lg:pr-14' : 'lg:order-1 lg:pr-8'
          }`}
        >
          {/* Small Product Index */}
          <div className="flex items-center justify-center lg:justify-start gap-3">
            <span className="text-[10px] sm:text-[11px] font-semibold tracking-[0.3em] uppercase text-[#841F17] num">
              {product.indexLabel[lang]}
            </span>
            <span className="w-8 h-px bg-[#841F17]/45" />
          </div>

          {/* Large Elegant Serif Product Heading in Signature Burgundy Red */}
          <div className="space-y-1.5">
            <h2 className="font-serif font-normal text-4xl sm:text-5xl xl:text-[4.1rem] text-[#841F17] tracking-[-0.02em] leading-[0.98] uppercase">
              {product.shortTitle[lang]}
            </h2>
            <p className="font-serif italic text-lg sm:text-2xl text-[#63150F] font-normal">
              {product.name[lang]}
            </p>
          </div>

          {/* Short Editorial Description */}
          <p className="text-xs sm:text-sm md:text-[15px] text-[#4A120E]/85 font-normal leading-relaxed max-w-md mx-auto lg:mx-0">
            {product.description[lang]}
          </p>

          {/* Optional Curated Details */}
          {product.details && product.details[lang] && (
            <ul className="hidden sm:flex flex-col gap-1.5 pt-1 text-xs text-[#5A120D]/80 font-normal max-w-md mx-auto lg:mx-0">
              {product.details[lang].map((line, i) => (
                <li
                  key={i}
                  className="flex items-center justify-center lg:justify-start gap-2.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#841F17]" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          )}

          {/* Dimensions, Servings & Editable Price Typography */}
          <div className="pt-2 sm:pt-3 border-t border-[#841F17]/20 flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-2 text-[11px] tracking-[0.22em] uppercase">
            <span className="text-[#841F17] font-semibold">
              {product.dimensions[lang]}
            </span>
            <span className="text-[#841F17]/40">·</span>
            <span className="text-[#5A120D]/90 font-medium">
              {product.servings[lang]}
            </span>
            <span className="text-[#841F17]/40">·</span>
            <span
              data-editable-field={`product-${product.id}-price`}
              className="text-[#841F17] font-bold num bg-[#FAF5E8]/55 px-2.5 py-0.5 border border-[#841F17]/25"
            >
              {product.price[lang]}
            </span>
          </div>

          {/* Ordering CTA */}
          <div className="pt-2 sm:pt-4 flex items-center justify-center lg:justify-start gap-5">
            <button
              type="button"
              onClick={() => onOrderProduct(product)}
              className="inline-flex items-center justify-center px-7 sm:px-8 py-3.5 sm:py-4 bg-[#841F17] hover:bg-[#63150F] text-[#FAF5E8] text-[11px] font-semibold tracking-[0.26em] uppercase transition-all duration-300 shadow-sm"
            >
              {product.ctaLabel[lang]}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};
