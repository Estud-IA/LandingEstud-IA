# Riesgos, deuda y decisiones abiertas

Memoria de los hallazgos. El roadmap convierte esto en tareas; este documento no se borra, se
actualiza el estado.

**Estados:** 🔴 abierto · 🟡 mitigado o en curso · ✅ resuelto.

## Decisiones abiertas

| # | Fecha | Pregunta | Opciones | Bloquea | Estado |
|---|---|---|---|---|---|
| A1 | 2026-11-17 | ¿Preparamos **datos de demo** en el backend de la app para grabar videos y capturas, o solo usamos pantallas recreadas? | (a) Datos de demo + grabaciones; (b) solo HTML recreado | Material de demo; el video del hero (RF-17) | 🔴 |
| A2 | 2026-11-17 | ¿Hay un **APK de release firmado** y dónde se aloja? | GitHub Releases / Cloudflare R2 | Sección de descarga (datos reales) y despliegue | 🔴 Sigue abierta. Mientras tanto `release.json` es provisional y `/descargar` muestra "disponible muy pronto" |
| A3 | 2026-11-17 | ¿Cuál es el **dominio**? | — | Despliegue; el QR y las URLs canónicas | 🔴 |
| A4 | 2026-11-17 | ¿Mostramos la **lista de espera de creadores con Yape**? | Sí, como "Próximamente" (propuesta) / no mostrar | Sección de creadores | ✅ 2026-11-18: sí, como "Próximamente" con lista de espera |
| A5 | 2026-11-17 | ¿**Dónde se guardan los correos** de las listas de espera? | Servicio de formularios externo / un endpoint en el backend de la app | Sección de creadores y 05; RNF-08 | 🟡 2026-11-18: formulario sin envío; falta elegir el servicio (bloquea la publicación, R10) |
| A6 | 2026-11-17 | ¿Qué **analítica** usamos? | Plausible o Umami (sin cookies) / GA4 (con banner de consentimiento) | Despliegue; RNF-08 | 🔴 |
| A7 | 2026-11-17 | ¿Qué **hosting**? | Vercel / Netlify / Cloudflare Pages | Despliegue | 🔴 |
| A8 | 2026-11-17 | ¿Cuál es la **versión mínima de Android** de la app? | Confirmar con el equipo de la app | FAQ y `release.json` | 🔴 Sigue abierta: se muestra "8.0" desde `release.json` (provisional) |

## Riesgos

| # | Fecha | Riesgo | Impacto | Mitigación | Estado |
|---|---|---|---|---|---|
| R1 | 2026-11-17 | **No hay material visual real:** la app en local está vacía (sin directos, Shorts ni logros) | Sin video del hero ni capturas creíbles | Pantallas recreadas en HTML (D5); la maqueta ya exporta 9 pantallas, tarjetas y og-image con datos ficticios (fase 01); preparar datos de demo solo para el video del hero (A1) | 🟡 |
| R2 | 2026-11-17 | **Desconfianza al instalar un APK** (permiso de "fuentes desconocidas", avisos de Play Protect) | Menos instalaciones | Guía de 3 pasos, SHA-256 visible, FAQ, dominio propio con HTTPS | 🔴 |
| R3 | 2026-11-17 | **Animaciones pesadas en móviles de gama baja** | Lighthouse < 90, tirones | Solo `transform`/`opacity`, `import()` diferido, sin fijar secciones en móvil, trazas de rendimiento antes de publicar | 🟡 Medido en la fase 07: LCP < 1,4 s y CLS 0 en móvil con CPU 4×; arranque diferido de los revelados. Falta un teléfono de gama media real |
| R4 | 2026-11-17 | **Prometer funciones que aún no existen** (Monedas, Yape, Academia, iOS) | Pérdida de confianza | Regla de "Próximamente" en [`../01-producto/app-estudia.md`](../01-producto/app-estudia.md); revisar en cada PR | 🟡 |
| R5 | 2026-11-17 | **La paleta o las funciones de la app cambian** y la landing queda desactualizada | Inconsistencia de marca | Tokens con el origen anotado en el design system; revisar `app-estudia.md` en cada versión | 🟡 |
| R6 | 2026-11-17 | **Datos personales** en capturas y formularios | Incumplimiento de la Ley 29733 | Capturas solo con datos de demo; consentimiento y política de privacidad (RNF-08) | 🟡 |
| R7 | 2026-11-17 | **Contraste del esmeralda y el amarillo** sobre blanco | Incumple WCAG AA | Texto esmeralda en `#006C4D`; el amarillo solo como fondo con texto negro | 🟡 |
| R8 | 2026-11-17 | **Google Play** no permite enlazar pagos externos en la versión de Play | Cambiar la landing cuando llegue Play | Al publicar en Play, revisar que la landing no contradiga su política | 🔴 |
| R9 | 2026-11-17 | **`npm audit` reporta 10 avisos altos** en `landing/` por un ReDoS de `picomatch` (todas sus versiones), que arrastran Vite y Astro | Solo afecta a herramientas que se ejecutan al compilar con patrones propios; no llega al navegador | No usar `npm audit fix --force` (bajaría a Astro 5.3). Revisar en cada actualización de Astro y en la fase 07 | ✅ Resuelto: `npm audit` da 0 vulnerabilidades al 2026-11-18 |
| R10 | 2026-11-18 | **El formulario de lista de espera no guarda correos** (A5 sin resolver) | Quien se anote cree que quedó registrado | El mensaje dice que todavía no se guardan. **No publicar** sin conectar `enviar()` en `landing/src/scripts/waitlist.ts` (fase 08) | 🔴 |
| R11 | 2026-11-18 | **Textos legales en borrador** (`/privacidad`, `/terminos`) | Incumplir la Ley 29733 o las políticas de Google Play | Aviso visible "Borrador pendiente de revisión legal" (`LegalLayout`, `borrador`). **Revisión de un abogado antes de publicar**; después, `borrador={false}` y completar el proveedor de correos (A5) | 🔴 |
| R12 | 2026-11-18 | **La landing no admite la escala de texto del sistema** (`<meta name="text-scale">`) | Con la fuente al 200 % el hero no cabe en 390 px (la página llega a 588 px); quien use letra grande en Android o iOS no se beneficia | No se activa la etiqueta. El zoom del navegador sí funciona (320 px sin scroll horizontal, WCAG 1.4.10). Para activarla: tamaños de los titulares con `min()` o `cqi` y botones que se partan en dos líneas | 🟡 |

## Hallazgos para el equipo de la app

Se detectaron durante el [estudio de la app](../07-referencias/estudio-app-2026-11-17.md); no son de
la landing, pero se registran para avisar al equipo.

| # | Fecha | Hallazgo |
|---|---|---|
| H1 | 2026-11-17 | Los botones de la barra inferior y del perfil no tienen etiqueta accesible (el lector de pantalla dice solo "botón") |
| H2 | 2026-11-17 | Mezcla de voseo ("¡Grabá el primero!") y tuteo ("puedes ver", "Toca") en los textos |
