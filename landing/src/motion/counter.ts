import type { MotionModulo } from './tipos';

/**
 * data-motion="counter" + data-hasta="350": el número cuenta de 0 al valor final al entrar en
 * pantalla, una vez. El HTML ya trae el valor final, así que sin JS o con movimiento reducido se ve
 * el número correcto.
 */
const formato = new Intl.NumberFormat('es-PE');

const counter: MotionModulo = (el, { gsap }) => {
  const hasta = Number(el.dataset.hasta ?? el.textContent ?? 0);
  if (!Number.isFinite(hasta)) return () => {};

  const estado = { valor: 0 };
  el.textContent = formato.format(0);

  const tween = gsap.to(estado, {
    valor: hasta,
    duration: 1.4,
    ease: 'power2.out',
    snap: { valor: 1 },
    onUpdate: () => {
      el.textContent = formato.format(estado.valor);
    },
    scrollTrigger: { trigger: el, start: 'top 85%', once: true },
  });

  return () => {
    tween.scrollTrigger?.kill();
    tween.kill();
    el.textContent = formato.format(hasta);
  };
};

export default counter;
