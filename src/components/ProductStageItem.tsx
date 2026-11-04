import React, { useEffect, useRef, useState } from 'react';
import { Language, Product } from '../types/catalog';

interface ProductStageItemProps {
  product: Product;
  index: number;
  activeIndex: number;
  lang: Language;
  onOrderProduct: (product: Product) => void;
}

export const ProductStageItem: React.FC<ProductStageItemProps> = ({
  product,
  index,
  activeIndex,
  lang,
  onOrderProduct,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoFailed, setVideoFailed] = useState(false);
  const [usingMp4Fallback, setUsingMp4Fallback] = useState(false);

  const isActive = index === activeIndex;
  const isAdjacent = Math.abs(index - activeIndex) <= 1;

  // Video Performance Controller: play ONLY when active or adjacent; pause otherwise
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid || videoFailed) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (isActive && !prefersReducedMotion) {
      const playPromise = vid.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Autoplay prevented or not yet loaded
        });
      }
    } else {
      vid.pause();
      if (!isAdjacent && vid.currentTime > 0) {
        vid.currentTime = 0;
      }
    }
  }, [isActive, isAdjacent, videoFailed]);

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
            On mobile: always top (order-1) so floating product is large & dominant.
            On desktop: alternates right (lg:order-2) or left (lg:order-1) for editorial rhythm. */}
        <div
          className={`lg:col-span-7 relative flex flex-col items-center justify-center order-1 ${
            isRightAlignedInfo ? 'lg:order-1' : 'lg:order-2'
          }`}
        >
          {/* Soft atmospheric studio spotlight behind the floating sculpture */}
          <div
            aria-hidden="true"
            className={`product-glow-${index} pointer-events-none absolute w-[76%] h-[76%] rounded-full blur-[95px] opacity-50`}
            style={{
              background:
                'radial-gradient(circle, rgba(201, 169, 110, 0.13) 0%, rgba(243, 235, 221, 0.05) 48%, transparent 74%)',
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
                  loop
                  playsInline
                  preload={index <= 1 || isAdjacent ? 'auto' : 'metadata'}
                  poster={product.posterSrc}
                  className={`w-full h-full object-contain pointer-events-none select-none floating-product-shadow ${
                    usingMp4Fallback ? 'video-feather-mask' : ''
                  }`}
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
            className={`product-shadow-${index} w-[58%] h-7 sm:h-9 -mt-3 sm:-mt-5 rounded-full blur-2xl pointer-events-none will-change-transform`}
            style={{
              background:
                'radial-gradient(ellipse at center, rgba(12, 13, 15, 0.92) 0%, rgba(12, 13, 15, 0.45) 55%, transparent 80%)',
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
            <span className="text-[10px] sm:text-[11px] font-medium tracking-[0.3em] uppercase text-[#C9A96E] num">
              {product.indexLabel[lang]}
            </span>
            <span className="w-8 h-px bg-[#C9A96E]/40" />
          </div>

          {/* Large Elegant Serif Product Heading */}
          <div className="space-y-1.5">
            <h2 className="font-serif font-light text-4xl sm:text-5xl xl:text-[4.1rem] text-[#F3EBDD] tracking-[-0.02em] leading-[0.98] uppercase">
              {product.shortTitle[lang]}
            </h2>
            <p className="font-serif italic text-lg sm:text-2xl text-[#C9A96E]/90 font-light">
              {product.name[lang]}
            </p>
          </div>

          {/* Short Editorial Description */}
          <p className="text-xs sm:text-sm md:text-[15px] text-[#F3EBDD]/75 font-light leading-relaxed max-w-md mx-auto lg:mx-0">
            {product.description[lang]}
          </p>

          {/* Optional Curated Details */}
          {product.details && product.details[lang] && (
            <ul className="hidden sm:flex flex-col gap-1.5 pt-1 text-xs text-[#F3EBDD]/60 font-light max-w-md mx-auto lg:mx-0">
              {product.details[lang].map((line, i) => (
                <li
                  key={i}
                  className="flex items-center justify-center lg:justify-start gap-2.5"
                >
                  <span className="w-1 h-1 rounded-full bg-[#C9A96E]" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          )}

          {/* Dimensions, Servings & Editable Price Typography */}
          <div className="pt-2 sm:pt-3 border-t border-[#F3EBDD]/10 flex flex-wrap items-center justify-center lg:justify-start gap-x-7 gap-y-2 text-[11px] tracking-[0.24em] uppercase">
            <span className="text-[#F3EBDD] font-medium">
              {product.dimensions[lang]}
            </span>
            <span className="text-[#F3EBDD]/30">·</span>
            <span className="text-[#F3EBDD]/80">{product.servings[lang]}</span>
            <span className="text-[#F3EBDD]/30">·</span>
            <span
              data-editable-field={`product-${product.id}-price`}
              className="text-[#C9A96E] font-semibold num"
            >
              {product.price[lang]}
            </span>
          </div>

          {/* Ordering CTA */}
          <div className="pt-2 sm:pt-4 flex items-center justify-center lg:justify-start gap-5">
            <button
              type="button"
              onClick={() => onOrderProduct(product)}
              className="inline-flex items-center justify-center px-7 sm:px-8 py-3.5 sm:py-4 border border-[#C9A96E]/70 hover:border-[#C9A96E] bg-transparent hover:bg-[#C9A96E] text-[#F3EBDD] hover:text-[#17181A] text-[11px] font-medium tracking-[0.26em] uppercase transition-all duration-300"
            >
              {product.ctaLabel[lang]}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};
