# Roadmap de la landing

Documento vivo de secuencia de trabajo, con un archivo por fase. Los riesgos y las decisiones
abiertas están en [`../03-arquitectura/riesgos.md`](../03-arquitectura/riesgos.md); este roadmap los
convierte en tareas. Los cambios ya hechos se anotan en
[`registro-de-cambios.md`](registro-de-cambios.md).

**Estado al 2026-11-18:** la maqueta (fase 01) está aprobada. La fase 02 (base de la landing en
`landing/`) está implementada y verificada, igual que la fase 03 (navegación, hero, franja y barra de
descarga) la 04 ("Así se vive una clase"), la 05 (gamificación, Shorts y creadores), la 06 (descarga, FAQ,
cierre y páginas legales) y la 07 (rendimiento, accesibilidad y SEO); a todas les falta la prueba en
un teléfono real. La landing ya está completa y medida; antes de publicarla hay que resolver A2, A3,
A5 y la revisión legal (R10, R11).
Las fases 03 a 07 están planificadas; la 08 (despliegue) se detalla cuando se resuelvan sus
decisiones.

## Estado de las fases

| Fase | Tema | Requerimientos | Depende de | Estado |
|---|---|---|---|---|
| [01](fase-01-maqueta-html.md) | Maqueta HTML estática: referencia visual y fuente de imágenes | Material para HU-04 a HU-09 y HU-13 | — | 🟡 implementada 2026-11-17, falta revisión del equipo |
| [02](fase-02-base-astro.md) | Base de la landing: Astro, tokens, fuentes, componentes base, animación | RNF-04, RNF-10 | 01 | 🟡 implementada y verificada 2026-11-17, falta prueba manual |
| [03](fase-03-navegacion-y-hero.md) | Navegación, hero, franja, barra de descarga, CTA por dispositivo, QR | RF-01, RF-02, RF-03, RF-16, RF-17 | 02 | 🟡 implementada y verificada 2026-11-17, falta prueba manual |
| [04](fase-04-clase-en-vivo.md) | "Así se vive una clase": teléfono fijo y escenas animadas | RF-08 | 03 | 🟡 implementada y verificada 2026-11-18, falta prueba manual |
| [05](fase-05-gamificacion-shorts-creadores.md) | Gamificación, Shorts y grabaciones, creadores | RF-07, RF-09, RF-10, RF-11 | 04; A4 y A5 | 🟡 implementada y verificada 2026-11-18, falta prueba manual (formulario sin envío hasta A5) |
| [06](fase-06-descarga-faq-legal.md) | Descarga, `/descargar`, FAQ, cierre, páginas legales | RF-04, RF-05, RF-06, RF-12, RF-13 | 03; A2 y A8 para datos reales | 🟡 implementada y verificada 2026-11-18, falta prueba manual (datos de versión provisionales; textos legales en borrador) |
| [07](fase-07-rendimiento-accesibilidad-seo.md) | Rendimiento, accesibilidad, SEO y metadatos | RF-15, RNF-01 a RNF-07 | 03 a 06 | 🟡 implementada y verificada 2026-11-18, falta prueba manual (Safari, Firefox, Edge, Samsung Internet y lector de pantalla) |
| 08 | Despliegue, dominio, APK real y analítica | RF-14, RNF-08, RNF-09, RNF-11 | 07; A2, A3, A6 y A7 | ⏳ pendiente (sin archivo todavía) |

**Leyenda:** ⏳ pendiente · 🔵 en curso · 🟡 implementada, falta verificación · ✅ cerrada.

## Cómo usar este roadmap

1. **Crear una fase:** un archivo `fase-NN-tema.md` (kebab-case, numerado desde `01`) con el formato
   de abajo, y una fila en la tabla. En "Requerimientos" se enlazan las HU, RF y RNF que cubre (ver
   [`../02-requerimientos/`](../02-requerimientos/README.md)), y se completa la columna **Fase(s)** de
   la matriz de trazabilidad.
2. **Antes de empezar una fase:** releer su "Criterio de aceptación", que es la definición de
   terminado.
3. **Tomar una tarea:** anotarse en el archivo de la fase (`(en curso: @usuario-github)`). Ver
   [`../06-estandares/flujo-git.md`](../06-estandares/flujo-git.md).
4. **Al cerrar una tarea:** marcar `[x]` con la fecha y una línea de qué se hizo, y aplicar la matriz
   de [`../06-estandares/documentacion.md`](../06-estandares/documentacion.md).
5. **Al cerrar una fase:** poner la fecha en su título y en la tabla, pasar la
   [verificación](../06-estandares/verificacion.md) y sumar una entrada al
   [registro de cambios](registro-de-cambios.md).

## Formato de un archivo de fase

```
# Fase NN — Tema (estado)

**Objetivo:** …
**Requerimientos:** HU-…, RF-…, RNF-…
**Punto de partida:** qué existe antes de empezar
**Decisiones:** (fecha) …
**Criterio de aceptación:** lista verificable

---

- [ ] **NN-1. Tarea** — detalle
- [x] **NN-2. Tarea (2026-MM-DD):** qué se hizo

## Prueba manual
- [ ] …

---

[← Volver al roadmap](README.md)
```
