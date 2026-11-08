import crypto from 'node:crypto';

const REPO_OWNER = 'charcuterieelys-byte';
const REPO_NAME = 'website';
const CMS_BRANCH = 'cms-data';
const CMS_FILE_PATH = 'cms-state.json';
const ALLOWED_IMAGE_EXTENSIONS = new Set(['webp', 'jpg', 'jpeg', 'png']);
const MAX_BASE64_LENGTH = 4 * 1024 * 1024; // ~3MB binary image limit

const ALLOWED_ORIGINS = new Set([
  'https://www.elyscharcuterie.com',
  'https://elyscharcuterie.com',
  'http://localhost:5173',
  'http://localhost:3000',
]);

function getSafeOrigin(req) {
  const raw = req.headers.origin ? String(req.headers.origin).trim().toLowerCase() : '';
  if (raw && (ALLOWED_ORIGINS.has(raw) || /^https:\/\/[a-z0-9-]+\.vercel\.app$/.test(raw))) {
    return raw;
  }
  return 'https://www.elyscharcuterie.com';
}

function getGithubHeaders(token) {
  const headers = {
    Accept: 'application/vnd.github.v3+json',
    'User-Agent': 'Elys-Charcuterie-CMS',
  };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  return headers;
}

function verifyPasswordConstantTime(input, expected) {
  if (!input || !expected) return false;
  const hashA = crypto.createHash('sha256').update(String(input)).digest();
  const hashB = crypto.createHash('sha256').update(String(expected)).digest();
  return crypto.timingSafeEqual(hashA, hashB);
}

function isSafeUrl(url) {
  if (!url) return true;
  const trimmed = String(url).trim();
  return (
    trimmed.startsWith('https://') ||
    trimmed.startsWith('./') ||
    trimmed.startsWith('/') ||
    trimmed.startsWith('#') ||
    trimmed.startsWith('data:image/')
  );
}

