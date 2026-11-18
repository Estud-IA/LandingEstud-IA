# Estud-IA — Landing

> Landing de descarga de **Estud-IA**, la app de clases en vivo con gamificación: la interactividad de
> Twitch con la estructura de un LMS.

Su objetivo es que la gente **descargue la app** (por ahora, el APK para Android), entienda cómo se vive
una clase en vivo y que los creadores se anoten para enseñar.

## Estado

**Sin iniciar (2026-11-17).** Hay estudio de referencias y documentación; todavía no hay código ni
fases abiertas. El roadmap se va llenando en [`docs/05-roadmap/`](docs/05-roadmap/README.md).

## Stack (planificado)

| Parte | Tecnología |
|---|---|
| Framework | Astro (sitio estático) |
| Animación | GSAP (ScrollTrigger, SplitText, CustomEase) + Lenis |
| Estilos | CSS con tokens tomados de la app (estilo táctil) |
| Tipografía | Outfit + Inter |
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
