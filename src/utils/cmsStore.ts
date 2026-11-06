import { CmsState, Product, GalleryItem, BrandConfigData } from '../types/catalog';
import { PRODUCTS, INITIAL_GALLERY, BRAND_CONFIG } from '../data/catalog';

const STORAGE_KEY = 'elys_cms_state_v1';
const ADMIN_PASS_KEY = 'elys_admin_pass_v1';
const CLOUD_TOKEN_KEY = 'elys_cms_cloud_token';
const STRIPE_KEY_STORAGE = 'elys_cms_stripe_key';

const REPO_OWNER = 'charcuterieelys-byte';
const REPO_NAME = 'website';
const CMS_BRANCH = 'cms-data';
const CMS_FILE_PATH = 'cms-state.json';

export function getDefaultCmsState(): CmsState {
  return {
    version: 1,
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
    if (!Array.isArray(parsed.products) || !Array.isArray(parsed.gallery)) {
      return getDefaultCmsState();
    }
    return {
      version: parsed.version || 1,
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

export function getStoredCloudToken(): string {
  try {
    return window.localStorage.getItem(CLOUD_TOKEN_KEY) || '';
  } catch {
    return '';
  }
}

export function setStoredCloudToken(token: string): void {
  try {
    window.localStorage.setItem(CLOUD_TOKEN_KEY, token.trim());
  } catch {
    // Ignore
  }
}

export function getStoredStripeKey(): string {
  try {
    return window.localStorage.getItem(STRIPE_KEY_STORAGE) || '';
  } catch {
    return '';
  }
}

export function setStoredStripeKey(key: string): void {
  try {
    window.localStorage.setItem(STRIPE_KEY_STORAGE, key.trim());
  } catch {
    // Ignore
  }
}

/**
 * Fetches the latest CMS state from the public GitHub cms-data branch (or /api/cms).
 */
export async function fetchCloudCmsState(): Promise<CmsState | null> {
  try {
    const ghUrl = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${CMS_FILE_PATH}?ref=${CMS_BRANCH}&t=${Date.now()}`;
    const res = await fetch(ghUrl, {
      headers: {
        Accept: 'application/vnd.github.v3.raw',
      },
      cache: 'no-store',
    });

    if (res.ok) {
      const data = (await res.json()) as Partial<CmsState>;
      if (Array.isArray(data.products) && Array.isArray(data.gallery)) {
        const merged: CmsState = {
          version: data.version || 1,
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
    // Fallback to raw.githubusercontent.com if API rate-limited
    try {
      const rawUrl = `https://raw.githubusercontent.com/${REPO_OWNER}/${REPO_NAME}/${CMS_BRANCH}/${CMS_FILE_PATH}?t=${Date.now()}`;
      const rawRes = await fetch(rawUrl, { cache: 'no-store' });
      if (rawRes.ok) {
        const data = (await rawRes.json()) as Partial<CmsState>;
        if (Array.isArray(data.products) && Array.isArray(data.gallery)) {
          const merged: CmsState = {
            version: data.version || 1,
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
  }
  return null;
}

function utf8ToBase64(str: string): string {
  const bytes = new TextEncoder().encode(str);
  let binary = '';
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}

/**
 * Publishes the updated CmsState to the cloud (via /api/cms or direct GitHub API)
 * and always saves immediately to localStorage.
 */
export async function publishCmsState(
  state: CmsState,
  adminPassword: string
): Promise<{ syncedToCloud: boolean; message: string }> {
  const updatedState: CmsState = {
    ...state,
    updatedAt: new Date().toISOString(),
  };

  saveLocalCmsState(updatedState);

  const cloudToken = getStoredCloudToken();
  const stripeKey = getStoredStripeKey();

  // 1. Try Serverless API /api/cms first
  try {
    const apiRes = await fetch('/api/cms', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'save_state',
        adminPassword,
        githubToken: cloudToken,
        stripeKey,
        state: updatedState,
      }),
    });

    if (apiRes.ok) {
      return {
        syncedToCloud: true,
        message: 'Cambios publicados en la nube para todos los visitantes.',
      };
    }
  } catch {
    // Continue to direct GitHub fallback if serverless function is offline
  }

  // 2. Direct GitHub API fallback if cloudToken is present in browser
  if (cloudToken) {
    try {
      const metaUrl = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${CMS_FILE_PATH}?ref=${CMS_BRANCH}`;
      let existingSha: string | undefined;
      const metaRes = await fetch(metaUrl, {
        headers: {
          Accept: 'application/vnd.github.v3+json',
          Authorization: `Bearer ${cloudToken}`,
        },
      });
      if (metaRes.ok) {
        const metaJson = (await metaRes.json()) as { sha?: string };
        existingSha = metaJson.sha;
      }

      const jsonStr = JSON.stringify(updatedState, null, 2);
      const base64Content = utf8ToBase64(jsonStr);

      const putRes = await fetch(
        `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${CMS_FILE_PATH}`,
        {
          method: 'PUT',
          headers: {
            Accept: 'application/vnd.github.v3+json',
            Authorization: `Bearer ${cloudToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message: 'chore(cms): update catalog and gallery state [skip ci]',
            content: base64Content,
            branch: CMS_BRANCH,
            ...(existingSha ? { sha: existingSha } : {}),
          }),
        }
      );

      if (putRes.ok) {
        return {
          syncedToCloud: true,
          message: 'Cambios publicados en la nube para todos los visitantes.',
        };
      }
    } catch {
      // Fall through
    }
  }

  return {
    syncedToCloud: false,
    message:
      'Cambios guardados en este dispositivo. Activa el Token de Nube en Configuración para sincronizar globalmente.',
  };
}

/**
 * Compresses an uploaded image file to WebP/JPEG (max 1400px) and uploads it to the cloud
 * (or returns a compact data URL if cloud token is not configured yet).
 */
export async function compressAndUploadImage(
  file: File,
  adminPassword: string
): Promise<string> {
  const { base64Data, dataUrl, ext } = await compressImageFile(file, 1400, 0.84);
  const safeBase = file.name.replace(/\.[^/.]+$/, '').replace(/[^a-zA-Z0-9_-]/g, '_');
  const filename = `${safeBase}.${ext}`;
  const cloudToken = getStoredCloudToken();

  // 1. Try /api/cms
  try {
    const res = await fetch('/api/cms', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'upload_image',
        adminPassword,
        githubToken: cloudToken,
        filename,
        base64Content: base64Data,
      }),
    });
    if (res.ok) {
      const data = (await res.json()) as { url?: string };
      if (data.url) return data.url;
    }
  } catch {
    // Fallback
  }

  // 2. Direct GitHub cms-data upload if cloudToken is configured
  if (cloudToken) {
    try {
      const filePath = `gallery/${Date.now()}-${filename}`;
      const putRes = await fetch(
        `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${filePath}`,
        {
          method: 'PUT',
          headers: {
            Accept: 'application/vnd.github.v3+json',
            Authorization: `Bearer ${cloudToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message: `chore(cms): upload gallery image ${filename} [skip ci]`,
            content: base64Data,
            branch: CMS_BRANCH,
          }),
        }
      );
      if (putRes.ok) {
        return `https://raw.githubusercontent.com/${REPO_OWNER}/${REPO_NAME}/${CMS_BRANCH}/${filePath}`;
      }
    } catch {
      // Fallback to dataUrl
    }
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
