# Arquitectura de la landing

Cómo está construida la landing y por qué. El detalle de cada archivo está en
[`estructura-del-proyecto.md`](estructura-del-proyecto.md).

**Estado al 2026-11-17:** existe la **maqueta HTML estática** (`maqueta/`, fase 01, aprobada). La
**base de la landing** (`landing/`, fase 02) está escrita: Astro 7, tokens, componentes base y sistema
de animación. Las secciones llegan en las fases 03 a 06. Este documento se actualiza en cada fase.

## Vista general

```
                ┌──────────────────────────── Build (Astro) ────────────────────────────┐
 src/content/   │  release.json ─┐                                                      │
 faq.md ────────┼────────────────┼──► src/pages/index.astro ──► HTML estático + CSS    │
                │  tokens.css ───┘        │  usa sections/ y components/  + JS mínimo   │
                │                         └─► src/motion/ (GSAP + Lenis, se cargan solo │
                │                              si no hay prefers-reduced-motion)         │
                └───────────────────────────────────┬──────────────────────────────────┘
                                                    ▼
                                 Hosting estático con CDN (dist/)
                                                    │
     Visitante ──► landing ──► /descargar ──► APK en GitHub Releases o Cloudflare R2
                     │
                     ├──► analítica ligera (download_click, waitlist_submit)
                     └──► servicio de formularios (listas de espera)
```

- **Estática:** todo se genera al compilar. No hay servidor propio ni base de datos.
- **JS mínimo:** Astro no envía JS por defecto. Solo se cargan los módulos de `src/motion/` y unos
  pocos scripts (detección del dispositivo, formularios, analítica).
- **Contenido separado del código:** los datos de la versión (`release.json`) y la FAQ (`faq.md`)
  se editan sin tocar componentes.

## Stack

| Tema | Elección | Versión objetivo |
|---|---|---|
| Framework | **Astro** (salida estática) | 7.4 (exige Node 22.23.4 o superior) |
| Animación | **GSAP** + ScrollTrigger + SplitText + CustomEase (Flip opcional) | 3.15 (todos los plugins gratis) |
| Scroll suave | **Lenis** | 1.3 |
| Estilos | CSS propio con variables (tokens) + CSS por componente de Astro | — |
| Tipografía | Outfit + Inter variables, autoalojadas con Fontsource | 5.3 |
| QR | Generado al compilar como SVG (librería `qrcode`) | — |
| Lint y formato | ESLint (configuración plana) + Prettier + `astro check` | ESLint 10, Prettier 3 |
| Hosting | Vercel, Netlify o Cloudflare Pages (a decidir, ver A7 en riesgos) | — |
| APK | GitHub Releases o Cloudflare R2 (a decidir, ver A2 en riesgos) | — |

## Decisiones

| # | Fecha | Decisión | Motivo |
|---|---|---|---|
| D1 | 2026-11-17 | **Astro** en vez de Webflow o Vite solo | Página estática con buen SEO, casi nada de JS y componentes; contenido en Markdown/JSON. Webflow sobra porque el equipo programa |
| D2 | 2026-11-17 | **GSAP + Lenis**, la misma coreografía que Bulletproof | Es lo que da el acabado profesional. Ver [`../07-referencias/estudio-bulletproof.md`](../07-referencias/estudio-bulletproof.md) |
| D3 | 2026-11-17 | **Sin Barba.js** | Es casi una sola página. Si hacen falta transiciones entre páginas, se usan las View Transitions de Astro |
| D4 | 2026-11-17 | **No incrustar la app Flutter web** | CanvasKit pesa varios MB y arruinaría el rendimiento (RNF-01) |
| D5 | 2026-11-17 | **Pantallas del teléfono recreadas en HTML** + **video real solo en el hero** | Nítidas, livianas y animables con el scroll; no dependen de tener datos de demo. El video real da credibilidad |
| D6 | 2026-11-17 | **APK alojado fuera del sitio** | Pesa decenas de MB; separarlo mantiene el deploy del sitio liviano y permite versionarlo |
| D7 | 2026-11-17 | **Identidad táctil de la app**, no la estética de Bulletproof | La landing debe parecerse a la app que se descarga. Ver [`../04-diseno/design-system.md`](../04-diseno/design-system.md) |
| D8 | 2026-11-17 | **Un módulo por efecto**, activado con atributos `data-*` | El mismo patrón que Bulletproof: efectos aislados, reutilizables y fáciles de desactivar |
| D9 | 2026-11-17 | **Solo Outfit + Inter** (sin Poppins) | Poppins casi no aparece en la app; cada familia extra pesa (RNF-02) |
| D10 | 2026-11-17 | **Maqueta HTML estática** (`maqueta/`) antes de la landing real | Sirve de referencia visual aprobable por el equipo y de fuente de las imágenes (pantallas, tarjetas, og-image). Sus tokens (`maqueta/css/tokens.css`) son la base de los de la landing. Ver [`../../maqueta/README.md`](../../maqueta/README.md) |
| D11 | 2026-11-17 | **Navegación en "isla" táctil** en vez de `mix-blend-mode: difference` | El logo es a color y `difference` lo invertía; una isla blanca con borde y sombra dura se lee sobre fondos claros y negros y sigue el estilo de la app |
| D12 | 2026-11-17 | **La landing vive en `landing/`**, junto a `maqueta/` y `docs/` | Cada parte tiene su README y sus dependencias; el hosting apunta a `landing/` |
| D13 | 2026-11-17 | **Fuentes con Fontsource** (`@fontsource-variable/outfit` e `inter`) | Se sirven desde el propio sitio, sin peticiones a Google Fonts (RNF-08), y el navegador baja solo los subconjuntos que usa |
| D14 | 2026-11-17 | **Astro 7** (y por tanto Node ≥ 22.23.4) en vez de fijar Astro 5 | Es la versión estable vigente; evita una migración mayor más adelante. El equipo actualiza Node |

## Documentos de esta carpeta

| Documento | Qué contiene |
|---|---|
| [`estructura-del-proyecto.md`](estructura-del-proyecto.md) | Árbol de carpetas y tabla archivo → función → estado |
| [`animaciones.md`](animaciones.md) | Sistema de movimiento: módulos, atributos, ciclo de vida y movimiento reducido |
| [`descarga-y-versiones.md`](descarga-y-versiones.md) | `release.json`, `/descargar`, QR, detección del dispositivo, publicación del APK |
| [`riesgos.md`](riesgos.md) | Riesgos, deuda y decisiones abiertas |
