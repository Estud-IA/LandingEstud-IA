import type { MotionModulo } from './tipos';

/**
 * data-motion="horizontal-scroll" (ShortsGrabaciones.astro): en ≥ 64rem fija la sección y convierte
 * el scroll vertical en avance horizontal de la pista [data-pista]. Por debajo, o con movimiento
 * reducido, queda el carrusel nativo con scroll-snap. Al salir del breakpoint todo se revierte.
 */
const horizontalScroll: MotionModulo = (el, { gsap }) => {
  const mm = gsap.matchMedia();

  mm.add('(width >= 64rem)', () => {
    const pista = el.querySelector<HTMLElement>('[data-pista]');
    const carrusel = el.querySelector<HTMLElement>('[data-carrusel]');
    if (!pista || !carrusel) return;

    el.dataset.horizontalActivo = '';
    carrusel.scrollLeft = 0;

    const distancia = () => Math.max(0, pista.scrollWidth - carrusel.clientWidth);

    gsap.to(pista, {
      x: () => -distancia(),
      ease: 'none',
      scrollTrigger: {
        trigger: el,
        start: 'top top',
        end: () => `+=${distancia()}`,
        pin: true,
        // Fija con transform en lugar de position: fixed. El cambio a fixed al entrar y salir del
        // pin contaba como desplazamiento de diseño (CLS 1,0 cada vez); las transformaciones no
        // cuentan. Lenis mueve el scroll en el mismo fotograma, así que no hay temblor (fase 07).
        pinType: 'transform',
        scrub: 0.6,
        invalidateOnRefresh: true,
      },
    });

    return () => {
      delete el.dataset.horizontalActivo;
    };
  });

  return () => mm.revert();
};

export default horizontalScroll;