function parseNumericUsd(priceStr) {
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

async function createStripePaymentLink({ stripeKey, productName, priceUsd, originUrl }) {
  const unitAmount = Math.round(priceUsd * 100);
  const authHeader = {
    Authorization: `Bearer ${stripeKey}`,
    'Content-Type': 'application/x-www-form-urlencoded',
  };

  const prodParams = new URLSearchParams({
    name: `Ely's Charcuterie — ${String(productName).slice(0, 120)}`,
  });
  const prodRes = await fetch('https://api.stripe.com/v1/products', {
    method: 'POST',
    headers: authHeader,
    body: prodParams.toString(),
  });
  const prodData = await prodRes.json();
  if (!prodRes.ok || !prodData.id) {
    throw new Error(prodData.error?.message || 'No se pudo crear el producto en Stripe');
  }

  const priceParams = new URLSearchParams({
    currency: 'usd',
    unit_amount: String(unitAmount),
    product: prodData.id,
  });
  const priceRes = await fetch('https://api.stripe.com/v1/prices', {
    method: 'POST',
    headers: authHeader,
    body: priceParams.toString(),
  });
  const priceData = await priceRes.json();
  if (!priceRes.ok || !priceData.id) {
    throw new Error(priceData.error?.message || 'No se pudo crear el precio en Stripe');
  }

  const linkParams = new URLSearchParams({
    'line_items[0][price]': priceData.id,
    'line_items[0][quantity]': '1',
    'line_items[0][adjustable_quantity][enabled]': 'true',
    'line_items[0][adjustable_quantity][minimum]': '1',
    'line_items[0][adjustable_quantity][maximum]': '20',
    'phone_number_collection[enabled]': 'true',
    'custom_fields[0][key]': 'event_date',
    'custom_fields[0][label][type]': 'custom',
    'custom_fields[0][label][custom]': 'Fecha del Pedido / Order Date',
    'custom_fields[0][type]': 'text',
    'custom_fields[0][optional]': 'false',
    'custom_fields[1][key]': 'notes',
    'custom_fields[1][label][type]': 'custom',
    'custom_fields[1][label][custom]': 'Notas o Preferencias / Special Notes',
    'custom_fields[1][type]': 'text',
    'custom_fields[1][optional]': 'true',
    'after_completion[type]': 'redirect',
    'after_completion[redirect][url]': `${originUrl}/?payment=success`,
  });
  const linkRes = await fetch('https://api.stripe.com/v1/payment_links', {
    method: 'POST',
    headers: authHeader,
    body: linkParams.toString(),
  });
  const linkData = await linkRes.json();
  if (!linkRes.ok || !linkData.url) {
    throw new Error(linkData.error?.message || 'No se pudo crear el Payment Link en Stripe');
  }

  return linkData.url;
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store, max-age=0');

  if (req.method === 'GET') {
    try {
      const ghToken = process.env.GITHUB_CMS_TOKEN || '';
      const url = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${CMS_FILE_PATH}?ref=${CMS_BRANCH}`;
      const response = await fetch(url, {
        headers: {
          ...getGithubHeaders(ghToken),
          Accept: 'application/vnd.github.v3.raw',
        },
      });

      if (!response.ok) {
        return res.status(404).json({ error: 'CMS state not initialized yet' });
      }

      const data = await response.json();
      return res.status(200).json(data);
    } catch {
      return res.status(500).json({ error: 'Failed to load CMS state' });
    }
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {};
    const { action, adminPassword } = body;

    const expectedPassword = process.env.ADMIN_PASSWORD || 'elys2026';
    if (!verifyPasswordConstantTime(adminPassword, expectedPassword)) {
      return res.status(401).json({ error: 'Contraseña de administrador incorrecta' });
    }

    const activeGhToken = process.env.GITHUB_CMS_TOKEN || '';
    const activeStripeKey = process.env.STRIPE_SECRET_KEY || '';
    const originUrl = getSafeOrigin(req);

    // 1. Create a new Stripe Payment Link when a product's price is updated
    if (action === 'create_stripe_link') {
      if (!activeStripeKey) {
        return res.status(400).json({
          error: 'Configura STRIPE_SECRET_KEY en las Variables de Entorno de Vercel',
        });
      }

      const { productName, priceUsd } = body;
      const numericPrice = parseNumericUsd(priceUsd);
      if (!productName || !numericPrice) {
        return res.status(400).json({ error: 'Nombre y precio válido en USD son requeridos' });
      }

      try {
        const url = await createStripePaymentLink({
          stripeKey: activeStripeKey,
          productName,
          priceUsd: numericPrice,
          originUrl,
        });
        return res.status(200).json({ ok: true, url });
      } catch (err) {
        return res.status(502).json({
          error: err instanceof Error ? err.message : 'Error creando enlace en Stripe',
        });
      }
    }

    // 2. Upload image to GitHub cms-data branch
    if (action === 'upload_image') {
      if (!activeGhToken) {
        return res.status(400).json({
          error: 'Falta GITHUB_CMS_TOKEN en las Variables de Entorno de Vercel',
        });
      }
      const { filename, base64Content } = body;
      if (
        !base64Content ||
        typeof base64Content !== 'string' ||
        base64Content.length > MAX_BASE64_LENGTH
      ) {
        return res.status(400).json({ error: 'Imagen inválida o demasiado grande' });
      }

      const rawName = String(filename || `photo-${Date.now()}.webp`);
      const ext = (rawName.split('.').pop() || 'webp').toLowerCase();
      if (!ALLOWED_IMAGE_EXTENSIONS.has(ext)) {
        return res.status(400).json({ error: 'Formato de imagen no permitido' });
      }

      const safeName = rawName.replace(/[^a-zA-Z0-9._-]/g, '_');
      const filePath = `gallery/${Date.now()}-${safeName}`;
      const putUrl = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${filePath}`;

      const putRes = await fetch(putUrl, {
        method: 'PUT',
        headers: {
          ...getGithubHeaders(activeGhToken),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: `chore(cms): upload gallery image ${safeName} [skip ci]`,
          content: base64Content,
          branch: CMS_BRANCH,
        }),
      });

      if (!putRes.ok) {
        const errText = await putRes.text();
        return res.status(502).json({ error: 'Error subiendo imagen', details: errText });
      }

      const publicUrl = `https://raw.githubusercontent.com/${REPO_OWNER}/${REPO_NAME}/${CMS_BRANCH}/${filePath}`;
      return res.status(200).json({ ok: true, url: publicUrl });
    }

    // 3. Save CMS state JSON to GitHub cms-data branch (and auto-sync changed prices to Stripe)
    if (action === 'save_state') {
      const { state, previousProducts } = body;
      if (!state || !Array.isArray(state.products) || !Array.isArray(state.gallery)) {
        return res.status(400).json({ error: 'Formato de estado CMS inválido' });
      }

      // Validate URL fields across products and gallery items
      for (const p of state.products) {
        if (!isSafeUrl(p.stripePaymentLink) || !isSafeUrl(p.realPhotoSrc) || !isSafeUrl(p.posterSrc)) {
          return res.status(400).json({ error: 'URL no permitida en paquete' });
        }
      }
      for (const g of state.gallery) {
        if (!isSafeUrl(g.imageSrc)) {
          return res.status(400).json({ error: 'URL de imagen no permitida en galería' });
        }
      }

      const metaUrl = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${CMS_FILE_PATH}?ref=${CMS_BRANCH}`;
      let existingSha;
      let existingProducts = Array.isArray(previousProducts) ? previousProducts : [];
      if (activeGhToken) {
        const metaRes = await fetch(metaUrl, {
          headers: getGithubHeaders(activeGhToken),
        });
        if (metaRes.ok) {
          const metaJson = await metaRes.json();
          existingSha = metaJson.sha;
          if (metaJson.content && existingProducts.length === 0) {
            try {
              const decoded = JSON.parse(
                Buffer.from(metaJson.content, 'base64').toString('utf8')
              );
              if (Array.isArray(decoded.products)) {
                existingProducts = decoded.products;
              }
            } catch {
              // Ignore decode error
            }
          }
        }
      }

      // Automatically regenerate Stripe Payment Links in parallel for any product whose USD price changed
      let stripeSyncedCount = 0;
      if (activeStripeKey) {
        const syncTasks = state.products.map(async (p) => {
          const numericPrice = parseNumericUsd(p.price?.es || p.price?.en);
          if (p.isCustomQuote || !numericPrice) return;

          const prevProd = existingProducts.find(
            (oldP) => oldP.slug === p.slug || String(oldP.id) === String(p.id)
          );
          const prevNumericPrice = prevProd
            ? parseNumericUsd(prevProd.price?.es || prevProd.price?.en)
            : null;

          const needsNewStripeLink =
            prevNumericPrice !== numericPrice ||
            !p.stripePaymentLink ||
            p.stripePaymentLink === state.brandConfig?.stripeCustomQuoteLink;

          if (needsNewStripeLink) {
            try {
              const newStripeUrl = await createStripePaymentLink({
                stripeKey: activeStripeKey,
                productName: `${p.name?.es || p.name?.en} (${p.servings?.es || ''})`,
                priceUsd: numericPrice,
                originUrl,
              });
              p.stripePaymentLink = newStripeUrl;
              stripeSyncedCount += 1;
            } catch (stripeErr) {
              console.warn('Auto Stripe sync skipped for product:', p.slug, stripeErr);
            }
          }
        });
        await Promise.allSettled(syncTasks);
      }

      const updatedState = {
        ...state,
        updatedAt: new Date().toISOString(),
      };

      if (!activeGhToken) {
        return res.status(200).json({
          ok: true,
          cloudSaved: false,
          stripeSyncedCount,
          state: updatedState,
        });
      }

      const jsonContent = JSON.stringify(updatedState, null, 2);
      const base64Content = Buffer.from(jsonContent, 'utf8').toString('base64');

      const putPayload = {
        message: `chore(cms): update catalog and gallery state [skip ci]`,
        content: base64Content,
        branch: CMS_BRANCH,
      };
      if (existingSha) {
        putPayload.sha = existingSha;
      }

      const putRes = await fetch(
        `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${CMS_FILE_PATH}`,
        {
          method: 'PUT',
          headers: {
            ...getGithubHeaders(activeGhToken),
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(putPayload),
        }
      );

      if (!putRes.ok) {
        const errText = await putRes.text();
        return res.status(502).json({ error: 'No se pudo guardar en la nube', details: errText });
      }

      return res.status(200).json({
        ok: true,
        cloudSaved: true,
        stripeSyncedCount,
        state: updatedState,
      });
    }

    return res.status(400).json({ error: 'Acción no reconocida' });
  } catch (error) {
    console.error('CMS API error:', error);
    return res.status(500).json({ error: 'Error interno del servidor CMS' });
  }
}
