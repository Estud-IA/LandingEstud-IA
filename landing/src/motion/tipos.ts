import type { gsap as Gsap } from 'gsap';
import type { ScrollTrigger as ScrollTriggerTipo } from 'gsap/ScrollTrigger';
import type { SplitText as SplitTextTipo } from 'gsap/SplitText';

/** Lo que reciben todos los módulos de movimiento. */
export interface MotionContexto {
  gsap: typeof Gsap;
  ScrollTrigger: typeof ScrollTriggerTipo;
  SplitText: typeof SplitTextTipo;
}

/**
 * Contrato de un módulo de movimiento: se activa sobre un elemento con data-motion y devuelve
 * una función que deshace lo que hizo (destroy).
 */
export type MotionModulo = (el: HTMLElement, contexto: MotionContexto) => () => void;
