import React from 'react';
import { Language } from '../types/catalog';

interface HowToOrderProps {
  lang: Language;
}

export const HowToOrder: React.FC<HowToOrderProps> = ({ lang }) => {
  const steps = [
    {
      number: '01',
      title:
        lang === 'es'
          ? 'Elige tu tabla o propuesta'
          : 'Choose your board or experience',
      description:
        lang === 'es'
          ? 'Explora nuestro catálogo y selecciona la tabla, caja de regalo, vasos individuales o mesa para eventos según el número de tus invitados.'
          : 'Browse our catalog and select the board, gift box, grazing cups, or event setup that fits your guest count.',
    },
    {
      number: '02',
      title:
        lang === 'es'
          ? 'Indícanos fecha y detalles'
          : 'Share your date and preferences',
      description:
        lang === 'es'
          ? 'Cuéntanos para qué fecha en Louisville la necesitas, si deseas incluir una nota de dedicatoria o si tienes alguna preferencia de ingredientes.'
          : 'Let us know your desired date in Louisville, any gift card message, or dietary preferences you would like us to accommodate.',
    },
    {
      number: '03',
      title:
        lang === 'es'
          ? 'Confirma directo por WhatsApp'
          : 'Confirm easily via WhatsApp',
      description:
        lang === 'es'
          ? 'Envíanos tu selección con un clic por WhatsApp o mediante el formulario. Te responderemos personalmente para confirmar disponibilidad y pago.'
          : 'Send your selection with one click via WhatsApp or our quote form. We will reply personally to confirm availability and payment details.',
    },
    {
      number: '04',
      title:
        lang === 'es'
          ? 'Recibe, comparte y disfruta'
          : 'Receive, gather, and enjoy',
      description:
        lang === 'es'
          ? 'Preparamos tu pedido fresco el mismo día. Coordinamos la entrega o recogida en Louisville, o realizamos el montaje completo en tu evento.'
          : 'We craft your order fresh the same day. Coordinate pickup or delivery in Louisville, or let us style the full grazing table at your venue.',
    },
  ];

  return (
    <section
      id="como-ordenar"
      className="py-20 lg:py-24 bg-cream-100/70 border-b border-gold-300/45"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-3 mb-12">
          <h2 className="font-serif text-3xl sm:text-5xl font-semibold text-noir-900">
            {lang === 'es' ? '¿Cómo ordenar tu pedido?' : 'How to place your order'}
          </h2>
          <p className="text-noir-600 text-base sm:text-lg">
            {lang === 'es'
              ? 'Recomendamos reservar tablas con 48 horas de anticipación y mesas de eventos con al menos 1 a 2 semanas en Louisville.'
              : 'We recommend booking boards 48 hours in advance and event tables at least 1 to 2 weeks ahead in Louisville.'}
          </p>
        </div>

        <div className="border-t border-noir-900 divide-y divide-gold-300/60">
          {steps.map((step) => (
            <div
              key={step.number}
              className="py-6 sm:py-8 grid grid-cols-1 md:grid-cols-12 gap-4 items-baseline"
            >
              <div className="md:col-span-2">
                <span className="font-serif text-3xl font-semibold text-gold-600 num">
                  {step.number}
                </span>
              </div>
              <div className="md:col-span-4">
                <h3 className="font-serif text-2xl font-semibold text-noir-900">
                  {step.title}
                </h3>
              </div>
              <div className="md:col-span-6">
                <p className="text-sm sm:text-base text-noir-700 leading-relaxed">
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
