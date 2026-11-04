import React, { useEffect, useRef } from 'react';
import { Sparkles } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Language } from '../types/catalog';

gsap.registerPlugin(ScrollTrigger);

interface HowToOrderProps {
  lang: Language;
}

export const HowToOrder: React.FC<HowToOrderProps> = ({ lang }) => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.step-card',
        { y: 36, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 78%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const steps = [
    {
      number: '01',
      title:
        lang === 'es'
          ? 'Elige tu propuesta'
          : 'Select your creation',
      description:
        lang === 'es'
          ? 'Explora nuestra colección y elige la tabla, caja de regalo, vasos individuales o mesa escenográfica según tus invitados.'
          : 'Browse our collection and choose the board, gift box, grazing cups, or event table that fits your guest count.',
    },
    {
      number: '02',
      title:
        lang === 'es'
          ? 'Personaliza los detalles'
          : 'Personalize details',
      description:
        lang === 'es'
          ? 'Indícanos la fecha en Louisville, preferencias de quesos o embutidos y el mensaje para tu tarjeta de dedicatoria.'
          : 'Share your desired date in Louisville, dietary or cheese preferences, and any handwritten gift card note.',
    },
    {
      number: '03',
      title:
        lang === 'es'
          ? 'Confirma con Elianne'
          : 'Confirm with Elianne',
      description:
        lang === 'es'
          ? 'Envía tu selección con un clic por WhatsApp o mediante el formulario. Te atenderemos personalmente para confirmar.'
          : 'Send your selection with one click via WhatsApp or our quote form for personal confirmation and scheduling.',
    },
    {
      number: '04',
      title:
        lang === 'es'
          ? 'Recibe, comparte y celebra'
          : 'Receive, gather & celebrate',
      description:
        lang === 'es'
          ? 'Elaboramos tu pedido fresco el mismo día. Coordinamos entrega en Louisville o realizamos el montaje en tu evento.'
          : 'Crafted fresh the same day. Coordinate local delivery in Louisville or full on-site styling at your venue.',
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="como-ordenar"
      className="py-24 lg:py-32 bg-cream-100/50 border-b border-gold-300/40"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-gold-600">
              <Sparkles className="w-3.5 h-3.5 text-gold-500" />
              <span>
                {lang === 'es'
                  ? 'Experiencia de Pedido Simple & Cercana'
                  : 'Seamless & Personal Ordering'}
              </span>
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-semibold text-noir-900 leading-[1.04] max-w-none">
              {lang === 'es' ? (
                <>
                  ¿Cómo hacer{' '}
                  <span className="italic font-normal text-gold-600">
                    tu pedido?
                  </span>
                </>
              ) : (
                <>
                  How to place{' '}
                  <span className="italic font-normal text-gold-600">
                    your order
                  </span>
                </>
              )}
            </h2>
          </div>
          <p className="text-noir-600 text-sm sm:text-base max-w-md">
            {lang === 'es'
              ? 'Recomendamos reservar tablas con 48 horas de anticipación y mesas de eventos con 1 a 2 semanas en Louisville.'
              : 'We recommend booking boards 48 hours in advance and event tables 1 to 2 weeks ahead in Louisville.'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => (
            <div
              key={step.number}
              className="step-card relative rounded-[28px] p-7 liquid-glass-light flex flex-col justify-between overflow-hidden group hover:-translate-y-1 transition-transform duration-300"
            >
              <div className="flex items-center justify-between mb-8">
                <span className="font-serif text-5xl font-semibold text-gold-500/85 num leading-none">
                  {step.number}
                </span>
                <span className="w-8 h-[1px] bg-gold-400/60 group-hover:w-14 transition-all duration-300" />
              </div>

              <div className="space-y-3">
                <h3 className="font-serif text-2xl font-semibold text-noir-900 leading-snug">
                  {step.title}
                </h3>
                <p className="text-sm text-noir-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
