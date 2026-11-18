import type { MotionModulo } from './tipos';

/**
 * data-motion="nav-hide": la navegación se oculta al bajar y reaparece al subir. Cerca del inicio
 * de la página siempre está visible. Con movimiento reducido este módulo no se carga y la isla
 * queda fija.
 */
const navHide: MotionModulo = (el, { gsap, ScrollTrigger }) => {
  let oculta = false;

  const mover = (ocultar: boolean) => {
    if (ocultar === oculta) return;
    oculta = ocultar;
    gsap.to(el, { yPercent: ocultar ? -180 : 0, duration: 0.45, ease: 'estudia', overwrite: true });
  };

  const disparador = ScrollTrigger.create({
    start: 0,
    end: 'max',
    onUpdate(self) {
      if (self.scroll() < 120) {
        mover(false);
        return;
      }
      mover(self.direction === 1);
    },
  });

  // Si el foco del teclado entra en la navegación, se muestra aunque se esté bajando.
  const alEnfocar = () => mover(false);
  el.addEventListener('focusin', alEnfocar);

  return () => {
    disparador.kill();
    el.removeEventListener('focusin', alEnfocar);
    gsap.set(el, { clearProps: 'transform' });
  };
};

export default navHide;
