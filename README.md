# Ely's Charcuterie — Sitio Web Oficial (Louisville, Kentucky)

Sitio web oficial de **Ely's Charcuterie**, emprendimiento de tablas artesanales, cajas de regalo y mesas de charcutería fundado por **Elianne Lafuente** en **Louisville, Kentucky**.

## ✨ Características Principales

- **Estética Cálida & Minimalista**: Paleta en tonos beige/crema (`#FDFBF7` / `#FAF3E3`), dorado suave (`#C59B4E` / `#F3D18D`) y negro gourmet (`#141111`), con tipografía editorial (`Cormorant Garamond` + `Plus Jakarta Sans`).
- **Bilingüe (Español / Inglés)**: Selector interactivo `ES / EN` en la barra de navegación pensado para atender tanto a clientes hispanohablantes como angloparlantes en Louisville, KY.
- **Sección "Mi Historia"**: Presentación personal de Elianne Lafuente y la filosofía detrás de cada tabla.
- **Catálogo Escalable e Interactivo**: Filtros por categoría (*Tablas Artesanales*, *Cajas & Regalos*, *Vasos & Conos*, *Mesas & Eventos*), selector de tamaños y precios, vista detallada de ingredientes/maridaje y bolsa de pedido directo a WhatsApp.
- **Galería de Trabajos con Lightbox**: Fotografías en gran formato de tablas, cajas, carrito móvil y mesas de eventos.
- **Cómo Ordenar & Cotizador de Eventos**: Explicación paso a paso y formulario interactivo de cotización con envío directo a WhatsApp o correo electrónico.

---

## 🛠️ Cómo hacer crecer el catálogo o actualizar datos de contacto

Toda la información editable está centralizada en un solo archivo fácil de mantener:
👉 [`src/data/catalog.ts`](./src/data/catalog.ts)

1. **Actualizar teléfono de WhatsApp o Instagram**:
   Edita el objeto `BRAND_CONFIG` al inicio de `src/data/catalog.ts`.
2. **Agregar nuevas tablas o servicios**:
   Agrega un nuevo bloque dentro de `CATALOG_ITEMS` en `src/data/catalog.ts` y coloca su fotografía en `public/images/`.

---

## 🚀 Comandos de Desarrollo

```bash
# Instalar dependencias
npm install

# Iniciar servidor local
npm run dev

# Compilar para producción
npm run build
```
