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
    if (!vid || videoFailed || (!isActive && !isAdjacent)) {
      return;
    }

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
      className={`product-stage-${index} absolute inset-0 w-full h-full flex items-center justify-center pt-16 pb-6 sm:pt-20 sm:pb-8 px-5 sm:px-10 lg:px-16 ${
        isActive ? 'pointer-events-auto z-20' : 'pointer-events-none z-10'
      }`}
      style={{ opacity: index === 0 ? 1 : 0 }}
    >
      <div className="max-w-[1440px] w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-12 items-center">
        {/* FLOATING 3D PRODUCT SCULPTURE (60–65% visual attention)
            Scroll directly controls the 360° 3D rotation of the video frames */}
        <div
          className={`lg:col-span-7 relative flex flex-col items-center justify-center order-1 ${
            isRightAlignedInfo ? 'lg:order-1' : 'lg:order-2'
          }`}
        >
          {/* Warm Marfil Studio Key-Light Behind the Floating Sculpture */}
          <div
            aria-hidden="true"
            className={`product-glow-${index} pointer-events-none absolute w-[80%] h-[80%] rounded-full blur-[80px] opacity-85`}
            style={{
              background:
                'radial-gradient(circle, rgba(250, 245, 232, 0.86) 0%, rgba(244, 230, 192, 0.42) 50%, transparent 76%)',
            }}
          />

          {/* 3D Floating Video Element — NO container box, NO rectangular border */}
          <div
            className={`product-visual-${index} relative w-full max-w-[440px] sm:max-w-[660px] lg:max-w-[800px] aspect-[16/10] flex items-center justify-center will-change-transform`}
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
                  poster={product.posterSrc}
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
            className={`product-shadow-${index} w-[54%] h-6 sm:h-7 -mt-2 sm:-mt-3 rounded-full blur-2xl pointer-events-none will-change-transform`}
            style={{
              background:
                'radial-gradient(ellipse at center, rgba(96, 26, 18, 0.30) 0%, rgba(96, 26, 18, 0.12) 55%, transparent 80%)',
            }}
          />
        </div>

        {/* EDITORIAL TYPOGRAPHY INTEGRATED INTO THE SCENE (NO CARDS / NO BOXES) */}
        <div
          className={`product-info-${index} lg:col-span-5 space-y-3.5 sm:space-y-5 text-center lg:text-left order-2 pr-4 sm:pr-0 will-change-transform ${
            isRightAlignedInfo
              ? 'lg:order-2 lg:pl-4 lg:pr-14'
              : 'lg:order-1 lg:pr-8'
          }`}
        >
          {/* Product Index Eyebrow */}
          <div className="flex items-center justify-center lg:justify-start gap-3">
            <span className="text-[11px] sm:text-xs font-semibold tracking-[0.28em] uppercase text-[#841F17] num">
              {product.indexLabel[lang]}
            </span>
            <span className="w-8 h-px bg-[#841F17]/45" />
          </div>

          {/* Large Elegant Serif Product Heading & Full Name */}
          <div className="space-y-1">
            <h2 className="font-serif font-normal text-3xl sm:text-5xl xl:text-[3.85rem] text-[#841F17] tracking-[-0.02em] leading-[1.0] uppercase">
              {product.shortTitle[lang]}
            </h2>
            <p className="font-serif italic text-xl sm:text-2xl text-[#63150F] font-normal">
              {product.name[lang]}
            </p>
          </div>

          {/* Readable Luxury Editorial Description */}
          <p className="text-sm sm:text-base text-[#4A120E]/90 font-normal leading-relaxed max-w-md mx-auto lg:mx-0">
            {product.description[lang]}
          </p>

          {/* Curated Artisanal Details */}
          {product.details && product.details[lang] && (
            <ul className="hidden sm:flex flex-col gap-1.5 pt-0.5 text-xs sm:text-sm text-[#5A120D]/90 font-normal max-w-md mx-auto lg:mx-0">
              {product.details[lang].map((line, i) => (
                <li
                  key={i}
                  className="flex items-center justify-center lg:justify-start gap-2.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#841F17] shrink-0" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          )}

          {/* Structured Editorial Specification Grid: Format, Servings & Price */}
          <div className="py-3 sm:py-3.5 border-y border-[#841F17]/20 grid grid-cols-3 gap-3 sm:gap-5 max-w-md mx-auto lg:mx-0 text-center lg:text-left">
            <div>
              <p className="text-[10px] font-semibold tracking-[0.22em] uppercase text-[#841F17]/75">
                {lang === 'en' ? 'FORMAT' : 'FORMATO'}
              </p>
              <p className="mt-0.5 text-xs sm:text-sm font-semibold tracking-[0.08em] uppercase text-[#4A120E]">
                {product.dimensions[lang]}
              </p>
            </div>

            <div className="border-x border-[#841F17]/15 px-2 sm:px-4">
              <p className="text-[10px] font-semibold tracking-[0.22em] uppercase text-[#841F17]/75">
                {lang === 'en' ? 'PORTIONS' : 'PORCIONES'}
              </p>
              <p className="mt-0.5 text-xs sm:text-sm font-semibold tracking-[0.08em] uppercase text-[#4A120E]">
                {product.servings[lang]}
              </p>
            </div>

            <div>
              <p className="text-[10px] font-semibold tracking-[0.22em] uppercase text-[#841F17]/75">
                {lang === 'en' ? 'PRICE' : 'PRECIO'}
              </p>
              <p
                data-editable-field={`product-${product.id}-price`}
                className="mt-0.5 font-serif text-base sm:text-lg font-semibold text-[#841F17] num"
              >
                {product.price[lang]}
              </p>
            </div>
          </div>

          {/* Ordering CTA */}
          <div className="pt-1 sm:pt-2 flex items-center justify-center lg:justify-start">
            <button
              type="button"
              onClick={() => onOrderProduct(product)}
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 sm:py-4 bg-[#841F17] hover:bg-[#63150F] text-[#FAF5E8] text-xs font-semibold tracking-[0.24em] uppercase transition-all duration-300 shadow-sm"
            >
              {product.ctaLabel[lang]}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};
