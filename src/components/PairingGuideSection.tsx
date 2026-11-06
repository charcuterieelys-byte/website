import React, { useState, useEffect } from 'react';
import { X, Wine, Sparkles, BookOpen, Check } from 'lucide-react';
import { Language } from '../types/catalog';

interface PairingGuideSectionProps {
  lang: Language;
  onInquirePairing: (selection: string) => void;
}

interface HotspotItem {
  id: string;
  num: string;
  x: number; // percentage on circular board
  y: number; // percentage on circular board
  category: Record<Language, string>;
  tastingStep: Record<Language, string>;
  name: Record<Language, string>;
  profile: Record<Language, string>;
  winningCombo: Record<Language, string>;
  winningComboDesc: Record<Language, string>;
  idealCracker: Record<Language, string>;
  winePairing: Record<Language, string>;
}

const BOARD_HOTSPOTS: HotspotItem[] = [
  {
    id: 'brie',
    num: '01',
    x: 47,
    y: 84,
    category: {
      es: 'LOS PROTAGONISTAS DE LA TABLA',
      en: 'STARS OF THE BOARD',
    },
    tastingStep: {
      es: 'Paso 1 · Comienza con sabores suaves',
      en: 'Step 1 · Start with mild, creamy flavors',
    },
    name: {
      es: 'Queso Brie',
      en: 'Artisan Brie Cheese',
    },
    profile: {
      es: 'Cremoso y suave. Ideal con miel, frutas frescas y frutos secos.',
      en: 'Creamy and mild. Ideal with local honey, fresh fruits, and nuts.',
    },
    winningCombo: {
      es: 'Brie + miel + nueces',
      en: 'Brie + honey + walnuts',
    },
    winningComboDesc: {
      es: 'Cremoso, dulce y crujiente en un solo bocado.',
      en: 'Creamy, sweet, and crunchy in a single bite.',
    },
    idealCracker: {
      es: 'Tostadas artesanales (ideales para quesos cremosos y untables) o Crackers Clásicos.',
      en: 'Artisanal toasts (ideal for creamy, spreadable cheeses) or Classic Crackers.',
    },
    winePairing: {
      es: 'Vino Blanco o Espumoso / Prosecco',
      en: 'White Wine or Sparkling / Prosecco',
    },
  },
  {
    id: 'gouda',
    num: '02',
    x: 19,
    y: 46,
    category: {
      es: 'LOS PROTAGONISTAS DE LA TABLA',
      en: 'STARS OF THE BOARD',
    },
    tastingStep: {
      es: 'Paso 1 · Comienza con sabores suaves',
      en: 'Step 1 · Start with mild, smooth flavors',
    },
    name: {
      es: 'Queso Gouda',
      en: 'Aged Gouda Cheese',
    },
    profile: {
      es: 'Suave y ligeramente dulce. Perfecto con uvas, chocolate y frutos secos.',
      en: 'Smooth and slightly sweet. Perfect with grapes, dark chocolate, and nuts.',
    },
    winningCombo: {
      es: 'Gouda + uvas + chocolate',
      en: 'Gouda + grapes + dark chocolate',
    },
    winningComboDesc: {
      es: 'Un contraste dulce y sofisticado que sorprende al paladar.',
      en: 'A sweet, sophisticated contrast that delights the palate.',
    },
    idealCracker: {
      es: 'Crackers Clásicos (neutros y versátiles, combinan con todos los quesos).',
      en: 'Classic Crackers (neutral and versatile, pair with every cheese).',
    },
    winePairing: {
      es: 'Vino Blanco (perfecto para quesos suaves y cremosos)',
      en: 'White Wine (perfect for smooth, creamy cheeses)',
    },
  },
  {
    id: 'cheddar',
    num: '03',
    x: 82,
    y: 67,
    category: {
      es: 'LOS PROTAGONISTAS DE LA TABLA',
      en: 'STARS OF THE BOARD',
    },
    tastingStep: {
      es: 'Paso 2 · Continúa con sabores medios',
      en: 'Step 2 · Continue with medium-bodied flavors',
    },
    name: {
      es: 'Queso Cheddar',
      en: 'Sharp Cheddar Cheese',
    },
    profile: {
      es: 'Intenso y con carácter. Combina con salami, aceitunas y crackers salados.',
      en: 'Bold and full of character. Pairs with salami, olives, and savory crackers.',
    },
    winningCombo: {
      es: 'Cheddar + salami italiano + cracker',
      en: 'Cheddar + Italian salami + cracker',
    },
    winningComboDesc: {
      es: 'Intenso, equilibrado y delicioso.',
      en: 'Bold, balanced, and deeply savory.',
    },
    idealCracker: {
      es: 'Crackers Multigrano (aportan textura y un sabor más rústico).',
      en: 'Multigrain Crackers (add crunch and a rustic nutty flavor).',
    },
    winePairing: {
      es: 'Vino Tinto (ideal para quesos con carácter y embutidos)',
      en: 'Red Wine (ideal for aged cheeses and cured meats)',
    },
  },
  {
    id: 'cabra',
    num: '04',
    x: 24,
    y: 23,
    category: {
      es: 'LOS PROTAGONISTAS DE LA TABLA',
      en: 'STARS OF THE BOARD',
    },
    tastingStep: {
      es: 'Paso 2 · Continúa con sabores medios',
      en: 'Step 2 · Continue with medium-bodied flavors',
    },
    name: {
      es: 'Queso de Cabra (con cherry)',
      en: 'Goat Cheese (with cherry & berries)',
    },
    profile: {
      es: 'Cremoso y ácido. Delicioso con tomates cherry, frutos rojos, hierbas y un toque de miel.',
      en: 'Creamy and tangy. Delicious with cherry tomatoes, berries, herbs, and a touch of honey.',
    },
    winningCombo: {
      es: 'Queso de cabra + cherry + cracker',
      en: 'Goat cheese + cherry + cracker',
    },
    winningComboDesc: {
      es: 'Fresco, cremoso y con un toque ácido vibrante.',
      en: 'Fresh, creamy, and brightened with a vibrant tangy note.',
    },
    idealCracker: {
      es: 'Tostadas artesanales o Crackers Clásicos.',
      en: 'Artisanal toasts or Classic Crackers.',
    },
    winePairing: {
      es: 'Vino Blanco o Espumoso / Prosecco',
      en: 'White Wine or Sparkling / Prosecco',
    },
  },
  {
    id: 'manchego',
    num: '05',
    x: 75,
    y: 28,
    category: {
      es: 'LOS PROTAGONISTAS DE LA TABLA',
      en: 'STARS OF THE BOARD',
    },
    tastingStep: {
      es: 'Paso 3 · Finaliza con sabores más intensos',
      en: 'Step 3 · Finish with bold, intense flavors',
    },
    name: {
      es: 'Queso Manchego & Chorizo',
      en: 'Manchego Cheese & Chorizo',
    },
    profile: {
      es: 'Firme y ligeramente salado. Excelente con chorizo español, salami y aceitunas.',
      en: 'Firm and savory. Exceptional alongside Spanish chorizo, salami, and olives.',
    },
    winningCombo: {
      es: 'Manchego + chorizo + aceituna',
      en: 'Manchego + chorizo + Mediterranean olive',
    },
    winningComboDesc: {
      es: 'Clásico mediterráneo y lleno de sabor.',
      en: 'A timeless Mediterranean pairing full of depth.',
    },
    idealCracker: {
      es: 'Grissini (largos y crujientes) o Crackers Multigrano.',
      en: 'Grissini breadsticks or Multigrain Crackers.',
    },
    winePairing: {
      es: 'Vino Tinto (ideal para quesos curados como Manchego y embutidos)',
      en: 'Red Wine (ideal for aged Manchego and cured charcuterie)',
    },
  },
  {
    id: 'prosciutto',
    num: '06',
    x: 54,
    y: 29,
    category: {
      es: 'CHARCUTERÍA ARTESANAL',
      en: 'ARTISANAL CHARCUTERIE',
    },
    tastingStep: {
      es: 'Paso 3 · Finaliza con sabores más intensos',
      en: 'Step 3 · Finish with bold, savory flavors',
    },
    name: {
      es: 'Prosciutto & Rosas de Salami',
      en: 'Prosciutto & Hand-Folded Salami Roses',
    },
    profile: {
      es: 'Jamón prosciutto de curación delicada y rosas de salami italiano plegadas a mano.',
      en: 'Delicately cured prosciutto ribbons and hand-folded Italian salami roses.',
    },
    winningCombo: {
      es: 'Prosciutto envuelto en Grissini + toque de miel',
      en: 'Prosciutto wrapped around Grissini + touch of honey',
    },
    winningComboDesc: {
      es: 'Crujiente, sedoso y perfectamente balanceado.',
      en: 'Crisp, silky, and effortlessly balanced.',
    },
    idealCracker: {
      es: 'Grissini (largos y crujientes, perfectos para envolver jamón prosciutto).',
      en: 'Grissini (long and crisp, made for wrapping prosciutto).',
    },
    winePairing: {
      es: 'Espumoso / Prosecco o Vino Tinto ligero',
      en: 'Sparkling / Prosecco or light Red Wine',
    },
  },
  {
    id: 'miel-chocolate',
    num: '07',
    x: 47,
    y: 56,
    category: {
      es: 'ACOMPAÑAMIENTOS QUE ENRIQUECEN',
      en: 'ACCOMPANIMENTS THAT ELEVATE',
    },
    tastingStep: {
      es: 'Puente de Sabor · Dulce & Crujiente',
      en: 'Flavor Bridge · Sweet & Crunchy',
    },
    name: {
      es: 'Miel, Nueces & Chocolate',
      en: 'Honey, Walnuts & Dark Chocolate',
    },
    profile: {
      es: 'La miel realza el Brie y Cabra; los frutos secos dan textura crujiente; el chocolate equilibra lo salado.',
      en: 'Honey elevates Brie and Goat cheese; walnuts add crunch; chocolate balances savory notes.',
    },
    winningCombo: {
      es: 'Brie + miel + nueces  ·  Gouda + uvas + chocolate',
      en: 'Brie + honey + walnuts  ·  Gouda + grapes + chocolate',
    },
    winningComboDesc: {
      es: 'Eleva la experiencia y crea contrastes memorables.',
      en: 'Elevates the tasting experience with memorable contrasts.',
    },
    idealCracker: {
      es: 'Tostadas artesanales y Crackers Clásicos.',
      en: 'Artisanal Toasts and Classic Crackers.',
    },
    winePairing: {
      es: 'Espumoso / Prosecco o Vino Tinto',
      en: 'Sparkling / Prosecco or Red Wine',
    },
  },
  {
    id: 'uvas-aceitunas',
    num: '08',
    x: 84,
    y: 47,
    category: {
      es: 'ACOMPAÑAMIENTOS QUE ENRIQUECEN',
      en: 'ACCOMPANIMENTS THAT ELEVATE',
    },
    tastingStep: {
      es: 'Frescura para Limpiar el Paladar',
      en: 'Palate-Cleansing Freshness',
    },
    name: {
      es: 'Uvas, Frutas Frescas & Aceitunas',
      en: 'Grapes, Fresh Berries & Olives',
    },
    profile: {
      es: 'Las uvas y fresas aportan frescura y balancean lo salado; las aceitunas dan un toque mediterráneo.',
      en: 'Grapes and strawberries refresh and balance savory notes; olives bring a Mediterranean touch.',
    },
    winningCombo: {
      es: 'Intercala uvas y fresas frescas entre cada queso',
      en: 'Enjoy fresh grapes and berries between cheese courses',
    },
    winningComboDesc: {
      es: 'Refresca el paladar para apreciar cada nuevo ingrediente.',
      en: 'Refreshes the palate so every cheese shines.',
    },
    idealCracker: {
      es: 'Combina con los 4 estilos: Clásicos, Multigrano, Grissini y Tostadas.',
      en: 'Pairs with all 4 styles: Classic, Multigrain, Grissini, and Toasts.',
    },
    winePairing: {
      es: 'Espumoso / Prosecco (aporta frescura y equilibrio a todos los ingredientes)',
      en: 'Sparkling / Prosecco (brings freshness and balance to every bite)',
    },
  },
];

