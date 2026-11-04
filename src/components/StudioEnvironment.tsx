import React from 'react';

/**
 * GLOBAL VISUAL ENVIRONMENT (Phase 2 — Warm Ivory / Marfil & Cream-Gold Studio)
 * A single fixed three-dimensional luxury studio environment in Ely's official
 * Warm Ivory, Cream-Gold & Burgundy Red palette:
 * - Warm Ivory / Marfil Key Light: #FAF5E8 -> #F4E6C2
 * - Primary Studio Cream-Gold: #E7D095
 * - Soft Illuminated Rose Watermark: #F0E0B2
 * - Deep Burgundy Accents: #841F17
 */
export const StudioEnvironment: React.FC = () => {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden select-none bg-[#E7D095]"
    >
      {/* Primary Studio Radial Illumination: Warm Ivory/Marfil heart blending into Cream-Gold */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 74% 66% at 52% 44%, #FAF5E8 0%, #F4E6C0 38%, #EBD6A0 68%, #E2C684 100%)',
        }}
      />

      {/* Soft overhead warm marfil studio key-light bloom */}
      <div
        className="absolute -top-[12%] left-1/2 -translate-x-1/2 w-[90vw] h-[54vh] rounded-full opacity-75 blur-[115px]"
        style={{
          background:
            'radial-gradient(circle, rgba(250, 245, 232, 0.82) 0%, rgba(244, 230, 192, 0.38) 54%, transparent 80%)',
        }}
      />

      {/* Official Brand Sheet Detail: Subtle Oversized Rose Watermark on the Right Edge */}
      <img
        src="./brand/isotipo-rosa-watermark.svg"
        alt=""
        className="absolute -right-[18vw] sm:-right-[10vw] top-1/2 -translate-y-1/2 w-[78vw] sm:w-[52vw] max-w-[760px] h-auto object-contain opacity-55"
      />

      {/* Subtle studio floor horizon depth plane */}
      <div
        className="absolute bottom-0 inset-x-0 h-[30vh]"
        style={{
          background:
            'linear-gradient(to top, rgba(218, 190, 125, 0.45) 0%, rgba(231, 208, 149, 0.12) 60%, transparent 100%)',
        }}
      />

      {/* Subtle warm burgundy hairline frame at top of viewport */}
      <div className="absolute top-0 inset-x-0 h-[2px] bg-[#841F17]/20" />

      {/* Restrained peripheral warm vignette to anchor floating 3D objects */}
      <div
        className="absolute inset-0"
        style={{
          boxShadow: 'inset 0 0 140px rgba(132, 31, 23, 0.06)',
        }}
      />
    </div>
  );
};
