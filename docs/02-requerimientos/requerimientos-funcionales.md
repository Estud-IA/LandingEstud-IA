# Requerimientos funcionales (RF)

Qué debe **hacer** la landing. Cada RF indica qué HU cumple; la fase que lo implementa está en la
[matriz de trazabilidad](README.md#matriz-de-trazabilidad).

**Prioridad:** **M** = imprescindible para lanzar · **D** = deseable · **F** = futuro.

| ID | Requerimiento | Prioridad | HU | Estado |
|---|---|---|---|---|
| RF-01 | **CTA según el dispositivo:** Android → descargar APK; iOS → "Próximamente en iOS" + lista de espera; escritorio → botón + QR. La detección se hace en el cliente, y sin JS se muestra la opción de Android con el QR | M | HU-01, HU-02, HU-03 | 🔵 implementado (fase 03), falta prueba en teléfono real |
| RF-02 | **Botón de descarga fijo en móvil**: barra inferior visible desde que se sale del hero hasta el CTA final | M | HU-01 | 🔵 implementado (fase 03), falta prueba en teléfono real |
| RF-03 | **QR** generado al compilar (SVG estático) que apunta a `/descargar?origen=qr` | M | HU-02 | 🔵 implementado (fase 03), falta prueba en teléfono real |
| RF-04 | **Ruta `/descargar`**: redirige al APK de la última versión y conserva `origen` para la analítica | M | HU-01, HU-02, HU-14 | 🔵 implementado (fase 06); sin redirección mientras la versión sea provisional (A2) |
| RF-05 | **Datos de la versión** (versión, peso, fecha, Android mínimo, SHA-256, URL) leídos de `src/content/release.json` y mostrados en el hero y en la sección de descarga | M | HU-01, HU-04, HU-14 | 🔵 implementado (fase 06) con datos provisionales (A2, A8) |
| RF-06 | **Guía de instalación en 3 pasos**, con capturas de Android | M | HU-04 | 🔵 implementado (fase 06) |
| RF-07 | **Listas de espera**: un formulario para iOS y otro para creadores (correo obligatorio; tema opcional en creadores), con consentimiento explícito, enlace a privacidad y mensaje de confirmación | M | HU-03, HU-09, HU-11 | 🔵 implementado (fases 05 y 06): creadores e iOS, sin envío hasta A5 (R10) |
| RF-08 | **Sección "Así se vive una clase"**: teléfono fijo con 5 escenas recreadas en HTML (directo, chat, trivia, XP, ranking) ligadas al scroll; en móvil, tarjetas | M | HU-05 | 🔵 implementado (fase 04), falta prueba en un Android de gama media |
| RF-09 | **Sección de gamificación**: tarjetas de nivel, racha, insignias, ranking y Vcoins con contadores animados | M | HU-06 | 🔵 implementado (fase 05) |
| RF-10 | **Carrusel de Shorts y grabaciones** con tarjetas al estilo de `VideoThumbnailCard` | D | HU-07 | 🔵 implementado (fase 05) |
| RF-11 | **Sección de creadores**: estudio recreado, ventajas y bloque "Próximamente: Yape" con la lista de espera de RF-07 | M | HU-08, HU-09 | 🔵 implementado (fase 05) |
| RF-12 | **FAQ** en acordeón accesible, alimentada desde `src/content/faq.md` | M | HU-04, HU-10 | 🔵 implementado (fase 06) |
| RF-13 | **Páginas legales** `/privacidad` y `/terminos` | M | HU-11 | 🔵 implementado en borrador (fase 06); falta revisión legal (R11) |
| RF-14 | **Analítica de eventos**: `download_click` (con `origen`: hero, barra fija, sección de descarga, CTA final, qr) y `waitlist_submit` (ios, creadores) | M | HU-01, HU-15 | ⏳ |
| RF-15 | **Metadatos para compartir y buscadores**: título, descripción, Open Graph, Twitter Card, `og:image` de 1200 × 630, datos estructurados `SoftwareApplication` y `FAQPage`, `sitemap.xml`, `robots.txt` | M | HU-13 | 🔵 implementado (fase 07); la vista previa en redes se prueba cuando haya dominio (A3) |
| RF-16 | **Navegación** con anclas a las secciones, que se oculta al bajar, reaparece al subir y se lee sobre fondo claro y negro | M | HU-05, HU-10 | 🔵 implementado (fase 03), falta prueba en teléfono real |
| RF-17 | **Hero con video real** de un directo dentro del mockup, con póster mientras carga | D | HU-05 | 🔵 con póster (fase 03); el video depende de la decisión A1 de [riesgos](../03-arquitectura/riesgos.md) |
| RF-18 | **Página `/novedades`** con el historial de versiones del APK | F | HU-14 | ⏳ |
| RF-19 | **Enlaces a Google Play y App Store** cuando existan; reemplazan los "Próximamente" | F | HU-01, HU-03 | ⏳ |
