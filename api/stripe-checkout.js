const REPO_OWNER = 'charcuterieelys-byte';
const REPO_NAME = 'website';
const CMS_BRANCH = 'cms-data';
const CMS_FILE_PATH = 'cms-state.json';
const MIN_CMS_VERSION = 2;

const DEFAULT_STRIPE_QUOTE_LINK = 'https://buy.stripe.com/7sY4gsfiD5ydbfgcK648005';

const DEFAULT_PRODUCTS = [
  {
    id: '01',
    slug: 'small-charcuterie-board',
    name: { es: 'Tabla de Charcutería Pequeña (12")', en: 'Small Charcuterie Board (12")' },
    servings: { es: '4–6 PERSONAS', en: 'SERVES 4–6' },
    price: { es: '$85', en: '$85' },
    stripePaymentLink: 'https://buy.stripe.com/dRm6oAgmH3q5dnoh0m48000',
    isCustomQuote: false,
  },
  {
    id: '02',
    slug: 'medium-charcuterie-board',
    name: { es: 'Tabla de Charcutería Mediana (16")', en: 'Medium Charcuterie Board (16")' },
    servings: { es: '8–10 PERSONAS', en: 'SERVES 8–10' },
    price: { es: '$140', en: '$140' },
    stripePaymentLink: 'https://buy.stripe.com/7sY00c9Yjd0FbfgcK648001',
    isCustomQuote: false,
  },
  {
    id: '03',
    slug: 'rectangular-charcuterie-board',
    name: { es: 'Tabla de Charcutería Grande (18")', en: 'Large Charcuterie Board (18")' },
    servings: { es: '12–15 PERSONAS', en: 'SERVES 12–15' },
    price: { es: '$170', en: '$170' },
    stripePaymentLink: 'https://buy.stripe.com/6oU5kwb2n7Gl1EGh0m48002',
    isCustomQuote: false,
  },
  {
    id: '04',
    slug: 'double-basket-presentation',
    name: {
      es: 'Estación de Otoño 4" · Vino o Whisky Incluido',
      en: 'Autumn Station 4" · Wine or Whiskey Included',
    },
    servings: { es: 'VINO O WHISKY INCLUIDO', en: 'WINE OR WHISKEY INCLUDED' },
    price: { es: '$320', en: '$320' },
    stripePaymentLink: 'https://buy.stripe.com/4gMfZa1rN8Kpfvwh0m48003',
    isCustomQuote: false,
  },
  {
    id: '05',
    slug: 'individual-charcuterie-cups',
    name: { es: 'Vasos Individuales de Charcutería', en: 'Individual Charcuterie Cups' },
    servings: { es: 'EVENTOS Y CELEBRACIONES', en: 'EVENTS & CELEBRATIONS' },
    price: { es: 'A COTIZAR', en: 'CUSTOM QUOTE' },
    stripePaymentLink: DEFAULT_STRIPE_QUOTE_LINK,
    isCustomQuote: true,
  },
  {
    id: '06',
    slug: 'elys-snack-box',
    name: { es: 'Ely’s Snack Box (2 Personas)', en: 'Ely’s Snack Box (2 Guests)' },
    servings: { es: '2 PERSONAS', en: 'SERVES 2' },
    price: { es: 'A COTIZAR', en: 'CUSTOM QUOTE' },
    stripePaymentLink: DEFAULT_STRIPE_QUOTE_LINK,
    isCustomQuote: true,
  },
  {
    id: '07',
    slug: 'celebration-brunch-box',
    name: {
      es: 'Desayunos Personalizados · Brunch Box',
      en: 'Personalized Breakfast & Brunch Box',
    },
    servings: { es: 'A TU MEDIDA', en: 'CUSTOM BREAKFAST' },
    price: { es: 'HASTA $120', en: 'UP TO $120' },
    stripePaymentLink: 'https://buy.stripe.com/3cIbIUb2n2m13MO6lI48004',
    isCustomQuote: false,
  },
  {
    id: '08',
    slug: 'corporate-mini-box',
    name: { es: 'Corporate Mini Box', en: 'Corporate Mini Box' },
    servings: { es: 'CORPORATIVO Y EVENTOS', en: 'CORPORATE & EVENTS' },
    price: { es: 'A COTIZAR', en: 'CUSTOM QUOTE' },
    stripePaymentLink: DEFAULT_STRIPE_QUOTE_LINK,
    isCustomQuote: true,
  },
];

