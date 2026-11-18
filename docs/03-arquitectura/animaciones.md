# Sistema de animaciones

Cómo se organizan el scroll suave y las animaciones. Se inspira en el sistema de módulos de
Bulletproof (ver [`../07-referencias/estudio-bulletproof.md`](../07-referencias/estudio-bulletproof.md)).

**Estado:** 📝 planificado (2026-11-17).

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
| `data-motion="marquee"` | `marquee.ts` | Cinta de la franja de prueba |
| `data-motion="pinned-phone"` | `pinnedPhone.ts` | Sección "Así se vive una clase" |
| `data-step="N"` | `pinnedPhone.ts` | Cada paso y su escena |
| `data-motion="counter"` + `data-to="1250"` | `counters.ts` | Números de la gamificación |
| `data-motion="stagger"` | `stagger.ts` | Cuadrícula de tarjetas |
| `data-motion="horizontal"` | `horizontalScroll.ts` | Carrusel de Shorts |
| `data-theme-section="dark"` o `"light"` | `themeSwitch.ts` | Cada `<section>` |
| `data-lenis-prevent` | Lenis | Zonas con scroll propio |

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
- La navegación no necesita cambiar porque usa `mix-blend-mode: difference`.

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
- Los videos se pausan fuera de la vista (IntersectionObserver).
- Se mide con una traza de rendimiento del MCP de DevTools (ver [`../06-estandares/verificacion.md`](../06-estandares/verificacion.md)).
