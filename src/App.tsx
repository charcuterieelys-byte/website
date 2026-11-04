import React, { useState } from 'react';
import { Language, Product } from './types/catalog';
import { StudioEnvironment } from './components/StudioEnvironment';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ImmersiveCollection } from './components/ImmersiveCollection';
import { MadeForGathering } from './components/MadeForGathering';
import { TheElysExperience } from './components/TheElysExperience';
import { CustomOrdersSection } from './components/CustomOrdersSection';
import { Footer } from './components/Footer';
import { OrderInquiryModal } from './components/OrderInquiryModal';

export function App() {
  const [lang, setLang] = useState<Language>('en');
  const [orderModalOpen, setOrderModalOpen] = useState(false);
  const [selectedInquiry, setSelectedInquiry] = useState<string | undefined>(
    undefined
  );

  const handleToggleLang = () => {
    setLang((prev) => (prev === 'en' ? 'es' : 'en'));
  };

  const handleOpenOrder = (selection?: string) => {
    setSelectedInquiry(selection);
    setOrderModalOpen(true);
  };

  const handleOrderProduct = (product: Product) => {
    setSelectedInquiry(`${product.id} — ${product.name[lang]}`);
    setOrderModalOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-[#E7D095] text-[#4A120E] selection:bg-[#841F17]/20 selection:text-[#841F17]">
      {/* ONE FIXED GLOBAL 3D STUDIO BACKGROUND */}
      <StudioEnvironment />

      {/* MINIMAL FLOATING STUDIO NAVIGATION */}
      <Navbar
        lang={lang}
        onToggleLang={handleToggleLang}
        onOpenOrderModal={() => handleOpenOrder()}
      />

      {/* CONTINUOUS CINEMATIC EXPERIENCE */}
      <main className="relative z-10">
        {/* 1. HERO EXPERIENCE */}
        <Hero lang={lang} onOpenOrderModal={() => handleOpenOrder()} />

        {/* 2. IMMERSIVE PINNED 3D PRODUCT COLLECTION (01–07) */}
        <ImmersiveCollection
          lang={lang}
          onOrderProduct={handleOrderProduct}
        />

        {/* 3. MADE FOR GATHERING (OCCASIONS) */}
        <MadeForGathering
          lang={lang}
          onSelectOccasion={(occasionTitle) => handleOpenOrder(occasionTitle)}
        />

        {/* 4. THE ELYS EXPERIENCE (BRAND STORY) */}
        <TheElysExperience lang={lang} />

        {/* 5. CUSTOM ORDERS */}
        <CustomOrdersSection
          lang={lang}
          onOpenOrderModal={() => handleOpenOrder('Custom Charcuterie Experience')}
        />
      </main>

      {/* 6. COMPLETE EDITORIAL STUDIO FOOTER */}
      <Footer
        lang={lang}
        onOpenOrderModal={(selection) => handleOpenOrder(selection)}
      />

      {/* ORDER / CONCIERGE DRAWER */}
      <OrderInquiryModal
        isOpen={orderModalOpen}
        onClose={() => setOrderModalOpen(false)}
        lang={lang}
        initialSelection={selectedInquiry}
      />
    </div>
  );
}

export default App;
