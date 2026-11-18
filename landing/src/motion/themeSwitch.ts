import type { MotionModulo } from './tipos';

/**
 * data-motion="theme-switch" en una sección oscura: mientras ocupa la pantalla, el fondo de toda la
 * página pasa a negro (html[data-tema-pagina="oscuro"]; la transición es CSS en base.css). Así el
 * cambio claro → negro se siente como el de la app al entrar a un directo.
 */
const themeSwitch: MotionModulo = (el, { ScrollTrigger }) => {
  const raiz = document.documentElement;

  const disparador = ScrollTrigger.create({
    trigger: el,
    start: 'top 20%',
    end: 'bottom 80%',
    onToggle(self) {
      if (self.isActive) raiz.dataset.temaPagina = 'oscuro';
      else delete raiz.dataset.temaPagina;
    },
  });

  return () => {
    disparador.kill();
    delete raiz.dataset.temaPagina;
  };
};

export default themeSwitch;
