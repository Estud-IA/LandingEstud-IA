# Fase 03 — Navegación, hero, franja y barra de descarga (implementada y verificada 2026-11-17; falta prueba manual)

**Objetivo:** la primera pantalla completa de la landing: navegación en isla, titular gigante
animado, teléfono con la clase en vivo, CTA según el dispositivo, QR, franja de datos y barra de
descarga en móvil.

**Requerimientos:** HU-01, HU-02, HU-03 · RF-01, RF-02, RF-03, RF-16, RF-17 (con póster) · RNF-01,
RNF-04.

**Punto de partida:** fase 02 verificada.

**Material de la maqueta:** hero, franja y navegación de `maqueta/index.html` y
`maqueta/css/secciones.css`; `maqueta/exportes/pantallas/directo-chat@3x.png`.

**Decisiones (2026-11-17):**
1. **El teléfono del hero muestra una imagen** (`directo-chat@3x.png`) procesada con `astro:assets`:
   AVIF/WebP, `srcset` y `fetchpriority="high"`. Es el LCP de la página; las pantallas en HTML
   animable llegan en la fase 04. `PhoneMockup` ya acepta un `video` con la imagen como póster
   (RF-17).
2. **`src/content/release.json` provisional** (`"provisional": true`): versión, peso y Android
   mínimo vienen de una sola fuente. La validación, la URL, la fecha y el SHA-256 llegan en la fase 06.
3. **QR generado al compilar** con `qrcode` hacia `${site}/descargar?origen=qr`. Mientras no haya
   dominio (A3), apunta a la URL provisional; `/descargar` llega en la fase 06.
4. **Detección del dispositivo** con un script en línea en el `<head>`, que pone
   `<html data-dispositivo="android|ios|escritorio">` antes del primer pintado. El CSS elige la
   variante. Sin JS se ve el botón de Android y, en pantallas anchas, el QR.
5. **La franja es una animación CSS** (sin GSAP), que se detiene con movimiento reducido.
6. **La barra de móvil es funcional**: un `IntersectionObserver` sobre el hero
   (`scripts/barraMovil.ts`). Funciona también con movimiento reducido. Sin JS se ve siempre.
7. **Un elemento puede activar varios módulos**: `data-motion="reveal hero-lines"`
   (`motion/index.ts`).

**Criterio de aceptación:**
- En Android, iOS y escritorio (emulados con el MCP de DevTools), el CTA cambia como dice RF-01.
- El QR se genera al compilar y apunta a `/descargar?origen=qr`; se escanea con un teléfono real
  (prueba manual).
- El titular entra letra a letra y sus líneas se desplazan con el scroll; con movimiento reducido es
  estático.
- La navegación se oculta al bajar y reaparece al subir.
- En móvil, la barra de descarga aparece al salir del hero.

**Verificación al 2026-11-17 (Node 26.13):**
- `build`, `check` (0 errores, 0 avisos), `lint` y `format:check` en verde.
- **1440 px:** igual a la maqueta. Se detecta "escritorio", el QR lleva la URL esperada y la imagen
  del teléfono se sirve en AVIF.
- **Scroll:** las líneas del titular se separan (−30 px / +38 px), la isla se oculta al bajar y
  vuelve al subir, y la franja se mueve.
- **Android (390 px):** sin QR. La barra está oculta en el hero y visible al bajar. Sin scroll
  horizontal.
- **iPhone:** sin APK, con "Próximamente en iOS" y enlace a la lista de espera.
- **Movimiento reducido:** solo se descarga el script de arranque; la franja está quieta y la barra
  sigue funcionando. Ninguna petición externa.
- **Lighthouse móvil:** accesibilidad, buenas prácticas y SEO en 100.
- **Traza con CPU 4× y 4G rápida:** LCP 816 ms, CLS 0,00. Lighthouse midió en su propia carga un
  CLS de 0,074, dentro del límite de 0,1; se revisa en la fase 07.
- **Corregido durante la verificación:**
  - El botón grande se salía del margen a 390 px; ahora ocupa todo el ancho y su texto puede
    partirse.
  - Faltaba un espacio en el texto de iOS.
  - El titular se partía en 3 líneas a 390 px: su mínimo bajó a `2.6rem`.

---

- [x] **03-1. Componentes (2026-11-17):** `PhoneMockup` (imagen o video con póster), `DownloadCta`
      (tres variantes), `QrCode`, `InsigniaNivel`, `ChipXp`.
- [x] **03-2. Pantalla del hero (2026-11-17):** PNG de la maqueta en `src/assets/pantallas/`, con los
      flotantes EN VIVO, +10 XP y nivel, y las formas "+".
- [x] **03-3. `Nav.astro` + `motion/navHide.ts` (2026-11-17)**, que también se muestra cuando
      recibe el foco del teclado.
- [x] **03-4. `Hero.astro` + `motion/heroLines.ts` + `motion/heroIntro.ts` (2026-11-17).**
- [x] **03-5. Detección del dispositivo (2026-11-17):** script en línea en `BaseLayout.astro`
      (en lugar de `scripts/device.ts`).
- [x] **03-6. `QrCode.astro` (2026-11-17)** con `qrcode` al compilar.
- [x] **03-7. `FranjaPrueba.astro` (2026-11-17)** con animación CSS (en lugar de `motion/marquee.ts`).
- [x] **03-8. `BarraDescargaMovil.astro` + `scripts/barraMovil.ts` (2026-11-17).**
- [x] **03-9. `index.astro` (2026-11-17):** nav, hero, franja, barra y un bloque temporal con los
      anclajes `#clase`, `#creadores`, `#descargar` y `#faq`, que se reemplaza en las fases 04 a 06.

## Prueba manual

- [ ] Escanear el QR con un Android real (hoy abre la URL provisional, que todavía no existe).
- [ ] Abrir la landing en un Android y en un iPhone reales y comprobar el CTA y la barra.

---

[← Volver al roadmap](README.md)
