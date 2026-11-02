import React from 'react';
import { Utensils, CalendarCheck, MessageCircle, HeartHandshake } from 'lucide-react';
import { Language } from '../types/catalog';

interface HowToOrderProps {
  lang: Language;
}

export const HowToOrder: React.FC<HowToOrderProps> = ({ lang }) => {
  const steps = [
    {
      number: '01',
      icon: Utensils,
      title:
        lang === 'es'
          ? 'Elige tu Tabla o Propuesta'
          : 'Choose Your Board or Experience',
      description:
        lang === 'es'
          ? 'Explora nuestro catálogo y selecciona la tabla, caja de regalo, vasos individuales o mesa para eventos según el número de tus invitados.'
          : 'Browse our catalog and select the board, gift box, grazing cups, or event setup that fits your guest count.',
    },
    {
      number: '02',
      icon: CalendarCheck,
      title:
        lang === 'es'
          ? 'Indícanos Fecha y Detalles'
          : 'Share Your Date & Preferences',
      description:
        lang === 'es'
          ? 'Cuéntanos para qué fecha en Louisville la necesitas, si deseas incluir una nota de dedicatoria o si tienes alguna preferencia de ingredientes.'
          : 'Let us know your desired date in Louisville, any gift card message, or dietary preferences you would like us to accommodate.',
    },
    {
      number: '03',
      icon: MessageCircle,
      title:
        lang === 'es'
          ? 'Confirma Directo por WhatsApp'
          : 'Confirm Easily via WhatsApp',
      description:
        lang === 'es'
          ? 'Envíanos tu selección con un clic por WhatsApp o mediante el formulario. Te responderemos personalmente para confirmar disponibilidad y pago.'
          : 'Send your selection with one click via WhatsApp or our quote form. We will reply personally to confirm availability and payment details.',
    },
    {
      number: '04',
      icon: HeartHandshake,
      title:
        lang === 'es'
          ? 'Recibe, Comparte y Disfruta'
          : 'Receive, Gather & Enjoy',
      description:
        lang === 'es'
          ? 'Preparamos tu pedido fresca el mismo día. Coordinamos la entrega o recogida en Louisville, o realizamos el montaje completo en tu evento.'
          : 'We craft your order fresh the same day. Coordinate pickup or delivery in Louisville, or let us style the full grazing table at your venue.',
    },
  ];

  return (
    <section
      id="como-ordenar"
      className="py-20 lg:py-24 bg-cream-100/70 border-y border-gold-300/40"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <span className="text-xs uppercase tracking-[0.2em] text-gold-600 font-semibold">
            {lang === 'es' ? 'Proceso Sencillo & Cercano' : 'Simple & Personal Process'}
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-semibold text-noir-900">
            {lang === 'es' ? '¿Cómo Ordenar tu Pedido?' : 'How to Place Your Order'}
          </h2>
          <p className="text-noir-600 text-base sm:text-lg">
            {lang === 'es'
              ? 'Queremos que hacer tu pedido sea tan cálido y agradable como disfrutarlo alrededor de la mesa. Recomendamos reservar tablas con 48 horas de anticipación y eventos con al menos 1 a 2 semanas.'
              : 'We want ordering to feel as warm and effortless as sharing around the table. We recommend booking boards 48 hours in advance and events at least 1–2 weeks ahead.'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="relative bg-cream-50 p-7 rounded-3xl border border-gold-300/60 shadow-soft flex flex-col justify-between group hover:border-gold-500 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-serif text-4xl font-semibold text-gold-500/80">
                      {step.number}
                    </span>
                    <div className="w-11 h-11 rounded-2xl bg-cream-200/80 border border-gold-400/40 flex items-center justify-center group-hover:bg-noir-900 group-hover:text-gold-200 transition-colors">
                      <Icon className="w-5 h-5 text-gold-600 group-hover:text-gold-200 transition-colors" />
                    </div>
                  </div>
                  <h3 className="font-serif text-2xl font-semibold text-noir-900 mb-2.5">
                    {step.title}
                  </h3>
                  <p className="text-sm text-noir-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-gold-200/60 flex items-center justify-between text-[11px] uppercase tracking-[0.16em] text-gold-600 font-semibold">
                  <span>Ely’s Charcuterie</span>
                  <span>Louisville, KY</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
