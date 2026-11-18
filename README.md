# Estud-IA — Landing

> Landing de descarga de **Estud-IA**, la app de clases en vivo con gamificación: la interactividad de
> Twitch con la estructura de un LMS.

Su objetivo es que la gente **descargue la app** (por ahora, el APK para Android), entienda cómo se vive
una clase en vivo y que los creadores se anoten para enseñar.

## Estado

**Fase 02 en curso (2026-11-17):** la base de la landing está en [`landing/`](landing/README.md). La
maqueta aprobada (fase 01) está en [`maqueta/`](maqueta/README.md). Detalle en
[`docs/05-roadmap/`](docs/05-roadmap/README.md).

| Parte | Cómo verla |
|---|---|
| Landing (`landing/`) | Node ≥ 22.23.4; `cd landing && npm install && npm run dev` → `http://localhost:4321` |
| Maqueta (`maqueta/`) | `python -m http.server 5500 -d maqueta` → `http://localhost:5500/` |

## Stack

| Parte | Tecnología |
|---|---|
| Framework | Astro 7 (sitio estático) |
| Animación | GSAP (ScrollTrigger, SplitText, CustomEase) + Lenis |
| Estilos | CSS con tokens tomados de la app (estilo táctil) |
| Tipografía | Outfit + Inter (Fontsource, autoalojadas) |
| Hosting | Estático con CDN (a decidir) |

## Documentación

Todo está en [`docs/`](docs/README.md). Para empezar:

- **Qué es y para quién:** [`docs/01-producto/vision.md`](docs/01-producto/vision.md)
- **Requerimientos (HU, RF, RNF):** [`docs/02-requerimientos/`](docs/02-requerimientos/README.md)
- **Arquitectura:** [`docs/03-arquitectura/`](docs/03-arquitectura/README.md)
- **Roadmap:** [`docs/05-roadmap/`](docs/05-roadmap/README.md)
- **Cómo se trabaja:** [`docs/06-estandares/`](docs/06-estandares/documentacion.md)

## Repo relacionado

La app (Flutter + FastAPI) vive en el repo `streaming-estudia`.

## Licencia

Privado, solo para uso interno.
