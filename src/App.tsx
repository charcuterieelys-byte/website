import React, { useState } from 'react';
import { CartItem, Language } from './types/catalog';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutElianne } from './components/AboutElianne';
import { CatalogSection } from './components/CatalogSection';
import { EventsShowcase } from './components/EventsShowcase';
import { HowToOrder } from './components/HowToOrder';
import { GallerySection } from './components/GallerySection';
import { QuoteFormSection } from './components/QuoteFormSection';
import { CartDrawer } from './components/CartDrawer';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('es');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  const handleAddToCart = (productId: string, sizeId: string) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.productId === productId && item.sizeId === sizeId
      );
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + 1,
        };
        return updated;
      }
      return [...prev, { productId, sizeId, quantity: 1 }];
    });
  };

  const handleUpdateQty = (productId: string, sizeId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.productId === productId && item.sizeId === sizeId) {
            return { ...item, quantity: item.quantity + delta };
          }
          return item;
        })
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemove = (productId: string, sizeId: string) => {
    setCart((prev) =>
      prev.filter(
        (item) => !(item.productId === productId && item.sizeId === sizeId)
      )
    );
  };

  const handleClear = () => {
    setCart([]);
  };

  const totalCartItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-cream-50 text-noir-900">
      <Navbar
        lang={lang}
        setLang={setLang}
        cartCount={totalCartItems}
        onOpenCart={() => setCartOpen(true)}
      />

      <main className="flex-1">
        <Hero lang={lang} />
        <AboutElianne lang={lang} />
        <CatalogSection lang={lang} onAddToCart={handleAddToCart} />
        <EventsShowcase lang={lang} />
        <HowToOrder lang={lang} />
        <GallerySection lang={lang} />
        <QuoteFormSection lang={lang} />
      </main>

      <Footer lang={lang} />

      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        lang={lang}
        cart={cart}
        onUpdateQty={handleUpdateQty}
        onRemove={handleRemove}
        onClear={handleClear}
      />
    </div>
  );
};

export default App;
