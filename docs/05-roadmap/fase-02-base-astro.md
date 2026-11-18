# Fase 02 — Base de la landing con Astro (implementada y verificada 2026-11-17; falta prueba manual)

**Objetivo:** un proyecto Astro en `landing/` que compila, con los tokens y los componentes base
traídos de la maqueta, fuentes autoalojadas y el sistema de animación funcionando, incluido el modo
de movimiento reducido.

**Requerimientos:** RNF-04, RNF-10, y la base de RNF-01, RNF-02 y RNF-08 (fuentes sin Google Fonts).

**Punto de partida (2026-11-17):** maqueta aprobada en `maqueta/` (fase 01). Node 22.19 instalado,
actualizado a **Node 26.13** para poder usar Astro 7.

**Decisiones (2026-11-17):**
- La landing vive en **`landing/`** (D12). Rama `feature/landing-astro`, que sale de `dev`.
- **Astro 7**, la versión estable vigente. Exige **Node 22.23.4 o superior**: el equipo actualiza
  Node en lugar de fijar Astro 5.
- **Fuentes con Fontsource** (`@fontsource-variable/outfit` e `inter`), servidas desde el sitio (D13).
- Componentes con estilos propios dentro de `@layer componentes`; las variantes con atributos `data-*`,
  igual que en la maqueta.
- Solo se pasan ahora los componentes que usa la base (botón, tarjeta, etiqueta, avatar, icono). El
  resto (teléfono, tarjeta de video, burbuja, insignia, barra de XP, QR) se pasa en la fase de la
  sección que lo usa.

**Criterio de aceptación:**
- `npm run build`, `npm run check` y `npm run lint` sin errores.
- `/` y `/dev/estilos` se ven como `maqueta/componentes.html` a 390 px y a 1440 px, sin scroll
  horizontal ni errores en la consola.
- El titular de `/` se anima letra a letra y el scroll es suave.
- Con `prefers-reduced-motion: reduce`, el titular aparece sin animación y **no** se descargan GSAP ni
  Lenis.
- Ninguna petición a Google Fonts.
- El sitemap existe y no incluye `/dev/estilos`.

---

- [x] **02-1. Proyecto (2026-11-17):** `npm create astro` (plantilla mínima) en `landing/`,
      dependencias, `astro.config.mjs` (estático, sitemap sin `/dev/`), scripts `check`, `lint`,
      `format`, ESLint (configuración plana) y Prettier.
- [x] **02-2. Estilos (2026-11-17):** `tokens.css` copiado de la maqueta (fuentes de Fontsource),
      `fonts.css` y `base.css` (reset con `:where()`, reglas de Lenis).
- [x] **02-3. Componentes base (2026-11-17):** `Icon`, `TactileButton`, `TactileCard`, `Badge`,
      `Avatar`. Sprite, favicon y logo en `public/`.
- [x] **02-4. Layout (2026-11-17):** `BaseLayout.astro` y `src/content/site.ts`.
- [x] **02-5. Animación (2026-11-17):** `motion/index.ts` (carga diferida y corte con movimiento
      reducido), `lenis.ts`, `eases.ts`, `reveal.ts` y `tipos.ts`.
- [x] **02-6. Páginas (2026-11-17):** `/` provisional y `/dev/estilos`.
- [x] **02-7. Verificación (2026-11-17, con Node 26.13):**
      - `build`, `check` (0 errores, 0 avisos), `lint` y `format:check` en verde.
      - `/` y `/dev/estilos` a 1440 px y 390 px: sin scroll horizontal y consola limpia; el catálogo
        coincide con la maqueta.
      - Lenis activo y titulares divididos con SplitText. Con movimiento reducido solo se descarga el
        script de arranque (ni GSAP ni Lenis) y el texto aparece completo.
      - Fuentes servidas desde el sitio (solo el subconjunto latino); ninguna petición a Google.
      - Sitemap solo con `/`.
      - Lighthouse móvil de `/`: accesibilidad, buenas prácticas y SEO en 100.
      - **Corregido durante la verificación:** SplitText ponía `aria-label` en `<span>` y `<p>`
        (no permitido). Ahora el revelado por letras va en el encabezado y el de líneas no usa ARIA
        (ver [`../03-arquitectura/animaciones.md`](../03-arquitectura/animaciones.md)).

## Prueba manual

- [ ] Abrir `/` en un teléfono real y comprobar el scroll y la animación del titular.

---

[← Volver al roadmap](README.md)
