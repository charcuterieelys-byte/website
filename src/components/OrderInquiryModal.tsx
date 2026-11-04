import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Language } from '../types/catalog';
import { BRAND_CONFIG, PRODUCTS } from '../data/catalog';

interface OrderInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  initialSelection?: string;
}

export const OrderInquiryModal: React.FC<OrderInquiryModalProps> = ({
  isOpen,
  onClose,
  lang,
  initialSelection,
}) => {
  const [selectedProduct, setSelectedProduct] = useState(
    initialSelection || PRODUCTS[0].name.en
  );
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [guests, setGuests] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (initialSelection) {
      setSelectedProduct(initialSelection);
    }
  }, [initialSelection]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message =
      lang === 'en'
        ? `Hello Ely’s Charcuterie,\n\nI would like to inquire about an order:\n• Selection: ${selectedProduct}\n• Name: ${name || 'To confirm'}\n• Event Date: ${date || 'Flexible'}\n• Guests: ${guests || 'To confirm'}\n• Notes: ${notes || 'None'}`
        : `Hola Ely’s Charcuterie,\n\nMe gustaría consultar por un pedido:\n• Selección: ${selectedProduct}\n• Nombre: ${name || 'Por confirmar'}\n• Fecha: ${date || 'Flexible'}\n• Invitados: ${guests || 'Por confirmar'}\n• Notas: ${notes || 'Ninguna'}`;

    const url = `https://wa.me/${BRAND_CONFIG.whatsappNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
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
              <h3 className="font-serif font-normal text-3xl text-[#841F17] mt-1">
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
              <label className="block text-[10px] font-semibold tracking-[0.24em] uppercase text-[#5A120D]/80">
                {lang === 'en'
                  ? 'SELECTION OR OCCASION'
                  : 'SELECCIÓN U OCASIÓN'}
              </label>
              <select
                value={selectedProduct}
                onChange={(e) => setSelectedProduct(e.target.value)}
                className="w-full bg-[#FAF5E8]/80 border border-[#841F17]/30 focus:border-[#841F17] px-4 py-3.5 text-xs font-medium tracking-[0.12em] uppercase text-[#4A120E] focus:outline-none"
              >
                {PRODUCTS.map((p) => (
                  <option key={p.id} value={p.name[lang]}>
                    {p.id} — {p.name[lang]} ({p.dimensions[lang]})
                  </option>
                ))}
                <option value="Custom Event / Grazing Table">
                  {lang === 'en'
                    ? 'Custom Event / Grazing Table'
                    : 'Evento Personalizado / Mesa de Charcutería'}
                </option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-[10px] font-semibold tracking-[0.24em] uppercase text-[#5A120D]/80">
                {lang === 'en' ? 'YOUR NAME' : 'TU NOMBRE'}
              </label>
              <input
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-[10px] font-semibold tracking-[0.24em] uppercase text-[#5A120D]/80">
                  {lang === 'en' ? 'PREFERRED DATE' : 'FECHA DESEADA'}
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-transparent border-b border-[#841F17]/30 focus:border-[#841F17] py-3 text-sm text-[#4A120E] focus:outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-[10px] font-semibold tracking-[0.24em] uppercase text-[#5A120D]/80">
                  {lang === 'en' ? 'ESTIMATED GUESTS' : 'INVITADOS ESTIMADOS'}
                </label>
                <input
                  type="text"
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  placeholder={lang === 'en' ? 'e.g., 4–6' : 'ej. 4–6'}
                  className="w-full bg-transparent border-b border-[#841F17]/30 focus:border-[#841F17] py-3 text-sm text-[#4A120E] placeholder:text-[#5A120D]/40 focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-[10px] font-semibold tracking-[0.24em] uppercase text-[#5A120D]/80">
                {lang === 'en'
                  ? 'NOTES OR SPECIAL REQUESTS'
                  : 'NOTAS O PREFERENCIAS'}
              </label>
              <textarea
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

            <div className="pt-4">
              <button
                type="submit"
                className="w-full py-4 bg-[#841F17] hover:bg-[#63150F] text-[#FAF5E8] text-[11px] font-semibold tracking-[0.26em] uppercase transition-all duration-300 shadow-sm"
              >
                {lang === 'en'
                  ? 'CONTINUE TO WHATSAPP CONCIERGE'
                  : 'CONTINUAR POR WHATSAPP'}
              </button>
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
