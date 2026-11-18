# Fase 06 — Descarga, FAQ, cierre y páginas legales (implementada y verificada 2026-11-18; falta prueba manual)

**Objetivo:** todo lo necesario para descargar e instalar con confianza, resolver dudas y conocer la
política de privacidad, y cerrar la landing.

**Requerimientos:** HU-01 a HU-04, HU-10, HU-11, HU-14 · RF-04, RF-05, RF-06, RF-07 (iOS), RF-12,
RF-13 · RNF-03, RNF-08.

**Punto de partida:** fase 05 verificada; los botones y el QR apuntaban a `/descargar`, que no
existía.

**Material de la maqueta:** secciones "Instálala en 3 pasos", FAQ y CTA final de
`maqueta/index.html`; `maqueta/piezas/instalacion.html`.

**Decisiones (2026-11-18):**
1. **Textos legales en borrador** con el aviso visible "Borrador pendiente de revisión legal";
   revisión de un abogado antes de publicar (riesgo R11).
2. **Correo de contacto:** `estudia425@gmail.com`, en `src/content/site.ts`.
3. **`release.json` con la forma completa**, validado con el `zod` de Astro:
   - con `provisional: false` exige `url` https, `sha256` de 64 caracteres hexadecimales y `fecha`;
   - si falla, el build se detiene.
   - Probado: con `provisional: false` sin `sha256` ni `fecha`, el build falla con
     "release.json no es válido: sha256 … fecha …".
4. **`/descargar` sin APK real no redirige:** muestra "La descarga estará disponible muy pronto".
   Con un APK publicado redirige con `location.replace` y muestra un enlace visible. Conserva
   `?origen` en `data-origen` para la fase 08. Lleva `noindex` y queda fuera del sitemap.
5. **Ficha de la versión honesta:** etiqueta "Datos provisionales"; la fecha y el SHA-256 se ven
   como "Se publica con la versión final".
6. **FAQ en `src/content/faq.ts`** (en lugar de `faq.md`), con `<details>`/`<summary>`.
7. **Lista de espera de iOS** en la sección de descarga (`#lista-ios`); "Déjanos tu correo" apunta
   ahí. **En iPhone la barra fija de descarga no se muestra**, porque no hay nada que descargar.
8. **Capturas de instalación recortadas al diálogo:** se re-exportaron de
   `maqueta/piezas/instalacion.html` a 2x, sin el fondo vacío, y se muestran como tarjetas debajo de
   cada paso. Dentro de un teléfono de 120 px no se leían.

**Criterio de aceptación:**
- `release.json` se valida al compilar.
- `/descargar` responde sin llevar nunca a un 404, con un enlace visible si el JS falla.
- La sección de descarga muestra los 3 pasos, la versión, el peso, la fecha, el Android mínimo y el
  SHA-256 (o "pendiente").
- La FAQ funciona con teclado.
- Existen `/privacidad`, `/terminos` y `/404`, enlazadas desde el pie.
- El formulario de iOS funciona como el de creadores.

**Verificación al 2026-11-18 (Node 26.13):**
- `build`, `check` (0 errores, 0 avisos), `lint` y `format:check` en verde.
- **1440 px:** pasos con capturas legibles, ficha con "Datos provisionales", QR y lista de iOS. La
  FAQ coincide con la maqueta y se abre con Enter. Cierre y pie correctos; el contacto es
  `mailto:estudia425@gmail.com`.
- **`/descargar?origen=qr`:** "disponible muy pronto", sin redirección, `noindex`,
  `data-origen="qr"`.
- **`/privacidad`:** aviso de borrador visible. **`/no-existe`:** la 404 del sitio.
- **iPhone (390 px):** "Déjanos tu correo" lleva a `/#lista-ios`. El formulario de iOS muestra el
  mensaje honesto con 0 peticiones. No hay barra fija.
- **Android (390 px):** la barra no tapa el pie; sin scroll horizontal.
- **Sitemap:** solo `/`, `/privacidad` y `/terminos`.
- **Lighthouse móvil:**
  - `/` y `/privacidad`: accesibilidad, buenas prácticas y SEO en 100.
  - `/descargar`: SEO en 66 solo por el `noindex`, que es intencional.
- **Corregido durante la verificación:**
  - El sitemap incluía `/descargar`.
  - Faltaban espacios antes de enlaces que venían tras un salto de línea (privacidad y términos;
    se usa `{' '}`).
  - En iPhone la barra fija repetía el aviso y tapaba el pie.
  - Las capturas de instalación eran ilegibles dentro del mini teléfono.

---

- [x] **06-1. `release.json` + validación al compilar (2026-11-18)** en `src/content/release.ts`.
- [x] **06-2. `pages/descargar.astro` (2026-11-18).**
- [x] **06-3. `ComoDescargar.astro` (2026-11-18)** con las capturas de instalación.
- [x] **06-4. `src/content/faq.ts` + `Faq.astro` (2026-11-18).**
- [x] **06-5. `CtaFinal.astro` + `Footer.astro` (2026-11-18).**
- [x] **06-6. `privacidad.astro`, `terminos.astro` y `404.astro` (2026-11-18)** con `LegalLayout`.
      **Borradores** pendientes de revisión legal (R11).
- [x] **06-7. Formulario de iOS (2026-11-18)**: `WaitlistForm tipo="ios"`, sin envío hasta A5.

## Prueba manual

- [ ] En un Android real: descargar desde la landing, seguir la guía, instalar y abrir la app (cuando
      exista el APK firmado, A2).
- [ ] Comparar el SHA-256 del archivo descargado con el publicado.
- [ ] Revisión legal de `/privacidad` y `/terminos`.

---

[← Volver al roadmap](README.md)