export const PairingGuideSection: React.FC<PairingGuideSectionProps> = ({
  lang,
  onInquirePairing,
}) => {
  const [activeHotspotIdx, setActiveHotspotIdx] = useState(0);
  const [fullGuideModalOpen, setFullGuideModalOpen] = useState(false);
  const [showOriginalFlyer, setShowOriginalFlyer] = useState(false);

  const activeItem = BOARD_HOTSPOTS[activeHotspotIdx] || BOARD_HOTSPOTS[0];

  useEffect(() => {
    if (!fullGuideModalOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setFullGuideModalOpen(false);
        setShowOriginalFlyer(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [fullGuideModalOpen]);

  return (
    <section
      id="pairing-guide"
      aria-label={
        lang === 'en' ? 'Interactive Pairing Guide' : 'Guía de Combinaciones'
      }
      className="relative z-10 py-14 sm:py-24 px-4 sm:px-10 lg:px-16 border-t border-[#841F17]/15"
    >
      <div className="max-w-[1440px] mx-auto space-y-6 sm:space-y-12">
        {/* Compact Editorial Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-3 sm:gap-6">
          <div className="space-y-1.5 max-w-2xl">
            <p className="font-serif italic text-base sm:text-xl text-[#841F17]">
              {lang === 'en'
                ? 'Interactive Sommelier & Tasting Guide'
                : 'El Ritual de la Mesa · Guía Interactiva'}
            </p>
            <h2 className="font-serif font-normal text-3xl sm:text-5xl lg:text-6xl text-[#841F17] leading-[1.04]">
              {lang === 'en' ? (
                <>
                  How to enjoy your{' '}
                  <span className="italic text-[#63150F]">
                    charcuterie board.
                  </span>
                </>
              ) : (
                <>
                  Guía de{' '}
                  <span className="italic text-[#63150F]">combinaciones.</span>
                </>
              )}
            </h2>
          </div>

          <div className="flex flex-wrap items-center justify-between lg:justify-end gap-3 max-w-md">
            <p className="text-xs sm:text-sm text-[#4A120E]/85 leading-relaxed">
              {lang === 'en'
                ? 'Touch any point on the board to see its winning combination and wine pairing.'
                : 'Toca cualquier punto en la tabla para ver su combinación ganadora y maridaje.'}
            </p>
            <button
              type="button"
              onClick={() => {
                setShowOriginalFlyer(false);
                setFullGuideModalOpen(true);
              }}
              className="inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.16em] uppercase text-[#841F17] hover:text-[#5A120D] underline underline-offset-4 transition-colors"
            >
              <BookOpen className="w-3.5 h-3.5" />
              {lang === 'en' ? 'FULL GUIDE →' : 'VER GUÍA COMPLETA →'}
            </button>
          </div>
        </div>

        {/* Compact Bento Grid Layout (Eliminates vertical elongation on mobile) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-stretch">
          {/* Bento Tile 1 (Left 5 cols): Overhead Interactive Board + Horizontal Pill Strip */}
          <div className="lg:col-span-5 rounded-[6px] bg-[#FAF6EC]/70 border border-[#841F17]/20 p-3.5 sm:p-6 flex flex-col justify-between items-center shadow-[0_10px_28px_rgba(84,24,16,0.06)]">
            <div className="relative w-full max-w-[290px] sm:max-w-[420px] aspect-square flex items-center justify-center my-auto">
              {/* Warm Studio Backlight */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute w-[88%] h-[88%] rounded-full blur-[50px] opacity-85"
                style={{
                  background:
                    'radial-gradient(circle, rgba(250, 245, 232, 0.9) 0%, rgba(240, 224, 178, 0.45) 55%, transparent 78%)',
                }}
              />

              {/* Clean Cutout Circular Board */}
              <img
                src="./images/promo/tabla-interactiva.webp"
                alt={
                  lang === 'en'
                    ? 'Interactive overhead charcuterie board'
                    : 'Tabla de charcutería interactiva'
                }
                loading="lazy"
                className="relative z-10 w-full h-full object-contain floating-product-shadow select-none"
              />

              {/* Interactive Hotspot Pins */}
              {BOARD_HOTSPOTS.map((spot, idx) => {
                const isSelected = idx === activeHotspotIdx;
                return (
                  <button
                    key={spot.id}
                    type="button"
                    onClick={() => setActiveHotspotIdx(idx)}
                    onMouseEnter={() => setActiveHotspotIdx(idx)}
                    aria-label={`${spot.num}: ${spot.name[lang]}`}
                    aria-pressed={isSelected}
                    style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                    className={`absolute z-20 -translate-x-1/2 -translate-y-1/2 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all duration-300 shadow-md focus:outline-none ${
                      isSelected
                        ? 'bg-[#841F17] text-[#FAF5E8] scale-125 ring-3 ring-[#FAF5E8]/95'
                        : 'bg-[#FAF6EC]/95 text-[#841F17] hover:bg-[#841F17] hover:text-[#FAF5E8] border border-[#841F17]/40 hover:scale-110'
                    }`}
                  >
                    <span className="num text-[10px] sm:text-[11px] font-bold tracking-tight">
                      {spot.num}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Compact Single-Row Horizontal Scroll Selector on Mobile / Wrap on Desktop */}
            <div className="w-full pt-3 mt-2 border-t border-[#841F17]/12 flex items-center gap-1.5 overflow-x-auto sm:flex-wrap sm:justify-center pb-1">
              {BOARD_HOTSPOTS.map((spot, idx) => {
                const isSelected = idx === activeHotspotIdx;
                return (
                  <button
                    key={spot.id}
                    type="button"
                    onClick={() => setActiveHotspotIdx(idx)}
                    aria-pressed={isSelected}
                    className={`shrink-0 px-2.5 py-1 rounded-[3px] text-[10px] sm:text-[11px] font-medium transition-all border ${
                      isSelected
                        ? 'bg-[#841F17] text-[#FAF5E8] border-[#841F17] shadow-sm'
                        : 'bg-white/80 text-[#4A120E] border-[#841F17]/20 hover:border-[#841F17]/60'
                    }`}
                  >
                    <span className="num font-bold mr-1">{spot.num}.</span>
                    {spot.name[lang]}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right 7 Cols: 2-Column Bento Subgrid (Compact on Mobile & Desktop) */}
          <div className="lg:col-span-7 grid grid-cols-2 gap-2.5 sm:gap-4 content-between">
            {/* Bento Cell A (col-span-2): Active Ingredient + Winning Combination */}
            <div className="col-span-2 rounded-[6px] border border-[#841F17]/25 bg-[#FAF6EC] p-4 sm:p-6 shadow-[0_12px_32px_rgba(84,24,16,0.08)] space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#841F17]/12 pb-2">
                <span className="text-[9px] sm:text-[10px] font-bold tracking-[0.22em] uppercase text-[#841F17]">
                  {activeItem.category[lang]}
                </span>
                <span className="font-serif italic text-xs sm:text-sm text-[#63150F]">
                  {activeItem.tastingStep[lang]}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-4 items-center">
                <div className="sm:col-span-6 space-y-1">
                  <div className="flex items-baseline gap-2">
                    <span className="num text-[11px] font-bold text-[#841F17]/70">
                      Nº {activeItem.num}
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl text-[#841F17] leading-tight">
                      {activeItem.name[lang]}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-[#4A120E]/90 leading-relaxed">
                    {activeItem.profile[lang]}
                  </p>
                </div>

                {/* Winning Combination Sub-Bento Box */}
                <div className="sm:col-span-6 p-3 sm:p-4 rounded-[4px] bg-[#E7D095]/40 border border-[#841F17]/20 space-y-0.5">
                  <p className="text-[9px] sm:text-[10px] font-bold tracking-[0.2em] uppercase text-[#841F17] flex items-center gap-1">
                    <Sparkles className="w-3 h-3 shrink-0" />
                    {lang === 'en' ? 'WINNING COMBO' : 'COMBINACIÓN GANADORA'}
                  </p>
                  <p className="font-serif text-base sm:text-xl text-[#4A120E] font-semibold leading-snug">
                    {activeItem.winningCombo[lang]}
                  </p>
                  <p className="font-serif italic text-xs text-[#63150F]">
                    {activeItem.winningComboDesc[lang]}
                  </p>
                </div>
              </div>
            </div>

            {/* Bento Cell B (col-span-1 even on mobile!): Ideal Cracker */}
            <div className="col-span-1 rounded-[6px] bg-[#FAF6EC]/85 border border-[#841F17]/20 p-3.5 sm:p-5 flex flex-col justify-between space-y-1.5">
              <p className="text-[9px] sm:text-[10px] font-bold tracking-[0.2em] uppercase text-[#841F17]">
                {lang === 'en' ? 'IDEAL CRACKER' : 'CRACKER IDEAL'}
              </p>
              <p className="text-xs sm:text-sm text-[#4A120E]/90 leading-snug">
                {activeItem.idealCracker[lang]}
              </p>
            </div>

            {/* Bento Cell C (col-span-1 even on mobile!): Suggested Wine */}
            <div className="col-span-1 rounded-[6px] bg-[#FAF6EC]/85 border border-[#841F17]/20 p-3.5 sm:p-5 flex flex-col justify-between space-y-1.5">
              <p className="text-[9px] sm:text-[10px] font-bold tracking-[0.2em] uppercase text-[#841F17] flex items-center gap-1">
                <Wine className="w-3.5 h-3.5 shrink-0" />
                {lang === 'en' ? 'SUGGESTED WINE' : 'MARIDAJE SUGERIDO'}
              </p>
              <p className="text-xs sm:text-sm text-[#4A120E]/90 leading-snug">
                {activeItem.winePairing[lang]}
              </p>
            </div>

            {/* Bento Cell D (col-span-2): Compact 3-Column Tasting Order + Action Bar */}
            <div className="col-span-2 rounded-[6px] bg-[#4A100B] text-[#FAF5E8] p-4 sm:p-5 border border-[#E7D095]/25 space-y-3">
              <div className="flex items-center justify-between gap-2">
                <h4 className="font-serif text-base sm:text-lg text-[#E7D095]">
                  {lang === 'en'
                    ? 'Ideal Order of Tasting'
                    : 'Orden Ideal de Degustación'}
                </h4>
                <span className="font-serif italic text-xs text-[#FAF5E8]/75">
                  {lang === 'en' ? '1 → 2 → 3' : 'De suave a intenso'}
                </span>
              </div>

              {/* 3 Horizontal Columns even on mobile */}
              <div className="grid grid-cols-3 gap-2 sm:gap-4 text-[11px] sm:text-xs">
                <div className="p-2 sm:p-2.5 rounded-[4px] bg-[#FAF5E8]/10 border border-[#E7D095]/15">
                  <p className="font-serif italic text-xs sm:text-sm text-[#E7D095] font-semibold">
                    I. {lang === 'en' ? 'Mild' : 'Suaves'}
                  </p>
                  <p className="text-[#FAF5E8]/85 leading-tight mt-0.5">
                    Brie, Gouda
                  </p>
                </div>

                <div className="p-2 sm:p-2.5 rounded-[4px] bg-[#FAF5E8]/10 border border-[#E7D095]/15">
                  <p className="font-serif italic text-xs sm:text-sm text-[#E7D095] font-semibold">
                    II. {lang === 'en' ? 'Medium' : 'Medios'}
                  </p>
                  <p className="text-[#FAF5E8]/85 leading-tight mt-0.5">
                    Cheddar, Cabra
                  </p>
                </div>

                <div className="p-2 sm:p-2.5 rounded-[4px] bg-[#FAF5E8]/10 border border-[#E7D095]/15">
                  <p className="font-serif italic text-xs sm:text-sm text-[#E7D095] font-semibold">
                    III. {lang === 'en' ? 'Bold' : 'Intensos'}
                  </p>
                  <p className="text-[#FAF5E8]/85 leading-tight mt-0.5">
                    Manchego, Salami
                  </p>
                </div>
              </div>

              <div className="pt-1 flex flex-wrap items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowOriginalFlyer(false);
                    setFullGuideModalOpen(true);
                  }}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-[3px] bg-[#E7D095] hover:bg-[#FAF5E8] text-[#4A100B] text-[10px] sm:text-[11px] font-bold tracking-[0.16em] uppercase transition-colors"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  {lang === 'en'
                    ? 'COMPLETE GUIDE & WINES'
                    : 'GUÍA COMPLETA Y VINOS'}
                </button>

                <button
                  type="button"
                  onClick={() =>
                    onInquirePairing(
                      lang === 'en'
                        ? 'Signature Charcuterie Board'
                        : 'Tabla de Charcutería Artesanal'
                    )
                  }
                  className="text-[10px] sm:text-[11px] font-semibold tracking-[0.16em] uppercase text-[#E7D095] hover:text-white underline underline-offset-4"
                >
                  {lang === 'en' ? 'Order a Board →' : 'Pedir una Tabla →'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FULL PAIRING GUIDE MODAL (Editorial Sommelier Sheet + Original Illustrated Card Toggle) */}
      {fullGuideModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={
            lang === 'en'
              ? 'Complete Charcuterie Pairing Guide'
              : 'Guía Completa de Combinaciones'
          }
          className="fixed inset-0 z-50 bg-[#230604]/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
          onClick={() => setFullGuideModalOpen(false)}
        >
          <div
            className="relative max-w-5xl w-full max-h-[92vh] rounded-[4px] bg-[#FAF6EC] border border-[#841F17]/35 shadow-2xl flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-6 sm:px-8 py-4 bg-[#E7D095]/55 border-b border-[#841F17]/20 flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-[10px] font-bold tracking-[0.24em] uppercase text-[#841F17]">
                  ELY’S CHARCUTERIE · LOUISVILLE, KY
                </p>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#4A120E]">
                  {lang === 'en'
                    ? 'Complete Pairing & Tasting Guide'
                    : 'Guía de Combinaciones y Maridaje'}
                </h3>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setShowOriginalFlyer((prev) => !prev)}
                  className="px-4 py-2 rounded-[3px] border border-[#841F17]/40 bg-[#FAF6EC] hover:bg-[#841F17] text-[#841F17] hover:text-[#FAF5E8] text-[11px] font-semibold tracking-[0.16em] uppercase transition-colors"
                >
                  {showOriginalFlyer
                    ? lang === 'en'
                      ? 'Read Text Guide'
                      : 'Ver Modo Lectura'
                    : lang === 'en'
                    ? 'View Illustrated Card'
                    : 'Ver Lámina Ilustrada'}
                </button>

                <button
                  type="button"
                  onClick={() => setFullGuideModalOpen(false)}
                  aria-label="Cerrar"
                  className="p-2 text-[#841F17] hover:bg-[#841F17]/10 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-8">
              {showOriginalFlyer ? (
                <div className="flex flex-col items-center space-y-4">
                  <img
                    src="./images/promo/guia-combinaciones-poster.webp"
                    alt="Guía de Combinaciones Ely's Charcuterie"
                    className="max-w-full max-h-[75vh] w-auto object-contain rounded-[4px] shadow-lg border border-[#841F17]/20"
                  />
                </div>
              ) : (
                <>
                  {/* Row 1: Winning Combinations & Suggested Wine Pairings */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Winning Combinations */}
                    <div className="p-6 rounded-[4px] bg-white/80 border border-[#841F17]/20 space-y-4">
                      <h4 className="font-serif text-2xl text-[#841F17] border-b border-[#841F17]/15 pb-2">
                        {lang === 'en'
                          ? 'Winning Combinations'
                          : 'Combinaciones Ganadoras'}
                      </h4>
                      <ul className="space-y-3 text-sm">
                        <li className="flex items-start gap-2.5">
                          <Check className="w-4 h-4 text-[#841F17] shrink-0 mt-0.5" />
                          <div>
                            <p className="font-semibold text-[#4A120E]">
                              Brie + miel + nueces
                            </p>
                            <p className="text-xs text-[#5A120D]/80">
                              Cremoso, dulce y crujiente.
                            </p>
                          </div>
                        </li>
                        <li className="flex items-start gap-2.5">
                          <Check className="w-4 h-4 text-[#841F17] shrink-0 mt-0.5" />
                          <div>
                            <p className="font-semibold text-[#4A120E]">
                              Cheddar + salami italiano + cracker
                            </p>
                            <p className="text-xs text-[#5A120D]/80">
                              Intenso, equilibrado y delicioso.
                            </p>
                          </div>
                        </li>
                        <li className="flex items-start gap-2.5">
                          <Check className="w-4 h-4 text-[#841F17] shrink-0 mt-0.5" />
                          <div>
                            <p className="font-semibold text-[#4A120E]">
                              Gouda + uvas + chocolate
                            </p>
                            <p className="text-xs text-[#5A120D]/80">
                              Un contraste dulce y sofisticado.
                            </p>
                          </div>
                        </li>
                        <li className="flex items-start gap-2.5">
                          <Check className="w-4 h-4 text-[#841F17] shrink-0 mt-0.5" />
                          <div>
                            <p className="font-semibold text-[#4A120E]">
                              Manchego + chorizo + aceituna
                            </p>
                            <p className="text-xs text-[#5A120D]/80">
                              Clásico y lleno de sabor.
                            </p>
                          </div>
                        </li>
                        <li className="flex items-start gap-2.5">
                          <Check className="w-4 h-4 text-[#841F17] shrink-0 mt-0.5" />
                          <div>
                            <p className="font-semibold text-[#4A120E]">
                              Queso de cabra + cherry + cracker
                            </p>
                            <p className="text-xs text-[#5A120D]/80">
                              Fresco, cremoso y con un toque ácido.
                            </p>
                          </div>
                        </li>
                      </ul>
                    </div>

                    {/* Wine Pairing */}
                    <div className="p-6 rounded-[4px] bg-white/80 border border-[#841F17]/20 space-y-4">
                      <h4 className="font-serif text-2xl text-[#841F17] border-b border-[#841F17]/15 pb-2">
                        {lang === 'en'
                          ? 'Suggested Wine Pairing'
                          : 'Maridaje Sugerido'}
                      </h4>
                      <div className="space-y-4 text-sm">
                        <div className="flex items-start gap-3">
                          <Wine className="w-5 h-5 text-[#841F17] shrink-0 mt-0.5" />
                          <div>
                            <p className="font-serif text-lg font-semibold text-[#841F17]">
                              Vino Tinto
                            </p>
                            <p className="text-xs sm:text-sm text-[#4A120E]/85">
                              Ideal para quesos curados (Manchego, Cheddar) y
                              embutidos.
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <Wine className="w-5 h-5 text-[#D4A74A] shrink-0 mt-0.5" />
                          <div>
                            <p className="font-serif text-lg font-semibold text-[#841F17]">
                              Vino Blanco
                            </p>
                            <p className="text-xs sm:text-sm text-[#4A120E]/85">
                              Perfecto para quesos cremosos (Brie, Gouda, Queso
                              de Cabra).
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <Sparkles className="w-5 h-5 text-[#B8862D] shrink-0 mt-0.5" />
                          <div>
                            <p className="font-serif text-lg font-semibold text-[#841F17]">
                              Espumoso / Prosecco
                            </p>
                            <p className="text-xs sm:text-sm text-[#4A120E]/85">
                              Aporta frescura y equilibrio a todos los
                              ingredientes.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Row 2: The 4 Ideal Crackers */}
                  <div className="p-6 rounded-[4px] bg-[#E7D095]/30 border border-[#841F17]/20 space-y-4">
                    <h4 className="font-serif text-2xl text-[#841F17]">
                      {lang === 'en'
                        ? 'The Ideal Crackers'
                        : 'Los Crackers Ideales'}
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs sm:text-sm">
                      <div className="p-3.5 bg-[#FAF6EC] rounded-[3px] border border-[#841F17]/15">
                        <p className="font-serif text-lg font-semibold text-[#841F17]">
                          Clásicos
                        </p>
                        <p className="text-[#4A120E]/85 mt-1">
                          Neutros y versátiles, combinan con todos los quesos.
                        </p>
                      </div>
                      <div className="p-3.5 bg-[#FAF6EC] rounded-[3px] border border-[#841F17]/15">
                        <p className="font-serif text-lg font-semibold text-[#841F17]">
                          Multigrano
                        </p>
                        <p className="text-[#4A120E]/85 mt-1">
                          Aportan textura y un sabor más rústico.
                        </p>
                      </div>
                      <div className="p-3.5 bg-[#FAF6EC] rounded-[3px] border border-[#841F17]/15">
                        <p className="font-serif text-lg font-semibold text-[#841F17]">
                          Grissini
                        </p>
                        <p className="text-[#4A120E]/85 mt-1">
                          Largos y crujientes. Perfectos para envolver jamón
                          prosciutto.
                        </p>
                      </div>
                      <div className="p-3.5 bg-[#FAF6EC] rounded-[3px] border border-[#841F17]/15">
                        <p className="font-serif text-lg font-semibold text-[#841F17]">
                          Tostadas artesanales
                        </p>
                        <p className="text-[#4A120E]/85 mt-1">
                          Ideales para quesos cremosos y untables.
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
