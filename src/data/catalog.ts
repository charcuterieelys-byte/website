import { Product, OccasionItem, Language } from '../types/catalog';

/**
 * ============================================================================
 * ELYS CHARCUTERIE — EDITABLE BRAND & PRODUCT CONFIGURATION
 * ============================================================================
 * IMPORTANT:
 * Do not invent prices, serving quantities, or details that have not been
 * confirmed. All fields marked [EDITABLE FIELD] below can be updated directly
 * once final pricing and serving specifications are confirmed.
 */

export const BRAND_CONFIG = {
  businessName: "Ely’s Charcuterie",
  founderName: 'Elianne Lafuente',
  city: 'Louisville, Kentucky',
  // Official WhatsApp number (+1 502-345-4063) & Instagram handle
  whatsappNumber: '15023454063',
  whatsappDisplay: '+1 (502) 345-4063',
  instagramHandle: '@elyscharcuterie',
  instagramUrl: 'https://instagram.com/',
  email: 'elyscharcuteria@gmail.com',
  senderEmail: 'orders@elyscharcuterie.com',
  // Official Stripe Custom Quote Link
  stripeCustomQuoteLink: 'https://buy.stripe.com/7sY4gsfiD5ydbfgcK648005',
  // Official Brand Sheet Logo SVGs (Cream-Gold #E7D095 & Burgundy Red #841F17)
  logoHorizontal: './brand/logo-horizontal-crema.svg',
  logoVertical: './brand/logo-vertical-crema.svg',
  logoIsotipo: './brand/isotipo-rosa-burgundy.svg',
};

export const HERO_CONTENT: Record<
  Language,
  {
    eyebrow: string;
    headline: string;
    supportingText: string;
    primaryCta: string;
    secondaryCta: string;
    scrollHint: string;
  }
> = {
  en: {
    eyebrow: 'CURATED CULINARY ATELIER · LOUISVILLE, KY',
    headline: 'An experience worth sharing.',
    supportingText:
      'Beautifully curated charcuterie for moments that deserve something special.',
    primaryCta: 'EXPLORE THE COLLECTION',
    secondaryCta: 'CREATE YOUR EXPERIENCE',
    scrollHint: 'SCROLL TO ENTER THE STUDIO',
  },
  es: {
    eyebrow: 'ATELIER DE CHARCUTERÍA · LOUISVILLE, KY',
    headline: 'Una experiencia para compartir.',
    supportingText:
      'Charcutería cuidadosamente curada para momentos que merecen algo especial.',
    primaryCta: 'EXPLORAR LA COLECCIÓN',
    secondaryCta: 'CREA TU EXPERIENCIA',
    scrollHint: 'DESLIZA PARA ENTRAR AL ESTUDIO',
  },
};

/**
 * ============================================================================
 * THE 01–07 PRODUCT COLLECTION (EXACT REQUIRED ORDER)
 * ============================================================================
 * Each product maps directly to its original supplied product video and photo.
 * Fields marked with [EDITABLE] are placeholders awaiting final confirmation.
 */
