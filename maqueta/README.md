# Maqueta de la landing de Estud-IA

Maqueta **estática en HTML y CSS, sin lógica**, de la landing de Estud-IA. Tiene dos usos:

1. **Referencia visual** de la landing completa y del estilo de la app.
2. **Fuente del material**: de aquí se exportan las imágenes que usará la landing real (pantallas
   del teléfono, tarjetas, insignias, imagen para compartir, pasos de instalación).

Corresponde a la [fase 01 del roadmap](../docs/05-roadmap/fase-01-maqueta-html.md). La landing real
(Astro, con animaciones) se construye en la fase 02 a partir de esta maqueta.

## Qué hay

| Ruta | Qué es |
|---|---|
| [`index.html`](index.html) | La landing completa: las 10 secciones de [`docs/04-diseno/secciones.md`](../docs/04-diseno/secciones.md) |
| [`componentes.html`](componentes.html) | Catálogo: colores, tipografía, botones, etiquetas, tarjetas, chat, QR |
| `pantallas/` | 9 pantallas de la app recreadas en un lienzo de 390 × 844: `inicio`, `directo-chat`, `directo-trivia`, `xp-nivel`, `ranking`, `perfil`, `billetera`, `shorts`, `estudio` |
| `piezas/` | Piezas sueltas para exportar: `og-image` (1200 × 630), `tarjetas-video`, `gamificacion`, `instalacion` |
| `css/tokens.css` | **Única fuente** de colores, sombras, radios, espaciado y tipografía. Sale de `app_colors.dart` de la app |
| `css/base.css` | Reset puntual y tipografía base |
| `css/componentes.css` | Botón táctil, tarjeta, etiqueta, avatar, insignia de nivel, barra de XP, burbuja de chat, tarjeta de video, mockup del teléfono, QR de ejemplo |
| `css/pantallas.css` | Layout de las pantallas de la app |
| `css/secciones.css` | Layout de las secciones de la landing y de las piezas |
| `assets/logo.svg`, `assets/app-icon.png` | Logo e ícono, copiados de `streaming-estudia/Frontend/assets/branding/` |
| `assets/iconos/` | Iconos Feather 4.29.2 (licencia MIT), sueltos y en `sprite.svg` |
| `exportes/` | Las imágenes exportadas (ver abajo) |

## Reglas

- **Sin JavaScript:** ni `<script>` ni atributos `on*`. Solo HTML y CSS.
- **Las animaciones no se maquetan:** cada momento se muestra fijo. Las 5 escenas de "Así se vive
  una clase" aparecen una al lado de otra, como en el modo de movimiento reducido.
- **Colores solo desde `css/tokens.css`.** Nada de colores sueltos en los componentes.
- **Sin datos reales:** personas ficticias (Profe Valeria, mateo_22, ana.torres…), avatares con
  iniciales y miniaturas con degradados. Ninguna foto de personas.
- **Textos en español, con tuteo**, según [`docs/01-producto/mensajes-y-tono.md`](../docs/01-producto/mensajes-y-tono.md).
- Las pantallas se muestran dentro del teléfono con un `<iframe>` escalado (`.telefono`, variable
  `--escala`). Así cada pantalla existe una sola vez.

## Cómo abrirla

Los iconos usan `<use href="…sprite.svg#icono">`, que el navegador bloquea con `file://`. Hay que
servir la carpeta:

```
python -m http.server 5500 -d maqueta
```

y abrir `http://localhost:5500/`.

## Cómo exportar las imágenes

Con el MCP de Chrome DevTools, y la carpeta servida como arriba:

| Qué | Viewport (`emulate`) | Captura | Destino |
|---|---|---|---|
| Pantallas | `390x844x3` | `take_screenshot` de la página | `exportes/pantallas/<pantalla>@3x.png` (1170 × 2532) |
| Imagen para compartir | `1440x1000x1` | `take_screenshot` del `uid` de la región "og-image" | `exportes/piezas/og-image.png` (1200 × 630) |
| Resto de piezas | `1440x1000x2` | `take_snapshot` con `verbose` para ver los `uid` de los grupos y `take_screenshot` de cada uno | `exportes/piezas/<pieza>@2x.png` |
| Secciones | `1440x900x1` y `390x844x2,mobile,touch` | `take_screenshot` del `uid` de cada región. Antes se oculta la navegación con un `initScript` que inyecta `.nav-landing, .barra-descarga-movil { visibility: hidden }` | `exportes/secciones/NN-<seccion>-1440.png` y `-390.png` |

El formato maestro es **PNG**. La optimización (WebP/AVIF, `srcset`) se hace en la landing real.

## Imágenes exportadas (2026-11-17)

- **`exportes/pantallas/` (9):** `inicio`, `directo-chat`, `directo-trivia`, `xp-nivel`, `ranking`,
  `perfil`, `billetera`, `shorts`, `estudio`, todas `@3x`.
- **`exportes/piezas/` (16):**
  - `og-image`
  - `tarjeta-vivo`, `tarjeta-short`, `tarjeta-grabacion`
  - `insignia-nivel`, `chip-xp`, `etiqueta-vivo`, `boton-mas`
  - `tarjeta-nivel`, `tarjeta-racha`, `tarjeta-monedas`
  - `logros`, `burbujas-chat`
  - `paso-1`, `paso-2`, `paso-3`
- **`exportes/secciones/` (17):** las 8 secciones con título a 1440 px y a 390 px, más
  `00-completa-1440.png`.

Si cambias una pantalla o una pieza, vuelve a exportar su imagen.
