/**
 * Arranque del sistema de animación. Ver docs/03-arquitectura/animaciones.md.
 *
 * - Con prefers-reduced-motion: marca <html class="reduced-motion"> y NO carga GSAP ni Lenis.
 * - Si no: importa GSAP y Lenis de forma diferida y activa cada módulo según su [data-motion].
 */
import type { MotionContexto, MotionModulo } from './tipos';

const sinMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)');

/** Módulos disponibles por valor de data-motion. Cada uno se carga solo si la página lo usa. */
const modulos: Record<string, () => Promise<{ default: MotionModulo }>> = {
  reveal: () => import('./reveal'),
  'hero-lines': () => import('./heroLines'),
  'hero-intro': () => import('./heroIntro'),
  'nav-hide': () => import('./navHide'),
  'pinned-phone': () => import('./pinnedPhone'),
  'theme-switch': () => import('./themeSwitch'),
  stagger: () => import('./stagger'),
  counter: () => import('./counter'),
  fill: () => import('./fill'),
  'horizontal-scroll': () => import('./horizontalScroll'),
};

/**
 * Módulos que solo animan al entrar en pantalla y no cambian el layout de lo que viene después
 * (a diferencia de los pines). Se pueden iniciar tarde sin mover otros disparadores.
 */
const DIFERIBLES = new Set(['reveal', 'stagger', 'counter', 'fill']);

async function iniciar(): Promise<void> {
  if (sinMovimiento.matches) {
    document.documentElement.classList.add('reduced-motion');
    return;
  }

  const [{ gsap }, { ScrollTrigger }, { SplitText }, { CustomEase }] = await Promise.all([
    import('gsap'),
    import('gsap/ScrollTrigger'),
    import('gsap/SplitText'),
    import('gsap/CustomEase'),
  ]);
  gsap.registerPlugin(ScrollTrigger, SplitText, CustomEase);

  const { registrarCurvas } = await import('./eases');
  registrarCurvas(CustomEase);

  const { iniciarLenis } = await import('./lenis');
  iniciarLenis(gsap, ScrollTrigger);

  const contexto: MotionContexto = { gsap, ScrollTrigger, SplitText };

  // Un elemento puede tener varios módulos: data-motion="reveal hero-lines".
  const tareas = Array.from(document.querySelectorAll<HTMLElement>('[data-motion]')).flatMap((el) =>
    (el.dataset.motion ?? '')
      .split(/\s+/)
      .filter(Boolean)
      .map((nombre) => ({ el, nombre })),
  );

  // 1) Se cargan todos los módulos que usa la página.
  const cargados = await Promise.all(
    tareas.map(async ({ el, nombre }) => {
      const cargar = modulos[nombre];
      if (!cargar) {
        console.warn(`[motion] módulo desconocido: "${nombre}"`);
        return null;
      }
      return { el, nombre, modulo: (await cargar()).default };
    }),
  );

  // 2) html.motion-ok activa las presentaciones que dependen de la animación (p. ej. el teléfono
  //    fijo de "Así se vive una clase"). 3) Los módulos se inician seguidos, sin esperas, para que
  //    esas presentaciones tengan su estado inicial antes del siguiente pintado.
  document.documentElement.classList.add('motion-ok');

  // 4) Rendimiento (fase 07): cada revelado divide el texto y mide, lo que fuerza un layout de toda
  //    la página. Iniciarlos todos juntos sumaba ~850 ms de reflows con CPU 4×. Los módulos
  //    "diferibles" que están lejos se inician cuando faltan ~media pantalla para verlos; su
  //    ScrollTrigger se crea antes de que el elemento entre, así que el efecto es el mismo.
  //    Las posiciones se leen todas juntas antes de escribir nada (un solo layout).
  const limite = window.innerHeight * 1.5;
  const listas = cargados
    .filter((t): t is NonNullable<typeof t> => t !== null)
    .map((t) => ({
      ...t,
      lejos: DIFERIBLES.has(t.nombre) && t.el.getBoundingClientRect().top > limite,
    }));

  const pendientes = new Map<Element, (() => void)[]>();
  const observador = new IntersectionObserver(
    (entradas) => {
      for (const entrada of entradas) {
        if (!entrada.isIntersecting) continue;
        observador.unobserve(entrada.target);
        pendientes.get(entrada.target)?.forEach((iniciarModulo) => iniciarModulo());
        pendientes.delete(entrada.target);
      }
    },
    { rootMargin: '0px 0px 50% 0px' },
  );

  for (const { el, modulo, lejos } of listas) {
    if (!lejos) {
      modulo(el, contexto);
      continue;
    }
    const lista = pendientes.get(el) ?? [];
    if (lista.length === 0) observador.observe(el);
    lista.push(() => modulo(el, contexto));
    pendientes.set(el, lista);
  }

  // SplitText mide con las fuentes reales: recalcula cuando terminan de cargar.
  await document.fonts.ready;
  ScrollTrigger.refresh();
}

iniciar();