export const PRODUCTS: Product[] = [
  {
    id: '01',
    slug: 'small-charcuterie-board',
    indexLabel: {
      en: '01 / THE COLLECTION',
      es: '01 / LA COLECCIÓN',
    },
    shortTitle: {
      en: 'SMALL · 12"',
      es: 'SMALL · 12"',
    },
    name: {
      en: 'Small Charcuterie Board',
      es: 'Tabla de Charcutería Pequeña',
    },
    description: {
      en: 'An intimate arrangement of carefully selected cheeses, Italian cured meats, seasonal fruits and artisan accompaniments.',
      es: 'Una composición íntima de quesos cuidadosamente seleccionados, embutidos artesanales, frutas frescas de estación y acompañamientos.',
    },
    dimensions: {
      en: '12 INCHES',
      es: '12 PULGADAS',
    },
    servings: {
      en: 'SERVES 4–6',
      es: '4–6 PERSONAS',
    },
    price: {
      en: '$85',
      es: '$85',
    },
    details: {
      en: [
        'Hand-sculpted salami rose centerpiece',
        'Artisanal cheeses, berries, grapes, crackers & honey',
      ],
      es: [
        'Rosa central de salami esculpida a mano',
        'Quesos selectos, frutos rojos, uvas, galletas y miel',
      ],
    },
    videoSrc: './videos/products/01-small-board.webm?v=birefnet1',
    videoFallbackMp4: './videos/products/01-small-board.mp4?v=birefnet1',
    posterSrc: './images/products/01-small-board-poster.webp?v=birefnet1',
    realPhotoSrc: './images/real/01-small-board.jpg',
    category: 'boards',
    orderUrl: '#custom-orders',
    stripePaymentLink: 'https://buy.stripe.com/dRm6oAgmH3q5dnoh0m48000',
    ctaLabel: {
      en: 'ORDER THIS BOARD',
      es: 'ORDENAR ESTA TABLA',
    },
    layoutAlign: 'left',
    visualScale: 1.08,
  },
  {
    id: '02',
    slug: 'medium-charcuterie-board',
    indexLabel: {
      en: '02 / THE COLLECTION',
      es: '02 / LA COLECCIÓN',
    },
    shortTitle: {
      en: 'MEDIUM · 16"',
      es: 'MEDIUM · 16"',
    },
    name: {
      en: 'Medium Charcuterie Board',
      es: 'Tabla de Charcutería Mediana',
    },
    description: {
      en: 'A generous circular presentation designed for effortless gathering, featuring dual charcuterie roses, fine cheeses, fresh fruit and curated pairings.',
      es: 'Una presentación circular generosa pensada para compartir sin esfuerzo, con doble rosa de charcutería, quesos finos, fruta fresca y acompañamientos.',
    },
    dimensions: {
      en: '16 INCHES',
      es: '16 PULGADAS',
    },
    servings: {
      en: 'SERVES 8–10',
      es: '8–10 PERSONAS',
    },
    price: {
      en: '$140',
      es: '$140',
    },
    details: {
      en: [
        '16-inch circular presentation for 8–10 guests',
        'Dual salami roses, brie wedges, cubed cheeses, nuts & seasonal fruit',
      ],
      es: [
        'Presentación circular de 16 pulgadas para 8–10 personas',
        'Doble rosa de charcutería, cuñas de brie, quesos, nueces y fruta',
      ],
    },
    videoSrc: './videos/products/02-medium-board.webm?v=birefnet1',
    videoFallbackMp4: './videos/products/02-medium-board.mp4?v=birefnet1',
    posterSrc: './images/products/02-medium-board-poster.webp?v=birefnet1',
    realPhotoSrc: './images/real/02-medium-board.jpg',
    category: 'boards',
    orderUrl: '#custom-orders',
    stripePaymentLink: 'https://buy.stripe.com/7sY00c9Yjd0FbfgcK648001',
    ctaLabel: {
      en: 'ORDER THIS BOARD',
      es: 'ORDENAR ESTA TABLA',
    },
    layoutAlign: 'right',
    visualScale: 1.12,
  },
  {
    id: '03',
    slug: 'rectangular-charcuterie-board',
    indexLabel: {
      en: '03 / THE COLLECTION',
      es: '03 / LA COLECCIÓN',
    },
    shortTitle: {
      en: 'LARGE · 18"',
      es: 'LARGE · 18"',
    },
    name: {
      en: 'Large Charcuterie Board (18")',
      es: 'Tabla de Charcutería Grande (18")',
    },
    description: {
      en: 'An abundant 18-inch centerpiece composition crafted for 12–15 guests, bringing together signature charcuterie roses, artisan cheeses, preserves and fresh fruit.',
      es: 'Una composición abundante de 18 pulgadas pensada para 12–15 personas con charcutería de autor, quesos selectos, conservas y fruta fresca.',
    },
    dimensions: {
      en: '18 INCHES',
      es: '18 PULGADAS',
    },
    servings: {
      en: 'SERVES 12–15',
      es: '12–15 PERSONAS',
    },
    price: {
      en: '$170',
      es: '$170',
    },
    details: {
      en: [
        'Ceramic bowls for olives & preserves, signature honey jar & artisan cheeses',
        'Note: Wooden board not included',
      ],
      es: [
        'Cuencos con aceitunas y mermelada, miel Ely’s y quesos selectos',
        'Nota: Tabla de madera no incluida',
      ],
    },
    videoSrc: './videos/products/03-rectangular-board.webm?v=birefnet1',
    videoFallbackMp4: './videos/products/03-rectangular-board.mp4?v=birefnet1',
    posterSrc: './images/products/03-rectangular-board-poster.webp?v=birefnet1',
    realPhotoSrc: './images/real/03-rectangular-board.jpg',
    category: 'boards',
    orderUrl: '#custom-orders',
    stripePaymentLink: 'https://buy.stripe.com/6oU5kwb2n7Gl1EGh0m48002',
    ctaLabel: {
      en: 'ORDER THIS BOARD',
      es: 'ORDENAR ESTA TABLA',
    },
    layoutAlign: 'left',
    visualScale: 1.15,
  },
  {
    id: '04',
    slug: 'double-basket-presentation',
    indexLabel: {
      en: '04 / THE COLLECTION',
      es: '04 / LA COLECCIÓN',
    },
    shortTitle: {
      en: 'DOUBLE BASKET',
      es: 'DOBLE CESTA',
    },
    name: {
      en: 'Double Basket · Wine or Whiskey Included',
      es: 'Doble Cesta · Vino o Whisky Incluido',
    },
    description: {
      en: 'A luxury two-basket presentation with a bottle of Wine or Whiskey included, pairing an abundant selection of cured meats, cheeses and fruits with a companion basket of crackers, honey and preserves.',
      es: 'Una presentación de lujo en dos cestas tejidas con botella de Vino o Whisky incluida, combinando charcutería, quesos y frutas con una segunda cesta de galletas artesanales, miel y conservas.',
    },
    dimensions: {
      en: 'TWO-TIER PRESENTATION',
      es: 'PRESENTACIÓN DE DOS NIVELES',
    },
    servings: {
      en: 'WINE OR WHISKEY INCLUDED',
      es: 'VINO O WHISKY INCLUIDO',
    },
    price: {
      en: '$320',
      es: '$320',
    },
    details: {
      en: [
        'Includes bottle of Wine or Whiskey of your choice',
        'Woven twin-basket display with dedicated cracker, honey & preserve basket',
      ],
      es: [
        'Incluye botella de Vino o Whisky a elección',
        'Presentación en doble cesta tejida con cesta de galletas, miel y mermelada',
      ],
    },
    videoSrc: './videos/products/04-double-basket.webm?v=birefnet1',
    videoFallbackMp4: './videos/products/04-double-basket.mp4?v=birefnet1',
    posterSrc: './images/products/04-double-basket-poster.webp?v=birefnet1',
    realPhotoSrc: './images/real/04-double-basket.jpg',
    category: 'presentations',
    orderUrl: '#custom-orders',
    stripePaymentLink: 'https://buy.stripe.com/4gMfZa1rN8Kpfvwh0m48003',
    ctaLabel: {
      en: 'ORDER THIS PRESENTATION',
      es: 'ORDENAR ESTA PRESENTACIÓN',
    },
    layoutAlign: 'right',
    visualScale: 1.14,
  },
  {
    id: '05',
    slug: 'individual-charcuterie-cups',
    indexLabel: {
      en: '05 / THE COLLECTION',
      es: '05 / LA COLECCIÓN',
    },
    shortTitle: {
      en: 'CUPS',
      es: 'VASOS INDIVIDUALES',
    },
    name: {
      en: 'Individual Charcuterie Cups',
      es: 'Vasos Individuales de Charcutería',
    },
    description: {
      en: 'Individual cup presentation crafted for effortless mingling at celebrations, corporate events and private toasts—each cup crowned with a signature salami rose, cheese skewers and fresh berries.',
      es: 'Presentación en vasos individuales diseñada para disfrutar cómodamente en eventos, brindis y celebraciones; cada vaso coronado con una rosa de salami, brochetas de queso y frutos frescos.',
    },
    dimensions: {
      en: 'INDIVIDUAL CUPS',
      es: 'VASOS INDIVIDUALES',
    },
    servings: {
      en: 'EVENTS & CELEBRATIONS',
      es: 'EVENTOS Y CELEBRACIONES',
    },
    price: {
      en: 'CUSTOM QUOTE',
      es: 'A COTIZAR',
    },
    details: {
      en: [
        'Branded Ely’s Charcuterie cups',
        'Individual salami rose, artisan cheese cubes, fresh berries & crackers',
      ],
      es: [
        'Vasos con sello de marca Ely’s Charcuterie',
        'Rosa individual de salami, cubos de queso, frutos rojos y galletas',
      ],
    },
    videoSrc: './videos/products/05-charcuterie-cups.webm?v=birefnet1',
    videoFallbackMp4: './videos/products/05-charcuterie-cups.mp4?v=birefnet1',
    posterSrc: './images/products/05-charcuterie-cups-poster.webp?v=birefnet1',
    realPhotoSrc: './images/real/05-charcuterie-cups.jpg',
    category: 'individual',
    orderUrl: '#custom-orders',
    stripePaymentLink: 'https://buy.stripe.com/7sY4gsfiD5ydbfgcK648005',
    isCustomQuote: true,
    ctaLabel: {
      en: 'ORDER CHARCUTERIE CUPS',
      es: 'COTIZAR VASOS',
    },
    layoutAlign: 'left',
    visualScale: 1.14,
  },
  {
    id: '06',
    slug: 'elys-snack-box',
    indexLabel: {
      en: '06 / THE COLLECTION',
      es: '06 / LA COLECCIÓN',
    },
    shortTitle: {
      en: 'SNACK BOX',
      es: 'ELY’S SNACK BOX',
    },
    name: {
      en: 'Ely’s Snack Box (2 Guests)',
      es: 'Ely’s Snack Box (2 Personas)',
    },
    description: {
      en: 'A refined rectangular kraft box with window lid crafted for 2 guests, thoughtfully arranged with sliced cheeses, cured meats, wooden bowl of olives, fresh fruit and sweet-savory bites.',
      es: 'Caja rectangular kraft con ventana superior para 2 personas, cuidadosamente dispuesta con quesos laminados y en cubos, embutidos, cuenco de madera con aceitunas, fruta fresca y acompañamientos.',
    },
    dimensions: {
      en: 'RECTANGULAR KRAFT BOX',
      es: 'CAJA KRAFT RECTANGULAR',
    },
    servings: {
      en: 'SERVES 2',
      es: '2 PERSONAS',
    },
    price: {
      en: 'INQUIRE / ORDER',
      es: '2 PERSONAS · CONSULTAR',
    },
    details: {
      en: [
        'Curated for 2 people in a window-lid kraft gift box',
        'Ideal for gifting, picnics & intimate moments',
      ],
      es: [
        'Diseñada para 2 personas en caja kraft con ventana lista para regalar',
        'Ideal para obsequios, picnics y detalles especiales',
      ],
    },
    videoSrc: './videos/products/06-snack-box.webm?v=birefnet1',
    videoFallbackMp4: './videos/products/06-snack-box.mp4?v=birefnet1',
    posterSrc: './images/products/06-snack-box-poster.webp?v=birefnet1',
    realPhotoSrc: './images/real/06-snack-box.jpg',
    category: 'boxes',
    orderUrl: '#custom-orders',
    stripePaymentLink: 'https://buy.stripe.com/7sY4gsfiD5ydbfgcK648005',
    isCustomQuote: true,
    ctaLabel: {
      en: 'ORDER SNACK BOX',
      es: 'ORDENAR SNACK BOX',
    },
    layoutAlign: 'right',
    visualScale: 1.1,
  },
  {
    id: '07',
    slug: 'celebration-brunch-box',
    indexLabel: {
      en: '07 / THE COLLECTION',
      es: '07 / LA COLECCIÓN',
    },
    shortTitle: {
      en: 'BRUNCH BOX',
      es: 'DESAYUNOS · BRUNCH',
    },
    name: {
      en: 'Personalized Breakfast & Brunch Box',
      es: 'Desayunos Personalizados · Brunch Box',
    },
    description: {
      en: 'A personalized breakfast and brunch presentation uniting filled artisan croissants, bottled beverages with bamboo lids, cured meats, cheeses, fresh seasonal fruits and sweet accompaniments.',
      es: 'Desayunos personalizados y bandeja de brunch que reúne croissants rellenos, bebidas en frascos de vidrio con tapa de bambú, charcutería fina, quesos, frutas frescas y postres.',
    },
    dimensions: {
      en: 'PERSONALIZED BRUNCH TRAY',
      es: 'DESAYUNO PERSONALIZADO',
    },
    servings: {
      en: 'CUSTOM BREAKFAST',
      es: 'A TU MEDIDA',
    },
    price: {
      en: 'UP TO $120',
      es: 'HASTA $120',
    },
    details: {
      en: [
        'Personalized breakfasts up to $120 with drinks, croissants & charcuterie',
        'Presented in a ribbon-wrapped wooden tray with personalized note card',
      ],
      es: [
        'Desayunos personalizados hasta $120 con bebidas, croissants y charcutería',
        'Presentada en bandeja de madera decorada con cinta y tarjeta personalizada',
      ],
    },
    videoSrc: './videos/products/07-brunch-box.webm?v=birefnet1',
    videoFallbackMp4: './videos/products/07-brunch-box.mp4?v=birefnet1',
    posterSrc: './images/products/07-brunch-box-poster.webp?v=birefnet1',
    realPhotoSrc: './images/real/07-brunch-box.jpg',
    category: 'brunch',
    orderUrl: '#custom-orders',
    stripePaymentLink: 'https://buy.stripe.com/3cIbIUb2n2m13MO6lI48004',
    ctaLabel: {
      en: 'ORDER PERSONALIZED BRUNCH',
      es: 'ORDENAR DESAYUNO',
    },
    layoutAlign: 'left',
    visualScale: 1.12,
  },
  {
    id: '08',
    slug: 'corporate-mini-box',
    indexLabel: {
      en: '08 / THE COLLECTION',
      es: '08 / LA COLECCIÓN',
    },
    shortTitle: {
      en: 'CORPORATE MINI BOX',
      es: 'CORPORATE MINI BOX',
    },
    name: {
      en: 'Corporate Mini Box',
      es: 'Corporate Mini Box',
    },
    description: {
      en: 'Executive individual mini charcuterie boxes curated for corporate gifting, client appreciation, meetings and branded events in Louisville.',
      es: 'Mini cajas ejecutivas de charcutería diseñadas para regalos corporativos, atención a clientes, reuniones de equipo y eventos empresariales.',
    },
    dimensions: {
      en: 'CORPORATE MINI BOX',
      es: 'MINI BOX CORPORATIVA',
    },
    servings: {
      en: 'CORPORATE & EVENTS',
      es: 'CORPORATIVO Y EVENTOS',
    },
    price: {
      en: 'CUSTOM QUOTE',
      es: 'A COTIZAR',
    },
    details: {
      en: [
        'Tailored for corporate events, client gifts & team gatherings',
        'Custom volume pricing — request a quote for your event',
      ],
      es: [
        'Ideal para eventos corporativos, regalos empresariales y reuniones',
        'Precio a cotizar según cantidad de cajas y personalización',
      ],
    },
    videoSrc: './videos/products/06-snack-box.webm?v=birefnet1',
    videoFallbackMp4: './videos/products/06-snack-box.mp4?v=birefnet1',
    posterSrc: './images/products/06-snack-box-poster.webp?v=birefnet1',
    realPhotoSrc: './images/real/06-snack-box.jpg',
    category: 'corporate',
    orderUrl: '#custom-orders',
    stripePaymentLink: 'https://buy.stripe.com/7sY4gsfiD5ydbfgcK648005',
    isCustomQuote: true,
    ctaLabel: {
      en: 'QUOTE CORPORATE MINI BOX',
      es: 'COTIZAR CORPORATE MINI BOX',
    },
    layoutAlign: 'right',
    visualScale: 1.02,
  },
];

