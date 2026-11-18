import type { MotionModulo } from './tipos';

/**
 * data-motion="hero-intro" en .hero-visual: el teléfono sube y los elementos flotantes (EN VIVO,
 * +10 XP, nivel, formas "+") aparecen escalonados. El teléfono no parte de opacity 0: su imagen es
 * el LCP y debe pintarse desde el principio.
 */
const heroIntro: MotionModulo = (el, { gsap }) => {
  const telefono = el.querySelector<HTMLElement>('.telefono');
  const flotantes = el.querySelectorAll<HTMLElement>('.flotante, .forma-mas');

  const tl = gsap.timeline({ defaults: { ease: 'estudia' } });

  if (telefono) {
    tl.from(telefono, { yPercent: 10, duration: 1.2 }, 0);
  }
  tl.from(
    flotantes,
    { scale: 0, opacity: 0, duration: 0.6, stagger: 0.09, ease: 'back.out(1.8)' },
    0.45,
  );

  return () => {
    tl.kill();
    gsap.set([telefono, ...flotantes], { clearProps: 'transform,opacity' });
  };
};

export default heroIntro;
