# Fase 07 — Rendimiento, accesibilidad y SEO (implementada y verificada 2026-11-18; falta prueba manual)

**Objetivo:** verificar y corregir la landing completa contra los RNF antes de publicarla.

**Requerimientos:** HU-12, HU-13 · RF-15 · RNF-01 a RNF-07, RNF-12.

**Punto de partida:** fases 03 a 06 cerradas.

**Material de la maqueta:** `maqueta/exportes/piezas/og-image.png` (1200 × 630), copiada a
`landing/public/og-image.png`.

**Criterio de aceptación** (con el MCP de DevTools, en móvil):
- Lighthouse: rendimiento ≥ 90, accesibilidad ≥ 95, buenas prácticas ≥ 95, SEO ≥ 95.
- LCP < 2,5 s, CLS < 0,1, INP < 200 ms.
- JS inicial ≤ 100 KB gz; cada video ≤ 1,5 MB.
- Sin scroll horizontal de 320 a 1920 px.
- Movimiento reducido: contenido completo y sin animaciones.
- Al compartir el enlace se ven la imagen, el título y la descripción correctos.

## Mediciones

Condiciones: `npm run preview`, Chrome con el MCP de DevTools. **Móvil:** 412 × 915, DPR 2,625,
CPU 4× y 4G rápida. **Escritorio:** 1440 × 900, CPU 4×.

| Métrica | Antes | Después |
|---|---|---|
| LCP móvil (carga en frío) | 1270 ms | 1150–1350 ms (varía entre trazas) |
| CLS de carga (Lighthouse móvil) | 0,079 | 0 |
| CLS durante el scroll completo (escritorio) | 2,00 | 0 |
| Reflows forzados al arrancar las animaciones (móvil) | 849 ms | 162 ms |
| JS total (gz) | ≈ 60 KB | 63 KB (todo diferido salvo 2,4 KB) |
| Archivo de imagen más pesado en `dist/_astro` | ≈ 1,2 MB (PNG) | 234 KB (JPG) |
| `dist/_astro` en disco | 16 MB | 11 MB (son variantes; cada visita baja una por imagen) |
| Lighthouse: accesibilidad / buenas prácticas / SEO | 100 / 100 / 100 en `/` | 100 / 100 / 100 en móvil en `/`, `/privacidad`, `/terminos` y `/404`, y en escritorio en `/` |
| `npm audit` | 10 avisos altos (R9) | 0 |

**Rendimiento de Lighthouse:** la auditoría del MCP no incluye la categoría de rendimiento. Se mide
con trazas (`performance_start_trace`): LCP, CLS, reflows y tareas largas.

**Tareas largas durante el scroll** (escritorio, CPU 4×): 8 de 50–80 ms (≈ 15–20 ms sin
limitar), todas de ScrollTrigger y Lenis al entrar y salir de los pines. No hay tareas largas de
código propio.

## Decisiones y correcciones

1. **Arranque diferido de las animaciones** (`src/motion/index.ts`): cada `reveal` divide el texto y
   mide, lo que fuerza un layout de toda la página. Ahora `reveal`, `stagger`, `counter` y `fill`
   que están a más de 1,5 pantallas se inician con un `IntersectionObserver` media pantalla antes de
   llegar. Su ScrollTrigger existe antes de que el elemento entre, así que el efecto es el mismo.
   Los pines, la navegación y el cambio de tema se siguen iniciando al cargar.
2. **Pin del carrusel de Shorts con `pinType: 'transform'`:** el cambio a `position: fixed` al
   entrar y salir del pin contaba como desplazamiento de diseño (CLS 1,0 cada vez). Las
   transformaciones no cuentan. Comprobado fotograma a fotograma: la sección queda en `top: 0`
   durante todo el pin y no tiembla.
3. **Imágenes:** respaldo JPG (calidad 80) en lugar de PNG; anchos 1×, 2×, 2,7× y 3× en
   `PhoneMockup` (muchos Android tienen DPR 2,625) y `sizes` reales en "Así se vive una clase".
4. **Fuentes:** precarga de `outfit-latin-wght-normal.woff2` e `inter-latin-wght-normal.woff2`
   (importadas con `?url`; tienen el mismo hash que en `fonts.css`). Con esto el CLS de carga bajó a 0.
5. **Metadatos (RF-15):** Open Graph y Twitter Card en `BaseLayout` (props `imagen` e `imagenAlt`),
   `og:locale` `es_PE`. JSON-LD con `DatosEstructurados.astro`: `SoftwareApplication` en la home
   (versión, peso y Android mínimo de `release.json`; `downloadUrl` solo con APK publicado) y
   `FAQPage` desde `faq.ts`. `robots.txt` generado con la URL del sitemap a partir de `site`.
   Las páginas `noindex` (`/descargar`, `/404`) ya no declaran URL canónica.
