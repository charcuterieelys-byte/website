import React from 'react';
import { Heart, Sparkles, Users, MapPin } from 'lucide-react';
import { Language } from '../types/catalog';
import { FOUNDER_STORY } from '../data/catalog';

interface AboutElianneProps {
  lang: Language;
}

export const AboutElianne: React.FC<AboutElianneProps> = ({ lang }) => {
  const copy = FOUNDER_STORY[lang];

  const pillars = [
    {
      icon: Heart,
      title: lang === 'es' ? 'Cariño en Cada Detalle' : 'Care in Every Detail',
      desc:
        lang === 'es'
          ? 'Cada rosa de jamón, corte de queso y toque floral se prepara a mano con ilusión y dedicación.'
          : 'Every charcuterie rose, cheese cut, and herbal accent is handcrafted with passion and care.',
    },
    {
      icon: Sparkles,
      title: lang === 'es' ? 'Estética Cálida & Elegante' : 'Warm & Elegant Styling',
      desc:
        lang === 'es'
          ? 'Presentaciones limpias, delicadas y abundantes que embellecen cualquier celebración.'
          : 'Refined, abundant arrangements designed to elevate any celebration or intimate gathering.',
    },
    {
      icon: Users,
      title: lang === 'es' ? 'Reunir Alrededor de la Mesa' : 'Gathering Around the Table',
      desc:
        lang === 'es'
          ? 'Propuestas pensadas para conversar, brindar, compartir y crear recuerdos inolvidables.'
          : 'Created to spark conversation, toasts, and unforgettable memories with the people you love.',
    },
  ];

  return (
    <section id="historia" className="py-20 lg:py-28 bg-cream-100/60 border-y border-gold-300/35">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left Column: Editorial Portrait & Brand Emblem */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md">
              {/* Soft Gold Offset Border */}
              <div className="absolute -inset-3 rounded-3xl border border-gold-400/50 translate-x-3 translate-y-3 pointer-events-none" />

              <div className="relative rounded-3xl overflow-hidden bg-cream-200 border border-gold-300/60 shadow-luxury aspect-[4/5]">
                <img
                  src="images/elianne_story_atelier.jpg"
                  alt="Elianne Lafuente — Fundadora de Ely's Charcuterie en Louisville, Kentucky"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-noir-950/60 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 text-cream-50">
                  <p className="text-[11px] uppercase tracking-[0.22em] text-gold-200 font-medium">
                    {lang === 'es' ? 'Fundadora & Creadora' : 'Founder & Creator'}
                  </p>
                  <p className="font-serif text-2xl font-semibold">Elianne Lafuente</p>
                  <p className="text-xs text-cream-200 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-gold-300" />
                    <span>Louisville, Kentucky</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Elianne's Story */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-gold-600 font-semibold">
              <span className="w-8 h-[1px] bg-gold-500" />
              <span>{copy.eyebrow}</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-noir-900 leading-tight">
              {copy.title}
            </h2>

            {/* Delicate Quote Box */}
            <blockquote className="p-5 sm:p-6 rounded-2xl bg-cream-50 border-l-4 border-gold-400 shadow-soft">
              <p className="font-serif italic text-xl sm:text-2xl text-noir-800 leading-relaxed">
                {copy.quote}
              </p>
            </blockquote>

            <div className="space-y-4 text-noir-700 text-base sm:text-lg leading-relaxed">
              <p>{copy.paragraph1}</p>
              <p>{copy.paragraph2}</p>
            </div>

            {/* Signature Line */}
            <div className="pt-2 flex items-center justify-between flex-wrap gap-4 border-t border-gold-300/45">
              <div>
                <p className="font-serif italic text-2xl text-noir-900">
                  Elianne Lafuente
                </p>
                <p className="text-xs uppercase tracking-[0.18em] text-gold-600 font-medium">
                  {copy.locationTag}
                </p>
              </div>
              <img
                src="brand/logo-horizontal-rojo.svg"
                alt="Ely's Charcuterie Firma"
                className="h-10 w-auto object-contain opacity-90"
              />
            </div>

            {/* 3 Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              {pillars.map((pillar, idx) => {
                const Icon = pillar.icon;
                return (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-cream-50 border border-gold-300/45 shadow-soft"
                  >
                    <div className="w-9 h-9 rounded-full bg-cream-200 border border-gold-400/40 flex items-center justify-center mb-3">
                      <Icon className="w-4 h-4 text-gold-600" />
                    </div>
                    <h3 className="font-serif text-lg font-semibold text-noir-900 mb-1">
                      {pillar.title}
                    </h3>
                    <p className="text-xs text-noir-600 leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
