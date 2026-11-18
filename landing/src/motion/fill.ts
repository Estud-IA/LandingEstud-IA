import type { MotionModulo } from './tipos';

/**
 * data-motion="fill": una barra (BarraXp) se llena desde 0 hasta su --progreso al entrar en
 * pantalla. Anima solo la escala. GSAP reemplaza la propiedad CSS `scale` por `transform`, así que el
 * valor final se lee de --progreso y se pasa explícito.
 */
const fill: MotionModulo = (el, { gsap }) => {
  const progreso = Number(getComputedStyle(el).getPropertyValue('--progreso')) || 1;

  const tween = gsap.fromTo(
    el,
    { scaleX: 0 },
    {
      scaleX: progreso,
      duration: 1.2,
      ease: 'expo.out',
      scrollTrigger: { trigger: el, start: 'top 90%', once: true },
    },
  );

  return () => {
    tween.scrollTrigger?.kill();
    tween.kill();
    gsap.set(el, { clearProps: 'all' });
  };
};

export default fill;
