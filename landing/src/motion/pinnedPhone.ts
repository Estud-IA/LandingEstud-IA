import type { MotionModulo } from './tipos';

/**
 * data-motion="pinned-phone" (.clase-fijada de ClaseEnVivo.astro): el teléfono queda fijo y una línea
 * de tiempo con scrub recorre los 5 pasos de una clase. Solo en ≥ 64rem (gsap.matchMedia); al salir
 * del breakpoint todo se revierte. La sección solo se muestra con html.motion-ok, que index.ts
 * añade cuando las animaciones están listas.
 */
const pinnedPhone: MotionModulo = (el, { gsap }) => {
  const mm = gsap.matchMedia();

  mm.add('(width >= 64rem)', () => {
    const q = <T extends Element = HTMLElement>(sel: string) =>
      Array.from(el.querySelectorAll<T>(sel));
    const uno = (sel: string) => el.querySelector<HTMLElement>(sel);

    const textos = q('[data-paso-texto]');
    const indicadores = q('[data-indicador]');
    const inicio = uno('[data-pantalla="inicio"]');
    const directo = uno('[data-pantalla="directo"]');
    const ranking = uno('[data-pantalla="ranking"]');
    const capa = (nombre: string) => uno(`[data-capa="${nombre}"]`);
    const burbujas = q('[data-burbuja]');
    const votos = q('[data-voto]');
    const logros = q('[data-logro]');
    const confeti = q('[data-capa="confeti"] i');
    const insignia = uno('[data-capa="nivel"] .insignia-nivel');
    const barraXp = uno('[data-barra-xp]');
    const filaPropia = uno('[data-fila-propia]');
    const filasDesplazadas = q('[data-fila-desplazada]');
    const avisoRanking = uno('[data-ranking-aviso]');

    // Distancia entre filas del ranking (alto de una fila + separación), medida al calcular.
    const pasoFila = () => {
      if (!filaPropia) return 0;
      const siguiente = filaPropia.nextElementSibling as HTMLElement | null;
      return siguiente ? siguiente.offsetTop - filaPropia.offsetTop : filaPropia.offsetHeight;
    };

    // Estado inicial: paso 1 (inicio a la vista).
    gsap.set(textos.slice(1), { autoAlpha: 0, yPercent: 20 });
    gsap.set([directo, ranking], { autoAlpha: 0 });
    gsap.set([capa('trivia'), capa('nivel'), capa('confeti')], { autoAlpha: 0 });

    const marcar = (indice: number) => {
      indicadores.forEach((punto, i) => {
        if (i === indice) punto.setAttribute('data-activo', '');
        else punto.removeAttribute('data-activo');
      });
    };

    // Momentos de la línea de tiempo en que el texto pasa al paso 2, 3, 4 y 5 (ver cambiarTexto).
    const CAMBIOS_DE_TEXTO = [0.3, 1.6, 2.8, 4.1].map((en) => en + 0.15);

    const cambiarTexto = (tl: gsap.core.Timeline, de: number, a: number, en: number) => {
      tl.to(textos[de], { autoAlpha: 0, yPercent: -20, duration: 0.3 }, en);
      tl.to(textos[a], { autoAlpha: 1, yPercent: 0, duration: 0.3 }, en + 0.15);
    };

    const tl = gsap.timeline({
      defaults: { ease: 'estudia' },
      scrollTrigger: {
        trigger: el,
        start: 'top top',
        end: () => `+=${window.innerHeight * 5}`,
        pin: true,
        scrub: 0.6,
        snap: {
          snapTo: 'labelsDirectional',
          duration: { min: 0.2, max: 0.6 },
          ease: 'power1.inOut',
        },
        invalidateOnRefresh: true,
        onUpdate(self) {
          // El indicador cambia en el mismo momento que el texto del paso. Se usa el progreso del
          // scroll (no el tiempo de la animación, que va con retraso por el scrub).
          const tiempo = self.progress * tl.duration();
          let actual = 0;
          CAMBIOS_DE_TEXTO.forEach((momento, i) => {
            if (tiempo >= momento) actual = i + 1;
          });
          marcar(actual);
        },
      },
    });

    tl.addLabel('p1', 0);

    // 1 → 2: del inicio al directo; el chat cobra vida.
    tl.to(inicio, { autoAlpha: 0, scale: 0.94, duration: 0.4 }, 0.2);
    tl.to(directo, { autoAlpha: 1, duration: 0.4 }, 0.3);
    tl.from(capa('cabecera'), { yPercent: -120, duration: 0.4 }, 0.4);
    tl.from(burbujas, { y: 40, autoAlpha: 0, stagger: 0.15, duration: 0.35 }, 0.6);
    cambiarTexto(tl, 0, 1, 0.3);
    tl.addLabel('p2', 1.4);

    // 2 → 3: sube la trivia y se llenan los votos.
    tl.to(capa('chat'), { autoAlpha: 0.25, duration: 0.3 }, 1.6);
    tl.fromTo(
      capa('trivia'),
      { autoAlpha: 0, yPercent: 40 },
      { autoAlpha: 1, yPercent: 0, duration: 0.4 },
      1.6,
    );
    tl.from(votos, { scaleX: 0, stagger: 0.08, duration: 0.5, ease: 'expo.out' }, 1.9);
    cambiarTexto(tl, 1, 2, 1.6);
    tl.addLabel('p3', 2.6);

    // 3 → 4: subida de nivel.
    tl.to(capa('trivia'), { autoAlpha: 0, yPercent: 20, duration: 0.3 }, 2.8);
    tl.to(capa('chat'), { autoAlpha: 0, duration: 0.3 }, 2.8);
    tl.fromTo(
      capa('nivel'),
      { autoAlpha: 0, yPercent: 30 },
      { autoAlpha: 1, yPercent: 0, duration: 0.4 },
      2.9,
    );
    tl.from(insignia, { scale: 0, rotate: -20, duration: 0.45, ease: 'back.out(2)' }, 3.1);
    tl.from(barraXp, { scaleX: 0, duration: 0.5, ease: 'expo.out' }, 3.2);
    tl.from(logros, { x: -30, autoAlpha: 0, stagger: 0.1, duration: 0.3 }, 3.3);
    tl.to(capa('confeti'), { autoAlpha: 1, duration: 0.1 }, 3.1);
    tl.from(
      confeti,
      { y: -80, autoAlpha: 0, stagger: 0.05, duration: 0.5, ease: 'bounce.out' },
      3.1,
    );
    cambiarTexto(tl, 2, 3, 2.8);
    tl.addLabel('p4', 3.9);

    // 4 → 5: ranking; la fila propia sube del puesto 6 al 4.
    tl.to(directo, { autoAlpha: 0, duration: 0.3 }, 4.1);
    tl.fromTo(
      ranking,
      { autoAlpha: 0, xPercent: 12 },
      { autoAlpha: 1, xPercent: 0, duration: 0.4 },
      4.1,
    );
    tl.from(filaPropia, { y: () => pasoFila() * 2, duration: 0.6 }, 4.5);
    tl.from(filasDesplazadas, { y: () => -pasoFila(), duration: 0.6 }, 4.5);
    tl.from(avisoRanking, { scale: 0, autoAlpha: 0, duration: 0.35, ease: 'back.out(2)' }, 5);
    cambiarTexto(tl, 3, 4, 4.1);
    tl.addLabel('p5', 5.4);
    tl.to({}, { duration: 0.3 });

    return () => marcar(0);
  });

  return () => mm.revert();
};

export default pinnedPhone;
