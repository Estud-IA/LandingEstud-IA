# Requerimientos no funcionales (RNF)

Cómo debe **comportarse** la landing. Cada RNF tiene un criterio medible y la forma de verificarlo
(ver [`../06-estandares/verificacion.md`](../06-estandares/verificacion.md)).

| ID | Categoría | Requerimiento | Criterio medible | Cómo se verifica | Estado |
|---|---|---|---|---|---|
| RNF-01 | Rendimiento | La página carga rápido en un móvil de gama media con 4G | Lighthouse móvil: rendimiento ≥ 90; LCP < 2,5 s; CLS < 0,1; INP < 200 ms | Lighthouse y traza de rendimiento con el MCP de DevTools | ⏳ |
| RNF-02 | Peso | Lo que se descarga al entrar es liviano | JS inicial ≤ 100 KB gz; cada video ≤ 1,5 MB (5–10 s, WebM/MP4); imágenes en AVIF/WebP con `srcset`; fuentes ≤ 120 KB en total | Panel de red del MCP de DevTools | ⏳ |
| RNF-03 | Accesibilidad | Cumple WCAG 2.2 AA | Lighthouse accesibilidad ≥ 95; contraste ≥ 4,5:1 en texto; todo usable con teclado; foco visible; textos alternativos; formularios con etiquetas | Lighthouse + revisión manual con teclado | ⏳ |
| RNF-04 | Accesibilidad | Respeta `prefers-reduced-motion` | Con la preferencia activa: sin Lenis, sin desplazamientos, sin secciones fijas ni cinta animada; el contenido completo sigue visible | Emulación en el MCP de DevTools | ⏳ |
| RNF-05 | Responsive | Se ve bien de 320 px a 1920 px | Sin scroll horizontal; los textos gigantes no se cortan; los toques miden ≥ 44 × 44 px | Capturas a 390, 768 y 1440 px | ⏳ |
| RNF-06 | Compatibilidad | Funciona en los navegadores del público | Las dos últimas versiones de Chrome, Safari, Firefox y Edge; Chrome y Samsung Internet en Android 8 o superior | Prueba manual + un teléfono real | ⏳ |
| RNF-07 | SEO | Se indexa bien | Lighthouse SEO ≥ 95; `lang="es"`; un `h1` por página; URLs canónicas | Lighthouse | ⏳ |
| RNF-08 | Privacidad | Cumple la Ley 29733 (Perú) | Analítica sin cookies, o banner de consentimiento si las usa; los formularios piden consentimiento explícito; política de privacidad publicada | Revisión antes del lanzamiento | ⏳ |
| RNF-09 | Seguridad | El sitio y el APK son confiables | Solo HTTPS; cabeceras de seguridad (CSP, HSTS, `X-Content-Type-Options`, `Referrer-Policy`); SHA-256 publicado y coincidente con el APK alojado | Revisión de cabeceras + `sha256sum` del APK | ⏳ |
| RNF-10 | Mantenibilidad | El código es fácil de cambiar | Un módulo por efecto en `src/motion/`; colores solo en `tokens.css`; textos de versión solo en `release.json`; ningún archivo de más de ~300 líneas | Revisión en el PR | ⏳ |
| RNF-11 | Disponibilidad | El sitio está siempre arriba | Hosting estático con CDN; uptime ≥ 99,9 %; el APK en un almacenamiento separado del sitio | Panel del proveedor | ⏳ |
| RNF-12 | Idioma | Todo el contenido está en español, con tuteo | Sin textos en inglés visibles; tono según [`../01-producto/mensajes-y-tono.md`](../01-producto/mensajes-y-tono.md) | Revisión en el PR | ⏳ |
