# Fase 04 — "Así se vive una clase" (implementada y verificada 2026-11-18; falta prueba manual)

**Objetivo:** la sección estrella. En escritorio el teléfono queda fijo sobre fondo negro y, con el
scroll, recorre los 5 momentos de una clase con la pantalla animada por dentro.

**Requerimientos:** HU-05 · RF-08 · RNF-01, RNF-04.

**Punto de partida:** fase 03 verificada (`PhoneMockup` con imagen).

**Material de la maqueta:** `maqueta/pantallas/directo-chat`, `directo-trivia`, `xp-nivel` y
`ranking` + `maqueta/css/pantallas.css`; PNG de `maqueta/exportes/pantallas/` (`inicio`,
`directo-chat`, `directo-trivia`, `xp-nivel`, `ranking`).

**Decisiones (2026-11-17):**
1. **Una base que funciona sin animación y una mejora en escritorio.** La sección tiene dos
   presentaciones en el HTML y el CSS muestra solo una, así que el lector de pantalla no recibe
   contenido duplicado:
   - **`.clase-lista`:** 5 tarjetas con la **captura PNG** de cada paso. Se ve sin JS, con
     movimiento reducido y por debajo de 64rem.
   - **`.clase-fijada`:** un teléfono fijo con la pantalla **en HTML**, solo con `html.motion-ok`
     y desde 64rem.
2. **Una sola pantalla de directo con capas** (`PantallaDirecto`): fondo, cabecera, controles, chat,
   trivia, nivel y confeti. Los pasos 2 a 4 animan sus capas en lugar de cambiar de pantalla. El
   paso 1 usa la captura de inicio y el 5 `PantallaRanking`.
3. **Solo se anima con `transform` y `opacity`:** las barras de votos y de XP usan
   `scale` (`--votos`, `--progreso` entre 0 y 1) en lugar de cambiar su ancho.
4. **`html.motion-ok`:** `motion/index.ts` primero carga todos los módulos, luego marca la clase y
   después los inicia seguidos, para que la presentación fija tenga su estado inicial antes de
   pintarse.
5. **Fondo de página negro** mientras la sección ocupa la pantalla (`theme-switch` →
   `html[data-tema-pagina="oscuro"]`, con transición CSS en `base.css`).
6. **`PhoneMockup` acepta un slot:** la pantalla HTML se dibuja a 390 × 844 y se escala con `scale`.

**Criterio de aceptación:**
- En escritorio (≥ 1024 px) la sección se fija y avanza por los 5 pasos con el scroll, con un
  indicador de progreso.
- El fondo pasa de claro a negro al entrar y vuelve a claro al salir.
- En móvil, los 5 pasos son tarjetas con su captura, sin fijar.
- Con movimiento reducido, las 5 escenas se ven completas, sin animación.
- La traza de rendimiento no muestra tareas largas (> 50 ms) repetidas durante el scroll.

**Verificación al 2026-11-18 (Node 26.13):**
- `build`, `check` (0 errores, 0 avisos), `lint` y `format:check` en verde.
- **1440 px con animación:** la sección se fija (`pin-spacer`). Con la rueda del ratón se recorrieron
  los 5 pasos:
  1. inicio;
  2. el chat con 4 burbujas;
  3. la trivia con los votos llenos y la opción B marcada;
  4. "¡Subiste de nivel!" con la insignia, la barra y el confeti;
  5. el ranking con la fila propia en el puesto 4 y "Subiste 2 puestos".

  El indicador coincide con cada paso y el "snap" se detiene en ellos. El fondo es negro dentro de
  la sección y vuelve a `#F9F9F9` al salir.
- **1440 px con movimiento reducido:** la lista de 5 tarjetas en una fila, como en
  `maqueta/exportes/secciones/02-clase-1440.png`. Solo se descarga el script de arranque.
- **390 px:** la lista, sin fijado y sin scroll horizontal. Consola limpia.
- **Lighthouse:** móvil y escritorio con accesibilidad, buenas prácticas y SEO en 100. Lighthouse
  midió en móvil un CLS de 0,079 en su propia carga, dentro del límite de 0,1; se revisa en la
  fase 07.
- **Traza con CPU 4× durante el scroll de la sección:** CLS 0,00. Hay 543 ms de reflows forzados en
  total a lo largo de 6 s, casi todos de ScrollTrigger y Lenis (5 ms de `pinnedPhone`); se revisan
  en la fase 07.
- **Corregido durante la verificación:**
  - La barra de votos tapaba el texto de la opción elegida.
  - El indicador iba un paso por detrás: ahora usa el progreso del scroll y los momentos en que
    cambia el texto.
  - La lista dejaba el paso 5 solo en una segunda fila: ahora usa 5 columnas desde 75rem.

---

- [x] **04-1. Capa `pantallas` (2026-11-17):** `src/styles/pantallas.css`, anidada bajo `.app`.
- [x] **04-2. Pantallas en HTML (2026-11-17):** `screens/PantallaDirecto.astro` (con capas) y
      `screens/PantallaRanking.astro`. El paso 1 usa la captura de inicio, así que
      `PantallaInicio` no hace falta.
- [x] **04-3. `ClaseEnVivo.astro` (2026-11-17)** con la lista base y la presentación fija.
- [x] **04-4. `motion/pinnedPhone.ts` (2026-11-17):** fijado, línea de tiempo por pasos, "snap" e
      indicador, dentro de `gsap.matchMedia`.
- [x] **04-5. `motion/themeSwitch.ts` (2026-11-17).**
- [x] **04-6. Versión móvil (2026-11-17):** la lista con capturas, y el título de cada paso con
      `reveal`.

## Prueba manual

- [ ] Recorrer la sección con rueda, trackpad, teclado (espacio y avance de página) y en un Android
      de gama media.

---

[← Volver al roadmap](README.md)