6. **"Saltar al contenido"**: primer elemento enfocable, visible al recibir el foco, lleva al `main`
   de cada página (`#inicio` en la home, `#contenido` en las demás).
7. **Colores forzados:** la barra de XP pierde el fondo; ahora el relleno usa `CanvasText`.
8. **404:** el "404" decorativo se dibuja con `::before` (axe lo marcaba por contraste aunque es
   `aria-hidden`) y su contorno usa `paint-order: stroke fill`, que oculta los trazos internos de la
   fuente variable.
9. **Escala de texto del sistema (`<meta name="text-scale">`): no se activa.** Con la fuente raíz
   al 200 % en 390 px, el titular y los botones del hero no caben (la página llega a 588 px). El
   zoom del navegador sí funciona (320 px sin scroll horizontal). Ver riesgo R12.

## Verificación al 2026-11-18 (Node 26.13)

- `build`, `check` (0 errores, 0 avisos), `lint` y `format:check` en verde.
- **Lighthouse:** accesibilidad, buenas prácticas y SEO en 100 en móvil en `/`, `/privacidad` y
  `/terminos`, y en escritorio en `/`. `/404` también en 100 (modo snapshot, porque responde 404).
- **Metadatos:** las 16 etiquetas `og:*` y `twitter:*` presentes; `og:image` responde y mide
  1200 × 630; los dos JSON-LD se analizan con `JSON.parse`; `robots.txt` apunta a
  `sitemap-index.xml`; el sitemap solo tiene `/`, `/privacidad/` y `/terminos/`, igual que las
  canónicas.
- **Teclado:** el primer Tab muestra "Saltar al contenido" y Enter lleva al `main`. Los 31 elementos
  enfocables visibles muestran el anillo; en las secciones oscuras el anillo tiene 8,24:1.
- **Estructura:** un `h1`, sin saltos de nivel, `header`, `nav`, `main` y `footer`, y todos los campos
  con etiqueta.
- **Revelados diferidos:** al recorrer la página, los 19 módulos diferibles se inician y terminan
  visibles; los contadores llegan a 7 y 350 y la barra a `scale(0.72, 1)`.
- **Sin scroll horizontal** a 320, 390, 768, 1024, 1440 y 1920 px.
- **Colores forzados:** bordes y botones visibles; QR legible; barra de XP con relleno.
- **Movimiento reducido:** `html.reduced-motion`, 0 peticiones de GSAP o Lenis, contenido completo.
- **Textos:** sin voseo; "Ranking", "Short" y "App Store" son nombres de la app o de la tienda;
  Yape, iOS y Google Play siempre con "Próximamente", "pronto" o "todavía no".

---

- [x] **07-1. Auditoría Lighthouse** y corrección (2026-11-18).
- [x] **07-2. Traza de rendimiento** del scroll completo (2026-11-18): arranque diferido y pin con
      transform.
- [x] **07-3. Imágenes** (2026-11-18): AVIF/WebP + respaldo JPG, anchos por DPR, `sizes` reales.
- [x] **07-4. Accesibilidad** (2026-11-18): "Saltar al contenido", foco, colores forzados, 404.
- [x] **07-5. Metadatos** (2026-11-18): Open Graph, Twitter Card, `SoftwareApplication`, `FAQPage`,
      `robots.txt` y canónicas.
- [ ] **07-6. Compatibilidad:** solo Chrome se probó (es el que maneja el MCP). Falta la prueba manual.
- [x] **07-7. Revisión de textos** (2026-11-18).

## Prueba manual

- [ ] **Safari (iOS y macOS), Firefox, Edge y Samsung Internet.** Mirar sobre todo:
  - formularios: errores con `:user-invalid`;
  - carrusel de Shorts: `scroll-snap` en móvil y pin horizontal en escritorio (`pinType: 'transform'`);
  - estilos con `@layer`, `:has()`, `color-mix()` y la propiedad `scale` (barra de XP);
  - teléfono fijo de "Así se vive una clase" y cambio de fondo en las secciones oscuras.
- [ ] **Lector de pantalla** (TalkBack en Android y VoiceOver en iPhone): titulares divididos por
      letras, FAQ y formularios.
- [ ] **Vista previa al compartir** en WhatsApp, Facebook y X cuando haya dominio (A3); hoy la URL es
      provisional y las redes no pueden leerla.
- [ ] **Rendimiento en un Android de gama media real**.

---

[← Volver al roadmap](README.md)
