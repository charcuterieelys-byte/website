import React, { useState, useEffect } from 'react';
import { CmsState, Language, Product } from './types/catalog';
import { BRAND_CONFIG } from './data/catalog';
import { StudioEnvironment } from './components/StudioEnvironment';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ImmersiveCollection } from './components/ImmersiveCollection';
import { GallerySection } from './components/GallerySection';
import { MadeForGathering } from './components/MadeForGathering';
import { TheElysExperience } from './components/TheElysExperience';
import { CustomOrdersSection } from './components/CustomOrdersSection';
import { Footer } from './components/Footer';
import { OrderInquiryModal } from './components/OrderInquiryModal';
import { AdminPanelModal } from './components/AdminPanelModal';
import {
  fetchCloudCmsState,
  loadLocalCmsState,
} from './utils/cmsStore';

export function App() {
  const [lang, setLang] = useState<Language>('es');
  const [cmsState, setCmsState] = useState<CmsState>(() => loadLocalCmsState());
  const [orderModalOpen, setOrderModalOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [selectedInquiry, setSelectedInquiry] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  // Fetch latest published CMS state from cloud on load
  useEffect(() => {
    let active = true;
    fetchCloudCmsState().then((cloudState) => {
      if (active && cloudState) {
        setCmsState(cloudState);
      }
    });
    return () => {
      active = false;
    };
  }, []);

  // Handle URL parameters (?payment=success, ?admin=1, #admin)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    let shouldCleanUrl = false;

    if (params.get('payment') === 'success') {
      setPaymentSuccess(true);
      shouldCleanUrl = true;
    }

    if (params.get('admin') === '1' || window.location.hash === '#admin') {
      setAdminOpen(true);
      shouldCleanUrl = true;
    }

    if (shouldCleanUrl) {
      window.history.replaceState({}, '', window.location.pathname);
    }

    const handleHashChange = () => {
      if (window.location.hash === '#admin') {
        setAdminOpen(true);
        window.history.replaceState({}, '', window.location.pathname);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    if (!paymentSuccess) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setPaymentSuccess(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [paymentSuccess]);

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

        {/* 2. IMMERSIVE PINNED 3D PRODUCT COLLECTION */}
        <ImmersiveCollection
          lang={lang}
          products={cmsState.products}
          onOrderProduct={handleOrderProduct}
        />

        {/* 3. CURATED PHOTO GALLERY */}
        <GallerySection
          lang={lang}
          items={cmsState.gallery}
          onInquireItem={(itemTitle) => handleOpenOrder(itemTitle)}
        />

        {/* 4. MADE FOR GATHERING (OCCASIONS) */}
        <MadeForGathering
          lang={lang}
          onSelectOccasion={(occasionTitle) => handleOpenOrder(occasionTitle)}
        />

        {/* 5. THE ELYS EXPERIENCE (BRAND STORY) */}
        <TheElysExperience lang={lang} />

        {/* 6. CUSTOM ORDERS */}
        <CustomOrdersSection
          lang={lang}
          onOpenOrderModal={() =>
            handleOpenOrder('Custom Charcuterie Experience')
          }
        />
      </main>

      {/* 7. COMPLETE EDITORIAL STUDIO FOOTER */}
      <Footer
        lang={lang}
        products={cmsState.products}
        brandConfig={cmsState.brandConfig}
        onOpenOrderModal={(selection) => handleOpenOrder(selection)}
        onOpenAdmin={() => setAdminOpen(true)}
      />

      {/* ORDER / CONCIERGE DRAWER */}
      <OrderInquiryModal
        isOpen={orderModalOpen}
        onClose={() => setOrderModalOpen(false)}
        lang={lang}
        products={cmsState.products}
        brandConfig={cmsState.brandConfig}
        initialSelection={selectedInquiry}
      />

      {/* ADMIN PANEL MODAL */}
      <AdminPanelModal
        isOpen={adminOpen}
        onClose={() => setAdminOpen(false)}
        cmsState={cmsState}
        onUpdateCmsState={setCmsState}
      />

      {/* STRIPE PAYMENT CONFIRMATION MODAL */}
      {paymentSuccess && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="stripe-confirmed-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#4A120E]/60 backdrop-blur-md p-6"
          onClick={() => setPaymentSuccess(false)}
        >
          <div
            className="max-w-md w-full bg-[#FAF5E8] border border-[#841F17]/30 p-8 sm:p-10 text-center space-y-5 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-[10px] font-semibold tracking-[0.28em] uppercase text-[#841F17]">
              {lang === 'en'
                ? 'ORDER CONFIRMED · STRIPE'
                : 'PAGO CONFIRMADO · STRIPE'}
            </p>
            <h3
              id="stripe-confirmed-title"
              className="font-serif text-3xl text-[#841F17]"
            >
              {lang === 'en'
                ? 'Thank you for your order.'
                : 'Gracias por tu pedido.'}
            </h3>
            <p className="text-sm text-[#4A120E]/90 leading-relaxed">
              {lang === 'en'
                ? 'Your payment has been received. Elianne will prepare your charcuterie experience fresh to order in Louisville, KY.'
                : 'Hemos recibido tu pago correctamente. Elianne preparará tu pedido fresco y a medida en Louisville, KY.'}
            </p>
            <div className="pt-2 flex flex-col gap-3">
              <a
                href={`https://wa.me/${
                  cmsState.brandConfig.whatsappNumber ||
                  BRAND_CONFIG.whatsappNumber
                }?text=${encodeURIComponent(
                  lang === 'en'
                    ? 'Hello Ely’s Charcuterie! I just completed my order payment via Stripe and wanted to confirm my delivery/pickup details.'
                    : '¡Hola Ely’s Charcuterie! Acabo de realizar el pago de mi pedido por Stripe y quería confirmar los detalles de entrega.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 bg-[#841F17] hover:bg-[#63150F] text-[#FAF5E8] text-xs font-semibold tracking-[0.22em] uppercase transition-colors"
              >
                {lang === 'en'
                  ? 'CONFIRM DETAILS ON WHATSAPP'
                  : 'CONFIRMAR DETALLES POR WHATSAPP'}
              </a>
              <button
                type="button"
                onClick={() => setPaymentSuccess(false)}
                className="w-full py-2.5 text-xs font-semibold tracking-[0.2em] uppercase text-[#841F17]/80 hover:text-[#841F17]"
              >
                {lang === 'en' ? 'CLOSE' : 'CERRAR'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
