# Fase 05 — Gamificación, Shorts y grabaciones, creadores (implementada y verificada 2026-11-18; falta prueba manual)

**Objetivo:** las secciones que explican qué gana el estudiante, el contenido grabado y la propuesta
para creadores, con su lista de espera.

**Requerimientos:** HU-06, HU-07, HU-08, HU-09 · RF-07, RF-09, RF-10, RF-11 · RNF-03, RNF-04, RNF-08.

**Punto de partida:** fase 04 verificada.

**Material de la maqueta:** secciones "Aprender suma", "¿Te perdiste la clase?" y "Tu clase, tu
estudio" de `maqueta/index.html`; `maqueta/exportes/pantallas/estudio@3x.png`.

**Decisiones (2026-11-18):**
1. **A4:** se muestra el bloque **"Próximamente: cobra con Yape"** con lista de espera, sin fecha.
2. **A5:** el formulario está **completo pero no envía datos**.
   - `scripts/waitlist.ts` tiene una sola función, `enviar()`, que se conecta al servicio elegido.
   - Mientras tanto, el mensaje lo dice: "Gracias. La lista de espera abrirá pronto; todavía no
     guardamos tu correo."
   - **No se publica la landing así** (riesgo R10).
3. **El teléfono de creadores es el PNG de `estudio`**: no necesita animación interna.
4. **El carrusel sigue el patrón "base + mejora":**
   - **Base:** carrusel nativo con `overflow-x`, `scroll-snap`, `role="region"` y `tabindex="0"`.
   - **Mejora** (≥ 64rem con animaciones): la sección se fija y el scroll vertical mueve la pista
     en horizontal. Las tarjetas crecen a `clamp(13.5rem, 20vw, 19rem)` para que el recorrido se
     note.
5. **Los números y la barra tienen el valor final en el HTML**: se animan desde 0 solo si hay
   animaciones.
6. **El formulario sigue las guías de modern-web-guidance:**
   - etiquetas visibles con `for`/`id` y pistas de formato encima del campo;
   - `required` marcado también visualmente;
   - errores solo después de interactuar (`:user-invalid` + `aria-invalid`/`aria-describedby`
     mantenidos por el script);
   - mensaje en `role="status"` con `aria-live`;
   - `method="post"` y validación nativa (sin `novalidate`).
7. **Componentes nuevos:** `VideoCard`, `BarraXp`, `Burbuja`, `WaitlistForm` y `EncabezadoSeccion`.
   `TactileButton` acepta `type="submit"`.

**Criterio de aceptación:**
- Las tarjetas de gamificación entran escalonadas y sus contadores suben.
- El carrusel avanza en horizontal con el scroll en escritorio y se desliza con el dedo en móvil.
- La sección de creadores es negra, con el estudio y el bloque "Próximamente: cobra con Yape".
- El formulario pide consentimiento, enlaza a `/privacidad` y muestra una confirmación honesta.
- Ningún texto promete algo que la app no tiene.

**Verificación al 2026-11-18 (Node 26.13):**
- `build`, `check` (0 errores, 0 avisos), `lint` y `format:check` en verde.
- **1440 px:**
  - **Gamificación:** igual que la maqueta. Las tarjetas entran escalonadas, los contadores llegan
    a "7" y "350" y la barra a 0,72.
  - **Shorts:** la sección se fija y la pista se mueve en horizontal (−333 px de 554 a mitad del
    recorrido). El encabezado queda alineado.
  - **Creadores:** el fondo pasa a negro; estudio, ventajas y bloque "Próximamente".
- **Formulario:**
  - Al enviarlo vacío marca `aria-invalid`, enlaza y muestra el error.
  - Con datos válidos limpia el error y muestra el mensaje honesto.
  - **0 peticiones de red**; la URL no cambia.
- **390 px:** carrusel con scroll nativo; formulario en una columna; sin scroll horizontal de la
  página.
- **Movimiento reducido:** solo el script de arranque; contadores en su valor final, barra en 0,72 y
  carrusel nativo.
- **Lighthouse:** móvil y escritorio con accesibilidad, buenas prácticas y SEO en 100 (CLS de 0,079
  en móvil, el mismo de la fase 04).
- **Consola** limpia.
- **Corregido durante la verificación:**
  - La pista creaba scroll horizontal en toda la página (ahora `overflow-x: clip` en la sección).
  - La columna de la cuadrícula tomaba el ancho de la pista y descentraba el encabezado (ahora
    `minmax(0, 1fr)`).
  - GSAP reemplazaba la propiedad `scale` de la barra y la dejaba en 0 (ahora `fill.ts` usa
    `fromTo` hasta `--progreso`).
  - El recorrido horizontal era muy corto (las tarjetas crecen con la mejora activa).

---

- [x] **05-1. Componentes (2026-11-18):** `VideoCard`, `BarraXp`, `Burbuja`, `EncabezadoSeccion`;
      `InsigniaNivel` y `ChipXp` ya existían (fase 03).
- [x] **05-2. `Gamificacion.astro` + `motion/stagger.ts`, `counter.ts` y `fill.ts` (2026-11-18).**
- [x] **05-3. `ShortsGrabaciones.astro` + `motion/horizontalScroll.ts` (2026-11-18).**
- [x] **05-4. `Creadores.astro` (2026-11-18)** con la captura del estudio (sin `PantallaEstudio`).
- [x] **05-5. `WaitlistForm.astro` + `scripts/waitlist.ts` (2026-11-18)**, tipos `creadores` e
      `ios`; sin envío hasta A5.

## Prueba manual

- [ ] Completar el formulario solo con teclado y con un lector de pantalla (NVDA o TalkBack).
- [ ] Deslizar el carrusel con el dedo en un Android real.

---

[← Volver al roadmap](README.md)