export const OCCASIONS_DATA: OccasionItem[] = [
  {
    id: 'birthdays',
    index: '01',
    title: { en: 'Birthdays', es: 'Cumpleaños' },
    subtitle: {
      en: 'Centerpiece boards and celebratory grazing tables that bring guests together.',
      es: 'Tablas centrales y mesas abundantes que reúnen a todos tus invitados.',
    },
    imageSrc: './images/real/03-rectangular-board.jpg',
  },
  {
    id: 'weddings',
    index: '02',
    title: { en: 'Weddings', es: 'Bodas' },
    subtitle: {
      en: 'Elevated cocktail-hour displays and intimate bridal suite presentations.',
      es: 'Presentaciones esculturales para recepción, cóctel y momentos nupciales.',
    },
    imageSrc: './images/real/08-grazing-table-event.jpg',
  },
  {
    id: 'corporate',
    index: '03',
    title: { en: 'Corporate Gatherings', es: 'Eventos Corporativos' },
    subtitle: {
      en: 'Individual charcuterie cups and executive boards tailored for effortless hosting.',
      es: 'Vasos individuales y tablas ejecutivas pensadas para recepciones impecables.',
    },
    imageSrc: './images/real/05-charcuterie-cups.jpg',
  },
  {
    id: 'baby-showers',
    index: '04',
    title: { en: 'Baby Showers', es: 'Baby Showers' },
    subtitle: {
      en: 'Warm, tactile two-tier basket presentations and brunch spreads for daytime celebrations.',
      es: 'Cestas de dos niveles y propuestas de brunch para celebraciones llenas de ternura.',
    },
    imageSrc: './images/real/04-double-basket.jpg',
  },
  {
    id: 'anniversaries',
    index: '05',
    title: { en: 'Anniversaries', es: 'Aniversarios' },
    subtitle: {
      en: 'Intimate 12-inch boards and morning brunch trays crafted for two.',
      es: 'Tablas íntimas y bandejas de brunch creadas para celebrar en pareja.',
    },
    imageSrc: './images/real/07-brunch-box.jpg',
  },
  {
    id: 'private-celebrations',
    index: '06',
    title: { en: 'Private Celebrations', es: 'Celebraciones Privadas' },
    subtitle: {
      en: 'Full-scale grazing experiences and 16-inch boards for unforgettable evenings at home.',
      es: 'Mesas completas y tablas de 16 pulgadas para veladas inolvidables en casa.',
    },
    imageSrc: './images/real/02-medium-board.jpg',
  },
  {
    id: 'special-gifts',
    index: '07',
    title: { en: 'Special Gifts', es: 'Regalos Especiales' },
    subtitle: {
      en: 'Artisanal kraft snack boxes and curated trays delivered with a personal touch.',
      es: 'Snack boxes y bandejas curadas entregadas como un detalle inolvidable.',
    },
    imageSrc: './images/real/06-snack-box.jpg',
  },
];

