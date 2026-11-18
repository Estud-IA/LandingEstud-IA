import type { CustomEase as CustomEaseTipo } from 'gsap/CustomEase';

/** Curva de marca, la misma de --curva-marca en tokens.css: cubic-bezier(.84, 0, .16, 1). */
export function registrarCurvas(CustomEase: typeof CustomEaseTipo): void {
  CustomEase.create('estudia', '.84,0,.16,1');
}
