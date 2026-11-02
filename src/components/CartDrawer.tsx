import React, { useState } from 'react';
import {
  X,
  Trash2,
  Plus,
  Minus,
  MessageCircle,
  ShoppingBag,
  Calendar,
} from 'lucide-react';
import { CartItem, Language } from '../types/catalog';
import { BRAND_CONFIG, CATALOG_ITEMS } from '../data/catalog';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  cart: CartItem[];
  onUpdateQty: (productId: string, sizeId: string, delta: number) => void;
  onRemove: (productId: string, sizeId: string) => void;
  onClear: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  lang,
  cart,
  onUpdateQty,
  onRemove,
  onClear,
}) => {
  const [customerName, setCustomerName] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [giftNote, setGiftNote] = useState('');

  if (!isOpen) return null;

  const detailedItems = cart
    .map((ci) => {
      const product = CATALOG_ITEMS.find((p) => p.id === ci.productId);
      if (!product) return null;
      const size =
        product.sizes.find((s) => s.id === ci.sizeId) || product.sizes[0];
      return {
        ...ci,
        product,
        size,
        subtotal: size.price * ci.quantity,
      };
    })
    .filter(Boolean) as {
    productId: string;
    sizeId: string;
    quantity: number;
    product: (typeof CATALOG_ITEMS)[0];
    size: (typeof CATALOG_ITEMS)[0]['sizes'][0];
    subtotal: number;
  }[];

  const totalAmount = detailedItems.reduce((sum, item) => sum + item.subtotal, 0);

  const generateWhatsAppOrderUrl = () => {
    const lines = detailedItems.map(
      (item) =>
        `• ${item.quantity}x *${item.product.name[lang]}* (${item.size.label[lang]}) — $${item.subtotal} USD`
    );

    const header =
      lang === 'es'
        ? `Hola Elianne ✨ Quiero realizar el siguiente pedido en *Ely's Charcuterie* (Louisville, KY):\n\n`
        : `Hi Elianne ✨ I would love to place the following order with *Ely's Charcuterie* (Louisville, KY):\n\n`;

    const details =
      lang === 'es'
        ? `\n\n*Total estimado:* $${totalAmount} USD\n*Nombre:* ${
            customerName || 'Por confirmar'
          }\n*Fecha deseada:* ${
            preferredDate || 'Por coordinar'
          }\n*Nota / Dedicatoria:* ${giftNote || 'Sin nota especial'}`
        : `\n\n*Estimated Total:* $${totalAmount} USD\n*Name:* ${
            customerName || 'TBD'
          }\n*Requested Date:* ${
            preferredDate || 'TBD'
          }\n*Gift Note / Preferences:* ${giftNote || 'None'}`;

    const fullMessage = header + lines.join('\n') + details;
    return `https://wa.me/${BRAND_CONFIG.whatsappNumber}?text=${encodeURIComponent(
      fullMessage
    )}`;
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-noir-950/65 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-cream-50 h-full shadow-luxury border-l border-gold-400/50 flex flex-col justify-between overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-6 bg-cream-100 border-b border-gold-300/50 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-gold-600" />
            <h3 className="font-serif text-2xl font-semibold text-noir-900">
              {lang === 'es' ? 'Mi Selección de Pedido' : 'My Order Bag'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-cream-200 text-noir-700 transition-colors"
            aria-label="Cerrar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {detailedItems.length === 0 ? (
            <div className="text-center py-16 space-y-4">
              <div className="w-16 h-16 rounded-full bg-cream-200/80 border border-gold-300 mx-auto flex items-center justify-center">
                <ShoppingBag className="w-7 h-7 text-gold-600" />
              </div>
              <p className="font-serif text-2xl text-noir-800">
                {lang === 'es'
                  ? 'Tu pedido está vacío por ahora'
                  : 'Your order bag is empty'}
              </p>
              <p className="text-sm text-noir-600 max-w-xs mx-auto">
                {lang === 'es'
                  ? 'Explora nuestro catálogo y agrega las tablas, cajas o experiencias que desees encargar.'
                  : 'Browse our catalog and add the boards, gift boxes, or experiences you would like to order.'}
              </p>
            </div>
          ) : (
            <>
              <div className="space-y-4">
                {detailedItems.map((item) => (
                  <div
                    key={`${item.productId}-${item.sizeId}`}
                    className="flex gap-3.5 p-3.5 rounded-2xl bg-cream-100/70 border border-gold-300/50"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name[lang]}
                      className="w-20 h-20 rounded-xl object-cover shrink-0 border border-gold-300/40"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-serif text-lg font-semibold text-noir-900 leading-tight">
                          {item.product.name[lang]}
                        </h4>
                        <button
                          onClick={() => onRemove(item.productId, item.sizeId)}
                          className="text-noir-500 hover:text-crimson-700 p-1"
                          title={lang === 'es' ? 'Eliminar' : 'Remove'}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-xs text-noir-600 mt-0.5">
                        {item.size.label[lang]} ({item.size.servings[lang]})
                      </p>

                      <div className="flex items-center justify-between mt-3">
                        <div className="inline-flex items-center gap-2 bg-cream-50 rounded-full border border-gold-300 px-2 py-0.5">
                          <button
                            onClick={() =>
                              onUpdateQty(item.productId, item.sizeId, -1)
                            }
                            className="p-1 text-noir-700 hover:text-gold-600"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-bold text-noir-900 px-1">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              onUpdateQty(item.productId, item.sizeId, 1)
                            }
                            className="p-1 text-noir-700 hover:text-gold-600"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <span className="font-serif text-lg font-bold text-noir-900">
                          ${item.subtotal}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Customization Fields */}
              <div className="p-4 rounded-2xl bg-cream-100/80 border border-gold-300/50 space-y-3">
                <p className="text-xs uppercase tracking-[0.15em] text-gold-600 font-semibold">
                  {lang === 'es'
                    ? 'Datos para tu entrega en Louisville'
                    : 'Details for your Louisville order'}
                </p>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder={lang === 'es' ? 'Tu nombre' : 'Your name'}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-cream-50 border border-gold-300/70 text-xs text-noir-900 focus:outline-none focus:border-gold-500"
                />
                <div className="relative">
                  <Calendar className="w-3.5 h-3.5 text-gold-600 absolute left-3.5 top-3 pointer-events-none" />
                  <input
                    type="date"
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-cream-50 border border-gold-300/70 text-xs text-noir-900 focus:outline-none focus:border-gold-500"
                  />
                </div>
                <textarea
                  rows={2}
                  value={giftNote}
                  onChange={(e) => setGiftNote(e.target.value)}
                  placeholder={
                    lang === 'es'
                      ? '¿Alguna nota, dedicatoria o preferencia?'
                      : 'Any gift message or dietary note?'
                  }
                  className="w-full px-3.5 py-2 rounded-xl bg-cream-50 border border-gold-300/70 text-xs text-noir-900 focus:outline-none focus:border-gold-500"
                />
              </div>
            </>
          )}
        </div>

        {/* Drawer Footer */}
        {detailedItems.length > 0 && (
          <div className="p-6 bg-cream-100 border-t border-gold-300/60 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-[0.16em] text-noir-600 font-semibold">
                {lang === 'es' ? 'Total Estimado' : 'Estimated Total'}
              </span>
              <span className="font-serif text-3xl font-bold text-noir-900">
                ${totalAmount}{' '}
                <span className="text-xs font-sans font-normal text-noir-500">
                  USD
                </span>
              </span>
            </div>

            <a
              href={generateWhatsAppOrderUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 py-4 px-6 rounded-full bg-noir-900 hover:bg-noir-800 text-gold-200 text-xs uppercase tracking-[0.16em] font-semibold transition-all shadow-luxury"
            >
              <MessageCircle className="w-4 h-4 text-gold-300" />
              <span>
                {lang === 'es'
                  ? 'Confirmar Pedido por WhatsApp'
                  : 'Send Order via WhatsApp'}
              </span>
            </a>

            <button
              onClick={onClear}
              className="w-full text-center text-[11px] uppercase tracking-[0.15em] text-noir-500 hover:text-crimson-700 font-medium"
            >
              {lang === 'es' ? 'Vaciar selección' : 'Clear bag'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
