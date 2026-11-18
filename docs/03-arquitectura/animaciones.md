# Sistema de animaciones

Cómo se organizan el scroll suave y las animaciones. Se inspira en el sistema de módulos de
Bulletproof (ver [`../07-referencias/estudio-bulletproof.md`](../07-referencias/estudio-bulletproof.md)).

**Estado:** implementados el arranque, Lenis, la curva de marca y `reveal` (fase 02); `hero-lines`, `hero-intro` y `nav-hide` (fase 03); `pinned-phone` y `theme-switch` (fase 04); y `stagger`, `counter`, `fill` y `horizontal-scroll` (fase 05).

## Principios

1. **El contenido existe sin animación.** El HTML se ve completo aunque el JS falle o el visitante
   tenga movimiento reducido. La animación solo añade.
2. **Un módulo por efecto** en `src/motion/`. Cada módulo exporta una función `init(el)` que devuelve
   una función `destroy()`.
3. **Se activa desde el HTML** con atributos: los componentes no importan GSAP.
4. **Solo `transform` y `opacity`**, para no forzar reflujos y mantener el INP y el CLS bajos (RNF-01).
5. **Una sola curva de marca**: `CustomEase` "estudia" = `cubic-bezier(.84,0,.16,1)`.

## Atributos

| Atributo | Módulo | Ejemplo |
|---|---|---|
| `data-motion="reveal"` | `reveal.ts` | `<h1 data-motion="reveal" data-split="chars">` |
| `data-motion="hero-lines"` | `heroLines.ts` | En el contenedor de las líneas del titular |
| (sin módulo) | CSS en `FranjaPrueba.astro` | La franja usa `@keyframes`, sin GSAP; se detiene con movimiento reducido |
| `data-motion="pinned-phone"` | `pinnedPhone.ts` | Sección "Así se vive una clase" |
| `data-step="N"` | `pinnedPhone.ts` | Cada paso y su escena |
| `data-motion="counter"` + `data-to="1250"` | `counters.ts` | Números de la gamificación |
| `data-motion="stagger"` | `stagger.ts` | Cuadrícula de tarjetas |
| `data-motion="horizontal"` | `horizontalScroll.ts` | Carrusel de Shorts |
| `data-theme-section="dark"` o `"light"` | `themeSwitch.ts` | Cada `<section>` |
| `data-motion="hero-intro"` | `heroIntro.ts` | `.hero-visual`: entrada del teléfono y de los flotantes |
| `data-motion="nav-hide"` | `navHide.ts` | La isla de navegación |
| `data-motion="pinned-phone"` | `pinnedPhone.ts` | `.clase-fijada`: fijado y línea de tiempo de los 5 pasos |
| `data-motion="theme-switch"` | `themeSwitch.ts` | Sección oscura que pone la página en negro mientras está a la vista |
| `data-motion="fill"` | `fill.ts` | Barra de XP: de 0 a `--progreso` (GSAP sustituye `scale` por `transform`, así que el valor final se pasa explícito) |
| `data-motion="horizontal-scroll"` | `horizontalScroll.ts` | Sección de Shorts (≥ 64rem): fija la sección y mueve `[data-pista]` en horizontal |
| `data-lenis-prevent` | Lenis | Zonas con scroll propio |

Un elemento puede activar varios módulos separándolos con espacios: `data-motion="reveal hero-lines"`.

## Ciclo de vida

```
DOMContentLoaded
  └─ motion/index.ts
       ├─ ¿prefers-reduced-motion: reduce?
       │     sí → no se carga GSAP ni Lenis; se añade la clase .reduced-motion; fin
       │     no ↓
       ├─ import() dinámico de gsap, ScrollTrigger, SplitText, CustomEase y lenis
       ├─ lenis.ts:   new Lenis → lenis.on('scroll', ScrollTrigger.update)
       │              gsap.ticker.add(t => lenis.raf(t * 1000)); lagSmoothing(0)
       ├─ eases.ts:   registra "estudia"
       ├─ recorre [data-motion] y llama al init() de cada módulo
       │     (los de secciones lejanas se inician al acercarse, con IntersectionObserver)
       └─ document.fonts.ready → ScrollTrigger.refresh()   (SplitText mide con las fuentes ya cargadas)
```

- **Al cambiar el tamaño de la ventana:** `ScrollTrigger.refresh()`. Los módulos con SplitText
  vuelven a dividir el texto (como `SplitOnResize` en Bulletproof).
- **`gsap.matchMedia()`** separa móvil y escritorio. Por ejemplo, `pinnedPhone` solo fija la sección
  desde 1024 px; en móvil cada paso es una tarjeta con su propia entrada.

