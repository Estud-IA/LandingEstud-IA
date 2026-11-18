# Landing de Estud-IA

Landing real de Estud-IA, construida con **Astro 7** (sitio estático), **GSAP** (ScrollTrigger,
SplitText, CustomEase) y **Lenis**. Parte de la maqueta aprobada en [`../maqueta/`](../maqueta/README.md).

Toda la documentación está en [`../docs/`](../docs/README.md): requerimientos, arquitectura, diseño
y roadmap. La arquitectura de esta carpeta está en
[`../docs/03-arquitectura/estructura-del-proyecto.md`](../docs/03-arquitectura/estructura-del-proyecto.md).

## Requisitos

- **Node 22.23.4 o superior** (lo exige Astro 7) y npm.

## Comandos

Desde esta carpeta (`landing/`):

| Comando           | Qué hace                                                           |
| ----------------- | ------------------------------------------------------------------ |
| `npm install`     | Instala las dependencias                                           |
| `npm run dev`     | Servidor de desarrollo en `http://localhost:4321`                  |
| `npm run build`   | Genera el sitio estático en `dist/`                                |
| `npm run preview` | Sirve `dist/` para revisarlo como en producción                    |
| `npm run check`   | Chequeo de tipos de Astro y TypeScript                             |
| `npm run lint`    | ESLint                                                             |
| `npm run format`  | Prettier (escribe los cambios); `npm run format:check` solo revisa |

## Páginas internas

- `/dev/estilos`: catálogo de tokens y componentes. No se indexa y no aparece en el sitemap.

## Reglas rápidas

- Colores, sombras y radios **solo** desde `src/styles/tokens.css`.
- Cada animación es un módulo en `src/motion/` activado con `data-motion`, y debe respetar
  `prefers-reduced-motion`. Ver [`../docs/03-arquitectura/animaciones.md`](../docs/03-arquitectura/animaciones.md).
- Textos en español con tuteo; nada de datos personales reales.
