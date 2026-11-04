import React from 'react';

/**
 * GLOBAL VISUAL ENVIRONMENT (Section 2 — Brand Sheet Edition)
 * A single fixed three-dimensional luxury studio environment in Ely's official
 * Warm Cream-Gold & Burgundy Red palette:
 * - Primary Studio Cream-Gold: #E7D095
 * - Soft Illuminated Cream Highlight / Rose Watermark: #F0E0B2
 * - Warm Studio Depth Edge: #D8BD7A
 * - Burgundy Red Accents: #841F17
 */
export const StudioEnvironment: React.FC = () => {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden select-none bg-[#E7D095]"
    >
      {/* Primary Studio Radial Illumination (#F2E3B8 -> #E7D095 -> #D9BE7D) */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 62% at 54% 46%, #F2E3B8 0%, #EBD6A0 45%, #E7D095 74%, #D9BE7D 100%)',
        }}
      />

      {/* Soft overhead warm ivory key-light bloom */}
      <div
        className="absolute -top-[15%] left-1/2 -translate-x-1/2 w-[88vw] h-[52vh] rounded-full opacity-60 blur-[110px]"
        style={{
          background:
            'radial-gradient(circle, rgba(250, 245, 232, 0.55) 0%, rgba(240, 224, 178, 0.25) 50%, transparent 78%)',
        }}
      />

      {/* Official Brand Sheet Detail: Subtle Oversized Rose Watermark (#F0E0B2) on the Right Edge */}
      <img
        src="./brand/isotipo-rosa-watermark.svg"
        alt=""
        className="absolute -right-[16vw] sm:-right-[10vw] top-1/2 -translate-y-1/2 w-[78vw] sm:w-[54vw] max-w-[780px] h-auto object-contain opacity-65"
      />

      {/* Subtle studio floor horizon depth plane */}
      <div
        className="absolute bottom-0 inset-x-0 h-[34vh]"
        style={{
          background:
            'linear-gradient(to top, rgba(212, 183, 117, 0.55) 0%, rgba(231, 208, 149, 0.15) 60%, transparent 100%)',
        }}
      />

      {/* Subtle warm burgundy-gold hairline frame at top of viewport */}
      <div className="absolute top-0 inset-x-0 h-[2px] bg-[#841F17]/20" />

      {/* Restrained peripheral warm vignette to anchor floating 3D objects */}
      <div
        className="absolute inset-0"
        style={{
          boxShadow: 'inset 0 0 160px rgba(132, 31, 23, 0.08)',
        }}
      />
    </div>
  );
};
