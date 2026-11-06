import { CmsState, Product, GalleryItem, BrandConfigData, Language } from '../types/catalog';
import { PRODUCTS, INITIAL_GALLERY, BRAND_CONFIG } from '../data/catalog';

const CMS_SCHEMA_VERSION = 2;
const STORAGE_KEY = 'elys_cms_state_v2';
const ADMIN_PASS_KEY = 'elys_admin_pass_v1';

const REPO_OWNER = 'charcuterieelys-byte';
const REPO_NAME = 'website';
const CMS_BRANCH = 'cms-data';
const CMS_FILE_PATH = 'cms-state.json';

export type StripePaymentMode = 'full' | 'deposit50';

export function isSafeHttpsUrl(url?: string): boolean {
  return Boolean(url && /^https:\/\//i.test(url.trim()));
}

export function extractNumericUsd(priceStr?: string): number | null {
  if (!priceStr) return null;
  const str = String(priceStr).trim();
  const dollarMatch = str.match(/\$\s*(\d+(?:\.\d{1,2})?)/);
  if (dollarMatch) {
    const val = Number(dollarMatch[1]);
    return Number.isFinite(val) && val > 0 ? val : null;
  }
  const endMatch = str.match(/(\d+(?:\.\d{1,2})?)\s*(?:USD)?$/i);
  if (endMatch) {
    const val = Number(endMatch[1]);
    return Number.isFinite(val) && val > 0 ? val : null;
  }
  return null;
}

export function formatHalfUsdPrice(priceStr?: string): string | null {
  const numeric = extractNumericUsd(priceStr);
  if (!numeric) return null;
  const half = Math.round(numeric * 50) / 100;
  return Number.isInteger(half) ? `$${half}` : `$${half.toFixed(2)}`;
}

export function getDefaultCmsState(): CmsState {
  return {
    version: CMS_SCHEMA_VERSION,
    updatedAt: new Date(0).toISOString(),
    products: JSON.parse(JSON.stringify(PRODUCTS)) as Product[],
    gallery: JSON.parse(JSON.stringify(INITIAL_GALLERY)) as GalleryItem[],
    brandConfig: JSON.parse(JSON.stringify(BRAND_CONFIG)) as BrandConfigData,
  };
}

export function loadLocalCmsState(): CmsState {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return getDefaultCmsState();
    const parsed = JSON.parse(raw) as Partial<CmsState>;
    if (
      !Array.isArray(parsed.products) ||
      !Array.isArray(parsed.gallery) ||
      (parsed.version || 1) < CMS_SCHEMA_VERSION
    ) {
      return getDefaultCmsState();
    }
    return {
      version: parsed.version || CMS_SCHEMA_VERSION,
      updatedAt: parsed.updatedAt || new Date().toISOString(),
      products: parsed.products,
      gallery: parsed.gallery,
      brandConfig: {
        ...BRAND_CONFIG,
        ...(parsed.brandConfig || {}),
      },
    };
  } catch {
    return getDefaultCmsState();
  }
}

export function saveLocalCmsState(state: CmsState): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Ignore storage quota errors
  }
}

export function getStoredAdminPassword(): string {
  try {
    return window.localStorage.getItem(ADMIN_PASS_KEY) || 'elys2026';
  } catch {
    return 'elys2026';
  }
}

export function setStoredAdminPassword(newPass: string): void {
  try {
    window.localStorage.setItem(ADMIN_PASS_KEY, newPass.trim());
  } catch {
    // Ignore
  }
}

/**
 * Fetches the latest CMS state from the public GitHub cms-data branch (or /api/cms).
 */
export async function fetchCloudCmsState(): Promise<CmsState | null> {
  try {
    const apiRes = await fetch(`/api/cms?t=${Date.now()}`, {
      cache: 'no-store',
    });
    if (apiRes.ok) {
      const data = (await apiRes.json()) as Partial<CmsState>;
      if (
        Array.isArray(data.products) &&
        Array.isArray(data.gallery) &&
        (data.version || 1) >= CMS_SCHEMA_VERSION
      ) {
        const merged: CmsState = {
          version: data.version || CMS_SCHEMA_VERSION,
          updatedAt: data.updatedAt || new Date().toISOString(),
          products: data.products,
          gallery: data.gallery,
          brandConfig: {
            ...BRAND_CONFIG,
            ...(data.brandConfig || {}),
          },
        };
        saveLocalCmsState(merged);
        return merged;
      }
    }
  } catch {
    // Fallback to raw.githubusercontent.com
  }

  try {
    const rawUrl = `https://raw.githubusercontent.com/${REPO_OWNER}/${REPO_NAME}/${CMS_BRANCH}/${CMS_FILE_PATH}?t=${Date.now()}`;
    const rawRes = await fetch(rawUrl, { cache: 'no-store' });
    if (rawRes.ok) {
      const data = (await rawRes.json()) as Partial<CmsState>;
      if (
        Array.isArray(data.products) &&
        Array.isArray(data.gallery) &&
        (data.version || 1) >= CMS_SCHEMA_VERSION
      ) {
        const merged: CmsState = {
          version: data.version || CMS_SCHEMA_VERSION,
          updatedAt: data.updatedAt || new Date().toISOString(),
          products: data.products,
          gallery: data.gallery,
          brandConfig: {
            ...BRAND_CONFIG,
            ...(data.brandConfig || {}),
          },
        };
        saveLocalCmsState(merged);
        return merged;
      }
    }
  } catch {
    // Ignore network errors
  }
  return null;
}

