import Lenis from 'lenis';
import type { MotionContexto } from './tipos';

let lenis: Lenis | undefined;

/** Scroll suave sincronizado con el reloj de GSAP y con ScrollTrigger. */
export function iniciarLenis(
  gsap: MotionContexto['gsap'],
  ScrollTrigger: MotionContexto['ScrollTrigger'],
): Lenis {
  if (lenis) return lenis;

  lenis = new Lenis({ lerp: 0.1 });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((tiempo) => lenis?.raf(tiempo * 1000));
  gsap.ticker.lagSmoothing(0);

  return lenis;
}