## Patrón "base + mejora" y `html.motion-ok`

Una sección puede tener una presentación **base**, que funciona sin JS y con movimiento reducido, y
otra **mejorada** que depende de la animación. El CSS muestra solo una, para no duplicar contenido
al lector de pantalla.

- `motion/index.ts` carga todos los módulos, añade `html.motion-ok` y después los inicia seguidos.
  Así la presentación mejorada ya tiene su estado inicial cuando se pinta por primera vez.
- **Desde la fase 07**, los módulos que solo animan al entrar (`reveal`, `stagger`, `counter`,
  `fill`) y están a más de 1,5 pantallas se inician con un `IntersectionObserver` media pantalla
  antes de llegar. Iniciarlos todos juntos sumaba ~850 ms de reflows con CPU 4×. Los módulos que
  cambian el layout (pines) se inician siempre al cargar.
- Ejemplo 2 (fase 05, `ShortsGrabaciones.astro`): el carrusel nativo con `scroll-snap` es la base; `horizontal-scroll` marca `data-horizontal-activo` y el CSS quita el `overflow-x` nativo solo entonces.
- Ejemplo (fase 04, `ClaseEnVivo.astro`):
  - `.clase-lista` (5 tarjetas con capturas) se ve por defecto.
  - `.clase-fijada` (teléfono fijo con pantallas HTML) solo se ve con
    `@media (width >= 64rem) { html.motion-ok … }`.

## Accesibilidad del texto dividido (SplitText)

- **Por letras** (`data-split="chars"`, por defecto): SplitText pone `aria-label` en el elemento y
  oculta las letras al lector de pantalla. Por eso `data-motion="reveal"` por letras va **solo en
  encabezados** (`h1`–`h4`), que admiten `aria-label`. Si el encabezado tiene varios `<span>`, se
  separan con `{' '}` en Astro para que la etiqueta lea las frases con espacio.
- **Por líneas** (`data-split="lines"`): las palabras quedan enteras y no se usa ARIA (`aria: 'none'`),
  así que sirve en párrafos.
- Verificado con Lighthouse (2026-11-17): accesibilidad 100.

## Efectos clave

### Teléfono fijo (`pinnedPhone.ts`)

- Un `ScrollTrigger` con `pin: true` sobre la sección y un `end` de `+=` 5 pantallas, una por paso.
- Una línea de tiempo con `scrub` y etiquetas por paso. En cada una:
  1. El texto del paso anterior sale y entra el nuevo.
  2. La escena del teléfono cambia.
  3. La escena anima su detalle: los mensajes del chat suben, la barra de XP se llena, la fila del
     ranking sube.
- Un indicador de progreso de 5 puntos que se actualiza con `onUpdate`.

### Cambio de tema (`themeSwitch.ts`)

- Al entrar en una sección con `data-theme-section="dark"`, el fondo del `body` pasa a
  `--color-tinta` y el texto a blanco, con un `scrub` corto.
- La navegación no necesita cambiar: es una isla blanca que se lee sobre los dos fondos (D11).

### Titular del hero (`reveal.ts` + `heroLines.ts`)

- Entrada: SplitText por letras con máscara, `yPercent: 110 → 0`, `stagger: 0.02` y `expo.out`.
- Con el scroll: cada línea se desplaza en el eje `x` (±10–15vw) en sentidos alternos, con `scrub`.

## Movimiento reducido (RNF-04)

- **No se cargan** GSAP ni Lenis, así que el JS es aún más liviano.
- En el CSS, `.reduced-motion` y `@media (prefers-reduced-motion: reduce)`:
  - Quitan los `opacity: 0` iniciales.
  - Detienen la cinta.
  - Muestran las 5 escenas del teléfono una debajo de otra.
- Los videos no se reproducen solos; muestran el póster con un botón ▶.

## Rendimiento

- GSAP y Lenis se cargan con `import()` después del primer pintado; no bloquean el LCP.
- `will-change` solo durante la animación, nunca fijo.
- Arranque diferido de los módulos lejanos (ver "Patrón base + mejora"): reflows al cargar de 849 a
  162 ms en móvil con CPU 4× (fase 07).
- **Pines y CLS:** el cambio a `position: fixed` de un pin cuenta como desplazamiento de diseño.
  `horizontal-scroll` usa `pinType: 'transform'` (CLS de scroll 2,00 → 0). Un pin nuevo debe
  medirse con un `PerformanceObserver` de `layout-shift` mientras se recorre.
- Los videos se pausan fuera de la vista (IntersectionObserver).
- Se mide con una traza de rendimiento del MCP de DevTools (ver [`../06-estandares/verificacion.md`](../06-estandares/verificacion.md)).
