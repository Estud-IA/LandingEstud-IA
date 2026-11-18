import type { MotionModulo } from './tipos';

/**
 * data-motion="stagger": los hijos directos entran escalonados (suben y aparecen) cuando el
 * contenedor llega al 80 % de la pantalla. Una sola vez.
 */
const stagger: MotionModulo = (el, { gsap }) => {
  const hijos = Array.from(el.children) as HTMLElement[];

  const tween = gsap.from(hijos, {
    y: 40,
    autoAlpha: 0,
    duration: 0.7,
    stagger: 0.08,
    ease: 'estudia',
    scrollTrigger: { trigger: el, start: 'top 80%', once: true },
  });

  return () => {
    tween.scrollTrigger?.kill();
    tween.kill();
    gsap.set(hijos, { clearProps: 'transform,opacity,visibility' });
  };
};

export default stagger;
