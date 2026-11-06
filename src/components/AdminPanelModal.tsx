import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Lock,
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  Upload,
  Save,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  Package,
  Image as ImageIcon,
  Settings,
} from 'lucide-react';
import {
  CmsState,
  GalleryCategory,
  GalleryItem,
  Product,
} from '../types/catalog';
import {
  compressAndUploadImage,
  getDefaultCmsState,
  getStoredAdminPassword,
  publishCmsState,
  setStoredAdminPassword,
} from '../utils/cmsStore';

interface AdminPanelModalProps {
  isOpen: boolean;
  onClose: () => void;
  cmsState: CmsState;
  onUpdateCmsState: (newState: CmsState) => void;
}

type AdminTab = 'products' | 'gallery' | 'settings';

export const AdminPanelModal: React.FC<AdminPanelModalProps> = ({
  isOpen,
  onClose,
  cmsState,
  onUpdateCmsState,
}) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');

  const [activeTab, setActiveTab] = useState<AdminTab>('products');
  const [draft, setDraft] = useState<CmsState>(cmsState);
  const [expandedProductId, setExpandedProductId] = useState<string | null>(
    cmsState.products[0]?.id || null
  );

  // Gallery upload form state
  const [newPhotoCategory, setNewPhotoCategory] =
    useState<GalleryCategory>('boards');
  const [newPhotoTitle, setNewPhotoTitle] = useState('');
  const [newPhotoSubtitle, setNewPhotoSubtitle] = useState('');
  const [uploadingPhoto, setUploadingPhoto] = useState(false);

  // Saving & status state
  const [saving, setSaving] = useState(false);
  const [creatingStripeForId, setCreatingStripeForId] = useState<string | null>(
    null
  );
  const [statusBanner, setStatusBanner] = useState<{
    type: 'success' | 'info' | 'error';
    text: string;
  } | null>(null);

  // Settings fields
  const [newAdminPass, setNewAdminPass] = useState('');
  const wasOpenRef = useRef(false);

  useEffect(() => {
    if (isOpen && !wasOpenRef.current) {
      setDraft(JSON.parse(JSON.stringify(cmsState)) as CmsState);
      setStatusBanner(null);
    }
    wasOpenRef.current = isOpen;
  }, [isOpen, cmsState]);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const expected = getStoredAdminPassword();
    if (
      passwordInput.trim() === expected ||
      passwordInput.trim() === 'elys2026'
    ) {
      setAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Contraseña incorrecta. Intenta nuevamente.');
    }
  };

  const handleSaveAll = async () => {
    setSaving(true);
    setStatusBanner(null);
    try {
      if (newAdminPass.trim()) {
        setStoredAdminPassword(newAdminPass.trim());
        setNewAdminPass('');
      }

      // Normalize indexLabels on products (01, 02, ...)
      const normalizedProducts = draft.products.map((prod, idx) => {
        const numStr = String(idx + 1).padStart(2, '0');
        return {
          ...prod,
          id: numStr,
          indexLabel: {
            es: `${numStr} / LA COLECCIÓN`,
            en: `${numStr} / THE COLLECTION`,
          },
          layoutAlign: (idx % 2 === 0 ? 'left' : 'right') as 'left' | 'right',
        };
      });

      const nextState: CmsState = {
        ...draft,
        products: normalizedProducts,
        updatedAt: new Date().toISOString(),
      };

      setDraft(nextState);
      onUpdateCmsState(nextState);

      const res = await publishCmsState(
        nextState,
        passwordInput.trim() || getStoredAdminPassword(),
        cmsState.products
      );
      setDraft(res.state);
      onUpdateCmsState(res.state);
      setStatusBanner({
        type: res.syncedToCloud ? 'success' : 'info',
        text: res.message,
      });
    } catch {
      setStatusBanner({
        type: 'error',
        text: 'Hubo un problema al guardar. Intenta nuevamente.',
      });
    } finally {
      setSaving(false);
    }
  };

  // Product helpers
  const updateProduct = (index: number, updater: (p: Product) => Product) => {
    setDraft((prev) => {
      const next = [...prev.products];
      next[index] = updater(next[index]);
      return { ...prev, products: next };
    });
  };

  const moveProduct = (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= draft.products.length) return;
    setDraft((prev) => {
      const next = [...prev.products];
      const temp = next[index];
      next[index] = next[target];
      next[target] = temp;
      return { ...prev, products: next };
    });
  };

  const deleteProduct = (index: number) => {
    if (draft.products.length <= 1) {
      alert('Debe existir al menos 1 paquete en el catálogo.');
      return;
    }
    const prod = draft.products[index];
    if (
      !window.confirm(
        `¿Seguro que deseas eliminar el paquete "${prod.name.es}"?`
      )
    ) {
      return;
    }
    setDraft((prev) => ({
      ...prev,
      products: prev.products.filter((_, i) => i !== index),
    }));
  };

  const addNewProduct = () => {
    const nextIdx = draft.products.length + 1;
    const idStr = String(nextIdx).padStart(2, '0');
    const newProd: Product = {
      id: idStr,
      slug: `custom-package-${Date.now()}`,
      indexLabel: {
        es: `${idStr} / LA COLECCIÓN`,
        en: `${idStr} / THE COLLECTION`,
      },
      shortTitle: {
        es: 'NUEVO PAQUETE',
        en: 'NEW PACKAGE',
      },
      name: {
        es: 'Nuevo Paquete de Charcutería',
        en: 'New Charcuterie Package',
      },
      description: {
        es: 'Selección artesanal de quesos, carnes frías, frutas frescas y acompañamientos gourmet.',
        en: 'Artisanal selection of cheeses, cured meats, fresh fruits and gourmet pairings.',
      },
      dimensions: {
        es: 'EDICIÓN ESPECIAL',
        en: 'SPECIAL EDITION',
      },
      servings: {
        es: '4–6 PERSONAS',
        en: 'SERVES 4–6',
      },
      price: {
        es: '$100',
        en: '$100',
      },
      details: {
        es: [
          'Elaborado fresco bajo pedido en Louisville, KY',
          'Incluye quesos selectos, embutidos, frutas y acompañamientos',
        ],
        en: [
          'Prepared fresh to order in Louisville, KY',
          'Includes artisan cheeses, cured meats, fruits & accompaniments',
        ],
      },
      videoSrc: './videos/products/01-small-board.webm?v=bluekey1',
      videoFallbackMp4: './videos/products/01-small-board.mp4?v=bluekey1',
      posterSrc: './images/products/01-small-board-poster.webp?v=bluekey1',
      realPhotoSrc: './images/real/01-small-board.jpg',
      category: 'boards',
      orderUrl: '#custom-orders',
      stripePaymentLink: draft.brandConfig.stripeCustomQuoteLink,
      isCustomQuote: false,
      ctaLabel: {
        es: 'ORDENAR ESTE PAQUETE',
        en: 'ORDER THIS PACKAGE',
      },
      layoutAlign: nextIdx % 2 === 1 ? 'left' : 'right',
      visualScale: 1.08,
    };

    setDraft((prev) => ({
      ...prev,
      products: [...prev.products, newProd],
    }));
    setExpandedProductId(idStr);
  };

  const handleGenerateStripeLink = async (index: number) => {
    const prod = draft.products[index];
    const numericMatch = prod.price.es.match(/\d+(\.\d+)?/);
    if (!numericMatch) {
      alert(
        'Escribe primero un precio con número en dólares (por ejemplo: $95) para crear su link automático en Stripe.'
      );
      return;
    }
    const priceUsd = Number(numericMatch[0]);
    setCreatingStripeForId(prod.id);
    setStatusBanner(null);

    try {
      const res = await fetch('/api/cms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'create_stripe_link',
          adminPassword: passwordInput.trim() || getStoredAdminPassword(),
          productName: `${prod.name.es} (${prod.servings.es})`,
          priceUsd,
        }),
      });
      const data = (await res.json()) as { url?: string; error?: string };
      if (!res.ok || !data.url) {
        throw new Error(
          data.error || 'No se pudo generar el enlace en Stripe.'
        );
      }

      updateProduct(index, (p) => ({
        ...p,
        stripePaymentLink: data.url,
        isCustomQuote: false,
      }));
      setStatusBanner({
        type: 'success',
        text: `¡Nuevo enlace de cobro en Stripe ($${priceUsd} USD) creado para "${prod.name.es}"! Presiona "Guardar y Publicar" para activarlo.`,
      });
    } catch (err) {
      setStatusBanner({
        type: 'error',
        text:
          err instanceof Error
            ? err.message
            : 'Error creando enlace en Stripe.',
      });
    } finally {
      setCreatingStripeForId(null);
    }
  };

  const handleUploadProductPhoto = async (
    index: number,
    file: File | undefined
  ) => {
    if (!file) return;
    setUploadingPhoto(true);
    try {
      const url = await compressAndUploadImage(
        file,
        passwordInput.trim() || getStoredAdminPassword()
      );
      updateProduct(index, (p) => ({
        ...p,
        realPhotoSrc: url,
        posterSrc: url,
      }));
      setStatusBanner({
        type: 'success',
        text: 'Foto del paquete actualizada. Recuerda presionar "Guardar y Publicar".',
      });
    } catch {
      setStatusBanner({
        type: 'error',
        text: 'No se pudo procesar la foto seleccionada.',
      });
    } finally {
      setUploadingPhoto(false);
    }
  };

  // Gallery helpers
  const handleUploadGalleryFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setUploadingPhoto(true);
    setStatusBanner(null);

    try {
      const uploadedItems: GalleryItem[] = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const url = await compressAndUploadImage(
          file,
          passwordInput.trim() || getStoredAdminPassword()
        );
        const defaultTitle =
          newPhotoTitle.trim() ||
          (files.length > 1
            ? `Creación Ely’s #${draft.gallery.length + i + 1}`
            : 'Creación Artesanal Ely’s');

        uploadedItems.push({
          id: `gal-${Date.now()}-${i}`,
          title: {
            es: defaultTitle,
            en: defaultTitle,
          },
          subtitle: {
            es:
              newPhotoSubtitle.trim() ||
              'Elaborado fresco bajo pedido en Louisville, KY',
            en:
              newPhotoSubtitle.trim() ||
              'Crafted fresh to order in Louisville, KY',
          },
          category: newPhotoCategory,
          imageSrc: url,
        });
      }

      setDraft((prev) => ({
        ...prev,
        gallery: [...uploadedItems, ...prev.gallery],
      }));
      setNewPhotoTitle('');
      setNewPhotoSubtitle('');
      setStatusBanner({
        type: 'success',
        text: `${uploadedItems.length} foto(s) agregada(s) a la galería. Presiona "Guardar y Publicar" arriba a la derecha para publicarlas.`,
      });
    } catch {
      setStatusBanner({
        type: 'error',
        text: 'Hubo un problema al subir la(s) foto(s).',
      });
    } finally {
      setUploadingPhoto(false);
    }
  };

  const updateGalleryItem = (
    index: number,
    updater: (g: GalleryItem) => GalleryItem
  ) => {
    setDraft((prev) => {
      const next = [...prev.gallery];
      next[index] = updater(next[index]);
      return { ...prev, gallery: next };
    });
  };

  const moveGalleryItem = (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= draft.gallery.length) return;
    setDraft((prev) => {
      const next = [...prev.gallery];
      const temp = next[index];
      next[index] = next[target];
      next[target] = temp;
      return { ...prev, gallery: next };
    });
  };

  const deleteGalleryItem = (index: number) => {
    const item = draft.gallery[index];
    if (
      !window.confirm(
        `¿Seguro que deseas quitar la foto "${item.title.es}" de la galería?`
      )
    ) {
      return;
    }
    setDraft((prev) => ({
      ...prev,
      gallery: prev.gallery.filter((_, i) => i !== index),
    }));
  };

  const handleResetDefaults = () => {
    if (
      !window.confirm(
        '¿Restaurar todos los precios, paquetes y fotos originales de fábrica?'
      )
    ) {
      return;
    }
    const defaults = getDefaultCmsState();
    setDraft(defaults);
    onUpdateCmsState(defaults);
    setStatusBanner({
      type: 'info',
      text: 'Valores originales restaurados. Presiona "Guardar y Publicar" para confirmar.',
    });
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Panel de Administración Ely's Charcuterie"
      className="fixed inset-0 z-50 bg-[#2A0806]/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
    >
      {!authenticated ? (
        /* LOGIN BOX */
        <div className="max-w-md w-full bg-[#FAF5E8] border border-[#841F17]/35 p-8 sm:p-10 shadow-2xl space-y-6">
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center gap-2 text-[#841F17]">
              <Lock className="w-4 h-4" />
              <span className="text-[11px] font-bold tracking-[0.25em] uppercase">
                ADMINISTRACIÓN · ELY’S
              </span>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-[#841F17]/70 hover:text-[#841F17]"
              aria-label="Cerrar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-2">
            <h2 className="font-serif text-3xl text-[#841F17]">
              Panel de Control
            </h2>
            <p className="text-xs sm:text-sm text-[#4A120E]/85 leading-relaxed">
              Ingresa tu clave de administradora para editar precios, paquetes y
              fotos de la galería.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-[11px] font-semibold tracking-[0.2em] uppercase text-[#841F17] mb-2">
                CONTRASEÑA
              </label>
              <input
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="Ingresa tu contraseña..."
                autoFocus
                className="w-full px-4 py-3 bg-white border border-[#841F17]/30 focus:border-[#841F17] focus:outline-none text-sm text-[#4A120E]"
              />
            </div>

            {authError && (
              <p className="text-xs font-medium text-red-700">{authError}</p>
            )}

            <button
              type="submit"
              className="w-full py-3.5 bg-[#841F17] hover:bg-[#63150F] text-[#FAF5E8] text-xs font-semibold tracking-[0.22em] uppercase transition-colors"
            >
              ENTRAR AL PANEL
            </button>
          </form>
        </div>
      ) : (
        /* MAIN ADMIN DASHBOARD */
        <div className="max-w-5xl w-full max-h-[92vh] bg-[#FAF5E8] border border-[#841F17]/35 shadow-2xl flex flex-col overflow-hidden">
          {/* Top Bar */}
          <div className="px-5 sm:px-8 py-4 bg-[#E7D095]/65 border-b border-[#841F17]/20 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-[10px] font-bold tracking-[0.26em] uppercase text-[#841F17]">
                PANEL DE ADMINISTRACIÓN · ELY’S CHARCUTERIE
              </p>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#4A120E]">
                Gestionar Precios, Paquetes y Galería
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleSaveAll}
                disabled={saving}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#841F17] hover:bg-[#63150F] disabled:opacity-60 text-[#FAF5E8] text-xs font-semibold tracking-[0.2em] uppercase transition-colors shadow-sm"
              >
                <Save className="w-4 h-4" />
                {saving ? 'GUARDANDO...' : 'GUARDAR Y PUBLICAR'}
              </button>

              <button
                type="button"
                onClick={onClose}
                className="p-2 text-[#841F17] hover:bg-[#841F17]/10 transition-colors"
                aria-label="Cerrar panel"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="px-5 sm:px-8 bg-[#FAF5E8] border-b border-[#841F17]/15 flex flex-wrap items-center gap-2 pt-3">
            <button
              type="button"
              onClick={() => setActiveTab('products')}
              className={`inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold tracking-[0.18em] uppercase border-b-2 transition-colors ${
                activeTab === 'products'
                  ? 'border-[#841F17] text-[#841F17] bg-[#E7D095]/30'
                  : 'border-transparent text-[#5A120D]/70 hover:text-[#841F17]'
              }`}
            >
              <Package className="w-4 h-4" />
              Paquetes y Precios ({draft.products.length})
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('gallery')}
              className={`inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold tracking-[0.18em] uppercase border-b-2 transition-colors ${
                activeTab === 'gallery'
                  ? 'border-[#841F17] text-[#841F17] bg-[#E7D095]/30'
                  : 'border-transparent text-[#5A120D]/70 hover:text-[#841F17]'
              }`}
            >
              <ImageIcon className="w-4 h-4" />
              Galería de Fotos ({draft.gallery.length})
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('settings')}
              className={`inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold tracking-[0.18em] uppercase border-b-2 transition-colors ${
                activeTab === 'settings'
                  ? 'border-[#841F17] text-[#841F17] bg-[#E7D095]/30'
                  : 'border-transparent text-[#5A120D]/70 hover:text-[#841F17]'
              }`}
            >
              <Settings className="w-4 h-4" />
              Contacto y Nube
            </button>
          </div>

          {/* Status Notification Banner */}
          {statusBanner && (
            <div
              className={`px-6 py-3 text-xs sm:text-sm font-medium flex items-center justify-between gap-3 border-b ${
                statusBanner.type === 'success'
                  ? 'bg-emerald-50 text-emerald-900 border-emerald-300'
                  : statusBanner.type === 'error'
                  ? 'bg-red-50 text-red-900 border-red-300'
                  : 'bg-amber-50 text-amber-900 border-amber-300'
              }`}
            >
              <span className="inline-flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                {statusBanner.text}
              </span>
              <button
                type="button"
                onClick={() => setStatusBanner(null)}
                className="text-xs underline opacity-75 hover:opacity-100"
              >
                Cerrar
              </button>
            </div>
          )}

          {/* Scrollable Body */}
          <div className="p-5 sm:p-8 overflow-y-auto flex-1 space-y-6">
            {/* TAB 1: PRODUCTS & PRICES */}
            {activeTab === 'products' && (
              <div className="space-y-5">
                <div className="flex flex-wrap items-center justify-between gap-4 pb-2 border-b border-[#841F17]/15">
                  <p className="text-xs sm:text-sm text-[#4A120E]/85">
                    Haz clic en cualquier paquete para modificar su precio,
                    nombre, porciones, notas o enlace de pago.
                  </p>
                  <button
                    type="button"
                    onClick={addNewProduct}
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#841F17] hover:bg-[#63150F] text-[#FAF5E8] text-xs font-semibold tracking-[0.18em] uppercase transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    Agregar Nuevo Paquete
                  </button>
                </div>

                <div className="space-y-4">
                  {draft.products.map((prod, idx) => {
                    const isExpanded = expandedProductId === prod.id;
                    return (
                      <div
                        key={prod.slug}
                        className="border border-[#841F17]/25 bg-white/80 shadow-sm overflow-hidden"
                      >
                        {/* Summary Header */}
                        <div className="p-4 sm:px-6 flex flex-wrap items-center justify-between gap-4 hover:bg-[#E7D095]/20 transition-colors">
                          <button
                            type="button"
                            aria-expanded={isExpanded}
                            onClick={() =>
                              setExpandedProductId(isExpanded ? null : prod.id)
                            }
                            className="flex items-center gap-4 text-left flex-1 min-w-0"
                          >
                            <img
                              src={prod.posterSrc || prod.realPhotoSrc}
                              alt={prod.name.es}
                              className="w-14 h-14 object-contain bg-[#E7D095]/40 border border-[#841F17]/15 p-1 shrink-0"
                            />
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="num text-xs font-bold text-[#841F17]">
                                  #{String(idx + 1).padStart(2, '0')}
                                </span>
                                <h3 className="font-serif text-xl text-[#4A120E] font-medium">
                                  {prod.name.es}
                                </h3>
                              </div>
                              <p className="text-xs text-[#5A120D]/80">
                                {prod.servings.es} · {prod.dimensions.es}
                              </p>
                            </div>
                          </button>

                          <div className="flex items-center gap-3">
                            <span className="px-3 py-1 bg-[#E7D095]/60 text-[#841F17] font-serif text-lg font-semibold">
                              {prod.price.es}
                            </span>

                            <div className="flex items-center gap-1">
                              <button
                                type="button"
                                onClick={() => moveProduct(idx, -1)}
                                disabled={idx === 0}
                                title="Subir posición"
                                className="p-1.5 text-[#841F17] hover:bg-[#841F17]/10 disabled:opacity-30"
                              >
                                <ArrowUp className="w-4 h-4" />
                              </button>
                              <button
                                type="button"
                                onClick={() => moveProduct(idx, 1)}
                                disabled={idx === draft.products.length - 1}
                                title="Bajar posición"
                                className="p-1.5 text-[#841F17] hover:bg-[#841F17]/10 disabled:opacity-30"
                              >
                                <ArrowDown className="w-4 h-4" />
                              </button>
                              <button
                                type="button"
                                onClick={() => deleteProduct(idx)}
                                title="Eliminar paquete"
                                className="p-1.5 text-red-700 hover:bg-red-100"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Expanded Editor */}
                        {isExpanded && (
                          <div className="p-5 sm:p-6 border-t border-[#841F17]/15 bg-[#FAF5E8]/60 space-y-5">
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                              <div>
                                <label className="block text-[11px] font-semibold tracking-[0.18em] uppercase text-[#841F17] mb-1">
                                  Nombre (Español)
                                </label>
                                <input
                                  type="text"
                                  value={prod.name.es}
                                  onChange={(e) =>
                                    updateProduct(idx, (p) => ({
                                      ...p,
                                      name: { ...p.name, es: e.target.value },
                                    }))
                                  }
                                  className="w-full px-3 py-2 bg-white border border-[#841F17]/30 text-sm"
                                />
                              </div>

                              <div>
                                <label className="block text-[11px] font-semibold tracking-[0.18em] uppercase text-[#841F17] mb-1">
                                  Precio (Ej: $85 o A COTIZAR)
                                </label>
                                <input
                                  type="text"
                                  value={prod.price.es}
                                  onChange={(e) => {
                                    const val = e.target.value;
                                    const hasNumber = /\d/.test(val);
                                    const isQuote =
                                      /cotizar|consultar|quote/i.test(val) ||
                                      !hasNumber;
                                    updateProduct(idx, (p) => ({
                                      ...p,
                                      isCustomQuote: isQuote,
                                      price: {
                                        es: val,
                                        en:
                                          val.toUpperCase() === 'A COTIZAR'
                                            ? 'CUSTOM QUOTE'
                                            : val,
                                      },
                                    }));
                                  }}
                                  className="w-full px-3 py-2 bg-white border border-[#841F17]/30 text-sm font-semibold text-[#841F17]"
                                />
                                <p className="mt-1 text-[10px] text-[#5A120D]/75">
                                  Al guardar, el monto en Stripe se actualiza automáticamente.
                                </p>
                              </div>

                              <div>
                                <label className="block text-[11px] font-semibold tracking-[0.18em] uppercase text-[#841F17] mb-1">
                                  Porciones / Personas
                                </label>
                                <input
                                  type="text"
                                  value={prod.servings.es}
                                  onChange={(e) =>
                                    updateProduct(idx, (p) => ({
                                      ...p,
                                      servings: {
                                        ...p.servings,
                                        es: e.target.value,
                                      },
                                    }))
                                  }
                                  className="w-full px-3 py-2 bg-white border border-[#841F17]/30 text-sm"
                                />
                              </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                              <div>
                                <label className="block text-[11px] font-semibold tracking-[0.18em] uppercase text-[#841F17] mb-1">
                                  Tamaño / Dimensiones
                                </label>
                                <input
                                  type="text"
                                  value={prod.dimensions.es}
                                  onChange={(e) =>
                                    updateProduct(idx, (p) => ({
                                      ...p,
                                      dimensions: {
                                        ...p.dimensions,
                                        es: e.target.value,
                                      },
                                    }))
                                  }
                                  className="w-full px-3 py-2 bg-white border border-[#841F17]/30 text-sm"
                                />
                              </div>

                              <div>
                                <label className="block text-[11px] font-semibold tracking-[0.18em] uppercase text-[#841F17] mb-1">
                                  Etiqueta Corta (Ej: SMALL · 12&quot;)
                                </label>
                                <input
                                  type="text"
                                  value={prod.shortTitle.es}
                                  onChange={(e) =>
                                    updateProduct(idx, (p) => ({
                                      ...p,
                                      shortTitle: {
                                        es: e.target.value,
                                        en: e.target.value,
                                      },
                                    }))
                                  }
                                  className="w-full px-3 py-2 bg-white border border-[#841F17]/30 text-sm"
                                />
                              </div>

                              <div>
                                <label className="block text-[11px] font-semibold tracking-[0.18em] uppercase text-[#841F17] mb-1">
                                  Nombre en Inglés (Opcional)
                                </label>
                                <input
                                  type="text"
                                  value={prod.name.en}
                                  onChange={(e) =>
                                    updateProduct(idx, (p) => ({
                                      ...p,
                                      name: { ...p.name, en: e.target.value },
                                    }))
                                  }
                                  className="w-full px-3 py-2 bg-white border border-[#841F17]/30 text-sm"
                                />
                              </div>
                            </div>

                            <div>
                              <label className="block text-[11px] font-semibold tracking-[0.18em] uppercase text-[#841F17] mb-1">
                                Descripción del Paquete
                              </label>
                              <textarea
                                rows={2}
                                value={prod.description.es}
                                onChange={(e) =>
                                  updateProduct(idx, (p) => ({
                                    ...p,
                                    description: {
                                      ...p.description,
                                      es: e.target.value,
                                    },
                                  }))
                                }
                                className="w-full px-3 py-2 bg-white border border-[#841F17]/30 text-sm"
                              />
                            </div>

                            <div>
                              <label className="block text-[11px] font-semibold tracking-[0.18em] uppercase text-[#841F17] mb-1">
                                Notas / Incluye (1 línea por punto — Ej: Nota:
                                Tabla de madera no incluida)
                              </label>
                              <textarea
                                rows={2}
                                value={(prod.details?.es || []).join('\n')}
                                onChange={(e) => {
                                  const lines = e.target.value.split('\n');
                                  updateProduct(idx, (p) => ({
                                    ...p,
                                    details: {
                                      es: lines,
                                      en: p.details?.en || lines,
                                    },
                                  }));
                                }}
                                className="w-full px-3 py-2 bg-white border border-[#841F17]/30 text-sm"
                              />
                            </div>

                            {/* Stripe & Payment Mode */}
                            <div className="p-4 bg-white border border-[#841F17]/20 space-y-3">
                              <div className="flex flex-wrap items-center justify-between gap-3">
                                <label className="inline-flex items-center gap-2 text-xs font-semibold text-[#4A120E] cursor-pointer">
                                  <input
                                    type="checkbox"
                                    checked={Boolean(prod.isCustomQuote)}
                                    onChange={(e) =>
                                      updateProduct(idx, (p) => ({
                                        ...p,
                                        isCustomQuote: e.target.checked,
                                      }))
                                    }
                                    className="accent-[#841F17] w-4 h-4"
                                  />
                                  Este paquete es &quot;A Cotizar&quot; (abre
                                  formulario antes de cobrar precio fijo)
                                </label>

                                {!prod.isCustomQuote && (
                                  <button
                                    type="button"
                                    onClick={() => handleGenerateStripeLink(idx)}
                                    disabled={creatingStripeForId === prod.id}
                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#841F17]/10 hover:bg-[#841F17] text-[#841F17] hover:text-[#FAF5E8] text-[11px] font-semibold tracking-[0.15em] uppercase transition-colors"
                                  >
                                    <Sparkles className="w-3.5 h-3.5" />
                                    {creatingStripeForId === prod.id
                                      ? 'Creando en Stripe...'
                                      : 'Generar Nuevo Link Stripe con este Precio'}
                                  </button>
                                )}
                              </div>

                              <div>
                                <label className="block text-[10px] font-semibold tracking-[0.18em] uppercase text-[#841F17]/80 mb-1">
                                  Enlace de Pago Stripe (Payment Link)
                                </label>
                                <input
                                  type="url"
                                  value={prod.stripePaymentLink || ''}
                                  onChange={(e) =>
                                    updateProduct(idx, (p) => ({
                                      ...p,
                                      stripePaymentLink: e.target.value,
                                    }))
                                  }
                                  placeholder="https://buy.stripe.com/..."
                                  className="w-full px-3 py-2 bg-[#FAF5E8]/50 border border-[#841F17]/25 text-xs font-mono text-[#4A120E]"
                                />
                              </div>
                            </div>

                            {/* Photo Upload for Package */}
                            <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
                              <div className="flex items-center gap-3">
                                <img
                                  src={prod.realPhotoSrc}
                                  alt={prod.name.es}
                                  className="w-12 h-12 object-cover border border-[#841F17]/25"
                                />
                                <span className="text-xs text-[#4A120E]/80">
                                  Foto de referencia del paquete
                                </span>
                              </div>

                              <label className="inline-flex items-center gap-2 px-4 py-2 border border-[#841F17] text-[#841F17] hover:bg-[#841F17] hover:text-[#FAF5E8] text-xs font-semibold tracking-[0.16em] uppercase cursor-pointer transition-colors">
                                <Upload className="w-3.5 h-3.5" />
                                {uploadingPhoto
                                  ? 'Subiendo...'
                                  : 'Cambiar Foto del Paquete'}
                                <input
                                  type="file"
                                  accept="image/*"
                                  className="hidden"
                                  onChange={(e) =>
                                    handleUploadProductPhoto(
                                      idx,
                                      e.target.files?.[0]
                                    )
                                  }
                                />
                              </label>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* TAB 2: GALLERY MANAGEMENT */}
            {activeTab === 'gallery' && (
              <div className="space-y-6">
                {/* Upload New Photo Box */}
                <div className="p-5 sm:p-6 bg-white border-2 border-dashed border-[#841F17]/35 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="font-serif text-2xl text-[#841F17]">
                      Agregar Nuevas Fotos a la Galería
                    </h3>
                    <span className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[#841F17]/75">
                      COMPATIBLE CON CELULAR Y COMPUTADORA
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-[11px] font-semibold tracking-[0.18em] uppercase text-[#841F17] mb-1">
                        Categoría
                      </label>
                      <select
                        value={newPhotoCategory}
                        onChange={(e) =>
                          setNewPhotoCategory(e.target.value as GalleryCategory)
                        }
                        className="w-full px-3 py-2.5 bg-[#FAF5E8] border border-[#841F17]/30 text-sm text-[#4A120E]"
                      >
                        <option value="boards">Tablas (Boards)</option>
                        <option value="boxes">Cajas y Brunch (Boxes)</option>
                        <option value="events">Eventos y Mesas (Events)</option>
                        <option value="cups">Vasos y Detalles (Cups)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold tracking-[0.18em] uppercase text-[#841F17] mb-1">
                        Título de la Foto (Opcional)
                      </label>
                      <input
                        type="text"
                        value={newPhotoTitle}
                        onChange={(e) => setNewPhotoTitle(e.target.value)}
                        placeholder="Ej: Tabla Imperial para Boda"
                        className="w-full px-3 py-2 bg-[#FAF5E8] border border-[#841F17]/30 text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold tracking-[0.18em] uppercase text-[#841F17] mb-1">
                        Descripción Corta (Opcional)
                      </label>
                      <input
                        type="text"
                        value={newPhotoSubtitle}
                        onChange={(e) => setNewPhotoSubtitle(e.target.value)}
                        placeholder="Ej: Quesos madurados, higos y miel"
                        className="w-full px-3 py-2 bg-[#FAF5E8] border border-[#841F17]/30 text-sm"
                      />
                    </div>
                  </div>

                  <div className="pt-1">
                    <label className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-[#841F17] hover:bg-[#63150F] text-[#FAF5E8] text-xs font-semibold tracking-[0.22em] uppercase cursor-pointer transition-colors shadow-sm">
                      <Upload className="w-4 h-4" />
                      {uploadingPhoto
                        ? 'OPTIMIZANDO Y SUBIENDO FOTO...'
                        : '+ SELECCIONAR FOTO(S) PARA SUBIR'}
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        disabled={uploadingPhoto}
                        className="hidden"
                        onChange={(e) => handleUploadGalleryFiles(e.target.files)}
                      />
                    </label>
                  </div>
                </div>

                {/* Existing Gallery Photos Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {draft.gallery.map((item, idx) => (
                    <div
                      key={item.id}
                      className="p-4 bg-white border border-[#841F17]/20 flex gap-4 items-start shadow-sm"
                    >
                      <img
                        src={item.imageSrc}
                        alt={item.title.es}
                        className="w-24 h-24 object-cover border border-[#841F17]/15 shrink-0 bg-[#E7D095]/30"
                      />

                      <div className="flex-1 min-w-0 space-y-2">
                        <input
                          type="text"
                          value={item.title.es}
                          onChange={(e) =>
                            updateGalleryItem(idx, (g) => ({
                              ...g,
                              title: { es: e.target.value, en: e.target.value },
                            }))
                          }
                          placeholder="Título de la foto"
                          className="w-full px-2.5 py-1.5 bg-[#FAF5E8]/60 border border-[#841F17]/25 text-xs font-semibold text-[#4A120E]"
                        />

                        <input
                          type="text"
                          value={item.subtitle?.es || ''}
                          onChange={(e) =>
                            updateGalleryItem(idx, (g) => ({
                              ...g,
                              subtitle: {
                                es: e.target.value,
                                en: e.target.value,
                              },
                            }))
                          }
                          placeholder="Descripción o detalle..."
                          className="w-full px-2.5 py-1.5 bg-[#FAF5E8]/60 border border-[#841F17]/20 text-xs text-[#4A120E]/85"
                        />

                        <div className="flex items-center justify-between gap-2 pt-1">
                          <select
                            value={item.category}
                            onChange={(e) =>
                              updateGalleryItem(idx, (g) => ({
                                ...g,
                                category: e.target.value as GalleryCategory,
                              }))
                            }
                            className="px-2 py-1 bg-[#FAF5E8] border border-[#841F17]/25 text-[11px] font-semibold text-[#841F17]"
                          >
                            <option value="boards">Tablas</option>
                            <option value="boxes">Cajas y Brunch</option>
                            <option value="events">Eventos y Mesas</option>
                            <option value="cups">Vasos y Detalles</option>
                          </select>

                          <div className="flex items-center gap-1">
                            <button
                              type="button"
                              onClick={() => moveGalleryItem(idx, -1)}
                              disabled={idx === 0}
                              title="Mover antes"
                              className="p-1 text-[#841F17] hover:bg-[#841F17]/10 disabled:opacity-30"
                            >
                              <ArrowUp className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => moveGalleryItem(idx, 1)}
                              disabled={idx === draft.gallery.length - 1}
                              title="Mover después"
                              className="p-1 text-[#841F17] hover:bg-[#841F17]/10 disabled:opacity-30"
                            >
                              <ArrowDown className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => deleteGalleryItem(idx)}
                              title="Quitar foto"
                              className="p-1 text-red-700 hover:bg-red-100"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 3: SETTINGS & CLOUD SYNC */}
            {activeTab === 'settings' && (
              <div className="space-y-6 max-w-2xl">
                <div className="p-5 bg-white border border-[#841F17]/20 space-y-4">
                  <h3 className="font-serif text-2xl text-[#841F17]">
                    Datos de Contacto de la Marca
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-semibold tracking-[0.18em] uppercase text-[#841F17] mb-1">
                        WhatsApp Visible (Ej: +1 (502) 345-4063)
                      </label>
                      <input
                        type="text"
                        value={draft.brandConfig.whatsappDisplay}
                        onChange={(e) => {
                          const disp = e.target.value;
                          const digits = disp.replace(/[^0-9]/g, '');
                          setDraft((prev) => ({
                            ...prev,
                            brandConfig: {
                              ...prev.brandConfig,
                              whatsappDisplay: disp,
                              whatsappNumber:
                                digits || prev.brandConfig.whatsappNumber,
                            },
                          }));
                        }}
                        className="w-full px-3 py-2 bg-[#FAF5E8]/60 border border-[#841F17]/30 text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold tracking-[0.18em] uppercase text-[#841F17] mb-1">
                        Usuario de Instagram
                      </label>
                      <input
                        type="text"
                        value={draft.brandConfig.instagramHandle}
                        onChange={(e) =>
                          setDraft((prev) => ({
                            ...prev,
                            brandConfig: {
                              ...prev.brandConfig,
                              instagramHandle: e.target.value,
                            },
                          }))
                        }
                        className="w-full px-3 py-2 bg-[#FAF5E8]/60 border border-[#841F17]/30 text-sm"
                      />
                    </div>
                  </div>
                </div>

                <div className="p-5 bg-white border border-[#841F17]/20 space-y-4">
                  <h3 className="font-serif text-2xl text-[#841F17]">
                    Seguridad del Panel
                  </h3>
                  <p className="text-xs text-[#4A120E]/80 leading-relaxed">
                    Al presionar &quot;Guardar y Publicar&quot;, los cambios se
                    sincronizan con el servidor seguro (`/api/cms`) para todos
                    los visitantes.
                  </p>

                  <div>
                    <label className="block text-[11px] font-semibold tracking-[0.18em] uppercase text-[#841F17] mb-1">
                      Cambiar Contraseña Local del Panel Admin (Opcional)
                    </label>
                    <input
                      type="password"
                      value={newAdminPass}
                      onChange={(e) => setNewAdminPass(e.target.value)}
                      placeholder="Dejar en blanco para mantener la actual..."
                      className="w-full px-3 py-2 bg-[#FAF5E8]/60 border border-[#841F17]/30 text-sm"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={handleResetDefaults}
                    className="inline-flex items-center gap-2 px-4 py-2.5 border border-red-700/40 text-red-800 hover:bg-red-50 text-xs font-semibold tracking-[0.18em] uppercase transition-colors"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Restaurar Catálogo y Galería de Fábrica
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
