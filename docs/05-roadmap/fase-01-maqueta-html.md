# Fase 01 — Maqueta HTML de la landing (implementada 2026-11-17; falta revisión del equipo)

**Objetivo:** una maqueta estática de la landing, en HTML y CSS sin lógica, con el estilo de la app
Estud-IA. Sirve de referencia visual y de fuente del material (imágenes) para la landing real.

**Requerimientos:** aporta material para HU-04 a HU-09 y HU-13 (RF-06, RF-08 a RF-11, RF-15). No
cumple ningún RF por sí sola: la maqueta no se publica.

**Punto de partida (2026-11-17):** solo documentación. La app en local no tiene contenido (sin
directos, Shorts ni logros) y la cuenta de prueba tiene datos personales (ver
[`../07-referencias/estudio-app-2026-11-17.md`](../07-referencias/estudio-app-2026-11-17.md)).

**Decisiones (2026-11-17):**
- La maqueta vive en `maqueta/`, en la raíz del repo. Las imágenes exportadas **se suben** en
  `maqueta/exportes/`.
- **Sin JavaScript.** Las animaciones no se maquetan: cada momento se muestra fijo.
- Las pantallas de la app se recrean **una vez** en `maqueta/pantallas/` y se muestran dentro del
  mockup del teléfono con un `<iframe>` escalado.
- **Sin fotos de personas:** personas ficticias, avatares con iniciales y miniaturas con degradados.
- Fuentes desde Google Fonts e iconos Feather 4.29.2 en un sprite. La landing real autoalojará las
  fuentes.
- La **navegación** pasa a ser una **"isla" táctil blanca** en vez de usar
  `mix-blend-mode: difference`: el logo es a color y se invertía mal. Ver la decisión D11 en
  [`../03-arquitectura/README.md`](../03-arquitectura/README.md).
- CSS con capas de cascada (`@layer`), sin reset global, propiedades lógicas y tipografía fluida con
  `clamp()`, según la skill modern-web-guidance.

**Criterio de aceptación:**
- `maqueta/` sin ningún `<script>` ni atributo `on*`, y sin recursos externos salvo Google Fonts.
- Las 9 pantallas, las 4 piezas, `componentes.html` e `index.html` se ven bien a 390 px y a 1440 px,
  sin scroll horizontal ni errores en la consola.
- Lighthouse en móvil de `index.html`: accesibilidad ≥ 95.
- Las imágenes exportadas están en `maqueta/exportes/` con el tamaño esperado.

**Verificación al 2026-11-17:**
- `grep` de `<script` y `on*=`: ninguno.
- `grep` de `http`: solo Google Fonts.
- Consola sin mensajes.
- `index.html` sin scroll horizontal a 390 px.
- Lighthouse móvil: accesibilidad 100, buenas prácticas 100, SEO 100.
- 42 PNG exportados: pantallas de 1170 × 2532 y og-image de 1200 × 630.

---

- [x] **01-1. Estructura (2026-11-17):** `maqueta/README.md`, carpetas, `assets/logo.svg`,
      `assets/app-icon.png` y 41 iconos Feather + `sprite.svg`.
- [x] **01-2. Tokens y base (2026-11-17):** `css/tokens.css` (app_colors.dart, colores del logo y
      colores de ilustración) y `css/base.css`.
- [x] **01-3. Componentes (2026-11-17):** `css/componentes.css` + `componentes.html`. El estilo se
      validó contra las capturas de la app.
- [x] **01-4. Pantallas (2026-11-17):** las 9 de `pantallas/` + `css/pantallas.css`.
- [x] **01-5. Piezas (2026-11-17):** `og-image`, `tarjetas-video`, `gamificacion`, `instalacion`.
- [x] **01-6. Landing (2026-11-17):** `index.html` + `css/secciones.css` con las 10 secciones.
- [x] **01-7. Exportes (2026-11-17):** 9 pantallas, 16 piezas y 17 capturas de secciones. El detalle
      está en [`../../maqueta/README.md`](../../maqueta/README.md).
- [x] **01-8. Revisión con el MCP de DevTools (2026-11-17):** consola, scroll horizontal, Lighthouse.
      Se corrigieron el contraste del pie y el rol del carrusel.
- [x] **01-9. Documentación (2026-11-17):** roadmap, registro de cambios, arquitectura, estructura,
      design system, riesgos y trazabilidad.

## Prueba manual

- [ ] El equipo revisa `index.html` y las pantallas, y aprueba el estilo y los textos.
- [ ] Revisar `index.html` en un teléfono real (servida en la red local).

---

[← Volver al roadmap](README.md)
