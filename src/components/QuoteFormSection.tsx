import React, { useState } from 'react';
import {
  MessageCircle,
  Instagram,
  Send,
  MapPin,
  CheckCircle2,
  Mail,
  Sparkles,
  ArrowUpRight,
} from 'lucide-react';
import { Language } from '../types/catalog';
import { BRAND_CONFIG } from '../data/catalog';

interface QuoteFormSectionProps {
  lang: Language;
}

export const QuoteFormSection: React.FC<QuoteFormSectionProps> = ({ lang }) => {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    eventDate: '',
    guestCount: '10 a 25 personas',
    serviceType: 'Tabla Artesanal de Charcutería',
    location: 'Louisville, KY',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const buildWhatsAppQuoteUrl = () => {
    const text =
      lang === 'es'
        ? `Hola Elianne, me gustaría solicitar una cotización con *Ely’s Charcuterie*:\n\n*Nombre:* ${formData.name}\n*Contacto:* ${formData.contact}\n*Servicio de interés:* ${formData.serviceType}\n*Fecha estimada:* ${formData.eventDate || 'Por definir'}\n*Invitados aprox.:* ${formData.guestCount}\n*Zona en Louisville:* ${formData.location}\n*Detalles:* ${formData.message || 'Ninguno adicional'}`
        : `Hi Elianne, I would love to request a quote with *Ely’s Charcuterie*:\n\n*Name:* ${formData.name}\n*Contact:* ${formData.contact}\n*Service of Interest:* ${formData.serviceType}\n*Event Date:* ${formData.eventDate || 'TBD'}\n*Estimated Guests:* ${formData.guestCount}\n*Area in Louisville:* ${formData.location}\n*Notes:* ${formData.message || 'None'}`;

    return `https://wa.me/${BRAND_CONFIG.whatsappNumber}?text=${encodeURIComponent(text)}`;
  };

  const buildMailtoUrl = () => {
    const subject =
      lang === 'es'
        ? `Solicitud de Cotización: Ely’s Charcuterie (${formData.name})`
        : `Quote Request: Ely’s Charcuterie (${formData.name})`;
    const body =
      lang === 'es'
        ? `Hola Elianne,\n\nMe gustaría solicitar una cotización:\nNombre: ${formData.name}\nContacto: ${formData.contact}\nServicio: ${formData.serviceType}\nFecha: ${formData.eventDate}\nInvitados: ${formData.guestCount}\nUbicación: ${formData.location}\nComentarios: ${formData.message}`
        : `Hi Elianne,\n\nI would like to request a quote:\nName: ${formData.name}\nContacto: ${formData.contact}\nService: ${formData.serviceType}\nDate: ${formData.eventDate}\nGuests: ${formData.guestCount}\nLocation: ${formData.location}\nNotes: ${formData.message}`;

    return `mailto:${BRAND_CONFIG.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const directWhatsAppUrl = `https://wa.me/${BRAND_CONFIG.whatsappNumber}?text=${encodeURIComponent(
    lang === 'es'
      ? 'Hola Elianne, te escribo desde la página web de Ely’s Charcuterie en Louisville para hacer una consulta.'
      : 'Hi Elianne! Messaging you from Ely’s Charcuterie website in Louisville with an inquiry.'
  )}`;

  const fieldClasses =
    'w-full h-12 px-4 rounded-2xl bg-cream-50/90 border border-noir-600/40 text-noir-900 text-sm focus:outline-none focus:border-gold-600 transition-colors';

  return (
    <section
      id="cotizar"
      className="relative py-24 lg:py-36 bg-gradient-to-b from-cream-50 to-cream-100/80 border-t border-gold-300/40 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Direct Concierge Cards */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-gold-600">
              <Sparkles className="w-3.5 h-3.5 text-gold-500" />
              <span>
                {lang === 'es'
                  ? 'Atención Personalizada · Louisville, KY'
                  : 'Personal Concierge · Louisville, KY'}
              </span>
            </div>

            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-semibold text-noir-900 leading-[1.03] max-w-none">
              {lang === 'es' ? (
                <>
                  Hablemos de tu{' '}
                  <span className="italic font-normal text-gold-600">
                    próxima celebración.
                  </span>
                </>
              ) : (
                <>
                  Let’s plan your{' '}
                  <span className="italic font-normal text-gold-600">
                    next celebration.
                  </span>
                </>
              )}
            </h2>

            <p className="text-noir-700 text-base leading-relaxed">
              {lang === 'es'
                ? '¿Planeas una reunión íntima, un regalo especial o un evento en Louisville? Escríbeme directamente por WhatsApp o Instagram, o completa el formulario para enviarte una propuesta a medida.'
                : 'Planning an intimate gathering, a thoughtful gift, or an event in Louisville? Reach out directly via WhatsApp or Instagram, or complete the form for a bespoke proposal.'}
            </p>

            <div className="space-y-4 pt-2">
              <a
                href={directWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-5 rounded-3xl bg-noir-950 hover:bg-noir-900 text-cream-50 shadow-luxury transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-gold-200 to-gold-400 text-noir-950 flex items-center justify-center shrink-0">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-serif text-2xl font-semibold text-cream-50">
                      {lang === 'es'
                        ? 'WhatsApp Directo'
                        : 'Direct WhatsApp'}
                    </p>
                    <p className="text-xs text-gold-200/80 mt-0.5">
                      {lang === 'es'
                        ? 'Respuesta rápida con Elianne en Louisville'
                        : 'Fast personal reply from Elianne in Louisville'}
                    </p>
                  </div>
                </div>
                <ArrowUpRight className="w-5 h-5 text-gold-300 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              <a
                href={BRAND_CONFIG.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-5 rounded-3xl liquid-glass-light hover:border-gold-500 text-noir-900 transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-noir-900 text-gold-200 flex items-center justify-center shrink-0">
                    <Instagram className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-serif text-2xl font-semibold text-noir-900">
                      {BRAND_CONFIG.instagramHandle}
                    </p>
                    <p className="text-xs text-noir-600 mt-0.5">
                      {lang === 'es'
                        ? 'Descubre nuestras últimas mesas y escríbenos por DM'
                        : 'See our latest setups and message us on Instagram'}
                    </p>
                  </div>
                </div>
                <ArrowUpRight className="w-5 h-5 text-gold-600 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>

            <div className="p-5 rounded-3xl liquid-glass-light flex items-start gap-3.5">
              <MapPin className="w-5 h-5 text-gold-600 shrink-0 mt-0.5" />
              <div className="text-xs sm:text-sm text-noir-700 space-y-1">
                <p className="font-semibold text-noir-900">
                  Louisville, Kentucky
                </p>
                <p>
                  {lang === 'es'
                    ? 'Entregas a domicilio, recogida coordinada y montaje de mesas en toda el área metropolitana de Louisville.'
                    : 'Coordinated pickup, local delivery, and on-site event styling across Greater Louisville.'}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Sculptural Liquid Glass Form */}
          <div className="lg:col-span-7">
            <div className="rounded-[32px] liquid-glass-light p-7 sm:p-10">
              {!submitted ? (
                <form
                  onSubmit={handleSubmit}
                  data-endpoint=""
                  className="space-y-5"
                >
                  <div className="border-b border-gold-300/45 pb-4">
                    <h3 className="font-serif text-3xl font-semibold text-noir-900 max-w-none">
                      {lang === 'es'
                        ? 'Solicitar cotización a medida'
                        : 'Request a custom quote'}
                    </h3>
                    <p className="text-xs sm:text-sm text-noir-600 mt-1">
                      {lang === 'es'
                        ? 'Completa los datos de tu pedido o evento para abrir tu solicitud lista para enviar.'
                        : 'Fill in your order or event details to prepare your direct inquiry.'}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-noir-800 font-semibold mb-2">
                        {lang === 'es' ? 'Tu nombre' : 'Your name'}
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        placeholder={
                          lang === 'es' ? 'Ej. María Rodríguez' : 'e.g. Sarah Miller'
                        }
                        className={fieldClasses}
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-noir-800 font-semibold mb-2">
                        {lang === 'es'
                          ? 'Teléfono, WhatsApp o correo'
                          : 'Phone, WhatsApp, or email'}
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.contact}
                        onChange={(e) =>
                          setFormData({ ...formData, contact: e.target.value })
                        }
                        placeholder="(502) 000 0000"
                        className={fieldClasses}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-noir-800 font-semibold mb-2">
                        {lang === 'es'
                          ? '¿Qué te gustaría cotizar?'
                          : 'Service of interest'}
                      </label>
                      <select
                        value={formData.serviceType}
                        onChange={(e) =>
                          setFormData({ ...formData, serviceType: e.target.value })
                        }
                        className={fieldClasses}
                      >
                        <option value="Tabla Artesanal de Charcutería">
                          {lang === 'es'
                            ? 'Tabla Artesanal de Charcutería'
                            : 'Artisanal Charcuterie Board'}
                        </option>
                        <option value="Caja Gourmet o Regalo Especial">
                          {lang === 'es'
                            ? 'Caja Gourmet o Regalo Especial'
                            : 'Luxury Grazing Box or Gift'}
                        </option>
                        <option value="Grazing Cups y Conos Individuales">
                          {lang === 'es'
                            ? 'Grazing Cups y Conos Individuales'
                            : 'Individual Grazing Cups & Cones'}
                        </option>
                        <option value="Mesa de Charcutería para Evento">
                          {lang === 'es'
                            ? 'Mesa de Charcutería para Evento (Grazing Table)'
                            : 'Event Grazing Table'}
                        </option>
                        <option value="Carrito Móvil de Charcutería">
                          {lang === 'es'
                            ? 'Carrito Móvil de Charcutería (Mobile Bar)'
                            : 'Mobile Charcuterie Cart'}
                        </option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs text-noir-800 font-semibold mb-2">
                        {lang === 'es'
                          ? 'Número de personas estimado'
                          : 'Estimated guest count'}
                      </label>
                      <select
                        value={formData.guestCount}
                        onChange={(e) =>
                          setFormData({ ...formData, guestCount: e.target.value })
                        }
                        className={fieldClasses}
                      >
                        <option value="2 a 6 personas (Íntimo o Regalo)">
                          {lang === 'es'
                            ? '2 a 6 personas (Íntimo o Regalo)'
                            : '2 to 6 guests (Intimate or Gift)'}
                        </option>
                        <option value="8 a 16 personas (Reunión)">
                          {lang === 'es'
                            ? '8 a 16 personas (Reunión)'
                            : '8 to 16 guests (Gathering)'}
                        </option>
                        <option value="20 a 40 invitados (Evento Pequeño)">
                          {lang === 'es'
                            ? '20 a 40 invitados (Evento Pequeño)'
                            : '20 to 40 guests (Small Event)'}
                        </option>
                        <option value="45 a 80 invitados (Celebración Mediana)">
                          {lang === 'es'
                            ? '45 a 80 invitados (Celebración Mediana)'
                            : '45 to 80 guests (Medium Event)'}
                        </option>
                        <option value="80 o más invitados (Gran Evento o Boda)">
                          {lang === 'es'
                            ? '80 o más invitados (Gran Evento o Boda)'
                            : '80+ guests (Large Event or Wedding)'}
                        </option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-noir-800 font-semibold mb-2">
                        {lang === 'es'
                          ? 'Fecha del pedido o evento'
                          : 'Event or order date'}
                      </label>
                      <input
                        type="date"
                        value={formData.eventDate}
                        onChange={(e) =>
                          setFormData({ ...formData, eventDate: e.target.value })
                        }
                        className={fieldClasses}
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-noir-800 font-semibold mb-2">
                        {lang === 'es'
                          ? 'Zona en Louisville, KY'
                          : 'Location in Louisville, KY'}
                      </label>
                      <input
                        type="text"
                        value={formData.location}
                        onChange={(e) =>
                          setFormData({ ...formData, location: e.target.value })
                        }
                        placeholder="Louisville, KY"
                        className={fieldClasses}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-noir-800 font-semibold mb-2">
                      {lang === 'es'
                        ? 'Detalles adicionales (tipo de celebración, preferencias o dedicatoria)'
                        : 'Additional details (occasion, dietary notes, or gift message)'}
                    </label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      placeholder={
                        lang === 'es'
                          ? 'Ej. Es para un aniversario o baby shower, nos encantan los quesos suaves y frutos rojos...'
                          : 'e.g. It is for a bridal shower or birthday, we love soft cheeses and berries...'
                      }
                      className="w-full px-4 py-3 rounded-2xl bg-cream-50/90 border border-noir-600/40 text-noir-900 text-sm focus:outline-none focus:border-gold-600 transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2.5 h-14 px-8 rounded-full bg-noir-950 hover:bg-noir-900 text-gold-200 text-sm font-semibold shadow-luxury transition-all whitespace-nowrap"
                  >
                    <Send className="w-4 h-4 text-gold-300 shrink-0" />
                    <span>
                      {lang === 'es'
                        ? 'Preparar solicitud de cotización'
                        : 'Prepare quote request'}
                    </span>
                  </button>
                </form>
              ) : (
                <div className="py-8 text-center space-y-6">
                  <div className="w-16 h-16 rounded-full bg-gold-200/60 border border-gold-400 mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8 text-noir-900" />
                  </div>

                  <div className="space-y-2 max-w-md mx-auto">
                    <h3 className="font-serif text-3xl font-semibold text-noir-900 max-w-none">
                      {lang === 'es'
                        ? `Resumen listo para ${formData.name}`
                        : `Summary ready for ${formData.name}`}
                    </h3>
                    <p className="text-sm text-noir-700 leading-relaxed">
                      {lang === 'es'
                        ? 'Elige el canal por el que prefieres abrir y enviar tu mensaje directo a Elianne:'
                        : 'Choose the channel you prefer to open and send your direct message to Elianne:'}
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                    <a
                      href={buildWhatsAppQuoteUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 h-12 px-7 rounded-full bg-noir-950 hover:bg-noir-900 text-gold-200 text-xs font-semibold transition-colors whitespace-nowrap"
                    >
                      <MessageCircle className="w-4 h-4 text-gold-300 shrink-0" />
                      <span>
                        {lang === 'es'
                          ? 'Abrir en WhatsApp'
                          : 'Open in WhatsApp'}
                      </span>
                    </a>

                    <a
                      href={buildMailtoUrl()}
                      className="inline-flex items-center justify-center gap-2 h-12 px-7 rounded-full border border-gold-500 bg-cream-100 hover:bg-gold-200/40 text-noir-900 text-xs font-semibold transition-colors whitespace-nowrap"
                    >
                      <Mail className="w-4 h-4 text-gold-600 shrink-0" />
                      <span>
                        {lang === 'es' ? 'Abrir en correo' : 'Open in email'}
                      </span>
                    </a>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="inline-flex items-center justify-center h-11 px-5 text-xs text-gold-600 hover:text-noir-900 font-semibold underline transition-colors whitespace-nowrap"
                  >
                    {lang === 'es'
                      ? 'Editar datos del formulario'
                      : 'Edit form details'}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
