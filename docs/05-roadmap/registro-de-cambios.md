# Registro de cambios

Qué cambió en la landing y cuándo, **de lo más nuevo a lo más viejo**. Una entrada por cambio visible
o por decisión importante. El detalle está en la fase enlazada.

**Formato:**

```
## AAAA-MM-DD — Título corto
- **Tipo:** Añadido | Cambiado | Corregido | Eliminado | Decisión | Versión del APK
- **Fase:** enlace
- Qué cambió y por qué, en 1 a 3 líneas.
```

---

## 2026-11-18 — Rendimiento, accesibilidad y SEO
- **Tipo:** Añadido, Corregido
- **Fase:** [07](fase-07-rendimiento-accesibilidad-seo.md)
- Open Graph, Twitter Card, JSON-LD (`SoftwareApplication`, `FAQPage`), `robots.txt` y "Saltar al
  contenido". CLS de carga 0,079 → 0 y de scroll 2,00 → 0; reflows al arrancar 849 → 162 ms;
  respaldo de imágenes en JPG. Lighthouse en 100 en las páginas públicas.

## 2026-11-18 — Descarga, FAQ, cierre y páginas legales
- **Tipo:** Añadido
- **Fase:** [06](fase-06-descarga-faq-legal.md)
- Sección "Instálala en 3 pasos" con capturas y ficha de la versión, lista de espera de iOS, FAQ,
  CTA final y pie. Rutas `/descargar` (sin redirección mientras la versión sea provisional),
  `/privacidad` y `/terminos` (borradores) y `/404`. `release.json` se valida al compilar.

## 2026-11-18 — Gamificación, Shorts y creadores
- **Tipo:** Añadido
- **Fase:** [05](fase-05-gamificacion-shorts-creadores.md)
- Secciones "Aprender suma" (cuadrícula con contadores y barra de XP), "¿Te perdiste la clase?"
  (carrusel que avanza en horizontal con el scroll en escritorio) y "Tu clase, tu estudio" (sección
  oscura con "Próximamente: cobra con Yape" y lista de espera). El formulario aún no guarda correos
  (A5, R10).

## 2026-11-18 — Decisiones A4 y A5
- **Tipo:** Decisión
- **Fase:** [05](fase-05-gamificacion-shorts-creadores.md)
- A4: se muestra "Próximamente: cobra con Yape" con lista de espera. A5: el formulario se construye
  sin envío, con un único punto de conexión (`scripts/waitlist.ts`) para cuando se elija el servicio.

## 2026-11-18 — "Así se vive una clase"
- **Tipo:** Añadido
- **Fase:** [04](fase-04-clase-en-vivo.md)
- En escritorio, un teléfono fijo recorre con el scroll los 5 momentos de una clase (inicio, chat,
  trivia, subida de nivel y ranking), con la pantalla animada por dentro y el fondo de la página en
  negro. En móvil, sin JS o con movimiento reducido, se ve una lista de 5 tarjetas con las capturas.

## 2026-11-17 — Navegación, hero, franja y barra de descarga
- **Tipo:** Añadido
- **Fase:** [03](fase-03-navegacion-y-hero.md)
- Primera pantalla real de la landing:
  - navegación en isla que se oculta al bajar;
  - titular animado con líneas que se separan con el scroll;
  - teléfono con la clase en vivo (imagen AVIF);
  - CTA según el dispositivo (Android, iOS, escritorio) y QR generado al compilar;
  - franja animada con CSS y barra de descarga en móvil.

## 2026-11-17 — Base de la landing con Astro
- **Tipo:** Añadido
- **Fase:** [02](fase-02-base-astro.md)
- Se crea `landing/` con Astro 7: tokens de la maqueta, fuentes autoalojadas, componentes base
  (botón, tarjeta, etiqueta, avatar, icono), sistema de animación (GSAP + Lenis, sin carga con
  movimiento reducido), página provisional y catálogo `/dev/estilos`. Se planifican las fases 03 a 07.

## 2026-11-17 — Maqueta HTML de la landing
- **Tipo:** Añadido
- **Fase:** [01](fase-01-maqueta-html.md)
- Se crea `maqueta/`: landing completa en HTML y CSS sin JS, catálogo de componentes, 9 pantallas de
  la app recreadas, 4 piezas y 42 imágenes exportadas en `maqueta/exportes/`.

## 2026-11-17 — Navegación en isla táctil
- **Tipo:** Decisión
- **Fase:** [01](fase-01-maqueta-html.md)
- La navegación usa una "isla" blanca con borde y sombra dura en vez de `mix-blend-mode: difference`,
  que invertía los colores del logo. Ver D11 en [`../03-arquitectura/README.md`](../03-arquitectura/README.md).
