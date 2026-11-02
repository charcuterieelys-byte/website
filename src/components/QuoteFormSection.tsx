import React, { useState } from 'react';
import {
  MessageCircle,
  Instagram,
  Send,
  MapPin,
  CheckCircle2,
  Mail,
  Sparkles,
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
    guestCount: '10 - 25 personas',
    serviceType: 'Tabla o Caja de Charcutería',
    location: 'Louisville, KY',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const buildWhatsAppQuoteUrl = () => {
    const text =
      lang === 'es'
        ? `Hola Elianne ✨ Me gustaría solicitar una cotización con *Ely's Charcuterie*:\n\n• *Nombre:* ${formData.name}\n• *Contacto:* ${formData.contact}\n• *Servicio de interés:* ${formData.serviceType}\n• *Fecha estimada:* ${formData.eventDate || 'Por definir'}\n• *Invitados aprox.:* ${formData.guestCount}\n• *Zona en Louisville:* ${formData.location}\n• *Detalles / Notas:* ${formData.message || 'Ninguna adicional'}`
        : `Hi Elianne ✨ I would love to request a quote with *Ely's Charcuterie*:\n\n• *Name:* ${formData.name}\n• *Contact:* ${formData.contact}\n• *Service of Interest:* ${formData.serviceType}\n• *Event/Order Date:* ${formData.eventDate || 'TBD'}\n• *Estimated Guests:* ${formData.guestCount}\n• *Area in Louisville:* ${formData.location}\n• *Notes / Details:* ${formData.message || 'None'}`;

    return `https://wa.me/${BRAND_CONFIG.whatsappNumber}?text=${encodeURIComponent(text)}`;
  };

  const buildMailtoUrl = () => {
    const subject =
      lang === 'es'
        ? `Solicitud de Cotización — Ely's Charcuterie (${formData.name})`
        : `Quote Request — Ely's Charcuterie (${formData.name})`;
    const body =
      lang === 'es'
        ? `Hola Elianne,\n\nMe gustaría solicitar una cotización:\n- Nombre: ${formData.name}\n- Contacto: ${formData.contact}\n- Servicio: ${formData.serviceType}\n- Fecha: ${formData.eventDate}\n- Invitados: ${formData.guestCount}\n- Ubicación: ${formData.location}\n- Comentarios: ${formData.message}`
        : `Hi Elianne,\n\nI would like to request a quote:\n- Name: ${formData.name}\n- Contact: ${formData.contact}\n- Service: ${formData.serviceType}\n- Date: ${formData.eventDate}\n- Guests: ${formData.guestCount}\n- Location: ${formData.location}\n- Notes: ${formData.message}`;

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
      ? "Hola Elianne, te escribo desde la página web de Ely's Charcuterie en Louisville para hacer una consulta."
      : "Hi Elianne! Messaging you from Ely's Charcuterie website in Louisville with an inquiry."
  )}`;

  return (
    <section
      id="cotizar"
      className="py-20 lg:py-28 bg-cream-100/80 border-t border-gold-300/45"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Contact Channels (WhatsApp & Instagram) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-gold-600 font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-gold-500" />
              <span>
                {lang === 'es'
                  ? 'Contacto & Cotizaciones'
                  : 'Contact & Event Quotes'}
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl font-semibold text-noir-900 leading-tight">
              {lang === 'es'
                ? 'Hablemos de tu pedido o próxima celebración'
                : 'Let’s plan your order or next celebration'}
            </h2>

            <p className="text-noir-600 text-base sm:text-lg leading-relaxed">
              {lang === 'es'
                ? '¿Tienes una reunión en casa, un regalo especial o un evento en Louisville? Escríbeme directamente por WhatsApp o Instagram, o completa el formulario para enviarte una propuesta personalizada.'
                : 'Planning a gathering at home, a thoughtful gift, or an event in Louisville? Reach out directly via WhatsApp or Instagram, or fill out the form for a custom proposal.'}
            </p>

            {/* Visible WhatsApp & Instagram Cards */}
            <div className="space-y-3.5 pt-2">
              <a
                href={directWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-5 rounded-2xl bg-noir-900 hover:bg-noir-800 text-cream-50 border border-gold-400/40 shadow-luxury transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-gold-200 text-noir-900 flex items-center justify-center shrink-0">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.18em] text-gold-300 font-semibold">
                      {lang === 'es' ? 'Respuesta Rápida' : 'Fastest Response'}
                    </p>
                    <p className="font-serif text-2xl font-semibold text-cream-50">
                      {lang === 'es'
                        ? 'Contactar por WhatsApp'
                        : 'Chat on WhatsApp'}
                    </p>
                    <p className="text-xs text-cream-200/80">
                      {lang === 'es'
                        ? 'Haz clic para iniciar conversación con Elianne'
                        : 'Click to start a chat with Elianne'}
                    </p>
                  </div>
                </div>
                <span className="text-gold-300 text-sm font-semibold group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </a>

              <a
                href={BRAND_CONFIG.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-5 rounded-2xl bg-cream-50 hover:bg-gold-100/50 text-noir-900 border border-gold-400/60 shadow-soft transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-cream-200 border border-gold-400/50 text-noir-900 flex items-center justify-center shrink-0">
                    <Instagram className="w-6 h-6 text-gold-600" />
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.18em] text-gold-600 font-semibold">
                      Instagram Oficial
                    </p>
                    <p className="font-serif text-2xl font-semibold text-noir-900">
                      {BRAND_CONFIG.instagramHandle}
                    </p>
                    <p className="text-xs text-noir-600">
                      {lang === 'es'
                        ? 'Síguenos y escríbenos por mensaje directo (DM)'
                        : 'Follow our latest creations & send us a DM'}
                    </p>
                  </div>
                </div>
                <span className="text-gold-600 text-sm font-semibold group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </a>
            </div>

            {/* Service Area Info */}
            <div className="p-5 rounded-2xl bg-cream-50/90 border border-gold-300/50 flex items-start gap-3.5">
              <MapPin className="w-5 h-5 text-gold-600 shrink-0 mt-0.5" />
              <div className="text-xs sm:text-sm text-noir-700 space-y-1">
                <p className="font-semibold text-noir-900">
                  {lang === 'es'
                    ? 'Ubicación: Louisville, Kentucky'
                    : 'Location: Louisville, Kentucky'}
                </p>
                <p>
                  {lang === 'es'
                    ? 'Entregas a domicilio, recogida (pickup) coordinada y montaje de mesas en toda el área metropolitana de Louisville y alrededores.'
                    : 'Coordinated pickup, local delivery, and on-site event styling across Greater Louisville and surrounding areas.'}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Quote Request Form */}
          <div className="lg:col-span-7">
            <div className="bg-cream-50 p-7 sm:p-10 rounded-3xl border border-gold-400/55 shadow-luxury">
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="border-b border-gold-300/45 pb-4">
                    <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-noir-900">
                      {lang === 'es'
                        ? 'Formulario para Solicitar Cotización'
                        : 'Request a Custom Quote'}
                    </h3>
                    <p className="text-xs sm:text-sm text-noir-600 mt-1">
                      {lang === 'es'
                        ? 'Completa los datos de tu pedido o evento y te responderemos a la brevedad.'
                        : 'Fill in your order or event details and we will get back to you shortly.'}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-[0.14em] text-noir-700 font-semibold mb-2">
                        {lang === 'es' ? 'Tu Nombre *' : 'Your Name *'}
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
                        className="w-full px-4 py-3 rounded-xl bg-cream-100/70 border border-gold-300/70 text-noir-900 text-sm focus:outline-none focus:border-gold-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-[0.14em] text-noir-700 font-semibold mb-2">
                        {lang === 'es'
                          ? 'Teléfono / WhatsApp o Email *'
                          : 'Phone / WhatsApp or Email *'}
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.contact}
                        onChange={(e) =>
                          setFormData({ ...formData, contact: e.target.value })
                        }
                        placeholder="(502) 000-0000"
                        className="w-full px-4 py-3 rounded-xl bg-cream-100/70 border border-gold-300/70 text-noir-900 text-sm focus:outline-none focus:border-gold-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-[0.14em] text-noir-700 font-semibold mb-2">
                        {lang === 'es'
                          ? '¿Qué te gustaría cotizar?'
                          : 'Service of Interest'}
                      </label>
                      <select
                        value={formData.serviceType}
                        onChange={(e) =>
                          setFormData({ ...formData, serviceType: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-xl bg-cream-100/70 border border-gold-300/70 text-noir-900 text-sm focus:outline-none focus:border-gold-500"
                      >
                        <option value="Tabla Artesanal de Charcutería">
                          {lang === 'es'
                            ? 'Tabla Artesanal de Charcutería'
                            : 'Artisanal Charcuterie Board'}
                        </option>
                        <option value="Caja Gourmet / Regalo Especial">
                          {lang === 'es'
                            ? 'Caja Gourmet / Regalo Especial'
                            : 'Luxury Grazing Box / Gift'}
                        </option>
                        <option value="Grazing Cups / Conos Individuales">
                          {lang === 'es'
                            ? 'Grazing Cups / Conos Individuales'
                            : 'Individual Grazing Cups & Cones'}
                        </option>
                        <option value="Mesa de Charcutería para Evento (Grazing Table)">
                          {lang === 'es'
                            ? 'Mesa de Charcutería para Evento (Grazing Table)'
                            : 'Event Grazing Table'}
                        </option>
                        <option value="Carrito Móvil de Charcutería (Mobile Grazing Bar)">
                          {lang === 'es'
                            ? 'Carrito Móvil de Charcutería (Mobile Bar)'
                            : 'Mobile Charcuterie Cart'}
                        </option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-[0.14em] text-noir-700 font-semibold mb-2">
                        {lang === 'es'
                          ? 'Número de Personas Aprox.'
                          : 'Estimated Guest Count'}
                      </label>
                      <select
                        value={formData.guestCount}
                        onChange={(e) =>
                          setFormData({ ...formData, guestCount: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-xl bg-cream-100/70 border border-gold-300/70 text-noir-900 text-sm focus:outline-none focus:border-gold-500"
                      >
                        <option value="2 - 6 personas (Íntimo / Regalo)">
                          {lang === 'es'
                            ? '2 – 6 personas (Íntimo / Regalo)'
                            : '2 – 6 guests (Intimate / Gift)'}
                        </option>
                        <option value="8 - 16 personas (Reunión)">
                          {lang === 'es'
                            ? '8 – 16 personas (Reunión)'
                            : '8 – 16 guests (Gathering)'}
                        </option>
                        <option value="20 - 40 invitados (Evento Pequeño)">
                          {lang === 'es'
                            ? '20 – 40 invitados (Evento Pequeño)'
                            : '20 – 40 guests (Small Event)'}
                        </option>
                        <option value="45 - 80 invitados (Celebración Mediana)">
                          {lang === 'es'
                            ? '45 – 80 invitados (Celebración Mediana)'
                            : '45 – 80 guests (Medium Event)'}
                        </option>
                        <option value="80+ invitados (Gran Evento / Boda)">
                          {lang === 'es'
                            ? '80+ invitados (Gran Evento / Boda)'
                            : '80+ guests (Large Event / Wedding)'}
                        </option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-[0.14em] text-noir-700 font-semibold mb-2">
                        {lang === 'es'
                          ? 'Fecha del Pedido o Evento'
                          : 'Event or Order Date'}
                      </label>
                      <input
                        type="date"
                        value={formData.eventDate}
                        onChange={(e) =>
                          setFormData({ ...formData, eventDate: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-xl bg-cream-100/70 border border-gold-300/70 text-noir-900 text-sm focus:outline-none focus:border-gold-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-[0.14em] text-noir-700 font-semibold mb-2">
                        {lang === 'es'
                          ? 'Zona / Ciudad (Louisville, KY)'
                          : 'Location / Neighborhood'}
                      </label>
                      <input
                        type="text"
                        value={formData.location}
                        onChange={(e) =>
                          setFormData({ ...formData, location: e.target.value })
                        }
                        placeholder="Louisville, KY"
                        className="w-full px-4 py-3 rounded-xl bg-cream-100/70 border border-gold-300/70 text-noir-900 text-sm focus:outline-none focus:border-gold-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-[0.14em] text-noir-700 font-semibold mb-2">
                      {lang === 'es'
                        ? 'Cuéntanos más detalles (tipo de celebración, preferencias o dedicatoria)'
                        : 'Additional Details (occasion, dietary notes, or gift message)'}
                    </label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      placeholder={
                        lang === 'es'
                          ? 'Ej. Es para un aniversario / baby shower, nos encantan los quesos suaves y frutos rojos...'
                          : 'e.g. It is for a bridal shower / birthday, we love soft cheeses and berries...'
                      }
                      className="w-full px-4 py-3 rounded-xl bg-cream-100/70 border border-gold-300/70 text-noir-900 text-sm focus:outline-none focus:border-gold-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2.5 py-4 px-6 rounded-full bg-noir-900 hover:bg-noir-800 text-gold-200 border border-gold-400/50 text-xs sm:text-sm uppercase tracking-[0.16em] font-semibold transition-all shadow-luxury hover:shadow-gold-glow"
                  >
                    <Send className="w-4 h-4 text-gold-300" />
                    <span>
                      {lang === 'es'
                        ? 'Generar y Enviar Solicitud de Cotización'
                        : 'Prepare & Send Quote Request'}
                    </span>
                  </button>
                </form>
              ) : (
                <div className="py-8 text-center space-y-6">
                  <div className="w-16 h-16 rounded-full bg-gold-200/60 border border-gold-400 mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8 text-noir-900" />
                  </div>

                  <div className="space-y-2 max-w-md mx-auto">
                    <h3 className="font-serif text-3xl font-semibold text-noir-900">
                      {lang === 'es'
                        ? `¡Gracias, ${formData.name}!`
                        : `Thank you, ${formData.name}!`}
                    </h3>
                    <p className="text-sm text-noir-600 leading-relaxed">
                      {lang === 'es'
                        ? 'Tu solicitud está lista. Elige cómo prefieres enviarla directamente a Elianne para recibir confirmación rápida:'
                        : 'Your quote summary is ready. Choose how you prefer to send it directly to Elianne for a quick reply:'}
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                    <a
                      href={buildWhatsAppQuoteUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-noir-900 hover:bg-noir-800 text-gold-200 text-xs uppercase tracking-[0.15em] font-semibold shadow-luxury"
                    >
                      <MessageCircle className="w-4 h-4 text-gold-300" />
                      <span>
                        {lang === 'es'
                          ? 'Enviar Cotización por WhatsApp'
                          : 'Send Quote via WhatsApp'}
                      </span>
                    </a>

                    <a
                      href={buildMailtoUrl()}
                      className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full border border-gold-400 bg-cream-100 hover:bg-gold-200/40 text-noir-900 text-xs uppercase tracking-[0.15em] font-semibold"
                    >
                      <Mail className="w-4 h-4 text-gold-600" />
                      <span>
                        {lang === 'es' ? 'Enviar por Correo' : 'Send via Email'}
                      </span>
                    </a>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="text-xs uppercase tracking-[0.15em] text-gold-600 hover:text-noir-900 font-semibold underline pt-2"
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
