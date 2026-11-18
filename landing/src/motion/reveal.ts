import type { MotionModulo } from './tipos';

/**
 * Revelado de texto: data-motion="reveal".
 * - data-split="chars" (por defecto) o "lines".
 * - data-retraso="0.2" (segundos, opcional).
 * - Sin ScrollTrigger si el elemento ya está visible al cargar (por ejemplo, el titular del hero).
 *
 * Accesibilidad: por letras, SplitText pone aria-label en el elemento y oculta las piezas, así que
 * "chars" debe ir en un encabezado (h1–h4), que admite aria-label. Por líneas las palabras quedan
 * enteras y no hace falta ARIA, así que sirve en cualquier elemento (p, span…).
 */
const reveal: MotionModulo = (el, { gsap, SplitText }) => {
  const tipo = el.dataset.split === 'lines' ? 'lines' : 'chars';
  const retraso = Number(el.dataset.retraso ?? 0);

  const division = SplitText.create(el, {
    type: tipo === 'lines' ? 'lines' : 'words,chars',
    mask: tipo,
    aria: tipo === 'lines' ? 'none' : 'auto',
    autoSplit: true,
    onSplit(self) {
      const piezas = tipo === 'lines' ? self.lines : self.chars;
      return gsap.from(piezas, {
        yPercent: 110,
        duration: tipo === 'lines' ? 1 : 0.9,
        stagger: tipo === 'lines' ? 0.08 : 0.02,
        ease: 'expo.out',
        delay: retraso,
        scrollTrigger: estaEnPantalla(el) ? undefined : { trigger: el, start: 'top 85%' },
      });
    },
  });

  return () => division.revert();
};

function estaEnPantalla(el: HTMLElement): boolean {
  return el.getBoundingClientRect().top < window.innerHeight;
}

export default reveal;
