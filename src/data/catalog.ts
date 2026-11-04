import { CatalogItem, CategoryId, GalleryPhoto } from '../types/catalog';

export const BRAND_CONFIG = {
  businessName: 'Ely’s Charcuterie',
  founderName: 'Elianne Lafuente',
  location: 'Louisville, Kentucky',
  whatsappNumber: '15025550199',
  whatsappDisplay: '+1 (502) 555 0199',
  instagramHandle: '@elyscharcuterie',
  instagramUrl: 'https://instagram.com/elyscharcuterie',
  email: 'hello@elyscharcuterie.com',
};

export const FOUNDER_STORY = {
  es: {
    eyebrow: 'El Atelier · Louisville, Kentucky',
    title: 'Soy Elianne Lafuente, la persona detrás de Ely’s Charcuteria',
    paragraph1:
      'Este emprendimiento nace de mi deseo de crear algo propio y de transformar los pequeños detalles en momentos especiales. Encontré en la charcutería una manera de expresar mi creatividad y de aportar algo bonito a las celebraciones de los demás.',
    paragraph2:
      'Cada tabla representa la ilusión y el cariño que pongo en este proyecto. Mi propósito es crear propuestas que inviten a compartir, disfrutar y reunir a las personas alrededor de una mesa.',
    quote: '“Transformar los pequeños detalles en momentos especiales alrededor de una mesa.”',
    locationTag: 'Hecho a mano con dedicación en Louisville, Kentucky',
  },
  en: {
    eyebrow: 'The Atelier · Louisville, Kentucky',
    title: 'I am Elianne Lafuente, the creator behind Ely’s Charcuterie',
    paragraph1:
      'This journey was born from my desire to build something of my own and transform small details into unforgettable moments. In charcuterie, I found a canvas to express my creativity and bring beauty to other people’s celebrations.',
    paragraph2:
      'Every board represents the passion, warmth, and care I pour into this project. My purpose is to craft proposals that invite people to share, savor, and gather around the table.',
    quote: '“Transforming small details into special moments shared around the table.”',
    locationTag: 'Handcrafted with love in Louisville, Kentucky',
  },
};

export const CATEGORIES: { id: CategoryId; label: { es: string; en: string } }[] = [
  { id: 'all', label: { es: 'Colección Completa', en: 'Full Collection' } },
  { id: 'tablas', label: { es: 'Tablas de Autor', en: 'Signature Boards' } },
  { id: 'cajas', label: { es: 'Cajas & Regalos', en: 'Gift Boxes' } },
  { id: 'individuales', label: { es: 'Grazing Cups', en: 'Grazing Cups' } },
  { id: 'eventos', label: { es: 'Mesas & Carrito', en: 'Events & Mobile Bar' } },
];

