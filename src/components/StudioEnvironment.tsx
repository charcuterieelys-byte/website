import React from 'react';

/**
 * GLOBAL VISUAL ENVIRONMENT (Section 2)
 * A single fixed three-dimensional dark luxury studio environment.
 * Palette:
 * - Primary: #222326
 * - Secondary (Atmospheric Illumination): #303136
 * - Dark Shadows: #17181A
 */
export const StudioEnvironment: React.FC = () => {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden select-none bg-[#222326]"
    >
      {/* Primary Studio Radial Illumination (#303136 -> #222326 -> #17181A) */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 68% 58% at 54% 46%, #303136 0%, #25262A 46%, #222326 72%, #17181A 100%)',
        }}
      />

      {/* Soft overhead studio key-light bloom */}
      <div
        className="absolute -top-[18%] left-1/2 -translate-x-1/2 w-[90vw] h-[55vh] rounded-full opacity-45 blur-[110px]"
        style={{
          background:
            'radial-gradient(circle, rgba(243, 235, 221, 0.06) 0%, rgba(201, 169, 110, 0.03) 45%, transparent 75%)',
        }}
      />

      {/* Subtle studio floor horizon depth plane */}
      <div
        className="absolute bottom-0 inset-x-0 h-[38vh]"
        style={{
          background:
            'linear-gradient(to top, rgba(23, 24, 26, 0.85) 0%, rgba(34, 35, 38, 0.25) 55%, transparent 100%)',
        }}
      />

      {/* Restrained peripheral vignette to anchor floating 3D objects */}
      <div
        className="absolute inset-0"
        style={{
          boxShadow: 'inset 0 0 180px rgba(15, 16, 18, 0.72)',
        }}
      />
    </div>
  );
};
