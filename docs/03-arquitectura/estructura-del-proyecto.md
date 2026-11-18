# Estructura del proyecto

Qué hace cada carpeta y cada archivo. **Al crear, borrar o cambiar un archivo, se actualiza su fila**
(ver la matriz de [`../06-estandares/documentacion.md`](../06-estandares/documentacion.md)).

**Estados:** 📝 planificado · 🔵 en curso · ✅ implementado · ❌ eliminado.

## Árbol

```
LandingEstud-IA/
├── README.md, CLAUDE.md          portada del repo y enrutador para Claude Code
├── docs/                         esta documentación
├── astro.config.mjs              configuración de Astro
├── package.json                  dependencias y scripts
├── tsconfig.json                 TypeScript (modo estricto)
├── .eslintrc.cjs, .prettierrc    lint y formato
├── public/                       archivos que se sirven tal cual
│   ├── fonts/                    Outfit e Inter en WOFF2
│   ├── media/                    videos (WebM/MP4) y pósters
│   ├── img/                      capturas de la app, pasos de instalación
│   ├── og-image.png              imagen para compartir (1200 × 630)
│   ├── favicon.svg               a partir de logo.svg de la app
│   └── robots.txt
└── src/
    ├── pages/                    una ruta por archivo
    ├── layouts/                  esqueleto HTML común
    ├── sections/                 las secciones de la home, en orden
    ├── components/               piezas reutilizables con el estilo táctil
    │   └── screens/              pantallas del teléfono recreadas en HTML
    ├── motion/                   un módulo por efecto de animación
    ├── scripts/                  JS que no es animación (dispositivo, formularios, analítica)
    ├── styles/                   tokens, base, tipografía, utilidades
    └── content/                  datos editables sin tocar código
```

## Archivos y su función

### Raíz y configuración

| Archivo | Función | Estado |
|---|---|---|
| `astro.config.mjs` | Salida estática, sitio canónico, integraciones (sitemap) | 📝 |
| `package.json` | Dependencias (astro, gsap, lenis, qrcode) y scripts `dev`, `build`, `preview`, `lint`, `check` | 📝 |
| `tsconfig.json` | TypeScript estricto | 📝 |
| `.eslintrc.cjs`, `.prettierrc` | Reglas de lint y formato | 📝 |
| `README.md` | Portada: qué es, cómo levantar, enlace a `docs/` | ✅ |
| `CLAUDE.md` | Enrutador para Claude Code | ✅ |

### `src/pages/`

| Archivo | Función | Estado |
|---|---|---|
| `index.astro` | Home: compone las 10 secciones en orden | 📝 |
| `descargar.astro` | Redirige al APK de `release.json` y registra el `origen` (RF-04) | 📝 |
| `privacidad.astro` | Política de privacidad (RF-13) | 📝 |
| `terminos.astro` | Términos y condiciones (RF-13) | 📝 |
| `404.astro` | Página no encontrada, con el botón de descarga | 📝 |

### `src/layouts/`

| Archivo | Función | Estado |
|---|---|---|
| `BaseLayout.astro` | `<html lang="es">`, `<head>` con metadatos (RF-15), precarga de fuentes, navegación, footer y el arranque de `motion/` | 📝 |

### `src/sections/`

Ver [`../04-diseno/secciones.md`](../04-diseno/secciones.md).

| Archivo | Función | Estado |
|---|---|---|
| `Nav.astro` | Navegación fija con anclas y botón Descargar (RF-16) | 📝 |
| `Hero.astro` | Titular gigante, mockup con video, CTA según el dispositivo, QR (RF-01, RF-03, RF-17) | 📝 |
| `FranjaPrueba.astro` | Cinta de datos en movimiento | 📝 |
| `ClaseEnVivo.astro` | Teléfono fijo con las 5 escenas (RF-08) | 📝 |
| `Gamificacion.astro` | Tarjetas de nivel, racha, insignias, ranking, Vcoins (RF-09) | 📝 |
| `ShortsGrabaciones.astro` | Carrusel de tarjetas de video (RF-10) | 📝 |
| `Creadores.astro` | Estudio recreado + "Próximamente: Yape" + lista de espera (RF-11) | 📝 |
| `ComoDescargar.astro` | 3 pasos, datos de la versión, QR (RF-05, RF-06) | 📝 |
| `Faq.astro` | Acordeón desde `faq.md` (RF-12) | 📝 |
| `CtaFinal.astro` | Titular final + descarga | 📝 |
| `Footer.astro` | Logo, legales, contacto | 📝 |
| `BarraDescargaMovil.astro` | Barra fija de descarga en móvil (RF-02) | 📝 |