function parseNumericUsd(priceStr) {
  if (!priceStr) return null;
  const match = String(priceStr).match(/\d+(\.\d+)?/);
  if (!match) return null;
  const val = Number(match[0]);
  return Number.isFinite(val) && val > 0 ? val : null;
}

function isSafeStripeUrl(url) {
  return Boolean(url && /^https:\/\/buy\.stripe\.com\//i.test(String(url).trim()));
}

async function loadAuthoritativeProducts() {
  try {
    const ghToken = process.env.GITHUB_CMS_TOKEN || '';
    const headers = {
      Accept: 'application/vnd.github.v3.raw',
      'User-Agent': 'Elys-Charcuterie-Checkout',
    };
    if (ghToken) {
      headers.Authorization = `Bearer ${ghToken}`;
    }
    const url = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${CMS_FILE_PATH}?ref=${CMS_BRANCH}`;
    const res = await fetch(url, { headers });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data?.products) && (data.version || 1) >= MIN_CMS_VERSION) {
        return data.products;
      }
    }
  } catch {
    // Fallback to default catalog
  }
  return DEFAULT_PRODUCTS;
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store, max-age=0');

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {};
    const { productId, productSlug, lang = 'es', customerEmail } = body;

    const products = await loadAuthoritativeProducts();
    const product =
      products.find(
        (p) =>
          (productSlug && p.slug === productSlug) ||
          (productId && String(p.id) === String(productId))
      ) || products[0];

    const fallbackLink = isSafeStripeUrl(product?.stripePaymentLink)
      ? product.stripePaymentLink
      : DEFAULT_STRIPE_QUOTE_LINK;

    const numericPrice = parseNumericUsd(product?.price?.es || product?.price?.en);
    const activeStripeKey = process.env.STRIPE_SECRET_KEY || '';

    // If STRIPE_SECRET_KEY is not configured or package is custom quote, return fallback Payment Link
    if (!activeStripeKey || product?.isCustomQuote || !numericPrice) {
      return res.status(200).json({
        ok: true,
        url: fallbackLink,
        mode: 'payment_link',
      });
    }

    const originUrl =
      req.headers.origin && /^https:\/\//i.test(req.headers.origin)
        ? req.headers.origin
        : 'https://www.elyscharcuterie.com';

    const unitAmount = Math.round(numericPrice * 100);
    const displayName =
      (lang === 'en' ? product.name?.en : product.name?.es) ||
      product.name?.es ||
      "Ely's Charcuterie Selection";
    const displayServings =
      (lang === 'en' ? product.servings?.en : product.servings?.es) ||
      product.servings?.es ||
      '';

    const params = new URLSearchParams({
      mode: 'payment',
      'line_items[0][price_data][currency]': 'usd',
      'line_items[0][price_data][unit_amount]': String(unitAmount),
      'line_items[0][price_data][product_data][name]': `Ely's Charcuterie — ${String(displayName).slice(0, 120)}`,
      'line_items[0][price_data][product_data][description]': displayServings
        ? `${displayServings} · Louisville, KY`
        : 'Handcrafted fresh to order in Louisville, KY',
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
      success_url: `${originUrl}/?payment=success`,
      cancel_url: `${originUrl}/#collection`,
    });

    if (customerEmail && typeof customerEmail === 'string' && customerEmail.includes('@')) {
      params.set('customer_email', customerEmail.trim().slice(0, 120));
    }

    const sessionRes = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${activeStripeKey}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });

    const sessionData = await sessionRes.json();
    if (sessionRes.ok && sessionData?.url) {
      return res.status(200).json({
        ok: true,
        url: sessionData.url,
        mode: 'dynamic_session',
      });
    }

    // Fallback to static payment link if Stripe API returned an error
    return res.status(200).json({
      ok: true,
      url: fallbackLink,
      mode: 'payment_link',
    });
  } catch {
    return res.status(200).json({
      ok: true,
      url: DEFAULT_STRIPE_QUOTE_LINK,
      mode: 'payment_link',
    });
  }
}
