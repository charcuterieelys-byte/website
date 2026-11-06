import crypto from 'node:crypto';

const REPO_OWNER = 'charcuterieelys-byte';
const REPO_NAME = 'website';
const CMS_BRANCH = 'cms-data';
const CMS_FILE_PATH = 'cms-state.json';
const ALLOWED_IMAGE_EXTENSIONS = new Set(['webp', 'jpg', 'jpeg', 'png']);
const MAX_BASE64_LENGTH = 4 * 1024 * 1024; // ~3MB binary image limit

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

    // 1. Create a new Stripe Payment Link when a product's price is updated
    if (action === 'create_stripe_link') {
      if (!activeStripeKey) {
        return res.status(400).json({
          error: 'Configura STRIPE_SECRET_KEY en las Variables de Entorno de Vercel',
        });
      }

      const { productName, priceUsd } = body;
      const numericPrice = Number(String(priceUsd).replace(/[^0-9.]/g, ''));
      if (!productName || !Number.isFinite(numericPrice) || numericPrice <= 0) {
        return res.status(400).json({ error: 'Nombre y precio válido en USD son requeridos' });
      }

      const unitAmount = Math.round(numericPrice * 100);
      const authHeader = {
        Authorization: `Bearer ${activeStripeKey}`,
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
        return res.status(502).json({
          error: 'No se pudo crear el producto en Stripe',
          details: prodData.error?.message,
        });
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
        return res.status(502).json({
          error: 'No se pudo crear el precio en Stripe',
          details: priceData.error?.message,
        });
      }

      const originUrl =
        req.headers.origin && /^https:\/\//i.test(req.headers.origin)
          ? req.headers.origin
          : 'https://www.elyscharcuterie.com';

      const linkParams = new URLSearchParams({
        'line_items[0][price]': priceData.id,
        'line_items[0][quantity]': '1',
        'line_items[0][adjustable_quantity][enabled]': 'true',
        'line_items[0][adjustable_quantity][minimum]': '1',
        'line_items[0][adjustable_quantity][maximum]': '20',
        'phone_number_collection[enabled]': 'true',
        'custom_fields[0][key]': 'event_date',
        'custom_fields[0][label][type]': 'custom',
        'custom_fields[0][label][custom]': 'Fecha de Entrega / Delivery Date',
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
        return res.status(502).json({
          error: 'No se pudo crear el Payment Link en Stripe',
          details: linkData.error?.message,
        });
      }

      return res.status(200).json({ ok: true, url: linkData.url });
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

    // 3. Save CMS state JSON to GitHub cms-data branch
    if (action === 'save_state') {
      if (!activeGhToken) {
        return res.status(400).json({
          error: 'Falta GITHUB_CMS_TOKEN en las Variables de Entorno de Vercel',
        });
      }
      const { state } = body;
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
      const metaRes = await fetch(metaUrl, {
        headers: getGithubHeaders(activeGhToken),
      });
      if (metaRes.ok) {
        const metaJson = await metaRes.json();
        existingSha = metaJson.sha;
      }

      const jsonContent = JSON.stringify(
        {
          ...state,
          updatedAt: new Date().toISOString(),
        },
        null,
        2
      );
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

      return res.status(200).json({ ok: true });
    }

    return res.status(400).json({ error: 'Acción no reconocida' });
  } catch (error) {
    console.error('CMS API error:', error);
    return res.status(500).json({ error: 'Error interno del servidor CMS' });
  }
}
