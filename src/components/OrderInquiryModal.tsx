import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { BrandConfigData, Language, Product } from '../types/catalog';
import { BRAND_CONFIG, PRODUCTS } from '../data/catalog';
import {
  formatHalfUsdPrice,
  isSafeHttpsUrl,
  startStripeCheckout,
  StripePaymentMode,
} from '../utils/cmsStore';

interface OrderInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  products?: Product[];
  brandConfig?: BrandConfigData;
  initialSelection?: string;
}

export const OrderInquiryModal: React.FC<OrderInquiryModalProps> = ({
  isOpen,
  onClose,
  lang,
  products = PRODUCTS,
  brandConfig = BRAND_CONFIG,
  initialSelection,
}) => {
  const [selectedProductId, setSelectedProductId] = useState<string>(
    products[0]?.id || '01'
  );
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [date, setDate] = useState('');
  const [guests, setGuests] = useState('');
  const [notes, setNotes] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const [checkingOutMode, setCheckingOutMode] =
    useState<StripePaymentMode | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    setEmailSent(false);
    if (!initialSelection) {
      setSelectedProductId(products[0]?.id || '01');
      setNotes('');
      return;
    }
    const lowerSel = initialSelection.toLowerCase();
    const isThanksgivingPromo = lowerSel.includes('thanksgiving');
    const matched = products.find(
      (p) =>
        p.id === initialSelection ||
        initialSelection.startsWith(`${p.id} `) ||
        lowerSel.includes(p.name.en.toLowerCase()) ||
        lowerSel.includes(p.name.es.toLowerCase()) ||
        (isThanksgivingPromo &&
          lowerSel.includes('16') &&
          p.dimensions.es.includes('16')) ||
        (isThanksgivingPromo &&
          lowerSel.includes('18') &&
          p.dimensions.es.includes('18'))
    );
    if (matched) {
      setSelectedProductId(matched.id);
      setNotes(isThanksgivingPromo ? initialSelection : '');
    } else {
      setSelectedProductId('custom');
      setNotes(initialSelection);
    }
  }, [initialSelection, isOpen, products]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const activeProduct = products.find((p) => p.id === selectedProductId);
  const selectionLabel = activeProduct
    ? `${activeProduct.id} — ${activeProduct.name[lang]} (${activeProduct.price[lang]})`
    : lang === 'en'
    ? 'Custom Event / Grazing Table'
    : 'Evento Personalizado / Mesa de Charcutería';

  const rawStripeUrl =
    activeProduct?.stripePaymentLink || brandConfig.stripeCustomQuoteLink;
  const stripeCheckoutUrl = isSafeHttpsUrl(rawStripeUrl)
    ? rawStripeUrl
    : BRAND_CONFIG.stripeCustomQuoteLink;
  const halfPrice = activeProduct
    ? formatHalfUsdPrice(activeProduct.price[lang])
    : null;
  const hasDirectPrice = Boolean(
    isSafeHttpsUrl(activeProduct?.stripePaymentLink) &&
      !activeProduct?.isCustomQuote &&
      halfPrice
  );
  const detailsList = activeProduct?.details?.[lang];
  const activeDetailNote = detailsList?.[detailsList.length - 1];

  const handleDirectStripe = async (
    mode: StripePaymentMode,
    e?: React.MouseEvent<HTMLElement>
  ) => {
    if (e) e.preventDefault();
    if (!activeProduct || checkingOutMode) return;
    setCheckingOutMode(mode);
    try {
      await startStripeCheckout(activeProduct, lang, {
        paymentMode: mode,
        customerEmail: contact.includes('@') ? contact : undefined,
      });
    } finally {
      setCheckingOutMode(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const isEmail = contact.includes('@');

    fetch('/api/order-inquiry', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        selection: selectionLabel,
        name,
        email: isEmail ? contact : '',
        phone: !isEmail ? contact : '',
        date,
        guests,
        notes,
      }),
    })
      .then((res) => {
        if (res.ok) setEmailSent(true);
      })
      .catch(() => {
        // Fallback to WhatsApp continues smoothly even if offline
      });

    const message =
      lang === 'en'
        ? `Hello Ely’s Charcuterie,\n\nI would like to inquire about an order:\n• Selection: ${selectionLabel}\n• Name: ${name || 'To confirm'}\n• Contact: ${contact || 'To confirm'}\n• Event Date: ${date || 'Flexible'}\n• Guests: ${guests || 'To confirm'}\n• Notes: ${notes || 'None'}`
        : `Hola Ely’s Charcuterie,\n\nMe gustaría consultar por un pedido:\n• Selección: ${selectionLabel}\n• Nombre: ${name || 'Por confirmar'}\n• Contacto: ${contact || 'Por confirmar'}\n• Fecha: ${date || 'Flexible'}\n• Invitados: ${guests || 'Por confirmar'}\n• Notas: ${notes || 'Ninguna'}`;

    const url = `https://wa.me/${brandConfig.whatsappNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="order-concierge-title"
      className="fixed inset-0 z-50 flex items-center justify-end bg-[#4A120E]/55 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg h-full bg-[#EBD6A0] border-l border-[#841F17]/25 px-7 sm:px-12 py-10 flex flex-col justify-between overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="space-y-8">
          <div className="flex items-center justify-between border-b border-[#841F17]/20 pb-6">
            <div>
              <p className="text-[10px] font-semibold tracking-[0.28em] uppercase text-[#841F17]">
                {lang === 'en' ? 'ORDER CONCIERGE' : 'CONCIERGE DE PEDIDOS'}
              </p>
              <h3
                id="order-concierge-title"
                className="font-serif font-normal text-3xl text-[#841F17] mt-1"
              >
                {lang === 'en'
                  ? 'Create Your Experience'
                  : 'Crea Tu Experiencia'}
              </h3>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-2 text-[#841F17]/75 hover:text-[#841F17] transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label
                htmlFor="order-selection"
                className="block text-[10px] font-semibold tracking-[0.24em] uppercase text-[#5A120D]/80"
              >
                {lang === 'en'
                  ? 'SELECTION OR OCCASION'
                  : 'SELECCIÓN U OCASIÓN'}
              </label>
              <select
                id="order-selection"
                name="selection"
                value={selectedProductId}
                onChange={(e) => setSelectedProductId(e.target.value)}
                className="w-full bg-[#FAF5E8]/80 border border-[#841F17]/30 focus:border-[#841F17] px-4 py-3.5 text-xs font-medium tracking-[0.12em] uppercase text-[#4A120E] focus:outline-none"
              >
                {products.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.id} — {p.name[lang]} · {p.price[lang]}
                  </option>
                ))}
                <option value="custom">
                  {lang === 'en'
                    ? 'Custom Event / Grazing Table (Custom Quote)'
                    : 'Evento Personalizado / Mesa de Charcutería (A Cotizar)'}
                </option>
              </select>

              {activeProduct && (
                <div className="mt-2 p-3.5 bg-[#FAF5E8]/60 border border-[#841F17]/20 flex items-center justify-between gap-4">
                  <div className="space-y-0.5">
                    <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-[#841F17]">
                      {activeProduct.shortTitle[lang]} · {activeProduct.servings[lang]}
                    </p>
                    {activeDetailNote && (
                      <p className="text-xs text-[#4A120E]/85">
                        {activeDetailNote}
                      </p>
                    )}
                  </div>
                  <span className="font-serif text-lg font-semibold text-[#841F17] shrink-0 num">
                    {activeProduct.price[lang]}
                  </span>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label
                  htmlFor="order-name"
                  className="block text-[10px] font-semibold tracking-[0.24em] uppercase text-[#5A120D]/80"
                >
                  {lang === 'en' ? 'YOUR NAME' : 'TU NOMBRE'}
                </label>
                <input
                  id="order-name"
                  name="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={
                    lang === 'en' ? 'Enter your name' : 'Escribe tu nombre'
                  }
                  className="w-full bg-transparent border-b border-[#841F17]/30 focus:border-[#841F17] py-3 text-sm text-[#4A120E] placeholder:text-[#5A120D]/40 focus:outline-none"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="order-contact"
                  className="block text-[10px] font-semibold tracking-[0.24em] uppercase text-[#5A120D]/80"
                >
                  {lang === 'en' ? 'EMAIL OR PHONE' : 'CORREO O TELÉFONO'}
                </label>
                <input
                  id="order-contact"
                  name="contact"
                  type="text"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  placeholder={
                    lang === 'en' ? 'Email or phone' : 'Correo o teléfono'
                  }
                  className="w-full bg-transparent border-b border-[#841F17]/30 focus:border-[#841F17] py-3 text-sm text-[#4A120E] placeholder:text-[#5A120D]/40 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label
                  htmlFor="order-date"
                  className="block text-[10px] font-semibold tracking-[0.24em] uppercase text-[#5A120D]/80"
                >
                  {lang === 'en' ? 'PREFERRED DATE' : 'FECHA DESEADA'}
                </label>
                <input
                  id="order-date"
                  name="date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-transparent border-b border-[#841F17]/30 focus:border-[#841F17] py-3 text-sm text-[#4A120E] focus:outline-none"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="order-guests"
                  className="block text-[10px] font-semibold tracking-[0.24em] uppercase text-[#5A120D]/80"
                >
                  {lang === 'en' ? 'ESTIMATED GUESTS' : 'INVITADOS ESTIMADOS'}
                </label>
                <input
                  id="order-guests"
                  name="guests"
                  type="text"
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  placeholder={lang === 'en' ? 'e.g., 4–6' : 'ej. 4–6'}
                  className="w-full bg-transparent border-b border-[#841F17]/30 focus:border-[#841F17] py-3 text-sm text-[#4A120E] placeholder:text-[#5A120D]/40 focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="order-notes"
                className="block text-[10px] font-semibold tracking-[0.24em] uppercase text-[#5A120D]/80"
              >
                {lang === 'en'
                  ? 'NOTES OR SPECIAL REQUESTS'
                  : 'NOTAS O PREFERENCIAS'}
              </label>
              <textarea
                id="order-notes"
                name="notes"
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder={
                  lang === 'en'
                    ? 'Dietary preferences, gift note, or event details...'
                    : 'Preferencias, dedicatoria o detalles del evento...'
                }
                className="w-full bg-transparent border-b border-[#841F17]/30 focus:border-[#841F17] py-3 text-sm text-[#4A120E] placeholder:text-[#5A120D]/40 focus:outline-none"
              />
            </div>

            {emailSent && (
              <p className="text-xs font-medium text-[#841F17] bg-[#FAF5E8]/80 border border-[#841F17]/25 px-3.5 py-2.5">
                {lang === 'en'
                  ? `Request also sent to ${brandConfig.email}.`
                  : `Solicitud también enviada a ${brandConfig.email}.`}
              </p>
            )}

            <div className="pt-3 space-y-2.5">
              {hasDirectPrice && activeProduct && halfPrice ? (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <a
                      href={stripeCheckoutUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => handleDirectStripe('full', e)}
                      className="w-full py-3.5 px-3 bg-[#841F17] hover:bg-[#63150F] text-[#FAF5E8] text-[10px] sm:text-[11px] font-semibold tracking-[0.18em] uppercase transition-all duration-300 shadow-sm flex items-center justify-center text-center"
                    >
                      {checkingOutMode === 'full'
                        ? lang === 'en'
                          ? 'OPENING STRIPE...'
                          : 'ABRIENDO STRIPE...'
                        : lang === 'en'
                        ? `PAY IN FULL · ${activeProduct.price[lang]}`
                        : `PAGAR COMPLETO · ${activeProduct.price[lang]}`}
                    </a>

                    <button
                      type="button"
                      onClick={(e) => handleDirectStripe('deposit50', e)}
                      className="w-full py-3.5 px-3 border border-[#841F17] bg-[#FAF5E8]/85 hover:bg-[#841F17] text-[#841F17] hover:text-[#FAF5E8] text-[10px] sm:text-[11px] font-semibold tracking-[0.18em] uppercase transition-all duration-300 shadow-sm flex items-center justify-center text-center"
                    >
                      {checkingOutMode === 'deposit50'
                        ? lang === 'en'
                          ? 'OPENING STRIPE...'
                          : 'ABRIENDO STRIPE...'
                        : lang === 'en'
                        ? `50% DEPOSIT · ${halfPrice}`
                        : `RESERVAR CON 50% · ${halfPrice}`}
                    </button>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 border border-[#841F17]/40 hover:border-[#841F17] bg-[#FAF5E8]/50 hover:bg-[#841F17] text-[#841F17] hover:text-[#FAF5E8] text-[10px] sm:text-[11px] font-semibold tracking-[0.2em] uppercase transition-all duration-300"
                  >
                    {lang === 'en'
                      ? 'OR INQUIRE VIA WHATSAPP CONCIERGE'
                      : 'O CONSULTAR POR WHATSAPP'}
                  </button>
                </>
              ) : (
                <>
                  <button
                    type="submit"
                    className="w-full py-4 bg-[#841F17] hover:bg-[#63150F] text-[#FAF5E8] text-[11px] font-semibold tracking-[0.26em] uppercase transition-all duration-300 shadow-sm"
                  >
                    {lang === 'en'
                      ? 'REQUEST QUOTE VIA WHATSAPP'
                      : 'COTIZAR POR WHATSAPP'}
                  </button>
                  <a
                    href={stripeCheckoutUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 border border-[#841F17]/45 hover:border-[#841F17] bg-[#FAF5E8]/60 hover:bg-[#841F17] text-[#841F17] hover:text-[#FAF5E8] text-[11px] font-semibold tracking-[0.22em] uppercase transition-all duration-300 flex items-center justify-center text-center"
                  >
                    {lang === 'en'
                      ? 'PAY AGREED QUOTE WITH STRIPE'
                      : 'PAGAR MONTO ACORDADO CON STRIPE'}
                  </a>
                </>
              )}
            </div>
          </form>
        </div>

        <p className="pt-8 text-[11px] text-[#5A120D]/70 font-normal leading-relaxed">
          {lang === 'en'
            ? 'Direct personal attention by Elianne Lafuente in Louisville, Kentucky.'
            : 'Atención directa y personalizada por Elianne Lafuente en Louisville, Kentucky.'}
        </p>
      </div>
    </div>
  );
};