### `src/components/`

| Archivo | Función | Estado |
|---|---|---|
| `TactileButton.astro` | Botón en píldora con borde y sombra dura que se hunde al pulsar | 📝 |
| `Badge.astro` | Etiqueta EN VIVO, SHORT, GRABACIÓN o PRÓXIMAMENTE | 📝 |
| `TactileCard.astro` | Tarjeta blanca con borde negro y sombra dura | 📝 |
| `PhoneMockup.astro` | Marco del teléfono; recibe un video o una pantalla recreada | 📝 |
| `DownloadCta.astro` | CTA que cambia según el dispositivo (Android, iOS, escritorio) | 📝 |
| `QrCode.astro` | QR en SVG generado al compilar | 📝 |
| `VideoCard.astro` | Tarjeta de video al estilo de `VideoThumbnailCard` | 📝 |
| `WaitlistForm.astro` | Formulario de lista de espera (`tipo`: ios o creadores) | 📝 |
| `LazyVideo.astro` | `<video>` silenciado en bucle que carga al acercarse a la vista, con póster | 📝 |
| `Icon.astro` | Iconos Feather en SVG en línea | 📝 |
| `screens/PantallaDirecto.astro` | Directo con chat superpuesto | 📝 |
| `screens/PantallaTrivia.astro` | Encuesta o trivia en vivo | 📝 |
| `screens/PantallaXp.astro` | Barra de XP y subida de nivel | 📝 |
| `screens/PantallaRanking.astro` | Ranking en tiempo real | 📝 |
| `screens/PantallaEstudio.astro` | Estudio del creador | 📝 |

### `src/motion/`

Ver [`animaciones.md`](animaciones.md).

| Archivo | Función | Estado |
|---|---|---|
| `index.ts` | Arranque: comprueba el movimiento reducido, inicia Lenis y registra los módulos por `data-motion` | 📝 |
| `lenis.ts` | Scroll suave sincronizado con el ticker de GSAP y ScrollTrigger | 📝 |
| `eases.ts` | Curvas propias (`CustomEase` "estudia") | 📝 |
| `reveal.ts` | Revelado de texto por letras o líneas con SplitText (`data-motion="reveal"`) | 📝 |
| `heroLines.ts` | Líneas del titular que se desplazan en horizontal con el scroll | 📝 |
| `marquee.ts` | Cinta en movimiento continuo | 📝 |
| `themeSwitch.ts` | Transición claro ↔ negro entre secciones (`data-theme-section`) | 📝 |
| `pinnedPhone.ts` | Teléfono fijo y cambio de escenas con el scroll | 📝 |
| `counters.ts` | Contadores que suben de 0 al valor | 📝 |
| `stagger.ts` | Entrada escalonada de tarjetas | 📝 |
| `horizontalScroll.ts` | Carrusel que avanza en horizontal con el scroll | 📝 |
| `navHide.ts` | Ocultar la navegación al bajar y mostrarla al subir | 📝 |

### `src/scripts/`

| Archivo | Función | Estado |
|---|---|---|
| `device.ts` | Detecta Android, iOS o escritorio y ajusta `DownloadCta` | 📝 |
| `waitlist.ts` | Envía los formularios de lista de espera y muestra la confirmación | 📝 |
| `analytics.ts` | Registra `download_click` y `waitlist_submit` | 📝 |

### `src/styles/`

| Archivo | Función | Estado |
|---|---|---|
| `tokens.css` | Variables de color, sombra, radio, espaciado y movimiento (de [`../04-diseno/design-system.md`](../04-diseno/design-system.md)) | 📝 |
| `fonts.css` | `@font-face` de Outfit e Inter | 📝 |
| `base.css` | Reset, tipografía base, `.lenis`, movimiento reducido | 📝 |
| `utilities.css` | Contenedor, cuadrícula y clases para lectores de pantalla | 📝 |

### `src/content/`

| Archivo | Función | Estado |
|---|---|---|
| `release.json` | Versión, peso, fecha, Android mínimo, SHA-256 y URL del APK (ver [`descarga-y-versiones.md`](descarga-y-versiones.md)) | 📝 |
| `faq.md` | Preguntas y respuestas de la FAQ | 📝 |
| `site.ts` | Nombre, descripción, URL canónica y redes del sitio | 📝 |