export const CATALOG_ITEMS: CatalogItem[] = [
  {
    id: 'tabla-rosa-imperial',
    category: 'tablas',
    featured: true,
    badge: { es: 'Pieza Insignia', en: 'House Signature' },
    name: {
      es: 'Tabla Rosa de Autor “Ely’s”',
      en: 'Signature Rose Charcuterie Board',
    },
    shortDescription: {
      es: 'Servida sobre madera de nogal con rosas de jamón y salami plegadas a mano, Brie con panal de miel, higos frescos y Manchego curado.',
      en: 'Served on walnut wood with hand-folded prosciutto and salami roses, Brie with honeycomb, fresh figs, and aged Manchego.',
    },
    fullDescription: {
      es: 'Una composición equilibrada pensada para ser el centro de todas las miradas. Incluye rosas artesanales de salami italiano y prosciutto di Parma, queso Manchego curado, rueda de Brie cremoso coronada con panal de miel natural, higos frescos, uvas seleccionadas, frutos secos tostados, aceitunas marinadas y galletas artesanales.',
      en: 'A balanced composition designed to be the centerpiece of your gathering. Features handcrafted Italian salami and Prosciutto di Parma roses, aged Manchego, creamy Brie wheel topped with raw honeycomb, fresh mission figs, grapes, roasted nuts, marinated olives, and artisan crackers.',
    },
    ingredients: {
      es: [
        'Rosas de Prosciutto di Parma y Salami Génova',
        'Queso Brie doble crema con panal de miel',
        'Queso Manchego curado 6 meses y Gouda añejo',
        'Higos frescos, uvas de temporada y romero aromático',
        'Aceitunas verdes marinadas, almendras y crackers de semillas',
      ],
      en: [
        'Prosciutto di Parma and Genoa Salami roses',
        'Double-cream Brie wheel with raw honeycomb',
        '6-month aged Manchego and aged Gouda',
        'Fresh figs, seasonal grapes and aromatic rosemary',
        'Marinated green olives, almonds and seed crackers',
      ],
    },
    pairingNote: {
      es: 'Ideal con Pinot Noir, Cabernet Sauvignon suave o Prosecco Brut.',
      en: 'Pairs beautifully with Pinot Noir, soft Cabernet Sauvignon, or Prosecco Brut.',
    },
    image: 'images/hero_grazing_table.jpg',
    secondaryImage: 'images/7_tabla_madera_grabada.jpg',
    sizes: [
      {
        id: 'small',
        label: { es: 'Íntima', en: 'Intimate' },
        servings: { es: '4 a 6 personas', en: '4 to 6 guests' },
        price: 95,
      },
      {
        id: 'medium',
        label: { es: 'Reunión', en: 'Gathering' },
        servings: { es: '8 a 10 personas', en: '8 to 10 guests' },
        price: 145,
      },
      {
        id: 'large',
        label: { es: 'Celebración', en: 'Celebration' },
        servings: { es: '12 a 16 personas', en: '12 to 16 guests' },
        price: 195,
      },
    ],
  },
  {
    id: 'caja-gourmet-unboxing',
    category: 'cajas',
    featured: true,
    badge: { es: 'Ideal para Regalo', en: 'Luxury Gift' },
    name: {
      es: 'Caja Gourmet “Detalle Especial”',
      en: 'Luxury Keepsake Grazing Box',
    },
    shortDescription: {
      es: 'Presentación rígida en negro mate con papel encerado sellado en oro, rosa central de charcutería, quesos finos, higos y miel.',
      en: 'Matte black keepsake box wrapped in gold-sealed deli paper with a signature salami rose, fine cheeses, fresh figs, and honey.',
    },
    fullDescription: {
      es: 'Pensada para sorprender en cumpleaños, aniversarios, agradecimientos o tardes de picnic en Louisville. Viene lista para degustar dentro de nuestra caja rígida con sello dorado e incluye tarjeta de dedicatoria personalizada.',
      en: 'Crafted to surprise someone special on birthdays, anniversaries, thank-you gifts, or picnics across Louisville. Arrives ready to enjoy in our signature gold-sealed box with a personalized note card.',
    },
    ingredients: {
      es: [
        'Rosa central de salami artesanal y lonchas de jamón curado',
        'Cuñas de queso Manchego y Brie con miel',
        'Higos frescos, uvas negras y frutos secos',
        'Empaque de regalo con papel encerado y sello dorado',
        'Tarjeta de dedicatoria personalizada incluida',
      ],
      en: [
        'Centerpiece artisan salami rose and cured prosciutto',
        'Manchego wedges and Brie with honey',
        'Fresh figs, dark grapes and roasted almonds',
        'Gift packaging with custom wax paper and gold seal',
        'Complimentary handwritten greeting card',
      ],
    },
    pairingNote: {
      es: 'Perfecta con Champagne, Rosé frío o agua mineral con gas y cítricos.',
      en: 'Lovely with Champagne, chilled Rosé, or sparkling citrus water.',
    },
    image: 'images/1_caja_gourmet_unboxing.jpg',
    secondaryImage: 'images/11_caja_alargada_horizontal_y_cinta.jpg',
    sizes: [
      {
        id: 'duo',
        label: { es: 'Box Pareja', en: 'Duo Box' },
        servings: { es: '2 a 3 personas', en: '2 to 3 guests' },
        price: 65,
      },
      {
        id: 'sharing',
        label: { es: 'Box Compartir', en: 'Sharing Box' },
        servings: { es: '4 a 6 personas', en: '4 to 6 guests' },
        price: 98,
      },
    ],
  },
  {
    id: 'caja-panoramica-long-box',
    category: 'cajas',
    badge: { es: 'Edición Boutique', en: 'Boutique Edition' },
    name: {
      es: 'Caja Panorámica con Lazo de Satén',
      en: 'Panoramic Ribbon Grazing Box',
    },
    shortDescription: {
      es: 'Caja alargada con doble ventana, faja central negra mate y lazo de satén. Lista para lucir en el centro de la mesa.',
      en: 'Sleek elongated window box tied with a satin ribbon and branded sleeve. Ready to place at the center of the table.',
    },
    fullDescription: {
      es: 'Una presentación sofisticada que enamora desde el primer vistazo. Su formato alargado permite disponer una galería de rosas de charcutería, quesos suaves y maduros, frutas frescas y acompañamientos gourmet lista para colocar directamente en el centro de la mesa.',
      en: 'A sophisticated presentation that captivates at first glance. Its elongated silhouette showcases a gallery of charcuterie roses, soft and aged cheeses, fresh fruits, and gourmet accompaniments ready to place right at the center of the table.',
    },
    ingredients: {
      es: [
        'Dúo de rosas de charcutería (Salami y Soppressata)',
        'Pliegues de Prosciutto e higos frescos partidos',
        'Queso Brie cremoso, uvas rojas y romero fresco',
        'Faja central negra mate y lazo en cinta de satén',
      ],
      en: [
        'Duo of charcuterie roses (Salami and Soppressata)',
        'Prosciutto ribbons and halved fresh figs',
        'Creamy Brie, red grapes and fresh rosemary',
        'Matte black sleeve and satin ribbon bow',
      ],
    },
    pairingNote: {
      es: 'Marida con Chardonnay con barrica ligera o vino tinto crianza.',
      en: 'Pairs with lightly oaked Chardonnay or medium-bodied red wine.',
    },
    image: 'images/11_caja_alargada_horizontal_y_cinta.jpg',
    secondaryImage: 'images/1_caja_gourmet_unboxing.jpg',
    sizes: [
      {
        id: 'standard',
        label: { es: 'Panorámica', en: 'Panoramic' },
        servings: { es: '3 a 5 personas', en: '3 to 5 guests' },
        price: 78,
      },
      {
        id: 'grand-ribbon',
        label: { es: 'Doble Lazo', en: 'Grand Ribbon' },
        servings: { es: '6 a 8 personas', en: '6 to 8 guests' },
        price: 115,
      },
    ],
  },
  {
    id: 'grazing-cups-conos',
    category: 'individuales',
    featured: true,
    badge: { es: 'Cócteles & Eventos', en: 'Events & Cocktails' },
    name: {
      es: 'Grazing Cups & Conos Individuales',
      en: 'Individual Grazing Cups & Cones',
    },
    shortDescription: {
      es: 'Vasos individuales con mini rosa de salami, dados de queso artesanal, grissini italiano, frutos secos y aceitunas.',
      en: 'Individual charcuterie cups filled with a mini salami rose, artisan cheese cubes, breadsticks, dried fruits, and olives.',
    },
    fullDescription: {
      es: 'La opción más práctica y elegante para baby showers, bridal showers, inauguraciones, eventos corporativos y cócteles en Louisville. Cada invitado disfruta de su propia porción individual cuidadosamente decorada con nuestro sello oficial.',
      en: 'The most practical and stylish choice for baby showers, bridal showers, grand openings, corporate mixers, and cocktail parties in Louisville. Each guest enjoys their own thoughtfully styled individual portion.',
    },
    ingredients: {
      es: [
        'Mini rosa de salami y pliegue de jamón serrano',
        'Dados de quesos seleccionados en brocheta de bambú',
        'Aceitunas rellenas, albaricoques secos y nueces',
        'Palitroques italianos (Grissini) y ramita de romero',
      ],
      en: [
        'Mini salami rose and serrano ham ribbon',
        'Artisan cheese cubes on bamboo pick',
        'Stuffed olives, dried apricots and nuts',
        'Italian grissini breadsticks and fresh rosemary sprig',
      ],
    },
    pairingNote: {
      es: 'Ideales para acompañar con cócteles, mimosas o barra de espumosos.',
      en: 'Perfect alongside signature cocktails, mimosas, or a bubbly bar.',
    },
    image: 'images/2_bolsa_boutique_y_grazing_cups.jpg',
    secondaryImage: 'images/16_empaque_vacio_y_individual_mesa.jpg',
    sizes: [
      {
        id: 'pack-12',
        label: { es: '12 Vasos', en: '12 Cups' },
        servings: { es: '12 porciones individuales', en: '12 individual servings' },
        price: 150,
      },
      {
        id: 'pack-24',
        label: { es: '24 Vasos', en: '24 Cups' },
        servings: { es: '24 porciones individuales', en: '24 individual servings' },
        price: 280,
      },
      {
        id: 'pack-40',
        label: { es: '40 Vasos', en: '40 Cups' },
        servings: { es: '40 porciones individuales', en: '40 individual servings' },
        price: 440,
      },
    ],
  },
  {
    id: 'tabla-nogal-conservas',
    category: 'tablas',
    badge: { es: 'Edición Colección', en: 'Keepsake Gift' },
    name: {
      es: 'Tabla de Nogal Grabada & Conservas',
      en: 'Engraved Walnut Board & Preserves',
    },
    shortDescription: {
      es: 'Incluye tabla de madera de nogal grabada a láser para conservar, selección de charcutería, mermelada de higos y aceitunas.',
      en: 'Includes a keepsake laser-engraved walnut wood board, artisan charcuterie selection, house fig jam, and marinated olives.',
    },
    fullDescription: {
      es: 'Un regalo inolvidable para bodas, estrenos de hogar o amantes de la buena mesa. Además de nuestra selección fresca de quesos y embutidos, el anfitrión conserva la tabla de madera de nogal grabada y nuestros frascos gourmet de mermelada de higos y aceitunas.',
      en: 'An unforgettable gift for weddings, housewarmings, or food lovers. Along with our fresh selection of cheeses and cured meats, the host keeps the laser-engraved walnut serving board and jars of our house fig jam and marinated olives.',
    },
    ingredients: {
      es: [
        'Tabla de madera de nogal grabada a láser (conservar)',
        'Frasco de Mermelada de Higos (Fig Jam) de la casa',
        'Frasco de Aceitunas Marinadas con hierbas',
        'Selección de 3 quesos premium y 2 embutidos curados',
      ],
      en: [
        'Keepsake laser-engraved walnut wood board',
        'Full jar of house Fig Jam',
        'Full jar of herb-marinated Olives',
        'Selection of 3 premium cheeses and 2 cured meats',
      ],
    },
    pairingNote: {
      es: 'Acompañar con Bourbon de Kentucky, Rioja Reserva o Malbec.',
      en: 'Pair with Kentucky Bourbon, Rioja Reserva, or Malbec.',
    },
    image: 'images/3_delantal_tablas_y_conservas.jpg',
    secondaryImage: 'images/7_tabla_madera_grabada.jpg',
    sizes: [
      {
        id: 'gift-set',
        label: { es: 'Set Regalo', en: 'Keepsake Set' },
        servings: { es: '4 a 6 personas + tabla', en: '4 to 6 guests + board' },
        price: 165,
      },
      {
        id: 'gift-imperial',
        label: { es: 'Set Anfitrión', en: 'Host Edition' },
        servings: { es: '8 a 10 personas + tabla', en: '8 to 10 guests + board' },
        price: 215,
      },
    ],
  },
  {
    id: 'tabla-maridaje-vino',
    category: 'tablas',
    badge: { es: 'Veladas Íntimas', en: 'Evening Pairing' },
    name: {
      es: 'Tabla de Maridaje & Cata Nocturna',
      en: 'Sommelier Pairing & Tasting Board',
    },
    shortDescription: {
      es: 'Curaduría pensada para amantes del vino y el Bourbon de Kentucky: quesos de guarda, prosciutto, frutos negros, nueces y miel.',
      en: 'Curated for wine and Kentucky Bourbon lovers: aged cheeses, prosciutto ribbons, dark berries, roasted pecans, and honey.',
    },
    fullDescription: {
      es: 'Inspirada en las cenas a la luz de las velas. Seleccionamos quesos de carácter intenso junto a embutidos italianos finamente plegados, chocolate amargo al 70%, higos, moras frescas y carta impresa con notas de cata y maridaje.',
      en: 'Inspired by candlelit tastings. Features bold aged cheeses alongside finely folded Italian charcuterie, 70% dark chocolate, mission figs, fresh blackberries, and a printed tasting and pairing menu.',
    },
    ingredients: {
      es: [
        'Queso Manchego añejo, Brie trufado y Gouda de guarda',
        'Rosas de Salami Soppressata y Prosciutto di Parma',
        'Higos, moras frescas, nueces pecanas y chocolate 70%',
        'Carta impresa de maridaje sugerido por Ely’s Charcuterie',
      ],
      en: [
        'Aged Manchego, truffled Brie and reserve Gouda',
        'Soppressata salami roses and Prosciutto di Parma',
        'Mission figs, blackberries, roasted pecans and 70% dark chocolate',
        'Printed tasting and pairing card by Ely’s Charcuterie',
      ],
    },
    pairingNote: {
      es: 'Excelente con Cabernet Sauvignon, Syrah o Kentucky Straight Bourbon.',
      en: 'Exceptional with Cabernet Sauvignon, Syrah, or Kentucky Straight Bourbon.',
    },
    image: 'images/4_carta_menu_y_maridaje_vino.jpg',
    secondaryImage: 'images/14_cuchillos_servilletas_y_cinta_horizontal.jpg',
    sizes: [
      {
        id: 'pairing-duo',
        label: { es: 'Cata Pareja', en: 'Duo Tasting' },
        servings: { es: '2 a 4 personas', en: '2 to 4 guests' },
        price: 88,
      },
      {
        id: 'pairing-group',
        label: { es: 'Mesa de Cata', en: 'Tasting Table' },
        servings: { es: '6 a 8 personas', en: '6 to 8 guests' },
        price: 138,
      },
    ],
  },
  {
    id: 'mesa-grazing-eventos',
    category: 'eventos',
    featured: true,
    isCustomQuote: true,
    badge: { es: 'Bodas & Celebraciones', en: 'Weddings & Events' },
    name: {
      es: 'Mesa Escenográfica (Grazing Table)',
      en: 'Bespoke Event Grazing Table',
    },
    shortDescription: {
      es: 'Montaje arquitectónico en tu locación de Louisville: niveles en nogal, caminos de lino crema, velas doradas, flores y abundancia gourmet.',
      en: 'Full on-site styling at your Louisville venue: walnut risers, cream linen runners, brass candles, florals, and abundant gourmet spreads.',
    },
    fullDescription: {
      es: 'Transformamos cualquier rincón de tu celebración en una obra de arte gastronómica. Nos encargamos del diseño visual, montaje en diferentes alturas, selección de quesos nacionales e importados, charcutería fina, panes artesanales, frutas de estación, mieles, frutos secos y detalles florales en armonía con los colores de tu evento.',
      en: 'We transform your celebration space into an edible work of art. Our team handles the visual design, multi-tiered wood risers, imported and local cheeses, fine charcuterie, artisan breads, seasonal fruits, honeys, nuts, and floral touches tailored to your event palette.',
    },
    ingredients: {
      es: [
        'Montaje presencial en Louisville y alrededores',
        'Estructuras y niveles en madera de nogal, lino crema y velas',
        'Variedad de 5 quesos artesanales y 4 embutidos en rosas y pliegues',
        'Panes rústicos, crackers, dips, mermeladas, miel en panal y frutas',
        'Utensilios en bronce y madera con servilletas de cóctel',
      ],
      en: [
        'Full on-site setup across Louisville and surrounding areas',
        'Multi-level walnut risers, cream linens and candle styling',
        '5 artisan cheeses and 4 cured meats styled in roses and folds',
        'Rustic breads, crackers, dips, jams, honeycomb and fresh fruit',
        'Serving utensils and cocktail napkins included',
      ],
    },
    pairingNote: {
      es: 'Diseñada a medida desde 25 hasta más de 150 invitados.',
      en: 'Custom-designed for gatherings from 25 up to 150 guests.',
    },
    image: 'images/mesa_evento_grazing.jpg',
    secondaryImage: 'images/14_cuchillos_servilletas_y_cinta_horizontal.jpg',
    sizes: [
      {
        id: 'table-25',
        label: { es: 'Petite', en: 'Petite' },
        servings: { es: '25 a 35 invitados', en: '25 to 35 guests' },
        price: 550,
      },
      {
        id: 'table-50',
        label: { es: 'Clásica', en: 'Classic' },
        servings: { es: '40 a 65 invitados', en: '40 to 65 guests' },
        price: 950,
      },
      {
        id: 'table-100',
        label: { es: 'Imperial', en: 'Imperial' },
        servings: { es: '75 a 120 invitados', en: '75 to 120 guests' },
        price: 1550,
      },
    ],
  },
  {
    id: 'carrito-movil-charcuteria',
    category: 'eventos',
    featured: true,
    isCustomQuote: true,
    badge: { es: 'Experiencia Exclusiva', en: 'Signature Experience' },
    name: {
      es: 'Carrito Móvil (Mobile Grazing Bar)',
      en: 'Mobile Charcuterie Cart & Bar',
    },
    shortDescription: {
      es: 'Nuestro carrito negro mate y bronce con toldo crema lleva una barra interactiva de charcutería directamente a tu celebración.',
      en: 'Our matte-black and brass mobile cart with a cream canopy brings an interactive charcuterie bar straight to your event.',
    },
    fullDescription: {
      es: 'Sorprende a tus invitados con una estación interactiva e inolvidable. Ideal para recepciones de boda, bridal showers, eventos al aire libre y celebraciones privadas en Louisville. Tus invitados pueden personalizar su cono o plato mientras disfrutan de una puesta en escena única.',
      en: 'Delight your guests with an unforgettable interactive station. Perfect for wedding cocktail hours, bridal showers, outdoor soirées, and private events in Louisville. Guests can enjoy freshly styled cones or plates from a show-stopping setup.',
    },
    ingredients: {
      es: [
        'Alquiler y montaje del Carrito Oficial Ely’s Charcuterie',
        'Abastecimiento completo de conos individuales o bandejas de degustación',
        'Decoración cálida en tonos crema, negro y dorado suave',
        'Opción de servicio asistido durante tu evento',
      ],
      en: [
        'Rental and setup of the official Ely’s Charcuterie Mobile Cart',
        'Full stocking of grazing cones or tasting plates',
        'Warm styling in cream, matte black and soft gold',
        'Optional attendant service during your event',
      ],
    },
    pairingNote: {
      es: 'El complemento soñado para horas de cóctel al aire libre o en salón.',
      en: 'The dream addition for indoor or outdoor cocktail hours.',
    },
    image: 'images/8_carrito_cocteles_y_charcuteria.jpg',
    secondaryImage: 'images/13_vehiculo_catering_van_horizontal.jpg',
    sizes: [
      {
        id: 'cart-base',
        label: { es: 'Hasta 40 pax', en: 'Up to 40 guests' },
        servings: { es: '2 horas de evento', en: '2-hour service' },
        price: 680,
      },
      {
        id: 'cart-plus',
        label: { es: '40 a 80 pax', en: '40 to 80 guests' },
        servings: { es: '3 horas de evento', en: '3-hour service' },
        price: 1050,
      },
    ],
  },
];

