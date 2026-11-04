import React from 'react';

/**
 * GLOBAL VISUAL ENVIRONMENT (Official Brand Sheet Edition)
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
      {/* Primary Studio Radial Illumination (#EEDAA6 -> #E7D095 -> #D9BE7D) */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 62% at 54% 46%, #EEDBA8 0%, #E7D095 55%, #D9BE7D 100%)',
        }}
      />

      {/* Official Brand Sheet Detail: Single Oversized Rose Watermark (#F0E0B2) on the Right Edge */}
      <img
        src="./brand/isotipo-rosa-watermark.svg"
        alt=""
        className="studio-watermark-rose absolute -right-[16vw] sm:-right-[10vw] top-1/2 -translate-y-1/2 w-[78vw] sm:w-[54vw] max-w-[780px] h-auto object-contain opacity-65 will-change-transform"
      />

      {/* Subtle studio floor horizon depth plane */}
      <div
        className="absolute bottom-0 inset-x-0 h-[32vh]"
        style={{
          background:
            'linear-gradient(to top, rgba(212, 183, 117, 0.45) 0%, rgba(231, 208, 149, 0.12) 60%, transparent 100%)',
        }}
      />

      {/* Subtle warm burgundy hairline frame at top of viewport */}
      <div className="absolute top-0 inset-x-0 h-[2px] bg-[#841F17]/20" />

      {/* Restrained peripheral warm vignette to anchor floating 3D objects */}
      <div
        className="absolute inset-0"
        style={{
          boxShadow: 'inset 0 0 150px rgba(132, 31, 23, 0.07)',
        }}
      />
    </div>
  );
};
