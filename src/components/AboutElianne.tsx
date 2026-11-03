import React from 'react';
import { MapPin } from 'lucide-react';
import { Language } from '../types/catalog';
import { FOUNDER_STORY } from '../data/catalog';

interface AboutElianneProps {
  lang: Language;
}

export const AboutElianne: React.FC<AboutElianneProps> = ({ lang }) => {
  const copy = FOUNDER_STORY[lang];

  return (
    <section id="historia" className="py-20 lg:py-28 bg-cream-100/60 border-b border-gold-300/45">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-5">
            <figure className="mx-auto max-w-md rounded-2xl p-3.5 bg-cream-50 border border-gold-400/60 shadow-soft">
              <div className="rounded-xl overflow-hidden aspect-[4/5] bg-cream-200">
                <img
                  src="images/elianne_story_atelier.jpg"
                  alt="Elianne Lafuente preparando una tabla en Ely’s Charcuterie"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
              </div>
              <figcaption className="pt-3.5 px-2 flex items-center justify-between text-xs text-noir-700">
                <span className="font-semibold text-noir-900">Elianne Lafuente</span>
                <span className="inline-flex items-center gap-1 whitespace-nowrap">
                  <MapPin className="w-3.5 h-3.5 text-gold-600 shrink-0" />
                  <span>Louisville, Kentucky</span>
                </span>
              </figcaption>
            </figure>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <h2 className="font-serif text-4xl sm:text-5xl font-semibold text-noir-900 leading-tight max-w-none">
              {copy.title}
            </h2>

            <blockquote className="p-6 rounded-2xl bg-cream-50 border-l-2 border-gold-500">
              <p className="font-serif italic text-xl sm:text-2xl text-noir-800 leading-relaxed">
                {copy.quote}
              </p>
            </blockquote>

            <div className="space-y-4 text-noir-700 text-base sm:text-lg leading-relaxed">
              <p>{copy.paragraph1}</p>
              <p>{copy.paragraph2}</p>
            </div>

            <div className="pt-5 flex items-center justify-between flex-wrap gap-4 border-t border-gold-300/50">
              <div>
                <p className="font-serif text-2xl font-semibold text-noir-900">
                  Elianne Lafuente
                </p>
                <p className="text-sm text-noir-600 mt-0.5">
                  {copy.locationTag}
                </p>
              </div>
              <img
                src="brand/logo-horizontal-rojo.svg"
                alt="Ely’s Charcuterie Firma"
                className="h-10 w-auto object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