export const EXPERIENCE_STORY: Record<
  Language,
  {
    eyebrow: string;
    title: string;
    lead: string;
    paragraph1: string;
    paragraph2: string;
    pillars: { label: string; text: string }[];
  }
> = {
  en: {
    eyebrow: 'THE ELYS EXPERIENCE',
    title: 'Crafted by hand, designed to be shared.',
    lead: 'Behind Ely’s Charcuterie is Elianne Lafuente—guided by the belief that the smallest details transform a simple gathering into a lasting memory.',
    paragraph1:
      'Every board, basket and box begins with a deliberate selection of ingredients: aged and creamy cheeses, artisan cured meats folded petal by petal, seasonal fruits at peak ripeness, and accompaniments chosen for balance in texture and color.',
    paragraph2:
      'More than food presentation, each creation is conceived as an invitation to pause, gather around the table, and share something genuinely special.',
    pillars: [
      {
        label: '01 / INGREDIENT CURATION',
        text: 'Selected daily for freshness, contrast of flavor, and visual harmony.',
      },
      {
        label: '02 / SCULPTURAL PRESENTATION',
        text: 'Hand-folded charcuterie roses and intentional architectural composition.',
      },
      {
        label: '03 / THE ART OF SHARING',
        text: 'Created in Louisville, Kentucky for intimate moments and grand celebrations alike.',
      },
    ],
  },
  es: {
    eyebrow: 'LA EXPERIENCIA ELYS',
    title: 'Creado a mano, pensado para compartir.',
    lead: 'Detrás de Ely’s Charcuterie está Elianne Lafuente, guiada por la convicción de que los pequeños detalles transforman una reunión en un recuerdo inolvidable.',
    paragraph1:
      'Cada tabla, cesta y caja comienza con una selección cuidadosa de ingredientes: quesos cremosos y madurados, embutidos doblados pétalo a pétalo, frutas frescas de estación y acompañamientos elegidos por su equilibrio de sabor y textura.',
    paragraph2:
      'Más que una presentación gastronómica, cada propuesta nace como una invitación a detenerse, reunirse alrededor de la mesa y compartir algo verdaderamente especial.',
    pillars: [
      {
        label: '01 / SELECCIÓN DE INGREDIENTES',
        text: 'Elegidos por su frescura, contraste de sabores y armonía visual.',
      },
      {
        label: '02 / COMPOSICIÓN ESCULTURAL',
        text: 'Rosas de charcutería hechas a mano y cuidado en cada detalle.',
      },
      {
        label: '03 / EL ARTE DE COMPARTIR',
        text: 'Creado en Louisville, Kentucky para momentos íntimos y grandes celebraciones.',
      },
    ],
  },
};
