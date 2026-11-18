/**
 * Barra de descarga fija en móvil (RF-02): se muestra cuando el hero ya no está a la vista.
 * Es funcional, no decorativa: también corre con movimiento reducido (sin transición, por CSS).
 * Sin JS la barra se ve siempre en móvil.
 */
const barra = document.querySelector<HTMLElement>('[data-barra-descarga]');
const hero = document.querySelector<HTMLElement>('[data-hero]');

if (barra && hero) {
  barra.dataset.visible = 'false';
  const observador = new IntersectionObserver(
    ([entrada]) => {
      barra.dataset.visible = String(!entrada.isIntersecting);
    },
    { rootMargin: '0px 0px -40% 0px' },
  );
  observador.observe(hero);
}