/**
 * Publishes the updated CmsState to the cloud via /api/cms
 * (which also automatically syncs any changed prices to Stripe)
 * and always saves immediately to localStorage.
 */
export async function publishCmsState(
  state: CmsState,
  adminPassword: string,
  previousProducts?: Product[]
): Promise<{
  syncedToCloud: boolean;
  stripeSyncedCount: number;
  state: CmsState;
  message: string;
}> {
  const updatedState: CmsState = {
    ...state,
    updatedAt: new Date().toISOString(),
  };

  saveLocalCmsState(updatedState);

  try {
    const apiRes = await fetch('/api/cms', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'save_state',
        adminPassword,
        state: updatedState,
        previousProducts,
      }),
    });

    if (apiRes.ok) {
      const data = (await apiRes.json()) as {
        cloudSaved?: boolean;
        stripeSyncedCount?: number;
        state?: CmsState;
      };
      const finalState = data.state || updatedState;
      saveLocalCmsState(finalState);
      const stripeCount = data.stripeSyncedCount || 0;
      const stripeNote =
        stripeCount > 0
          ? ` (${stripeCount} precio${stripeCount > 1 ? 's' : ''} actualizado${stripeCount > 1 ? 's' : ''} automáticamente en Stripe)`
          : '';

      if (data.cloudSaved !== false) {
        return {
          syncedToCloud: true,
          stripeSyncedCount: stripeCount,
          state: finalState,
          message: `Cambios publicados en la nube para todos los visitantes${stripeNote}.`,
        };
      }
      return {
        syncedToCloud: false,
        stripeSyncedCount: stripeCount,
        state: finalState,
        message: `Cambios guardados${stripeNote}. Configura GITHUB_CMS_TOKEN en Vercel para sincronización global en la nube.`,
      };
    }
  } catch {
    // Offline fallback
  }

  return {
    syncedToCloud: false,
    stripeSyncedCount: 0,
    state: updatedState,
    message:
      'Cambios guardados y activos. Configura GITHUB_CMS_TOKEN y STRIPE_SECRET_KEY en Vercel para sincronización global.',
  };
}

/**
 * Initiates a dynamic Stripe Checkout session with the latest price stored in the CMS
 * (either 100% full payment or 50% reservation deposit),
 * falling back seamlessly to the product's static Stripe Payment Link if needed.
 */
export async function startStripeCheckout(
  product: Product,
  lang: Language,
  options?: {
    paymentMode?: StripePaymentMode;
    customerEmail?: string;
  }
): Promise<void> {
  const paymentMode: StripePaymentMode = options?.paymentMode || 'full';
  const customerEmail = options?.customerEmail;
  const fallbackUrl = isSafeHttpsUrl(product.stripePaymentLink)
    ? product.stripePaymentLink!
    : BRAND_CONFIG.stripeCustomQuoteLink;

  try {
    const res = await fetch('/api/stripe-checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        productId: product.id,
        productSlug: product.slug,
        lang,
        paymentMode,
        customerEmail,
      }),
    });
    if (res.ok) {
      const data = (await res.json()) as { url?: string };
      if (data.url && isSafeHttpsUrl(data.url)) {
        window.location.href = data.url;
        return;
      }
    }
  } catch {
    // Fallback to static payment link
  }

  window.location.href = fallbackUrl;
}

/**
 * Compresses an uploaded image file to WebP/JPEG (max 1400px) and uploads it via /api/cms
 * (or returns a compact data URL fallback).
 */
export async function compressAndUploadImage(
  file: File,
  adminPassword: string
): Promise<string> {
  const { base64Data, dataUrl, ext } = await compressImageFile(file, 1400, 0.84);
  const safeBase = file.name.replace(/\.[^/.]+$/, '').replace(/[^a-zA-Z0-9_-]/g, '_');
  const filename = `${safeBase}.${ext}`;

  try {
    const res = await fetch('/api/cms', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'upload_image',
        adminPassword,
        filename,
        base64Content: base64Data,
      }),
    });
    if (res.ok) {
      const data = (await res.json()) as { url?: string };
      if (data.url) return data.url;
    }
  } catch {
    // Fallback to compressed dataUrl
  }

  return dataUrl;
}

function compressImageFile(
  file: File,
  maxDim: number,
  quality: number
): Promise<{ base64Data: string; dataUrl: string; ext: string }> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('No se pudo leer el archivo de imagen'));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error('Formato de imagen inválido'));
      img.onload = () => {
        let width = img.width;
        let height = img.height;
        if (width > maxDim || height > maxDim) {
          if (width >= height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('No se pudo inicializar el lienzo de compresión'));
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);

        let dataUrl = canvas.toDataURL('image/webp', quality);
        let ext = 'webp';
        if (!dataUrl.startsWith('data:image/webp')) {
          dataUrl = canvas.toDataURL('image/jpeg', quality);
          ext = 'jpg';
        }
        const base64Data = dataUrl.split(',')[1] || '';
        resolve({ base64Data, dataUrl, ext });
      };
      img.src = String(reader.result);
    };
    reader.readAsDataURL(file);
  });
}
