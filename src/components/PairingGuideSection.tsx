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
      className="relative z-10 py-24 sm:py-32 px-6 sm:px-10 lg:px-16 border-t border-[#841F17]/15"
    >
      <div className="max-w-[1440px] mx-auto space-y-12 sm:space-y-16">
        {/* Editorial Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-2.5 max-w-2xl">
            <p className="font-serif italic text-lg sm:text-xl text-[#841F17]">
              {lang === 'en'
                ? 'Interactive Sommelier & Tasting Guide'
                : 'El Ritual de la Mesa · Guía Interactiva'}
            </p>
            <h2 className="font-serif font-normal text-4xl sm:text-5xl lg:text-6xl text-[#841F17] leading-[1.04]">
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

          <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end justify-between gap-3 max-w-md">
            <p className="text-sm sm:text-base text-[#4A120E]/85 leading-relaxed">
              {lang === 'en'
                ? 'Touch any point on the board to discover its flavor profile, winning combination, ideal cracker, and suggested wine pairing.'
                : 'Toca cualquier punto sobre la tabla para descubrir su perfil de sabor, combinación ganadora, cracker ideal y maridaje de vino.'}
            </p>
            <button
              type="button"
              onClick={() => {
                setShowOriginalFlyer(false);
                setFullGuideModalOpen(true);
              }}
              className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.18em] uppercase text-[#841F17] hover:text-[#5A120D] underline underline-offset-4 transition-colors"
            >
              <BookOpen className="w-4 h-4" />
              {lang === 'en'
                ? 'OPEN COMPLETE PAIRING GUIDE →'
                : 'VER GUÍA COMPLETA Y MARIDAJES →'}
            </button>
          </div>
        </div>

        {/* Main Interactive Stage: Overhead Board with Hotspots + Active Sommelier Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left: Overhead Board with Interactive Pins */}
          <div className="lg:col-span-6 flex flex-col items-center">
            <div className="relative w-full max-w-[540px] aspect-square flex items-center justify-center">
              {/* Warm Studio Backlight */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute w-[88%] h-[88%] rounded-full blur-[70px] opacity-85"
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
                    className={`absolute z-20 -translate-x-1/2 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg focus:outline-none ${
                      isSelected
                        ? 'bg-[#841F17] text-[#FAF5E8] scale-125 ring-4 ring-[#FAF5E8]/90'
                        : 'bg-[#FAF6EC]/95 text-[#841F17] hover:bg-[#841F17] hover:text-[#FAF5E8] border border-[#841F17]/40 hover:scale-110'
                    }`}
                  >
                    <span className="num text-[11px] font-bold tracking-tight">
                      {spot.num}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Quick Ingredient Selector Pills Below Board */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2 max-w-xl">
              {BOARD_HOTSPOTS.map((spot, idx) => {
                const isSelected = idx === activeHotspotIdx;
                return (
                  <button
                    key={spot.id}
                    type="button"
                    onClick={() => setActiveHotspotIdx(idx)}
                    aria-pressed={isSelected}
                    className={`px-3 py-1.5 rounded-[3px] text-[11px] font-medium transition-all border ${
                      isSelected
                        ? 'bg-[#841F17] text-[#FAF5E8] border-[#841F17] shadow-sm'
                        : 'bg-[#FAF6EC]/75 text-[#4A120E] border-[#841F17]/20 hover:border-[#841F17]/60'
                    }`}
                  >
                    <span className="num font-bold mr-1.5">{spot.num}.</span>
                    {spot.name[lang]}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: Sommelier Tasting Card + 3-Step Order of Tasting */}
          <div className="lg:col-span-6 space-y-6">
            {/* Active Ingredient Tasting Note Card */}
            <div className="rounded-[4px] border border-[#841F17]/30 bg-[#FAF6EC] p-2 sm:p-2.5 shadow-[0_18px_48px_rgba(84,24,16,0.10)]">
              <div className="rounded-[2px] border border-[#841F17]/15 p-6 sm:p-8 space-y-5">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#841F17]/15 pb-3">
                  <span className="text-[10px] font-bold tracking-[0.24em] uppercase text-[#841F17]">
                    {activeItem.category[lang]}
                  </span>
                  <span className="font-serif italic text-sm text-[#63150F]">
                    {activeItem.tastingStep[lang]}
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="flex items-baseline gap-3">
                    <span className="num text-xs font-bold tracking-[0.2em] text-[#841F17]/70">
                      Nº {activeItem.num}
                    </span>
                    <h3 className="font-serif text-3xl sm:text-4xl text-[#841F17]">
                      {activeItem.name[lang]}
                    </h3>
                  </div>
                  <p className="text-sm sm:text-base text-[#4A120E]/90 leading-relaxed">
                    {activeItem.profile[lang]}
                  </p>
                </div>

                {/* Winning Combination Box */}
                <div className="p-4 rounded-[3px] bg-[#E7D095]/35 border border-[#841F17]/20 space-y-1">
                  <p className="text-[10px] font-bold tracking-[0.22em] uppercase text-[#841F17] flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    {lang === 'en'
                      ? 'WINNING COMBINATION'
                      : 'COMBINACIÓN GANADORA'}
                  </p>
                  <p className="font-serif text-xl sm:text-2xl text-[#4A120E] font-medium">
                    {activeItem.winningCombo[lang]}
                  </p>
                  <p className="font-serif italic text-sm text-[#63150F]">
                    {activeItem.winningComboDesc[lang]}
                  </p>
                </div>

                {/* Cracker & Wine Pairing Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                  <div className="p-3.5 rounded-[3px] bg-white/70 border border-[#841F17]/15 space-y-1">
                    <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#841F17]">
                      {lang === 'en' ? 'IDEAL CRACKER' : 'CRACKER IDEAL'}
                    </p>
                    <p className="text-xs sm:text-sm text-[#4A120E]/90 leading-relaxed">
                      {activeItem.idealCracker[lang]}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-[3px] bg-white/70 border border-[#841F17]/15 space-y-1">
                    <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#841F17] flex items-center gap-1.5">
                      <Wine className="w-3.5 h-3.5" />
                      {lang === 'en' ? 'SUGGESTED WINE' : 'MARIDAJE SUGERIDO'}
                    </p>
                    <p className="text-xs sm:text-sm text-[#4A120E]/90 leading-relaxed">
                      {activeItem.winePairing[lang]}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Summary Strip: Ideal Order of Tasting (1 -> 2 -> 3) */}
            <div className="rounded-[4px] bg-[#FAF6EC]/75 border border-[#841F17]/20 p-5 sm:p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-serif text-xl text-[#841F17]">
                  {lang === 'en'
                    ? 'Ideal Order of Tasting'
                    : 'Orden Ideal de Degustación'}
                </h4>
                <span className="font-serif italic text-xs sm:text-sm text-[#63150F]">
                  {lang === 'en' ? 'From mild to bold' : 'De suave a intenso'}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div className="space-y-1">
                  <p className="font-serif italic text-base text-[#841F17] font-semibold">
                    I. {lang === 'en' ? 'Mild Flavors' : 'Sabores Suaves'}
                  </p>
                  <p className="text-[#4A120E]/85 leading-relaxed">
                    {lang === 'en'
                      ? 'Start with creamy Brie and smooth Gouda.'
                      : 'Comienza con sabores suaves (Brie, Gouda).'}
                  </p>
                </div>

                <div className="space-y-1">
                  <p className="font-serif italic text-base text-[#841F17] font-semibold">
                    II. {lang === 'en' ? 'Medium Flavors' : 'Sabores Medios'}
                  </p>
                  <p className="text-[#4A120E]/85 leading-relaxed">
                    {lang === 'en'
                      ? 'Continue with Cheddar and tangy Goat Cheese.'
                      : 'Continúa con sabores medios (Cheddar, Queso de Cabra).'}
                  </p>
                </div>

                <div className="space-y-1">
                  <p className="font-serif italic text-base text-[#841F17] font-semibold">
                    III. {lang === 'en' ? 'Bold Flavors' : 'Sabores Intensos'}
                  </p>
                  <p className="text-[#4A120E]/85 leading-relaxed">
                    {lang === 'en'
                      ? 'Finish with Manchego, salami, prosciutto & chorizo.'
                      : 'Finaliza con Manchego, salami, prosciutto y chorizo.'}
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-[#841F17]/15 flex flex-wrap items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowOriginalFlyer(false);
                    setFullGuideModalOpen(true);
                  }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[3px] bg-[#841F17] hover:bg-[#63150F] text-[#FAF5E8] text-[11px] font-semibold tracking-[0.2em] uppercase transition-colors"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  {lang === 'en'
                    ? 'VIEW FULL GUIDE & WINE PAIRINGS'
                    : 'VER GUÍA COMPLETA Y MARIDAJES'}
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
                  className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[#841F17] hover:text-[#5A120D] underline underline-offset-4"
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