export const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: 'gal-1',
    src: 'images/hero_grazing_table.jpg',
    category: 'tablas',
    title: {
      es: 'Tabla Rosa de Autor al Sol',
      en: 'Sunlit Signature Rose Board',
    },
    caption: {
      es: 'Rosas hechas pétalo a pétalo, queso Brie con panal de miel, higos frescos y Manchego sobre piedra travertino y madera.',
      en: 'Hand-folded salami roses, Brie with raw honeycomb, fresh figs, and Manchego on warm travertine stone and walnut.',
    },
  },
  {
    id: 'gal-2',
    src: 'images/mesa_evento_grazing.jpg',
    category: 'eventos',
    title: {
      es: 'Mesa Escenográfica a Múltiples Alturas',
      en: 'Multi-Tiered Celebration Grazing Table',
    },
    caption: {
      es: 'Montaje a varios niveles con caminos de lino crema, candelabros en bronce y abundancia de quesos y frutas.',
      en: 'Multi-level wooden risers styled with cream linen runners, brass taper candles, and abundant cheeses and fruits.',
    },
  },
  {
    id: 'gal-3',
    src: 'images/1_caja_gourmet_unboxing.jpg',
    category: 'cajas',
    title: {
      es: 'Caja Rígida Gourmet y Sello en Oro',
      en: 'Luxury Keepsake Box & Gold Seal',
    },
    caption: {
      es: 'Cada pedido se envuelve cuidadosamente en papel encerado con patrón de rosas y nuestro sello en dorado.',
      en: 'Every box is carefully wrapped in rose-patterned deli paper and finished with our signature gold seal.',
    },
  },
  {
    id: 'gal-4',
    src: 'images/8_carrito_cocteles_y_charcuteria.jpg',
    category: 'eventos',
    title: {
      es: 'Mobile Grazing Bar para Bodas',
      en: 'Mobile Grazing Cart for Weddings',
    },
    caption: {
      es: 'Nuestra barra móvil con toldo crema y detalles en bronce lleva el encanto de Ely’s a jardines y salones en Louisville.',
      en: 'Our custom mobile bar with a cream canopy and brass accents brings Ely’s charm to Louisville gardens and venues.',
    },
  },
  {
    id: 'gal-5',
    src: 'images/2_bolsa_boutique_y_grazing_cups.jpg',
    category: 'cajas',
    title: {
      es: 'Grazing Cups & Bolsa Boutique',
      en: 'Grazing Cups & Boutique Gift Bag',
    },
    caption: {
      es: 'Vasos individuales listos para disfrutar en cócteles, baby showers y reuniones corporativas.',
      en: 'Individual charcuterie cups ready to enjoy at cocktail hours, showers, and corporate gatherings.',
    },
  },
  {
    id: 'gal-6',
    src: 'images/11_caja_alargada_horizontal_y_cinta.jpg',
    category: 'cajas',
    title: {
      es: 'Caja Panorámica con Lazo de Satén',
      en: 'Panoramic Ribbon Grazing Box',
    },
    caption: {
      es: 'Un detalle elegante y delicado listo para colocar directamente en el centro de la mesa.',
      en: 'An elegant, delicate gift ready to place right at the center of the table.',
    },
  },
  {
    id: 'gal-7',
    src: 'images/7_tabla_madera_grabada.jpg',
    category: 'detalles',
    title: {
      es: 'Grabado Artesanal en Nogal',
      en: 'Laser-Engraved Walnut Wood Detail',
    },
    caption: {
      es: 'Cuidamos cada acabado para que la experiencia alrededor de la mesa sea cálida y memorable.',
      en: 'We care for every detail so the experience around the table feels warm and memorable.',
    },
  },
  {
    id: 'gal-8',
    src: 'images/14_cuchillos_servilletas_y_cinta_horizontal.jpg',
    category: 'detalles',
    title: {
      es: 'Lino Crema & Cuchillería en Madera',
      en: 'Cream Linen & Walnut Accents',
    },
    caption: {
      es: 'Servilletas bordadas y accesorios artesanales que acompañan nuestros montajes de eventos.',
      en: 'Embroidered linen napkins and artisan accessories that accompany our event setups.',
    },
  },
];
