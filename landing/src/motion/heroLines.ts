import type { MotionModulo } from './tipos';

/**
 * data-motion="hero-lines": las líneas del titular (sus <span> hijos) se desplazan en horizontal,
 * en sentidos opuestos, mientras el hero sale de la pantalla. Es el recurso de Bulletproof
 * (docs/07-referencias/estudio-bulletproof.md).
 */
const heroLines: MotionModulo = (el, { gsap, ScrollTrigger }) => {
  const lineas = Array.from(el.querySelectorAll<HTMLElement>(':scope > span'));
  const seccion = el.closest<HTMLElement>('[data-hero]') ?? el;

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: seccion,
      start: 'top top',
      end: 'bottom top',
      scrub: true,
    },
  });

  lineas.forEach((linea, i) => {
    tl.to(linea, { xPercent: i % 2 === 0 ? -8 : 10, ease: 'none' }, 0);
  });

  return () => {
    tl.scrollTrigger?.kill();
    tl.kill();
    gsap.set(lineas, { clearProps: 'transform' });
    ScrollTrigger.refresh();
  };
};

export default heroLines;
