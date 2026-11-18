# Estructura del proyecto

Qué hace cada carpeta y cada archivo. **Al crear, borrar o cambiar un archivo, se actualiza su fila**
(ver la matriz de [`../06-estandares/documentacion.md`](../06-estandares/documentacion.md)).

El repo tiene dos partes:

- **`maqueta/`** (fase 01, ✅ implementada): la maqueta HTML estática. Ver la sección
  [Maqueta](#maqueta).
- **`landing/`** (fases 02 a 07): la landing real con Astro, en el árbol de abajo. Las rutas de las
  tablas son relativas a `landing/`.

**Estados:** 📝 planificado · 🔵 en curso · ✅ implementado · ❌ eliminado.

## Maqueta

Detalle de uso y exportación en [`../../maqueta/README.md`](../../maqueta/README.md).

```
maqueta/
├── README.md            qué es, reglas, cómo abrirla y exportar imágenes
├── index.html           la landing completa (10 secciones)
├── componentes.html     catálogo del estilo táctil
├── pantallas/           9 pantallas de la app en lienzo de 390 × 844
├── piezas/              og-image, tarjetas de video, gamificación, instalación
├── css/                 tokens, base, componentes, pantallas, secciones (con @layer)
├── assets/              logo, ícono de la app, iconos Feather + sprite
└── exportes/            PNG exportados: pantallas/, piezas/, secciones/
```

| Archivo | Función | Estado |
|---|---|---|
| `maqueta/index.html` | Landing completa y estática; las pantallas se muestran con `<iframe>` escalado dentro de `.telefono` | ✅ |
| `maqueta/componentes.html` | Catálogo de colores, tipografía y componentes | ✅ |
| `maqueta/pantallas/*.html` | `inicio`, `directo-chat`, `directo-trivia`, `xp-nivel`, `ranking`, `perfil`, `billetera`, `shorts`, `estudio` | ✅ |
| `maqueta/piezas/*.html` | `og-image` (1200 × 630), `tarjetas-video`, `gamificacion`, `instalacion` | ✅ |
| `maqueta/css/tokens.css` | Única fuente de colores, sombras, radios, espaciado y tipografía; declara el orden de las capas | ✅ |
| `maqueta/css/base.css` | Reset puntual (sin `*` global), tipografía base, `.sr-only` | ✅ |
| `maqueta/css/componentes.css` | `.btn`, `.boton-icono`, `.boton-mas`, `.tarjeta`, `.etiqueta`, `.avatar`, `.insignia-nivel`, `.chip-xp`, `.barra-xp`, `.campo`, `.burbuja`, `.escena`, `.tarjeta-video`, `.telefono`, `.qr-ejemplo`, `.marca` | ✅ |
| `maqueta/css/pantallas.css` | Barra de estado, navegación de la app, directo, trivia, ranking, perfil, billetera, Shorts, estudio | ✅ |
| `maqueta/css/secciones.css` | Secciones de la landing, ritmo claro/negro y piezas exportables | ✅ |
| `maqueta/assets/` | `logo.svg`, `app-icon.png`, `iconos/*.svg` y `iconos/sprite.svg` (Feather 4.29.2, MIT) | ✅ |
| `maqueta/exportes/` | 9 pantallas @3x, 16 piezas y 17 capturas de secciones | ✅ |

## Landing real (`landing/`)

### Árbol

```
landing/
├── README.md                     qué es, requisitos y comandos
├── AGENTS.md                     guía de Astro para agentes (viene con la plantilla)
├── astro.config.mjs              salida estática, URL del sitio, sitemap (sin /dev/)
├── package.json                  dependencias y scripts
├── tsconfig.json                 TypeScript estricto (astro/tsconfigs/strict)
├── eslint.config.js              ESLint, configuración plana (JS + TypeScript + Astro)
├── .prettierrc, .prettierignore  formato
├── src/assets/instalacion/       capturas de los 3 pasos de instalación (de maqueta/piezas/instalacion.html, 2x)
├── src/assets/pantallas/         capturas de la app (inicio, directo-chat, directo-trivia, xp-nivel, ranking, estudio) que procesa astro:assets
├── public/                       archivos que se sirven tal cual
│   ├── iconos/sprite.svg         iconos Feather (de maqueta/assets/iconos/)
│   ├── favicon.png, logo.svg     ícono y logo de la app
│   ├── og-image.png              imagen para compartir, 1200 × 630 (de maqueta/exportes/piezas/, fase 07)
│   └── media/                    videos y pósters (cuando existan)
└── src/
    ├── pages/                    una ruta por archivo
    │   └── dev/                  páginas internas (no se indexan)
    ├── layouts/                  esqueleto HTML común
    ├── sections/                 las secciones de la home, en orden (fases 03 a 06)
    ├── components/               piezas reutilizables con el estilo táctil
    │   └── screens/              pantallas del teléfono en HTML (fase 04)
    ├── motion/                   un módulo por efecto de animación
    ├── scripts/                  JS que no es animación: dispositivo, formularios, analítica
    ├── styles/                   tokens, fuentes, base
    └── content/                  datos editables sin tocar código
```

### Archivos y su función

#### Raíz y configuración

| Archivo | Función | Fase | Estado |
|---|---|---|---|
| `astro.config.mjs` | Salida estática, `site` desde `src/content/site.ts`, sitemap que excluye `/dev/` | 02 | ✅ |
| `package.json` | Dependencias (astro, gsap, lenis, fontsource, sitemap) y scripts `dev`, `build`, `preview`, `check`, `lint`, `format` | 02 | ✅ |
| `tsconfig.json` | TypeScript estricto | 02 | ✅ |
| `eslint.config.js`, `.prettierrc`, `.prettierignore` | Lint y formato | 02 | ✅ |
| `README.md` | Requisitos (Node ≥ 22.23.4) y comandos | 02 | ✅ |

#### `src/pages/`

| Archivo | Función | Fase | Estado |
|---|---|---|---|
| `index.astro` | Home completa: las 10 secciones en orden, pie y barra de descarga en móvil | 02–06 | ✅ |
| `dev/estilos.astro` | Catálogo interno de tokens y componentes (`noindex`, fuera del sitemap) | 02 | ✅ |
| `descargar.astro` | Redirige al APK si está publicado; si es provisional, avisa "disponible muy pronto". Guarda el `origen`; `noindex` (RF-04) | 06 | ✅ |
| `privacidad.astro`, `terminos.astro` | Páginas legales en **borrador** con `LegalLayout` (RF-13, R11) | 06 | ✅ |
| `404.astro` | Página no encontrada, con "Volver al inicio" y descarga | 06 | ✅ |
| `robots.txt.ts` | Genera `robots.txt` con la URL del sitemap a partir de `site` | 07 | ✅ |

#### `src/layouts/`

| Archivo | Función | Fase | Estado |
|---|---|---|---|
| `LegalLayout.astro` | Páginas de texto: cabecera simple, aviso de borrador, `.prosa` y pie | 06 | ✅ |
| `BaseLayout.astro` | `<html lang="es">`, título, descripción, canónica (solo si se indexa), `noindex` opcional, favicon, Open Graph y Twitter Card (`imagen`, `imagenAlt`), precarga de las 2 fuentes, slot `head`, "Saltar al contenido" (`principal`); detección del dispositivo en línea; importa `tokens` → `fonts` → `base`; arranca `motion/` y los scripts | 02–07 | ✅ |

#### `src/sections/`

Ver [`../04-diseno/secciones.md`](../04-diseno/secciones.md).

| Archivo | Función | Fase | Estado |
|---|---|---|---|
| `Nav.astro` | Navegación en isla con anclas y botón Descargar (RF-16) | 03 | ✅ |
| `Hero.astro` | Titular gigante, teléfono con la clase en vivo (imagen AVIF), CTA según el dispositivo, QR (RF-01, RF-03, RF-17) | 03 | ✅ |
| `FranjaPrueba.astro` | Cinta de datos en movimiento (animación CSS, quieta con movimiento reducido) | 03 | ✅ |
| `BarraDescargaMovil.astro` | Barra fija de descarga en móvil (RF-02) | 03 | ✅ |
| `ClaseEnVivo.astro` | Lista base de 5 tarjetas con capturas + teléfono fijo con pantallas HTML en escritorio (RF-08) | 04 | ✅ |
| `Gamificacion.astro` | Cuadrícula de 7 tarjetas: nivel, racha, XP por acierto, insignias, Vcoins, ranking y mensaje destacado (RF-09) | 05 | ✅ |
| `ShortsGrabaciones.astro` | Carrusel de 6 tarjetas: nativo con `scroll-snap` y, en escritorio, horizontal con el scroll (RF-10) | 05 | ✅ |
| `Creadores.astro` | Sección oscura: estudio (captura), ventajas, "Próximamente: cobra con Yape" y lista de espera (RF-11) | 05 | ✅ |
| `ComoDescargar.astro` | 3 pasos con capturas de Android, ficha de la versión, QR, tiendas "pronto" y lista de espera de iOS (RF-05, RF-06, RF-07) | 06 | ✅ |
| `Faq.astro` | Acordeón con `<details>` desde `faq.ts` (RF-12) | 06 | ✅ |
| `CtaFinal.astro` | Titular final + descarga | 06 | ✅ |
| `Footer.astro` | Marca, Privacidad, Términos, Contacto (`mailto:`) y © | 06 | ✅ |

#### `src/components/`

| Archivo | Función | Fase | Estado |
|---|---|---|---|
| `DatosEstructurados.astro` | JSON-LD de schema.org (escapa `<`): `SoftwareApplication` en la home y `FAQPage` en la FAQ | 07 | ✅ |
| `Icon.astro` | Icono Feather desde `/iconos/sprite.svg`; decorativo o con `label` | 02 | ✅ |
| `TactileButton.astro` | Botón en píldora que se hunde al pulsar; `tono`, `tamano`, `icono`, `detalle`, `type`; `<a>` o `<button>` | 02–05 | ✅ |
| `TactileCard.astro` | Tarjeta con borde y sombra dura; `tono`, `as` | 02 | ✅ |
| `Badge.astro` | Etiqueta EN VIVO, SHORT, GRABACIÓN, PRÓXIMAMENTE, SISTEMA | 02 | ✅ |
| `Avatar.astro` | Avatar con iniciales; `color`, `vivo`, `tam` | 02 | ✅ |
| `PhoneMockup.astro` | Marco del teléfono (`.telefono` de la maqueta): imagen, video con póster o pantalla HTML en un slot (escalada desde 390 × 844) | 03–04 | ✅ |
| `DownloadCta.astro` | CTA según el dispositivo | 03 | ✅ |
| `QrCode.astro` | QR en SVG generado al compilar | 03 | ✅ |
| `LazyVideo.astro` | Video silenciado en bucle con póster. Por ahora lo cubre `PhoneMockup` (prop `video`); se separa si hace falta en otras secciones | 07 | 📝 |
| `VideoCard.astro` | Tarjeta de video al estilo de `VideoThumbnailCard`, con 6 escenas en degradado | 05 | ✅ |
| `InsigniaNivel.astro`, `ChipXp.astro` | Insignia de NIVEL y chip "+10 XP" (flotantes del hero; se reutilizan en la fase 05) | 03 | ✅ |
| `BarraXp.astro` | Barra de XP con `--progreso` en `scale`; `animar` activa `fill` | 05 | ✅ |
| `Burbuja.astro` | Burbuja de chat (normal, destacada, sistema) | 05 | ✅ |
| `EncabezadoSeccion.astro` | Etiqueta opcional, `h2` con `reveal` y texto de apoyo | 05 | ✅ |
| `WaitlistForm.astro` | Formulario de lista de espera (`creadores` o `ios`) con validación nativa y errores accesibles; sin envío hasta A5 | 05 | ✅ |
| `screens/PantallaDirecto.astro` | Directo con capas (`data-capa`): fondo, cabecera, controles, chat, trivia, nivel, confeti, entrada | 04 | ✅ |
| `screens/PantallaRanking.astro` | Ranking de la clase; la fila propia sube de puesto | 04 | ✅ |
| `screens/PantallaEstudio.astro` | No hizo falta: creadores usa la captura del estudio | 05 | ❌ |

#### `src/motion/`

Ver [`animaciones.md`](animaciones.md).

| Archivo | Función | Fase | Estado |
|---|---|---|---|
| `index.ts` | Arranque: con movimiento reducido marca `.reduced-motion` y no carga nada; si no, importa GSAP y Lenis en diferido, carga los módulos de `data-motion`, marca `html.motion-ok` y los inicia | 02–04 | ✅ |
| `tipos.ts` | `MotionContexto` y el contrato `MotionModulo` (`(el, ctx) → destroy`) | 02 | ✅ |
| `lenis.ts` | Scroll suave sincronizado con el ticker de GSAP y ScrollTrigger | 02 | ✅ |
| `eases.ts` | Curva `CustomEase` "estudia" | 02 | ✅ |
| `reveal.ts` | Revelado por letras o líneas con SplitText (`data-split`, `data-retraso`) | 02 | ✅ |
| `heroLines.ts` | `data-motion="hero-lines"`: líneas del titular que se separan con el scroll | 03 | ✅ |
| `heroIntro.ts` | `data-motion="hero-intro"`: entrada del teléfono y de los flotantes | 03 | ✅ |
| `navHide.ts` | `data-motion="nav-hide"`: oculta la navegación al bajar y la muestra al subir o con el foco | 03 | ✅ |
| `pinnedPhone.ts` | `data-motion="pinned-phone"`: fijado, línea de tiempo de 5 pasos, "snap" e indicador (≥ 64rem) | 04 | ✅ |
| `themeSwitch.ts` | `data-motion="theme-switch"`: fondo de página negro mientras la sección oscura está a la vista | 04 | ✅ |
| `stagger.ts` | `data-motion="stagger"`: los hijos entran escalonados, una vez | 05 | ✅ |
| `counter.ts` | `data-motion="counter"` + `data-hasta`: cuenta de 0 al valor, una vez | 05 | ✅ |
| `fill.ts` | `data-motion="fill"`: la barra se llena de 0 a `--progreso` | 05 | ✅ |
| `horizontalScroll.ts` | `data-motion="horizontal-scroll"`: fija la sección y mueve la pista en horizontal (≥ 64rem) | 05 | ✅ |

#### `src/scripts/`

| Archivo | Función | Fase | Estado |
|---|---|---|---|
| `barraMovil.ts` | Muestra la barra de descarga en móvil al salir del hero (`IntersectionObserver`) | 03 | ✅ |
| (detección del dispositivo) | Script en línea en `BaseLayout.astro`: `<html data-dispositivo>` antes del primer pintado | 03 | ✅ |
| `waitlist.ts` | Formularios de lista de espera: ARIA de errores, mensaje y `enviar()` (sin envío hasta A5) | 05 | ✅ |
| `analytics.ts` | Registra `download_click` y `waitlist_submit` | 08 | 📝 |

#### `src/styles/`

| Archivo | Función | Fase | Estado |
|---|---|---|---|
| `tokens.css` | Copia de `maqueta/css/tokens.css` con las fuentes de Fontsource; declara las capas | 02 | ✅ |
| `fonts.css` | Importa Outfit e Inter variables (Fontsource) | 02 | ✅ |
| `base.css` | Reset con `:where()`, tipografía base, foco, reglas de Lenis, fondo de página oscuro (`data-tema-pagina`), utilidades `.contenedor` y `.sr-only` | 02–04 | ✅ |
| `pantallas.css` | Capa `pantallas`: estilos de las pantallas HTML de la app, anidados bajo `.app` | 04 | ✅ |

#### `src/content/`

| Archivo | Función | Fase | Estado |
|---|---|---|---|
| `site.ts` | Nombre, título, descripción, URL (provisional), idioma, color de tema y correo de contacto | 02–06 | ✅ |
| `release.json` | Forma completa (`provisional`, `version`, `build`, `fecha`, `pesoMB`, `androidMinimo`, `sha256`, `url`, `notas`); hoy provisional (ver [`descarga-y-versiones.md`](descarga-y-versiones.md)) | 03–06 | ✅ |
| `release.ts` | Valida `release.json` con `zod` al compilar; `release`, `disponible`, `textoVersion()`, `rutaDescarga()`, `datosFicha()` | 03–06 | ✅ |
| `faq.ts` | Las 7 preguntas frecuentes (fuente de verdad de la FAQ) | 06 | ✅ |
